
import * as THREE from 'three';

function light1(smgr) {
  this.name = "light1"
  this.color = "grey"
  const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5);

  this.init = () => {
    console.log(`init`)
  }
  this.load = () => {
    console.log(`load`)

    let size1 = 1024 * 2
    let size2 = 20
    directionalLight.position.set(-1, 1, 1).normalize();
    directionalLight.castShadow = true;
    directionalLight.intensity = 1
    directionalLight.shadow.camera.near = 2;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = size2;
    directionalLight.shadow.camera.left = - size2;
    directionalLight.shadow.camera.top = size2;
    directionalLight.shadow.camera.bottom = - size2;
    directionalLight.shadow.mapSize.width = size1;
    directionalLight.shadow.mapSize.height = size1;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.00006;
    directionalLight.name = "directionallight";
    smgr.scene.add(directionalLight);


    let fillLight1 = new THREE.AmbientLight(0xffffff, 0.3);
    fillLight1.name = "ambientlight"
    smgr.scene.add(fillLight1);

  }

  this.update = (dt) => {
    
  }

  this.init()
}

export default light1;