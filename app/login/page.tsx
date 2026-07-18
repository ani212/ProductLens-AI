'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Mail, Phone, Lock, Eye, EyeOff, Bot, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, register, error, loading, sheetsConnected } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    // If user is already authenticated, redirect to workspace entryway
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedId = identifier.trim();
    if (!trimmedId || !password) {
      setValidationError('Please fill in all fields.');
      return;
    }

    if (loginMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedId)) {
        setValidationError('Please enter a valid email address.');
        return;
      }
    } else {
      // Basic phone check (allow digits, plus, spaces, parentheses)
      const phoneRegex = /^[+]?[0-9\s-()]{7,15}$/;
      if (!phoneRegex.test(trimmedId)) {
        setValidationError('Please enter a valid phone number.');
        return;
      }
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    let success = false;
    if (isRegister) {
      success = await register(trimmedId, password);
    } else {
      success = await login(trimmedId, password);
    }

    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      {/* Decorative dots */}
      <div className="absolute top-12 left-12 w-2.5 h-2.5 rounded-full border border-purple-500/20 flex items-center justify-center">
        <span className="w-1 h-1 bg-purple-500/30"></span>
      </div>
      
      <div className="max-w-md w-full space-y-6 z-10">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 group cursor-pointer mb-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center text-white shadow-sm">
              <Bot size={16} />
            </div>
            <span className="font-semibold text-base tracking-tight text-zinc-900">
              ProductLens<span className="text-purple-650 font-light">AI</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            {isRegister ? 'Create your PM account' : 'Access the intelligence suite'}
          </h2>
          <p className="text-[11px] text-zinc-400 font-light">
            Authenticate to track competitive teardown histories & star favorites.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-light glass-light-glow p-6 sm:p-8 rounded-2xl border border-zinc-200/60 bg-white/80">
          
          {/* Method tabs */}
          <div className="grid grid-cols-2 gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200/30 mb-6">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('email');
                setIdentifier('');
                setValidationError(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition ${
                loginMethod === 'email'
                  ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/40'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Mail size={12} />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('phone');
                setIdentifier('');
                setValidationError(null);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition ${
                loginMethod === 'phone'
                  ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/40'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Phone size={12} />
              <span>Phone</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input field identifier */}
            <div className="space-y-1.5">
              <label htmlFor="identifier" className="text-[9px] font-bold uppercase tracking-wider text-zinc-450 block">
                {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative">
                <input
                  id="identifier"
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  required
                  placeholder={loginMethod === 'email' ? 'pm@company.com' : '+1 (555) 000-0000'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-950 placeholder-zinc-400 text-xs focus:outline-none focus:border-zinc-950 transition shadow-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  {loginMethod === 'email' ? <Mail size={13} /> : <Phone size={13} />}
                </div>
              </div>
            </div>

            {/* Input password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[9px] font-bold uppercase tracking-wider text-zinc-450 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-zinc-200 rounded-xl text-zinc-950 placeholder-zinc-400 text-xs focus:outline-none focus:border-zinc-950 transition shadow-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Lock size={13} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            {/* Validation & Auth errors */}
            {(validationError || error) && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-[10px] text-rose-700 leading-normal font-medium">
                {validationError || error}
              </div>
            )}

            {/* CTA action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-850 disabled:bg-zinc-300 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition shadow-sm active:scale-98"
            >
              {loading ? 'Processing...' : isRegister ? 'Register Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle register */}
          <div className="mt-5 text-center text-[10px] text-zinc-450">
            <span>{isRegister ? 'Already have an account? ' : 'First time using the platform? '}</span>
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setValidationError(null);
                setIdentifier('');
                setPassword('');
              }}
              className="text-purple-650 font-bold hover:underline"
            >
              {isRegister ? 'Sign In' : 'Create an Account'}
            </button>
          </div>
        </div>

        {/* Database indicator */}
        <div className="flex justify-center items-center gap-1.5 text-[9px] text-zinc-450 font-light">
          <ShieldCheck size={12} className={sheetsConnected ? 'text-emerald-600' : 'text-zinc-400'} />
          <span>
            Database Sync: {sheetsConnected ? 'Active (Connected to Google Sheets)' : 'Sandbox Mode (Offline Caching)'}
          </span>
        </div>
      </div>
    </div>
  );
}
