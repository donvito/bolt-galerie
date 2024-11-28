import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Artwork } from '../types/art';

interface ArtworkViewerProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export default function ArtworkViewer({ artwork, onClose }: ArtworkViewerProps) {
  if (!artwork) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/90 backdrop-blur-lg"
        onClick={onClose}
      >
        <motion.button
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-700 rounded-full bg-white/80 backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </motion.button>

        <div className="w-full h-full p-8 flex flex-col md:flex-row items-center justify-center gap-8" onClick={(e) => e.stopPropagation()}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 h-full max-w-4xl"
          >
            <motion.img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="w-full h-full object-contain rounded-lg"
              layoutId={`image-${artwork.id}`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-shrink-0 max-w-md"
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              layoutId={`title-${artwork.id}`}
            >
              {artwork.title}
            </motion.h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-xl">
                <span className="text-indigo-400">Artist:</span> {artwork.artist}
              </p>
              <p className="text-xl">
                <span className="text-indigo-400">Year:</span> {artwork.year}
              </p>
              <p className="text-xl">
                <span className="text-indigo-400">Medium:</span> {artwork.medium}
              </p>
              <p className="text-lg leading-relaxed">{artwork.description}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}