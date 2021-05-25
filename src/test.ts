/*
export default interface ICore {
    name :string;
    init: () => void;
    render: () => void;
}


import ICore from "./ICore";
import { Occlusion } from "./Occlusion";
import * as THREE from "three";


type Effect = {};

export class App implements ICore{
    name : string;
    effects: Effect[] = [];
    curentEffect : Effect;
    


    constructror(name=''){
        this.name=name;
        this.effects = [];
        const ocl = new Occlusion('occlusion');
        const render = new THREE.WebGLRenderer({});



    }
    init(){
        
    }
    render(){

    }




}

*/