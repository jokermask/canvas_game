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
    //socket
    this.socket = io.connect("http://localhost:3000",['websocket']) ;
    this.addPlayer = this.addPlayer.bind(this);
    this.listenerStart = this.listenerStart.bind(this) ;
    this.initSocket = this.initSocket.bind(this) ;
    this.initSocket() ;
  }

  start(){
   this.listenerStart() ;
  }

  //sprite
  //todo http://es6.ruanyifeng.com/#docs/class
  addPlayer(data){
    let socket = this.socket ;
    var player = new Player(data.id,this.context,data.x,data.y,data.radius,data.imgUrl,data.speed)
    this.playerList.push(player) ;
    console.log(socket) ;
    socket.emit("addPlayer",data) ;
  }

  addBarrier(data){
    var barrier = new Barrier(data.id,this.context,data.x,data.y,data.width,data.height) ;
    this.barrierList.push(barrier) ;
  }

  initSocket(){

    let engine = this ;
    let addPlayer = this.addPlayer ;

    this.socket.on('connect', function () {

    this.on('message',function(){

    });
    //僵硬的this
    this.on("addPlayer",function(data){
      for(let i=0;i<engine.playerList.length;i++){
        if(data.id==engine.playerList[i].getId()){
          return ;
        }
      }
      addPlayer(data) ;
    });

    this.on('disconnect',function(){
      console.log("disconnect") ;
    });
  });

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
    });
  }

}

export {Engine}