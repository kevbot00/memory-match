class Deck {
  constructor( clickCallback ){
    this.clickCallback = clickCallback;
    // EASY MODE 6 CARDS / HARD MODE 9 CARDS
    this.mode = null;
    this.cardArray = [];
  }

  get cardLength(){
    return this.cardArray.length;
  }

  set cardLength( mode ){
    this.mode = mode;
    this.cardArray = [];
  }

  generateDeck(){
    this.generateRandomNumber();
  }

  generateRandomNumber(){
    while ( this.cardArray.length < this.mode ){
      let randNum = Math.floor( Math.random() * 14 ) + 1;
      if ( !this.cardArray.includes(randNum)){
        this.cardArray.push( randNum );
      }
    }
    this.shuffleCards();
  }
  
  generateRandomCards( deck ){
    let count = 0;
    while ( count < (this.mode * 2) ){
      this.card = new Card( this.cardArray[count], this.clickCallback )
      this.card.render();
      count++
    }
  }

  shuffleCards(){
    const secondSet = [...this.cardArray];
    this.cardArray = this.cardArray.concat( secondSet );
    let count = this.cardArray.length;
    let tempCard;
    let randIndex;
    while ( 0 !== count ){
      randIndex = Math.floor( Math.random() * count--);
      tempCard = this.cardArray[count];
      this.cardArray[count] = this.cardArray[randIndex];
      this.cardArray[randIndex] = tempCard;
    }
    this.generateRandomCards( this.cardArray );
  }

  render(){
    this.generateRandomNumber();
    
  }
}