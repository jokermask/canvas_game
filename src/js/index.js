import {Engine} from './gameEngine'

$(function(){
  init() ;
});

function init(){
  initGame() ;
}

function initGame(){
  var engine = new Engine('canvas') ;
  engine.addPlayer(10,10,10,null,10) ;
  engine.addBarrier(100,100,50,200) ;
  engine.start() ;
}