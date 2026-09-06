import React from 'react';
import { Sparkles, Layers, BookOpen, RotateCcw, Cpu } from 'lucide-react';
import { SAMPLE_SOURCE_PRESETS } from '../data/samplePresets';
import { SourceDocument } from '../types';

interface NavbarProps {
  onSelectPreset: (preset: SourceDocument) => void;
  onReset: () => void;
  onOpenSihGuide: () => void;
  isGenerating: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  onReset,
  onOpenSihGuide,
  isGenerating
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">OmniTransform</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                SIH 2026 Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI-Powered Multi-Format Content Transformation Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Presets Dropdown */}
          <div className="relative group">
            <button
              id="presets-dropdown-btn"
              type="button"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Load Sample Source</span>
              <span className="sm:hidden">Presets</span>
            </button>
            <div className="absolute right-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700/60 mb-1">
                Real-World Demo Documents
              </div>
              {SAMPLE_SOURCE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-700/70 hover:text-white flex flex-col gap-0.5 transition-colors"
                >
                  <span className="font-medium truncate">{preset.title}</span>
                  <span className="text-[10px] text-slate-400 uppercase">{preset.category.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SIH 2026 Modular Architecture Guide Modal Button */}
          <button
            id="sih-division-guide-btn"
            onClick={onOpenSihGuide}
            className="px-3 py-1.5 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/90 text-indigo-200 text-xs font-medium border border-indigo-700/60 flex items-center gap-1.5 transition-all shadow-sm"
            title="View SIH 2026 Project Division & Technical Architecture"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">SIH 2026 Division & Architecture</span>
            <span className="md:hidden">SIH Guide</span>
          </button>

          {/* System Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Cpu className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] text-slate-400">Gemini 2.5 Engine</span>
          </div>

          {/* Reset Workspace */}
          <button
            id="reset-workspace-btn"
            onClick={onReset}
            disabled={isGenerating}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-40 transition-colors"
            title="Reset Workspace"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
