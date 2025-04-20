"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

  const calculateMovement = (strength: number = 0.05) => {
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

  // Cloud animation
  const cloudVariants = {
    animate: {
      x: [0, 10, 0, -10, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Sunray animation
  const sunrayVariants = {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#0f3460] to-[#16213e]">
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            variants={cloudVariants}
            animate="animate"
            custom={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 60 + 30}px`,
              top: `${Math.random() * 40}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              filter: 'blur(15px)',
            }}
          />
        ))}
      </div>

      {/* Sun and rays */}
      <div className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full bg-gradient-to-r from-[#ff9966] to-[#ff5e62] shadow-lg" style={{
        boxShadow: '0 0 60px 30px rgba(255, 165, 0, 0.4)'
      }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            variants={sunrayVariants}
            animate="animate"
            className="absolute bg-gradient-to-r from-[#ff9966]/40 to-[#ff5e62]/40 origin-center"
            style={{
              width: '150px',
              height: '10px',
              left: '50%',
              top: '50%',
              marginLeft: '-75px',
              marginTop: '-5px',
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: 'center',
              filter: 'blur(3px)',
            }}
          />
        ))}
      </div>

      {/* Tree silhouette */}
      <motion.div 
        className="absolute bottom-0 left-[15%] w-80 h-96"
        style={{ 
          transform: `translate(${calculateMovement(0.02).x}px, ${calculateMovement(0.01).y}px)`
        }}
      >
        <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M100 0C90 30 80 50 75 65C65 90 60 100 60 120C60 140 80 160 100 160C120 160 140 140 140 120C140 100 135 90 125 65C120 50 110 30 100 0Z" fill="black" />
          <rect x="95" y="160" width="10" height="140" fill="black" />
          <path d="M70 180C65 190 60 200 40 220" stroke="black" strokeWidth="5" />
          <path d="M130 180C135 190 140 200 160 220" stroke="black" strokeWidth="5" />
          <path d="M80 140C75 150 70 155 50 160" stroke="black" strokeWidth="5" />
          <path d="M120 140C125 150 130 155 150 160" stroke="black" strokeWidth="5" />
          <path d="M80 100C75 110 70 115 40 125" stroke="black" strokeWidth="5" />
          <path d="M120 100C125 110 130 115 160 125" stroke="black" strokeWidth="5" />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10"
      >
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
          className="text-xl text-gray-300 max-w-xl"
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
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
    </section>
  );
}; 