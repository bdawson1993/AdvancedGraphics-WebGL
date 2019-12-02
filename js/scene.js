


window.addEventListener("load", initScene);

var shader = ShaderLoader.getShaders("js/shaders/wave.vert","js/shaders/wave.frag");
console.log("Shader Loaded");

//var setups
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,  0.1, 1000);
var renderer = new THREE.WebGLRenderer({antilias: true});
var gemometry = new THREE.PlaneGeometry(10,10,25,25);
var controls = new THREE.OrbitControls( camera, renderer.domElement );
var clock = new THREE.Clock();
var time;
var texture = new THREE.TextureLoader().load("wave.png");


var waveMaterial = new THREE.ShaderMaterial(
{
    uniforms:
    { 
        "time": { type:"f", value: clock.getDelta() },
        "texture": {type:"t", value: texture },
    },
    vertexShader: shader.vertex,
    fragmentShader: shader.fragment
});



var cubeArray = [];
var sea = new THREE.Mesh(gemometry, waveMaterial);

function initScene()
{
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    sea = new THREE.Mesh(gemometry, waveMaterial);
    scene.add(sea);
    
    
   

    camera.position.z = 5;
    addLighting();

    update();
}

function addLighting()
{
    let pointLight = new THREE.PointLight(0xddddd);
    pointLight.position.set(-5,-3,3);
    scene.add(pointLight);

    let ambientLight = new THREE.AmbientLight(0x505050);
    scene.add(ambientLight);
}

var x = 0;
function update()
{
    
    waveMaterial.uniforms.time.value = x;
    renderer.render(scene, camera);
    controls.update();
    x += clock.getDelta();
    requestAnimationFrame(update);
}