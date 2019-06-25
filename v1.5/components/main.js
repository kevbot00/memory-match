$(document).ready( startApp );


let game;
function startApp(){
  game = new Game( closeModal );
  $('.load-game-btn').on('click', enterGame );
}

// Loading Page
function enterGame(){
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
  var modal = $('#stats-modal');
  var statsBtn = $('.stats-btn');
  var close = $('.close-btn');
  statsBtn.on('click', function(){
    modal.css('display', 'block');
    $('.game-screen').addClass('open-modal');
    $('.game-section').attr('pointer-events', 'none');
    

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