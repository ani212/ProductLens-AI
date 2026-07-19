'use client';

import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, CircleDot, Terminal, Sparkles } from 'lucide-react';

interface ResearchLoaderProps {
  products: string;
}

const AGENT_STEPS = [
  {
    agent: 'Product Resolver Agent',
    task: 'Confirming entity identities, checking URLs & social endpoints...',
    logs: [
      'Querying Google Entity graph...',
      'Matching official domain records...',
      'Extracting branding schemas and icons...'
    ]
  },
  {
    agent: 'Research Agent',
    task: 'Fetching live homepages, feature lists, pricing matrices & help files...',
    logs: [
      'Initializing search queries with grounding...',
      'Scouring official pricing endpoints...',
      'Scanning public release logs & help document archives...'
    ]
  },
  {
    agent: 'Feature Taxonomy Agent',
    task: 'Normalizing disparate product terms into unified comparative matrix...',
    logs: [
      'Normalizing "AI teammate" and "Copilot" into "AI assistance"...',
      'Aligning task views, relational tables, and timeline hierarchies...',
      'Indexing common integration types...'
    ]
  },
  {
    agent: 'Review Analysis Agent',
    task: 'Scanning public forums, app store listings & G2 reviews for VOC data...',
    logs: [
      'Mining user feedback sentiment trends...',
      'Clustering pain points regarding performance, pricing, and UX...',
      'Extracting representative quotes and severity scores...'
    ]
  },
  {
    agent: 'Opportunity Agent',
    task: 'Evaluating feature gaps and generating PM-centric product recommendations...',
    logs: [
      'Generating SWOT quadrants per competitor...',
      'Mapping task effort vs impact ratios...',
      'Drafting structured PRD recommendations and metric frameworks...'
    ]
  },
  {
    agent: 'Verification Agent',
    task: 'Reviewing claims against search sources & removing ungrounded hypotheses...',
    logs: [
      'Cross-referencing citations with retrieved live URLs...',
      'Pruning unverified hallucinated feature statements...',
      'Determining final confidence percentages...'
    ]
  }
];

export default function ResearchLoader({ products }: ResearchLoaderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>(['Initializing multi-agent framework...']);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress bar smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return prev;
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (currentStepIndex >= AGENT_STEPS.length) return;

    const currentAgentStep = AGENT_STEPS[currentStepIndex];
    let logIndex = 0;

    // Add agent start log
    setTerminalLogs(prev => [
      ...prev,
      `[SYSTEM] Starting ${currentAgentStep.agent}...`,
      `[${currentAgentStep.agent}] ${currentAgentStep.task}`
    ]);

    // Interval to spit out logs
    const logInterval = setInterval(() => {
      if (logIndex < currentAgentStep.logs.length) {
        setTerminalLogs(prev => [
          ...prev,
          `   > ${currentAgentStep.logs[logIndex]}`
        ]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        // Move to next agent step after a brief delay
        const delayTimeout = setTimeout(() => {
          setTerminalLogs(prev => [
            ...prev,
            `[SYSTEM] Completed ${currentAgentStep.agent}.`
          ]);
          setCurrentStepIndex(prev => prev + 1);
        }, 1500);
        return () => clearTimeout(delayTimeout);
      }
    }, 450);

    return () => clearInterval(logInterval);
  }, [currentStepIndex]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8 z-10 text-left">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="relative inline-flex items-center justify-center p-3 rounded-full bg-purple-50 border border-purple-100 text-purple-650 mb-1">
            <Bot size={26} className="animate-bounce" />
            <Sparkles size={12} className="absolute top-1 right-1 text-cyan-600 animate-float-light" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
            Analyzing {products}...
          </h2>
          <p className="text-xs text-zinc-550 max-w-sm mx-auto font-normal leading-relaxed">
            Our autonomous product intelligence agents are parsing pricing grids, normalizing database taxonomies, and cross-checking reviews.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-zinc-200/50 border border-zinc-200/20 rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-purple-600 via-indigo-650 to-cyan-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Agent status column */}
          <div className="md:col-span-2 space-y-2">
            <h3 className="text-xs font-bold text-zinc-650 uppercase tracking-widest mb-3">
              Agent Callstack
            </h3>
            {AGENT_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              
              return (
                <div
                  key={step.agent}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition ${
                    isActive
                      ? 'bg-purple-50 border-purple-200 text-zinc-900 font-semibold'
                      : isCompleted
                      ? 'bg-zinc-100/50 border-transparent text-zinc-500'
                      : 'bg-transparent border-transparent text-zinc-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  ) : isActive ? (
                    <CircleDot size={14} className="text-purple-650 animate-pulse shrink-0" />
                  ) : (
                    <CircleDot size={14} className="text-zinc-200 shrink-0" />
                  )}
                  <span className="text-xs truncate">{step.agent}</span>
                </div>
              );
            })}
          </div>

          {/* Frosted Light Console Output */}
          <div className="md:col-span-3 flex flex-col h-[320px] bg-white border border-zinc-200 rounded-2xl overflow-hidden font-mono shadow-md">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-100 bg-zinc-50/50 text-zinc-500 text-xs">
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-wider">
                <Terminal size={11} className="text-zinc-500" />
                <span>workspace_pipeline.log</span>
              </div>
              <span className="flex h-1.5 w-1.5 rounded-full bg-purple-600 animate-ping"></span>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto text-xs space-y-2 text-zinc-700 scrollbar font-medium">
              {terminalLogs.map((log, i) => {
                let colorClass = 'text-zinc-500';
                if (log.startsWith('[SYSTEM]')) colorClass = 'text-indigo-600 font-bold';
                else if (log.startsWith('[') && log.includes('Agent]')) colorClass = 'text-purple-600 font-bold';
                else if (log.includes('Failed') || log.includes('Error')) colorClass = 'text-rose-600';
                else if (log.includes('Completed')) colorClass = 'text-emerald-600 font-bold';

                return (
                  <div key={i} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                    {log}
                  </div>
                );
              })}
              
              {/* Blinking cursor */}
              <div className="flex items-center gap-1 text-xs text-zinc-500 font-normal">
                <span>&gt; pipeline_daemon</span>
                <span className="inline-block w-1 h-3 bg-zinc-400 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
