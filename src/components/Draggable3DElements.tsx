// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable */

'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { useRef, useState } from 'react';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three'; // Import animated components from react-spring

// Replace with paths to your images
const images = [
    'https://framerusercontent.com/images/ioBrAcmXYF8LRSxJApCAUh9LI.png?scale-down-to=512',  // Top-left
    'https://framerusercontent.com/images/iVEIMoOeg0btapECZ8Lmewv6gg.png?scale-down-to=512',  // Top-right
    'https://framerusercontent.com/images/Cw7txRkj102SoTp368n2ufAhs.png?scale-down-to=512',  // Bottom-left
    'https://framerusercontent.com/images/vz9kBTFoRFtcblXGjYPD8q3K3k.png?scale-down-to=512',  // Bottom-right
];

const DraggableImage = ({ position, imagePath, size }: { position: [number, number, number]; imagePath: string; size: [number, number] }) => {
    const ref = useRef(null!);
    const [, setIsDragging] = useState(false);
    const texture = useLoader(TextureLoader, imagePath);

    // Spring for position with an elastic effect
    const [{ springPosition }, springApi] = useSpring(() => ({
        springPosition: position,
        config: { tension: 200, friction: 20, mass: 1 }, // Adjust values for desired elasticity
    }));

    const bind = useDrag(
        ({ movement: [x, y], first, last }) => {
            if (first) {
                setIsDragging(true);
            }
            if (last) {
                setIsDragging(false);
                // Return to original position with spring effect on release
                springApi.start({ springPosition: position });
            } else {
                // Update position while dragging
                springApi.set({ springPosition: [position[0] + x / 100, position[1] - y / 100, position[2]] });
            }
        },
        { pointerEvents: true }
    );

    return (
        <a.mesh ref={ref} position={springPosition} {...bind()}> {/* Use animated position */}
            <planeGeometry args={size} /> {/* Adjust size as needed */}
            <meshBasicMaterial map={texture} transparent />
        </a.mesh>
    );
};

const Draggable3DElements = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} enableRotate={false} />

            {/* Adjusted positions for desired layout */}
            <DraggableImage position={[-6.5, 2.5, 0]} imagePath={images[0]} size={[2, 2]} />    {/* Top-left */}
            <DraggableImage position={[6.5, 2.5, 0]} imagePath={images[1]} size={[1, 1]} />     {/* Top-right */}
            <DraggableImage position={[-6.5, -2.5, 0]} imagePath={images[2]} size={[3, 3]} />   {/* Bottom-left */}
            <DraggableImage position={[6.5, -2.5, 0]} imagePath={images[3]} size={[2, 2]} />    {/* Bottom-right */}
        </Canvas>
    );
};

export default Draggable3DElements;
