class Card {
  constructor( imgNum, clickCallback ){
    this.clickCallback = clickCallback;
    this.frontImg = `./v1.5/images/pic${imgNum}.jpg`;
    this.cardContainer = {}
  }

  render(){
    const cardContainer = $('<div>').addClass('card-container');
    const backCard = $('<div>').addClass('back-card cards');
    const backImg = $('<img class="back">').attr('src', './v1.5/images/back.jpg' ).click( { card: this, img: this.frontImg }, this.clickCallback );
    const frontCard = $('<div>').addClass('front-card cards');
    const frontImg = $('<img class="front">').attr('src', this.frontImg )
    backCard.append( backImg );
    frontCard.append( frontImg );
    cardContainer.append( backCard, frontCard );
    this.cardContainer = cardContainer;
    $('.game-section').append( cardContainer );
  }
}