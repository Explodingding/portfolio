"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Dream interpretation database
const dreamSymbols = {
  "water": "Water often symbolizes emotions, the unconscious mind, or transition. Clear water may represent clarity or purity, while turbulent water can indicate emotional turmoil.",
  "ocean": "The ocean represents the vastness of your unconscious mind. Deep waters often symbolize unexplored emotions or hidden knowledge.",
  "fish": "Fish symbolize spiritual insights, creativity, or fertility. They can also represent slippery or elusive thoughts.",
  "flying": "Flying typically represents freedom, breaking free from limitations, or gaining a new perspective. It can also indicate a desire to escape from something.",
  "falling": "Falling often reflects anxiety, loss of control, or fear of failure. It may also represent letting go of something.",
  "teeth": "Dreams about teeth may symbolize anxiety about appearance, communication issues, or fear of aging.",
  "door": "Doors represent new opportunities, transitions, or choices. A locked door might symbolize a missed opportunity.",
  "house": "Houses represent the self, with different rooms symbolizing different aspects of your personality.",
  "tree": "Trees symbolize growth, strength, and connection between the conscious (branches) and unconscious (roots).",
  "car": "Cars typically represent your direction in life and personal drive. Problems with a car might reflect obstacles you're facing.",
  "mountain": "Mountains represent challenges, ambition, or spiritual goals. Climbing a mountain often symbolizes personal growth.",
  "maze": "Being lost in a maze often represents confusion, complicated decisions, or feeling trapped.",
  "city": "Cities can represent social dynamics, community, or the organized aspects of your mind.",
  "ruins": "Ancient ruins may symbolize past experiences, forgotten memories, or ancestral wisdom.",
  "breathing": "Unusual breathing (like underwater) might represent adaptability or transformation.",
  "light": "Light often symbolizes awareness, enlightenment, or sudden understanding.",
  "darkness": "Darkness can represent the unknown, fear, mystery, or aspects of yourself you're not conscious of."
};

