// DiagonalParticles.tsx

'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

const DiagonalParticles = () => {
    const controls = useAnimationControls();

    // Function to create a new particle animation
    const createParticle = () => {
        return {
            x: [-100, 1200],  // Moves from left off-screen to right off-screen
            y: [-100, 800],   // Moves from top off-screen to bottom off-screen
            opacity: [1, 0],  // Fades out as it moves
            transition: {
                x: { duration: 5, ease: 'linear', repeat: Infinity },
                y: { duration: 5, ease: 'linear', repeat: Infinity },
                opacity: { duration: 5, ease: 'linear', repeat: Infinity },
            },
        };
    };

    useEffect(() => {
        controls.start(createParticle);
    }, [controls]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Multiple particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    animate={controls}
                    className="absolute bg-white rounded-full"
                    style={{
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        top: `${Math.random() * -200}px`,
                        left: `${Math.random() * -200}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default DiagonalParticles;
