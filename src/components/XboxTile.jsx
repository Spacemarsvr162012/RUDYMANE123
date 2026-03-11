import React from 'react';
import { motion } from 'motion/react';

export const XboxTile = ({ game, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer"
      onClick={() => onClick(game)}
    >
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-xbox-gray xbox-tile-shadow border-2 border-transparent group-hover:border-xbox-green transition-all duration-200">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <h3 className="text-lg font-bold text-white">{game.title}</h3>
          <p className="text-xs text-gray-300 line-clamp-1">{game.category}</p>
        </div>
      </div>
      <div className="mt-2 text-center group-hover:text-xbox-green transition-colors">
        <span className="text-sm font-semibold uppercase tracking-wider">{game.title}</span>
      </div>
    </motion.div>
  );
};
