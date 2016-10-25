import {Engine} from './gameEngine'

$(function(){
  init() ;
});

function init(){
  initGame() ;
}

function initGame(){
  var engine = new Engine('canvas') ;
  var x = (Math.random()*100) ;
  var id = Date.parse(new Date()) ;
  console.log(id) ;
  engine.addPlayer({
    id:id,
    x:x,
    y:10,
    radius:10,
    imgUrl:null,
    speed:10
  }) ;
  engine.addBarrier({
    id:"100",
    x:100,
    y:100,
    width:50,
    height:200
  }) ;
  engine.start() ;
}

