'use client';

import React from 'react';
import { PipelineProgress } from '@/lib/types';
import { Loader2, CheckCircle2, CircleDashed, Terminal, Sparkles, AlertCircle } from 'lucide-react';

interface ResearchLoaderProps {
  products: string;
  progressUpdates: Record<string, PipelineProgress>;
  globalStage: string;
  error?: string;
}

export default function ResearchLoader({ products, progressUpdates, globalStage, error }: ResearchLoaderProps) {
  const productList = products.split(',').map(p => p.trim()).filter(Boolean);
  const activeProducts = Object.values(progressUpdates).filter(p => p.productId !== 'all');

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 min-h-[80vh] w-full max-w-4xl mx-auto">
      <div className="w-full space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-tight border border-indigo-150 shadow-sm">
            {error ? <AlertCircle size={14} className="text-rose-500 shrink-0" /> : <Sparkles size={14} className="animate-pulse text-indigo-600 shrink-0" />}
            <span className={error ? "text-rose-600" : ""}>{error ? 'Pipeline Error' : 'Research Pipeline Active'}</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-zinc-950 break-words">
            {globalStage || 'Initializing analysis...'}
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {error
              ? 'An error occurred while running the competitive intelligence pipeline.'
              : 'Gathering official documentation, pricing tiers, customer reviews (G2/Capterra), and community feedback (Reddit).'}
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {/* Product Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {productList.map(productName => {
            const progress = activeProducts.find(p => p.productName.toLowerCase() === productName.toLowerCase());

            return (
              <div key={productName} className="bg-white border border-zinc-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
                
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-zinc-950 truncate pr-2 text-sm">{productName}</h3>
                  <div className="shrink-0 text-xs font-bold text-indigo-600">
                    {progress?.progress || 0}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500 ease-in-out"
                    style={{ width: `${progress?.progress || 0}%` }}
                  />
                </div>

                {/* Status Text */}
                <p className="text-xs font-medium text-zinc-500 truncate flex items-center gap-1.5">
                  {progress?.stage === 'Complete' ? (
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  ) : progress ? (
                    <Loader2 size={13} className="animate-spin text-indigo-500 shrink-0" />
                  ) : (
                    <CircleDashed size={13} className="text-zinc-300 shrink-0" />
                  )}
                  <span className="truncate">{progress?.stage || 'Waiting to start...'}</span>
                </p>

                {/* Source Statuses */}
                {progress?.sourceStatuses && progress.sourceStatuses.length > 0 && (
                  <div className="pt-3 border-t border-zinc-100 space-y-1.5">
                    {progress.sourceStatuses.map((source, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <span className="text-zinc-600 flex items-center gap-1.5 font-medium truncate pr-2">
                          {source.status === 'success' ? (
                            <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />
                          ) : source.status === 'unavailable' ? (
                            <CircleDashed size={11} className="text-rose-400 shrink-0" />
                          ) : source.status === 'pending' ? (
                            <Loader2 size={11} className="animate-spin text-zinc-400 shrink-0" />
                          ) : (
                            <CircleDashed size={11} className="text-amber-500 shrink-0" />
                          )}
                          <span className="truncate">{source.name}</span>
                        </span>
                        <span className="text-zinc-400 font-medium shrink-0">
                          {source.status === 'success' && source.itemsCollected > 0 ? (
                            `${source.itemsCollected} items`
                          ) : source.status === 'unavailable' ? (
                            'Done'
                          ) : (
                            '...'
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Terminal Console */}
        <div className="bg-zinc-950 text-zinc-400 font-mono text-xs rounded-2xl p-4 shadow-inner min-h-[100px] max-h-[160px] overflow-y-auto space-y-2 border border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2 pb-2 border-b border-zinc-800 text-[11px]">
            <Terminal size={12} className="shrink-0" />
            <span>Research Execution Console</span>
          </div>
          {activeProducts.map((p, i) => (
             <div key={`log-${i}`} className="animate-in fade-in slide-in-from-bottom-1 text-[11px] leading-relaxed break-words">
               <span className="text-indigo-400">[{new Date().toLocaleTimeString()}]</span> {p.productName}: {p.stage}...
             </div>
          ))}
          {globalStage === 'Generating Analysis' && (
            <div className="animate-in fade-in slide-in-from-bottom-1 text-emerald-400 text-[11px] leading-relaxed">
               [{new Date().toLocaleTimeString()}] Analysis Engine: Synthesizing evidence into 15 PM frameworks...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
