import {Player} from './player'
import {Barrier} from './barrier'

class Engine{

  constructor(canvasId){
    this.canvas = document.getElementById(canvasId) ;
    this.context = this.canvas.getContext('2d') ;
    this.playerList = [] ;
    this.barrierList = [] ;
    this.keyListenerList = [] ;
    //time
    this.startTime = 0 ;
    this.lastTime = 0 ;
    this.currentTime = 0 ;
    this.FPS = 30 ;
    //height and width
    this.bgHeight = this.canvas.height ;
    this.bgWidth = this.canvas.width ;
  }

  start(){
   this.listenerStart() ;
  }

  //sprite
  addPlayer(x,y,radius,imgUrl,speed){
    var player = new Player(this.context,x,y,radius,imgUrl,speed)
    this.playerList.push(player) ;
  }

  addBarrier(x,y,width,height){
    var barrier = new Barrier(this.context,x,y,width,height) ;
    this.barrierList.push(barrier) ;
  }
  //keylistener
  keyPressed(keyCode,spriteList,barrierList){
    let listener = undefined ;
    let key = "" ;

    switch (keyCode){
      case 32: key = "space" ; break ;
      case 37: key = "left" ; break ;
      case 38: key = "up" ; break ;
      case 39: key = "right" ; break ;
      case 40: key = "down" ; break ;
      case 13: key = "enter" ; break ;
    }

    for(let sprite of spriteList){
      listener = sprite.findKeyListener(key) ;
      if(listener){
        sprite.getBarrierList(barrierList) ;
        listener.run() ;
      }
    }
  }

  listenerStart(){
    console.log('listener start') ;
    let keyPressed = this.keyPressed ;
    let spriteList = this.playerList ;
    let barrierList = this.barrierList ;
    let keyList = [] ;
    let preesedTimer = null ;
    $(document).keydown((e)=>{
      if($.inArray(e.keyCode, keyList)==-1){
        keyList.push(e.keyCode) ;
      }
      clearInterval(preesedTimer) ;
      keyPressed(e.keyCode,spriteList,barrierList) ;
    });
    $(document).keyup((e)=>{
      if(keyList){
        if(e.keyCode==keyList[keyList.length-1]&&keyList.length!=1){
          keyList.pop();//先删除这个事件本身
          clearInterval(preesedTimer) ;
          let keyCode = keyList[keyList.length-1];//获得前一个事件
          //todo 持续触发keyPressed
          preesedTimer = setInterval(function(){
            keyPressed(keyCode, spriteList, barrierList);
          },30);
        }else{
          //松开的键是之前进栈的键，就直说把它从栈里删掉
          let idx = $.inArray(e.keyCode, keyList) ;
          keyList.splice(idx,1) ;
          if(keyList.length==0){
            clearInterval(preesedTimer) ;
          }
        }
      }
      console.log("up"+keyList.length) ;
    });
  }

}

export {Engine}