import React from 'react';
import { X, Layers, CheckCircle2, Cpu, ArrowRight, ShieldCheck, Zap, BarChart3, Database, FileText, Share2, Award } from 'lucide-react';

interface SihArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SihArchitectureModal: React.FC<SihArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const modules = [
    {
      number: '01',
      title: 'Multi-Modal Ingestion & Context Parsing Engine',
      lead: 'Ingests diverse raw inputs (threat bulletins, policy docs, research PDFs, news feeds, incident logs, prompt streams).',
      features: [
        'Semantic normalization and structural chunking',
        'Key entity, metric, and timeline extraction',
        'Noise removal and domain taxonomy categorization'
      ],
      icon: Database,
      badge: 'Input Subsystem'
    },
    {
      number: '02',
      title: 'Parametric Intent & Conditioning Matrix',
      lead: 'Transforms operator directives into strict mathematical & linguistic generation boundaries.',
      features: [
        'Target Audience calibration (Executive, Technical, Public, Media)',
        'Tone & stylistic modulation (Authoritative, Urgent, Analytical)',
        'Governance & compliance constraints (ISO/IEC, CERT, Policy)'
      ],
      icon: Cpu,
      badge: 'Logic & Policy'
    },
    {
      number: '03',
      title: 'Parallelized Multi-Artefact Orchestrator',
      lead: 'Coordinates simultaneous generation of all 7 target formats without cross-contamination or hallucination.',
      features: [
        'Server-side Gemini 3.8 Flash orchestration with multi-model cascade',
        'Strict JSON schema adherence with type safety',
        'Real-time fallback recovery for offline/low-connectivity resiliency'
      ],
      icon: Zap,
      badge: 'Core AI Engine'
    },
    {
      number: '04',
      title: 'Domain-Specific Formatting & Synthesis Layer',
      lead: 'Enforces medium-specific constraints for each requested communication artefact.',
      features: [
        'Video: Multi-scene scripts, teleprompter timing, camera directives',
        'Social: LinkedIn hooks & X thread 280-character strict limits',
        'Enterprise: CVSS security advisories, BLUF executive briefings, and slide decks'
      ],
      icon: FileText,
      badge: 'Synthesis Layer'
    },
    {
      number: '05',
      title: 'Interactive Human-in-the-Loop & Multi-Channel Delivery',
      lead: 'Allows the operator to review, inspect, edit, simulate, and export deliverables.',
      features: [
        'Live social feed simulation (LinkedIn, Twitter/X)',
        'Interactive Storyboard & Script player with voice pacing',
        'Print-ready official PDF advisory formatting & Markdown/JSON exports'
      ],
      icon: Share2,
      badge: 'Delivery & UI'
    }
  ];

  const metrics = [
    { label: 'Turnaround Time', before: '4 to 6 Hours', after: '< 20 Seconds', gain: '98% Acceleration' },
    { label: 'Manual Drafting Cost', before: '$120 / Document', after: '$0.004 / Doc', gain: '99% Cost Reduction' },
    { label: 'Format Consistency', before: '62% (Human variance)', after: '100% Deterministic', gain: 'Flawless Compliance' },
    { label: 'Multi-Channel Reach', before: '1 Format at a time', after: '7 Simultaneous Formats', gain: '7x Channel Multiplier' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">SIH 2026 Project Division & Architecture</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                  Evaluation Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Structured 5-Module Blueprint & Technical Defense for Smart India Hackathon 2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          {/* Executive Pitch Banner */}
          <div className="bg-gradient-to-r from-indigo-950/60 via-slate-800/80 to-slate-900/80 border border-indigo-500/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              The Problem Statement & Solution Thesis
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Public and enterprise organizations are flooded with critical raw information (threat intelligence bulletins, policy frameworks, research papers, crisis incident reports). Manually translating this raw data into target communication formats—video scripts, executive briefings, public advisories, social threads, and presentations—requires multiple specialized teams and hours of drafting. <strong className="text-white">OmniTransform</strong> unifies this entire workflow into a single parametric, multi-format AI engine.
            </p>
          </div>

          {/* 5 Modular System Architecture */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                The 5 Core Technical Modules (SIH Division)
              </h3>
              <span className="text-xs text-slate-400">High Cohesion & Low Coupling Architecture</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((mod) => {
                const IconComponent = mod.icon;
                return (
                  <div 
                    key={mod.number}
                    className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          MOD {mod.number}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded-full font-medium">
                          {mod.badge}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5 mb-2">
                        <IconComponent className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                        <h4 className="font-semibold text-sm text-white leading-snug">{mod.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                        {mod.lead}
                      </p>
                    </div>

                    <div className="border-t border-slate-700/60 pt-2 space-y-1">
                      {mod.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* End-to-End Pipeline Visualization */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              End-to-End Data Transformation Pipeline
            </h3>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700 flex-1 min-w-[140px] text-center">
                <div className="font-semibold text-white">1. Source Ingestion</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Raw Text, CVE, Policy, PDF</div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:block" />

              <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700 flex-1 min-w-[140px] text-center">
                <div className="font-semibold text-white">2. Parametric Dials</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Audience, Tone, Detail, Goal</div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:block" />

              <div className="p-3 bg-indigo-950/70 rounded-lg border border-indigo-500/40 flex-1 min-w-[140px] text-center">
                <div className="font-semibold text-indigo-300">3. Gemini 3 Series</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Parallel Structured JSON</div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:block" />

              <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700 flex-1 min-w-[140px] text-center">
                <div className="font-semibold text-white">4. Medium Synthesizer</div>
                <div className="text-[11px] text-slate-400 mt-0.5">7 Format Constraints</div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:block" />

              <div className="p-3 bg-emerald-950/70 rounded-lg border border-emerald-500/40 flex-1 min-w-[140px] text-center">
                <div className="font-semibold text-emerald-300">5. Multi-Deliverable</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Script, Deck, Post, Advisory</div>
              </div>
            </div>
          </div>

          {/* Quantified Evaluation Benchmarks */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Quantified Impact & Judging Evaluation Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {metrics.map((m, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                    <div className="flex items-baseline justify-between mt-1 text-xs">
                      <span className="text-slate-500 line-through">{m.before}</span>
                      <span className="text-white font-bold text-sm">{m.after}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-center">
                    {m.gain}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <span>Target Platform: Cloud Run / React 19 / Express / Gemini 3.8 Flash</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Close Guide & Launch App
          </button>
        </div>
      </div>
    </div>
  );
};
