// var for setup

let container;
let camera;
let renderer;
let scene;
let counterTop;

function init() {
    container = document.querySelector('.scene')

    //create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    //camera setup

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(80, 180, 750);

    //lighting

    const ambient = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 30, 30);
    scene.add(light);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //load model
    let loader = new THREE.GLTFLoader();
    loader.load('./3d/scene.gltf', function(gltf) {
        scene.add(gltf.scene);
        counterTop = gltf.scene.children[0];
        animate();
    });
}

function animate() {
    requestAnimationFrame(animate);
    counterTop.rotation.z += 0.0003;
    renderer.render(scene, camera);
}

init();

//function onWindowResize() {
//camera.aspect = container.clientWidth / container.clientHeight;
//    camera.updateProjectMatrix();
//
//    renderer.setSize(container.clientWidth, container.clientHeight);
//}
//
//window.addEventListener("resize", onWindowResize);