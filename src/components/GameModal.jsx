import React from 'react';
import { X, Maximize2, ExternalLink, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GameModal = ({ game, onClose }) => {
  if (!game) return null;

  const openAboutBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) return;
    
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = game.url;
    win.document.body.appendChild(iframe);
    win.document.title = "Google Drive"; // Cloak title
    
    // Add a favicon cloak too
    const link = win.document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
    win.document.head.appendChild(link);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-xbox-dark border border-xbox-gray"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-xbox-gray bg-xbox-black/50 p-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-extrabold tracking-tighter text-white uppercase italic">
                {game.title}
              </h2>
              <span className="rounded bg-xbox-green px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                {game.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openAboutBlank}
                className="flex items-center gap-2 rounded-lg bg-xbox-gray px-3 py-1.5 text-xs font-bold text-white hover:bg-xbox-green transition-colors"
                title="Open in about:blank (Cloaked)"
              >
                <Shield size={14} />
                <span className="hidden sm:inline">CLOAK</span>
              </button>
              <button
                onClick={() => window.open(game.url, '_blank')}
                className="flex items-center gap-2 rounded-lg bg-xbox-gray px-3 py-1.5 text-xs font-bold text-white hover:bg-xbox-green transition-colors"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">POPUP</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-lg bg-xbox-gray p-1.5 text-white hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Game Frame */}
          <div className="relative flex-1 bg-black">
            <iframe
              src={game.url}
              className="h-full w-full border-none"
              allowFullScreen
              title={game.title}
            />
          </div>

          {/* Footer Info */}
          <div className="bg-xbox-black p-4 text-xs text-gray-400">
            <p>{game.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
