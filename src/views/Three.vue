<template>
  <div id="container"></div>
</template>

<script>
import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TimelineMax } from 'gsap'

export default {
  name: "Three",
  data: function() {
    return {
      camera: null,
      newCamera: null,
      scene: null,
      renderer: null,
      controls: null,
      delta: 0.01
      // mesh: null
    };
  },
  methods: {
    init: function() {
      let self = this
      let container = document.getElementById("container");

      this.scene = new Three.Scene();
      
      this.camera = new Three.PerspectiveCamera(
        40,
        container.clientWidth / container.clientHeight,
        1,
        5000
      );

      // this.newCamera = new Three.PerspectiveCamera(40,
      //   container.clientWidth / container.clientHeight,
      //   1,
      //   5000
      // )

      /* this.camera.rotation.y = (45 / 180) * Math.PI;
      this.camera.position.x = 800;
      this.camera.position.y = 1500;
      this.camera.position.z = 1000; */
      this.camera.position.set(0,1000,1500)
      this.camera.lookAt(this.scene.position);

      // let cameraHelper = new Three.CameraHelper(this.newCamera)
      // this.scene.add(cameraHelper)
      /* let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshLambertMaterial({color:0xFFCC00}); */

      /* this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh); */

      // let meshX = -10;
      // for(let i = 0; i < 15; i++){
      //   let mesh = new Three.Mesh(geometry, material)
      //   mesh.position.x = (Math.random() - 0.5) * 10
      //   mesh.position.y = (Math.random() - 0.5) * 10
      //   mesh.position.z = (Math.random() - 0.5) * 10
      //   this.scene.add(mesh)
      //   meshX += 1
      // }

      /* var self = this;

      function recursive(cnt) {
        if(cnt < 1){
          return false
        } else {
          let mesh = new Three.Mesh(geometry, material)
          console.log(mesh.position.x = Math.random() -0.05 )
          console.log(mesh.position.y = Math.random() -0.05 )
          console.log(mesh.position.z = (Math.random() -1)*10)
          console.log('--------------')
          self.scene.add(mesh)
          // console.log(cnt)
          return recursive(cnt-1)
        }
      } */

      let hlight = new Three.AmbientLight(0x404040, 100);
      this.scene.add(hlight);

      let directionalLight = new Three.DirectionalLight(0xffffff, 100);
      directionalLight.position.set(0, 1, 0);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);
      let light = new Three.PointLight(0xc4c4c4, 10);
      light.position.set(0, 300, 500);
      this.scene.add(light);
      let light2 = new Three.PointLight(0xc4c4c4, 10);
      light2.position.set(500, 100, 0);
      this.scene.add(light2);
      let light3 = new Three.PointLight(0xc4c4c4, 10);
      light3.position.set(0, 100, -500);
      this.scene.add(light3);
      let light4 = new Three.PointLight(0xc4c4c4, 10);
      light4.position.set(-500, 300, 500);
      this.scene.add(light4);

      

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      
      // this.camera.position.set(800, 120, 1000)
      this.controls.update();

      let loader = new GLTFLoader();
      loader.load('/car/scene.gltf', function(gltf){
        console.log(gltf)
        let car = gltf.scene.children[0];
        car.scale.set(0.5,0.5,0.5);
        self.scene.add(gltf.scene);
        self.animate();
      });

      // recursive(10);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      /* this.scene.children.forEach(val => {
        val.rotation.x += 0.01;
        val.rotation.y += 0.02;
      }); */
      // this.mesh.rotation.x += 0.01;
      // this.mesh.rotation.y += 0.02;
      // this.camera.lookAt(this.scene.position);
      // let timer = Date.now() * 0.0005;
      this.delta += 0.01;
      this.camera.lookAt(this.scene.position);

      this.camera.position.x = Math.cos(this.delta) * 1500
      this.camera.position.y = ((Math.sin(this.delta)+1)/2) * 1500
      this.camera.position.z = Math.sin(this.delta) * 1500

      this.controls.update();
      
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
