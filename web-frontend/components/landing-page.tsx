'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Zap } from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: (config: {
    productsInput: string;
    persona: string;
    objective: string;
    industry: string;
  }) => void;
  onViewSample: () => void;
}

const PRESETS = [
  'Notion vs ClickUp vs Asana',
  'Spotify vs Apple Music',
  'Jira vs Linear'
];

export default function LandingPage({ onStartAnalysis, onViewSample }: LandingPageProps) {
  const [productsInput, setProductsInput] = useState('');
  const [persona, setPersona] = useState('Startup Product Teams');
  const [depth, setDepth] = useState<'Quick Scan' | 'Deep Teardown'>('Deep Teardown');
  const [objective, setObjective] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productsInput.trim()) return;
    
    onStartAnalysis({
      productsInput: productsInput.trim(),
      persona,
      industry: 'Software', // Default for this UI
      objective
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl w-full text-center space-y-8 z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-semibold tracking-wide uppercase">
          <Sparkles size={12} />
          <span>Product Intelligence System v2.0</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Name any product.
          </h1>
          <p className="max-w-2xl mx-auto text-[15px] sm:text-base text-zinc-500 font-medium leading-relaxed">
            Compare competitors, uncover customer frustrations, and identify strategic feature gaps. ProductLens resolves names, queries live search channels, and verifies claims with direct source citations.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl text-left border border-zinc-200 shadow-xl shadow-zinc-200/50 mt-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Products Input */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Search size={12} className="text-indigo-600" />
                Products to Analyze
              </label>
              
              <input
                type="text"
                value={productsInput}
                onChange={e => setProductsInput(e.target.value)}
                placeholder="Notion, ClickUp, Asana"
                className="w-full bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
              <p className="text-[11px] text-zinc-400 font-medium px-1">
                Enter 1 to 3 products separated by commas (e.g., Spotify, Apple Music).
              </p>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-1">Presets:</span>
              {PRESETS.map(preset => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setProductsInput(preset)}
                  className="px-3 py-1.5 bg-white border border-zinc-200 text-zinc-500 rounded-md text-[11px] font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Persona & Depth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Target Persona
                </label>
                <div className="relative">
                  <select 
                    value={persona} 
                    onChange={e => setPersona(e.target.value)} 
                    className="w-full appearance-none bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
                  >
                    <option value="Startup Product Teams">Startup Product Teams</option>
                    <option value="Enterprise IT Buyers">Enterprise IT Buyers</option>
                    <option value="Marketing Agencies">Marketing Agencies</option>
                    <option value="Freelance Designers">Freelance Designers</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Analysis Depth
                </label>
                <div className="flex bg-zinc-100 p-1 rounded-lg border border-zinc-200/50">
                  <button
                    type="button"
                    onClick={() => setDepth('Quick Scan')}
                    className={`flex-1 text-[12px] font-semibold py-1.5 rounded-md transition-all ${depth === 'Quick Scan' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Quick Scan
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepth('Deep Teardown')}
                    className={`flex-1 text-[12px] font-semibold py-1.5 rounded-md transition-all ${depth === 'Deep Teardown' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                  >
                    Deep Teardown
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Goal */}
            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Optional Analysis Goal / Focus Area
              </label>
              <input
                type="text"
                value={objective}
                onChange={e => setObjective(e.target.value)}
                placeholder="e.g., Compare onboarding and pricing barriers for startups"
                className="w-full bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>

            {/* Submit Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                type="submit"
                disabled={!productsInput.trim()}
                className="flex items-center justify-center gap-2 w-full bg-zinc-950 text-white rounded-lg px-4 py-3.5 text-sm font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 shadow-sm"
              >
                <Zap size={14} className="text-white" />
                GENERATE TEARDOWN REPORT
              </button>
              
              <button
                type="button"
                onClick={onViewSample}
                className="flex items-center justify-center w-full bg-white border border-zinc-200 text-zinc-600 rounded-lg px-4 py-3.5 text-sm font-bold hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm"
              >
                VIEW SAMPLE TEARDOWN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
