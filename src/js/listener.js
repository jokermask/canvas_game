class Listener{
  constructor(key,callback){
    this.key = key ;
    this.callback = callback ;
  }

  run(){
    this.callback() ;
  }

  getKey(){
    return this.key ;
  }

}

export {Listener}
