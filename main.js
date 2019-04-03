var images = ['pic1.jpg','pic2,jpg','pic3.jpg','pic4.jpg','pic5.jpg','pic6.jpg','pic7.jpg','pic8.jpg','pic9.jpg'];
// var gameDisplay = $('.gameDisplay');
// var backCard = $('<img>').attr('src', './images/getShwifty/pic10.jpg');
// var cardContainer = $('<div>').addClass('cardContainer');
// var frontCards = $('<div>').addClass('front cards');
// var backCards = $('<div>').addClass('back cards');
// var frontCardImg = $('<img>').addClass('cardImg');
// var backCardImg = $('<img>').addClass('back cardImg');

$(document).ready(function(){
    console.log('Document Ready');
    initializeApp();
});

function initializeApp(){
    // generateRandomCard(images);
    flipCard();
}


// function generateRandomCard(array){
//     for (var index = 0; index < images.length; index++){
//         var randomIndex = Math.floor(Math.random() * images.length);
//         gameDisplay.append(cardContainer);        
//         $('.cardContainer').append(frontCards);
//         $('.front .cards').append(frontCardImg);
//         gameDisplay.append(cardContainer);
//         $('.cardContainer').append(backCards);
//         $('.back .cards').append(backCardImg);
//         $('.back .cards').attr('src','./images/getShwifty/pic1.jpg');
//     }
// }

var flippedCardsCounter = null;
var matchedCounter = null;
debugger;
function flipCard(){
    var firstClickedCard = null;
    var secondClickedCard = null;
    $('.gameDisplay').on('click', '.back', function(event){
        $(this).css('display','none');     
        // if (firstClickedCard){
        //     secondClickedCard = $(this).children();
        //     checkAnswer(firstClickedCard, secondClickedCard);
        // } else {
        //     firstClickedCard = $(this).children();
        //     return;
        // }
        // flippedCardsCounter++;
        // console.log(firstClickedCard);
        
        
    });
}

function checkAnswer(firstCard, secondCard){
    if (firstCard.attr('src') !== secondCard.attr('src')){
        firstCard.parent().attr('display','inline-block');
        secondCard.parent().attr('display','inline-block');
    } 
}