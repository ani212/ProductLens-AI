'use client';

import React, { useState } from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Shield, Award, AlertTriangle, Sparkles, AlertCircle } from 'lucide-react';

interface SWOTAnalysisProps {
  report: TeardownReport;
}

export default function SWOTAnalysis({ report }: SWOTAnalysisProps) {
  const { swot, products } = report;
  const [selectedProduct, setSelectedProduct] = useState<string>(products[0]?.id || '');

  if (!swot || Object.keys(swot).length === 0) return null;

  const currentSwot = swot[selectedProduct] || swot[products[0]?.id] || { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];

  return (
    <section id="swot" className="scroll-mt-32 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
            11
          </div>
          <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">SWOT Analysis Matrix</h2>
        </div>

        {/* Product Switcher Tabs */}
        {products.length > 1 && (
          <div className="flex bg-zinc-100 p-1 rounded-2xl gap-1 shrink-0 self-start sm:self-auto">
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedProduct === p.id
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                  {p.logoText}
                </div>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quad SWOT grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths */}
        <div className="bg-white border border-emerald-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 pb-3 border-b border-emerald-100 font-bold text-sm">
            <Award size={18} />
            <span>Strengths (Internal Advantages)</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-700 font-medium">
            {currentSwot.strengths?.map((s, i) => (
              <li key={i} className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white border border-rose-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-700 pb-3 border-b border-rose-100 font-bold text-sm">
            <AlertTriangle size={18} />
            <span>Weaknesses (Internal Limitations)</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-700 font-medium">
            {currentSwot.weaknesses?.map((w, i) => (
              <li key={i} className="flex items-start gap-2 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
                <span className="text-rose-500 font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="bg-white border border-indigo-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 pb-3 border-b border-indigo-100 font-bold text-sm">
            <Sparkles size={18} />
            <span>Opportunities (Market Unmet Needs)</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-700 font-medium">
            {currentSwot.opportunities?.map((o, i) => (
              <li key={i} className="flex items-start gap-2 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="bg-white border border-amber-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-700 pb-3 border-b border-amber-100 font-bold text-sm">
            <AlertCircle size={18} />
            <span>Threats (External Competitor Risks)</span>
          </div>
          <ul className="space-y-2 text-xs text-zinc-700 font-medium">
            {currentSwot.threats?.map((t, i) => (
              <li key={i} className="flex items-start gap-2 bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
                <span className="text-amber-500 font-bold">•</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
