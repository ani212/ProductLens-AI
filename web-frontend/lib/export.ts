import { TeardownReport } from '@/lib/mock-data';

export function exportToMarkdown(report: TeardownReport): string {
  const products = report.products.map(p => p.name).join(' vs ');

  let md = `# Product Teardown & Competitive Intelligence Report: ${products}\n\n`;
  md += `**Date:** ${new Date(report.timestamp).toLocaleDateString()}\n`;
  md += `**Target Persona:** ${report.persona}\n`;
  md += `**Analysis Objective:** ${report.objective}\n\n`;

  md += `--- \n\n`;
  md += `## Executive Summary\n\n`;
  md += `${report.executiveSummary.overview || 'N/A'}\n\n`;
  md += `**Target Audience:** ${report.executiveSummary.targetAudience || 'N/A'}\n\n`;
  md += `**Competitive Position:** ${report.executiveSummary.competitivePosition || 'N/A'}\n\n`;
  md += `**Top Opportunity:** ${report.executiveSummary.topOpportunity || 'N/A'}\n\n`;

  md += `### Strongest Advantages\n`;
  report.products.forEach(p => {
    md += `- **${p.name}:** ${report.executiveSummary.strongestAdvantage?.[p.id] || 'N/A'}\n`;
  });
  md += `\n`;

  md += `### Biggest Weaknesses\n`;
  report.products.forEach(p => {
    md += `- **${p.name}:** ${report.executiveSummary.biggestWeakness?.[p.id] || 'N/A'}\n`;
  });
  md += `\n\n`;

  md += `## Feature Comparison Matrix\n\n`;
  const header = ['Capability', ...report.products.map(p => p.name), 'Opportunity Score'];
  md += `| ${header.join(' | ')} |\n`;
  md += `| ${header.map(() => '---').join(' | ')} |\n`;

  report.features?.forEach(row => {
    const cells = [
      row.capability,
      ...report.products.map(p => row.status?.[p.id] || 'No'),
      row.opportunityScore || 'Medium'
    ];
    md += `| ${cells.join(' | ')} |\n`;
  });
  md += `\n\n`;

  md += `## Pain Points Identified\n\n`;
  report.painPoints?.forEach(point => {
    const prodName = report.products.find(p => p.id === point.productId)?.name || point.productId;
    md += `### ${point.title} (${prodName})\n`;
    md += `- **Severity:** ${point.severity} | **Frequency:** ${point.frequency} | **Evidence Mentions:** ${point.evidenceCount}\n`;
    md += `- **Affected Segment:** ${point.affectedUsers}\n`;
    md += `- **Competitor Difference:** ${point.competitorComparison}\n`;
    md += `- **Proposed Solution:** ${point.solution}\n`;
    if (point.quote) md += `- **Quote:** *"${point.quote}"*\n`;
    md += `\n`;
  });

  md += `## Product Recommendations\n\n`;
  report.recommendations?.forEach((rec, idx) => {
    md += `### ${idx + 1}. ${rec.title}\n`;
    md += `- **Problem:** ${rec.problem}\n`;
    md += `- **Proposed Solution:** ${rec.proposedSolution}\n`;
    md += `- **Expected Outcome:** ${rec.expectedOutcome}\n`;
    md += `- **Effort / Risk / Confidence:** Effort: ${rec.effort} | Risk: ${rec.risk} | Confidence: ${rec.confidence}%\n`;
    md += `\n`;
  });

  return md;
}

export function exportToCSV(report: TeardownReport): string {
  let csv = `Capability,${report.products.map(p => p.name).join(',')},Opportunity Score\n`;

  report.features?.forEach(row => {
    const rowValues = [
      `"${row.capability.replace(/"/g, '""')}"`,
      ...report.products.map(p => `"${(row.status?.[p.id] || 'No').replace(/"/g, '""')}"`),
      `"${row.opportunityScore || 'Medium'}"`
    ];
    csv += rowValues.join(',') + '\n';
  });

  return csv;
}

export function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
