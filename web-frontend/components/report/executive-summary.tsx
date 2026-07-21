'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Sparkles, Award, AlertTriangle, Target } from 'lucide-react';

interface ExecutiveSummaryProps {
  report: TeardownReport;
}

export default function ExecutiveSummary({ report }: ExecutiveSummaryProps) {
  const { executiveSummary, products } = report;
  if (!executiveSummary) return null;

  return (
    <section id="exec-summary" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
          01
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Executive Summary</h2>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Overview text */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Strategic Comparison Overview</h3>
          <p className="text-sm text-zinc-700 leading-relaxed font-medium">
            {executiveSummary.overview}
          </p>
        </div>

        {/* Target Audience & Competitive Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 text-xs">
          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-1.5">
            <span className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] block">Target Audience Fit</span>
            <p className="text-zinc-600 leading-relaxed">{executiveSummary.targetAudience}</p>
          </div>

          <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-1.5">
            <span className="font-bold text-zinc-800 uppercase tracking-wider text-[10px] block">Competitive Landscape Position</span>
            <p className="text-zinc-600 leading-relaxed">{executiveSummary.competitivePosition}</p>
          </div>
        </div>

        {/* Per-product Advantages & Weaknesses */}
        <div className="space-y-3 pt-4 border-t border-zinc-100">
          <h3 className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Product Advantages & Key Limitations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-zinc-50/50 p-4 rounded-2xl border border-zinc-200 space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                    {p.logoText}
                  </div>
                  <h4 className="text-xs font-bold text-zinc-950">{p.name}</h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-emerald-700 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-150">
                    <Award size={14} className="shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] uppercase">Strongest Advantage</span>
                      <span className="font-normal">{executiveSummary.strongestAdvantage?.[p.id] || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-rose-700 bg-rose-50/70 p-2.5 rounded-xl border border-rose-150">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-[10px] uppercase">Biggest Weakness</span>
                      <span className="font-normal">{executiveSummary.biggestWeakness?.[p.id] || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Opportunity */}
        {executiveSummary.topOpportunity && (
          <div className="bg-indigo-600 text-white p-5 rounded-2xl space-y-1.5 shadow-md">
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Top Strategic PM Opportunity</span>
            </div>
            <p className="text-sm font-semibold leading-relaxed">
              {executiveSummary.topOpportunity}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
