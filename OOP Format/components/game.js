class Game {
  constructor(){
    this.matchedCount = 0;
    this.firstPick = undefined;
    this.secondPick = undefined;
    this.gamesPlayed = 0;
    this.currentAttempt = 0;
    this.totalAttempt = 0;
    this.accuracy = 0;
    
    this.clickHandler = this.clickHandler.bind( this );
    this.isMatching = this.isMatching.bind( this );   
    this.modeHandler = this.modeHandler.bind( this ); 
  }

  startGame(){
    this.mode = new Mode( this.modeHandler );
    this.deck = new Deck( this.clickHandler );
    this.deck.cardLength = this.mode.getMode();
    this.deck.render();
    $('div.mode').on('click', this.mode.setMode);
  }

  modeHandler( mode ){
    this.resetGame();
    this.deck.cardLength = mode;
    this.deck.render();
  }

  clickHandler( evt ){
    if ( !this.firstPick || !this.secondPick ){
      this.currentAttempt++;
      this.totalAttempt++;
      this.updateStats();
      $(evt.data.card.cardContainer[0].firstChild).addClass( 'back-card-clicked');
      $(evt.data.card.cardContainer[0].lastChild).removeClass( 'front-card');
      if ( !this.firstPick ){
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
    this.gamesPlayed++;
    this.playSound('gameFinish.wav', 1900);
    // OPEN MODAL
    $('.game-screen').addClass('open-modal');
    $('#stats-modal').css('display', 'block');
    this.updateStats();
  }

  updateStats(){
    console.log( this.totalAttempt );
    this.accuracy = Math.floor( (this.gamesPlayed / this.totalAttempt ) * 100);
    if ( this.accuracy === Infinity ){
      this.accuracy = 0;
    }
    $('.click-attempt-num').text( this.currentAttempt );
    $('.accuracy-num').text( this.accuracy + "%");
    $('.total-game-num').text( this.gamesPlayed );
  }

  resetGame(){
    $('.game-section').empty();
    this.firstPick = undefined;
    this.secondPick = undefined;
    this.currentAttempt = 0;
    this.matchedCount = 0;
    this.gamesPlayed++;
    this.updateStats();
  }

  resetStat(){
    this.gamesPlayed = 0;
    this.totalAttempt = 0;
    this.resetGame();
    this.modeHandler();
  }

  playSound(sound, duration) {
    var audio = new Audio('../sounds/' + sound);
    audio.volume = 0.1;
    audio.play();
    setTimeout(function(){
        audio.pause();
    }, duration);
}
}