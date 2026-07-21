'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Compass, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';

interface UserJourneyProps {
  report: TeardownReport;
}

export default function UserJourney({ report }: UserJourneyProps) {
  const { userJourney, products } = report;
  if (!userJourney || userJourney.length === 0) return null;

  return (
    <section id="journey" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xs">
          06
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">User Journey & Onboarding Friction</h2>
      </div>

      <div className="space-y-4">
        {userJourney.map((stage, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Stage header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-cyan-50 text-cyan-700 font-bold text-xs flex items-center justify-center border border-cyan-150">
                  {idx + 1}
                </span>
                <h3 className="text-base font-bold text-zinc-950">{stage.stage}</h3>
              </div>
              <span className="text-xs text-zinc-500 font-medium">Goal: <strong className="text-zinc-800">{stage.userGoal}</strong></span>
            </div>

            {/* Per-product actions & friction */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {products.map(p => (
                <div key={p.id} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                      {p.logoText}
                    </div>
                    <span className="font-bold text-zinc-900">{p.name} Action</span>
                  </div>

                  <p className="text-zinc-700 font-medium leading-relaxed">
                    {stage.actions?.[p.id] || 'Standard workflow step'}
                  </p>

                  {stage.friction?.[p.id] && (
                    <div className="flex items-start gap-1.5 text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-150 font-normal">
                      <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                      <span><strong>Friction:</strong> {stage.friction[p.id]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stage Improvement Opportunities */}
            {stage.opportunities && stage.opportunities.length > 0 && (
              <div className="pt-2 flex items-center gap-2 text-xs text-indigo-700 bg-indigo-50/70 p-3 rounded-2xl border border-indigo-150 font-semibold">
                <Sparkles size={14} className="shrink-0 text-indigo-600" />
                <span>Opportunity: {stage.opportunities.join(', ')}</span>
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
