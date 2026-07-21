'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Compass, CheckCircle2, Megaphone, ShieldCheck } from 'lucide-react';

interface PositioningSectionProps {
  report: TeardownReport;
}

export default function PositioningSection({ report }: PositioningSectionProps) {
  const { positioning, products } = report;
  if (!positioning || Object.keys(positioning).length === 0) return null;

  return (
    <section id="positioning" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
          04
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Positioning & Messaging Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => {
          const pos = positioning[p.id];
          if (!pos) return null;

          return (
            <div key={p.id} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                      {p.logoText}
                    </div>
                    <h3 className="text-sm font-bold text-zinc-950">{p.name}</h3>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Clarity: {pos.messagingClarity}/10
                  </span>
                </div>

                {/* Headline */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Homepage Headline</span>
                  <p className="text-xs font-bold text-zinc-900 italic bg-zinc-50 p-3 rounded-2xl border border-zinc-150">
                    &ldquo;{pos.headline}&rdquo;
                  </p>
                </div>

                {/* Core Value Promise */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Core Value Promise</span>
                  <p className="text-zinc-700 font-medium">{pos.corePromise}</p>
                </div>

                {/* Claimed Differentiators */}
                {pos.differentiators && pos.differentiators.length > 0 && (
                  <div className="space-y-1.5 pt-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Claimed Differentiators</span>
                    <ul className="space-y-1 text-zinc-600">
                      {pos.differentiators.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 size={12} className="text-amber-500 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Social proof & CTA */}
              <div className="pt-3 border-t border-zinc-100 space-y-2 text-[11px]">
                {pos.socialProof && (
                  <div className="flex items-center gap-1.5 text-zinc-500 font-medium">
                    <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                    <span>{pos.socialProof}</span>
                  </div>
                )}
                {pos.primaryCTA && (
                  <div className="text-zinc-400 font-semibold">
                    CTA: <span className="text-zinc-800 font-bold">{pos.primaryCTA}</span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
