
import * as THREE from 'three';

function minimal1(smgr) {
    this.name = "minimal1"
    this.color = "grey"
    smgr.game_dict["maps1"] = this


    this.init = () => {
        console.log(`init`)
    }

    this.load = () => {
        console.log(`load`)

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.name = this.name + "-mesh"


        this.mesh.position.set(0, 5,-10)

        smgr.scene.add(this.mesh);
    }

    this.update = (dt) => {
        this.mesh.rotation.x += 0.005;
        this.mesh.rotation.y += 0.005;
    }

    this.init()
}

export default minimal1;