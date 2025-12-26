import * as THREE from 'three';
import { gsap } from 'gsap';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

// Create gradient background
function createGradientTexture() {
  const canvas2d = document.createElement('canvas');
  canvas2d.width = 256;
  canvas2d.height = 256;
  const context = canvas2d.getContext('2d');

  const gradient = context.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, '#1A4FF7');
  gradient.addColorStop(1, '#3AED68');

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas2d);
  texture.needsUpdate = true;
  return texture;
}

// Create scene
const scene = new THREE.Scene();
scene.background = createGradientTexture();


// Create camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 4, 18);
camera.lookAt(0, 2, 0);

// Create renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.dampingFactor = 0.25;
// controls.enableZoom = true;
// controls.enablePan = true;
// controls.enableRotate = true;

const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,
  metalness: 0,
  roughness: 0.2,
  clearcoat: 0.1,
  clearcoatRoughness: 0.3
});

// Head
const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere1.castShadow = true;
sphere1.position.set(-5, 12, 1.5);

// Left ear
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere2.castShadow = true;
sphere2.scale.set(0.6, 0.6, 0.6);
sphere2.position.set(-3, 12, 1.5);

// Right ear
const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere3.castShadow = true;
sphere3.scale.set(0.6, 0.6, 0.6);
sphere3.position.set(10, 12, 1.5);

scene.add(sphere1, sphere2, sphere3);


// Mini Cubes geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x5E2392,
  metalness: 0.8,
  roughness: 0.2,
  clearcoat: 0.1,
  clearcoatRoughness: 0.3,
});

const cubes = [];
const cubesPerRow = 16;
const cubesPerColumn = 6;
for (let i = 0; i < cubesPerRow; i++) {
  for (let j = 0; j < cubesPerColumn; j++) {
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const { width, height } = cube.geometry.parameters;

    cube.position.set(((i * 0.5) + (width / 2)) - (cubesPerRow * 0.25), ((j * 0.5) + (height / 2)), 0);

    cubes.push(cube);
    scene.add(cube);
  }
}

// Big yellow cube
const bigYellowCubeMaterial = new THREE.MeshStandardMaterial({
  color: 0xFFFF00,
  metalness: 0.8,
  roughness: 0.2,
  clearcoat: 1,
});
const bigYellowCubeGeometry = new THREE.BoxGeometry(6, 2.3, 0.5);
const bigYellowCube = new THREE.Mesh(bigYellowCubeGeometry, bigYellowCubeMaterial);
bigYellowCube.position.set(-5, 12, 0.5);
bigYellowCube.rotation.z = Math.PI / 9;
scene.add(bigYellowCube);

// Green cube
const greenCubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x228067,
  metalness: 0.1,
  roughness: 0.8,
  clearcoat: 0.1,
  clearcoatRoughness: 0.3,
});
const greenCubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.5);
const greenCube = new THREE.Mesh(greenCubeGeometry, greenCubeMaterial);
greenCube.position.set(4, 12, 1);
greenCube.receiveShadow = true;
scene.add(greenCube);

// Text Disney
let textMesh = null;
const fontLoader = new FontLoader();

fontLoader.load(
  'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry('Disney', {
      font: font,
      size: 1,
      height: 0.05,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.07,
      bevelOffset: 0,
      bevelSegments: 5
    });

    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    textGeometry.translate(-textWidth / 2, 0, 0);

    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF714F,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.5, -5, 20);
    textMesh.scale.set(4, 4, 1);
    textMesh.castShadow = true;
    scene.add(textMesh);

    mainTimeline.to(textMesh.position, {
      z: 1.1,
      y: 2,
      duration: bounceDuration / 2,
      ease: "circ.out",
    }, 'yellowCube+=2.8')
      .to(textMesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: bounceDuration / 2,
        ease: "circ.out",
      }, '<')
      .to(textMesh.rotation, {
        z: Math.PI / 30,
        duration: bounceDuration / 2,
        ease: "circ.out",
      }, '<')
  },
  undefined,
  (error) => {
    console.error('Error loading font:', error);
  }
);

// Roll
const width = 4,
  height = 1,
  segments = 300,
  turns = 1,
  thickness = 0.1;

const greenPlaneGeometry = new THREE.PlaneGeometry(width, height, segments, 1);
const originalPositions = greenPlaneGeometry.attributes.position.array.slice();

const greenPlaneMaterial = new THREE.MeshStandardMaterial({
  color: 0x228067,
  side: THREE.DoubleSide,
});

const greenPlane = new THREE.Mesh(greenPlaneGeometry, greenPlaneMaterial);
scene.add(greenPlane);

const animState = { factor: 0.7 };

function updateRoll() {
  const positions = greenPlaneGeometry.attributes.position;
  const unrolledLength = width * (1 - animState.factor);

  for (let i = 0; i < positions.count; i++) {
    const origX = originalPositions[i * 3];
    const y = originalPositions[i * 3 + 1];

    const currentPosOnPaper = origX + width / 2;

    if (currentPosOnPaper < unrolledLength) {

      const newX = currentPosOnPaper;
      const newZ = thickness * turns;
      positions.setXYZ(i, newX, y, newZ);
    } else {
      const remainingProgress = (currentPosOnPaper - unrolledLength) / width;

      const angle = (currentPosOnPaper - unrolledLength) / (thickness + 0.1) * animState.factor;
      const radius = 0.5 + (remainingProgress * turns * thickness);

      const newX = radius * Math.cos(angle) + unrolledLength;
      const newZ = radius * Math.sin(angle) + radius;

      positions.setXYZ(i, newX, y, newZ);
    }
  }

  positions.needsUpdate = true;
  greenPlaneGeometry.computeVertexNormals();
}

