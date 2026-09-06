import React from 'react';
import { Sliders, Users, Volume2, Globe, FileStack, Target, Palette, Wand2, HelpCircle } from 'lucide-react';
import { GenerationParams } from '../types';

interface ConfigParametersPanelProps {
  params: GenerationParams;
  onChange: (updated: Partial<GenerationParams>) => void;
  isGenerating: boolean;
}

const AUDIENCE_OPTIONS = [
  'Executive Leadership & C-Suite',
  'Engineering & Technical Teams',
  'General Public & Consumers',
  'Media, Press & Industry Analysts',
  'Regulatory, Legal & Compliance Officers',
  'Internal Staff & Cross-functional Teams'
];

const TONE_OPTIONS = [
  'Authoritative, Clear & Action-Oriented',
  'Urgent, Severe & Crisis Mitigation',
  'Engaging, Conversational & Accessible',
  'Analytical, Objective & Data-Driven',
  'Diplomatic, Formal & Measured',
  'Inspirational, Visionary & Strategic'
];

const LANGUAGE_OPTIONS = [
  'English (Professional / Global)',
  'Hindi (हिंदी / Official & Modern)',
  'Spanish (Español Profesional)',
  'French (Français Institutionnel)',
  'German (Deutsch Fachsprache)',
  'Japanese (日本語 ビジネス)'
];

const OBJECTIVE_OPTIONS = [
  'Inform, Alert & Enable Rapid Decision-Making',
  'Crisis Alert & Urgent Containment Protocol',
  'Strategic Resource Allocation & Board Approval',
  'Public Education & Social Brand Awareness',
  'Regulatory Compliance & Audit Attestation'
];

const STYLE_OPTIONS = [
  'Executive Briefing & Strategic Deliverable',
  'Technical Specification & Engineering Deep-Dive',
  'Social Media Dynamic & Thought Leadership',
  'Official Gazette & Government Directive',
  'Visual Infographic & High-Impact Deck'
];

export const ConfigParametersPanel: React.FC<ConfigParametersPanelProps> = ({
  params,
  onChange,
  isGenerating
}) => {
  const applyConfigPreset = (presetType: 'executive' | 'technical' | 'social' | 'crisis') => {
    if (presetType === 'executive') {
      onChange({
        targetAudience: 'Executive Leadership & C-Suite',
        tone: 'Authoritative, Clear & Action-Oriented',
        detailLevel: 'Concise (BLUF)',
        communicationObjective: 'Strategic Resource Allocation & Board Approval',
        contentStyle: 'Executive Briefing & Strategic Deliverable',
        customDirectives: 'Lead with Bottom Line Up Front (BLUF). Focus on ROI, operational risk, and decision deadlines.'
      });
    } else if (presetType === 'technical') {
      onChange({
        targetAudience: 'Engineering & Technical Teams',
        tone: 'Analytical, Objective & Data-Driven',
        detailLevel: 'Comprehensive (Exhaustive)',
        communicationObjective: 'Inform, Alert & Enable Rapid Decision-Making',
        contentStyle: 'Technical Specification & Engineering Deep-Dive',
        customDirectives: 'Include exact protocols, architectural failure points, and verification commands.'
      });
    } else if (presetType === 'crisis') {
      onChange({
        targetAudience: 'Regulatory, Legal & Compliance Officers',
        tone: 'Urgent, Severe & Crisis Mitigation',
        detailLevel: 'Standard (Balanced)',
        communicationObjective: 'Crisis Alert & Urgent Containment Protocol',
        contentStyle: 'Official Gazette & Government Directive',
        customDirectives: 'Highlight immediate containment windows (24hr mandate), assign responsibility, and state penalties.'
      });
    } else {
      onChange({
        targetAudience: 'General Public & Consumers',
        tone: 'Engaging, Conversational & Accessible',
        detailLevel: 'Standard (Balanced)',
        communicationObjective: 'Public Education & Social Brand Awareness',
        contentStyle: 'Social Media Dynamic & Thought Leadership',
        customDirectives: 'Avoid impenetrable acronyms. Use vivid analogies, conversational punchlines, and strong visual cues.'
      });
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              2. Parametric Intent & Conditioning Matrix
            </h2>
            <p className="text-xs text-slate-400">
              Control target audience, tone, language, depth, objective, and content style
            </p>
          </div>
        </div>

        {/* Quick Style Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
          <span className="text-[11px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Wand2 className="w-3 h-3 text-indigo-400" /> Profiles:
          </span>
          <button
            type="button"
            onClick={() => applyConfigPreset('executive')}
            disabled={isGenerating}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 transition-colors shrink-0"
          >
            C-Suite
          </button>
          <button
            type="button"
            onClick={() => applyConfigPreset('technical')}
            disabled={isGenerating}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 transition-colors shrink-0"
          >
            Deep Tech
          </button>
          <button
            type="button"
            onClick={() => applyConfigPreset('crisis')}
            disabled={isGenerating}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 transition-colors shrink-0"
          >
            Crisis Sev-0
          </button>
          <button
            type="button"
            onClick={() => applyConfigPreset('social')}
            disabled={isGenerating}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 transition-colors shrink-0"
          >
            Public Viral
          </button>
        </div>
      </div>

      {/* Grid of parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Target Audience */}
        <div>
          <label htmlFor="param-target-audience" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            Target Audience
          </label>
          <select
            id="param-target-audience"
            value={params.targetAudience}
            onChange={(e) => onChange({ targetAudience: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {AUDIENCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Tone */}
        <div>
          <label htmlFor="param-tone" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            Tone & Demeanor
          </label>
          <select
            id="param-tone"
            value={params.tone}
            onChange={(e) => onChange({ tone: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {TONE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="param-language" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            Output Language
          </label>
          <select
            id="param-language"
            value={params.language}
            onChange={(e) => onChange({ language: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Level of Detail */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <FileStack className="w-3.5 h-3.5 text-rose-400" />
            Level of Detail
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['Concise (BLUF)', 'Standard (Balanced)', 'Comprehensive (Exhaustive)'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => onChange({ detailLevel: level })}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition-colors truncate ${
                  params.detailLevel === level
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title={level}
              >
                {level.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Communication Objective */}
        <div>
          <label htmlFor="param-objective" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            Communication Objective
          </label>
          <select
            id="param-objective"
            value={params.communicationObjective}
            onChange={(e) => onChange({ communicationObjective: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {OBJECTIVE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Content Style */}
        <div>
          <label htmlFor="param-style" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            Content Style & Register
          </label>
          <select
            id="param-style"
            value={params.contentStyle}
            onChange={(e) => onChange({ contentStyle: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {STYLE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Custom Operator Directives */}
      <div>
        <label htmlFor="param-directives" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          Custom Directives & Specific Instructions (Optional)
        </label>
        <input
          id="param-directives"
          type="text"
          value={params.customDirectives}
          onChange={(e) => onChange({ customDirectives: e.target.value })}
          placeholder="e.g. Focus on immediate 24-hour containment, omit internal server IPs, include hashtags #GovTech..."
          className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
};
