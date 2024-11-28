import React from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '../types/art';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0, 
    transition: { 
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    y: -8,
    transition: { 
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: { 
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  return (
    <motion.div
      className="relative bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden transform-gpu shadow-lg"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layoutId={`card-${artwork.id}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${artwork.title}`}
    >
      <div className={`overflow-hidden ${
        Number(artwork.id) % 4 === 0 
          ? 'aspect-[3/4]' 
          : Number(artwork.id) % 4 === 1 
            ? 'aspect-square'
            : Number(artwork.id) % 4 === 2
              ? 'aspect-[4/5]'
              : 'aspect-[2/3]'
      }`}>
        <motion.img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          layoutId={`image-${artwork.id}`}
          variants={imageVariants}
          initial={{ scale: 1 }}
        />
      </div>
      <motion.div 
        className="absolute inset-0 p-4 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent dark:from-gray-900/95 dark:via-gray-900/50 opacity-0 hover:opacity-100 transition-all duration-500 flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1" layoutId={`title-${artwork.id}`}>{artwork.title}</h3>
        <p className="text-sm text-gray-200 mb-2">
          {artwork.artist}, {artwork.year} • {artwork.medium}
        </p>
        <p className="text-sm text-gray-300 line-clamp-3">{artwork.description}</p>
      </motion.div>
    </motion.div>
  );
}