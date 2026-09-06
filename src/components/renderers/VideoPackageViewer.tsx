import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Film, 
  Camera, 
  Music, 
  Mic, 
  Subtitles, 
  Volume2, 
  Copy, 
  Check, 
  Sparkles,
  Clock
} from 'lucide-react';
import { VideoPackage } from '../../types';

interface VideoPackageViewerProps {
  data: VideoPackage;
}

export const VideoPackageViewer: React.FC<VideoPackageViewerProps> = ({ data }) => {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  // Simple auto-advance for teleprompter demo
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setTimeout(() => {
        setActiveSceneIdx((prev) => (prev + 1) % data.scenes.length);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeSceneIdx, data.scenes.length]);

  const activeScene = data.scenes[activeSceneIdx] || data.scenes[0];

  const handleCopyFullScript = () => {
    const script = `TITLE: ${data.title}
DURATION: ${data.estimatedTotalDuration}
PACING: ${data.pacingStyle}
VOICEOVER: ${data.voiceoverTone}

SCENES:
${data.scenes
  .map(
    (s) => `[SCENE ${s.sceneNumber}: ${s.sceneTitle} (${s.duration})]
VISUAL: ${s.visualRecommendation}
CAMERA: ${s.cameraAngle}
ON-SCREEN TEXT: ${s.onScreenText}
NARRATION: "${s.narrationScript}"
AUDIO FX: ${s.soundDesignFx}
`
  )
  .join('\n')}`;

    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                <Film className="w-3 h-3" /> Complete Video Production Package
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {data.estimatedTotalDuration}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{data.title}</h3>
            <p className="text-xs text-slate-300 mt-1 italic font-serif">"{data.hookHeadline}"</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFullScript}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Full Script' : 'Copy Script'}</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause Teleprompter' : 'Play Teleprompter'}</span>
            </button>
          </div>
        </div>

        {/* Audio-Visual Production Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Mic className="w-3 h-3 text-rose-400" /> Voiceover Tone
            </span>
            <div className="font-semibold text-white mt-0.5 truncate">{data.voiceoverTone}</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Music className="w-3 h-3 text-teal-400" /> Sound & Music
            </span>
            <div className="font-semibold text-white mt-0.5 truncate">{data.musicMood}</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-amber-400" /> Pacing Target
            </span>
            <div className="font-semibold text-white mt-0.5 truncate">{data.pacingStyle}</div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Target Platform
            </span>
            <div className="font-semibold text-white mt-0.5 truncate">{data.targetPlatform}</div>
          </div>
        </div>
      </div>

      {/* Interactive Storyboard Scene Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Teleprompter / Active Scene Spotlight (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold uppercase rounded-bl-xl border-b border-l border-rose-500/30">
            SCENE {activeScene.sceneNumber} OF {data.scenes.length} • {activeScene.duration}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono font-bold">
                SCENE {activeScene.sceneNumber}
              </span>
              <h4 className="text-base font-bold text-white">{activeScene.sceneTitle}</h4>
            </div>

            {/* Virtual Monitor / On-Screen Preview Canvas */}
            <div className="relative aspect-video rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-4 flex flex-col justify-between mb-4 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3 text-indigo-400" /> {activeScene.cameraAngle}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[10px] animate-pulse">
                  ● REC
                </span>
              </div>

              {/* Simulated On-Screen Text Overlay */}
              <div className="my-auto text-center px-4">
                <div className="inline-block px-3 py-1.5 rounded-lg bg-slate-900/90 border border-indigo-500/40 text-xs font-bold text-indigo-200 tracking-wide shadow-lg uppercase">
                  <Subtitles className="w-3.5 h-3.5 inline mr-1.5 text-indigo-400" />
                  {activeScene.onScreenText}
                </div>
                <div className="text-[11px] text-slate-400 mt-2 italic max-w-md mx-auto">
                  Visual Cue: {activeScene.visualRecommendation}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-teal-400" /> FX: {activeScene.soundDesignFx}
                </span>
                <span>Scene {activeScene.sceneNumber}/{data.scenes.length}</span>
              </div>
            </div>

            {/* Teleprompter Spoken Script */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-rose-400" /> Spoken Narration Script
              </div>
              <p className="text-base text-amber-100 font-serif leading-relaxed">
                "{activeScene.narrationScript}"
              </p>
            </div>
          </div>

          {/* Scene Navigation Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-4">
            <button
              onClick={() => setActiveSceneIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeSceneIdx === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs text-white transition-colors"
            >
              Previous Scene
            </button>

            <div className="flex items-center gap-1">
              {data.scenes.map((s, idx) => (
                <button
                  key={s.sceneNumber}
                  onClick={() => setActiveSceneIdx(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                    activeSceneIdx === idx
                      ? 'bg-rose-600 text-white scale-110 shadow-md shadow-rose-600/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.sceneNumber}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveSceneIdx((prev) => Math.min(data.scenes.length - 1, prev + 1))}
              disabled={activeSceneIdx === data.scenes.length - 1}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs text-white transition-colors"
            >
              Next Scene
            </button>
          </div>
        </div>

        {/* Right: Full Storyboard Scene List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto custom-scrollbar pr-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between pb-1">
            <span>Storyboard Scenes ({data.scenes.length})</span>
            <span className="text-[11px] text-slate-500">Click to preview</span>
          </div>

          {data.scenes.map((scene, idx) => {
            const isCurrent = activeSceneIdx === idx;
            return (
              <div
                key={scene.sceneNumber}
                onClick={() => setActiveSceneIdx(idx)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-slate-800/90 border-rose-500 shadow-md ring-1 ring-rose-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">
                    Scene {scene.sceneNumber}: {scene.sceneTitle}
                  </span>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {scene.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 italic mb-2">
                  "{scene.narrationScript}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60 pt-1.5">
                  <span className="truncate max-w-[180px]">📹 {scene.cameraAngle}</span>
                  <span className="truncate max-w-[140px] text-indigo-400">🖼️ {scene.onScreenText}</span>
                </div>
              </div>
            );
          })}

          {/* Call to Action Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950/60 border border-indigo-500/30 mt-4">
            <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider mb-1">
              Production Call-To-Action (Outro)
            </div>
            <p className="text-xs text-white font-medium">{data.callToAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
