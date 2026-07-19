import { V2Report } from '@/lib/types';

export function exportToMarkdown(report: V2Report): string {
  const products = report.products.map(p => p.name).join(' vs ');
  
  let md = `# Competitive Intelligence Report: ${products}\n`;
  md += `**Date:** ${new Date(report.timestamp).toLocaleDateString()}\n`;
  md += `**Industry:** ${report.industry}\n`;
  md += `**Target Persona:** ${report.persona}\n\n`;

  md += `## Executive Summary\n`;
  md += `${report.crossAnalysis.executiveSummary}\n\n`;

  md += `### Overall Recommendation\n`;
  const winner = report.products.find(p => p.id === report.crossAnalysis.overallWinner.productId);
  md += `**Winner:** ${winner?.name || 'N/A'}\n`;
  md += `**Score:** ${report.crossAnalysis.overallWinner.score}/10\n`;
  md += `**Reason:** ${report.crossAnalysis.overallWinner.reason}\n\n`;

  md += `## SWOT Analysis\n\n`;
  report.products.forEach(p => {
    const swot = report.productResearch[p.id]?.swot;
    if (swot) {
      md += `### ${p.name}\n`;
      md += `**Strengths:**\n`;
      swot.strengths.forEach(s => md += `- ${s.point}: ${s.evidence}\n`);
      md += `\n**Weaknesses:**\n`;
      swot.weaknesses.forEach(w => md += `- ${w.point}: ${w.evidence}\n`);
      md += `\n**Opportunities:**\n`;
      swot.opportunities.forEach(o => md += `- ${o.point}: ${o.evidence}\n`);
      md += `\n**Threats:**\n`;
      swot.threats.forEach(t => md += `- ${t.point}: ${t.evidence}\n`);
      md += `\n`;
    }
  });

  md += `## Feature Matrix\n\n`;
  const header = ['Capability', ...report.products.map(p => p.name)];
  md += `| ${header.join(' | ')} |\n`;
  md += `| ${header.map(() => '---').join(' | ')} |\n`;
  
  report.crossAnalysis.featureMatrix.forEach(row => {
    const cells = [
      row.capability + (row.isCommon ? ' (Standard)' : ''),
      ...report.products.map(p => row.status[p.id] || 'None')
    ];
    md += `| ${cells.join(' | ')} |\n`;
  });
  
  md += `\n`;

  return md;
}

export function exportToCSV(report: V2Report): string {
  // Feature Matrix CSV
  let csv = `Capability,${report.products.map(p => p.name).join(',')},Standard Feature\n`;
  
  report.crossAnalysis.featureMatrix.forEach(row => {
    const rowValues = [
      `"${row.capability.replace(/"/g, '""')}"`,
      ...report.products.map(p => `"${(row.status[p.id] || 'None').replace(/"/g, '""')}"`),
      row.isCommon ? 'Yes' : 'No'
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
