import * as THREE from "three";

class CoreScene {
    constructor(name = ''){
        this.name = name;
        this.initial = true; 
        this.loadAssets = false;
        this.controls = {
            useControls: false,
            ctrl: null,
            sett:{
                target: new THREE.Vector3(0,0,0),
            },
        };
    }
    init(){}
    update(fi){}
}

export { CoreScene };