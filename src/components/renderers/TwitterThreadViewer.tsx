import React, { useState } from 'react';
import { 
  Twitter, 
  Copy, 
  Check, 
  MessageCircle, 
  Repeat2, 
  Heart, 
  Bookmark, 
  Share, 
  Sparkles, 
  Clock, 
  ImageIcon 
} from 'lucide-react';
import { TwitterThread } from '../../types';

interface TwitterThreadViewerProps {
  data: TwitterThread;
}

export const TwitterThreadViewer: React.FC<TwitterThreadViewerProps> = ({ data }) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTweetIdx, setCopiedTweetIdx] = useState<number | null>(null);

  const handleCopyAll = () => {
    const threadText = data.tweets
      .map((t) => t.content)
      .join('\n\n---\n\n');

    navigator.clipboard.writeText(threadText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedTweetIdx(idx);
    setTimeout(() => setCopiedTweetIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1">
              <Twitter className="w-3 h-3" /> Twitter / X Thread
            </span>
            <span className="text-xs text-slate-400">
              {data.totalTweets || data.tweets.length} Tweets in Thread
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{data.threadTopic}</h3>
        </div>

        <div className="flex items-center gap-3">
          {data.recommendedPostTime && (
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{data.recommendedPostTime}</span>
            </div>
          )}

          <button
            onClick={handleCopyAll}
            className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-sky-600/20"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? 'Copied Full Thread' : 'Copy Full Thread'}</span>
          </button>
        </div>
      </div>

      {/* Thread Stream */}
      <div className="max-w-2xl mx-auto space-y-0 relative">
        {data.tweets.map((tweet, idx) => {
          const isLast = idx === data.tweets.length - 1;
          const charCount = tweet.content.length;
          const isOverLimit = charCount > 280;

          return (
            <div key={tweet.tweetNumber || idx} className="relative flex items-start gap-3 pb-6 group">
              {/* Connector Vertical Line */}
              {!isLast && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-800 group-hover:bg-slate-700 transition-colors" />
              )}

              {/* Avatar */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border-2 border-sky-500/40 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-md">
                {tweet.tweetNumber || idx + 1}
              </div>

              {/* Tweet Content Card */}
              <div className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-700/90 rounded-2xl p-4 shadow-lg transition-all">
                {/* User & Char telemetry */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-white">OmniTransform</span>
                    <span className="text-[11px] text-slate-400">@omnitransform</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-sky-400 font-mono font-semibold">
                      {tweet.tweetNumber}/{data.tweets.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      isOverLimit
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}>
                      {charCount}/280 chars
                    </span>

                    <button
                      onClick={() => handleCopySingle(tweet.content, idx)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Copy this tweet"
                    >
                      {copiedTweetIdx === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Tweet text */}
                <p className="text-sm text-slate-100 whitespace-pre-line leading-relaxed mb-3">
                  {tweet.content}
                </p>

                {/* Suggested Visual */}
                {tweet.visualSuggestion && (
                  <div className="mb-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                    <ImageIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">Visual: {tweet.visualSuggestion}</span>
                  </div>
                )}

                {/* Action icons bar */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/60 max-w-sm">
                  <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> <span className="text-[11px]">18</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                    <Repeat2 className="w-3.5 h-3.5" /> <span className="text-[11px]">42</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-rose-400 transition-colors">
                    <Heart className="w-3.5 h-3.5" /> <span className="text-[11px]">256</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                    <Share className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
