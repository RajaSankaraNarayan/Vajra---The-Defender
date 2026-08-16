import { FC, useState } from 'react';
import { HeuristicWeights, DEFAULT_WEIGHTS } from '../engine/unveilDetector';
import { 
  Mail, 
  Server, 
  Star, 
  Clock, 
  Share2, 
  CheckCircle2,
  XCircle,
  Zap,
  ShieldAlert,
  Ban,
} from 'lucide-react';

interface HeuristicsMatrixProps {
  weights?: HeuristicWeights;
}

export const HeuristicsMatrix: FC<HeuristicsMatrixProps> = ({
  weights = DEFAULT_WEIGHTS,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'antifalse'>('matrix');

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-exo">
      
      {/* Title Header with Deep Midnight Gold Lighting */}
      <div className="relative overflow-hidden rounded-3xl backdrop-blur-2xl bg-gradient-to-b from-[#060E28]/90 via-[#04091A]/95 to-[#020510]/95 border border-[#A08348]/35 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-xl bg-[#0A183D] border border-[#A08348]/50 text-[#E5C989] shadow-[0_0_15px_rgba(160,131,72,0.25)] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#E5C989]" />
              HEURISTIC ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-vajra">
            6-Vector Mathematical & Threat Defense Matrix
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Multi-vector threat evaluation combining global security blacklists (PhishTank / community feeds) with client-side behavioral, contact, lineage, and fake review heuristics.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-black/70 p-1.5 rounded-2xl border border-[#A08348]/30 self-start md:self-auto text-xs font-mono relative z-10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 rounded-xl transition-all font-bold cursor-pointer ${
              activeTab === 'matrix' ? 'bg-[#A08348] text-[#04091A] shadow-[0_0_15px_rgba(160,131,72,0.4)]' : 'text-slate-200 hover:text-white'
            }`}
          >
            Defense Vectors & Blacklist
          </button>
          <button
            onClick={() => setActiveTab('antifalse')}
            className={`px-3.5 py-2 rounded-xl transition-all font-bold cursor-pointer ${
              activeTab === 'antifalse' ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(160,131,72,0.4)]' : 'text-slate-200 hover:text-white'
            }`}
          >
            Immunity Filter
          </button>
        </div>
      </div>

      {/* Vector Matrix Cards */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Vector 0: Global Blacklist (Master Instant Block) */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/95 p-5 border border-rose-500/40 shadow-xl space-y-3 relative overflow-hidden group hover:border-rose-400 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                <Ban className="w-5 h-5 text-rose-400" />
              </div>
              <span className="text-[11px] font-mono font-black text-rose-100 bg-rose-950/95 border border-rose-500/70 px-2.5 py-1 rounded-xl shadow-[0_0_12px_rgba(244,63,94,0.4)] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                Automatic 100 (Instant Block)
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>Global Blacklist & Threat Feeds</span>
              </h3>
              <p className="text-xs text-rose-300 mt-0.5">PhishTank, Community & Partner Registries</p>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              Domain is flagged by the community, PhishTank, or security partners. Instantly triggers an Automatic 100 hard block before payment scripts execute.
            </p>
            <div className="bg-black/80 p-3 rounded-2xl border border-rose-500/30 text-xs font-mono space-y-1">
              <div className="text-rose-400 font-bold">Detection Rules:</div>
              <div className="text-slate-300">• PhishTank verified phishing feed match</div>
              <div className="text-slate-300">• Community crowdsourced fraud consensus</div>
              <div className="text-slate-300">• Anti-Phishing Working Group (APWG) threat hit</div>
            </div>
          </div>

          {/* Vector 1: Support & Contact */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 p-5 border border-[#A08348]/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/40">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-rose-200 bg-rose-950/90 border border-rose-700/60 px-2.5 py-1 rounded-xl">
                Weight: {Math.round(weights.supportWeight * 100)}% (Core Metric)
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">1. Support & Contact Integrity</h3>
              <p className="text-xs text-slate-300 mt-0.5">Detects disposable support channels</p>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              Real retailers run dedicated MX mailboxes. Disposable scam networks use free webmail (@gmail, @hotmail) and omit verifiable physical addresses.
            </p>
            <div className="bg-black/70 p-3 rounded-2xl border border-[#A08348]/20 text-xs font-mono space-y-1">
              <div className="text-[#E5C989] font-bold">Detection Rules:</div>
              <div className="text-slate-300">• Free webmail in footer contact records</div>
              <div className="text-slate-300">• Absent commercial physical street location</div>
            </div>
          </div>

          {/* Vector 2: Domain Lineage */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 p-5 border border-[#A08348]/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/40">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-200 bg-amber-950/90 border border-amber-700/60 px-2.5 py-1 rounded-xl">
                Weight: {Math.round(weights.infrastructureWeight * 100)}% (Core Metric)
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">2. Domain Lineage</h3>
              <p className="text-xs text-slate-300 mt-0.5">Identifies burner domain lifespans</p>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              94% of fake ad campaigns run on domains registered fewer than 14 days prior to harvest checkout events before domain teardown.
            </p>
            <div className="bg-black/70 p-3 rounded-2xl border border-[#A08348]/20 text-xs font-mono space-y-1">
              <div className="text-[#E5C989] font-bold">Detection Rules:</div>
              <div className="text-slate-300">• WHOIS creation age &lt; 14 days</div>
              <div className="text-slate-300">• High-frequency disposable TLD abuse (.shop, .top)</div>
            </div>
          </div>

          {/* Vector 3: Fake Review Detector */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 p-5 border border-[#A08348]/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-yellow-500/20 text-yellow-300 flex items-center justify-center border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <Star className="w-5 h-5 fill-yellow-300/30 text-yellow-300" />
              </div>
              <span className="text-xs font-mono font-bold text-yellow-200 bg-yellow-950/90 border border-yellow-700/60 px-2.5 py-1 rounded-xl">
                Weight: {Math.round(weights.reviewWeight * 100)}% (Core Metric)
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">3. Fake Review Detector</h3>
              <p className="text-xs text-slate-300 mt-0.5">Detects 100% 5-star uniformity & bot burst clusters</p>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              Flags stores where 100% of reviews are 5.0 stars with zero organic sentiment variance, or where 5-10 reviews are injected in a rapid 3-5 hour window.
            </p>
            <div className="bg-black/70 p-3 rounded-2xl border border-[#A08348]/20 text-xs font-mono space-y-1">
              <div className="text-[#E5C989] font-bold">Detection Rules:</div>
              <div className="text-slate-300">• 100% perfect 5-star ratings across all reviews</div>
              <div className="text-slate-300">• 5–10 reviews published within a 3–5 hour gap</div>
            </div>
          </div>

          {/* Vector 4: Behavioral Urgency */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 p-5 border border-[#A08348]/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-300 flex items-center justify-center border border-orange-500/40">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-orange-200 bg-orange-950/90 border border-orange-700/60 px-2.5 py-1 rounded-xl">
                Weight: {Math.round(weights.behavioralWeight * 100)}% (Core Metric)
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">4. Behavioral Urgency Loops</h3>
              <p className="text-xs text-slate-300 mt-0.5">Identifies synthetic checkout pressure</p>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              Detects timers that reset upon reload, randomized client-side buyer toast notifications, and fake declining inventory counters.
            </p>
            <div className="bg-black/70 p-3 rounded-2xl border border-[#A08348]/20 text-xs font-mono space-y-1">
              <div className="text-[#E5C989] font-bold">Detection Rules:</div>
              <div className="text-slate-300">• Timers resetting in localStorage on refresh</div>
              <div className="text-slate-300">• Math.random() social proof popups in DOM</div>
            </div>
          </div>

          {/* Vector 5: Traffic Origin */}
          <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 p-5 border border-[#A08348]/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#0A183D] text-[#E5C989] flex items-center justify-center border border-[#A08348]/40">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-[#E5C989] bg-[#0A183D] border border-[#A08348]/60 px-2.5 py-1 rounded-xl">
                Weight: {Math.round(weights.trafficWeight * 100)}% (Core Metric)
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">5. Price Anomaly & Traffic</h3>
              <p className="text-xs text-slate-300 mt-0.5">Flags predatory liquidation claims</p>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              Flags luxury goods offered at 85-95% discounts with direct deep links from paid social media feeds.
            </p>
            <div className="bg-black/70 p-3 rounded-2xl border border-[#A08348]/20 text-xs font-mono space-y-1">
              <div className="text-[#E5C989] font-bold">Detection Rules:</div>
              <div className="text-slate-300">• Luxury clearance discount &gt; 80%</div>
              <div className="text-slate-300">• Social referrer tag match (`fbclid`, `ttclid`)</div>
            </div>
          </div>
        </div>
      )}

      {/* False Positive Protection Tab */}
      {activeTab === 'antifalse' && (
        <div className="rounded-3xl backdrop-blur-2xl bg-[#04091A]/90 p-6 sm:p-8 border border-[#A08348]/30 shadow-xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-vajra">
              False-Positive Protection & Immunity Rules
            </h3>
            <p className="text-xs text-slate-200 font-medium">
              How Vajra guarantees legitimate e-commerce sales and holiday flash discounts are never wrongfully flagged.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 space-y-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Verified Retailer Immunity Pass</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                If a domain is established (&gt; 365 days), operates custom MX support mailboxes, and has organic review velocity, risk scores are capped at a maximum of 25%, regardless of discounts.
              </p>
            </div>

            <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-5 space-y-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <XCircle className="w-5 h-5" />
                <span>The Scam Intersection Requirement</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                A store is only flagged as a scam when high-risk flags intersect across multiple distinct vectors simultaneously (e.g. Disposable Domain + Free Webmail + 100% 5-Star Review Injection Bursts) or trigger a Global Blacklist match.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
