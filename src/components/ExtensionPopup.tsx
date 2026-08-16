import { FC } from 'react';
import { UnveilScanResult } from '../types';
import { ShieldAlert, Sliders, CheckCircle2 } from 'lucide-react';
import { VajraPiercedLogo } from './VajraPiercedLogo';

interface ExtensionPopupProps {
  scanResult: UnveilScanResult;
  isArmed: boolean;
  onToggleArmed: () => void;
  onOpenDetailedMatrix: () => void;
}

export const ExtensionPopup: FC<ExtensionPopupProps> = ({
  scanResult,
  isArmed,
  onToggleArmed,
  onOpenDetailedMatrix,
}) => {
  const isHighRisk = scanResult.compositeRiskScore >= 50;

  return (
    <div className="w-80 bg-[#04091A]/95 border border-[#A08348]/45 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden font-exo text-[#F3F4F6] text-xs">
      
      {/* Extension Toolbar Header with Majestic Gold & Midnight Navy Lighting */}
      <div className="bg-gradient-to-r from-[#060E28] to-[#04091A] px-4 py-3.5 flex items-center justify-between border-b border-[#A08348]/30">
        <div className="flex items-center gap-2">
          <VajraPiercedLogo size="sm" showSubtitle={false} />
          <span className="text-[10px] text-[#E5C989] font-mono font-bold">v3.0.2</span>
        </div>

        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border backdrop-blur-md ${
          isArmed 
            ? 'bg-[#0A183D] text-[#E5C989] border-[#A08348]/60 shadow-[0_0_10px_rgba(160,131,72,0.3)]'
            : 'bg-amber-950/70 text-amber-200 border-amber-500/50'
        }`}>
          {isArmed ? 'ARMED' : 'PASSIVE'}
        </span>
      </div>

      {/* Target Domain Strip */}
      <div className="bg-black/40 px-4 py-2.5 border-b border-[#A08348]/20 flex items-center justify-between">
        <div className="truncate max-w-[170px]">
          <span className="text-[9px] text-slate-300 uppercase tracking-wider block font-mono font-semibold">Active Target</span>
          <span className="font-mono text-xs font-bold text-white truncate block">
            {scanResult.url.replace(/^https?:\/\//, '').split('/')[0]}
          </span>
        </div>

        {/* Popping Score Badge */}
        <div className={`px-2.5 py-1 rounded-xl text-[11px] font-mono font-extrabold border backdrop-blur-md ${
          isHighRisk 
            ? 'bg-rose-950/90 text-rose-200 border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]' 
            : 'bg-[#0A183D] text-[#E5C989] border-[#A08348]/60 shadow-[0_0_10px_rgba(160,131,72,0.3)]'
        }`}>
          {scanResult.compositeRiskScore}% RISK
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 space-y-3">
        {/* Status Callout */}
        <div className={`p-3 rounded-2xl border flex items-start gap-2.5 backdrop-blur-md ${
          isHighRisk 
            ? 'bg-rose-500/15 border-rose-500/35 text-rose-100 shadow-inner' 
            : 'bg-[#A08348]/20 border-[#A08348]/40 text-[#E5C989] shadow-inner'
        }`}>
          {isHighRisk ? (
            <ShieldAlert className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#E5C989] shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold text-xs text-white">
              {isHighRisk ? 'Fraud Signatures Detected' : 'Store Verified Authentic'}
            </div>
            <p className="text-[11px] text-slate-200 mt-0.5 leading-snug">
              {isHighRisk 
                ? 'Multiple scam vectors active (free email support, template policy, fake urgency).'
                : 'Passes anti-fraud filters with verified corporate identity.'
              }
            </p>
          </div>
        </div>

        {/* 5 Vector Quick Checklist */}
        <div className="space-y-1.5 bg-black/70 p-3 rounded-2xl border border-[#A08348]/25">
          <div className="text-[9px] font-bold font-mono uppercase text-[#E5C989] mb-1">
            Real-Time Heuristic Breakdown
          </div>

          {(Object.values(scanResult.vectors) as Array<{ id: string; name: string; riskLevel: string; score: number }>).map((vec) => (
            <div key={vec.id} className="flex items-center justify-between text-[11px]">
              <span className="text-slate-200 font-medium truncate max-w-[160px]">{vec.name}</span>
              <span className={`font-mono font-bold text-[9px] px-1.5 py-0.5 rounded ${
                vec.riskLevel === 'HIGH' || vec.riskLevel === 'CRITICAL'
                  ? 'text-rose-200 bg-rose-950/90 border border-rose-800/50'
                  : vec.riskLevel === 'MEDIUM'
                  ? 'text-amber-200 bg-amber-950/90 border border-amber-800/50'
                  : 'text-[#E5C989] bg-[#0A183D] border border-[#A08348]/50'
              }`}>
                {vec.score}/100
              </span>
            </div>
          ))}
        </div>

        {/* Interception Arm Switch */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="font-bold text-xs text-white">Checkout Interception</div>
            <div className="text-[10px] text-slate-300">Flag unauthorized fraud events</div>
          </div>
          <button
            onClick={onToggleArmed}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
              isArmed ? 'bg-[#A08348] shadow-[0_0_8px_#A08348]' : 'bg-slate-800'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
              isArmed ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      {/* Footer link to Matrix */}
      <div className="bg-black/80 px-4 py-2.5 border-t border-[#A08348]/25 flex items-center justify-between">
        <button
          onClick={onOpenDetailedMatrix}
          className="text-xs text-[#E5C989] hover:text-white font-bold flex items-center gap-1 font-mono transition-colors cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>View Heuristic Matrix</span>
        </button>
        <span className="text-[10px] text-[#E5C989] font-mono font-bold">Vajra Core</span>
      </div>
    </div>
  );
};
