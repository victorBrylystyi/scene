import { CoreScene } from "../core/CoreScene";
import * as THREE from "three";
import { GObject } from "../core/GObject";


class AiEffects extends CoreScene{
    constructor(name){
        super(name);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight,1,1000);
        this.asset = null;
        this.objects = {
            centerObj: new GObject(),
            particles: new GObject(),
        };
        this.controls.useControls = true;
    }
    init(){

        this.scene.background =  new THREE.Color('black');
        //this.scene.background =  new THREE.Color(0xeeeeee);
        const near = 0;
        const far = 50;
        //this.scene.fog = new THREE.FogExp2(new THREE.Color(0xeeeeee),0.1);
        this.scene.fog = new THREE.Fog(new THREE.Color(0xeeeeee),near,far);
        const radius = 2;
        this.objects.centerObj.geometry = new THREE.OctahedronGeometry(radius);
        this.objects.centerObj.material = new THREE.MeshStandardMaterial({color:new THREE.Color(0xA915E5)});
        this.objects.centerObj.mesh = new THREE.Mesh(this.objects.centerObj.geometry,this.objects.centerObj.material);
        this.objects.centerObj.mesh.position.z = -10;
        this.light = new THREE.DirectionalLight();
        this.light.color = new THREE.Color('white');
        this.light.intensity = 1.0;
        this.light.position.y = 10;

        this.createPointFloor();

        this.scene.add(this.camera);
        this.scene.add(this.light);
        this.scene.add(this.objects.centerObj.mesh);
    }
    createPointFloor (){
        this.objects.particles.amount = new THREE.Vector2(100,100);
        this.objects.particles.separation = 100;
        const numParticles = this.objects.particles.amount.x * this.objects.particles.amount.y;
        this.objects.particles.positions = new Float32Array(numParticles * 3);
        this.objects.particles.scales = new Float32Array(numParticles);

        let i = 0, j = 0;

        for ( let ix = 0; ix < this.objects.particles.amount.x; ix ++ ) {
            for ( let iy = 0; iy < this.objects.particles.amount.y; iy ++ ) {
                this.objects.particles.positions[ i ] = ix * this.objects.particles.separation - ( ( this.objects.particles.amount.x * this.objects.particles.separation ) / 2 ); // x
                this.objects.particles.positions[ i + 1 ] = 0; // y
                this.objects.particles.positions[ i + 2 ] = iy * this.objects.particles.separation - ( ( this.objects.particles.amount.y * this.objects.particles.separation ) / 2 ); // z
                this.objects.particles.scales[ j ] = 1;
                i += 3;
                j ++;
            }
        }
        this.objects.particles.geometry = new THREE.BufferGeometry();
        this.objects.particles.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.objects.particles.positions, 3 ) );
        this.objects.particles.geometry.setAttribute( 'scale', new THREE.BufferAttribute( this.objects.particles.scales, 1 ) );

        this.objects.particles.vs = `
        attribute float scale;

        void main() {

            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

            gl_PointSize = scale * ( 100.0 / - mvPosition.z );

            gl_Position = projectionMatrix * mvPosition;

        }
        `;
        this.objects.particles.fs = `
        uniform vec3 color;

        void main() {

            if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

            gl_FragColor = vec4( color, 1.0 );

        }
        `;

        this.objects.particles.material = new THREE.ShaderMaterial( {

            uniforms: {
                color: { value: new THREE.Color( 0xffffff ) },
            },
            vertexShader: this.objects.particles.vs,
            fragmentShader:  this.objects.particles.fs,

        } );


        //

        this.objects.particles.mesh = new THREE.Points( this.objects.particles.geometry, this.objects.particles.material );
        this.scene.add( this.objects.particles.mesh );
    }
    createStarField(){
        this.starGeom = new THREE.BufferGeometry();
        for(let i=0;i<6000;i++) {
            let star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
          );
          starGeo.vertices.push(star);
        }
    }

    update(fi){

        let count = fi * 50;


        this.objects.centerObj.mesh.rotation.x = fi;
        this.objects.centerObj.mesh.rotation.y = fi;
        this.objects.centerObj.mesh.rotation.z = fi;


        //const positions = this.objects.particles.mesh.geometry.attributes.position.array;
        //const scales = this.objects.particles.mesh.geometry.attributes.scale.array;

        let i = 0, j = 0;

        for ( let ix = 0; ix < this.objects.particles.amount.x; ix ++ ) {

            for ( let iy = 0; iy < this.objects.particles.amount.y; iy ++ ) {

                this.objects.particles.mesh.geometry.attributes.position.array[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                                ( Math.sin( ( iy + count ) * 0.5 ) * 50 )-10;

                this.objects.particles.mesh.geometry.attributes.scale.array[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 20 +
                                ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 20;

                i += 3;
                j ++;

            }

        }

        this.objects.particles.mesh.geometry.attributes.position.needsUpdate = true;
        this.objects.particles.mesh.geometry.attributes.scale.needsUpdate = true;
    }
}

export { AiEffects };