export const DreaminnApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDreaming, setIsDreaming] = useState(false);
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<{ symbol: string, meaning: string }[]>([]);
  const [dominantThemes, setDominantThemes] = useState<string[]>([]);
  const [emotionalTone, setEmotionalTone] = useState<string>('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [journalEntries, setJournalEntries] = useState([
    { date: "Yesterday", title: "Flying Over Mountains", mood: "Excited", content: "I was soaring over majestic mountain peaks, feeling the wind beneath me. The view was breathtaking." },
    { date: "3 days ago", title: "Lost in a Maze", mood: "Anxious", content: "I found myself trapped in an endless maze with walls that kept shifting. Every time I thought I found the exit, it disappeared." },
    { date: "Last week", title: "Underwater City", mood: "Curious", content: "I discovered an ancient city beneath the ocean. I could breathe underwater and explored the ruins of a civilization." },
  ]);
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  
  // Timer for voice recording simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVoiceRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 10) {
            setIsVoiceRecording(false);
            handleDreamSubmission("I found myself floating above a vast ocean. The water below was crystal clear, and I could see ancient cities beneath the surface. As I descended, I noticed I could breathe underwater. Fish with glowing patterns guided me through the submerged ruins. There was a sense of peace and discovery, yet also mystery about what happened to this civilization.");
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVoiceRecording]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'journal', label: 'Dream Journal' },
    { id: 'analyze', label: 'Analysis' },
    { id: 'community', label: 'Community' },
  ];

  const handleStartDream = () => {
    setDreamText('');
    setAnalysis([]);
    setDominantThemes([]);
    setEmotionalTone('');
    setIsVoiceRecording(true);
  };

  const handleDreamSubmission = (dreamContent: string) => {
    setIsDreaming(true);
    setDreamText(dreamContent);
    
    // Simulate AI processing
    setTimeout(() => {
      analyzeDream(dreamContent);
      setIsDreaming(false);
      // Add to journal
      if (activeTab === 'dashboard') {
        const newEntry = {
          date: "Just now",
          title: getDefaultTitle(dreamContent),
          mood: determineEmotionalTone(dreamContent),
          content: dreamContent
        };
        setJournalEntries(prev => [newEntry, ...prev]);
      }
    }, 3000);
  };

  const getDefaultTitle = (text: string) => {
    // Extract first 3-5 words for a title
    const words = text.split(' ').filter(word => word.length > 3).slice(0, 5);
    if (words.length > 2) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return "New Dream Entry";
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const textarea = form.elements.namedItem('dreamText') as HTMLTextAreaElement;
    if (textarea.value.trim()) {
      handleDreamSubmission(textarea.value);
      textarea.value = '';
    }
  };

  const analyzeDream = (text: string) => {
    // Convert to lowercase for matching
    const lowercaseText = text.toLowerCase();
    const foundSymbols: { symbol: string, meaning: string }[] = [];
    const themes = new Set<string>();
    
    // Find matching symbols in the dream text
    Object.entries(dreamSymbols).forEach(([symbol, meaning]) => {
      if (lowercaseText.includes(symbol)) {
        foundSymbols.push({ symbol, meaning });
        themes.add(symbol);
      }
    });
    
    // Set the analysis results
    setAnalysis(foundSymbols);
    
    // Determine dominant themes (up to 5)
    const symbolsArray = Array.from(themes).slice(0, 6);
    setDominantThemes(symbolsArray);
    
    // Set emotional tone
    setEmotionalTone(determineEmotionalTone(text));
  };
  
  const determineEmotionalTone = (text: string) => {
    const lowercaseText = text.toLowerCase();
    
    // Simple sentiment analysis based on keywords
    const emotions = [
      { name: 'Joy', keywords: ['happy', 'joy', 'excited', 'pleasant', 'peace', 'wonderful', 'beautiful'], score: 0 },
      { name: 'Fear', keywords: ['afraid', 'fear', 'scary', 'terrified', 'frightened', 'horror'], score: 0 },
      { name: 'Wonder', keywords: ['awe', 'wonder', 'amazing', 'discovery', 'curious', 'fascinating'], score: 0 },
      { name: 'Anxiety', keywords: ['anxious', 'worried', 'stress', 'nervous', 'tension', 'uneasy'], score: 0 },
      { name: 'Peace', keywords: ['calm', 'serene', 'tranquil', 'peaceful', 'quiet', 'still'], score: 0 },
    ];
    
    emotions.forEach(emotion => {
      emotion.keywords.forEach(keyword => {
        if (lowercaseText.includes(keyword)) {
          emotion.score += 1;
        }
      });
    });
    
    // Return the emotion with the highest score
    const dominantEmotion = emotions.sort((a, b) => b.score - a.score)[0];
    return dominantEmotion.score > 0 ? dominantEmotion.name : 'Neutral';
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
                <div className="max-w-md mx-auto bg-[#161625] rounded-xl p-6 shadow-lg mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Record Your Dream</h3>
                  
                  {isVoiceRecording ? (
                    <div className="mb-6">
                      <div className="w-full h-8 bg-[#1d1d35] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#f0141e] to-[#ff4d4d] transition-all"
                          style={{ width: `${(recordingTime / 10) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-white mt-2">Recording... {recordingTime}s</p>
                      <button 
                        onClick={() => setIsVoiceRecording(false)}
                        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : dreamText ? (
                    <div className="bg-[#1d1d35] p-4 rounded-lg text-left text-gray-300 mb-6 max-h-60 overflow-y-auto">
                      <p>{dreamText}</p>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <p className="text-gray-300 mb-4">
                        Choose a method to record your dream:
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleStartDream}
                          className="px-4 py-2 bg-gradient-to-r from-[#f0141e] to-[#ff4d4d] text-white rounded-lg hover:shadow-lg hover:shadow-[#f0141e]/20 transition-all flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                          Voice Record
                        </button>
                        <span className="text-gray-400">or</span>
                        <button
                          onClick={() => document.getElementById('textEntry')?.classList.remove('hidden')}
                          className="px-4 py-2 border border-[#f0141e] text-[#f0141e] rounded-lg hover:bg-[#f0141e]/10 transition-colors flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Text Entry
                        </button>
                      </div>
                      
                      <form id="textEntry" className="mt-6 hidden" onSubmit={handleTextSubmit}>
                        <textarea 
                          name="dreamText"
                          className="w-full px-4 py-3 rounded-md bg-[#1d1d35] text-white border border-gray-700 focus:border-[#f0141e] focus:outline-none transition-colors resize-none mb-4"
                          placeholder="Describe your dream in detail..."
                          rows={4}
                          required
                        ></textarea>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#f0141e] text-white rounded-lg hover:bg-[#d01119] transition-colors"
                        >
                          Analyze Dream
                        </button>
                      </form>
                    </div>
                  )}
                  
                  {isDreaming && (
                    <div className="relative flex items-center justify-center py-10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-4 border-t-[#f0141e] border-b-[#f0141e] border-l-transparent border-r-transparent animate-spin"></div>
                      </div>
                      <p className="text-[#f0141e] font-medium relative z-10">Analyzing dream...</p>
                    </div>
                  )}
                  
                  {analysis.length > 0 && (
                    <div className="bg-[#1d1d35] p-4 rounded-lg text-left mb-6">
                      <h4 className="text-[#f0141e] font-medium mb-3">Dream Analysis</h4>
                      <p className="text-gray-300 mb-3">
                        Your dream contains these key symbols:
                      </p>
                      <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
                        {analysis.map((item, index) => (
                          <div key={index} className="border-b border-gray-700 pb-2 last:border-0">
                            <span className="text-white font-medium">{item.symbol.charAt(0).toUpperCase() + item.symbol.slice(1)}</span>
                            <p className="text-gray-400 text-sm">{item.meaning}</p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-700 mt-4 pt-3">
                        <p className="text-gray-300">
                          <span className="text-white font-medium">Emotional tone:</span> {emotionalTone}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {dreamText && (
                    <button
                      onClick={() => {
                        setDreamText('');
                        setAnalysis([]);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[#f0141e] to-[#ff4d4d] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#f0141e]/20 transition-all"
                    >
                      Record Another Dream
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <div className="bg-[#161625] rounded-xl p-4">
                    <h4 className="text-[#f0141e] font-medium mb-2">Dreams Recorded</h4>
                    <p className="text-3xl font-bold text-white">{journalEntries.length}</p>
                  </div>
                  <div className="bg-[#161625] rounded-xl p-4">
                    <h4 className="text-[#f0141e] font-medium mb-2">Dream Patterns</h4>
                    <p className="text-3xl font-bold text-white">{dominantThemes.length || 4}</p>
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
                  <button 
                    className="text-sm px-3 py-1 bg-[#f0141e] rounded"
                    onClick={() => setActiveTab('dashboard')}
                  >
                    New Entry
                  </button>
                </div>
                
                {selectedEntry !== null ? (
                  <div>
                    <button 
                      onClick={() => setSelectedEntry(null)}
                      className="flex items-center text-gray-400 hover:text-white mb-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to journal
                    </button>
                    
                    <div className="bg-[#1d1d35] p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold">{journalEntries[selectedEntry].title}</h4>
                        <span className="text-gray-400 text-sm">{journalEntries[selectedEntry].date}</span>
                      </div>
                      
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-[#f0141e]/20 text-[#f0141e] rounded-full text-sm mb-4">
                          Mood: {journalEntries[selectedEntry].mood}
                        </span>
                        <p className="text-gray-300 leading-relaxed">
                          {journalEntries[selectedEntry].content}
                        </p>
                      </div>
                      
                      <div className="border-t border-gray-700 pt-4 mt-4">
                        <h5 className="text-[#00ffff] font-medium mb-3">AI Interpretation</h5>
                        <p className="text-gray-300 mb-4">
                          This dream suggests themes of exploration and discovery. The {journalEntries[selectedEntry].mood.toLowerCase()} emotional tone indicates you may be feeling a sense of wonder about possibilities in your life.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Exploration", "Discovery", "Wonder", "Mystery"].map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-[#161625] text-gray-300 text-xs rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {journalEntries.map((entry, i) => (
                      <div 
                        key={i} 
                        className="bg-[#1d1d35] p-4 rounded-lg cursor-pointer hover:bg-[#252540] transition-colors"
                        onClick={() => setSelectedEntry(i)}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium">{entry.title}</h4>
                          <span className="text-gray-400 text-sm">{entry.date}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">Mood: {entry.mood}</p>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-1">{entry.content}</p>
                      </div>
                    ))}
                  </div>
                )}
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
                    {dominantThemes.length > 0 
                      ? dominantThemes.map((theme) => (
                          <span key={theme} className="px-3 py-1 bg-[#1d1d35] rounded-full text-sm">
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </span>
                        ))
                      : ["Water", "Flying", "Falling", "Searching", "Darkness", "Light"].map((theme) => (
                          <span key={theme} className="px-3 py-1 bg-[#1d1d35] rounded-full text-sm">
                            {theme}
                          </span>
                        ))
                    }
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <h5 className="font-medium mb-2">Symbol Explorer</h5>
                    <p className="text-gray-400 text-sm mb-3">Click on any dream symbol to learn its meaning:</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(dreamSymbols).slice(0, 10).map((symbol) => (
                        <button
                          key={symbol}
                          onClick={() => {
                            const element = document.getElementById(`symbol-${symbol}`);
                            if (element) {
                              element.classList.toggle('hidden');
                            }
                          }}
                          className="px-3 py-1 bg-[#f0141e]/20 text-[#f0141e] rounded-full text-sm hover:bg-[#f0141e]/30 transition-colors"
                        >
                          {symbol.charAt(0).toUpperCase() + symbol.slice(1)}
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      {Object.entries(dreamSymbols).slice(0, 10).map(([symbol, meaning]) => (
                        <div key={symbol} id={`symbol-${symbol}`} className="hidden bg-[#1d1d35] p-3 rounded-lg">
                          <h6 className="font-medium text-white">{symbol.charAt(0).toUpperCase() + symbol.slice(1)}</h6>
                          <p className="text-gray-300 text-sm">{meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#161625] rounded-xl p-6">
                  <h4 className="text-lg font-medium mb-4">Emotional Patterns</h4>
                  <div className="h-40 flex items-end justify-between">
                    {["Joy", "Fear", "Wonder", "Anxiety", "Peace"].map((emotion, i) => {
                      const heights = emotionalTone === emotion ? [95] : [70, 40, 90, 60, 50];
                      const height = emotionalTone === emotion ? 95 : heights[i];
                      return (
                        <div key={emotion} className="flex flex-col items-center">
                          <div 
                            className={`w-12 rounded-t transition-all duration-500 ${
                              emotion === emotionalTone 
                                ? "bg-gradient-to-t from-[#f0141e] to-[#ff9966]" 
                                : "bg-gradient-to-t from-[#f0141e] to-[#ff4d4d]"
                            }`}
                            style={{ height: `${height}%` }}
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
                    I had a recurring dream about a hidden door in my childhood home. Last night I finally opened it and found a staircase leading down to a vast library filled with ancient books. Each book contained someone&apos;s memories.
                  </p>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>12 comments</span>
                    <div className="flex space-x-4">
                      <button className="hover:text-white transition-colors">❤️ 24 likes</button>
                      <button className="hover:text-white transition-colors">🔄 Share</button>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <h5 className="font-medium mb-3">Community Interpretations</h5>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      <div className="bg-[#1d1d35] p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            M
                          </div>
                          <span className="text-sm font-medium">MindWalker</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          The door represents access to collective knowledge, while the library symbolizes wisdom and the interconnectedness of human experience.
                        </p>
                      </div>
                      <div className="bg-[#1d1d35] p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                            S
                          </div>
                          <span className="text-sm font-medium">SleepSage</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          Your childhood home often represents your core self. The discovery suggests you&apos;re accessing deeper parts of your psyche that have been previously hidden.
                        </p>
                      </div>
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