import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Mic, 
  Clock, 
  Layout, 
  Sparkles, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { PresentationDeck } from '../../types';

interface PresentationViewerProps {
  data: PresentationDeck;
}

export const PresentationViewer: React.FC<PresentationViewerProps> = ({ data }) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [copied, setCopied] = useState(false);

  const slide = data.slides[currentSlideIdx] || data.slides[0];
  const totalSlides = data.slides.length;

  const handleCopyOutline = () => {
    const text = `PRESENTATION DECK: ${data.deckTitle}
SUBTITLE: ${data.presenterSubtitle}
AUDIENCE: ${data.targetAudience}

SLIDES:
${data.slides.map(s => `--- SLIDE ${s.slideNumber}: ${s.slideTitle} ---
Subtitle: ${s.slideSubtitle}
[Layout: ${s.layoutArchetype}]
Content:
${s.bulletContent.map(b => `• ${b}`).join('\n')}

Visual Directive: ${s.visualDiagramDescription}
Speaker Notes: ${s.speakerNotes}
Est. Time: ${s.estimatedTalkingTime}`).join('\n\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
              <Presentation className="w-3 h-3" /> Presentation Deck & Speaker Notes
            </span>
            <span className="text-xs text-slate-400">
              Slide {currentSlideIdx + 1} of {totalSlides}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{data.deckTitle}</h3>
          <p className="text-xs text-slate-400">{data.presenterSubtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              showNotes
                ? 'bg-purple-950 text-purple-200 border-purple-700/60'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{showNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}</span>
          </button>

          <button
            onClick={handleCopyOutline}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Outline' : 'Copy Deck'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas (16:9 Aspect Ratio Presentation Display) */}
      <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50 border-2 border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col justify-between overflow-hidden">
        {/* Slide Top Metadata Bar */}
        <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono font-bold text-[11px]">
              SLIDE {slide.slideNumber}
            </span>
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              {slide.layoutArchetype.replace('_', ' ')}
            </span>
          </div>
          <span className="text-slate-400 text-xs hidden sm:inline">
            Theme: {data.suggestedDeckTheme}
          </span>
        </div>

        {/* Slide Body Content */}
        <div className="my-auto py-4 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {slide.slideTitle}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-300 font-medium mt-1">
              {slide.slideSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Bullet arguments (7 cols) */}
            <div className="md:col-span-7 space-y-2.5">
              {slide.bulletContent.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Visual Diagram Recommendation Box (5 cols) */}
            <div className="md:col-span-5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between shadow-inner">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Layout className="w-3 h-3 text-indigo-400" /> Suggested Visual Layout
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {slide.visualDiagramDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Slide Bottom Bar with Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Est. Speaking Time: <strong className="text-white">{slide.estimatedTalkingTime}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlideIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIdx === 0}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-slate-300 font-semibold px-2">
              {currentSlideIdx + 1} / {totalSlides}
            </span>
            <button
              onClick={() => setCurrentSlideIdx((prev) => Math.min(totalSlides - 1, prev + 1))}
              disabled={currentSlideIdx === totalSlides - 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-indigo-300">
              <Mic className="w-4 h-4 text-purple-400" />
              Presenter Speaker Notes (Slide {slide.slideNumber})
            </span>
            <span className="text-[11px] text-amber-400 font-normal">
              Spoken Pace: ~130 Words/Min
            </span>
          </div>
          <p className="text-sm text-slate-200 font-serif leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            "{slide.speakerNotes}"
          </p>
        </div>
      )}

      {/* Slide Thumbnails Strip */}
      <div className="max-w-4xl mx-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Slide Thumbnails ({totalSlides})
        </div>
        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
          {data.slides.map((s, idx) => {
            const isSelected = currentSlideIdx === idx;
            return (
              <button
                key={s.slideNumber}
                onClick={() => setCurrentSlideIdx(idx)}
                className={`p-2.5 rounded-xl border text-left shrink-0 w-44 transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-purple-500 shadow-md ring-1 ring-purple-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-mono font-bold">SLIDE {s.slideNumber}</span>
                  <span>{s.estimatedTalkingTime}</span>
                </div>
                <div className="text-xs font-semibold text-white truncate">{s.slideTitle}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
