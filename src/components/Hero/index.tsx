"use client";

import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen relative overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-6xl font-bold text-white">
          <span className="text-[#f0141e]">Exploding</span> Portfolio
        </h1>
      </motion.div>
    </motion.section>
  );
}; 