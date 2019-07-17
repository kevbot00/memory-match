$(document).ready( startApp );


let game;
function startApp(){
  game = new Game( closeModal );
  $('.load-game-btn').on('click', enterGame );
  game.startGame();
}

// Loading Page
function enterGame(){
  $('.load-game-btn').off('click', enterGame);
  $('.loader').addClass('loader-animation');
  game.playSound('enter.mp3', 1400);
  setTimeout( () => {
    openModalBtn();
    $('.loader').css('display', 'none');   
    $('.game-screen').css('display','block');
  },300);

}

// Modal Function
function openModalBtn(){
  const modal = $('#stats-modal');
  const statsBtn = $('.stats-btn');
  const close = $('.close-btn');
  statsBtn.on('click', function(){
    $('.modal-title').text( 'Statistics')
    $('.attempt-stat-title').text('Total Attempts')
    $('.click-attempt-num').text( game.totalGameAttempt );
    $('.total-game-stat-title').text('Total Games')
    $('.total-game-num').text( game.gamesPlayed );
    if ( game.gamesPlayed && game.totalGameAttempt ){
      const accuracy = (game.totalAvailableMatch/game.totalGameAttempt) * 100
      $('.accuracy-num').text( Math.floor(accuracy) + "%" );
    }
    modal.css('display', 'block');
    $('.game-screen').addClass('open-modal');
    $('.game-section').css('pointer-events', 'none');

  });
  close.on('click', closeModal);
  $(document).on('keydown', function(evt){
    closeModal();
  });
}

function closeModal(){
  $('#stats-modal').css('display', 'none');
  $('.game-screen').removeClass('open-modal');
  $('.game-section').css('pointer-events', 'auto');
}