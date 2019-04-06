$(document).ready(function(){
    initializeApp();
});

function initializeApp(){
    $('.loadGameBtn').on('click', enterGame);
    setMode();
    // generateRandomCards(images);
    // clickedCard();
    openModalBtn();
    $('.reset').on('click', resetGameBtn);
    $('.resetStat').on('click', resetAllStats);
    $('.playAgainBtn').on('click', resetGameBtn);
    $('button.mode').on('click', setMode);
}

var images = ['pic1.jpg' ,'pic2.jpg','pic3.jpg','pic4.jpg','pic5.jpg','pic6.jpg','pic7.jpg','pic8.jpg','pic9.jpg'];

function setMode(){
    var easyBtn = $('button.easy');
    var hardBtn = $('button.hard');
    $(this).addClass('active').siblings().removeClass('active');
    if (hardBtn.attr('class').includes('active')){
        hardBtn.attr('disabled', true);
        easyBtn.attr('disabled', false);
        resetCurrentStat();
        return generateRandomCards(images);
    } else if (easyBtn.attr('class').includes('active')){
        var easyImg = images.slice(0,5);
        easyBtn.attr('disabled', true);
        hardBtn.attr('disabled', false);
        resetCurrentStat();
        return generateRandomCards(easyImg);      
    }
}

function generateRandomCards(imgArray){
    $('.cardContainer').remove();
    var splicedCards = [];
       //copy array and merge together;
    var copiedArray = imgArray;
    var mergedArray = copiedArray.concat(imgArray);
    for (var i = 0; i < mergedArray.length + 1;i++){
        var randomIndex = Math.floor(Math.random() * mergedArray.length);
        var cardContainerElem = $("<div class='cardContainer'>");
        var frontDiv = $("<div class='front cards'>");
        var backDiv = $("<div class='back cards'>");
        var frontImg = $("<img class='cardImg' src='./images/getSchwifty/" + mergedArray[randomIndex] +"'>");
        var backImg = $("<img class='cardImg backCard' src='./images/getSchwifty/pic10.jpg'>");
        frontImg.appendTo(frontDiv);
        backImg.appendTo(backDiv);
        frontDiv.appendTo(cardContainerElem);
        backDiv.appendTo(cardContainerElem);
        $('.gameDisplay').append(cardContainerElem);
        splicedCards.push(mergedArray[randomIndex]);
        mergedArray.splice(randomIndex, 1);
        i = 0;
    }
    clickedCard(copiedArray);
}

var matchCount = null;
var gamesPlayed = 0;
var attempt = null;
var pickedTwoCards = false;

function clickedCard(arr) {
    var firstCard = null;
    var secondCard = null;
    var firstElement = null;
    var secondElement = null;
    var attemptNum = $('.attemptNum');
    $('.cardContainer').on('click', '.back', function(evt){
        if (!pickedTwoCards){
        evt.currentTarget.style.display = 'none';
            if (firstCard){
                pickedTwoCards = true;
                secondCard = evt.delegateTarget.children[0].firstChild.src;
                secondElement = evt.currentTarget;
                var matched = checkCardMatch(firstCard, secondCard);
                if (!matched){
                    attempt++;
                    attemptNum.text(attempt);
                    setTimeout(function(){
                        firstElement.style.display = 'inline-block';
                        secondElement.style.display = 'inline-block';   
                        pickedTwoCards = false; 
                    }, 500);                         
                } else {
                    firstElement.style.display = 'none';
                    secondElement.style.display = 'none';
                    pickedTwoCards = false;
                    matchCount++;
                    attempt++;
                    attemptNum.text(attempt);    
                    gameOverModal(arr);                    
                }
                firstCard = null;
                secondCard = null;               
            } else {
                firstCard = evt.delegateTarget.children[0].firstChild.src;
                firstElement = evt.currentTarget;
            }
        //Remove shake on revealed card
        evt.delegateTarget.children[0].classList.remove('front');            
        }  
    });
}

function checkCardMatch(firstPick, secondPick){
    if (firstPick === secondPick){
       return true;      
    }
    return false;
}

//Reset Game Button
function resetGameBtn(){
    // if (matchCount !== images.length){
    //     // gamesPlayed++;
    // }
    resetCurrentStat();
    setMode();
}

function resetCurrentStat(){
    firstElement = null;
    secondElement = null;
    matchCount = null;
    attempt = 0;
    $('.cardContainer').remove();
    $('.totalNum').text(gamesPlayed);
    $('.attemptNum').text(attempt);
    // $('.accNum').text(0);
}

// Modal Function
function openModalBtn(){
    var modal = $('#statsModal');
    var modalBtn = $('#statsBtn');
    var close = $('.close');
    modalBtn.on('click', function(){
        modal.css('display', 'block');
    });
    close.on('click', function(){
        modal.css('display', 'none');
    });
}

function gameOverModal(arr){
    if (matchCount === arr.length){
        gamesPlayed++;
        var accuracyDisplay = Math.floor((gamesPlayed / attempt) * 100);
        $('#statsModal').css('display','block');
        $('.accNum').text(accuracyDisplay + "%");
    }
    $('.totalNum').text(gamesPlayed);
}

function resetAllStats(){
    $('.attemptNum').text('0');
    $('.totalNum').text('0');
    $('.accNum').text('0');
    gamesPlayed = 0;
}

//loading page 
function enterGame(){
    $('.loader').addClass('loaderAnimation');
    setTimeout(function(){
        $('.loader').css('display', 'none');
    },550);
    
    
    $('.gameScreen').css('display','block');
    
}