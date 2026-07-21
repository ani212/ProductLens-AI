'use client';

import React, { useState } from 'react';
import { AnalysisMode } from '@/lib/types';
import { Search, Sparkles, ArrowRight, Layers, Target, Compass, Zap, HelpCircle, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: (config: {
    productsInput: string;
    persona: string;
    objective: string;
    mode: AnalysisMode;
  }) => void;
  onViewSample: () => void;
}

const MODES: { mode: AnalysisMode; label: string; desc: string; icon: any }[] = [
  { mode: 'Compare Products', label: 'Compare Products', desc: 'Side-by-side gap & opportunity matrix across 2-5 products', icon: Layers },
  { mode: 'Deep Teardown', label: 'Deep Teardown', desc: 'Comprehensive analysis of positioning, journeys, pricing & VoC', icon: Zap },
  { mode: 'Quick Scan', label: 'Quick Scan', desc: 'Fast executive summary & core feature breakdown', icon: Search },
  { mode: 'Interview Mode', label: 'Interview Mode', desc: 'Product sense questions, improvement hypotheses & strategic trade-offs', icon: HelpCircle },
  { mode: 'Market Mode', label: 'Market Mode', desc: 'Market positioning, customer segments & underserved gaps', icon: Target },
];

const PRESETS = [
  { name: 'Notion, ClickUp, Asana', persona: 'Startup Product Teams', obj: 'Compare team work coordination and doc workspaces' },
  { name: 'Spotify, Apple Music, YouTube Music', persona: 'Product Managers', obj: 'Music streaming retention & audio recommendations comparison' },
  { name: 'Linear, Jira', persona: 'Software Engineering PMs', obj: 'Agile issue tracking and sprint execution comparison' },
];

export default function LandingPage({ onStartAnalysis, onViewSample }: LandingPageProps) {
  const [productsInput, setProductsInput] = useState('');
  const [persona, setPersona] = useState('Product Managers');
  const [objective, setObjective] = useState('');
  const [selectedMode, setSelectedMode] = useState<AnalysisMode>('Compare Products');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productsInput.trim()) return;
    onStartAnalysis({
      productsInput,
      persona,
      objective,
      mode: selectedMode
    });
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setProductsInput(preset.name);
    setPersona(preset.persona);
    setObjective(preset.obj);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-xs font-semibold tracking-tight shadow-sm">
          <Sparkles size={13} className="text-indigo-600" />
          <span>DiscoveryOS Competitive Intelligence</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-zinc-950 tracking-tight leading-[1.1]">
          Name any product.<br /> Get the complete teardown.
        </h1>
        
        <p className="text-zinc-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Compare products, uncover customer pain points, and identify what to build next—with every insight linked to cited evidence.
        </p>
      </div>

      {/* Main Analysis Generator Form */}
      <div className="w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Input field for product names */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              Product Names or URLs <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={productsInput}
                onChange={(e) => setProductsInput(e.target.value)}
                placeholder="e.g. Notion, ClickUp, Asana"
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm font-medium placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              <div className="absolute right-3 top-3 text-xs font-mono text-zinc-400">
                1-5 Products
              </div>
            </div>
          </div>

          {/* Persona & Objective row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Target Persona
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="Product Managers">Product Managers</option>
                <option value="Startup Product Teams">Startup Product Teams</option>
                <option value="Software Engineering PMs">Software Engineering PMs</option>
                <option value="Enterprise PMs">Enterprise PMs</option>
                <option value="Founders & Executives">Founders & Executives</option>
                <option value="Product Designers & UX">Product Designers & UX</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Teardown Goal / Objective <span className="text-zinc-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="e.g. Onboarding friction comparison"
                className="w-full px-3.5 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-medium placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Analysis Mode Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              Select Analysis Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MODES.map((m) => {
                const Icon = m.icon;
                const active = selectedMode === m.mode;
                return (
                  <button
                    type="button"
                    key={m.mode}
                    onClick={() => setSelectedMode(m.mode)}
                    className={`p-3 rounded-2xl border text-left transition flex items-start gap-3 ${
                      active
                        ? 'bg-indigo-50/70 border-indigo-500 text-indigo-950 shadow-sm'
                        : 'bg-zinc-50/50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${active ? 'bg-indigo-600 text-white' : 'bg-zinc-200 text-zinc-600'}`}>
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className="text-[10px] text-zinc-500 leading-tight mt-0.5">{m.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Generate Teardown Report</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={onViewSample}
              className="py-4 px-6 rounded-2xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <span>View Sample</span>
            </button>
          </div>

        </form>
      </div>

      {/* Preset Quick Starters */}
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Or try a preset comparison:</span>
        <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 hover:border-indigo-300 text-zinc-700 text-xs font-medium shadow-sm transition hover:text-indigo-600"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Framework Pillars Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full pt-8 border-t border-zinc-200">
        <div className="space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">01</div>
          <h3 className="text-sm font-bold text-zinc-900">Multi-Source Grounded Evidence</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Extracts feature lists, pricing tiers, G2 reviews, App Store ratings, and Reddit discussions cited with live verification links.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">02</div>
          <h3 className="text-sm font-bold text-zinc-900">Structured PM Frameworks</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Populates Jobs-to-be-Done (JTBD), user segment profiles, UX heuristic evaluations, pain point clusters, and positioning clarity scores.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">03</div>
          <h3 className="text-sm font-bold text-zinc-900">Opportunity & Roadmap Recommendations</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Plots an interactive 2x2 opportunity map (Quick Wins, Strategic Bets) and generates concrete PM roadmap recommendations.
          </p>
        </div>
      </div>

    </div>
  );
}
