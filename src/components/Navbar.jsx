import React from 'react';
import { Search, User, Bell, Settings, LayoutGrid } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-xbox-black/80 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-black italic tracking-tighter text-xbox-green">
          RUDYMANE
        </h1>
        <div className="hidden items-center gap-6 md:flex">
          <button className="text-sm font-bold uppercase tracking-widest text-white border-b-2 border-xbox-green pb-1">Home</button>
          <button className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Games</button>
          <button className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Apps</button>
          <button className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Settings</button>
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
        <div className="flex items-center gap-2 rounded-full bg-xbox-gray px-3 py-1.5 hover:bg-xbox-green transition-all cursor-pointer group">
          <div className="h-6 w-6 rounded-full bg-xbox-green flex items-center justify-center text-[10px] font-bold text-white">
            R
          </div>
          <span className="text-xs font-bold text-white">RUDY</span>
        </div>
      </div>
    </nav>
  );
};
