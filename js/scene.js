window.addEventListener("load", initScene);

//load shaders
var waveShader = ShaderLoader.getShaders("js/shaders/wave.vert","js/shaders/wave.frag");
var basicShader = ShaderLoader.getShaders("js/shaders/basic.vert", "js/shaders/basic.frag");
console.log("Shader Loaded");

//var setups
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,  0.1, 1000);
var renderer = new THREE.WebGLRenderer({antilias: true});
var gemometry = new THREE.PlaneGeometry(10,10,10,10);
var controls = new THREE.OrbitControls( camera, renderer.domElement );
var clock = new THREE.Clock();
var objLoader = new THREE.OBJLoader();
var rain;

//setup texture to repeat
var texture = new THREE.TextureLoader().load("wave.png");
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 5, 5 );


//setup materials
var waveMaterial = new THREE.ShaderMaterial(
{
    uniforms:
    { 
        "time": { type:"f", value: clock.getDelta() },
        "texture": {type:"t", value: texture },
        "xCoord" : {type: "f", value: 0},
    },
    vertexShader: waveShader.vertex,
    fragmentShader: waveShader.fragment
});

var baseMaterial = new THREE.ShaderMaterial(
    {
        uniforms:
        {         },
        vertexShader: basicShader.vertex,
        fragmentShader: basicShader.fragment
    });

var sea = new THREE.Mesh(gemometry, waveMaterial);
var cloud = new THREE.Mesh();
var plane = new THREE.Mesh();
var boat = new THREE.Mesh();

function initScene()
{
    //set up rendere and controls
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    rain = new Rain(500, scene)

    //load cloud
    sea = new THREE.Mesh(gemometry, waveMaterial);
    objLoader.load("cloud.obj", function(loadedObj)
    {
        loadedObj.traverse(function(child)
        {
            if(child instanceof THREE.Mesh)
                child.material = baseMaterial;
        });

        cloud = loadedObj;
        loadedObj.position.z = 8;
        loadedObj.scale.set(5,5,5);
        scene.add(loadedObj);
    });

    //load [plane]
    objLoader.load("plane.obj", function(loadedObj)
    {
        loadedObj.traverse(function(child)
        {
            if(child instanceof THREE.Mesh)
                child.material = baseMaterial;
        });

        plane = loadedObj;
        plane.position.z = 2.5;
        plane.rotation.x = 90;
        scene.add(loadedObj);
    });


    //load boat
    objLoader.load("boat.obj", function(loadedObj)
    {
        loadedObj.traverse(function(child)
        {
            if(child instanceof THREE.Mesh)
                child.material = baseMaterial;
        });

        boat = loadedObj;
        loadedObj.rotation.x = -30;
        loadedObj.position.z = 0.3;
        loadedObj.scale.set(0.5,0.5,0.5);
        scene.add(loadedObj);
    });

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

var time = 0;
var xCoord = 0;
function update()
{
    rain.update();
    waveMaterial.uniforms.time.value = time;
    waveMaterial.uniforms.xCoord.value = xCoord;

    cloud.rotation.z += 0.01;

    renderer.render(scene, camera);
    controls.update();
    time += clock.getDelta();
    xCoord+= 0.01;
    requestAnimationFrame(update);
}