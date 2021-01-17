import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshLambertMaterial,
  MeshPhongMaterial,
  TextureLoader,
  DoubleSide,
  MeshFaceMaterial,
  Mesh,
  AmbientLight,
  SphereGeometry,
  PointLight,
  MeshBasicMaterial,
} from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

var w = window.innerWidth;
var h = window.innerHeight;
var s = w / h;

// camera values
let fieldOfView = 75;
let browserRatio = s;
let nearClip = 0.1;
let farClip = 1000;

const scene = new Scene();
const camera = new PerspectiveCamera(
  fieldOfView,
  browserRatio,
  nearClip,
  farClip
);

const renderer = new WebGLRenderer();
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const geometry = new BoxGeometry(2, 2, 2);

// CHANGE MESH TYPE TO ADD MATERIAL REFLEECTION
let cubeMaterial = [
  new MeshLambertMaterial({
    map: new TextureLoader().load("./img/linkedin.png"),
    side: DoubleSide,
  }),
  new MeshPhongMaterial({
    map: new TextureLoader().load("./img/patreon.png"),
    side: DoubleSide,
  }),
  new MeshPhongMaterial({
    map: new TextureLoader().load("./img/youtube.png"),
    side: DoubleSide,
  }),
  new MeshPhongMaterial({
    map: new TextureLoader().load("./img/linkedin.png"),
    side: DoubleSide,
  }),
  new MeshPhongMaterial({
    map: new TextureLoader().load("./img/patreon.png"),
    side: DoubleSide,
  }),
  new MeshPhongMaterial({
    map: new TextureLoader().load("./img/youtube.png"),
    side: DoubleSide,
  }),
];
const material = new MeshFaceMaterial(cubeMaterial);
const cube = new Mesh(geometry, material);
scene.add(cube);

const sGeo = new SphereGeometry(1, 100, 50);
const sMat = new MeshBasicMaterial({ color: 0xff00ff00 });
const sphere = new Mesh(sGeo, sMat);
sphere.position.set(3, 3, 2);
scene.add(sphere);
// setting the scene/camera angles
camera.position.set(0, 0, 10);

window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// controlstysytrm
const controls = new OrbitControls(camera, renderer.domElement);

// Lighting
const amLight = new AmbientLight(0xffffff, 0.25);
scene.add(amLight);
const light = new PointLight(0xffff00, 12, 5);
light.position.set(3, 3, 2);
scene.add(light);
// LOADERS
// instantiate a loader
// const loader = new OBJLoader();

// load a resource
// loader.load(
//   // resource URL
//   "./js/b.obj",
//   // called when resource is loaded
//   function (object) {
//     scene.add(object);
//     object.position.set(-3, -3, -2);
//     console.log("loaded");
//   },
//   // called when loading is in progresses
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   // called when loading has errors
//   function (error) {
//     console.log("An error happened");
//   }
// );
const update = () => {
  cube.rotation.x += 0.01;
  light.position.x += 0.01;
  sphere.position.x += 0.01;
  // if (light.position.x > 5 && sphere.position.x > 5) {
  //   light.position.x = light.position.x - 0.01;
  //   sphere.position.x = sphere.position.x - 0.01;
  // }
};
const render = () => {
  renderer.render(scene, camera);
};
// Search Game LOOP for game theory
function GameLoop() {
  requestAnimationFrame(GameLoop);
  update();
  render();
}
GameLoop();
