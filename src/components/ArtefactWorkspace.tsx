import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  Printer, 
  Sparkles, 
  Video, 
  Linkedin, 
  Twitter, 
  ShieldAlert, 
  LayoutGrid, 
  FileText, 
  Presentation,
  CheckCircle2,
  Clock,
  Code
} from 'lucide-react';
import { GeneratedDeliverables, OutputFormatType } from '../types';
import { FORMAT_METADATA } from '../data/samplePresets';
import { VideoPackageViewer } from './renderers/VideoPackageViewer';
import { LinkedInPostViewer } from './renderers/LinkedInPostViewer';
import { TwitterThreadViewer } from './renderers/TwitterThreadViewer';
import { AdvisoryDocViewer } from './renderers/AdvisoryDocViewer';
import { InfographicViewer } from './renderers/InfographicViewer';
import { ExecutiveSummaryViewer } from './renderers/ExecutiveSummaryViewer';
import { PresentationViewer } from './renderers/PresentationViewer';

interface ArtefactWorkspaceProps {
  deliverables: GeneratedDeliverables;
  selectedFormats: OutputFormatType[];
  durationMs?: number;
  sourceTitle: string;
  sourceCategory: string;
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

export const ArtefactWorkspace: React.FC<ArtefactWorkspaceProps> = ({
  deliverables,
  selectedFormats,
  durationMs,
  sourceTitle,
  sourceCategory
}) => {
  // Determine available generated formats
  const availableFormats = selectedFormats.filter((fmt) => !!deliverables[fmt]);
  const [activeTab, setActiveTab] = useState<OutputFormatType>(
    availableFormats[0] || 'executive_summary'
  );

  const handleDownloadAllJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(deliverables, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `OmniTransform_Deliverables_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadMarkdownReport = () => {
    let md = `# OmniTransform Consolidated Deliverables Report
Source Title: ${sourceTitle}
Category: ${sourceCategory}
Generated on: ${new Date().toLocaleString()}
Engine: Gemini 2.5 Flash
--------------------------------------------------\n\n`;

    if (deliverables.executive_summary) {
      md += `## EXECUTIVE SUMMARY\n${deliverables.executive_summary.bluf}\n\n`;
    }
    if (deliverables.advisory) {
      md += `## ADVISORY BULLETIN\nID: ${deliverables.advisory.advisoryId}\nSeverity: ${deliverables.advisory.severity}\n\n`;
    }
    if (deliverables.linkedin) {
      md += `## LINKEDIN POST\n${deliverables.linkedin.headline}\n\n${deliverables.linkedin.bodyContent}\n\n`;
    }
    if (deliverables.twitter) {
      md += `## TWITTER THREAD\n${deliverables.twitter.tweets.map(t => t.content).join('\n---\n')}\n\n`;
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OmniTransform_Report_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-6">
      {/* Workspace Subheader & Telemetry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Transformation Synthesis Complete
            </span>
            {durationMs && (
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> {(durationMs / 1000).toFixed(2)}s turnaround
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Generated Communication Artefacts ({availableFormats.length} Active)
          </h2>
        </div>

        {/* Global Export Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadAllJson}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Download raw JSON payloads"
          >
            <Code className="w-3.5 h-3.5 text-indigo-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleDownloadMarkdownReport}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            title="Download consolidated Markdown report"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Export Markdown</span>
          </button>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
        {availableFormats.map((fmtKey) => {
          const meta = FORMAT_METADATA[fmtKey];
          const IconComp = ICONS[meta.iconName] || FileText;
          const isActive = activeTab === fmtKey;

          return (
            <button
              key={fmtKey}
              onClick={() => setActiveTab(fmtKey)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 shadow-sm ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{meta.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                Ready
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Viewer */}
      <div className="min-h-[500px]">
        {activeTab === 'video' && deliverables.video && (
          <VideoPackageViewer data={deliverables.video} />
        )}
        {activeTab === 'linkedin' && deliverables.linkedin && (
          <LinkedInPostViewer data={deliverables.linkedin} />
        )}
        {activeTab === 'twitter' && deliverables.twitter && (
          <TwitterThreadViewer data={deliverables.twitter} />
        )}
        {activeTab === 'advisory' && deliverables.advisory && (
          <AdvisoryDocViewer data={deliverables.advisory} />
        )}
        {activeTab === 'infographic' && deliverables.infographic && (
          <InfographicViewer data={deliverables.infographic} />
        )}
        {activeTab === 'executive_summary' && deliverables.executive_summary && (
          <ExecutiveSummaryViewer data={deliverables.executive_summary} />
        )}
        {activeTab === 'presentation' && deliverables.presentation && (
          <PresentationViewer data={deliverables.presentation} />
        )}
      </div>
    </div>
  );
};
