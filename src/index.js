"use strict"

import { Application } from "./Application.js";
// import { Loader } from "./core/Loader.js";
// import * as THREE from "three";

let app = new Application('manager');

// let testArr = [{t1:1,t2:2},{t1:1,t4:2},{t1:1,t6:2}];

// for (let elem of testArr){
//     elem.load(()=>{
       
//     }); 
// }

// const testLoader = new Loader();
// let envMap = {
//     loader: new  THREE.CubeTextureLoader(),
//     path: './texture/plane_map/',
//     url:[              
//         'px.png',
//         'nx.png',
//         'py.png',
//         'ny.png',
//         'pz.png',
//         'nz.png'
//     ],
//     asset: null,
// };
// let texture = {
//     loader: new  THREE.TextureLoader(),
//     path: './texture/',
//     url:'westworld.jpeg',
//     asset: null,
// };
// let modelCar = {
//     loader: new  GLTFLoader(),
//     path: './models/',
//     url:'amg_e63_2.gltf',
//     asset: null,
// };

// testLoader.assets = [envMap,texture,modelCar];

// testLoader.on('start',()=>{console.log('start load');});
// testLoader.on('progress', (v)=>{
//     let pers = Math.round(v*100);
//     console.log('load '+ pers + ' %');
// })
// testLoader.on('load', ()=>{
//     console.log('finish load');
//     console.log(testLoader);
// });

// testLoader.load();

app.render();

