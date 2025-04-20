"use client";

import { motion } from 'framer-motion';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A cutting-edge web application with modern features.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/project1.jpg',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Interactive 3D visualization platform for data analytics.',
    tech: ['Three.js', 'React', 'GSAP'],
    imageUrl: '/project2.jpg',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Mobile-first responsive design with smooth animations.',
    tech: ['React Native', 'Framer Motion', 'Firebase'],
    imageUrl: '/project3.jpg',
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
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

export const Portfolio = () => {
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
              <div className="h-48 relative">
                <div className="h-full w-full bg-gradient-to-r from-[#f0141e]/80 to-[#00ffff]/80 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">Image Placeholder</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#f0141e]/20 text-[#f0141e] text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 