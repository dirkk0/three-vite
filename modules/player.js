
import * as THREE from 'three';

import { Capsule } from 'three/addons/math/Capsule.js';

function Player(smgr) {

  this.jump_velocity = 10

  this.gravity = 0 // 30
  this.hasCollision = true

  this.fly = false

  this.init = () => {

    console.log("init")
    this.name = "player"
    this.color = "lightblue"

    smgr.player = this
    this.load()
  }

  this.load = () => {
    console.log("load")
    this.collider = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 1, 0), 0.35);

    this.velocity = new THREE.Vector3()
    this.direction = new THREE.Vector3()

    this.onFLoor = false

    this.spawnPosition = new THREE.Vector3(0, 1.5, 0)
    this.spawnRotation = new THREE.Vector3()

    this.raycaster = new THREE.Raycaster()

    this.reset()

  }

  this.reset = () => {
    this.collider.start.set(this.spawnPosition.x, this.spawnPosition.y + 0.35, this.spawnPosition.z);
    this.collider.end.set(this.spawnPosition.x, this.spawnPosition.y + 1.65, this.spawnPosition.z);
    this.collider.radius = 0.35;

    smgr.camera.rotation.y = this.spawnRotation.y
  }

  this.update = (dt) => {
    let damping = Math.exp(- 4 * dt) - 1;
    if (!this.onFloor) {
      this.velocity.y -= this.gravity * dt;
      // small air resistance
      damping *= 0.1;
    }

    this.velocity.addScaledVector(this.velocity, damping);

    const deltaPosition = this.velocity.clone().multiplyScalar(dt);
    this.collider.translate(deltaPosition);

    this.environmentCollision()

    if (smgr.player_control) smgr.camera.position.copy(this.collider.end);

    if (smgr.camera.position.y <= - 75) {
      this.reset()
    }

  }

  this.environmentCollision = () => {
    // return
    if (!this.hasCollision) return
    this.onFloor = false;

    let spos = new THREE.Vector3()
    let epos = new THREE.Vector3()

    if (smgr.maps1) {
      let result = smgr.maps1.octree.capsuleIntersect(this.collider);
      if (result) {
        this.onFloor = result.normal.y > 0
        this.collider.translate(result.normal.multiplyScalar(result.depth));
      }
    }

  }

  this.formatPos = (pos) => {
    let temp = ""
    temp = `${pos.x.toFixed(2)} ${pos.y.toFixed(2)} ${pos.z.toFixed(2)}`
    return temp
  }

  this.init()

  setInterval(() => {
    document.querySelector("#info3").innerText = this.formatPos(smgr.camera.position)
  }, 1000);
}

export default Player;