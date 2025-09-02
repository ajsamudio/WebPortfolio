// Three.js background script
let scene, camera, renderer, particles, lines;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    const canvas = document.getElementById('three-background');

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 500;

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild( renderer.domElement );
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '-1';

    // Lights

    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );

    renderer.setClearColor(0x222222);

    // Particles (dots)
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleGeometry = new THREE.BufferGeometry();

    const pMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        sizeAttenuation: true
    });

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() * 2 - 1) * 500;
        positions[i3 + 1] = (Math.random() * 2 - 1) * 500;
        positions[i3 + 2] = (Math.random() * 2 - 1) * 500;

        colors[i3] = 0.0; // R
        colors[i3 + 1] = Math.random() * 0.5; // G (greenish)
        colors[i3 + 2] = 0.0; // B
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles = new THREE.Points(particleGeometry, pMaterial);
    scene.add(particles);

    // Lines (connecting particles)
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffff00, // Yellow
        transparent: true,
        opacity: 0.05,
        linewidth: 0.5,
        blending: THREE.AdditiveBlending
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 2 * 3); // Max possible lines
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);
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
    requestAnimationFrame(animate);

    // Animate particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;

    // Animate camera based on mouse position
    camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Update lines
    const positions = particles.geometry.attributes.position.array;
    const linePositions = lines.geometry.attributes.position.array;
    let lineIndex = 0;

    lines.geometry.setDrawRange(0, 0); // Reset lines

    for (let i = 0; i < positions.length; i += 3) {
        const p1 = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);

        for (let j = i + 3; j < positions.length; j += 3) {
            const p2 = new THREE.Vector3(positions[j], positions[j + 1], positions[j + 2]);
            const distance = p1.distanceTo(p2);

            if (distance < 70) { // Connect particles within a certain distance
                linePositions[lineIndex++] = p1.x;
                linePositions[lineIndex++] = p1.y;
                linePositions[lineIndex++] = p1.z;

                linePositions[lineIndex++] = p2.x;
                linePositions[lineIndex++] = p2.y;
                linePositions[lineIndex++] = p2.z;
            }
        }
    }
    lines.geometry.setDrawRange(0, lineIndex / 3);
    lines.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

function initThreeJS() {
    if (typeof THREE !== 'undefined') {
        init();
        animate();
    } else {
        console.error("THREE.js not loaded. Ensure the script is included before three-background.js");
    }
}

initThreeJS();
