let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});

document.getElementById('scene').appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB);

//Start
let controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

//Loading
let textureLoader = new THREE.TextureLoader();

let displacementMap = textureLoader.load("images/displacementmap.jpg");
displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
displacementMap.repeat.set(1, 1);

let flowMap = textureLoader.load("images/flowmap.png");

//Lighting
let ambient = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambient);

let spotlight = new THREE.SpotLight(0xffffff, 0.5);
spotlight.position.set(0, 0, 8);
scene.add(spotlight);

//Ground
let groundGeo = new THREE.PlaneGeometry(19.2, 10.8, 512, 512);
let groundMat = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    displacementMap: displacementMap,
    displacementScale: 1,

});
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.z = -0.8
scene.add(ground);

//Water
let waterGeo = new THREE.PlaneGeometry(19.2, 10.8, 512, 512);
let waterMat = {
    scale: 1,
    textureWidth: 512,
    textureHeight: 512,
    flowSpeed: 0.04,
    reflectivity: 0.35,
    flowMap: flowMap
}
let water = new THREE.Water(waterGeo, waterMat);

water.position.y = 1.2;
scene.add(water);
//End

function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    
    controls.update();
}

render();