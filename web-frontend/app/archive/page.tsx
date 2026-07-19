'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SavedReports from '@/components/saved-reports';
import { TeardownReport } from '@/lib/mock-data';
import { useAuth } from '@/context/auth-context';

export default function ArchivePage() {
  const router = useRouter();
  const { user, loading, sheetsConnected } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSelectReport = (report: TeardownReport) => {
    const productsList = report.products.map(p => p.name).join(', ');
    const query = new URLSearchParams({
      products: productsList,
      persona: report.persona,
      objective: report.objective,
      depth: 'deep'
    }).toString();

    router.push(`/dashboard?${query}`);
  };

  const handleClose = () => {
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <SavedReports
        onSelectReport={handleSelectReport}
        onClose={handleClose}
      />
    </div>
  );
}
