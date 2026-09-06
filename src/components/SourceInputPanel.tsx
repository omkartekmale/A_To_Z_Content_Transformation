import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Trash2, 
  Sparkles, 
  Tag, 
  ShieldAlert, 
  Building2, 
  AlertTriangle, 
  Microscope, 
  Radio, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { SourceDocument } from '../types';
import { SAMPLE_SOURCE_PRESETS } from '../data/samplePresets';

interface SourceInputPanelProps {
  sourceDoc: SourceDocument;
  onChange: (updated: Partial<SourceDocument>) => void;
  onSelectPreset: (preset: SourceDocument) => void;
  isGenerating: boolean;
}

const CATEGORIES = [
  { id: 'threat_intelligence', label: 'Threat Intel / CVE', icon: ShieldAlert, color: 'text-rose-400' },
  { id: 'policy_document', label: 'Policy / Governance', icon: Building2, color: 'text-sky-400' },
  { id: 'incident_report', label: 'Incident / Post-Mortem', icon: AlertTriangle, color: 'text-amber-400' },
  { id: 'research_paper', label: 'Research Paper', icon: Microscope, color: 'text-emerald-400' },
  { id: 'news_article', label: 'News / Press Release', icon: Radio, color: 'text-indigo-400' },
  { id: 'free_prompt', label: 'Free-form Prompt / Notes', icon: HelpCircle, color: 'text-purple-400' },
] as const;

export const SourceInputPanel: React.FC<SourceInputPanelProps> = ({
  sourceDoc,
  onChange,
  onSelectPreset,
  isGenerating
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = sourceDoc.content ? sourceDoc.content.trim().split(/\s+/).length : 0;
  const charCount = sourceDoc.content ? sourceDoc.content.length : 0;

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        onChange({
          title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          content: text,
          authorOrSource: `Uploaded File: ${file.name}`
        });
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header with Preset Quick-Launch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              1. Source Information Ingestion
            </h2>
            <p className="text-xs text-slate-400">
              Submit reports, articles, threat advisories, documents or raw prompts
            </p>
          </div>
        </div>

        {/* Preset Chips for SIH Demo */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
          <span className="text-[11px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
          </span>
          {SAMPLE_SOURCE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              disabled={isGenerating}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all shrink-0 border ${
                sourceDoc.id === preset.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
              }`}
            >
              {preset.category === 'threat_intelligence' ? 'Cyber Threat' :
               preset.category === 'policy_document' ? 'Gov Policy' :
               preset.category === 'incident_report' ? 'SRE Outage' : 'AI Health'}
            </button>
          ))}
        </div>
      </div>

      {/* Title & Metadata row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <label htmlFor="source-title" className="block text-xs font-semibold text-slate-300 mb-1">
            Document / Subject Title
          </label>
          <input
            id="source-title"
            type="text"
            value={sourceDoc.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Critical Authentication Bypass (CVE-2026-9042)..."
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="source-author" className="block text-xs font-semibold text-slate-300 mb-1">
            Issuing Source / Author
          </label>
          <input
            id="source-author"
            type="text"
            value={sourceDoc.authorOrSource || ''}
            onChange={(e) => onChange({ authorOrSource: e.target.value })}
            placeholder="e.g. CERT-In / Ministry / SRE Ops"
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-indigo-400" />
          Source Category Taxonomy
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = sourceDoc.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange({ category: cat.id as any })}
                className={`p-2 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                  <span className="text-[11px] font-medium leading-tight truncate">{cat.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area with Drag-and-Drop */}
      <div className="relative">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="source-content" className="text-xs font-semibold text-slate-300">
            Primary Content Body (Text, Report, Intelligence feed, or Prompt)
          </label>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>{charCount} characters</span>
            {sourceDoc.content && (
              <button
                type="button"
                onClick={() => onChange({ content: '', title: '' })}
                className="text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                title="Clear content"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative rounded-xl border transition-all ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-950/20 ring-2 ring-indigo-500/50' 
              : 'border-slate-700/80 bg-slate-950/60 focus-within:border-indigo-500'
          }`}
        >
          <textarea
            id="source-content"
            rows={8}
            value={sourceDoc.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="Paste your source text, news article, threat advisory, technical paper, or type free-form notes here... Or drag & drop a file (.txt, .md, .json, .csv)"
            className="w-full p-3.5 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-y custom-scrollbar font-mono leading-relaxed"
          />

          {/* Quick upload trigger button inside bottom right of textarea */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-slate-800/80 bg-slate-900/40 rounded-b-xl text-xs">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>UTF-8 Document Ready</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.json,.csv,.log"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
              <button
                id="upload-source-doc-btn"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 text-xs transition-colors"
              >
                <Upload className="w-3 h-3 text-indigo-400" />
                <span>Upload Document (.txt, .md)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
