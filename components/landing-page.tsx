'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Layers, CheckCircle2, Zap } from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: (config: {
    productsInput: string;
    persona: string;
    objective: string;
    depth: 'quick' | 'deep';
  }) => void;
  onViewSample: () => void;
}

export default function LandingPage({ onStartAnalysis, onViewSample }: LandingPageProps) {
  const [productsInput, setProductsInput] = useState('');
  const [persona, setPersona] = useState('Startup Product Teams');
  const [objective, setObjective] = useState('');
  const [depth, setDepth] = useState<'quick' | 'deep'>('deep');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productsInput.trim()) return;
    onStartAnalysis({ productsInput, persona, objective, depth });
  };

  const handlePresetClick = (preset: string) => {
    setProductsInput(preset);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Decorative Blueprint Accent Dots */}
      <div className="absolute top-12 left-12 w-2.5 h-2.5 rounded-full border border-purple-500/30 flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-purple-500/50"></span>
      </div>
      <div className="absolute bottom-12 right-12 w-2.5 h-2.5 rounded-full border border-cyan-500/30 flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-cyan-500/50"></span>
      </div>

      <div className="max-w-4xl w-full text-center space-y-10 z-10">
        
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-semibold tracking-tight shadow-sm">
          <Sparkles size={12} className="text-purple-600" />
          <span>Product Intelligence System v2.0</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 leading-tight">
            Name any product.<br />
            <span className="bg-gradient-to-r from-purple-650 via-indigo-650 to-cyan-650 bg-clip-text text-transparent">
              Get the complete teardown.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
            Compare competitors, uncover customer frustrations, and identify strategic feature gaps. ProductLens resolves names, queries live search channels, and verifies claims with direct source citations.
          </p>
        </div>

        {/* Glass Form Container */}
        <div className="max-w-2xl mx-auto glass-light glass-light-glow p-6 sm:p-8 rounded-2xl text-left border border-slate-200/60">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input field */}
            <div className="space-y-2">
              <label htmlFor="products" className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Search size={13} className="text-purple-600" />
                Products to Analyze
              </label>
              <input
                id="products"
                type="text"
                required
                placeholder="Notion, ClickUp, Asana"
                value={productsInput}
                onChange={(e) => setProductsInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-zinc-200/80 rounded-xl text-zinc-950 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 transition-all shadow-sm"
              />
              <p className="text-[10px] text-zinc-400">
                Enter 1 to 3 products separated by commas (e.g., Spotify, Apple Music).
              </p>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Presets:</span>
              <button
                type="button"
                onClick={() => handlePresetClick('Notion, ClickUp, Asana')}
                className="px-2.5 py-1 text-xs rounded-lg bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-200/60 shadow-sm transition"
              >
                Notion vs ClickUp vs Asana
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('Spotify, Apple Music, YouTube Music')}
                className="px-2.5 py-1 text-xs rounded-lg bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-200/60 shadow-sm transition"
              >
                Spotify vs Apple Music
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('Jira, Linear')}
                className="px-2.5 py-1 text-xs rounded-lg bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-200/60 shadow-sm transition"
              >
                Jira vs Linear
              </button>
            </div>

            {/* Grid fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Persona */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Target Persona</label>
                <select
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-zinc-950 text-xs focus:outline-none focus:border-zinc-950 transition shadow-sm"
                >
                  <option value="Startup Product Teams">Startup Product Teams</option>
                  <option value="Enterprise PMs & Execs">Enterprise PMs & Execs</option>
                  <option value="Designers & UX Researchers">Designers & UX Researchers</option>
                  <option value="Marketing & Positioning Leads">Marketing & Positioning Leads</option>
                  <option value="Product Portfolio Candidates">PM Interview Candidates</option>
                </select>
              </div>

              {/* Depth */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Analysis Depth</label>
                <div className="grid grid-cols-2 gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200/40">
                  <button
                    type="button"
                    onClick={() => setDepth('quick')}
                    className={`py-1.5 text-xs rounded-lg font-semibold transition ${
                      depth === 'quick'
                        ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/40'
                        : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    Quick Scan
                  </button>
                  <button
                    type="button"
                    onClick={() => setDepth('deep')}
                    className={`py-1.5 text-xs rounded-lg font-semibold transition ${
                      depth === 'deep'
                        ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/40'
                        : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    Deep Teardown
                  </button>
                </div>
              </div>
            </div>

            {/* Objective */}
            <div className="space-y-2">
              <label htmlFor="objective" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Optional Analysis Goal / Focus Area
              </label>
              <input
                id="objective"
                type="text"
                placeholder="e.g., Compare onboarding and pricing barriers for startups"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-zinc-200/80 rounded-xl text-zinc-950 placeholder-zinc-400 text-xs focus:outline-none focus:border-zinc-950 transition shadow-sm"
              />
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-98"
              >
                <Zap size={14} />
                <span>Generate Teardown Report</span>
              </button>
              <button
                type="button"
                onClick={onViewSample}
                className="px-6 py-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition text-xs font-semibold uppercase tracking-wider shadow-sm"
              >
                View Sample Teardown
              </button>
            </div>
          </form>
        </div>

        {/* Feature grid highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left max-w-3xl mx-auto border-t border-zinc-200/40">
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 rounded-lg bg-purple-50 border border-purple-100 text-purple-600">
              <Layers size={14} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Shared Taxonomy</h4>
            <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
              Synthesizes naming conventions (e.g., normalizes &ldquo;Smart Tasks&rdquo; vs. &ldquo;AI teammate&rdquo;) into an objective feature grid.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
              <CheckCircle2 size={14} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Grounded Logic</h4>
            <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
              Every PM claim is graded explicitly as Fact, User Review finding, AI Observation, or Hypothesis with backing URLs.
            </p>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center justify-center p-2 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600">
              <Zap size={14} />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">Roadmap Opportunities</h4>
            <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
              Plots feature recommendations onto an interactive quadrant map (Effort vs. Impact) with estimated metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
