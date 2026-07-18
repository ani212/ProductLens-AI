'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Library, PlusCircle } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-light border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center text-white shadow-sm transition group-hover:scale-102">
            <Bot size={15} />
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-900 group-hover:text-purple-600 transition">
            ProductLens<span className="text-purple-600 font-light">AI</span>
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              pathname === '/'
                ? 'bg-zinc-100 text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            <PlusCircle size={13} />
            <span>New Analysis</span>
          </Link>
          <Link
            href="/archive"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              pathname === '/archive'
                ? 'bg-zinc-100 text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            <Library size={13} />
            <span>Library Archive</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
