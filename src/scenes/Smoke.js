"use strict"

import * as THREE from "three";
import { CoreScene } from "../core/CoreScene";
import { GObject } from "../core/GObject";

class Smoke extends CoreScene{
    constructor (name){
        super(name);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,1,10000);
        this.asset = {
            smokeText:{
                map: null,
                load: ()=>{
                   new  THREE.TextureLoader()
                    //.setPath('./texture/')
                    .load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png',(map)=>{
                        this.asset.smokeText.map = map;
                        this.objects.textPlane.geometry = new THREE.PlaneGeometry(300,300);
                        this.objects.textPlane.material = new THREE.MeshLambertMaterial({color: 0x00ffff, map:this.asset.smokeText.map, opacity: 1, transparent: true, blending: THREE.AdditiveBlending})
                        this.objects.textPlane.mesh = new THREE.Mesh(this.objects.textPlane.geometry,this.objects.textPlane.material);
                        this.objects.textPlane.mesh.position.z = 800;
                        this.scene.add(this.objects.textPlane.mesh);
                    });
                },
            },
            smokeElem:{
                map: null,
                load: ()=>{
                   new  THREE.TextureLoader()
                    //.setPath('./texture/')
                    .load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png',(map)=>{
                        this.asset.smokeElem.map = map;
                        this.objects.smoke.material = new THREE.MeshLambertMaterial({color: 0x00dddd,map: map, transparent: true});
                        this.objects.smoke.geometry = new THREE.PlaneGeometry(300,300);

                        for (let p = 0; p < 150; p++) {
                            let particle = new THREE.Mesh(this.objects.smoke.geometry,this.objects.smoke.material);
                            particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
                            particle.rotation.z = Math.random() * 360;
                            this.scene.add(particle);
                            this.objects.smoke.patricles.push(particle);
                        }
                    });
                },
            },
        };
        this.objects = {
            cube: new GObject(),
            textPlane: new GObject(),
            smoke : {
                material:{},
                geometry:{},
                patricles: [],
            },
            centerObj:new GObject(),
        };
    }
    init(){
        this.camera.position.z = 1000;
        //this.scene.background = new THREE.Color('black');

        // this.objects.centerObj.geometry = new THREE.OctahedronGeometry(70);
        // this.objects.centerObj.material = new THREE.MeshStandardMaterial({color:new THREE.Color(0xA915E5)});
        // this.objects.centerObj.mesh = new THREE.Mesh(this.objects.centerObj.geometry,this.objects.centerObj.material);
        // this.objects.centerObj.mesh.position.z = 700;
        // this.scene.add(this.objects.centerObj.mesh);

        // this.objects.cube.geometry = new THREE.BoxGeometry( 200, 200, 200 );
        // this.objects.cube.material = new THREE.MeshLambertMaterial( { color: 0xaa6666, wireframe: false } );
        // this.objects.cube.mesh = new THREE.Mesh( this.objects.cube.geometry, this.objects.cube.material );

        // this.objects.textPlane.geometry = new THREE.PlaneGeometry(100,100);
        // this.objects.textPlane.material = new THREE.MeshLambertMaterial({color: 0x00ffff, map:this.asset.smokeText.map, opacity: 1, transparent: true, blending: THREE.AdditiveBlending})
        // this.objects.textPlane.mesh = new THREE.Mesh(this.objects.textPlane.geometry,this.objects.textPlane.material);
        // this.objects.textPlane.mesh.position.z = 800;
        // this.scene.add(this.objects.textPlane.mesh);

        this.createLight();

        // this.objects.smoke.material = new THREE.MeshLambertMaterial({color: 0x00dddd, transparent: true});
        // this.objects.smoke.geometry = new THREE.PlaneGeometry(300,300);

        // for (let p = 0; p < 150; p++) {
        //     let particle = new THREE.Mesh(this.objects.smoke.geometry,this.objects.smoke.material);
        //     particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
        //     particle.rotation.z = Math.random() * 360;
        //     this.scene.add(particle);
        //     this.objects.smoke.patricles.push(particle);
        // }

    }
    createLight(){
        this.light = new THREE.DirectionalLight(0xffffff,0.5);
        this.light.position.set(-1,0,1);
        this.scene.add(this.light);
    }
    evolveSmoke(fi) {
        let sp = this.objects.smoke.patricles.length;
        while(sp--) {
            this.objects.smoke.patricles[sp].rotation.z = (fi *1.1);
            
            //this.objects.smoke.patricles[sp].position.z = Math.sin(fi)*1000;

        }
    }
    update(fi){
        this.evolveSmoke(fi);
        // this.objects.centerObj.mesh.rotation.x=fi;
        // this.objects.centerObj.mesh.rotation.y=fi;
        // this.objects.centerObj.mesh.rotation.z=fi;
    }
}

export { Smoke };