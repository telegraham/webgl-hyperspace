import randomNormal from 'random-normal';

import RADIANS_360_DEGREES from './radians-360-degrees'

class ParticleProvider {
  constructor(textures, { countPer, radius, farthest }) {
    // debugger;

    this.farthest = farthest;

    this.particles = []

    const pp = this;

    const margin = 150.0;

    const opacity = function(t){
      const distanceFromCamera = this.z - pp.cameraPositionZ(t);
      if (distanceFromCamera < farthest - margin)
        return 1
      else if (distanceFromCamera > farthest || distanceFromCamera < 0)
        return 0
      else
        return (farthest - distanceFromCamera) / margin;
    }

    const scale = 20;
    const dev = scale;
    const mean = 3 * scale;

    const startZ = farthest;
    const endZ = farthest * 2;

    const count = (endZ - startZ) * countPer;

    for (let i = 0; i < count; i++) {

      const d = randomNormal({
        mean, 
        dev
      });

      const angle = this.constructor.randomBetween(0, RADIANS_360_DEGREES);
      const x = d * Math.sin(angle);
      const y = d * Math.cos(angle);
    
      this.particles.push({
        radius,
        x,
        y,
        opacity,
        z: this.constructor.randomBetween(startZ, endZ),
        rotation: this.constructor.randomBetween(0, RADIANS_360_DEGREES),
        // rotationV: this.constructor.randomBetween(5, 10) / 10000,
        texture: textures[Math.floor(this.constructor.randomBetween(0, textures.length))],
      });
    }
    // console.log(this.particles)
  }

  cameraPositionZ(t) {
    return 0.025 * t + 0.00000025 * Math.pow(t, 2)
  }

  static randomBetween(min, max) {
    return Math.random() * max + min;
  }

}

export default ParticleProvider;
