// Three.js background script
let scene, camera, renderer;
let starField, nebulaField, accentField;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let animFrameId = null;

function init() {
    const canvas = document.getElementById('three-background');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 600;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Deep space navy-black
    renderer.setClearColor(0x020610, 1);

    const isMobile = window.innerWidth < 768;

    // --- Layer 1: Dense distant star field (small, white/pale blue) ---
    const starCount = isMobile ? 1200 : 2800;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const white = new THREE.Color('#ffffff');
    const paleBlue = new THREE.Color('#c8d8ff');
    const warmWhite = new THREE.Color('#fff4e0');

    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        starPositions[i3]     = (Math.random() * 2 - 1) * 900;
        starPositions[i3 + 1] = (Math.random() * 2 - 1) * 900;
        starPositions[i3 + 2] = (Math.random() * 2 - 1) * 600;

        const roll = Math.random();
        const c = roll < 0.6 ? white : roll < 0.85 ? paleBlue : warmWhite;
        starColors[i3]     = c.r;
        starColors[i3 + 1] = c.g;
        starColors[i3 + 2] = c.b;

        // Vary star brightness/size: most tiny, a few brighter
        starSizes[i] = Math.random() < 0.06 ? 2.5 : Math.random() < 0.2 ? 1.5 : 0.8;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
    });

    starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- Layer 2: Nebula cloud (large, soft, blue/purple) ---
    const nebulaCount = isMobile ? 60 : 140;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    const nebBlue   = new THREE.Color('#1a3a8a');
    const nebPurple = new THREE.Color('#4a1a7a');
    const nebTeal   = new THREE.Color('#0a4a6a');

    for (let i = 0; i < nebulaCount; i++) {
        const i3 = i * 3;
        // Cluster nebula in two zones for realism
        const zone = Math.random() > 0.5 ? -1 : 1;
        nebulaPositions[i3]     = zone * (80 + Math.random() * 300);
        nebulaPositions[i3 + 1] = (Math.random() * 2 - 1) * 200;
        nebulaPositions[i3 + 2] = (Math.random() * 2 - 1) * 200;

        const roll = Math.random();
        const c = roll < 0.45 ? nebBlue : roll < 0.75 ? nebPurple : nebTeal;
        nebulaColors[i3]     = c.r;
        nebulaColors[i3 + 1] = c.g;
        nebulaColors[i3 + 2] = c.b;
    }

    const nebulaGeo = new THREE.BufferGeometry();
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMat = new THREE.PointsMaterial({
        size: 80,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.06,
        sizeAttenuation: true,
    });

    nebulaField = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaField);

    // --- Layer 3: Sparse accent stars (teal/pink, very few) ---
    const accentCount = isMobile ? 30 : 70;
    const accentPositions = new Float32Array(accentCount * 3);
    const accentColors = new Float32Array(accentCount * 3);

    const teal = new THREE.Color('#00f2ea');
    const pink = new THREE.Color('#ff0050');

    for (let i = 0; i < accentCount; i++) {
        const i3 = i * 3;
        accentPositions[i3]     = (Math.random() * 2 - 1) * 800;
        accentPositions[i3 + 1] = (Math.random() * 2 - 1) * 800;
        accentPositions[i3 + 2] = (Math.random() * 2 - 1) * 400;

        const c = Math.random() > 0.5 ? teal : pink;
        accentColors[i3]     = c.r;
        accentColors[i3 + 1] = c.g;
        accentColors[i3 + 2] = c.b;
    }

    const accentGeo = new THREE.BufferGeometry();
    accentGeo.setAttribute('position', new THREE.BufferAttribute(accentPositions, 3));
    accentGeo.setAttribute('color', new THREE.BufferAttribute(accentColors, 3));

    const accentMat = new THREE.PointsMaterial({
        size: 2.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
    });

    accentField = new THREE.Points(accentGeo, accentMat);
    scene.add(accentField);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        } else {
            if (!animFrameId) animate();
        }
    });
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    animFrameId = requestAnimationFrame(animate);

    // Very slow, elegant drift
    starField.rotation.y += 0.00008;
    starField.rotation.x += 0.00003;

    nebulaField.rotation.y += 0.00005;
    nebulaField.rotation.z += 0.00002;

    accentField.rotation.y -= 0.00006;
    accentField.rotation.x += 0.00004;

    // Subtle parallax on mouse move
    camera.position.x += (mouseX * 0.02 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 0.02 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function initThreeJS() {
    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded.');
        return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    init();
    animate();
}

initThreeJS();
