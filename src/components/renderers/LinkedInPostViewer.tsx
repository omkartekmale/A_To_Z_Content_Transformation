import React, { useState } from 'react';
import { 
  Linkedin, 
  Copy, 
  Check, 
  ThumbsUp, 
  MessageSquare, 
  Repeat, 
  Send, 
  Globe, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { LinkedInPost } from '../../types';

interface LinkedInPostViewerProps {
  data: LinkedInPost;
}

export const LinkedInPostViewer: React.FC<LinkedInPostViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [showFull, setShowFull] = useState(true);

  const handleCopy = () => {
    const fullText = `${data.headline}

${data.hookLine}

${data.bodyContent}

Key Takeaways:
${data.bulletTakeaways.map(b => `• ${b}`).join('\n')}

${data.callToAction}

${data.hashtags.join(' ')}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Realistic LinkedIn Feed Post Simulator (8 cols) */}
      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-slate-100">
        {/* Post Author / Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-sm">
                OT
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">OmniTransform Executive Voice</span>
                <span className="text-[11px] text-slate-400">• 1st</span>
              </div>
              <div className="text-xs text-slate-400 leading-tight">
                Enterprise Strategic Transformation & Intelligence
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                <span>Just now</span>
                <span>•</span>
                <Globe className="w-3 h-3 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1">
              <Linkedin className="w-3 h-3" /> LinkedIn Post
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Copy formatted post to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Headline & Hook */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-2">
            {data.headline}
          </h3>
          <p className="text-sm font-semibold text-blue-300">
            {data.hookLine}
          </p>
        </div>

        {/* Post Body */}
        <div className="text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-line border-t border-slate-800/80 pt-3">
          <p>{data.bodyContent}</p>

          {data.bulletTakeaways && data.bulletTakeaways.length > 0 && (
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1.5 my-3">
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                Strategic Takeaways
              </div>
              {data.bulletTakeaways.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {data.callToAction && (
            <p className="text-sm font-medium text-slate-100 pt-1">
              {data.callToAction}
            </p>
          )}

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {data.hashtags.map((tag, idx) => (
              <span key={idx} className="text-xs font-medium text-blue-400 hover:underline cursor-pointer">
                {tag.startsWith('#') ? tag : `#${tag}`}
              </span>
            ))}
          </div>
        </div>

        {/* Suggested Visual Asset Embed in Feed */}
        {data.suggestedVisualAsset && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border border-slate-800 flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Recommended Carousel / Graphic Asset</span>
                <span className="text-[10px] text-teal-400 font-mono">1200 x 627 px</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {data.suggestedVisualAsset}
              </p>
            </div>
          </div>
        )}

        {/* Simulated Social Action Buttons */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-4 text-xs text-slate-400">
          <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800">
            <ThumbsUp className="w-4 h-4" /> <span>Like</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800">
            <MessageSquare className="w-4 h-4" /> <span>Comment</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800">
            <Repeat className="w-4 h-4" /> <span>Repost</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800">
            <Send className="w-4 h-4" /> <span>Send</span>
          </button>
        </div>
      </div>

      {/* Right: Copywriting Metrics & Publishing Telemetry (4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        {/* Analytics Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Copywriting Metrics
          </h4>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Character Count</span>
              <div className="font-mono font-bold text-base text-white mt-1">
                {data.characterCount || data.bodyContent.length}
              </div>
              <span className="text-[10px] text-emerald-400">Optimal (under 3000)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[11px]">Est. Read Time</span>
              <div className="font-mono font-bold text-base text-white mt-1">
                {data.estimatedReadTime || '2 min'}
              </div>
              <span className="text-[10px] text-indigo-400">High engagement</span>
            </div>
          </div>

          {data.engagementQuestion && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider mb-1">
                First Comment Engagement Anchor
              </div>
              <p className="text-xs text-slate-300 italic">
                "{data.engagementQuestion}"
              </p>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted LinkedIn Post'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
