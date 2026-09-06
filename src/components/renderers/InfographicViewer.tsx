import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Copy, 
  Check, 
  Palette, 
  TrendingUp, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Zap, 
  FileCheck2 
} from 'lucide-react';
import { InfographicBlueprint } from '../../types';

interface InfographicViewerProps {
  data: InfographicBlueprint;
}

const STAT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck,
  Clock,
  Zap,
  FileCheck2
};

export const InfographicViewer: React.FC<InfographicViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopySpec = () => {
    const text = `INFOGRAPHIC SPECIFICATION: ${data.title}
LAYOUT: ${data.recommendedLayout}
HEADLINE: ${data.heroHeadline}
TAGLINE: ${data.tagline}

KEY METRICS:
${data.heroStats.map(s => `${s.value} - ${s.label} (${s.trendOrContext})`).join('\n')}

PROCESS FLOW:
${data.processFlow.map(p => `Step ${p.step}: ${p.phaseTitle} - ${p.description} [${p.keyMetric || ''}]`).join('\n')}

SECTIONS:
${data.sections.map(sec => `[${sec.sectionTitle}] (${sec.visualArchetype})
${sec.keyPoints.map(k => `• ${k}`).join('\n')}
Directive: ${sec.visualDirective}`).join('\n\n')}

TAKEAWAY: ${data.concludingTakeaway}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Layout Spec */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <LayoutGrid className="w-3 h-3" /> Infographic Visual Blueprint
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Layout: {data.recommendedLayout}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{data.title}</h3>
          <p className="text-xs text-slate-400">{data.tagline}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Color Palette Swatches */}
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <Palette className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center gap-1">
              <div 
                className="w-4 h-4 rounded-full border border-slate-600 shadow-sm" 
                style={{ backgroundColor: data.colorScheme?.primary || '#0F172A' }} 
                title="Primary" 
              />
              <div 
                className="w-4 h-4 rounded-full border border-slate-600 shadow-sm" 
                style={{ backgroundColor: data.colorScheme?.secondary || '#3B82F6' }} 
                title="Secondary" 
              />
              <div 
                className="w-4 h-4 rounded-full border border-slate-600 shadow-sm" 
                style={{ backgroundColor: data.colorScheme?.accent || '#10B981' }} 
                title="Accent" 
              />
            </div>
          </div>

          <button
            onClick={handleCopySpec}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-600/20"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Specs' : 'Copy Design Specs'}</span>
          </button>
        </div>
      </div>

      {/* Rendered Infographic Canvas Preview */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Hero Title & Big Headline */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            VISUAL INTELLIGENCE BRIEFING
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {data.heroHeadline}
          </h2>
          <p className="text-xs text-slate-400">
            {data.tagline}
          </p>
        </div>

        {/* 4 Hero Metric Callout Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.heroStats.map((stat, idx) => {
            const IconComp = STAT_ICONS[stat.iconHint] || TrendingUp;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-slate-400 font-medium truncate">{stat.label}</span>
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1 font-medium">
                    <span>{stat.trendOrContext}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Flow Diagram */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-inner">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Operational Process & Transformation Flow
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {data.processFlow.map((step, idx) => (
              <div
                key={step.step}
                className="relative p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                    {step.keyMetric && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-teal-300">
                        {step.keyMetric}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1">{step.phaseTitle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
            >
              <div>
                <div className="text-[10px] uppercase font-mono font-semibold text-teal-400 mb-0.5">
                  {sec.visualArchetype.replace('_', ' ')}
                </div>
                <h4 className="text-sm font-bold text-white">{sec.sectionTitle}</h4>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300">
                {sec.keyPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 italic">
                Directive: {sec.visualDirective}
              </div>
            </div>
          ))}
        </div>

        {/* Closing Takeaway & Asset Keywords */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
              Core Takeaway
            </div>
            <p className="text-xs text-white leading-relaxed font-medium">
              {data.concludingTakeaway}
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            {data.assetKeywords?.map((kw, idx) => (
              <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
