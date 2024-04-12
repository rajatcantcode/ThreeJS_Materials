import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/Addons.js";

/**
 * GUI controls
 */
const gui = new GUI();

/**
 * Algorithms that decide on the color of the pixels are written in programs called shaders
 * ThreeJS has many built in materials with pre-made shaders
 * Just like MeshBasicMaterial - contains pre-built shaders
 */

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./textures/matcaps/3.png");
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");

//Textures used as map and matcap are supposed to be encoded in sRGB
//Thus need to change their colorspace
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Sphere
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true;
// material.transparent = true;
//When we are playing alpha we need to define transparent = true to reduce the opacity
// material.opacity = 0.2;
//When it's going to be white it's going to be visible when it's black it's going to be hidden
// material.alphaMap = doorAlphaTexture;
//We can see inside in sphere and backside of plane
// material.side = THREE.DoubleSide; //Note : it requires more processing

//Great Color
//We usually use it to debug the normals and post processing
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
//looks great but we need a texture as a reference
//The texture will pick the colors from the texture according the normal orientation
//relative to the camera
//Note : its matcap not map
// material.matcap = matcapTexture;
//Best part about it is meshes appears to be illuminated but it's an illusion created by the texture

// const material = new THREE.MeshDepthMaterial();
// used for shadows not very useful just used when we are using our own material

// const material = new THREE.MeshLambertMaterial();
// It covers all the prooperties that BasicMaterial does
// and also some properties related to light
// It is the most performant material that uses light
//First material that required light to be seen

//it fixes the glitches but same as MeshLamberMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);
//For point it looks cool
//Cons: Parameters are not realistic

//It's a cartoonish look
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;
//Not showing becasue MacOS is stetching the gradientTexture
//We can handle how the GPU handles such textures by minFilter , magFilter
//Deactivating the generation of mipmaps good for GPU
// gradientTexture.generateMipmaps = false;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// material.gradientMap = gradientTexture;

//MeshStandardMaterial
//uses Physcially based rendering(PBR) principle like in the Textures less
//supports light with a more realistic algorithm and better parameters like roughness and metalness
//aka "standard" because PBR has become standard in so many softwares
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// //aoMap property will add shodows where the texture is dark
// material.aoMap = doorAmbientOcclusionTexture;
// material.displacementScale = 1;
// material.aoMapIntensity = 1;

// //it shows different shapes when the size of the shape is small
// material.displacementMap = doorHeightTexture;

// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;

// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.1, 0.1);

// material.transparent = true;
// material.alphaMap = doorAlphaTexture;//Black part will be removed

// gui.add(material, "roughness", 0, 1, 0.0001);
// gui.add(material, "metalness", 0, 1, 0.0001);

//MeshPhysicalMaterial
//All properties but a little more then MeshStandardMaterial
//Stimulates a thin layer of shining
// https://threejs.org/examples/#webgl_materials_physical_clearcoat
// Bad for performance
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
// material.map = doorColorTexture;
// //aoMap property will add shodows where the texture is dark
// material.aoMap = doorAmbientOcclusionTexture;
// material.displacementScale = 1;
// material.aoMapIntensity = 1;

// //it shows different shapes when the size of the shape is small
// material.displacementMap = doorHeightTexture;

// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;

// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.1, 0.1);

// material.transparent = true;
// material.alphaMap = doorAlphaTexture; //Black part will be removed

gui.add(material, "roughness", 0, 1, 0.0001);
gui.add(material, "metalness", 0, 1, 0.0001);

//ClearCoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, "clearcoat", 0, 1, 0.0001);
// gui.add(material, "clearcoatRoughness", 0, 1, 0.0001);

//Sheen
//Hightlights the material when have seen from a narrow angle
//In simple words , usually on fluffly material like fabric
// https://threejs.org/examples/webgl_loader_gltf_sheen.html
// material.sheen = 1;
// material.sheenRoughness = 1;
// material.sheenColor.set(1, 1, 1);
// gui.add(material, "sheen", 0, 1, 0.0001);
// gui.add(material, "sheenRoughness", 0, 1, 0.0001);
// gui.addColor(material, "sheenColor");

//Iridescence
//Create color artificats like in soap bubble
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence", 0, 1, 0.0001);
// gui.add(material, "iridescenceIOR", 0, 2.33, 0.0001);
// gui.add(material.iridescenceThicknessRange, "0", 1, 1000, 1); //index [0]
// gui.add(material.iridescenceThicknessRange, "1", 1, 1000, 1); //index[1]

//Tranmission
//Enable light to gothrough the material
//The object feels transclusent
// IOR stands for Index for refraction
material.transission = 1;
material.ior = 1;
material.thickness = 0.5;

gui.add(material, "transmission", 0, 1.5, 0.0001);
gui.add(material, "ior", 0, 10, 0.0001);
gui.add(material, "thickness", 0, 1, 0.0001);

//Enviormment map is like a map of what's surrounding the scene
// https://polyhaven.com/hdris good for texture , map .. and more

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environnmentMap) => {
  environnmentMap.mapping = THREE.EquirectangularReflectionMapping;
  console.log("loaded");
  //more in later modules
  scene.background = environnmentMap;
  scene.environment = environnmentMap;
});

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);
// //The material is visible now
// const pointLight = new THREE.PointLight(0xffffff, 200);
// pointLight.position.x = 2;
// pointLight.position.y = 2;
// pointLight.position.z = 2;
// scene.add(pointLight);

// Sphere
const geometry = new THREE.SphereGeometry(10, 32, 16);
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(-30, 0, 0);

// Plane
const geometry2 = new THREE.PlaneGeometry(20, 20);
const plane = new THREE.Mesh(geometry2, material);

// Donut (Torus)
const geometry3 = new THREE.TorusGeometry(10, 3, 16, 100);
const torus = new THREE.Mesh(geometry3, material);
torus.position.set(30, 0, 0);

scene.add(sphere, plane, torus);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 70;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //rotation
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  torus.rotation.x = -0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
