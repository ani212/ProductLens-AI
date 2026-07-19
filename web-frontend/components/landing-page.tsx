'use client';

import React, { useState } from 'react';
import { Search, Sparkles, X, Filter, Target, Briefcase, Plus, Play } from 'lucide-react';

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
  { label: 'Notion vs ClickUp', tags: ['Notion', 'ClickUp'] },
  { label: 'Figma vs Penpot', tags: ['Figma', 'Penpot'] },
  { label: 'Stripe vs Paddle', tags: ['Stripe', 'Paddle'] },
  { label: 'Vercel vs Netlify', tags: ['Vercel', 'Netlify'] }
];

export default function LandingPage({ onStartAnalysis, onViewSample }: LandingPageProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  // Advanced Config
  const [showConfig, setShowConfig] = useState(false);
  const [persona, setPersona] = useState('Product Managers');
  const [industry, setIndustry] = useState('B2B SaaS');
  const [objective, setObjective] = useState('Feature comparison and sentiment analysis');

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 6) {
      setTags([...tags, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tags.length === 0 && !inputValue.trim()) return;
    
    // Auto-add pending input
    const finalTags = [...tags];
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      finalTags.push(inputValue.trim());
    }

    onStartAnalysis({
      productsInput: finalTags.join(', '),
      persona,
      industry,
      objective
    });
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl w-full text-center space-y-8 z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-tight">
          <Sparkles size={12} />
          <span>ProductLens Intelligence Pipeline v2.0</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Evidence-backed <br className="hidden sm:block" />
            <span className="text-indigo-600">Competitive Intelligence</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
            Enter up to 6 products. We'll crawl their documentation, pricing, Reddit discussions, and reviews to generate a comprehensive, source-backed report.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl text-left border border-zinc-200 shadow-xl shadow-zinc-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Tag Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Search size={13} className="text-indigo-600" />
                Products to Analyze
              </label>
              
              <div className="flex flex-wrap items-center gap-2 p-2 min-h-[52px] bg-white border border-zinc-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                {tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-zinc-100 text-zinc-900 rounded-lg text-sm font-medium">
                    {tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)} className="text-zinc-400 hover:text-zinc-700">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleAddTag}
                  disabled={tags.length >= 6}
                  placeholder={tags.length === 0 ? "e.g. Linear, Jira, Asana..." : tags.length >= 6 ? "Max 6 products" : "Add another..."}
                  className="flex-1 bg-transparent border-none outline-none min-w-[120px] text-sm text-zinc-900 placeholder:text-zinc-400 px-2 py-1"
                />
              </div>
            </div>

            {/* Config Toggle */}
            <button
              type="button"
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-800 transition"
            >
              <Filter size={13} />
              {showConfig ? 'Hide Research Parameters' : 'Adjust Research Parameters'}
            </button>

            {/* Advanced Config */}
            {showConfig && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100 animate-in slide-in-from-top-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                    <Briefcase size={10} /> Industry
                  </label>
                  <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                    <Target size={10} /> Target Persona
                  </label>
                  <input type="text" value={persona} onChange={e => setPersona(e.target.value)} className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                    <Search size={10} /> Research Objective
                  </label>
                  <input type="text" value={objective} onChange={e => setObjective(e.target.value)} className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs" />
                </div>
              </div>
            )}

            {/* Presets & Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-zinc-400">Presets:</span>
                {PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => { setTags(preset.tags); setInputValue(''); }}
                    className="px-2.5 py-1 text-[11px] rounded-md bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-200 transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={tags.length === 0 && !inputValue.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={14} className="fill-current" />
                Run Analysis
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
