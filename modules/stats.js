
import * as THREE from 'three';

const $ = document.querySelector.bind(document);


function stats(smgr) {
  this.name = "stats"
  this.color = "grey"

  this.init = () => {
    console.log(`init`)
  }
  this.load = () => {
    console.log(`load`)

    this.frames = 0
    this.prevTime = performance.now();
    this.div = $("#info1")
    $("#info2").innerText = "level title"

  }

  this.update = (dt) => {
    this.frames++;
    const time = performance.now();

    if (time >= this.prevTime + 1000) {
      let result = Math.round((this.frames * 1000) / (time - this.prevTime))
      // console.log(result);
      this.div.innerText = result

      this.frames = 0;
      this.prevTime = time;
    }
  }

  this.init()
}

export default stats;