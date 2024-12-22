// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */


"use client";

// components/BackgroundParticles.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticlesBackground = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000);
        camera.position.z = 1000;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(width, height);
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Particles
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() * 2 - 1) * 1000;
            positions[i * 3 + 1] = (Math.random() * 2 - 1) * 1000;
            positions[i * 3 + 2] = (Math.random() * 2 - 1) * 1000;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Mouse Interaction
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - width / 2) * 0.5;
            mouseY = (event.clientY - height / 2) * 0.1;
        };

        document.addEventListener('mousemove', onMouseMove, false);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);

            particleSystem.rotation.y += 0.001;

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute top-0 left-0 w-full h-full z-0"
        />
    );
};

export default ParticlesBackground;