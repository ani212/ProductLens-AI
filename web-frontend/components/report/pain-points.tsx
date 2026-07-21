'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { AlertCircle, ShieldAlert, Sparkles, MessageSquare, Compass, ArrowRight } from 'lucide-react';

interface PainPointsProps {
  report: TeardownReport;
}

export default function PainPoints({ report }: PainPointsProps) {
  const { painPoints, products } = report;
  if (!painPoints || painPoints.length === 0) return null;

  return (
    <section id="pain-points" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
          10
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Structured Customer Pain Point Clusters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {painPoints.map((point, idx) => {
          const product = products.find(p => p.id === point.productId) || products[0];

          return (
            <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col justify-between hover:border-zinc-300 transition">
              
              <div className="space-y-4">
                
                {/* Header badges */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${product?.logoBg || 'bg-zinc-900 text-white'}`}>
                      {product?.logoText || 'P'}
                    </div>
                    <span className="text-xs font-bold text-zinc-800 truncate">{product?.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-bold">
                    <span className={`px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      point.severity === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      point.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-zinc-100 text-zinc-600'
                    }`}>
                      {point.severity} Severity
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                      {point.frequency}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-zinc-950 leading-snug">
                  {point.title}
                </h3>

                {/* Metadata details */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-zinc-50 p-3 rounded-2xl border border-zinc-150 text-zinc-600">
                  <div>
                    <span className="font-bold text-zinc-800 block text-[9px] uppercase tracking-wider">Affected Segment</span>
                    <span className="font-medium">{point.affectedUsers}</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-800 block text-[9px] uppercase tracking-wider">Journey Stage</span>
                    <span className="font-medium">{point.stage}</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-800 block text-[9px] uppercase tracking-wider">Evidence Count</span>
                    <span className="font-semibold text-indigo-600">{point.evidenceCount} mentions</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-800 block text-[9px] uppercase tracking-wider">Confidence Level</span>
                    <span className="font-semibold text-emerald-600">{point.confidence}%</span>
                  </div>
                </div>

                {/* Competitor Comparison */}
                {point.competitorComparison && (
                  <div className="text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Competitor Difference</span>
                    <p className="text-zinc-700 font-medium leading-relaxed bg-amber-50/40 p-3 rounded-2xl border border-amber-100">
                      {point.competitorComparison}
                    </p>
                  </div>
                )}

                {/* Proposed Solution */}
                {point.solution && (
                  <div className="text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                      <Sparkles size={11} /> Proposed Solution
                    </span>
                    <p className="text-indigo-950 font-semibold leading-relaxed bg-indigo-50/60 p-3 rounded-2xl border border-indigo-150">
                      {point.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Direct user quote */}
              {point.quote && (
                <div className="pt-3 border-t border-zinc-100 text-xs italic text-zinc-500">
                  &ldquo;{point.quote}&rdquo;
                </div>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
}
