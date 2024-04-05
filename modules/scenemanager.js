
import * as THREE from 'three';

import player from "./player.js"
import lights from "./lights.js"
import controls from "./controls.js"
import map from "./map.js"
import minimal1 from "./minimal1.js"
import stats from "./stats.js"

function SceneManager() {

  this.init = () => {
    // this.log("init")

    const scene = new THREE.Scene();
    scene.name = "scene-mesh"
    scene.background = new THREE.Color(0x303030);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.rotation.order = 'YXZ'; // for player controls

    const renderer = new THREE.WebGLRenderer();

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.camera.position.z = 1;

    this.scene = scene
    this.renderer = renderer
    this.clock = new THREE.Clock();

    this.game_dict = {}
    this.game_objects = [
      new controls(this),
      new player(this),
      new lights(this),
      new map(this),
      new stats(this),
      new minimal1(this),
    ]

    this.game_objects.forEach(el => {
      console.log("loading", el.name)
      el.load()
    })

    window.smgr = this

    this.player_control = true

  }

  this.update = (dt) => {
    this.game_objects.forEach(el => {
      el.update(dt)
    })
  }

  this.startAnimationLoop = () => {
    this.animate();
  }

  this.animate = () => {

    // similar to _process_physics
    const dt = Math.min(0.05, this.clock.getDelta())
    this.update(dt)

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }

  this.init()
}

export default SceneManager;