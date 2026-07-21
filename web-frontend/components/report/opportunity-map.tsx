'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Target, Zap, Shield, Sparkles, AlertTriangle } from 'lucide-react';

interface OpportunityMapProps {
  report: TeardownReport;
}

export default function OpportunityMap({ report }: OpportunityMapProps) {
  const { opportunityMap } = report;
  if (!opportunityMap || opportunityMap.length === 0) return null;

  return (
    <section id="opportunity-map" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
          12
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">PM Opportunity Map Matrix (Impact vs Effort)</h2>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Interactive 2x2 Quadrant Grid */}
        <div className="relative aspect-square sm:aspect-[16/9] w-full bg-zinc-50 rounded-3xl border border-zinc-250 p-6 overflow-hidden">
          
          {/* Axis Labels */}
          <div className="absolute left-3 top-1/2 -rotate-90 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            ← Impact Value (High)
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Effort Complexity (High) →
          </div>

          {/* 4 Quadrants */}
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-3 relative">
            
            {/* Q1: Quick Wins (Top-Left: High Impact, Low Effort) */}
            <div className="bg-emerald-500/[0.04] p-3 rounded-2xl border border-emerald-200/60 flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md w-max">
                Quick Wins (High Impact, Low Effort)
              </span>
            </div>

            {/* Q2: Strategic Bets (Top-Right: High Impact, High Effort) */}
            <div className="bg-indigo-500/[0.04] p-3 rounded-2xl border border-indigo-200/60 flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md w-max">
                Strategic Bets (High Impact, High Effort)
              </span>
            </div>

            {/* Q3: Table Stakes (Bottom-Left: Low Impact, Low Effort) */}
            <div className="bg-zinc-500/[0.04] p-3 rounded-2xl border border-zinc-200/60 flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-700 bg-zinc-200 px-2 py-0.5 rounded-md w-max">
                Table Stakes (Low Impact, Low Effort)
              </span>
            </div>

            {/* Q4: Avoid for Now (Bottom-Right: Low Impact, High Effort) */}
            <div className="bg-rose-500/[0.04] p-3 rounded-2xl border border-rose-200/60 flex flex-col justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md w-max">
                Avoid for Now (Low Impact, High Effort)
              </span>
            </div>

            {/* Plotted Dot Nodes */}
            {opportunityMap.map(opp => {
              const left = `${Math.min(92, Math.max(8, (opp.effort / 10) * 100))}%`;
              const bottom = `${Math.min(92, Math.max(8, (opp.impact / 10) * 100))}%`;

              let dotColor = 'bg-zinc-500';
              if (opp.type === 'Quick Win') dotColor = 'bg-emerald-500 shadow-emerald-500/30';
              else if (opp.type === 'Strategic Bet') dotColor = 'bg-indigo-600 shadow-indigo-500/30';
              else if (opp.type === 'Avoid for Now') dotColor = 'bg-rose-500';

              return (
                <div
                  key={opp.id}
                  className="absolute w-4 h-4 -ml-2 -mb-2 rounded-full border-2 border-white cursor-pointer shadow-md flex items-center justify-center group/node z-20"
                  style={{ left, bottom }}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColor} group-hover/node:scale-125 transition`} />
                  
                  {/* Tooltip Card */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 p-3 bg-zinc-950 text-white rounded-2xl hidden group-hover/node:block z-30 shadow-2xl border border-zinc-800 text-xs">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider block mb-0.5">{opp.type}</span>
                    <strong className="block font-bold leading-tight mb-1">{opp.title}</strong>
                    <p className="text-[10px] text-zinc-400 font-normal leading-relaxed">{opp.evidence}</p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
