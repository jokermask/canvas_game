
class Sprite{

  constructor(id=Date.parse(new Date()),context,x,y,imgUrl,speed){
    this.x = x ;
    this.y = y ;
    this.id = id ;
    this.imgUrl = imgUrl ;
    this.speed = speed||10 ;
    this.listeners = [] ;
    this.behaviors = [] ;
    this.context = context ;
  }

  getId(){
    return this.id ;
  }

}

export {Sprite}