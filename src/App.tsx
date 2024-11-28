import React from 'react';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import Navigation from './components/Navigation';
import MasonryGrid from './components/MasonryGrid';
import ArtworkViewer from './components/ArtworkViewer';
import { artworks } from './data/artworks';
import type { ArtMedium, Artwork } from './types/art';

function App() {
  const [selectedMedium, setSelectedMedium] = useState<ArtMedium | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  const shuffleArtworks = useCallback(() => {
    setShuffleKey(prev => prev + 1);
  }, []);

  let filteredArtworks = selectedMedium
    ? artworks.filter((artwork) => artwork.medium === selectedMedium)
    : artworks;

  // Shuffle the array using Fisher-Yates algorithm
  filteredArtworks = [...filteredArtworks].sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation selectedMedium={selectedMedium} onSelectMedium={setSelectedMedium} />
      <motion.main
        className="max-w-[2400px] mx-auto pt-52 pb-8 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={shuffleArtworks}
          className="fixed bottom-8 right-8 p-4 bg-indigo-600/20 backdrop-blur-sm text-indigo-400 rounded-full border border-indigo-500/50 shadow-lg shadow-indigo-500/20 z-40"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Shuffle className="w-6 h-6" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedMedium || 'all'}-${shuffleKey}`}
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MasonryGrid 
              artworks={filteredArtworks}
              onArtworkClick={setSelectedArtwork}
              key={shuffleKey}
            />
          </motion.div>
        
          {filteredArtworks.length === 0 && (
            <motion.div
              className="text-center py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 text-lg">
                No artworks found for the selected medium.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <ArtworkViewer 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />
    </div>
  );

}
export default App;
