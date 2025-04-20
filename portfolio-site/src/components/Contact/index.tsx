"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formState);
    alert('Form submitted! (This is just a demo)');
  };

  return (
    <section id="contact" className="py-20 bg-[#1f1f1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-white mb-16"
        >
          Get in <span className="text-[#f0141e]">Touch</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white">Contact Information</h3>
            <p className="text-gray-300">
              I&apos;m interested in freelance opportunities – especially ambitious or large projects. However, if you have other request or question, don&apos;t hesitate to contact me.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📍', label: 'Location', value: 'Warsaw, Poland' },
                { icon: '📧', label: 'Email', value: 'hello@example.com' },
                { icon: '📱', label: 'Phone', value: '+48 123 456 789' },
              ].map((item) => (
                <div key={item.label} className="flex items-start">
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <div>
                    <h4 className="text-[#f0141e] font-semibold">{item.label}</h4>
                    <p className="text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-md bg-[#0a0a0a] text-white border border-gray-700 focus:border-[#f0141e] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-md bg-[#0a0a0a] text-white border border-gray-700 focus:border-[#f0141e] focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 rounded-md bg-[#0a0a0a] text-white border border-gray-700 focus:border-[#f0141e] focus:outline-none transition-colors resize-none"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 bg-[#f0141e] text-white font-bold rounded-md shadow-lg hover:bg-[#d01119] transition-colors"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}; 