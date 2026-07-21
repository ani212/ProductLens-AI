'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Link2, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface EvidenceSourcesProps {
  report: TeardownReport;
}

export default function EvidenceSources({ report }: EvidenceSourcesProps) {
  const { sources } = report;
  if (!sources || sources.length === 0) return null;

  return (
    <section id="sources" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
          14
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Evidence & Grounding Source Citations</h2>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-1">
          <p className="text-xs text-zinc-600 font-medium">
            Every insight in this report is linked to extracted web sources, official documentation, pricing pages, and customer reviews.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 bg-zinc-50/50 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3.5 rounded-tl-2xl">Source Channel</th>
                <th className="p-3.5">Classification</th>
                <th className="p-3.5">Evidence Snippet</th>
                <th className="p-3.5 text-center">Confidence</th>
                <th className="p-3.5 text-right rounded-tr-2xl">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
              {sources.map((src, idx) => {
                let badgeClass = 'bg-zinc-100 text-zinc-700';
                if (src.classification === 'Verified Fact') badgeClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                else if (src.classification === 'User Finding') badgeClass = 'bg-purple-50 text-purple-700 border border-purple-200';
                else if (src.classification === 'AI Observation') badgeClass = 'bg-blue-50 text-blue-700 border border-blue-200';
                else badgeClass = 'bg-amber-50 text-amber-700 border border-amber-200';

                return (
                  <tr key={idx} className="hover:bg-zinc-50/50 transition">
                    <td className="p-3.5 font-bold text-zinc-900 max-w-xs truncate">
                      {src.title}
                      <span className="text-[10px] text-zinc-400 font-normal block">
                        Checked {new Date(src.retrievedAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badgeClass}`}>
                        {src.classification}
                      </span>
                    </td>

                    <td className="p-3.5 text-zinc-600 font-normal italic max-w-md truncate">
                      &ldquo;{src.snippet}&rdquo;
                    </td>

                    <td className="p-3.5 text-center font-bold">
                      <span className={src.confidence === 'High' ? 'text-emerald-600' : 'text-amber-600'}>
                        {src.confidence}
                      </span>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap">
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-indigo-600 font-semibold transition text-[11px] shadow-sm"
                        >
                          <span>Verify Link</span>
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-zinc-400 text-[10px]">Doc Context</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
