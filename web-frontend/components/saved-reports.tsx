'use client';

import React, { useState, useEffect } from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Bookmark, ArrowRight, Trash2, Calendar, Users, Target } from 'lucide-react';

interface SavedReportsProps {
  onSelectReport: (report: TeardownReport) => void;
  onClose: () => void;
}

export default function SavedReports({ onSelectReport, onClose }: SavedReportsProps) {
  const [reports, setReports] = useState<TeardownReport[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('productlens_saved_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setReports(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = reports.filter((_, i) => i !== index);
    setReports(updated);
    localStorage.setItem('productlens_saved_reports', JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-950 flex items-center gap-2">
            <Bookmark className="text-indigo-600" size={24} />
            Saved Reports Library
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Reopen or compare saved competitive product teardowns stored in your local library.</p>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold rounded-xl transition shadow-sm"
        >
          Back to Search
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center space-y-3">
          <Bookmark className="mx-auto text-zinc-300" size={36} />
          <h3 className="text-sm font-bold text-zinc-800">No saved reports yet</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            When you view a generated teardown report, click the &quot;Save&quot; bookmark button to persist it here for future reference.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, idx) => {
            const productNames = report.products.map(p => p.name).join(' vs ');

            return (
              <div
                key={idx}
                onClick={() => onSelectReport(report)}
                className="bg-white border border-zinc-200 hover:border-indigo-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {report.products.map(p => (
                        <div key={p.id} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                          {p.logoText}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => handleDelete(idx, e)}
                      className="text-zinc-400 hover:text-rose-500 p-1 transition"
                      title="Delete report"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-950 group-hover:text-indigo-600 transition">
                    {productNames}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {report.executiveSummary?.topOpportunity || report.objective || 'Competitive Teardown'}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(report.timestamp).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Open Report
                    <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
