'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Bot, Library, PlusCircle, LogIn, LogOut, User } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass-light border-b border-slate-100 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center text-white shadow-sm transition group-hover:scale-102">
            <Bot size={15} />
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-900 group-hover:text-purple-650 transition">
            ProductLens<span className="text-purple-650 font-light">AI</span>
          </span>
        </Link>

        {/* Navigation links & User deck */}
        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-zinc-150 pr-4">
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
          </div>

          {/* User profile deck */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-zinc-600">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 shadow-sm shrink-0">
                    <User size={12} />
                  </div>
                  <span className="text-[10px] font-semibold max-w-[120px] truncate hidden sm:inline" title={user.identifier}>
                    {user.identifier}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-rose-650 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition"
                  title="Sign Out"
                >
                  <LogOut size={12} />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 shadow-sm transition"
              >
                <LogIn size={12} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
