import { EventEmitter } from "events";

class Loader extends EventEmitter{
    constructor (){
        super();
    }
    load(){
        if (this.assets===undefined || this.assets.length==0) {
            console.warn('Loader. No any assets!'); 
            return;
        }
        this.emit('start');
        let loaded  = 0; 
        let assetsSize = this.assets.length;
        for (const assetsToLoad of this.assets){
            assetsToLoad.loader
            .setPath(assetsToLoad.path)
            .load(assetsToLoad.url,(file)=>{
                assetsToLoad.asset = file;
                loaded++;
                this.emit('progress',loaded/assetsSize);
                if (loaded>=assetsSize){
                    this.emit('load');
                }
            });
        }
    }
}

export { Loader };