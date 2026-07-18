'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { FileText, Trash2, Calendar, User, ArrowRight, Star, History } from 'lucide-react';

interface SavedReportsProps {
  onSelectReport: (report: any) => void;
  onClose: () => void;
}

interface LogEntry {
  products: string;
  persona: string;
  objective: string;
  timestamp: string;
}

export default function SavedReports({ onSelectReport, onClose }: SavedReportsProps) {
  const { user, sheetsConnected } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>('history');
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [favorites, setFavorites] = useState<LogEntry[]>([]);
  const [loadingArchive, setLoadingArchive] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoadingArchive(true);
      if (sheetsConnected) {
        try {
          const res = await fetch(`/api/sync?userId=${user.userId}`);
          const data = await res.json();
          if (data.history) setHistory(data.history);
          if (data.favorites) setFavorites(data.favorites);
        } catch (e) {
          console.error('Failed to fetch from Sheets:', e);
        }
      } else {
        // Fallback local storage
        try {
          const savedReports = localStorage.getItem('productlens_saved_reports') || '[]';
          const reportsList = JSON.parse(savedReports);
          
          const hist = reportsList.map((r: any) => ({
            products: r.products.map((p: any) => p.name).join(', '),
            persona: r.persona,
            objective: r.objective,
            timestamp: r.timestamp
          }));
          setHistory(hist);

          const favs = localStorage.getItem('productlens_favorites') || '[]';
          setFavorites(JSON.parse(favs));
        } catch (err) {
          console.error('Failed to load local archive:', err);
        }
      }
      setLoadingArchive(false);
    };

    loadData();
  }, [user, sheetsConnected]);

  const handleDeleteHistory = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    const entry = history[index];
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);

    if (!sheetsConnected) {
      // Local storage delete
      try {
        const savedReports = localStorage.getItem('productlens_saved_reports') || '[]';
        const reportsList = JSON.parse(savedReports);
        // Find index that matches
        const localIdx = reportsList.findIndex((r: any) => 
          r.products.map((p: any) => p.name).join(', ') === entry.products &&
          r.timestamp === entry.timestamp
        );
        if (localIdx !== -1) {
          reportsList.splice(localIdx, 1);
          localStorage.setItem('productlens_saved_reports', JSON.stringify(reportsList));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRemoveFavorite = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    const entry = favorites[index];
    const updated = [...favorites];
    updated.splice(index, 1);
    setFavorites(updated);

    if (sheetsConnected) {
      // Sync remove with Google Sheets
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'toggleFavorite',
            userId: user.userId,
            products: entry.products,
            persona: entry.persona,
            objective: entry.objective,
            isFavorite: false
          })
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      // Local storage remove
      try {
        const localFavs = JSON.parse(localStorage.getItem('productlens_favorites') || '[]');
        const updatedFavs = localFavs.filter((f: any) => f.products !== entry.products);
        localStorage.setItem('productlens_favorites', JSON.stringify(updatedFavs));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSelectEntry = (entry: LogEntry) => {
    // Return standard format expected by parent
    onSelectReport({
      products: entry.products.split(',').map(p => ({ name: p.trim() })),
      persona: entry.persona,
      objective: entry.objective,
      timestamp: entry.timestamp
    });
  };

  const activeList = activeTab === 'history' ? history : favorites;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-200/80 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 flex items-center gap-2">
            <FileText size={18} className="text-purple-650" />
            Competitive Intelligence Archive
          </h2>
          <p className="text-xs text-zinc-450 font-light mt-0.5">
            {sheetsConnected 
              ? 'Synchronized with your connected Google Sheet database.' 
              : 'Running in local sandbox mode. Connect a Google Sheet in settings to back up data.'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition shadow-sm"
        >
          Back to setup
        </button>
      </div>

      {/* Tabs list (History vs Favorites) */}
      <div className="flex gap-2 border-b border-zinc-200 pb-1">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition ${
            activeTab === 'history'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <History size={13} />
          <span>Search History ({history.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition ${
            activeTab === 'favorites'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-400 hover:text-zinc-600'
          }`}
        >
          <Star size={13} className={favorites.length > 0 ? "fill-amber-400 text-amber-400" : ""} />
          <span>Starred Favorites ({favorites.length})</span>
        </button>
      </div>

      {/* List viewport */}
      {loadingArchive ? (
        <div className="glass-light p-12 rounded-2xl border border-zinc-200/60 shadow-sm text-center bg-white/60 flex flex-col justify-center items-center">
          <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] text-zinc-400 mt-3">Loading archive database...</span>
        </div>
      ) : activeList.length === 0 ? (
        <div className="glass-light p-12 rounded-2xl border border-zinc-200/60 shadow-sm text-center space-y-3 bg-white/60">
          <FileText size={32} className="text-zinc-300 mx-auto" />
          <h3 className="text-sm font-semibold text-zinc-850">
            {activeTab === 'history' ? 'No Search History' : 'No Starred Favorites'}
          </h3>
          <p className="text-xs text-zinc-450 max-w-xs mx-auto font-light leading-relaxed">
            {activeTab === 'history' 
              ? 'Generate a teardown report first to log your competitive research searches here.' 
              : 'Star reports inside the dashboard view to display them in your quick favorites list.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeList.map((entry, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectEntry(entry)}
              className="glass-light p-5 rounded-2xl border border-zinc-250/60 bg-white/70 hover:border-zinc-450 transition cursor-pointer flex flex-col justify-between h-[155px] group shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-purple-650 transition truncate pr-4">
                    {entry.products}
                  </h3>
                  <button
                    onClick={(e) => {
                      if (activeTab === 'history') {
                        handleDeleteHistory(idx, e);
                      } else {
                        handleRemoveFavorite(idx, e);
                      }
                    }}
                    className="p-1 rounded bg-zinc-50 hover:bg-rose-50 text-zinc-400 hover:text-rose-600 border border-zinc-200/50 hover:border-rose-100 transition shadow-sm"
                    title={activeTab === 'history' ? "Delete from history" : "Remove from favorites"}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <p className="text-[10px] text-zinc-450 font-light mt-1 truncate">
                  Goal: <span className="text-zinc-600 font-normal">{entry.objective || 'General capability assessment'}</span>
                </p>
                
                <p className="text-[11px] text-zinc-500 font-light line-clamp-2 mt-2 leading-relaxed">
                  Configured for {entry.persona} segment.
                </p>
              </div>

              {/* Bottom detail meta */}
              <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-3 border-t border-zinc-100 font-light">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-zinc-400" />
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={11} className="text-zinc-400" />
                    {entry.persona.split(' ')[0]}
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
