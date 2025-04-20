"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

const ideaVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const Dreaminn = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const ideas = [
    {
      title: "AI-Powered Dream Journal",
      description: "An application that helps users record their dreams and uses AI to analyze patterns, themes, and potential meanings. Features include voice recording, emotion tracking, and personalized insights.",
      features: [
        "Voice-to-text dream recording",
        "Emotion and theme analysis",
        "Dream patterns visualization",
        "Personalized interpretations",
        "Community sharing options"
      ],
      status: "Concept Phase"
    },
    {
      title: "Immersive VR Meditation",
      description: "A virtual reality application designed to create immersive meditation experiences in breathtaking environments. Users can customize their experience with different guided meditations, environments, and music.",
      features: [
        "Photorealistic nature environments",
        "Custom meditation guides",
        "Biofeedback integration",
        "Progressive relaxation tracks",
        "Session tracking and analytics"
      ],
      status: "Early Prototype"
    },
    {
      title: "Augmented Cooking Assistant",
      description: "An AR app that transforms cooking through step-by-step visual guidance overlaid on your actual kitchen space. Ideal for beginners and experienced chefs alike.",
      features: [
        "Visual ingredient measurements",
        "Technique demonstrations in AR",
        "Smart timing and notifications",
        "Recipe scaling and adjustments",
        "Nutritional information overlay"
      ],
      status: "Research Phase"
    }
  ];

  return (
    <section id="dreaminn" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-[#f0141e]">Dream</span>inn
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            This is where imagination meets innovation. Dreaminn is my space for showcasing concept ideas 
            and potential future projects. These are ventures I&apos;m passionate about developing further.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md overflow-hidden bg-[#1f1f1f]">
            {ideas.map((idea, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm sm:text-base font-medium transition-colors ${
                  activeTab === index
                    ? "bg-[#f0141e] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#f0141e]/20"
                }`}
              >
                {idea.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={ideaVariants}
          className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">{ideas[activeTab].title}</h3>
            <span className="bg-[#f0141e]/20 text-[#f0141e] px-3 py-1 rounded-full text-sm">
              {ideas[activeTab].status}
            </span>
          </div>
          
          <p className="text-gray-300 mb-8">{ideas[activeTab].description}</p>
          
          <div>
            <h4 className="text-lg font-semibold text-[#00ffff] mb-4">Key Features</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ideas[activeTab].features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#f0141e] mr-2">•</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-10 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#f0141e] to-[#ff4d4d] text-white font-bold rounded-md shadow-lg transition-all"
            >
              Interested in this idea?
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 