import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VRSceneProps {
  scrollProgress?: number;
  className?: string;
  size?: 'hero' | 'small';
}

export default function VRScene({ scrollProgress = 0, className = '', size = 'hero' }: VRSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    headset: THREE.Group;
    particles: THREE.Points;
    animId: number;
    mouse: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, size === 'hero' ? 7 : 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1a1008, 0.8);
    scene.add(ambientLight);

    const goldLight1 = new THREE.PointLight(0xC9A84C, 3, 20);
    goldLight1.position.set(4, 3, 5);
    scene.add(goldLight1);

    const goldLight2 = new THREE.PointLight(0xD4AF6A, 2, 15);
    goldLight2.position.set(-4, -2, 3);
    scene.add(goldLight2);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x8899bb, 1.5, 20);
    fillLight.position.set(-6, 2, 2);
    scene.add(fillLight);

    // Materials
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.15,
      envMapIntensity: 1,
    });

    const darkCharcoalMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.8,
      roughness: 0.25,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      metalness: 0.95,
      roughness: 0.08,
      envMapIntensity: 1.5,
    });

    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x050510,
      metalness: 0.3,
      roughness: 0.0,
      opacity: 0.95,
      transparent: true,
    });

    const lensGlowMat = new THREE.MeshStandardMaterial({
      color: 0x223366,
      metalness: 0.1,
      roughness: 0.0,
      emissive: 0x112244,
      emissiveIntensity: 0.6,
      opacity: 0.8,
      transparent: true,
    });

    const softPadMat = new THREE.MeshStandardMaterial({
      color: 0x0d0d0d,
      metalness: 0.1,
      roughness: 0.9,
    });

    // VR Headset Group
    const headset = new THREE.Group();

    // Main body — wide flat box
    const bodyGeom = new THREE.BoxGeometry(3.4, 1.6, 1.0);
    const body = new THREE.Mesh(bodyGeom, darkMetalMat);
    headset.add(body);

    // Front face plate (slightly protruding)
    const faceplateGeom = new THREE.BoxGeometry(3.2, 1.4, 0.12);
    const faceplate = new THREE.Mesh(faceplateGeom, darkCharcoalMat);
    faceplate.position.z = 0.56;
    headset.add(faceplate);

    // Gold trim ring around faceplate
    const trimGeom = new THREE.BoxGeometry(3.3, 1.5, 0.05);
    const trimInner = new THREE.BoxGeometry(3.15, 1.35, 0.06);
    const trimMesh = new THREE.Mesh(trimGeom, goldMat);
    trimMesh.position.z = 0.53;
    headset.add(trimMesh);

    // Lens housings (left & right)
    const lensHousingGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.18, 48);
    lensHousingGeom.rotateX(Math.PI / 2);
    const lensHousingL = new THREE.Mesh(lensHousingGeom, goldMat);
    lensHousingL.position.set(-0.85, 0, 0.62);
    headset.add(lensHousingL);

    const lensHousingR = new THREE.Mesh(lensHousingGeom, goldMat);
    lensHousingR.position.set(0.85, 0, 0.62);
    headset.add(lensHousingR);

    // Actual lenses (dark reflective glass)
    const lensGeom = new THREE.CircleGeometry(0.42, 48);
    const lensL = new THREE.Mesh(lensGeom, lensMat);
    lensL.position.set(-0.85, 0, 0.72);
    headset.add(lensL);

    const lensR = new THREE.Mesh(lensGeom, lensMat);
    lensR.position.set(0.85, 0, 0.72);
    headset.add(lensR);

    // Lens inner glow
    const lensGlowGeom = new THREE.CircleGeometry(0.3, 48);
    const lensGlowL = new THREE.Mesh(lensGlowGeom, lensGlowMat);
    lensGlowL.position.set(-0.85, 0, 0.73);
    headset.add(lensGlowL);

    const lensGlowR = new THREE.Mesh(lensGlowGeom, lensGlowMat);
    lensGlowR.position.set(0.85, 0, 0.73);
    headset.add(lensGlowR);

    // Nose bridge
    const bridgeGeom = new THREE.BoxGeometry(0.35, 0.25, 0.1);
    const bridge = new THREE.Mesh(bridgeGeom, darkCharcoalMat);
    bridge.position.set(0, -0.18, 0.62);
    headset.add(bridge);

    // Side grips / straps attachment points
    const gripGeom = new THREE.BoxGeometry(0.25, 0.9, 0.85);
    const gripL = new THREE.Mesh(gripGeom, darkCharcoalMat);
    gripL.position.set(-1.825, 0, 0);
    headset.add(gripL);

    const gripR = new THREE.Mesh(gripGeom, darkCharcoalMat);
    gripR.position.set(1.825, 0, 0);
    headset.add(gripR);

    // Gold accent strips on sides
    const sideAccentGeom = new THREE.BoxGeometry(0.06, 1.55, 0.95);
    const sideAccentL = new THREE.Mesh(sideAccentGeom, goldMat);
    sideAccentL.position.set(-1.67, 0, 0);
    headset.add(sideAccentL);

    const sideAccentR = new THREE.Mesh(sideAccentGeom, goldMat);
    sideAccentR.position.set(1.67, 0, 0);
    headset.add(sideAccentR);

    // Top padding strip
    const topPadGeom = new THREE.BoxGeometry(2.6, 0.2, 0.85);
    const topPad = new THREE.Mesh(topPadGeom, softPadMat);
    topPad.position.set(0, 0.9, 0);
    headset.add(topPad);

    // Bottom padding strip
    const bottomPadGeom = new THREE.BoxGeometry(2.4, 0.18, 0.75);
    const bottomPad = new THREE.Mesh(bottomPadGeom, softPadMat);
    bottomPad.position.set(0, -0.89, 0);
    headset.add(bottomPad);

    // Top gold accent line
    const topAccentGeom = new THREE.BoxGeometry(2.8, 0.04, 1.05);
    const topAccent = new THREE.Mesh(topAccentGeom, goldMat);
    topAccent.position.set(0, 0.82, 0);
    headset.add(topAccent);

    // Small power button
    const btnGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.06, 16);
    btnGeom.rotateZ(Math.PI / 2);
    const btn = new THREE.Mesh(btnGeom, goldMat);
    btn.position.set(1.73, 0.5, 0);
    headset.add(btn);

    headset.position.set(size === 'hero' ? 0.8 : 0, 0, 0);
    headset.rotation.set(0.1, -0.4, 0);
    scene.add(headset);

    // Floating particles
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xC9A84C,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / w - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    sceneRef.current = { scene, camera, renderer, headset, particles, animId: 0, mouse };

    let clock = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      if (sceneRef.current) sceneRef.current.animId = id;

      clock += 0.008;

      // Auto rotation + mouse parallax
      const targetX = mouse.y * 0.25 + Math.sin(clock * 0.5) * 0.05;
      const targetY = mouse.x * 0.3 - clock * 0.15;
      headset.rotation.x += (targetX + 0.1 - headset.rotation.x) * 0.04;
      headset.rotation.y += (targetY - 0.4 - headset.rotation.y) * 0.04;

      // Gentle float
      headset.position.y = Math.sin(clock) * 0.08;

      // Particles drift
      particles.rotation.y = clock * 0.04;
      particles.rotation.x = clock * 0.02;

      // Gold lights animate
      goldLight1.position.x = Math.sin(clock * 0.7) * 4;
      goldLight1.position.y = Math.cos(clock * 0.5) * 3;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(sceneRef.current?.animId || 0);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [size]);

  useEffect(() => {
    if (sceneRef.current) {
      const { headset } = sceneRef.current;
      headset.rotation.y += scrollProgress * 0.5;
    }
  }, [scrollProgress]);

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
