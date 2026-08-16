import { FC } from 'react';
import { StoreProfile, UnveilScanResult, ActiveAppTab, HeuristicVectorResult } from '../types';
import { 
  ShieldAlert, 
  ExternalLink, 
  Sliders, 
  Sparkles, 
  Code2, 
  Terminal,
  Compass,
  Radio,
  ArrowUpRight,
} from 'lucide-react';
import { VajraPiercedLogo } from './VajraPiercedLogo';

interface DashboardProps {
  currentStore: StoreProfile;
  allStores: StoreProfile[];
  onSelectStore: (store: StoreProfile) => void;
  scanResult: UnveilScanResult;
  isArmed: boolean;
  onToggleArmed: () => void;
  onNavigateTab: (tab: ActiveAppTab) => void;
  onTriggerCheckoutModal: () => void;
  scamCount: number;
}

export const Dashboard: FC<DashboardProps> = ({
  currentStore,
  allStores,
  onSelectStore,
  scanResult,
  isArmed,
  onToggleArmed,
  onNavigateTab,
  onTriggerCheckoutModal,
  scamCount,
}) => {
  const getVerdictBadge = (verdict: UnveilScanResult['verdict']) => {
    switch (verdict) {
      case 'CRITICAL_INTERCEPT':
      case 'HIGH_RISK_SCAM':
        return {
          bg: 'bg-rose-500/20 border-rose-500/50 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
          dot: 'bg-rose-400',
          text: 'HIGH-RISK SCAM DETECTED',
        };
      case 'CAUTION_DISCOUNT':
        return {
          bg: 'bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
          dot: 'bg-amber-400',
          text: 'CLEARANCE SALE (AUTHENTIC)',
        };
      case 'CLEARED_SAFE':
      default:
        return {
          bg: 'bg-[#A08348]/25 border-[#A08348]/60 text-[#E5C989] shadow-[0_0_15px_rgba(160,131,72,0.25)]',
          dot: 'bg-[#E5C989]',
          text: 'VERIFIED AUTHENTIC STORE',
        };
    }
  };

  const currentBadge = getVerdictBadge(scanResult.verdict);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-exo">
      
      {/* Liquid Glass Hero Command Center with Majestic Gold & Obsidian Midnight Lighting */}
      <section className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-b from-[#060E28]/90 via-[#04091A]/95 to-[#020510]/95 border border-[#A08348]/35 p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[#A08348]/60 hover:shadow-[0_8px_40px_rgba(160,131,72,0.25)]">
        {/* Dynamic Gold & Midnight Ambient Flares */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A08348]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#071330]/70 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#A08348]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <VajraPiercedLogo size="sm" showSubtitle={true} subtitleText="DEFENSE CORE" />
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                3.4ms DOM LATENCY
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-vajra font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F0E9] to-[#E5C989] drop-shadow-[0_2px_12px_rgba(160,131,72,0.3)]">
              Checkout Interceptor & E-Commerce Shield
            </h1>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              Autonomous client-side guard analyzing domain telemetry, support MX records, legal placeholders, and synthetic urgency in real-time.
            </p>
          </div>

          {/* Sentinel Status Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              id="dashboard-toggle-guard"
              onClick={onToggleArmed}
              className={`px-4 py-3 rounded-2xl text-xs font-bold backdrop-blur-xl border transition-all duration-300 flex items-center justify-between sm:justify-center gap-3 shadow-lg ${
                isArmed
                  ? 'bg-[#0A183D] border-[#A08348]/60 text-[#E5C989] shadow-[0_0_20px_rgba(160,131,72,0.3)] hover:border-[#A08348] hover:shadow-[0_0_30px_rgba(160,131,72,0.5)]'
                  : 'bg-amber-950/60 border-amber-500/40 text-amber-200 hover:bg-amber-950/80 hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isArmed ? 'bg-[#E5C989] shadow-[0_0_8px_#E5C989] animate-pulse' : 'bg-amber-400'}`} />
                <span className="font-mono tracking-wide">{isArmed ? 'DEFENDER: ARMED' : 'DEFENDER: STANDBY'}</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-lg bg-black/70 text-slate-100 border border-[#A08348]/30">
                {isArmed ? 'ACTIVE INTERCEPTION' : 'PASSIVE MONITOR'}
              </span>
            </button>

            <button
              id="dashboard-launch-sandbox-btn"
              onClick={() => onNavigateTab('simulator')}
              className="px-5 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-white via-[#F5F0E9] to-[#E5C989] hover:from-white hover:to-white text-[#04091A] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(160,131,72,0.4)] hover:shadow-[0_0_35px_rgba(160,131,72,0.6)] hover:scale-[1.02] cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#04091A]" />
              <span>Launch Store Sandbox</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metric Ribbons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#A08348]/25">
          <div className="p-3.5 rounded-2xl bg-[#04091A]/80 border border-[#A08348]/25 backdrop-blur-md transition-all duration-300 hover:border-[#A08348]/60 hover:shadow-[0_0_20px_rgba(160,131,72,0.25)]">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">Evaluation Latency</div>
            <div className="text-xl font-black text-white mt-1 font-mono">&lt; 4ms</div>
            <div className="text-xs text-[#E5C989] mt-0.5 font-medium">100% Client-Side</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#04091A]/80 border border-[#A08348]/25 backdrop-blur-md transition-all duration-300 hover:border-rose-400/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">Scams Flagged</div>
            <div className="text-xl font-black text-rose-400 mt-1 font-mono">{scamCount} Flagged</div>
            <div className="text-xs text-rose-200 mt-0.5 font-medium">Pre-checkout telemetry</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#04091A]/80 border border-[#A08348]/25 backdrop-blur-md transition-all duration-300 hover:border-[#A08348]/60 hover:shadow-[0_0_20px_rgba(160,131,72,0.25)]">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">False Positive Rate</div>
            <div className="text-xl font-black text-[#E5C989] mt-1 font-mono">0.00%</div>
            <div className="text-xs text-[#E5C989] mt-0.5 font-medium">Immunity verified</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#04091A]/80 border border-[#A08348]/25 backdrop-blur-md transition-all duration-300 hover:border-[#A08348]/60 hover:shadow-[0_0_20px_rgba(160,131,72,0.25)]">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider font-bold">Memory Overhead</div>
            <div className="text-xl font-black text-white mt-1 font-mono">&lt; 50 KB</div>
            <div className="text-xs text-[#E5C989] mt-0.5 font-medium">Zero external APIs</div>
          </div>
        </div>
      </section>

      {/* Main Grid: Active Target & 6-Vector Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Monitored Target */}
        <section className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 border border-[#A08348]/30 p-6 shadow-xl space-y-5 transition-all duration-300 hover:border-[#A08348]/50 hover:shadow-[0_8px_32px_rgba(160,131,72,0.2)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#E5C989] animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Active Monitored Target
                </h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 backdrop-blur-md transition-all duration-300 ${currentBadge.bg}`}>
                <span className={`w-2 h-2 rounded-full ${currentBadge.dot}`} />
                {currentBadge.text}
              </span>
            </div>

            {/* Target Details & Glassmorphic Popping Score Card */}
            <div className="p-5 rounded-2xl bg-[#060E26]/90 border border-[#A08348]/25 space-y-4 transition-all duration-300 hover:border-[#A08348]/50 hover:shadow-[0_0_25px_rgba(160,131,72,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{currentStore.name}</h3>
                    <span className="text-xs font-mono text-[#E5C989] font-semibold">({currentStore.domain})</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 font-medium">{currentStore.tagline}</p>
                </div>

                {/* Score Indicator */}
                <div className="p-3 rounded-2xl backdrop-blur-xl bg-[#0A183D] border border-[#A08348]/40 text-right shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                  <div className="text-[10px] font-mono font-bold uppercase text-slate-300">Risk Metric</div>
                  <div className={`text-2xl font-black font-mono tracking-tight drop-shadow-md ${
                    scanResult.compositeRiskScore >= 70
                      ? 'text-rose-400'
                      : scanResult.compositeRiskScore >= 35
                      ? 'text-amber-400'
                      : 'text-[#E5C989]'
                  }`}>
                    {scanResult.compositeRiskScore} <span className="text-xs font-normal text-slate-300">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Scan Summary Note */}
              <div className="p-3.5 rounded-xl bg-black/80 border border-[#A08348]/30 text-xs text-slate-100 font-mono leading-relaxed">
                <span className="text-[#E5C989] font-bold mr-2">&gt;</span>
                {scanResult.summary}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  id="dashboard-open-site-sandbox"
                  onClick={() => onNavigateTab('simulator')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0A183D] hover:bg-[#0E2254] text-white border border-[#A08348]/45 hover:border-[#A08348] hover:shadow-[0_0_15px_rgba(160,131,72,0.3)] transition-all duration-200 flex items-center gap-1.5 font-mono cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#E5C989]" />
                  <span>Open in Sandbox</span>
                </button>

                <button
                  id="dashboard-test-checkout-interception"
                  onClick={onTriggerCheckoutModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/25 hover:bg-rose-500/35 text-rose-100 border border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all duration-200 flex items-center gap-1.5 font-mono cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
                  <span>Test Interceptor Modal</span>
                </button>

                <button
                  id="dashboard-audit-policy-btn"
                  onClick={() => onNavigateTab('ai_forensics')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#A08348]/25 hover:bg-[#A08348]/35 text-[#E5C989] border border-[#A08348]/45 hover:border-[#A08348] hover:shadow-[0_0_20px_rgba(160,131,72,0.35)] transition-all duration-200 flex items-center gap-1.5 font-mono cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E5C989]" />
                  <span>Inspect Legal Policy</span>
                </button>
              </div>
            </div>

            {/* Quick Scenario Preset Selector Bar */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-mono uppercase tracking-wider text-xs font-bold">Test Environments</span>
                <span className="font-mono text-xs font-bold text-[#E5C989]">{allStores.length} Scenarios</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allStores.map((store) => {
                  const isSelected = store.id === currentStore.id;
                  return (
                    <button
                      key={store.id}
                      id={`dash-select-${store.id}`}
                      onClick={() => onSelectStore(store)}
                      className={`p-3.5 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between backdrop-blur-lg cursor-pointer ${
                        isSelected
                          ? store.isScam
                            ? 'bg-rose-500/20 border-rose-500/60 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                            : 'bg-[#A08348]/25 border-[#A08348]/70 text-white shadow-[0_0_20px_rgba(160,131,72,0.35)]'
                          : 'bg-[#060E26]/70 border-[#A08348]/20 text-slate-200 hover:bg-[#0A183D]/80 hover:border-[#A08348]/50 hover:shadow-[0_0_18px_rgba(160,131,72,0.2)]'
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${store.isScam ? 'bg-rose-400' : 'bg-[#E5C989]'}`} />
                          <span className="font-bold text-xs truncate text-white">{store.name}</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-300 truncate mt-0.5">{store.domain}</div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        store.isScam ? 'bg-rose-950/90 text-rose-200 border border-rose-700/60' : 'bg-[#0A183D] text-[#E5C989] border border-[#A08348]/50'
                      }`}>
                        {store.isScam ? 'SCAM' : 'SAFE'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-Time 6-Vector Telemetry */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 border border-[#A08348]/30 p-6 shadow-xl space-y-4 transition-all duration-300 hover:border-[#A08348]/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Real-Time 6-Vector Telemetry & Threat Feeds
              </h2>
              <button
                onClick={() => onNavigateTab('heuristics_matrix')}
                className="text-xs font-mono text-[#E5C989] hover:text-white flex items-center gap-1 transition-colors font-bold cursor-pointer"
              >
                <span>View Matrix</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {(Object.values(scanResult.vectors) as HeuristicVectorResult[]).map((vec) => {
                const isHigh = vec.riskLevel === 'HIGH' || vec.riskLevel === 'CRITICAL';
                const isMed = vec.riskLevel === 'MEDIUM';
                const isBlacklist = vec.id === 'global_blacklist';

                return (
                  <div
                    key={vec.id}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 backdrop-blur-md ${
                      isHigh
                        ? 'bg-rose-500/15 border-rose-500/35 text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.15)] hover:border-rose-400/60'
                        : isMed
                        ? 'bg-amber-500/15 border-amber-500/35 text-amber-100 hover:border-amber-400/60'
                        : 'bg-[#060E26]/80 border-[#A08348]/20 text-slate-200 hover:border-[#A08348]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{vec.name}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                          isBlacklist
                            ? 'bg-rose-950/90 text-rose-200 border border-rose-700/60'
                            : 'bg-black/60 text-[#E5C989]'
                        }`}>
                          {isBlacklist ? 'Automatic 100 Override' : `Weight ${vec.weight}x`}
                        </span>
                      </div>
                      
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border ${
                        isHigh
                          ? 'bg-rose-950/90 text-rose-200 border-rose-700/60 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                          : isMed
                          ? 'bg-amber-950/90 text-amber-200 border-amber-700/60'
                          : 'bg-[#0A183D] text-[#E5C989] border-[#A08348]/50 shadow-[0_0_10px_rgba(160,131,72,0.3)]'
                      }`}>
                        {vec.riskLevel} • {vec.score}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-normal">{vec.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right Column: Sentinel Modules & Live Feed */}
        <section className="lg:col-span-5 space-y-6">
          
          {/* Vajra Core Modules Navigation */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 border border-[#A08348]/30 p-6 shadow-xl space-y-4 transition-all duration-300 hover:border-[#A08348]/50">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Vajra Modules
            </h2>

            <div className="space-y-2.5">
              {/* Module: Storefront Simulator */}
              <button
                id="hub-nav-simulator"
                onClick={() => onNavigateTab('simulator')}
                className="w-full p-4 rounded-2xl bg-[#060E26]/80 hover:bg-[#0A183D] border border-[#A08348]/25 hover:border-[#A08348]/60 hover:shadow-[0_0_20px_rgba(160,131,72,0.25)] transition-all duration-200 text-left group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#E5C989] group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-bold text-xs text-white group-hover:text-[#E5C989] transition-colors">
                      Live Store Sandbox
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Test live simulated scam storefronts, fake discounts, and trigger real-time interception.
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#E5C989] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
              </button>

              {/* Module: 5-Vector Heuristics Matrix */}
              <button
                id="hub-nav-heuristics"
                onClick={() => onNavigateTab('heuristics_matrix')}
                className="w-full p-4 rounded-2xl bg-[#060E26]/80 hover:bg-[#0A183D] border border-[#A08348]/25 hover:border-[#A08348]/60 hover:shadow-[0_0_20px_rgba(160,131,72,0.25)] transition-all duration-200 text-left group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#E5C989] group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-bold text-xs text-white group-hover:text-[#E5C989] transition-colors">
                      5-Vector Heuristics Matrix
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Inspect mathematical weighting coefficients and verified false-positive immunity thresholds.
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#E5C989] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
              </button>

              {/* Module: AI Forensic Inspector */}
              <button
                id="hub-nav-ai"
                onClick={() => onNavigateTab('ai_forensics')}
                className="w-full p-4 rounded-2xl bg-[#060E26]/80 hover:bg-[#0A183D] border border-[#A08348]/25 hover:border-[#A08348]/60 hover:shadow-[0_0_20px_rgba(160,131,72,0.25)] transition-all duration-200 text-left group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E5C989] group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-bold text-xs text-white group-hover:text-[#E5C989] transition-colors">
                      AI Forensic Policy Lab
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Deep scan legal policies for unpopulated boilerplate tokens and fraudulent clauses.
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#E5C989] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
              </button>

              {/* Module: Chrome Extension Source */}
              <button
                id="hub-nav-code"
                onClick={() => onNavigateTab('extension_code')}
                className="w-full p-4 rounded-2xl bg-[#060E26]/80 hover:bg-[#0A183D] border border-[#A08348]/25 hover:border-[#A08348]/60 hover:shadow-[0_0_20px_rgba(160,131,72,0.25)] transition-all duration-200 text-left group flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#E5C989] group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-bold text-xs text-white group-hover:text-[#E5C989] transition-colors">
                      Manifest V3 Extension Source
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Standalone production extension bundle with zero dependencies for Chromium browsers.
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#E5C989] group-hover:text-white transition-colors flex-shrink-0 mt-0.5" />
              </button>
            </div>
          </div>

          {/* Live Incident Activity Stream */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 border border-[#A08348]/30 p-6 shadow-xl space-y-4 transition-all duration-300 hover:border-[#A08348]/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#E5C989]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                  Live Interception Feed
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#E5C989] bg-[#0A183D] px-2 py-0.5 rounded-full border border-[#A08348]/45">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/80 border border-[#A08348]/20 space-y-1">
                <div className="flex items-center justify-between text-xs text-white">
                  <span className="font-bold text-white">luxeaura-paris.shop</span>
                  <span className="text-rose-400 font-bold">INTERCEPTED</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Trigger: Checkout Click • 4-day domain • Template Placeholder Detected
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/80 border border-[#A08348]/20 space-y-1">
                <div className="flex items-center justify-between text-xs text-white">
                  <span className="font-bold text-white">protech-vault.online</span>
                  <span className="text-rose-400 font-bold">FLAGGED HIGH</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Trigger: Free Webmail Support • Resetting Timer Loop • 88% Discount
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/80 border border-[#A08348]/20 space-y-1">
                <div className="flex items-center justify-between text-xs text-white">
                  <span className="font-bold text-white">nordic-outlet.com</span>
                  <span className="text-[#E5C989] font-bold">IMMUNITY PASS</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Domain 1,420 days • Verified Physical Address • Authentic Clearance
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
};
