'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Search, Bookmark, Github } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand logo & DiscoveryOS badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 font-black text-xl tracking-tight text-zinc-950 hover:opacity-90 transition">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Layers size={18} />
            </div>
            <span>ProductLens<span className="text-indigo-600">.AI</span></span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-150">
            <Sparkles size={10} />
            DiscoveryOS Module
          </span>
        </div>

        {/* Navigation links & GitHub profile credit */}
        <nav className="flex items-center gap-4 text-xs font-semibold text-zinc-600">
          <Link href="/" className="hover:text-indigo-600 flex items-center gap-1.5 transition">
            <Search size={14} />
            New Teardown
          </Link>
          <Link href="/archive" className="hover:text-indigo-600 flex items-center gap-1.5 transition">
            <Bookmark size={14} />
            Saved Reports
          </Link>
          <a
            href="https://github.com/ani212"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition shadow-sm"
          >
            <Github size={14} />
            <span>@ani212</span>
          </a>
        </nav>

      </div>
    </header>
  );
}
