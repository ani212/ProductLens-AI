'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { MessageCircle, ThumbsUp, ThumbsDown, Quote } from 'lucide-react';

interface VoiceOfCustomerProps {
  productResearch: Record<string, ProductResearch>;
}

export default function VoiceOfCustomer({ productResearch }: VoiceOfCustomerProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  return (
    <section id="voice-of-customer" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Voice of the Customer</h2>
        <p className="text-sm text-zinc-500">Synthesized from user feedback, reviews, and community discussions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map(product => {
          const voc = productResearch[product.id].voc;
          if (!voc) return null;

          return (
            <div key={product.id} className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-zinc-200 pb-2">
                <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                  {product.logoText}
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{product.name}</h3>
              </div>

              {/* Praise & Frustrations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <ThumbsUp size={14} /> Most Praised
                  </h4>
                  <ul className="space-y-2">
                    {voc.mostPraised.slice(0, 4).map((praise, idx) => (
                      <li key={idx} className="text-sm text-zinc-700 flex items-start gap-2">
                        <span className="text-emerald-500 mt-1 shrink-0">•</span>
                        <span className="leading-snug">{praise}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                    <ThumbsDown size={14} /> Frustrations
                  </h4>
                  <ul className="space-y-2">
                    {voc.biggestFrustrations.slice(0, 4).map((frust, idx) => (
                      <li key={idx} className="text-sm text-zinc-700 flex items-start gap-2">
                        <span className="text-rose-500 mt-1 shrink-0">•</span>
                        <span className="leading-snug">{frust}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quotes */}
              {voc.customerQuotes && voc.customerQuotes.length > 0 && (
                <div className="pt-4 border-t border-zinc-100">
                  <div className="bg-zinc-50 rounded-xl p-4 relative border border-zinc-200/60">
                    <Quote size={24} className="text-zinc-200 absolute top-3 left-3" />
                    <p className="text-sm italic text-zinc-700 relative z-10 pl-6 pr-2 leading-relaxed">
                      "{voc.customerQuotes[0].quote}"
                    </p>
                    <p className="text-right text-[10px] font-semibold text-zinc-400 mt-2 uppercase tracking-wider">
                      — via {voc.customerQuotes[0].source}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
