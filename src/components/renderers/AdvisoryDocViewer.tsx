import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Copy, 
  Check, 
  Printer, 
  AlertTriangle, 
  Building, 
  Calendar, 
  UserCheck, 
  CheckSquare, 
  Square,
  FileText,
  BadgeAlert
} from 'lucide-react';
import { AdvisoryDoc } from '../../types';

interface AdvisoryDocViewerProps {
  data: AdvisoryDoc;
}

export const AdvisoryDocViewer: React.FC<AdvisoryDocViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const handleCopyMarkdown = () => {
    const text = `# ${data.title}
ADVISORY ID: ${data.advisoryId} | SEVERITY: ${data.severity} | CLASSIFICATION: ${data.classificationLevel}
ISSUING BODY: ${data.issuingBody} | DATE: ${data.releaseDate}
TARGET AUDIENCE: ${data.targetAudience}

## 1. EXECUTIVE SUMMARY
${data.executiveSummary}

## 2. SITUATION & THREAT ANALYSIS
${data.threatOrSituationAnalysis}

## 3. IMPACTED ASSETS / STAKEHOLDERS
${data.impactedSystemsOrStakeholders.map(s => `- ${s}`).join('\n')}

## 4. INDICATORS OR SYMPTOMS
${data.indicatorsOrSymptoms.map(i => `- ${i}`).join('\n')}

## 5. ACTIONABLE MITIGATION PROTOCOL
${data.mitigationProtocol.map(m => `[STEP ${m.stepNumber}: ${m.actionTitle}] (${m.urgency})
Assigned To: ${m.assignedRole}
${m.description}`).join('\n\n')}

## 6. VERIFICATION PROCEDURES
${data.verificationProcedures.map(v => `- [ ] ${v}`).join('\n')}

## 7. COMPLIANCE & LEGAL MANDATE
${data.complianceLegalNote}

CONTACT: ${data.officialPointOfContact}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severityColor = 
    data.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
    data.severity === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
    data.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
    'bg-blue-500/20 text-blue-400 border-blue-500/40';

  return (
    <div className="space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="flex items-center justify-between no-print bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Enterprise & Government Advisory Bulletin</h3>
            <p className="text-xs text-slate-400">Standardized regulatory and incident response format</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Advisory'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-amber-600/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Bulletin</span>
          </button>
        </div>
      </div>

      {/* Official Structured Advisory Document Body */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Header Block */}
        <div className="border-b-2 border-slate-700 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {data.advisoryId}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${severityColor}`}>
                SEVERITY: {data.severity}
              </span>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded">
              {data.classificationLevel.replace('_', ' ')}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
            {data.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>Issuing Body: <strong className="text-white">{data.issuingBody}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>Date: <strong className="text-white">{data.releaseDate}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Target: <strong className="text-white">{data.targetAudience}</strong></span>
            </div>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <div>
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <BadgeAlert className="w-4 h-4" /> 1. Executive Summary
          </h4>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans">
            {data.executiveSummary}
          </div>
        </div>

        {/* 2. Situation / Threat Analysis */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" /> 2. Threat & Situation Analysis
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {data.threatOrSituationAnalysis}
          </p>
        </div>

        {/* 3. Impacted Systems & Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
            <h5 className="text-xs font-bold text-white mb-2">Impacted Systems & Entities</h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {data.impactedSystemsOrStakeholders.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
            <h5 className="text-xs font-bold text-white mb-2">Indicators / Telltale Symptoms</h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {data.indicatorsOrSymptoms.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Actionable Mitigation Checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckSquare className="w-4 h-4" /> 4. Actionable Mitigation Protocol
            </h4>
            <span className="text-[11px] text-slate-400">
              Check off tasks as completed by response teams
            </span>
          </div>

          <div className="space-y-3">
            {data.mitigationProtocol.map((step) => {
              const isDone = completedSteps[step.stepNumber];
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => toggleStep(step.stepNumber)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400 line-through'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-indigo-400">
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            Step {step.stepNumber}: {step.actionTitle}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            Assigned: {step.assignedRole}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 whitespace-nowrap">
                      {step.urgency.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Verification Procedures */}
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            5. Verification & Validation Procedures
          </h4>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2">
            {data.verificationProcedures.map((proc, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-emerald-400 font-mono font-bold">[{idx + 1}]</span>
                <span>{proc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Compliance Mandate & Official Contact */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
          <div>
            <span className="font-bold text-white block mb-1">Compliance & Legal Mandate:</span>
            <p className="leading-relaxed">{data.complianceLegalNote}</p>
          </div>
          <div>
            <span className="font-bold text-white block mb-1">Official Point of Contact:</span>
            <p className="text-indigo-400 font-mono">{data.officialPointOfContact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
