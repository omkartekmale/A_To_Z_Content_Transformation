import React from 'react';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  Video, 
  Linkedin, 
  Twitter, 
  ShieldAlert, 
  LayoutGrid, 
  FileText, 
  Presentation,
  CheckCircle2,
  Layers,
  ArrowRight,
  Clock
} from 'lucide-react';
import { OutputFormatType } from '../types';
import { FORMAT_METADATA } from '../data/samplePresets';

interface DeliverableSelectorProps {
  selectedFormats: OutputFormatType[];
  onToggleFormat: (format: OutputFormatType) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onSelectSuite: (suite: 'executive' | 'social' | 'ops') => void;
  onTriggerTransform: () => void;
  isGenerating: boolean;
  canTransform: boolean;
  generationStepMessage?: string;
}

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Video,
  Linkedin,
  Twitter,
  ShieldAlert,
  LayoutGrid,
  FileText,
  Presentation
};

export const DeliverableSelector: React.FC<DeliverableSelectorProps> = ({
  selectedFormats,
  onToggleFormat,
  onSelectAll,
  onClearAll,
  onSelectSuite,
  onTriggerTransform,
  isGenerating,
  canTransform,
  generationStepMessage
}) => {
  const allFormatKeys = Object.keys(FORMAT_METADATA) as OutputFormatType[];

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                3. Select Target Deliverable Formats
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {selectedFormats.length} / {allFormatKeys.length} Selected
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Select one or multiple artefacts. The engine will synthesize all deliverables simultaneously.
            </p>
          </div>
        </div>

        {/* Quick Batch Selection Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => onSelectSuite('executive')}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="Executive Summary + Presentation + Advisory"
          >
            Exec Suite
          </button>
          <button
            type="button"
            onClick={() => onSelectSuite('social')}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="LinkedIn + Twitter/X + Video"
          >
            Social Suite
          </button>
          <button
            type="button"
            onClick={onSelectAll}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded-md bg-indigo-950 hover:bg-indigo-900 text-indigo-200 text-xs font-medium border border-indigo-700/60 transition-colors flex items-center gap-1"
          >
            <CheckSquare className="w-3 h-3" /> Select All 7
          </button>
          {selectedFormats.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              disabled={isGenerating}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs border border-slate-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid of 7 Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {allFormatKeys.map((key) => {
          const meta = FORMAT_METADATA[key];
          const IconComp = ICONS[meta.iconName] || FileText;
          const isSelected = selectedFormats.includes(key);

          return (
            <div
              key={key}
              onClick={() => !isGenerating && onToggleFormat(key)}
              className={`group relative p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-slate-800/90 border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div>
                {/* Header line with checkbox & badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${
                      isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-tight">{meta.label}</span>
                  </div>

                  <div>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                    )}
                  </div>
                </div>

                <div className="text-[10px] uppercase font-semibold tracking-wider text-teal-400 mb-1.5">
                  {meta.badge}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-2">
                  {meta.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3 h-3" /> Saves:
                </span>
                <span className="font-medium text-emerald-400">{meta.estimatedEffortSaved}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Transformation Action Bar */}
      <div className="pt-2">
        <button
          id="transform-content-btn"
          type="button"
          onClick={onTriggerTransform}
          disabled={!canTransform || isGenerating}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-xl ${
            canTransform && !isGenerating
              ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:via-blue-500 hover:to-teal-400 text-white shadow-indigo-500/25 active:scale-[0.99]'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold text-white">Synthesizing Deliverables...</span>
                <span className="text-[11px] text-indigo-200 font-normal">
                  {generationStepMessage || 'Conditioning prompts & executing multi-format generation'}
                </span>
              </div>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>
                Execute Transformation ({selectedFormats.length} Deliverable{selectedFormats.length !== 1 ? 's' : ''})
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {!canTransform && (
          <p className="text-center text-xs text-amber-400/90 mt-2">
            ⚠️ Please ensure you have provided source content and selected at least one deliverable format.
          </p>
        )}
      </div>
    </div>
  );
};
