import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Artwork } from '../types/art';
import ArtworkCard from './ArtworkCard';

interface MasonryGridProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

export default function MasonryGrid({ artworks, onArtworkClick }: MasonryGridProps) {
  return (
    <LayoutGroup>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3 px-3">
        {artworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.8,
              delay: index * 0.05,
              layout: { duration: 0.8, type: "spring", bounce: 0.2 }
            }}
            className="break-inside-avoid"
          >
            <ArtworkCard 
              artwork={artwork}
              onClick={() => onArtworkClick(artwork)}
            />
          </motion.div>
        ))}
      </div>
    </LayoutGroup>
  );
}