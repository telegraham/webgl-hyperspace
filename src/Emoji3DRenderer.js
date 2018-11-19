import RADIANS_360_DEGREES from './radians-360-degrees'

const rot = RADIANS_360_DEGREES / 2;
const DELTA_Z_INITIAL = 10000;

class Emoji3DRenderer{

  constructor(particleProvider){
    this.particleProvider = particleProvider;
    this.setUpThreeStuff();

    particleProvider.particles.forEach((particle) => this.doOne(particle));
  }

  setUpThreeStuff() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, this.particleProvider.farthest);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth * 2, window.innerHeight * 2);
    
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.z = DELTA_Z_INITIAL;

    this.camera.rotation.y = rot;
    // this.camera.rotation.x = rot;
  }

  doOne(particle) {
    const { texture, radius, x, y, z, rotation } = particle;
    const planeRadius = radius / 200;
    const geometry = new THREE.PlaneGeometry(planeRadius, planeRadius, planeRadius);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      map: texture, 
      transparent: true 
    });

    const plane = new THREE.Mesh(geometry, material);

    plane.position.x = x;
    plane.position.y = y;
    plane.position.z = z;

    plane.rotation.z = rotation;
    // plane.rotation.x = rot;
    plane.rotation.y = rot;

    this.scene.add(plane);

    particle.plane = plane;
  }
  
  go(){

      // this.renderer.render(this.scene, this.camera);
    this.t0 = performance.now();
    const animate = () => {
      const t = performance.now() - this.t0;
      // console.log(this.camera.position.z)
      // console.log(this.particleProvider.cameraPositionZ(t));
      this.zoom(t);

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate);
    // document.addEventListener("wheel", (e) => {
    //   this.deltaZ = this.deltaZ || DELTA_Z_INITIAL;

    //   this.deltaZ -= e.deltaY;
    //   this.zoom(this.deltaZ);
    //   this.crrmrma(e)
    // });
    document.addEventListener("mousemove", this.crrmrma.bind(this))
    console.log("went")
  }

  crrmrma(e) {
    console.log("bog")
    this.deltaX = this.deltaX || 0;
    this.deltaY = this.deltaY || 0;

    this.deltaX = e.clientX - window.innerWidth / 2;
    this.deltaY = e.clientY - window.innerHeight / 2;

    this.camera.rotation.x = 0.01 * this.deltaY;
    this.camera.rotation.y = rot - 0.01 * this.deltaX;

    this.particleProvider.particles.forEach((particle) => {
      // particle.plane.material.opacity = particle.opacity(z);
      particle.plane.rotation.x = this.camera.rotation.x
      particle.plane.rotation.y = this.camera.rotation.y
    });

    this.renderer.render(this.scene, this.camera);
  }

  zoom(z) {
    this.camera.position.z = this.particleProvider.cameraPositionZ(z);

    this.particleProvider.particles.forEach((particle) => {
      particle.plane.material.opacity = particle.opacity(z);
      // particle.plane.rotation.z = Math.PI / (particle.rotation / 45) + particle.rotationV * t;
    });

    this.renderer.render(this.scene, this.camera);
  }

}

export default Emoji3DRenderer;

