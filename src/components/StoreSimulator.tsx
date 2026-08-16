import { FC, useState, useEffect } from 'react';
import { StoreProfile, UnveilScanResult } from '../types';
import { 
  Lock, 
  RotateCw, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  AlertCircle, 
  FileText, 
  Mail, 
  MapPin, 
  Check, 
  CreditCard, 
  ChevronRight, 
  Zap,
  Tag,
  Shield
} from 'lucide-react';
import { VajraIcon } from './VajraIcon';

interface StoreSimulatorProps {
  currentStore: StoreProfile;
  allStores: StoreProfile[];
  onSelectStore: (store: StoreProfile) => void;
  scanResult: UnveilScanResult;
  isArmed: boolean;
  onTriggerCheckout: () => void;
  onOpenExtensionPopup: () => void;
  showExtensionPopup: boolean;
  onOpenAiInspector: () => void;
}

export const StoreSimulator: FC<StoreSimulatorProps> = ({
  currentStore,
  allStores,
  onSelectStore,
  scanResult,
  isArmed,
  onTriggerCheckout,
  onOpenExtensionPopup,
  showExtensionPopup,
  onOpenAiInspector,
}) => {
  const [timerSeconds, setTimerSeconds] = useState(
    currentStore.behavioral.timerDurationSeconds > 0 ? currentStore.behavioral.timerDurationSeconds : 420
  );
  const [activeSocialProofIndex, setActiveSocialProofIndex] = useState(0);
  const [showPolicyModal, setShowPolicyModal] = useState<null | 'terms' | 'returns'>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Timer simulation (scam sites reset on reload or run down)
  useEffect(() => {
    setTimerSeconds(currentStore.behavioral.timerDurationSeconds > 0 ? currentStore.behavioral.timerDurationSeconds : 420);
    setActiveImageIndex(0);
  }, [currentStore]);

  useEffect(() => {
    if (!currentStore.behavioral.hasResettingTimer) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 1 ? prev - 1 : currentStore.behavioral.timerDurationSeconds));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStore]);

  // Social proof toast simulation
  useEffect(() => {
    if (!currentStore.behavioral.hasFakeSocialProof || currentStore.behavioral.socialProofMessages.length === 0) return;
    const interval = setInterval(() => {
      setActiveSocialProofIndex((prev) => (prev + 1) % currentStore.behavioral.socialProofMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStore]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setTimerSeconds(currentStore.behavioral.timerDurationSeconds || 420);
  };

  const currentBuyerToast = currentStore.behavioral.socialProofMessages[activeSocialProofIndex];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Sandbox Target Scenario Bar */}
      <div className="rounded-2xl backdrop-blur-2xl bg-white/[0.04] border border-white/[0.08] p-3.5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300 hover:border-sky-400/30 hover:bg-white/[0.06] hover:shadow-[0_0_24px_rgba(56,189,248,0.1)] hover:backdrop-blur-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            Sandbox Target Environment
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {allStores.map((store) => {
            const isSelected = store.id === currentStore.id;
            return (
              <button
                key={store.id}
                id={`select-store-${store.id}`}
                onClick={() => onSelectStore(store)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 border flex items-center gap-2 backdrop-blur-md ${
                  isSelected
                    ? store.isScam
                      ? 'bg-rose-500/20 text-rose-200 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.2)] hover:border-rose-400/60 hover:shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:backdrop-blur-xl'
                      : 'bg-sky-500/20 text-sky-200 border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.2)] hover:border-sky-300/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:backdrop-blur-xl'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:bg-white/[0.06] hover:text-white hover:border-sky-400/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.12)] hover:backdrop-blur-xl'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${store.isScam ? 'bg-rose-400' : 'bg-sky-400'}`} />
                <span>{store.name}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  store.isScam ? 'bg-rose-950/80 text-rose-300' : 'bg-sky-950/80 text-sky-300'
                }`}>
                  {store.isScam ? 'SCAM' : 'SAFE'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulated Browser Viewport */}
      <div className="rounded-3xl border border-white/[0.12] shadow-2xl overflow-hidden backdrop-blur-2xl bg-slate-900/90 transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_12px_48px_rgba(56,189,248,0.15)] hover:backdrop-blur-3xl">
        
        {/* Browser Chrome Header & Omnibox */}
        <div className="bg-slate-950/90 px-4 py-3 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
            </div>
            <span className="text-xs text-slate-400 font-mono ml-2 hidden md:inline">
              Simulated Client Viewport
            </span>
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-xl mx-auto w-full">
            <div className="bg-black/60 border border-white/[0.1] rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-slate-200 shadow-inner transition-all duration-300 hover:border-sky-400/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <Lock className={`w-3.5 h-3.5 ${currentStore.isScam ? 'text-amber-400' : 'text-sky-400'}`} />
              <span className="truncate flex-1 text-slate-300">
                {currentStore.fullUrl}
              </span>
              <button
                title="Reload Page (Triggers scam urgency loop)"
                onClick={handleResetTimer}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Vajra Defender Extension Button with Popping Glassmorphic Badge */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              id="unveil-extension-icon-btn"
              onClick={onOpenExtensionPopup}
              title="Click to view Vajra Defender Extension popup"
              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border backdrop-blur-xl hover:backdrop-blur-3xl ${
                scanResult.compositeRiskScore >= 50
                  ? 'bg-rose-500/20 text-rose-200 border-rose-500/40 hover:bg-rose-500/30 hover:border-rose-400/70 shadow-[0_0_15px_rgba(244,63,94,0.25)] hover:shadow-[0_0_25px_rgba(244,63,94,0.4)]'
                  : 'bg-[#112250]/90 text-[#E5C989] border-[#A08348]/50 hover:bg-[#112250] hover:border-[#A08348]/80 shadow-[0_0_15px_rgba(160,131,72,0.25)] hover:shadow-[0_0_25px_rgba(160,131,72,0.4)]'
              }`}
            >
              <VajraIcon variant="gold" className="w-3.5 h-3.5" glow />
              <span className="font-vajra font-black tracking-wide">VAJRA</span>
              
              {/* Glassmorphic Score Pill */}
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-extrabold shadow-sm transition-transform duration-300 hover:scale-105 ${
                scanResult.compositeRiskScore >= 50 
                  ? 'bg-rose-600 text-white shadow-[0_0_8px_#e11d48]' 
                  : 'bg-[#A08348] text-[#0A1432] shadow-[0_0_8px_#A08348]'
              }`}>
                {scanResult.compositeRiskScore}%
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BRIGHT STOREFRONT ENVIRONMENT (Vibrant Yellow & Cyan Energy Aesthetics) */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-b from-[#ecfeff] via-[#fefce8] to-[#f0fdf4] text-slate-900 min-h-[520px] relative flex flex-col justify-between selection:bg-yellow-300 selection:text-black">
          
          {/* Top Bright Cyan & Yellow Announcement Banner */}
          {currentStore.behavioral.forcedUrgencyBannerText ? (
            <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-cyan-400 text-slate-950 text-xs font-black px-4 py-2 text-center flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:shadow-lg">
              <Zap className="w-4 h-4 text-slate-950 fill-slate-950 animate-bounce" />
              <span className="tracking-wide uppercase">{currentStore.behavioral.forcedUrgencyBannerText}</span>
              <span className="font-mono bg-black text-yellow-300 px-2 py-0.5 rounded shadow-sm">
                {formatTimer(timerSeconds)}
              </span>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-xs font-bold px-4 py-1.5 text-center flex items-center justify-center gap-2 shadow-xs transition-all duration-300 hover:shadow-md">
              <Tag className="w-3.5 h-3.5 text-yellow-300" />
              <span>OFFICIAL SEASON CLEARANCE • VERIFIED DIRECT DISPATCH</span>
            </div>
          )}

          {/* Clean Bright Store Navigation */}
          <header className="bg-white/90 backdrop-blur-md border-b border-cyan-100 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-xs transition-all duration-300 hover:bg-white/95 hover:border-cyan-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-yellow-400 to-cyan-400 flex items-center justify-center text-slate-950 font-black shadow-sm">
                {currentStore.name.charAt(0)}
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-slate-900 font-sans">
                  {currentStore.name}
                </div>
                <div className="text-[10px] text-cyan-800 font-medium">
                  {currentStore.tagline}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
              <span className="px-2.5 py-1 bg-yellow-100 text-yellow-900 border border-yellow-300/60 rounded-full font-mono text-[10px]">
                {currentStore.category}
              </span>
              <div className="flex items-center gap-1 text-slate-900 bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-xl shadow-xs transition-all duration-300 hover:bg-cyan-100/70 hover:border-cyan-300">
                <ShoppingBag className="w-4 h-4 text-cyan-600" />
                <span>Bag (1)</span>
              </div>
            </div>
          </header>

          {/* Streamlined Minimal Product Body */}
          <main className="max-w-4xl mx-auto p-6 sm:p-8 w-full flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-cyan-100 shadow-[0_10px_30px_rgba(6,182,212,0.08)] transition-all duration-300 hover:bg-white/95 hover:backdrop-blur-xl hover:border-cyan-300 hover:shadow-[0_12px_40px_rgba(6,182,212,0.18)]">
              
              {/* Product Visual */}
              <div className="md:col-span-5 space-y-3">
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-tr from-cyan-50 to-yellow-50 border border-cyan-200/80 shadow-md relative group transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <img
                    src={currentStore.heroProduct.images[activeImageIndex] || currentStore.heroProduct.images[0]}
                    alt={currentStore.heroProduct.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  {currentStore.heroProduct.discountPercent > 0 && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-yellow-200">
                      <Tag className="w-3.5 h-3.5 text-slate-950" />
                      <span>{currentStore.heroProduct.discountPercent}% OFF SALE</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Buying Info */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-800">{currentStore.heroProduct.rating}</span>
                    <span className="text-xs text-slate-500">({currentStore.heroProduct.reviewsCount} reviews)</span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-snug">
                    {currentStore.heroProduct.title}
                  </h1>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {currentStore.heroProduct.description}
                  </p>
                </div>

                {/* Bright Price Showcase */}
                <div className="bg-gradient-to-r from-yellow-50 via-cyan-50/50 to-white border border-yellow-200 p-4 rounded-2xl space-y-2 shadow-xs transition-all duration-300 hover:border-amber-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.18)]">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-cyan-900 font-mono tracking-tight">
                      ${currentStore.heroProduct.salePrice.toFixed(2)}
                    </span>
                    <span className="text-base text-slate-400 line-through font-mono">
                      ${currentStore.heroProduct.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-bold text-amber-900 bg-yellow-300 px-2 py-0.5 rounded-full shadow-xs">
                      Save ${(currentStore.heroProduct.originalPrice - currentStore.heroProduct.salePrice).toFixed(2)}
                    </span>
                  </div>

                  {currentStore.behavioral.hasResettingTimer && (
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                      <span>Special reservation price expires in:</span>
                      <span className="font-mono text-xs bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                        {formatTimer(timerSeconds)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Trigger Button */}
                <div className="space-y-2 pt-1">
                  <button
                    id="btn-buy-now-checkout"
                    onClick={onTriggerCheckout}
                    className="w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-cyan-400 hover:from-yellow-300 hover:to-cyan-300 text-slate-950 py-3.5 px-6 rounded-2xl font-black text-sm shadow-lg shadow-cyan-900/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] border border-yellow-200 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-slate-950" />
                    <span>BUY NOW & CHECKOUT – ${currentStore.heroProduct.salePrice.toFixed(2)}</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-medium">
                    <span className="flex items-center gap-1 text-cyan-800">
                      <Check className="w-3.5 h-3.5 text-cyan-600" />
                      Express Dispatch
                    </span>
                    <span className="flex items-center gap-1 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      SSL 256-bit Protected
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews & Testimonial Feed */}
            {currentStore.reviews && (
              <div className="bg-white/85 backdrop-blur-lg rounded-3xl p-6 border border-cyan-100 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-100 pb-3">
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                      <span>Customer Reviews ({currentStore.reviews.totalReviews})</span>
                      <span className="text-xs font-normal text-slate-500">• {currentStore.reviews.averageRating} / 5.0</span>
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      {currentStore.reviews.fiveStarPercentage}% 5-Star rating distribution
                    </p>
                  </div>

                  {currentStore.reviews.hasTemporalClustering && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 self-start sm:self-auto flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700" />
                      Review Cluster: {currentStore.reviews.reviewBurstCount} reviews in {currentStore.reviews.reviewTimeClusterGapHours}h gap
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentStore.reviews.reviewsList.slice(0, 4).map((rev) => (
                    <div key={rev.id} className="p-3.5 rounded-2xl bg-cyan-50/40 border border-cyan-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                              Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{rev.relativeTime}</span>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <p className="text-xs text-slate-700 leading-snug">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Social Proof Toast (Scam Simulation) */}
          {currentStore.behavioral.hasFakeSocialProof && currentBuyerToast && (
            <div 
              id="scam-social-proof-toast"
              className="fixed bottom-6 left-6 z-20 max-w-xs bg-white/95 border border-cyan-200 rounded-2xl p-3 shadow-xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-4 duration-300"
            >
              <div className="w-8 h-8 rounded-xl bg-yellow-100 border border-yellow-300 flex items-center justify-center text-yellow-900 shrink-0 font-bold text-xs">
                ⚡
              </div>
              <div className="text-xs min-w-0">
                <p className="text-slate-900 font-bold leading-tight truncate">
                  {currentBuyerToast.name} from {currentBuyerToast.location}
                </p>
                <p className="text-slate-500 text-[10px] truncate">
                  Purchased {currentBuyerToast.item}
                </p>
              </div>
            </div>
          )}

          {/* Minimalist Bright Store Footer */}
          <footer className="bg-white/80 backdrop-blur-md border-t border-cyan-100 px-6 py-4 mt-6 text-xs text-slate-600">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-4 text-[11px]">
                <span className="font-semibold text-slate-800">Support: {currentStore.contactInfo.email}</span>
                <span className="text-slate-400">•</span>
                <span>{currentStore.contactInfo.address}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-semibold text-cyan-700">
                <button
                  id="btn-inspect-tos"
                  onClick={() => setShowPolicyModal('terms')}
                  className="hover:underline"
                >
                  Terms
                </button>
                <span>•</span>
                <button
                  id="btn-inspect-returns"
                  onClick={() => setShowPolicyModal('returns')}
                  className="hover:underline"
                >
                  Refund Policy
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Policy Inspector Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {showPolicyModal === 'terms' ? 'Terms of Service' : 'Return & Refund Policy'} – {currentStore.name}
              </h3>
              <button
                onClick={() => setShowPolicyModal(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p>
                {showPolicyModal === 'terms'
                  ? currentStore.policy.termsOfServiceText
                  : currentStore.policy.returnPolicyText}
              </p>
            </div>

            {currentStore.policy.hasPlaceholders && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-red-700">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Vajra Forensic Finding: Template Placeholder</span>
                </div>
                <p className="text-[11px]">
                  Unpopulated tokens detected: <strong>{currentStore.policy.detectedPlaceholders.join(', ')}</strong>.
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPolicyModal(null)}
                className="bg-slate-950 text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
