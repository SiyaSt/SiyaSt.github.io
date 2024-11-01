const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("webglCanvas")});
const canvas =  document.getElementById("webglCanvas");



updateRendererSize();
// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false; // отключить зум


// Create Card
const textureLoader = new THREE.TextureLoader();
const cardTexture = textureLoader.load('/images/queen%20pentacles.png');
scene.background = new THREE.Color('#E8E4C7');

//Create volume
// Создание геометрии (объем):
const geometry = new THREE.BoxGeometry(3, 4, 0.01); // Делаем плоскость объемной
const material = new THREE.MeshBasicMaterial({
    map: cardTexture,
    side: THREE.DoubleSide // Делаем материал двусторонним
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

function createStars(numStars) {
    const geometry = new THREE.SphereGeometry(0.03, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: '#E75136' });

    for (let i = 0; i < numStars; i++) {
        const star = new THREE.Mesh(geometry, material);
        star.position.x = (Math.random() - 0.5) * 10;
        star.position.y = (Math.random() - 0.5) * 10;
        star.position.z = (Math.random() - 0.5) * 10;
        scene.add(star);
    }
}

createStars(200);

// Camera position
camera.position.z = 5;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


function updateRendererSize() {
    const width = canvas.clientWidth; // Получаем ширину канваса
    const height = canvas.clientHeight; // Получаем высоту канваса
    renderer.setSize(width, height); // Устанавливаем размеры рендерера
    camera.aspect = width / height; // Обновляем аспектное соотношение камеры
    camera.updateProjectionMatrix(); // Обновляем матрицу проекции
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Обновить контролы
    renderer.render(scene, camera);
}

animate();



// Resize Handler
window.addEventListener('resize', updateRendererSize);