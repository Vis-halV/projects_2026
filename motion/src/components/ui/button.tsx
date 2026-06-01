"use client"
import { motion } from "motion/react"

export function Button() {
    return (
        <div 
            className="h-screen w-full bg-neutral-950 flex items-center justify-center"
            style={{
                backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6, 182, 212, 0.2) 1px,
                transparent 0)`,
                backgroundSize: '8px 8px',
                backgroundRepeat: 'repeat',
            }}    
        >
            <motion.button 
            whileHover={{
                rotateX: 20,
                rotateY: 20,
                boxShadow: "0px 20px 50px rgba(8,112,184,0.7)",
            }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            style={{
                translateZ: 100,
            }}
            className="group relative text-neutral-500 px-12 py-4 rounded-lg bg-black shadow-[0px_1px_4px_0px_rgba(255,255,255,0.1)_inset,0px-1px_4px_0px_rgba(255,255,255,0.1)_inset]">
                Click me
                <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-white to-transparent h-px w-3/4 mx-auto"></span>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[4px] w-full mx-auto blur-sm"></span>
            </motion.button>
        </div>
    );
}
