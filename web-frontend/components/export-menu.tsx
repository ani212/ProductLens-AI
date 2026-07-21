'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { exportToMarkdown, exportToCSV, triggerDownload } from '@/lib/export';
import { Download, FileText, Table, Printer, ChevronDown } from 'lucide-react';

interface ExportMenuProps {
  report: TeardownReport;
}

export default function ExportMenu({ report }: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownloadMarkdown = () => {
    const md = exportToMarkdown(report);
    const filename = `teardown-${report.products.map(p => p.id).join('-')}.md`;
    triggerDownload(md, filename, 'text/markdown');
    setOpen(false);
  };

  const handleDownloadCSV = () => {
    const csv = exportToCSV(report);
    const filename = `feature-matrix-${report.products.map(p => p.id).join('-')}.csv`;
    triggerDownload(csv, filename, 'text/csv');
    setOpen(false);
  };

  const handlePrintPDF = () => {
    window.print();
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold shadow-sm transition"
      >
        <Download size={14} className="text-indigo-600" />
        <span>Export</span>
        <ChevronDown size={12} className="text-zinc-400" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 py-1.5 text-xs animate-in fade-in slide-in-from-top-1">
          <button
            onClick={handleDownloadMarkdown}
            className="w-full px-3 py-2 text-left hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 font-medium"
          >
            <FileText size={14} className="text-indigo-600" />
            Markdown Document (.md)
          </button>
          <button
            onClick={handleDownloadCSV}
            className="w-full px-3 py-2 text-left hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 font-medium"
          >
            <Table size={14} className="text-emerald-600" />
            Feature Matrix CSV (.csv)
          </button>
          <div className="my-1 border-t border-zinc-100" />
          <button
            onClick={handlePrintPDF}
            className="w-full px-3 py-2 text-left hover:bg-zinc-50 flex items-center gap-2 text-zinc-700 font-medium"
          >
            <Printer size={14} className="text-zinc-500" />
            Print / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}
