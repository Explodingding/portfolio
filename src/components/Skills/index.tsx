"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

type Skill = {
  name: string;
  level: number;
  color: string;
};

const skills: Skill[] = [
  { name: 'JavaScript', level: 90, color: '#f0db4f' },
  { name: 'TypeScript', level: 85, color: '#007acc' },
  { name: 'React', level: 88, color: '#61dbfb' },
  { name: 'Next.js', level: 82, color: '#ffffff' },
  { name: 'Three.js', level: 75, color: '#00ffff' },
  { name: 'HTML/CSS', level: 92, color: '#e34c26' },
  { name: 'Tailwind CSS', level: 86, color: '#38b2ac' },
  { name: 'Node.js', level: 80, color: '#68a063' },
];

export const Skills = () => {
  const [isInView, setIsInView] = useState(false);

  return (
    <section id="skills" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          My <span className="text-[#f0141e]">Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onViewportEnter={() => setIsInView(true)}
              className="relative"
            >
              <div className="flex justify-between mb-1">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-[#f0141e] font-medium">{skill.level}%</span>
              </div>
              <div className="h-3 bg-[#1f1f1f] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.level}%` : 0 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: 'Projects Completed', value: '25+' },
            { label: 'Happy Clients', value: '15+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Awards', value: '3' },
          ].map((stat, index) => (
            <div key={stat.label} className="bg-[#1f1f1f] p-6 rounded-lg">
              <motion.h4
                className="text-[#f0141e] text-4xl font-bold mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.h4>
              <p className="text-white">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}; 