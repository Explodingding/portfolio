"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

export const DreaminnApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDreaming, setIsDreaming] = useState(false);
  const [dreamText, setDreamText] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'journal', label: 'Dream Journal' },
    { id: 'analyze', label: 'Analysis' },
    { id: 'community', label: 'Community' },
  ];

  const handleStartDream = () => {
    setIsDreaming(true);
    setTimeout(() => {
      setIsDreaming(false);
      setDreamText('I found myself floating above a vast ocean. The water below was crystal clear, and I could see ancient cities beneath the surface. As I descended, I noticed I could breathe underwater. Fish with glowing patterns guided me through the submerged ruins...');
    }, 3000);
  };

  return (
    <section id="dreaminn-app" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-[#f0141e]">Dream</span>inn App
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Experience the interactive demo of Dreaminn - an AI-powered dream journal 
            that helps you record, analyze, and understand your dreams.
          </p>
        </motion.div>

        <div className="bg-[#0f0f1a] rounded-2xl overflow-hidden shadow-2xl border border-[#f0141e]/20">
          {/* App Header */}
          <div className="bg-[#0d0d15] border-b border-[#f0141e]/20 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-white font-semibold">Dreaminn v1.0</div>
            <div className="text-gray-400 text-sm">
              {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* App Navigation */}
          <div className="flex border-b border-[#f0141e]/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#f0141e] border-b-2 border-[#f0141e]"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* App Content */}
          <div className="p-6">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="max-w-md mx-auto bg-[#161625] rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Start Dreaming</h3>
                  <p className="text-gray-300 mb-6">
                    Ready to record your dream? Click the button below to start the AI-assisted dream recording process.
                  </p>
                  
                  {isDreaming ? (
                    <div className="relative flex items-center justify-center py-10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-4 border-t-[#f0141e] border-b-[#f0141e] border-l-transparent border-r-transparent animate-spin"></div>
                      </div>
                      <p className="text-[#f0141e] font-medium relative z-10">Processing dream...</p>
                    </div>
                  ) : dreamText ? (
                    <div className="bg-[#1d1d35] p-4 rounded-lg text-left text-gray-300 mb-6 max-h-60 overflow-y-auto">
                      <p>{dreamText}</p>
                    </div>
                  ) : null}
                  
                  <button
                    onClick={handleStartDream}
                    disabled={isDreaming}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition-all ${
                      isDreaming 
                        ? "bg-gray-700 cursor-not-allowed" 
                        : "bg-gradient-to-r from-[#f0141e] to-[#ff4d4d] hover:shadow-lg hover:shadow-[#f0141e]/20"
                    }`}
                  >
                    {dreamText ? "Record Another Dream" : "Record Dream"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="bg-[#161625] rounded-xl p-4">
                    <h4 className="text-[#f0141e] font-medium mb-2">Dreams Recorded</h4>
                    <p className="text-3xl font-bold text-white">12</p>
                  </div>
                  <div className="bg-[#161625] rounded-xl p-4">
                    <h4 className="text-[#f0141e] font-medium mb-2">Dream Patterns</h4>
                    <p className="text-3xl font-bold text-white">4</p>
                  </div>
                  <div className="bg-[#161625] rounded-xl p-4">
                    <h4 className="text-[#f0141e] font-medium mb-2">Sleep Quality</h4>
                    <p className="text-3xl font-bold text-white">78%</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'journal' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white"
              >
                <div className="flex justify-between mb-6">
                  <h3 className="text-xl font-bold">Your Dream Journal</h3>
                  <button className="text-sm px-3 py-1 bg-[#f0141e] rounded">New Entry</button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { date: "Yesterday", title: "Flying Over Mountains", mood: "Excited" },
                    { date: "3 days ago", title: "Lost in a Maze", mood: "Anxious" },
                    { date: "Last week", title: "Underwater City", mood: "Curious" },
                  ].map((entry, i) => (
                    <div key={i} className="bg-[#1d1d35] p-4 rounded-lg cursor-pointer hover:bg-[#252540] transition-colors">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{entry.title}</h4>
                        <span className="text-gray-400 text-sm">{entry.date}</span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">Mood: {entry.mood}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'analyze' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white"
              >
                <h3 className="text-xl font-bold mb-6">Dream Analysis</h3>
                
                <div className="bg-[#161625] rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-medium mb-4">Common Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Water", "Flying", "Falling", "Searching", "Darkness", "Light"].map((theme) => (
                      <span key={theme} className="px-3 py-1 bg-[#1d1d35] rounded-full text-sm">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#161625] rounded-xl p-6">
                  <h4 className="text-lg font-medium mb-4">Emotional Patterns</h4>
                  <div className="h-40 flex items-end justify-between">
                    {["Joy", "Fear", "Wonder", "Anxiety", "Peace"].map((emotion, i) => {
                      const heights = [70, 40, 90, 60, 50];
                      return (
                        <div key={emotion} className="flex flex-col items-center">
                          <div 
                            className="w-12 bg-gradient-to-t from-[#f0141e] to-[#ff4d4d] rounded-t"
                            style={{ height: `${heights[i]}%` }}
                          ></div>
                          <span className="text-xs mt-2">{emotion}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'community' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white"
              >
                <h3 className="text-xl font-bold mb-6">Dream Community</h3>
                
                <div className="bg-[#161625] rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#f0141e] flex items-center justify-center text-white font-bold">
                      D
                    </div>
                    <div>
                      <h4 className="font-medium">DreamExplorer</h4>
                      <p className="text-gray-400 text-xs">Shared a dream 2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    I had a recurring dream about a hidden door in my childhood home. Last night I finally opened it and found...
                  </p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>12 comments</span>
                    <div className="flex space-x-4">
                      <span>❤️ 24 likes</span>
                      <span>🔄 Share</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button className="px-4 py-2 border border-[#f0141e] text-[#f0141e] rounded-lg text-sm hover:bg-[#f0141e]/10 transition-colors">
                    Explore More Dreams
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Coming Soon to App Stores</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              The Dreaminn app is currently in development. Join the waitlist to be one of the first to experience it!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-[#f0141e] to-[#ff4d4d] text-white font-bold rounded-xl shadow-lg hover:shadow-[#f0141e]/20 transition-shadow"
            >
              Join Waitlist
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 