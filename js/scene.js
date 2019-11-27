


window.addEventListener("load", initScene);

var shader = ShaderLoader.getShaders("js/shaders/basic.vert","js/shaders/basic.frag");
console.log("Shader Loaded");

//var setups
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,  0.1, 1000);
var renderer = new THREE.WebGLRenderer({antilias: true});
var gemometry = new THREE.PlaneGeometry(10,10,10);
var controls = new THREE.OrbitControls( camera, renderer.domElement );
var material = new THREE.ShaderMaterial(
{
    uniforms:{},
    vertexShader: shader.vertex,
    fragmentShader: shader.fragment
});



var cubeArray = [];
var cube = new THREE.Mesh(gemometry, material);

function initScene()
{
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    cube = new THREE.Mesh(gemometry, material);
    cubeArray.push(cube)
    scene.add(cube);
   

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

function update()
{
   

   
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(update);
}