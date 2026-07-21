'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Target, CheckCircle2, Heart, Users, RefreshCw } from 'lucide-react';

interface JTBDSectionProps {
  report: TeardownReport;
}

export default function JTBDSection({ report }: JTBDSectionProps) {
  const { jtbd } = report;
  if (!jtbd || jtbd.length === 0) return null;

  return (
    <section id="jtbd" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
          02
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Jobs to Be Done (JTBD) Framework</h2>
      </div>

      <div className="space-y-4">
        {jtbd.map((item, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Core Job Statement */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-150 inline-block">
                Core Job Statement
              </span>
              <h3 className="text-base sm:text-lg font-bold text-zinc-950 leading-snug">
                &ldquo;{item.job}&rdquo;
              </h3>
            </div>

            {/* Functional, Emotional, Social Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* Functional Jobs */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                  <CheckCircle2 size={14} className="text-indigo-600" />
                  <span>Functional Requirements</span>
                </div>
                <ul className="space-y-1.5 text-zinc-600">
                  {item.functional?.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Emotional Jobs */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                  <Heart size={14} className="text-rose-500" />
                  <span>Emotional Needs</span>
                </div>
                <ul className="space-y-1.5 text-zinc-600">
                  {item.emotional?.map((e, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Jobs */}
              <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-150 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                  <Users size={14} className="text-emerald-600" />
                  <span>Social Perceptions</span>
                </div>
                <ul className="space-y-1.5 text-zinc-600">
                  {item.social?.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Alternatives */}
            {item.alternatives && item.alternatives.length > 0 && (
              <div className="pt-3 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-500">
                <RefreshCw size={13} className="text-zinc-400 shrink-0" />
                <span className="font-semibold text-zinc-700">Existing Alternatives:</span>
                <span className="text-zinc-600">{item.alternatives.join(', ')}</span>
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
