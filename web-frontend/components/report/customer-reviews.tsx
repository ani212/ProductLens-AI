'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { Star, MessageSquare } from 'lucide-react';

interface CustomerReviewsProps {
  productResearch: Record<string, ProductResearch>;
}

export default function CustomerReviews({ productResearch }: CustomerReviewsProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  return (
    <section id="customer-reviews" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Customer Reviews</h2>
        <p className="text-sm text-zinc-500">Quantitative analysis of public feedback and sentiment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map(product => {
          const reviews = productResearch[product.id].reviews;
          if (!reviews || !reviews.themes) return null;

          return (
            <div key={product.id} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                    {product.logoText}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 leading-none">{product.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                      <span>{reviews.totalAnalyzed} reviews</span>
                      <span>•</span>
                      <span>{reviews.sources.join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    <span className="text-xl font-extrabold text-zinc-900">{reviews.overallSentiment.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <MessageSquare size={12} /> Key Themes
                </h4>
                <div className="space-y-2">
                  {reviews.themes.map((theme, idx) => {
                    const maxCount = Math.max(...reviews.themes.map(t => t.count));
                    const percentage = Math.round((theme.count / maxCount) * 100);
                    
                    let barColor = 'bg-zinc-200';
                    if (theme.sentiment === 'positive') barColor = 'bg-emerald-400';
                    if (theme.sentiment === 'negative') barColor = 'bg-rose-400';

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-zinc-700">{theme.theme}</span>
                          <span className="text-zinc-400">{theme.count} mentions</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
