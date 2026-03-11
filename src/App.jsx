import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { XboxTile } from './components/XboxTile';
import { GameModal } from './components/GameModal';
import gamesData from './games.json';
import { motion } from 'motion/react';
import { LayoutGrid, Flame, Clock, Star } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const categories = ['All', ...new Set(gamesData.map(g => g.category))];
  const filteredGames = filter === 'All' ? games : games.filter(g => g.category === filter);

  return (
    <div className="min-h-screen bg-xbox-black selection:bg-xbox-green selection:text-white">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-[400px] w-full overflow-hidden rounded-3xl bg-xbox-dark border border-xbox-gray">
            <img
              src="https://picsum.photos/seed/rudymane/1200/600"
              alt="Featured"
              className="h-full w-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-12">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="text-xbox-green" size={24} />
                <span className="text-sm font-black uppercase tracking-[0.3em] text-xbox-green">Trending Now</span>
              </div>
              <h2 className="mb-4 text-6xl font-black uppercase italic tracking-tighter text-white md:text-8xl">
                RUDYMANE<br />UNBLOCKED
              </h2>
              <p className="mb-8 max-w-lg text-lg font-medium text-gray-300">
                Experience the ultimate unblocked gaming destination. Xbox-inspired, lightning fast, and always accessible.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedGame(games[0])}
                  className="rounded-full bg-xbox-green px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:scale-105 transition-transform"
                >
                  Play Now
                </button>
                <button className="rounded-full bg-xbox-gray px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories / Filters */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === cat
                    ? 'bg-xbox-green text-white shadow-[0_0_15px_rgba(16,124,16,0.4)]'
                    : 'bg-xbox-gray text-gray-400 hover:bg-xbox-gray/80 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-2 text-gray-500">
            <LayoutGrid size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Grid View</span>
          </div>
        </div>

        {/* Games Grid */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <Star className="text-xbox-green" size={20} />
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Top Picks</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGames.map((game) => (
              <XboxTile
                key={game.id}
                game={game}
                onClick={setSelectedGame}
              />
            ))}
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <Clock className="text-xbox-green" size={20} />
            <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Recently Added</h3>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
            {games.slice().reverse().map((game) => (
              <div key={`recent-${game.id}`} className="min-w-[280px]">
                <XboxTile
                  game={game}
                  onClick={setSelectedGame}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-xbox-gray bg-xbox-black py-12 px-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-2xl font-black italic tracking-tighter text-xbox-green">RUDYMANE</h2>
            <p className="text-sm text-gray-500">The premier destination for unblocked gaming.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-xbox-green transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-xbox-green transition-colors">Terms</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-xbox-green transition-colors">Contact</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-xbox-green transition-colors">Discord</a>
          </div>
          <div className="text-xs text-gray-500">
            © 2026 RUDYMANE. All rights reserved.
          </div>
        </div>
      </footer>

      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
}
