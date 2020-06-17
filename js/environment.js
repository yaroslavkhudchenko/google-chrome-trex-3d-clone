import * as THREE from './libs/three.module.js';
import { scene, floorMesh, renderer } from './app.js';
import { FBXLoader } from './libs/FBXLoader.js';
export let cactuses1 = [];
export let cactuses2 = [];
export let cactusesIntervalToMove = null;
import { Water } from './libs/Water2.js';



let cactusObject = null;


const farFloors = [
    {
        position: {
            x: -57,
            y: 0,
            z: -10
        },
        color: 0xE7B251
    },
    {
        position: {
            x: -57,
            y:  1,
            z: 10
        },
        color: 0x00ffff
    },
    {
        position:{
            x:-57,
            y:3,
            z:40
        },
        color: 0xE7B251 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: 4, z: 31 },
            { x: -100, y: 4, z: 35 },
            { x: -100, y: 4, z: 41 },
            { x: -100, y: 4, z: 44 },
            { x: -100, y: 4, z: 38 }
        ]
    },
    {
        position:{
            x:-57,
            y:2,
            z:25
        },
        color: 0xE7B251 ,
        objects: 'cactus.fbx',
        positions: [
            { x: -100, y: 2, z: 13 },
            { x: -100, y: 2, z: 17 },
            { x: -100, y: 2, z: 22 },
            { x: -100, y: 2, z: 25 },
            { x: -100, y: 2, z: 22 }
        ]
    }
   
]

export const Environment = () => {
    // load cactus fbx (ONCE!!!)
    new FBXLoader().load('models/cactus.fbx', (object) => {


        object.traverse(function (child) {

            if (child.isMesh) {
                // child.material = material;
                child.castShadow = true;
                child.receiveShadow = false;

            }

        });
        object.scale.set(.0051, .0051, .0051);
        object.castShadow = true; //default is false
        object.receiveShadow = false;
        cactusObject = object;
        console.log(cactusObject)
        
        // spawn cactuses every (between 2 and 1.5 seconds)
        setInterval(() => cactusRespawner(Math.floor(Math.random() * (3 - 2 + 1) + 2)), Math.floor((Math.random() * 3000) + 2500));

        // default cactuses 

        cactusRespawner(2, -60);
        cactusRespawner(2, -40);
 
        cactusRespawner(3, 1 );
        cactusRespawner(3, 33);

    });



    for(let i=0; i<farFloors.length;i++) {
        // floor
        let geometryFloor = new THREE.BoxGeometry(150,0, i === 1 ? 9 : 20);
        /* if(i === 1) {
            let water = new Water(geometryFloor, {
                color: '#00FFFF',
                scale: 1,
                flowDirection: new THREE.Vector2(2, 1),
                textureWidth: 1024,
                textureHeight: 1024
            });

            water.receiveShadow = true;

            water.position.set(
                farFloors[i].position.x,
                farFloors[i].position.y,
                farFloors[i].position.z
            ); scene.add(water);
                
        } else { */
            
            let materialFloor = new THREE.MeshPhongMaterial({
                color: farFloors[i].color,
                specular: 0xffffff,
                shininess: 100
            });
            let floorMesh = new THREE.Mesh(geometryFloor, materialFloor);
            floorMesh.receiveShadow = true;
            scene.add(floorMesh); // add second and third floor to the scene
            floorMesh.position.set(
                farFloors[i].position.x,
                farFloors[i].position.y,
                farFloors[i].position.z
            );
//}
    }
  // River();
}

export const River = () => {
    // water
    var textureLoader = new THREE.TextureLoader();

    var waterGeometry = new THREE.PlaneBufferGeometry(150, 20);
    var flowMap = textureLoader.load('Water_1_M_Flow.jpg');

    let water = new Water(waterGeometry, {
        scale: 2,
        textureWidth: 1024,
        textureHeight: 1024,
        flowMap: flowMap
    });

    water.position.y = 1;
    water.rotation.x = Math.PI * - 0.5;
    scene.add(water);
    water.position.set(
        -57,
        1,
        10
    )
}
export const cactusRespawner = (floorNB, initialCac=false ) => {
    if (floorNB === 0 || floorNB === 1) return;

    let good = cactusObject.clone();
        // console.log(floorNB)
        // console.log(farFloors[floorNB])
        console.log(floorNB)
        good.position.set(
            initialCac ? initialCac  : -100,
            farFloors[floorNB].positions[0].y, 
            farFloors[floorNB].positions[Math.floor((Math.random() * 4) + 1)].z
        );
            
    scene.add(good);



    // to move
    /* cactusesIntervalToMove =  */
    setInterval(() => {

        good.position.x += (floorNB === 1  ? 
                                    .06 
                                        : .04) + (Math.floor(Math.random() * .008) + .004);
    }, Math.floor((Math.random() * .5) + 1));

    floorNB === 1 ? 
        cactuses1.unshift(good): // unshift to global array to control if reach the pointer
            cactuses2.unshift(good)

}
