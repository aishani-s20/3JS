import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById('canvas');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

// Add camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5

// Create and add cube object
const geometry1 = new THREE.DodecahedronGeometry();
const material1 = new THREE.MeshLambertMaterial({color: '#468585', emissive: '#468585'});

const dodecahedron = new THREE.Mesh(geometry1, material1);

const geometry2 = new THREE.BoxGeometry(2, 0.1, 2);
const material2 = new THREE.MeshStandardMaterial({color: '#B4B4B3', emissive: '#B4B4B3'});

const box = new THREE.Mesh(geometry2, material2);

box.position.y = -1.5

scene.add(dodecahedron);
scene.add(box);

// Add lighting
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1,1,1);
scene.add(light);

// Set up renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


// Add Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05
controls.enableZoom = true;
controls.enablePan = true;

// Animate the object
function animate(){
    requestAnimationFrame(animate);

    dodecahedron.rotation.x += 0.005;
    dodecahedron.rotation.y += 0.005;
    box.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

// Handle window resize

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

animate();