import {Sprite} from './sprite'

class Barrier extends Sprite{

  constructor(context,x,y,width,height) {
    super(context,x,y) ;
    this.width = width ;
    this.height = height ;
    console.log(height) ;
    this.drawBarrier() ;
  }

  drawBarrier(){
    this.context.fillStyle = 'black' ;
    this.context.fillRect(this.x,this.y,this.width,this.height) ;
  }
}

export {Barrier}