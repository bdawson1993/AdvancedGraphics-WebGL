window.addEventListener("load", initScene);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,  0.1, 1000);
var renderer = new THREE.WebGLRenderer({antilias: true});

function initScene()
{
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var gemometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(gemometry, material);

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
    requestAnimationFrame(update);
}