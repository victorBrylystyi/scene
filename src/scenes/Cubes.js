
import { GObject } from "../core/GObject";
import * as THREE from "three";
import { CoreScene } from "../core/CoreScene";

class Cubes extends CoreScene{
    constructor (name){
        super(name)
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight,1,1000);
        this.objects = {
            leftCube: new GObject(),
            centerCube: new GObject(),
            rightCube: new GObject(),
        };
        this.asset = null;
    }
    init(){
        this.scene.background = new THREE.Color(0xeeeeee);

        for (let key in this.objects){
            this.objects[key].material = new THREE.MeshBasicMaterial({color:new THREE.Color('red')})
            this.objects[key].geometry = new THREE.BoxGeometry(2,2,2);
            this.objects[key].mesh = new THREE.Mesh(this.objects[key].geometry,this.objects[key].material);
            this.objects[key].mesh.position.z = -10;
        }

        this.objects.leftCube.mesh.position.x = -10;
        this.objects.rightCube.mesh.position.x = 10;

        this.scene.add(this.objects.leftCube.mesh);
        this.scene.add(this.objects.centerCube.mesh);
        this.scene.add(this.objects.rightCube.mesh);

    }
    update(fi){
        for (let k in this.objects){
            this.objects[k].mesh.rotation.x = fi;
            this.objects[k].mesh.rotation.y = -fi;
            this.objects[k].mesh.rotation.z = fi;
        }
    }
}

export { Cubes };