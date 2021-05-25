
import * as THREE from "three";
import { CoreScene } from "../core/CoreScene";
import { GObject } from "../core/GObject";
//import text from '/Users/user/_work/projects/learning/threejs/scene_Conv/texture'


class Occlusion extends CoreScene{
    constructor(name){
        super(name);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight,1,1000);
        this.objects = {
            mask: new GObject(),
            base: new GObject(),
            another: new GObject(),
        };
        this.controls.useControls = true;
        this.asset = {
            envMap:{
                map: null,
                load: ()=>{
                   new  THREE.CubeTextureLoader()
                    .setPath('./texture/plane_map/')
                    .load([              
                        'px.png',
                        'nx.png',
                        'py.png',
                        'ny.png',
                        'pz.png',
                        'nz.png'
                      ],(map)=>{
                        this.scene.background = map;
                        this.asset.envMap.map = map;
                    });
                },
            },
        };
    }
    init(){
        this.scene.background =  new THREE.Color(0xeeeeee);
        this.objects.mask.geometry = new THREE.BoxGeometry(2,2,2);
        this.objects.mask.material = new THREE.MeshBasicMaterial({color: new THREE.Color('red')});
        this.objects.mask.mesh = new THREE.Mesh(this.objects.mask.geometry,this.objects.mask.material);
        this.objects.mask.mesh.name = 'mask';
        this.objects.mask.mesh.position.set(0,0,-10);
        this.objects.mask.mesh.material.colorWrite = false;
    
        this.objects.base.geometry = new THREE.BoxGeometry(15,15,15);
        this.objects.base.material = new THREE.MeshBasicMaterial({color: new THREE.Color('blue')});
        this.objects.base.mesh = new THREE.Mesh(this.objects.base.geometry,this.objects.base.material);
        this.objects.base.mesh.name = 'base';
        this.objects.base.mesh.position.set(0,0,-30);
    
        this.objects.another.geometry = new THREE.SphereGeometry(0.3,24,24);
        this.objects.another.material = new THREE.MeshBasicMaterial({color: new THREE.Color('green')});
        this.objects.base.mesh.name = 'another';
        this.objects.another.mesh = new THREE.Mesh(this.objects.another.geometry,this.objects.another.material);
        this.objects.another.mesh.position.set(0,0,-3);

        this.scene.add(this.objects.base.mesh);
        this.scene.add(this.objects.mask.mesh);
        this.scene.add(this.objects.another.mesh);
    }
    update(fi){
        this.objects.base.mesh.rotation.x = fi;
        this.objects.base.mesh.rotation.y = fi;
        this.objects.base.mesh.rotation.z = fi;
    
        this.objects.mask.mesh.rotation.x = -fi*2;
        this.objects.mask.mesh.rotation.y = -fi*2;
        this.objects.mask.mesh.rotation.z = -fi*2;
    
        //this.threeInstance.orbit.update();
    }

}

export { Occlusion };





/*
let oclApp = new Application('Test occlusion');

oclApp.init = function (){

    this.threeInstance = {
        renderer: new THREE.WebGLRenderer({canvas}),
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 ),
    };

    this.threeInstance.renderer.setSize(window.innerWidth, window.innerHeight);
    this.threeInstance.renderer.setPixelRatio(window.devicePixelRatio);
    
    window.addEventListener('resize',this.resize());
    
    this.threeInstance.scene = new THREE.Scene();
    this.threeInstance.scene.background =  new THREE.Color(0xeeeeee);

    this.objects = {
        some: new GObject(),
        mask: new GObject(),
        another: new GObject(),
    };

    this.objects.mask.geometry = new THREE.BoxGeometry(2,2,2);
    this.objects.mask.material = new THREE.MeshBasicMaterial({color: new THREE.Color('red')});
    this.objects.mask.mesh = new THREE.Mesh(this.objects.mask.geometry,this.objects.mask.material);
    this.objects.mask.mesh.name = 'mask';
    this.objects.mask.mesh.position.set(0,0,-10);
    this.objects.mask.mesh.material.colorWrite = false;

    this.objects.some.geometry = new THREE.BoxGeometry(15,15,15);
    this.objects.some.material = new THREE.MeshBasicMaterial({color: new THREE.Color('blue')});
    this.objects.some.mesh = new THREE.Mesh(this.objects.some.geometry,this.objects.some.material);
    this.objects.some.mesh.name = 'some';
    this.objects.some.mesh.position.set(0,0,-30);

    this.objects.another.geometry = new THREE.SphereGeometry(0.3,24,24);
    this.objects.another.material = new THREE.MeshBasicMaterial({color: new THREE.Color('green')});
    this.objects.another.mesh = new THREE.Mesh(this.objects.another.geometry,this.objects.another.material);
    this.objects.another.mesh.position.set(0,0,-3);


    // this.threeInstance.orbit = new OrbitControls(this.threeInstance.camera,canvas);
    // this.threeInstance.orbit.minDistance = 2;
    // this.threeInstance.orbit.maxDistance = 50;
    // this.threeInstance.orbit.target.set(this.objects.some.mesh.position.x,
    //                                     this.objects.some.mesh.position.y,
    //                                     this.objects.some.mesh.position.z);

    this.threeInstance.scene.add(this.objects.mask.mesh);
    this.threeInstance.scene.add(this.objects.some.mesh);
    this.threeInstance.scene.add(this.objects.another.mesh);

};

oclApp.update = function (fi){

    this.objects.some.mesh.rotation.x = fi;
    this.objects.some.mesh.rotation.y = fi;
    this.objects.some.mesh.rotation.z = fi;
  
    this.objects.some.mesh.rotation.x = -fi*2;
    this.objects.some.mesh.rotation.y = -fi*2;
    this.objects.some.mesh.rotation.z = -fi*2;
  
    //this.threeInstance.orbit.update();

};

export { oclApp };
*/




