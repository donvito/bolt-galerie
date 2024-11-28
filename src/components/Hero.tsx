import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Palette } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const y = useTransform(scrollY, [0, 300], [0, 150]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ scale }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-gray-900/95 to-gray-900 mix-blend-multiply"></div>
          <img
            src="https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&q=80"
            alt="Museum background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
      </div>
      
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-40 h-[200px] bg-gradient-radial from-indigo-500/20 to-transparent blur-3xl"></div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-600/20 backdrop-blur-sm ring-1 ring-indigo-500/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Palette className="w-10 h-10 text-indigo-400" strokeWidth={1.5} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Modern Art Museum
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Explore our curated collection of contemporary artworks spanning various mediums and artistic expressions
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white ring-1 ring-white/20"
            >
              <span className="font-medium">15+ Artists</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white ring-1 ring-white/20"
            >
              <span className="font-medium">5 Mediums</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white ring-1 ring-white/20"
            >
              <span className="font-medium">Latest Collection</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}