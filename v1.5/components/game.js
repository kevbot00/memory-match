class Game {
  constructor( closeModal ){
    this.closeModal = closeModal
    this.matchedCount = 0;
    this.firstPick = undefined;
    this.secondPick = undefined;
    this.gamesPlayed = 0;
    this.currentGameAttempt = 0;
    this.totalGameAttempt = 0;
    this.accuracy = 0;
    this.currentMode = null;
    this.clickHandler = this.clickHandler.bind( this );
    this.isMatching = this.isMatching.bind( this );   
    this.modeHandler = this.modeHandler.bind( this ); 
    this.resetStat = this.resetStat.bind( this );
    this.resetGame = this.resetGame.bind( this );
    this.newGame = this.newGame.bind( this );
  }

  startGame(){
    this.mode = new Mode( this.modeHandler );
    this.deck = new Deck( this.clickHandler );
    this.deck.cardLength = this.mode.getMode();
    this.currentMode = this.mode.getMode();
    this.deck.render();
    this.eventHandler();
    
  }

  eventHandler() {
    $('div.mode').on('click', this.mode.setMode );
    $('button.reset-stats').on('click', this.resetStat );
    $('button.reset-game').on('click', this.newGame );
  }

  modeHandler( gameMode = this.currentMode ){
    if ( this.matchedCount != (this.deck.cardLength / 2 ) && this.currentGameAttempt ){
      this.playSound( 'disqualified.wav', 1900 );
    }
    this.resetGame();
    this.deck.cardLength = gameMode;
    this.currentMode = gameMode;
    this.deck.render();
  }
  clickHandler( evt ){
    if ( !this.firstPick || !this.secondPick ){
      this.updateStats();
      $(evt.data.card.cardContainer[0].firstChild).addClass( 'back-card-clicked');
      $(evt.data.card.cardContainer[0].lastChild).removeClass( 'front-card');
      !this.currentGameAttempt && this.gamesPlayed++;
      this.currentGameAttempt++;
      this.totalGameAttempt++;
      if ( !this.firstPick ){
        this.updateStats();
        return this.firstPick = evt.data;
      }
      this.secondPick = evt.data;
      
      
      setTimeout( this.isMatching, 500);
    }
  }

  isMatching(){
    if ( this.firstPick.img !== this.secondPick.img ){
      $(this.firstPick.card.cardContainer[0].firstChild).removeClass('back-card-clicked');
      $(this.firstPick.card.cardContainer[0].lastChild).addClass('front-card');
      $(this.secondPick.card.cardContainer[0].firstChild).removeClass('back-card-clicked');
      $(this.secondPick.card.cardContainer[0].lastChild).addClass('front-card');
    } else {
      this.matchedCount++;
      (this.matchedCount === (this.deck.cardLength / 2) ) && this.gameOver();
    }
    this.firstPick = this.secondPick = undefined;
    this.updateStats();
  }

  gameOver(){
    this.playSound('gameFinish.wav', 1900);
    $('.game-screen').addClass('open-modal');
    $('#stats-modal').css('display', 'block');
    this.updateStats();
  }

  updateStats(){
    this.accuracy = Math.floor( (this.gamesPlayed / this.totalGameAttempt ) * 100);
    if ( this.accuracy === Infinity || isNaN( this.accuracy )){
      this.accuracy = 0;
    }
    $('.click-attempt-num').text( this.currentGameAttempt );
    $('.accuracy-num').text( this.accuracy + "%");
    $('.total-game-num').text( this.gamesPlayed );
  }

  newGame(){
    this.playSound('reset_game.wav', 1900);
    this.modeHandler();
    this.closeModal();
  }

  resetGame(){
    this.firstPick = undefined;
    this.secondPick = undefined;
    this.currentGameAttempt = 0;
    this.matchedCount = 0;
    $('.game-section').empty();
    this.updateStats();
  }

  resetStat(){
    this.gamesPlayed = 0;
    this.currentGameAttempt = 0;
    this.totalGameAttempt = 0;
    this.matchedCount = 0;
    this.modeHandler();
  }

  playSound(sound, duration) {
    const audio = new Audio('./v1.5/sounds/' + sound);
    audio.volume = 0.1;
    audio.play();
    setTimeout(function(){
        audio.pause();
    }, duration);
}
}