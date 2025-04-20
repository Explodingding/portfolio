"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect based on mouse position
  const calculateParallax = (strength: number = 0.02) => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    
    const moveX = (mousePosition.x - centerX) * strength;
    const moveY = (mousePosition.y - centerY) * strength;
    
    return { x: moveX, y: moveY };
  };

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariants} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  // Light rays animation
  const lightRayVariants = {
    animate: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ 
            x: calculateParallax(0.015).x,
            y: calculateParallax(0.01).y,
            scale: 1.1, // Slightly larger to allow for parallax movement
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/oak.png"
            alt="Majestic oak tree with sunlight rays"
            fill
            priority
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </div>

      {/* Light rays overlay */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            variants={lightRayVariants}
            animate="animate"
            className="absolute bg-yellow-500/10"
            style={{
              width: '100vw',
              height: '200vh',
              top: '-50vh',
              left: `${i * 20}%`, 
              transform: `rotate(${30 + i * 10}deg)`,
              transformOrigin: 'center',
              filter: 'blur(30px)',
            }}
          />
        ))}
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-20"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-30"
      >
        <div className="bg-black/40 backdrop-blur-sm px-8 py-6 rounded-2xl">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-7xl font-bold text-white mb-6"
          >
            <motion.span className="block">
              {splitText("Exploding")}
            </motion.span>
            <motion.span className="block text-[#f0141e] mt-2">
              {splitText("Portfolio")}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-xl"
          >
            Creative development with a passion for innovative digital experiences
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-[#f0141e] text-white text-lg font-bold rounded-full shadow-lg hover:bg-[#d01119] transition-colors"
          >
            Explore My Work
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}; 