import React from 'react';
import { Search, User, Bell, Settings, LayoutGrid } from 'lucide-react';

export const Navbar = ({ onViewChange, currentView }) => {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-xbox-black/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <h1 
          className="text-2xl font-black italic tracking-tighter text-xbox-green cursor-pointer"
          onClick={() => onViewChange('Home')}
        >
          RUDYMANE
        </h1>
        <div className="hidden items-center gap-6 md:flex">
          <button 
            onClick={() => onViewChange('Home')}
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'Home' ? 'text-white border-b-2 border-xbox-green pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onViewChange('Games')}
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'Games' ? 'text-white border-b-2 border-xbox-green pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Games
          </button>
          <button 
            onClick={() => onViewChange('Apps')}
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'Apps' ? 'text-white border-b-2 border-xbox-green pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Apps
          </button>
          <button 
            onClick={() => onViewChange('Settings')}
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${currentView === 'Settings' ? 'text-white border-b-2 border-xbox-green pb-1' : 'text-gray-400 hover:text-white'}`}
          >
            Settings
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search games..."
            className="rounded-full bg-xbox-gray py-2 pl-10 pr-4 text-xs font-medium text-white outline-none ring-xbox-green focus:ring-2 transition-all w-48 lg:w-64"
          />
        </div>
        <button className="rounded-full bg-xbox-gray p-2 text-gray-400 hover:bg-xbox-green hover:text-white transition-all">
          <Bell size={18} />
        </button>
      </div>
    </nav>
  );
};
