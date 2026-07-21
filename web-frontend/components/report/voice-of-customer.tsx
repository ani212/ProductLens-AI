'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { MessageSquare, ThumbsUp, ThumbsDown, HelpCircle, Repeat } from 'lucide-react';

interface VoiceOfCustomerProps {
  report: TeardownReport;
}

export default function VoiceOfCustomer({ report }: VoiceOfCustomerProps) {
  const { voc, products } = report;
  if (!voc || voc.length === 0) return null;

  return (
    <section id="voc" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-xs">
          09
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Voice of Customer (VoC) Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => {
          const item = voc.find(v => v.productId === p.id) || voc[0];
          if (!item) return null;

          return (
            <div key={p.id} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-zinc-100">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                    {p.logoText}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-950">{p.name} Feedback</h3>
                </div>

                {/* Praised Features */}
                {item.praised && item.praised.length > 0 && (
                  <div className="space-y-1.5 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                      <ThumbsUp size={11} /> Most Praised Capabilities
                    </span>
                    <ul className="space-y-1 text-zinc-700 font-medium">
                      {item.praised.map((pr, i) => (
                        <li key={i} className="flex items-start gap-1.5 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{pr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Common Frustrations */}
                {item.frustrated && item.frustrated.length > 0 && (
                  <div className="space-y-1.5 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                      <ThumbsDown size={11} /> Primary Frustrations
                    </span>
                    <ul className="space-y-1 text-zinc-700 font-medium">
                      {item.frustrated.map((fr, i) => (
                        <li key={i} className="flex items-start gap-1.5 bg-rose-50/50 p-2 rounded-xl border border-rose-100">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{fr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Switching Reasons */}
              {item.switchingReasons && (
                <div className="pt-3 border-t border-zinc-100 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                    <Repeat size={11} /> Primary Switching Trigger
                  </span>
                  <p className="text-zinc-600 text-[11px] font-normal leading-relaxed italic">
                    &ldquo;{item.switchingReasons}&rdquo;
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </section>
  );
}