greenPlane.position.set(-20, 1.2, 1);
greenPlane.rotation.z = -Math.PI / 30;
scene.add(greenPlane);


// Plane for shadow
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.1
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -1.2);
plane.receiveShadow = true;
scene.add(plane);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-1, 4, 4);
directionalLight.target.position.set(0, 4, 0);
directionalLight.castShadow = true;

scene.add(directionalLight);
scene.add(directionalLight.target);

// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);


const bounceDuration = 3;

const mainTimeline = gsap.timeline({
  defaults: {
    force3D: true,
  }
})

  // animate spheres position
  .to(sphere1.position, {
    keyframes: [
      {
        x: -2,
        y: 0,
        z: -8,
        duration: bounceDuration,
        ease: "elastic.in(0.5,0.75)",
      },
      {
        x: 0,
        y: 5,
        z: 1.5,
        duration: bounceDuration / 2,
        ease: "elastic.out(1.05,0.95)",
      },
    ],
  })
  .to(sphere2.position, {
    keyframes: [
      {
        x: 1,
        y: 0,
        duration: bounceDuration,
        ease: "elastic.in(0.5,0.75)",
      },
      {
        x: -1,
        y: 6.2,
        duration: bounceDuration / 2,
        ease: "elastic.out(1,1)",
      },
    ],
  }, '<0.5')
  .to(sphere3.position, {
    keyframes: [
      {
        x: 5,
        y: 0,
        duration: bounceDuration,
        ease: "elastic.in(0.5,0.75)",
      },
      {
        x: 1,
        y: 6.2,
        duration: bounceDuration / 2,
        ease: "elastic.out(1,1)",
      },
    ],
  }, '<0.5')

  // animate all cubes positions and rotations
  .from(cubes.map(cube => cube.position), {
    x: gsap.utils.random(-20, 20, 0.1, true),
    y: gsap.utils.random(16, 20, 0.1, true),
    z: gsap.utils.random(-10, 10, 0.1, true),
    duration: 3,
    ease: "sine.out",
    stagger: {
      from: "random",
      amount: 1.5,
    }
  }, '>-1.5')
  .from(cubes.map(cube => cube.rotation), {
    x: gsap.utils.random(-Math.PI, Math.PI, 5, true),
    y: gsap.utils.random(-Math.PI, Math.PI, 5, true),
    z: gsap.utils.random(-Math.PI, Math.PI, 5, true),
    duration: 2.8,
    ease: "sine.out",
    stagger: {
      from: "random",
      amount: 1.5,
    }
  }, '<')
  .addLabel('yellowCube', '>-2')

  // drop big yellow cube
  .to(bigYellowCube.position, {
    x: 1.5,
    y: 0,
    duration: bounceDuration,
    ease: "elastic.in(0.5,0.75)",
  }, 'yellowCube')
  .to(bigYellowCube.rotation, {
    z: Math.PI / -9,
    duration: bounceDuration,
    ease: "elastic.in(0.5,0.75)",
  }, '<')
  .to(bigYellowCube.position, {
    x: -0.5,
    y: 1.5,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  })
  .to(bigYellowCube.rotation, {
    z: Math.PI / 12,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')
  .to(bigYellowCube.position, {
    y: 2.5,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<0.1')
  .to(bigYellowCube.rotation, {
    z: Math.PI / 30,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')

  // animate green cube
  .to(greenCube.position, {
    x: 2,
    y: 0,
    duration: bounceDuration,
    ease: "elastic.in(0.5,0.75)",
  }, 'yellowCube+=0.2')
  .to(greenCube.position, {
    x: 1,
    y: 4,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '>')
  .to(greenCube.rotation, {
    z: Math.PI / 8,
    x: -Math.PI,
    duration: bounceDuration,
    ease: "elastic.out(1.05,0.95)",
  }, '<')

  // animate Head
  .to(sphere1.scale, {
    x: 0.6,
    y: 0.6,
    z: 0.6,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<0.25')
  .to(sphere1.position, {
    x: -0.1,
    y: 5.5,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')
  .to([sphere2.scale, sphere3.scale], {
    x: 0.3,
    y: 0.3,
    z: 0.3,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')
  .to(sphere1.position, {
    x: 0.9,
    y: 3.9,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<0.2')
  .to(sphere1.scale, {
    x: 0.35,
    y: 0.35,
    z: 0.35,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')
  .to([sphere2.scale, sphere3.scale], {
    x: 0.17,
    y: 0.17,
    z: 0.17,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')
  .to(sphere3.position, {
    x: 0.8,
    y: 4.32,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')
  .to(sphere2.position, {
    x: 1.3,
    y: 4.1,
    duration: bounceDuration / 2,
    ease: "elastic.out(1.05,0.95)",
  }, '<')
  // animate green plane
  .to(greenPlane.position, {
    x: -1.5,
    duration: bounceDuration / 2,
    ease: "power4.out",
  }, '<')
  .to(animState, {
    factor: 0,
    duration: 1,
    ease: "sine.out",
    onUpdate: updateRoll
  }, '>-1');


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  updateRoll();
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

