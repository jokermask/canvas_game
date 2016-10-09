
class Sprite{

  constructor(context,x,y,imgUrl,speed){
    this.x = x ;
    this.y = y ;
    this.imgUrl = imgUrl ;
    this.speed = speed||10 ;
    this.listeners = [] ;
    this.behaviors = [] ;
    this.context = context ;
  }

}

export {Sprite}