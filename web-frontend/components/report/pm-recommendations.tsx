'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Target, BarChart2 } from 'lucide-react';

interface PMRecommendationsProps {
  report: TeardownReport;
}

export default function PMRecommendations({ report }: PMRecommendationsProps) {
  const { recommendations } = report;
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <section id="recommendations" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
          13
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Actionable Product Recommendations</h2>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 hover:border-indigo-200 transition">
            
            {/* Recommendation Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-indigo-500/20">
                  {idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-zinc-950">{rec.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                  Confidence: {rec.confidence}%
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                  Effort: {rec.effort}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                  Risk: {rec.risk}
                </span>
              </div>
            </div>

            {/* Problem, Solution, Outcome Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Problem */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">User Problem & Target Segment</span>
                <p className="text-zinc-700 font-medium leading-relaxed">{rec.problem}</p>
                <div className="pt-1 text-zinc-500 font-medium">
                  Segment: <span className="text-zinc-900 font-bold">{rec.targetSegment}</span>
                </div>
              </div>

              {/* Proposed Solution */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">Proposed Solution</span>
                <div className="bg-indigo-50/60 p-3 rounded-2xl border border-indigo-150 text-indigo-950 font-semibold leading-relaxed">
                  {rec.proposedSolution}
                </div>
              </div>

              {/* Outcome & Metrics */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">Expected Outcome & Success Metric</span>
                <p className="text-zinc-700 font-medium leading-relaxed">{rec.expectedOutcome}</p>
                {rec.successMetric && (
                  <div className="pt-1 text-emerald-700 font-bold flex items-center gap-1.5">
                    <BarChart2 size={13} />
                    <span>Metric: {rec.successMetric}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Supporting evidence quote */}
            {rec.evidence && (
              <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-500 font-normal italic">
                <strong className="text-zinc-700 not-italic font-bold">Supporting Evidence:</strong> &ldquo;{rec.evidence}&rdquo;
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
