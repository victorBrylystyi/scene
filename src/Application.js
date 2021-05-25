import { Core } from "./core/Core";
import * as THREE from "three";
import { GUI } from "dat.gui";

import { Cubes } from "./scenes/Cubes";
import { Occlusion } from "./scenes/Occlusion";
import { Loader } from "./core/Loader";
import { AiEffects } from "./scenes/AiEffects";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Smoke } from "./scenes/Smoke";

class Application extends Core{
    constructor(name){
        super(name);
        this.gui = new GUI();
        this.scenes = [];
        this.currentScene = null;
        this.canvas = document.getElementById('canvas');
        this.loader = new Loader();
        this.menu = {
            scenes: 'Smoke',
            test1: 0,
            test2: 10,
        };
        this.init();
        //console.log(this.loader);
    }
    load(){
        if (!this.currentScene.loadAssets && this.currentScene.asset){
            for (let key in this.currentScene.asset){
                this.currentScene.asset[key].load();
            }
            this.currentScene.loadAssets = true;
        }
    } 
    init(){
        this.scenes[0] = new Cubes('cubes');
        this.scenes[1] = new Occlusion('occlusion effect');
        this.scenes[2] = new AiEffects('AiEffects');
        this.scenes[3] = new Smoke('smoke');
        
        this.currentScene = this.scenes[3];
        
        this.renderer = new THREE.WebGLRenderer({canvas:this.canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.gui.add(this.menu,'scenes',['Cubes','Oclussion','AiEffects','Smoke']).onChange((val)=>{
            switch(val){
                case 'Cubes':
                    this.currentScene = this.scenes[0];
                    this.gui.__folders.Folder2.hide();
                    this.gui.__folders.Folder1.show();
                    break;
                         case 'Oclussion':
                            this.currentScene = this.scenes[1];
                            this.gui.__folders.Folder1.hide();
                            this.gui.__folders.Folder2.show();
                        break;
                            case 'AiEffects':
                                this.currentScene = this.scenes[2];
                                this.gui.__folders.Folder1.hide();
                                this.gui.__folders.Folder2.show();
                            break;
                                case 'Smoke':
                                    this.currentScene = this.scenes[3];
                                    this.gui.__folders.Folder1.hide();
                                    this.gui.__folders.Folder2.show();
                                break;

            }
        });

        this.gui.add(this.menu,'test1',0,10,0.1);
        this.gui.add(this.menu,'test2',0,20,0.1);
        this.gui.addFolder('Folder1');
        this.gui.addFolder('Folder2');
        this.gui.__folders.Folder2.hide();

    }
    animate(){
        this.appConfig.dT = (window.performance.now() - this.appConfig.tPrev) * this.appConfig.fps / 1000;
        this.appConfig.fi += this.appConfig.speed * this.appConfig.dT;
        this.load();
        if (this.currentScene){
            if (this.currentScene.initial){
                this.currentScene.init();
                window.addEventListener('resize',()=>{
                    this.resize(this.currentScene.camera);
                });
                this.currentScene.initial = false;
            }
            this.controls(this.currentScene);
            //this.currentScene.controls.ctrl.update();
            this.currentScene.update(this.appConfig.fi);
            this.renderer.render(this.currentScene.scene, this.currentScene.camera);
        }
        this.appConfig.tPrev = window.performance.now();
    }
    render(){
        this.animate();
        requestAnimationFrame(()=>{
        this.render()
        });
    }
    resize(camera){
        camera.aspect =  window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    controls(scene){
        if (scene.controls.useControls){
            if (!scene.controls.ctrl) {
                scene.controls.ctrl = new OrbitControls(scene.camera,this.canvas);
                console.log(scene);
            }
            scene.controls.ctrl.target.set(0,0,-10);
            scene.controls.ctrl.minDistance = 0.1;
            scene.controls.ctrl.maxDistance = 100;
      
            //scene.controls.ctrl.maxPolarAngle = Math.PI / 2;
            scene.controls.ctrl.update();
        } else {
           // scene.controls.ctrl = null;
            return;
        }

    }
}

export { Application };
