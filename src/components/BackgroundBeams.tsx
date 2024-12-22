// components/BackgroundBeams.tsx

'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Vector3 } from 'three';

interface Beam {
    id: number;
    position: Vector3;
    speed: number;
    size: [number, number];
    color: string;
}

const BackgroundBeams = () => {
    const [beams, setBeams] = useState<Beam[]>([]);
    const beamId = useRef(0);

    // Function to add a new beam with varying sizes and colors
    const addBeam = () => {
        const newBeam: Beam = {
            id: beamId.current++,
            position: new Vector3(-10, 10, 0), // Start from top-left off-screen
            speed: 0.07 + Math.random() * 0.03, // Random speed between 0.07 and 0.1
            size: [0.8 + Math.random(), 6 + Math.random() * 2], // Varying width and height
            color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${0.4 + Math.random() * 0.6})`, // Random color with varying opacity
        };
        setBeams((prev) => [...prev, newBeam]);
    };

    // Add beams at intervals
    useEffect(() => {
        addBeam(); // Initial beam
        const interval = setInterval(addBeam, 700); // Add a new beam every 700ms
        return () => clearInterval(interval);
    }, []);

    // Update beam positions on each frame
    useFrame(() => {
        setBeams((prevBeams) =>
            prevBeams
                .map((beam) => {
                    beam.position.x += beam.speed;
                    beam.position.y -= beam.speed;
                    return beam;
                })
                .filter((beam) => beam.position.x < 10 && beam.position.y > -10) // Remove beams out of bounds
        );
    });

    return (
        <>
            {beams.map((beam) => (
                <mesh key={beam.id} position={beam.position}>
                    <planeGeometry args={beam.size} />
                    <meshBasicMaterial color={beam.color} transparent />
                </mesh>
            ))}
        </>
    );
};

export default BackgroundBeams;
