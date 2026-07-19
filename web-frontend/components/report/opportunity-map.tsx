'use client';

import React from 'react';
import { CrossProductAnalysis } from '@/lib/types';
import { Compass } from 'lucide-react';

interface OpportunityMapProps {
  crossAnalysis: CrossProductAnalysis;
}

export default function OpportunityMap({ crossAnalysis }: OpportunityMapProps) {
  if (!crossAnalysis.opportunityMap || crossAnalysis.opportunityMap.length === 0) return null;

  const getQuadrantColor = (quadrant: string) => {
    if (quadrant.includes('Quick')) return 'bg-emerald-100 text-emerald-800';
    if (quadrant.includes('Strategic')) return 'bg-indigo-100 text-indigo-800';
    if (quadrant.includes('Table')) return 'bg-amber-100 text-amber-800';
    return 'bg-zinc-100 text-zinc-800';
  };

  return (
    <section id="opportunity-map" className="scroll-mt-32 space-y-6 print:break-inside-avoid">
      <div className="flex items-center gap-2">
        <Compass size={24} className="text-indigo-600" />
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Opportunity Map</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {crossAnalysis.opportunityMap.map((opp, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-zinc-900 leading-snug">{opp.title}</h3>
              <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${getQuadrantColor(opp.quadrant)}`}>
                {opp.quadrant}
              </div>
            </div>
            
            <p className="text-sm text-zinc-600 leading-relaxed">
              {opp.description}
            </p>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-1 text-emerald-600">
                Impact: {opp.impact}/10
              </div>
              <div className="flex items-center gap-1 text-rose-600">
                Effort: {opp.effort}/10
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
