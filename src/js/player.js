import {Sprite} from './sprite'
import {Listener} from './listener'

class Player extends Sprite{

  constructor(context,x,y,radius,imgUrl,speed){
    super(context,x,y,imgUrl,speed) ;
    this.radius = radius ;
    this.drawImage() ;
    this.initListener() ;
  }

  drawImage(){
    if(this.imgUrl) {
      this.image = new Image() ;
      this.image.src = imgUrl ;
      var sw = this.image.width / this.frame;
      var sx = this.currentFrame * sw;
      this.context.drawImage(this.image, sx, 0, sw, this.image.height, this.x, this.y, sw, this.image.height);
      this.currentFrame++;
      this.currentFrame = (this.currentFrame >= this.frame) ? 0 : this.currentFrame;
    }else{
      this.context.fillStyle = 'black' ;
      this.context.beginPath();
      this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,true);
      this.context.closePath();
      this.context.fill();
    }
  }

  update(x,y){
    this.context.clearRect(this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
    this.context.beginPath();
    this.context.arc(x,y,this.radius,0,2*Math.PI,true);
    this.context.closePath();
    this.context.fill();
    this.x = x ;
    this.y = y ;
  }

  addListener(keyListener){
    this.keyListenerList.push(keyListener) ;
  }

  findKeyListener(key){
    for(let i in this.listeners){
      if(this.listeners[i].getKey()===key){
        return this.listeners[i] ;
      }
    }
    return null ;
  }
  //default listener
  initListener(){
    this.listeners['up'] = new Listener('up',()=>{
      if(!this.isCollsion(this.x, this.y - this.speed)) {
        this.update(this.x, this.y - this.speed);
      }
    });
    this.listeners['down'] = new Listener('down',()=>{
      if(!this.isCollsion(this.x, this.y + this.speed)) {
        this.update(this.x, this.y + this.speed);
      }
    });
    this.listeners['left'] = new Listener('left',()=>{
      if(!this.isCollsion(this.x - this.speed, this.y)) {
        this.update(this.x - this.speed, this.y);
      }
    });
    this.listeners['right'] = new Listener('right',()=>{
      if(!this.isCollsion(this.x + this.speed, this.y)) {
        this.update(this.x + this.speed, this.y);
      }
    });
  }

  //collision dect
  getBarrierList(barrierList){
    this.barrierList = barrierList ;
  }

  isCollsion(x,y){
    for(let i in this.barrierList){
      if(this.collisionDect(this.barrierList[i],{
            x:x-this.radius,
            y:y-this.radius,
            width:this.radius*2,
            height:this.radius*2
          })){
        return true ;
      }
    }
    return false ;
  }

  collisionDect(obj1,obj2){
    let x1 = obj1.x ;
    let y1 = obj1.y ;
    let x2 = obj2.x ;
    let y2 = obj2.y ;
    let w1 = obj1.width ;
    let h1 = obj1.height ;
    let w2 = obj2.width ;
    let h2 = obj2.height ;
    //起始点距离之差小于在前矩形的宽度和高度则碰撞
    if(x1<x2){
      if(y1<y2){
        return (x2-x1)<w1 && (y2-y1)<h1 ;
      }else{
        return (x2-x1)<w1 && (y1-y2)<h2
      }
    }else{
      if(y1<y2){
        return (x1-x2)<w2 && (y2-y1)<h1 ;
      }else{
        return (x1-x2)<w2 && (y1-y2)<h2
      }
    }
  }
}

export {Player}