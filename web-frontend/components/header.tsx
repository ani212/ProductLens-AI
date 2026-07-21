'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Search, Bookmark, Menu, X, GitBranch } from 'lucide-react';

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand logo & DiscoveryOS badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className="flex items-center gap-2 font-black text-lg sm:text-xl tracking-tight text-zinc-950 hover:opacity-90 transition min-h-[44px]"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <Layers size={18} />
            </div>
            <span className="truncate">ProductLens<span className="text-indigo-600">.AI</span></span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-150">
            <Sparkles size={10} />
            DiscoveryOS Module
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-zinc-600">
          <Link href="/" className="hover:text-indigo-600 flex items-center gap-1.5 transition min-h-[44px] px-2">
            <Search size={14} />
            New Teardown
          </Link>
          <Link href="/archive" className="hover:text-indigo-600 flex items-center gap-1.5 transition min-h-[44px] px-2">
            <Bookmark size={14} />
            Saved Reports
          </Link>
          <a
            href="https://github.com/ani212"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition shadow-sm min-h-[44px]"
          >
            <GithubIcon size={14} />
            <span>@ani212</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition aria-expanded:bg-zinc-200"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Accessible Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-zinc-950/60 backdrop-blur-xs z-50 md:hidden flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Navigation Menu</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-indigo-50 text-indigo-700">
                <Sparkles size={9} /> DiscoveryOS
              </span>
            </div>

            <nav className="flex flex-col space-y-1 font-semibold text-sm">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition text-zinc-800 min-h-[48px]"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Search size={16} />
                </div>
                <span>New Teardown</span>
              </Link>

              <Link
                href="/archive"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition text-zinc-800 min-h-[48px]"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Bookmark size={16} />
                </div>
                <span>Saved Reports Library</span>
              </Link>

              <a
                href="https://github.com/ani212"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-950 text-white hover:bg-zinc-800 transition min-h-[48px] shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-zinc-800 text-white flex items-center justify-center shrink-0">
                  <GithubIcon size={16} />
                </div>
                <span>GitHub Profile (@ani212)</span>
              </a>
            </nav>
          </div>

          <div className="text-center text-[11px] text-white/70 font-medium py-2">
            Tap outside or press ESC to close
          </div>
        </div>
      )}
    </header>
  );
}
