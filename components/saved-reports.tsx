'use client';

import React, { useEffect, useState } from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { FileText, Trash2, Calendar, User, ArrowRight } from 'lucide-react';

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
        setReports(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = [...reports];
      updated.splice(index, 1);
      setReports(updated);
      localStorage.setItem('productlens_saved_reports', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header segment */}
      <div className="flex justify-between items-center border-b border-zinc-200/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
            <FileText size={18} className="text-purple-650" />
            Competitive Intelligence Archive
          </h2>
          <p className="text-xs text-zinc-450 font-light mt-0.5">
            Retrieve or organize previously generated analysis reports.
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition shadow-sm"
        >
          Back to setup
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="glass-light p-12 rounded-2xl border border-zinc-200/60 shadow-sm text-center space-y-3 bg-white/60">
          <FileText size={32} className="text-zinc-300 mx-auto" />
          <h3 className="text-sm font-semibold text-zinc-800">No Saved Reports</h3>
          <p className="text-xs text-zinc-450 max-w-xs mx-auto font-light leading-relaxed">
            Generate competitive teardowns and click &ldquo;Save&rdquo; on the report dashboard to populate this archive.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, idx) => (
            <div
              key={idx}
              onClick={() => onSelectReport(report)}
              className="glass-light p-5 rounded-2xl border border-zinc-250/60 bg-white/70 hover:border-zinc-450 transition cursor-pointer flex flex-col justify-between h-[155px] group shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-purple-655 transition truncate pr-4">
                    {report.products.map(p => p.name).join(' vs ')}
                  </h3>
                  <button
                    onClick={(e) => handleDelete(idx, e)}
                    className="p-1 rounded bg-zinc-50 hover:bg-rose-50 text-zinc-400 hover:text-rose-600 border border-zinc-200/50 hover:border-rose-100 transition shadow-sm"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <p className="text-[11px] text-zinc-500 font-light line-clamp-2 mt-2 leading-relaxed">
                  {report.executiveSummary.overview}
                </p>
              </div>

              {/* Bottom detail meta */}
              <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-3 border-t border-zinc-100 font-light">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-zinc-400" />
                    {report.timestamp}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={11} className="text-zinc-400" />
                    {report.persona.split(' ')[0]}
                  </span>
                </div>
                <span className="flex items-center gap-0.5 text-purple-650 group-hover:translate-x-0.5 transition font-semibold">
                  Open Scan
                  <ArrowRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
