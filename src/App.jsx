import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { XboxTile } from './components/XboxTile';
import { GameModal } from './components/GameModal';
import gamesData from './games.json';
import { motion } from 'motion/react';
import { LayoutGrid, Flame, Clock, Star, Shield, Search, Settings } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState('Home');
  const [isTabCloakingEnabled, setIsTabCloakingEnabled] = useState(false);
  const [isPanicKeyEnabled, setIsPanicKeyEnabled] = useState(true);
  const [themeColor, setThemeColor] = useState('#107C10'); // Default Xbox Green

  useEffect(() => {
    if (isPanicKeyEnabled) {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          window.location.href = 'https://classroom.google.com';
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isPanicKeyEnabled]);

  useEffect(() => {
    document.documentElement.style.setProperty('--xbox-green', themeColor);
  }, [themeColor]);

  const handleGameSelect = (game) => {
    if (isTabCloakingEnabled) {
      const win = window.open('about:blank', '_blank');
      if (!win) {
        alert('Popup blocked! Please allow popups for this site.');
        return;
      }
      win.document.body.style.margin = '0';
      win.document.body.style.height = '100vh';
      const iframe = win.document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.margin = '0';
      iframe.src = game.url;
      win.document.body.appendChild(iframe);
      win.document.title = "Google Drive";
      const link = win.document.createElement('link');
      link.rel = 'icon';
      link.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
      win.document.head.appendChild(link);
    } else {
      setSelectedGame(game);
    }
  };

  const handleCloak = () => {
    const url = window.prompt('Enter the URL you want to cloak (include https://):', 'https://google.com');
    if (!url) return;
    
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocked! Please allow popups for this site.');
      return;
    }
    
    win.document.body.style.margin = '0';
    win.document.body.style.height = '100vh';
    const iframe = win.document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.margin = '0';
    iframe.src = url;
    win.document.body.appendChild(iframe);
    win.document.title = "Google Drive";
    
    const link = win.document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png';
    win.document.head.appendChild(link);
  };

  const handleProxy = () => {
    const url = window.prompt('Enter the URL to browse via proxy:', 'https://discord.com');
    if (!url) return;
    // Using a common unblocked proxy pattern
    window.open(`https://www.google.com/search?q=${encodeURIComponent(url)}`, '_blank');
    alert('Opening search for ' + url + '. For a real proxy, consider using Ultraviolet or similar services.');
  };

  const handleTabDisguiser = () => {
    const title = window.prompt('Enter new tab title:', 'Google Drive');
    if (title) document.title = title;
    
    const icon = window.prompt('Enter favicon URL (optional):', 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png');
    if (icon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = icon;
    }
    alert('Tab disguised successfully!');
  };

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const categories = ['All', ...new Set(gamesData.map(g => g.category))];
  const filteredGames = filter === 'All' ? games : games.filter(g => g.category === filter);

  const renderHome = () => (
    <>
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
                onClick={() => handleGameSelect(games[0])}
                className="rounded-full bg-xbox-green px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:scale-105 transition-transform"
              >
                Play Now
              </button>
              <button 
                onClick={() => setView('Games')}
                className="rounded-full bg-xbox-gray px-8 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
              >
                Browse All
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
              onClick={() => {
                setFilter(cat);
                setView('Games');
              }}
              className="whitespace-nowrap rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest bg-xbox-gray text-gray-400 hover:bg-xbox-gray/80 hover:text-white transition-all"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <section className="mb-16">
        <div className="mb-6 flex items-center gap-3">
          <Star className="text-xbox-green" size={20} />
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Top Picks</h3>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.slice(0, 4).map((game) => (
            <XboxTile
              key={game.id}
              game={game}
              onClick={handleGameSelect}
            />
          ))}
        </div>
      </section>
    </>
  );

  const renderGames = () => (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutGrid className="text-xbox-green" size={24} />
          <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">All Games</h3>
        </div>
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
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredGames.map((game) => (
          <XboxTile
            key={game.id}
            game={game}
            onClick={handleGameSelect}
          />
        ))}
      </div>
    </section>
  );

  const renderApps = () => (
    <section className="mb-16 py-12 text-center">
      <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-4">Apps & Tools</h2>
      <p className="text-gray-400 mb-12">Useful utilities for your unblocked experience.</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div 
          onClick={handleCloak}
          className="bg-xbox-dark p-8 rounded-2xl border border-xbox-gray hover:border-xbox-green transition-all group cursor-pointer"
        >
          <Shield className="text-xbox-green mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Cloak Tool</h3>
          <p className="text-sm text-gray-400">Open any URL in a stealthy about:blank tab.</p>
        </div>
        <div 
          onClick={handleProxy}
          className="bg-xbox-dark p-8 rounded-2xl border border-xbox-gray hover:border-xbox-green transition-all group cursor-pointer"
        >
          <Search className="text-xbox-green mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Proxy Browser</h3>
          <p className="text-sm text-gray-400">Browse the web freely without restrictions.</p>
        </div>
        <div 
          onClick={handleTabDisguiser}
          className="bg-xbox-dark p-8 rounded-2xl border border-xbox-gray hover:border-xbox-green transition-all group cursor-pointer"
        >
          <Settings className="text-xbox-green mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">Tab Disguiser</h3>
          <p className="text-sm text-gray-400">Instantly change tab icon and title.</p>
        </div>
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="mb-16 max-w-2xl mx-auto py-12">
      <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-8">Settings</h2>
      <div className="space-y-6">
        <div className="bg-xbox-dark p-6 rounded-xl border border-xbox-gray flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white">Tab Cloaking</h3>
            <p className="text-xs text-gray-400">Automatically cloak new game tabs.</p>
          </div>
          <div 
            onClick={() => setIsTabCloakingEnabled(!isTabCloakingEnabled)}
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isTabCloakingEnabled ? 'bg-xbox-green' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isTabCloakingEnabled ? 'right-1' : 'left-1'}`}></div>
          </div>
        </div>
        <div className="bg-xbox-dark p-6 rounded-xl border border-xbox-gray flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white">Panic Key</h3>
            <p className="text-xs text-gray-400">Press 'ESC' to instantly redirect to Google Classroom.</p>
          </div>
          <div 
            onClick={() => setIsPanicKeyEnabled(!isPanicKeyEnabled)}
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isPanicKeyEnabled ? 'bg-xbox-green' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isPanicKeyEnabled ? 'right-1' : 'left-1'}`}></div>
          </div>
        </div>
        <div className="bg-xbox-dark p-6 rounded-xl border border-xbox-gray">
          <h3 className="font-bold text-white mb-4">Custom Theme</h3>
          <div className="flex gap-4">
            {[
              { name: 'Xbox Green', color: '#107C10' },
              { name: 'PlayStation Blue', color: '#003791' },
              { name: 'Nintendo Red', color: '#E60012' },
              { name: 'Discord Purple', color: '#5865F2' },
              { name: 'Gold', color: '#FFD700' }
            ].map((t) => (
              <div 
                key={t.color}
                onClick={() => setThemeColor(t.color)}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${themeColor === t.color ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                style={{ backgroundColor: t.color }}
                title={t.name}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-xbox-black selection:bg-xbox-green selection:text-white">
      <Navbar onViewChange={setView} currentView={view} />

      <main className="container mx-auto px-6 py-8">
        {view === 'Home' && renderHome()}
        {view === 'Games' && renderGames()}
        {view === 'Apps' && renderApps()}
        {view === 'Settings' && renderSettings()}

        {/* Recent Activity Section (Only on Home/Games) */}
        {(view === 'Home' || view === 'Games') && (
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
                    onClick={handleGameSelect}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
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
