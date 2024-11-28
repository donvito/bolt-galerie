import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Paintbrush, Camera, Shapes, MonitorPlay, Box, Palette, Menu, X } from 'lucide-react';
import { ArtMedium } from '../types/art';
import { useState } from 'react';

interface NavigationProps {
  selectedMedium: ArtMedium | null;
  onSelectMedium: (medium: ArtMedium | null) => void;
}

const mediumIcons = {
  Painting: Paintbrush,
  Photography: Camera,
  Sculpture: Shapes,
  Digital: MonitorPlay,
  Installation: Box,
};

const quotes = [
  { text: "Art enables us to find ourselves and lose ourselves at the same time", author: "Thomas Merton" },
  { text: "Every artist was first an amateur", author: "Ralph Waldo Emerson" },
  { text: "Art is not what you see, but what you make others see", author: "Edgar Degas" },
  { text: "Art is the lie that enables us to realize the truth", author: "Pablo Picasso" },
];

export default function Navigation({ selectedMedium, onSelectMedium }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(249, 250, 251, 0)', 'rgba(249, 250, 251, 0.95)']
  );
  const headerHeight = useTransform(scrollY, [0, 50], ['6rem', '4.5rem']);
  const scale = useTransform(scrollY, [0, 50], [1, 0.9]);
  const blur = useTransform(scrollY, [0, 50], ['blur-none', 'blur-xl']);

  return (
    <motion.nav
      style={{ 
        height: headerHeight, 
        backdropFilter: blur 
      }}
      className="fixed top-0 left-0 right-0 border-b border-gray-200/20 z-50 transition-colors duration-300 pt-6"
    >
      <motion.div 
        className="absolute inset-0 transition-colors duration-300"
        style={{ background: headerBg }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex items-center justify-between h-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            style={{ scale }}
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-30" />
              <Palette className="w-8 h-8 text-indigo-600 relative" strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 tracking-tight font-playfair flex flex-col">
              <span>Galerie Lumière</span>
              <span className="text-sm text-gray-500 font-normal tracking-widest uppercase mt-1">Contemporary Art Museum</span>
            </h1>
          </motion.div>
          
          {/* Mobile menu button */}
          <motion.button
            className="lg:hidden p-2 text-gray-600 hover:text-indigo-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>

          {/* Desktop menu */}
          <div className="hidden lg:flex space-x-3">
            <motion.button
              onClick={() => onSelectMedium(null)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                ${
                  selectedMedium === null
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                    : 'text-gray-600 border-gray-200/30 hover:border-indigo-400/30 hover:text-indigo-600 hover:bg-indigo-50/30'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            {Object.entries(mediumIcons).map(([medium, Icon], index) => (
              <motion.button
                key={medium}
                onClick={() => onSelectMedium(selectedMedium === medium ? null : medium as ArtMedium)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${
                    selectedMedium === medium
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                      : 'text-gray-600 border-gray-200/30 hover:border-indigo-400/30 hover:text-indigo-600 hover:bg-indigo-50/30'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4 mr-2" strokeWidth={1.5} />
                {medium}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/20 py-4 px-4 shadow-lg"
          >
            <div className="flex flex-col space-y-2">
              <motion.button
                onClick={() => {
                  onSelectMedium(null);
                  setIsMenuOpen(false);
                }}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${
                    selectedMedium === null
                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                      : 'text-gray-600 border-gray-200/30 hover:border-indigo-400/30 hover:text-indigo-600 hover:bg-indigo-50/30'
                  }`}
              >
                All
              </motion.button>
              {Object.entries(mediumIcons).map(([medium, Icon]) => (
                <motion.button
                  key={medium}
                  onClick={() => {
                    onSelectMedium(selectedMedium === medium ? null : medium as ArtMedium);
                    setIsMenuOpen(false);
                  }}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                    ${
                      selectedMedium === medium
                        ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                        : 'text-gray-600 border-gray-200/30 hover:border-indigo-400/30 hover:text-indigo-600 hover:bg-indigo-50/30'
                    }`}
                >
                  <Icon className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  {medium}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute -bottom-24 left-0 right-0 text-center px-4"
      >
        <motion.p
          key={Math.floor(Math.random() * quotes.length)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl text-gray-600 italic font-playfair max-w-4xl mx-auto bg-white/90 backdrop-blur-sm py-4 px-8 rounded-full shadow-md border border-gray-100"
        >
          "{quotes[Math.floor(Math.random() * quotes.length)].text}"
        </motion.p>
      </motion.div>
    </motion.nav>
  );
}