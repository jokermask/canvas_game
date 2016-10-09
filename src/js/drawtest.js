class drawTool{

  constructor(context){
    this.context = context ;
  }

 drawRect(){
   let context = this.context ;
   context.strokeStyle = "#0000ff" ;
   context.fillStyle = "blue" ;
   context.lineWidth = 1 ;
   context.fillRect(50,50,200,100) ;
 }
}

export {drawTool}
