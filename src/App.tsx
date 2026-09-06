import React, { useState, useRef } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  SihArchitectureModal 
} from './components/SihArchitectureModal';
import { 
  SourceInputPanel 
} from './components/SourceInputPanel';
import { 
  ConfigParametersPanel 
} from './components/ConfigParametersPanel';
import { 
  DeliverableSelector 
} from './components/DeliverableSelector';
import { 
  ArtefactWorkspace 
} from './components/ArtefactWorkspace';
import { 
  SourceDocument, 
  GenerationParams, 
  OutputFormatType, 
  GeneratedDeliverables 
} from './types';
import { 
  SAMPLE_SOURCE_PRESETS, 
  DEFAULT_GENERATION_PARAMS 
} from './data/samplePresets';
import { 
  Sparkles, 
  Layers, 
  ArrowDown, 
  AlertCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [sourceDoc, setSourceDoc] = useState<SourceDocument>(SAMPLE_SOURCE_PRESETS[0]);
  const [params, setParams] = useState<GenerationParams>(DEFAULT_GENERATION_PARAMS);
  const [selectedFormats, setSelectedFormats] = useState<OutputFormatType[]>([
    'executive_summary',
    'linkedin',
    'twitter',
    'advisory'
  ]);
  const [deliverables, setDeliverables] = useState<GeneratedDeliverables | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStepMessage, setGenerationStepMessage] = useState<string>('');
  const [durationMs, setDurationMs] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isSihModalOpen, setIsSihModalOpen] = useState<boolean>(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Preset selection
  const handleSelectPreset = (preset: SourceDocument) => {
    setSourceDoc(preset);
    setError(null);
  };

  // Reset workspace
  const handleReset = () => {
    setSourceDoc({
      id: `custom-${Date.now()}`,
      title: '',
      category: 'free_prompt',
      content: '',
      dateAdded: new Date().toLocaleDateString(),
      tags: []
    });
    setParams(DEFAULT_GENERATION_PARAMS);
    setSelectedFormats(['executive_summary', 'linkedin']);
    setDeliverables(null);
    setError(null);
  };

  // Format selection controls
  const handleToggleFormat = (format: OutputFormatType) => {
    setSelectedFormats((prev) => 
      prev.includes(format) 
        ? prev.filter((f) => f !== format) 
        : [...prev, format]
    );
  };

  const handleSelectAllFormats = () => {
    setSelectedFormats([
      'video',
      'linkedin',
      'twitter',
      'advisory',
      'infographic',
      'executive_summary',
      'presentation'
    ]);
  };

  const handleClearAllFormats = () => {
    setSelectedFormats([]);
  };

  const handleSelectSuite = (suite: 'executive' | 'social' | 'ops') => {
    if (suite === 'executive') {
      setSelectedFormats(['executive_summary', 'presentation', 'advisory']);
    } else if (suite === 'social') {
      setSelectedFormats(['linkedin', 'twitter', 'video']);
    } else {
      setSelectedFormats(['advisory', 'infographic', 'executive_summary']);
    }
  };

  // Main Transformation Action
  const handleExecuteTransformation = async () => {
    if (!sourceDoc.content.trim() || selectedFormats.length === 0) return;

    setIsGenerating(true);
    setError(null);
    setGenerationStepMessage('Parsing source content & extracting contextual intent...');

    const stepTimer1 = setTimeout(() => {
      setGenerationStepMessage('Applying parametric conditioning (Audience, Tone, Detail)...');
    }, 900);

    const stepTimer2 = setTimeout(() => {
      setGenerationStepMessage('Orchestrating Gemini 2.5 Flash multi-format synthesis...');
    }, 2200);

    const stepTimer3 = setTimeout(() => {
      setGenerationStepMessage('Validating domain constraints & formatting deliverables...');
    }, 3800);

    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceTitle: sourceDoc.title,
          sourceCategory: sourceDoc.category,
          sourceContent: sourceDoc.content,
          params,
          selectedFormats
        })
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      if (data.results) {
        setDeliverables(data.results);
        setDurationMs(data.durationMs);

        // Smooth scroll down to deliverables
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        throw new Error('No deliverables returned from transformation engine.');
      }
    } catch (err: any) {
      console.error('Transformation error:', err);
      setError(err.message || 'An unexpected error occurred during transformation.');
    } finally {
      setIsGenerating(false);
      setGenerationStepMessage('');
    }
  };

  const canTransform = sourceDoc.content.trim().length > 0 && selectedFormats.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onOpenSihGuide={() => setIsSihModalOpen(true)}
        isGenerating={isGenerating}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Banner with Problem Statement Context */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  SMART INDIA HACKATHON 2026 SOLUTION
                </span>
                <span className="text-xs text-slate-400">• Multi-format Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                AI Content Transformation Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Transform source news, advisories, research papers, incident logs, or free-form prompts into publication-ready communication artefacts—including Video packages, LinkedIn posts, X threads, Advisories, Infographics, Executive Summaries, and Presentations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setIsSihModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>SIH Architecture & Modular Division</span>
              </button>

              <button
                onClick={() => handleExecuteTransformation()}
                disabled={!canTransform || isGenerating}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-40 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Transform Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="flex-1">
              <strong className="font-bold">Transformation Issue:</strong> {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs underline hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Step 1: Source Ingestion Panel */}
        <SourceInputPanel
          sourceDoc={sourceDoc}
          onChange={(updated) => setSourceDoc((prev) => ({ ...prev, ...updated }))}
          onSelectPreset={handleSelectPreset}
          isGenerating={isGenerating}
        />

        {/* Step 2: Parametric Intent Matrix */}
        <ConfigParametersPanel
          params={params}
          onChange={(updated) => setParams((prev) => ({ ...prev, ...updated }))}
          isGenerating={isGenerating}
        />

        {/* Step 3: Target Deliverable Selector & Execution Bar */}
        <DeliverableSelector
          selectedFormats={selectedFormats}
          onToggleFormat={handleToggleFormat}
          onSelectAll={handleSelectAllFormats}
          onClearAll={handleClearAllFormats}
          onSelectSuite={handleSelectSuite}
          onTriggerTransform={handleExecuteTransformation}
          isGenerating={isGenerating}
          canTransform={canTransform}
          generationStepMessage={generationStepMessage}
        />

        {/* Step 4: Output Artefact Workspace */}
        <div ref={resultsRef}>
          {deliverables ? (
            <ArtefactWorkspace
              deliverables={deliverables}
              selectedFormats={selectedFormats}
              durationMs={durationMs}
              sourceTitle={sourceDoc.title || 'Source Document'}
              sourceCategory={sourceDoc.category}
            />
          ) : (
            <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300">No Artefacts Generated Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Configure your parameters, select desired deliverable formats, and click "Execute Transformation" to generate synchronized communication assets.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">OmniTransform</span>
            <span>• Built for Smart India Hackathon (SIH) 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button 
              onClick={() => setIsSihModalOpen(true)}
              className="hover:text-indigo-400 transition-colors"
            >
              System Architecture
            </button>
            <span>•</span>
            <span className="text-slate-500">Powered by Gemini 2.5 Flash & React 19</span>
          </div>
        </div>
      </footer>

      {/* SIH 2026 Division & Architecture Modal */}
      <SihArchitectureModal
        isOpen={isSihModalOpen}
        onClose={() => setIsSihModalOpen(false)}
      />
    </div>
  );
}
