'use client';

import React from 'react';
import { CrossProductAnalysis, ProductInfo } from '@/lib/types';
import { Target, Lightbulb, AlertTriangle } from 'lucide-react';

interface ExecutiveSummaryProps {
  crossAnalysis: CrossProductAnalysis;
  objective: string;
}

export default function ExecutiveSummary({ crossAnalysis, objective }: ExecutiveSummaryProps) {
  return (
    <section id="executive-summary" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Executive Summary</h2>
        {objective && (
          <p className="text-sm font-medium text-indigo-600">
            Objective: {objective}
          </p>
        )}
      </div>

      <div className="prose prose-sm sm:prose-base prose-zinc max-w-none">
        <p className="text-zinc-700 leading-relaxed font-medium">
          {crossAnalysis.executiveSummary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Shared Strengths */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-5 space-y-3">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Target size={14} className="text-emerald-600" />
            Market Strengths
          </h3>
          <ul className="space-y-2">
            {crossAnalysis.sharedStrengths.slice(0, 3).map((s, i) => (
              <li key={i} className="text-sm text-emerald-900 flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                <span className="leading-snug">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shared Weaknesses/Complaints */}
        <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-5 space-y-3">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
            <AlertTriangle size={14} className="text-rose-600" />
            Common Complaints
          </h3>
          <ul className="space-y-2">
            {crossAnalysis.sharedComplaints.slice(0, 3).map((c, i) => (
              <li key={i} className="text-sm text-rose-900 flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span className="leading-snug">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strategic Opportunities */}
        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 space-y-3">
          <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-800">
            <Lightbulb size={14} className="text-indigo-600" />
            Key Opportunities
          </h3>
          <ul className="space-y-2">
            {crossAnalysis.sharedOpportunities.slice(0, 3).map((o, i) => (
              <li key={i} className="text-sm text-indigo-900 flex items-start gap-2">
                <span className="text-indigo-500 font-bold">•</span>
                <span className="leading-snug">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
