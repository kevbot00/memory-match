class Mode {
  constructor( modeCallback ){
    this.mode = this.getMode();
    this.modeHandler = modeCallback;
    this.setMode = this.setMode.bind( this );
  }

  setMode( evt ){
    let easyMode = $( 'div.easy' );
    let hardMode = $( 'div.hard' );
    const currentEvt = $(evt.currentTarget).attr('class')
    if ( !currentEvt.includes('active')){
      if ( currentEvt.includes('easy')){
        easyMode.addClass('active active-mode');
        hardMode.removeClass('active active-mode');
      } else {
        easyMode.removeClass('active active-mode');
        hardMode.addClass('active active-mode');
      }
      return this.modeHandler( this.getMode() );
    }
  }

  getMode(){
    this.mode = ($('div.easy').attr('class').includes('active')) ? 6 : 9;
    return this.mode
  }
}