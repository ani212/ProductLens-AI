'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SavedReports from '@/components/saved-reports';
import { TeardownReport } from '@/lib/mock-data';

export default function ArchivePage() {
  const router = useRouter();

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

  return (
    <div className="py-10">
      <SavedReports
        onSelectReport={handleSelectReport}
        onClose={handleClose}
      />
    </div>
  );
}
