import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Flag 
} from 'lucide-react';
import { ExecutiveSummary } from '../../types';

interface ExecutiveSummaryViewerProps {
  data: ExecutiveSummary;
}

export const ExecutiveSummaryViewer: React.FC<ExecutiveSummaryViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `# ${data.briefingTitle}
Organization: ${data.organization} | Date: ${data.date}

## BOTTOM LINE UP FRONT (BLUF)
${data.bluf}

## CONTEXT & BACKGROUND
${data.contextAndBackground}

## CORE KEY FINDINGS
${data.coreKeyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

## STRATEGIC IMPACT ANALYSIS
${data.strategicImpactAnalysis}

## RISK & OPPORTUNITY MATRIX
${data.riskAndOpportunityMatrix.map(r => `[${r.domain}] (${r.severityRating})
- Risk: ${r.riskDescription}
- Opportunity: ${r.opportunityOrUpside}`).join('\n\n')}

## RESOURCE & BUDGET IMPLICATIONS
${data.resourceAndBudgetImplications}

## STRATEGIC RECOMMENDATIONS
${data.strategicRecommendations.map(rec => `Priority ${rec.priority}: ${rec.recommendation}
Impact: ${rec.businessImpact} | Timeline: ${rec.timeline} | Effort: ${rec.estimatedEffort}`).join('\n\n')}

## DECISION REQUIRED
${data.decisionRequired}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Executive Briefing & C-Suite BLUF</h3>
            <p className="text-xs text-slate-400">Concise strategic assessment designed for board and leadership decisions</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Briefing' : 'Copy Text'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Executive Brief</span>
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Title Header */}
        <div className="border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
            <span>Prepared For: <strong className="text-white">{data.organization}</strong></span>
            <span>Date: <strong className="text-white">{data.date}</strong></span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {data.briefingTitle}
          </h2>
        </div>

        {/* BLUF Block */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/40 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
            <Flag className="w-4 h-4 text-indigo-400" />
            Bottom Line Up Front (BLUF)
          </div>
          <p className="text-base sm:text-lg font-serif font-medium text-white leading-relaxed">
            {data.bluf}
          </p>
        </div>

        {/* Context & Background */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Context & Background
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {data.contextAndBackground}
          </p>
        </div>

        {/* Core Key Findings */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Core Strategic Findings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.coreKeyFindings.map((finding, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Impact Analysis */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Strategic Impact Analysis
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {data.strategicImpactAnalysis}
          </p>
        </div>

        {/* Risk & Opportunity Matrix */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Risk & Opportunity Matrix
          </h4>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950/90 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-3">Strategic Domain</th>
                  <th className="p-3">Risk Exposure</th>
                  <th className="p-3">Strategic Opportunity</th>
                  <th className="p-3">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                {data.riskAndOpportunityMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white whitespace-nowrap">{item.domain}</td>
                    <td className="p-3 text-slate-300">{item.riskDescription}</td>
                    <td className="p-3 text-emerald-400/90">{item.opportunityOrUpside}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.severityRating === 'HIGH' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        item.severityRating === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {item.severityRating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resource & Budget Implications */}
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-white mb-1">Resource & Budget Allocation</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.resourceAndBudgetImplications}
            </p>
          </div>
        </div>

        {/* Prioritized Strategic Recommendations */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Prioritized Action Recommendations
          </h4>
          <div className="space-y-3">
            {data.strategicRecommendations.map((rec) => (
              <div key={rec.priority} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-1 rounded bg-indigo-600 text-white text-xs font-bold font-mono shrink-0">
                    P{rec.priority}
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{rec.recommendation}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">Impact: {rec.businessImpact}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3 text-amber-400" /> {rec.timeline}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium">
                    Effort: {rec.estimatedEffort}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Required Sign-off Block */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-950 border border-amber-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
              Required Executive Decision
            </h5>
            <p className="text-xs text-slate-200 leading-relaxed">
              {data.decisionRequired}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
