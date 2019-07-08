$(document).ready( startApp );


let game;
function startApp(){
  game = new Game( closeModal );
  $('.load-game-btn').on('click', enterGame );
}

// Loading Page
function enterGame(){
  $('.load-game-btn').off('click', enterGame);
  $('.loader').addClass('loader-animation');
  game.playSound('enter.mp3', 1400);
  setTimeout(function(){
    game.startGame();
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
  $('.game-section').bind('click');
}