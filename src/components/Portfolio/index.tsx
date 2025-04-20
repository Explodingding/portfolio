"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// Sample project data with more details and multiple images
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A cutting-edge web application with modern features for online shopping.',
    longDescription: 'A fully responsive e-commerce platform built with React and Node.js. Features include user authentication, product search, filtering, cart management, payment processing through Stripe, and order tracking.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe API'],
    imageUrl: '/project1.jpg',
    additionalImages: ['/project1-detail1.jpg', '/project1-detail2.jpg'],
    link: 'https://example-ecommerce.com',
  },
  {
    id: 2,
    title: '3D Data Visualization',
    description: 'Interactive 3D visualization platform for complex data analytics.',
    longDescription: 'A powerful 3D visualization tool that helps businesses understand complex datasets through interactive graphics. Users can manipulate views, zoom in/out, and export customized reports. Built with Three.js and D3 for optimal performance.',
    tech: ['Three.js', 'React', 'GSAP', 'D3.js', 'WebGL'],
    imageUrl: '/project2.jpg',
    additionalImages: ['/project2-detail1.jpg', '/project2-detail2.jpg'],
    link: 'https://data-viz-example.com',
  },
  {
    id: 3,
    title: 'Mobile Fitness App',
    description: 'Mobile-first responsive design with smooth animations for fitness tracking.',
    longDescription: 'A comprehensive fitness tracking application that helps users monitor workouts, nutrition, and progress over time. Features include custom workout plans, calorie tracking, progress photos, and social sharing capabilities.',
    tech: ['React Native', 'Framer Motion', 'Firebase', 'Redux', 'HealthKit API'],
    imageUrl: '/project3.jpg',
    additionalImages: ['/project3-detail1.jpg', '/project3-detail2.jpg'],
    link: 'https://fitness-app-example.com',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
};

export const Portfolio = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="portfolio" className="py-20 bg-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          My <span className="text-[#f0141e]">Projects</span>
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-[#0a0a0a] rounded-lg overflow-hidden shadow-lg"
            >
              <div 
                className="h-48 relative cursor-pointer" 
                onClick={() => toggleExpand(project.id)}
              >
                <div className="h-full w-full bg-gradient-to-r from-[#f0141e]/80 to-[#00ffff]/80 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">Project Preview</span>
                </div>
                <div className="absolute top-2 right-2 bg-[#f0141e] text-white p-1 rounded-full w-6 h-6 flex items-center justify-center">
                  {expandedId === project.id ? '−' : '+'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#f0141e]/20 text-[#f0141e] text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <AnimatePresence>
                  {expandedId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-700 pt-4 mt-2">
                        <h4 className="text-lg font-semibold text-[#00ffff] mb-2">About this project</h4>
                        <p className="text-gray-300 mb-4">{project.longDescription}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {/* Placeholder for additional images */}
                          <div className="bg-[#1a1a1a] h-20 rounded flex items-center justify-center">
                            <span className="text-sm text-gray-400">Detail 1</span>
                          </div>
                          <div className="bg-[#1a1a1a] h-20 rounded flex items-center justify-center">
                            <span className="text-sm text-gray-400">Detail 2</span>
                          </div>
                        </div>
                        
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-[#f0141e] hover:bg-[#d01119] text-white px-4 py-2 rounded-md transition-colors font-medium"
                        >
                          View Project
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 