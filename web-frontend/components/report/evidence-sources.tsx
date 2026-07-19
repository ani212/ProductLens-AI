'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { Link2, Search, Calendar } from 'lucide-react';

interface EvidenceSourcesProps {
  productResearch: Record<string, ProductResearch>;
}

export default function EvidenceSources({ productResearch }: EvidenceSourcesProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  return (
    <section id="evidence-sources" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Evidence Sources</h2>
        <p className="text-sm text-zinc-500">Live data sources and documentation URLs cited in this report.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => {
          const statuses = productResearch[product.id].evidenceBundle.sourceStatuses;
          if (!statuses) return null;

          return (
            <div key={product.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[9px] ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                  {product.logoText}
                </div>
                <h3 className="font-bold text-zinc-900">{product.name}</h3>
              </div>

              <div className="space-y-3">
                {statuses.map((s, idx) => (
                  <div key={idx} className="flex flex-col gap-1 text-sm border-b border-zinc-100 pb-2 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zinc-700">{s.name}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        s.status === 'success' ? 'bg-emerald-100 text-emerald-700' :
                        s.status === 'partial' ? 'bg-amber-100 text-amber-700' :
                        'bg-zinc-100 text-zinc-500'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-500 hover:underline flex items-center gap-1 truncate">
                        <Link2 size={10} /> {s.url.replace('https://', '')}
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Search size={10} /> {s.itemsCollected} items analyzed
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
