'use client';

import React, { useState } from 'react';
import { V2Report } from '@/lib/types';
import { exportToMarkdown, exportToCSV, triggerDownload } from '@/lib/export';
import { Share2, Printer, ChevronDown, FileText, FileSpreadsheet, Download } from 'lucide-react';

interface ExportMenuProps {
  report: V2Report;
}

export default function ExportMenu({ report }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const productNames = report.products.map(p => p.name).join('-vs-').toLowerCase().replace(/\s+/g, '');
  const timestamp = new Date().toISOString().split('T')[0];
  const baseFilename = `productlens-${productNames}-${timestamp}`;

  const handleExportMarkdown = () => {
    const md = exportToMarkdown(report);
    triggerDownload(md, `${baseFilename}.md`, 'text/markdown');
    setIsOpen(false);
  };

  const handleExportCSV = () => {
    const csv = exportToCSV(report);
    triggerDownload(csv, `${baseFilename}-features.csv`, 'text/csv');
    setIsOpen(false);
  };

  const handlePrint = () => {
    window.print();
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition shadow-sm"
      >
        <Download size={14} /> Export Report
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white border border-zinc-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="py-1">
              <button
                onClick={handleExportMarkdown}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 flex items-center gap-2 transition"
              >
                <FileText size={14} className="text-zinc-400" />
                Export as Markdown
              </button>
              <button
                onClick={handleExportCSV}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 flex items-center gap-2 transition"
              >
                <FileSpreadsheet size={14} className="text-zinc-400" />
                Export Feature Matrix (CSV)
              </button>
              <div className="border-t border-zinc-100 my-1" />
              <button
                onClick={handlePrint}
                className="w-full text-left px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 flex items-center gap-2 transition"
              >
                <Printer size={14} className="text-zinc-400" />
                Save as PDF / Print
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
