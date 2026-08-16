import { FC, useState } from 'react';
import { UnveilScanResult, HeuristicVectorResult } from '../types';
import { 
  ShieldAlert, 
  X, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Code, 
  FileText, 
  Mail, 
  Server, 
  Clock, 
  Share2, 
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Ban,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VajraPiercedLogo } from './VajraPiercedLogo';

interface UnveilWarningOverlayProps {
  scanResult: UnveilScanResult;
  isOpen: boolean;
  onClose: () => void;
  onBypass: () => void;
  onOpenAiAudit?: () => void;
}

export const UnveilWarningOverlay: FC<UnveilWarningOverlayProps> = ({
  scanResult,
  isOpen,
  onClose,
  onBypass,
  onOpenAiAudit,
}) => {
  const [showDetailedEvidence, setShowDetailedEvidence] = useState(false);
  const [showFalsePositiveExplanation, setShowFalsePositiveExplanation] = useState(false);
  const [hasAborted, setHasAborted] = useState(false);

  if (!isOpen) return null;

  const handleAbort = () => {
    setHasAborted(true);
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#A08348', '#E5C989', '#0A183D', '#ffffff'],
    });
    setTimeout(() => {
      onClose();
      setHasAborted(false);
    }, 2400);
  };

  const getVectorIcon = (id: string) => {
    switch (id) {
      case 'global_blacklist':
        return <Ban className="w-4 h-4 text-rose-400" />;
      case 'support_contact':
        return <Mail className="w-4 h-4 text-rose-400" />;
      case 'infrastructure':
        return <Server className="w-4 h-4 text-amber-400" />;
      case 'fake_reviews':
      case 'policy_plagiarism':
        return <Star className="w-4 h-4 text-yellow-400" />;
      case 'behavioral':
        return <Clock className="w-4 h-4 text-orange-400" />;
      case 'traffic_origin':
        return <Share2 className="w-4 h-4 text-[#E5C989]" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div 
      id="unveil-interception-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 font-exo"
    >
      <div 
        id="unveil-modal-card"
        className="bg-gradient-to-b from-[#060E28] via-[#04091A] to-[#020510] text-[#F3F4F6] w-full max-w-2xl rounded-3xl shadow-[0_0_50px_rgba(225,29,72,0.35)] border border-rose-500/50 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-rose-950/90 via-[#0A183D] to-[#04091A] px-6 py-4 flex items-center justify-between border-b border-rose-500/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/25 backdrop-blur-md flex items-center justify-center border border-rose-400/50 shadow-[0_0_15px_rgba(244,63,94,0.35)]">
              <ShieldAlert className="w-5 h-5 text-rose-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <VajraPiercedLogo size="sm" showSubtitle={false} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/25 text-rose-200 px-2 py-0.5 rounded-full border border-rose-500/40">
                  INTERCEPTOR
                </span>
                <span className="text-xs text-slate-300 font-mono font-semibold">
                  {scanResult.url.replace(/^https?:\/\//, '').split('/')[0]}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight font-vajra mt-0.5">
                High-Risk E-Commerce Scam Intercepted
              </h2>
            </div>
          </div>

          <button
            id="close-unveil-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {hasAborted ? (
            <div className="py-8 text-center space-y-3 bg-[#0A183D]/60 rounded-2xl border border-[#A08348]/40 p-6 backdrop-blur-md">
              <div className="w-14 h-14 bg-[#A08348]/25 text-[#E5C989] rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(160,131,72,0.4)] border border-[#A08348]/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Transaction Safely Guarded</h3>
              <p className="text-slate-200 text-xs max-w-md mx-auto leading-relaxed">
                Payment credentials were never transmitted to this disposable storefront. Zero charges made to your account.
              </p>
            </div>
          ) : (
            <>
              {/* Glassmorphic Risk Metric Banner */}
              <div className="bg-rose-500/15 border border-rose-500/35 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-lg shadow-inner">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-rose-200 uppercase tracking-wide">
                      Heuristic Risk Index
                    </span>
                  </div>
                  <p className="text-slate-100 text-xs font-normal leading-relaxed">
                    {scanResult.summary}
                  </p>
                </div>

                {/* Score Badge */}
                <div className="flex flex-col items-center justify-center bg-[#0A183D] border border-rose-500/40 px-4 py-2.5 rounded-2xl shadow-[0_0_15px_rgba(244,63,94,0.3)] shrink-0 backdrop-blur-xl">
                  <span className="text-[10px] font-mono font-bold text-slate-300 uppercase">Threat Score</span>
                  <span className="text-2xl font-black text-rose-400 font-mono drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]">
                    {scanResult.compositeRiskScore}%
                  </span>
                </div>
              </div>

              {/* Multi-Vector Heuristic Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                    Detected Signals
                  </h4>
                  <button
                    id="toggle-evidence-btn"
                    onClick={() => setShowDetailedEvidence(!showDetailedEvidence)}
                    className="text-xs font-mono font-bold text-[#E5C989] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{showDetailedEvidence ? 'Hide Technical DOM Log' : 'Inspect Technical DOM Log'}</span>
                    {showDetailedEvidence ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {(Object.values(scanResult.vectors) as HeuristicVectorResult[]).map((vec) => (
                    <div 
                      key={vec.id}
                      className={`p-3.5 rounded-2xl border transition-all backdrop-blur-md ${
                        vec.riskLevel === 'HIGH' || vec.riskLevel === 'CRITICAL'
                          ? 'bg-rose-500/15 border-rose-500/30 text-rose-100 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
                          : vec.riskLevel === 'MEDIUM'
                          ? 'bg-amber-500/15 border-amber-500/30 text-amber-100'
                          : 'bg-[#060E26]/80 border-[#A08348]/20 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-lg bg-black/60 border border-white/[0.08]">
                            {getVectorIcon(vec.id)}
                          </div>
                          <span className="text-xs font-bold text-white">{vec.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                          vec.riskLevel === 'HIGH' ? 'bg-rose-950/90 text-rose-200 border-rose-700/60' :
                          vec.riskLevel === 'MEDIUM' ? 'bg-amber-950/90 text-amber-200 border-amber-700/60' : 'bg-[#0A183D] text-[#E5C989] border-[#A08348]/50'
                        }`}>
                          {vec.score}/100
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {vec.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical DOM snippets */}
              {showDetailedEvidence && (
                <div className="bg-black/80 text-slate-100 rounded-2xl p-4 space-y-3 font-mono text-xs border border-[#A08348]/30 animate-in fade-in duration-150 backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-[#A08348]/20 pb-2">
                    <div className="flex items-center gap-2 text-[#E5C989] font-bold">
                      <Code className="w-4 h-4" />
                      <span>Vajra DOM Forensic Citations</span>
                    </div>
                    <span className="text-[10px] text-slate-400">v3.0 Client Engine</span>
                  </div>

                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {scanResult.forensicCitations.map((cit, idx) => (
                      <div key={idx} className="bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.06] space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#E5C989] font-bold">[{cit.category}]</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-mono font-bold ${
                            cit.severity === 'danger' ? 'bg-rose-950/90 text-rose-200' : 'bg-amber-950/90 text-amber-200'
                          }`}>
                            {cit.severity}
                          </span>
                        </div>
                        <p className="text-slate-200 text-xs font-sans">{cit.message}</p>
                        {cit.codeSnippet && (
                          <pre className="text-[10px] text-emerald-300 bg-black/90 p-1.5 rounded-lg overflow-x-auto">
                            {cit.codeSnippet}
                          </pre>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* False Positive Protection Explanation */}
              <div className="border-t border-[#A08348]/25 pt-3">
                <button
                  id="toggle-false-positive-info-btn"
                  onClick={() => setShowFalsePositiveExplanation(!showFalsePositiveExplanation)}
                  className="text-xs text-slate-300 hover:text-white font-medium flex items-center justify-between w-full cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 font-mono font-semibold">
                    <Zap className="w-3.5 h-3.5 text-[#E5C989]" />
                    How Vajra ensures legitimate clearance sales are not wrongfully flagged
                  </span>
                  {showFalsePositiveExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showFalsePositiveExplanation && (
                  <div className="mt-2.5 bg-[#060E26]/80 border border-[#A08348]/30 rounded-xl p-3 text-xs text-slate-200 space-y-1.5 backdrop-blur-md">
                    <p className="text-slate-200">
                      Legitimate retailers running genuine 50-70% clearance sales are protected by our <strong className="text-[#E5C989]">Immunity Filter</strong>. Vajra only flags storefronts where severe infrastructure risks intersect with unverified support channels and cloned legal boilerplate.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Action Buttons */}
        {!hasAborted && (
          <div className="bg-black/80 border-t border-[#A08348]/25 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-xl">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onOpenAiAudit && (
                <button
                  id="btn-ai-audit-from-modal"
                  onClick={() => {
                    onClose();
                    onOpenAiAudit();
                  }}
                  className="text-xs font-bold text-[#E5C989] bg-[#0A183D] hover:bg-[#112250] px-3.5 py-2.5 rounded-xl border border-[#A08348]/50 flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E5C989]" />
                  <span>AI Forensic Audit</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                id="btn-bypass-unveil"
                onClick={onBypass}
                className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 transition-colors font-mono cursor-pointer"
              >
                Bypass & Proceed
              </button>

              <button
                id="btn-abort-checkout"
                onClick={handleAbort}
                className="w-full sm:w-auto bg-gradient-to-r from-[#A08348] via-[#E5C989] to-[#A08348] hover:from-[#E5C989] hover:to-[#A08348] text-[#04091A] text-xs font-black px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(160,131,72,0.4)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] border border-[#A08348] cursor-pointer"
              >
                <span>Abort Checkout & Protect Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
