"use strict";


// import * as THREE from 'three';


const keyStates = {};

function Controls(smgr) {

  this.shift = true
  this.name = "controls"

  smgr.controls = this

  this.load = () => {
    console.log("load")

  }

  this.init = () => {
    console.log("init")

    this.acceptKeys = true

    document.addEventListener('keydown', (event) => {
      // console.log(event.code) // key
      keyStates[event.code] = true;
      this.shift = event.shiftKey
    });

    document.addEventListener('keyup', (event) => {
      keyStates[event.code] = false;
    });

    window.addEventListener("mousedown", function () {
      console.log("mousedown")
      if (document.pointerLockElement !== null) {
        console.log("you propably wanted to hit 'E' on the keyboard")
      } else {
        document.body.requestPointerLock();
      }
    })

    document.addEventListener("pointerlockchange", (event) => {
      if (document.pointerLockElement === document.body) {
        console.log("The pointer lock status is now locked");
        smgr.active = true
        smgr.locked = true
      } else {
        smgr.locked = false
        console.log("The pointer lock status is now unlocked");
        console.log(smgr.lastCamX, smgr.lastCamY)
        smgr.camera.rotation.y = smgr.lastCamY
        smgr.camera.rotation.x = smgr.lastCamX
      }
    }, false);


    document.body.addEventListener('mousemove', (event) => {
      // if (document.pointerLockElement === document.body) {
      if (smgr.locked && !smgr.freeze) {
        smgr.camera.rotation.y -= event.movementX / 500;
        smgr.camera.rotation.x -= event.movementY / 500;
        smgr.lastCamX = smgr.camera.rotation.x
        smgr.lastCamY = smgr.camera.rotation.y
      }
    });

    window.addEventListener('resize', (event) => {
      smgr.camera.aspect = window.innerWidth / window.innerHeight;
      smgr.camera.updateProjectionMatrix();
      smgr.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.getForwardVector = () => {
      smgr.camera.getWorldDirection(smgr.player.direction);
      if (!smgr.player.fly) smgr.player.direction.y = 0;
      smgr.player.direction.normalize();

      return smgr.player.direction;
    }
  }

  function getForwardVector() {
    smgr.camera.getWorldDirection(smgr.player.direction);
    if (!smgr.player.fly) smgr.player.direction.y = 0;
    smgr.player.direction.normalize();

    return smgr.player.direction;
  }

  function getSideVector() {
    smgr.camera.getWorldDirection(smgr.player.direction);
    smgr.player.direction.y = 0;
    smgr.player.direction.normalize();
    smgr.player.direction.cross(smgr.camera.up);

    return smgr.player.direction;
  }

  this.update = (deltaTime) => {

    if (!this.acceptKeys) return

    if (smgr.freeze) return

    // gives a bit of air control
    let speedDelta = deltaTime * (smgr.player.onFloor ? 25 : 8);
    if (this.shift) speedDelta = speedDelta * 10


    if (keyStates['KeyW']) {
      smgr.player.velocity.add(getForwardVector().multiplyScalar(speedDelta));
    }
    if (keyStates['KeyS']) {
      smgr.player.velocity.add(getForwardVector().multiplyScalar(- speedDelta));
    }
    if (keyStates['KeyA']) {
      smgr.player.velocity.add(getSideVector().multiplyScalar(- speedDelta));
    }
    if (keyStates['KeyD']) {
      smgr.player.velocity.add(getSideVector().multiplyScalar(speedDelta));
    }

    if (keyStates['KeyF']) {
      this.acceptKeys = false
      smgr.player.fly = !smgr.player.fly
      console.log(smgr.player.fly)
      if (smgr.player.fly) {
        smgr.player.gravity = 0
      } else {
        smgr.player.gravity = 30
      }

      setTimeout(() => {
        this.acceptKeys = true
      }, 250);
    }


    if (smgr.player.onFloor) {
      if (keyStates['Space']) {
        smgr.player.velocity.y = smgr.player.jump_velocity
      }
    }

    if (keyStates['Digit1']) {
      this.acceptKeys = false
      // smgr.load(1)
      // window.setActiveScene("room2")
    }

  }

  this.init()

}

export default Controls;