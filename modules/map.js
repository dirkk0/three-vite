
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';


import { Octree } from 'three/addons/math/Octree.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const gltfloader = new GLTFLoader()
const fbxloader = new FBXLoader()
const objloader = new OBJLoader()
const mtlloader = new MTLLoader()

const textureLoader = new THREE.TextureLoader();



function map(smgr) {
    smgr.game_dict["map"] = this
    this.name = "map"
    this.color = "grey"

    let path = "https://threejs.org/examples/models/gltf/collision-world.glb"

    this.init = async () => {
        console.log(`init`)
    }

    this.load = async (idx) => {

        let temp = await gltfloader.loadAsync(path)
        this.mesh = temp.scene

        this.mesh.position.y = -2

        this.finalize()

    }

    this.finalize = () => {
        console.log("start calculating octree")

        let now = performance.now()
        this.octree = new Octree();
        this.octree.fromGraphNode(this.mesh);
        let time = performance.now() - now
        console.log("end calculating octree, took sec", (time / 1000).toFixed(2))

        this.mesh.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material.map) {
                    child.material.map.anisotropy = 4;
                }
            }
        });

        // this.mesh.position.set(0, 0, 0)
        this.mesh.name = this.name + "-mesh"
        smgr.scene.add(this.mesh);
        smgr.maps1 = this

        console.log("player gravity")
        if (smgr.player.fly) {
            smgr.player.gravity = 0
        } else {
            smgr.player.gravity = 30
        }
    }

    this.update = (dt) => {
        // this.cube.rotation.x += 0.1;
        // this.cube.rotation.y += 0.01;
    }

    this.init()
}


export default map;