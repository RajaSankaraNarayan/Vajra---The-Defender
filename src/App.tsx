import { useState, useMemo } from 'react';
import { ActiveAppTab, StoreProfile } from './types';
import { INITIAL_STORES } from './data/stores';
import { analyzeStorefront, DEFAULT_WEIGHTS, HeuristicWeights } from './engine/unveilDetector';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StoreSimulator } from './components/StoreSimulator';
import { UnveilWarningOverlay } from './components/UnveilWarningOverlay';
import { ExtensionPopup } from './components/ExtensionPopup';
import { HeuristicsMatrix } from './components/HeuristicsMatrix';
import { ExtensionSourceViewer } from './components/ExtensionSourceViewer';
import { AiForensics } from './components/AiForensics';
import { VajraBackground } from './components/VajraBackground';
import { VajraPiercedLogo } from './components/VajraPiercedLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveAppTab>('dashboard');
  const [stores, setStores] = useState<StoreProfile[]>(INITIAL_STORES);
  const [selectedStoreId, setSelectedStoreId] = useState<string>(INITIAL_STORES[0].id);
  const [isInterceptionArmed, setIsInterceptionArmed] = useState<boolean>(true);
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
  const [showExtensionPopup, setShowExtensionPopup] = useState<boolean>(false);
  const [scamInterceptCount, setScamInterceptCount] = useState<number>(1);

  // Active store object
  const currentStore = useMemo(() => {
    return stores.find((s) => s.id === selectedStoreId) || stores[0];
  }, [stores, selectedStoreId]);

  // Compute scan results using calibrated default weights
  const scanResult = useMemo(() => {
    return analyzeStorefront(currentStore, DEFAULT_WEIGHTS);
  }, [currentStore]);

  // Handle checkout button click in the simulated store
  const handleTriggerCheckout = () => {
    if (isInterceptionArmed && scanResult.compositeRiskScore >= 45) {
      setShowWarningModal(true);
      setScamInterceptCount((prev) => prev + 1);
    } else {
      alert(`[Simulation] Authentic checkout initialized for ${currentStore.name}. Vajra verified this merchant as authentic!`);
    }
  };

  const handleSelectStore = (store: StoreProfile) => {
    setSelectedStoreId(store.id);
  };

  return (
    <div className="min-h-screen bg-[#02040A] text-[#F3F4F6] font-exo antialiased selection:bg-[#A08348] selection:text-black flex flex-col relative overflow-x-hidden">
      
      {/* Background Vajra with Obsidian Deep Midnight Lighting */}
      <VajraBackground />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isInterceptionArmed={isInterceptionArmed}
        setIsInterceptionArmed={setIsInterceptionArmed}
        scamCount={scamInterceptCount}
      />

      {/* Main Content Pages */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {activeTab === 'dashboard' && (
          <Dashboard
            currentStore={currentStore}
            allStores={stores}
            onSelectStore={handleSelectStore}
            scanResult={scanResult}
            isArmed={isInterceptionArmed}
            onToggleArmed={() => setIsInterceptionArmed(!isInterceptionArmed)}
            onNavigateTab={setActiveTab}
            onTriggerCheckoutModal={() => setShowWarningModal(true)}
            scamCount={scamInterceptCount}
          />
        )}

        {activeTab === 'simulator' && (
          <StoreSimulator
            currentStore={currentStore}
            allStores={stores}
            onSelectStore={handleSelectStore}
            scanResult={scanResult}
            isArmed={isInterceptionArmed}
            onTriggerCheckout={handleTriggerCheckout}
            onOpenExtensionPopup={() => setShowExtensionPopup(!showExtensionPopup)}
            showExtensionPopup={showExtensionPopup}
            onOpenAiInspector={() => setActiveTab('ai_forensics')}
          />
        )}

        {activeTab === 'heuristics_matrix' && (
          <HeuristicsMatrix />
        )}

        {activeTab === 'ai_forensics' && (
          <AiForensics
            currentStore={currentStore}
            stores={stores}
            onSelectStore={handleSelectStore}
          />
        )}

        {activeTab === 'extension_code' && (
          <ExtensionSourceViewer />
        )}
      </main>

      {/* Floating Extension Popup Widget */}
      {showExtensionPopup && (
        <div className="fixed top-16 right-4 sm:right-8 z-40 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          <div className="relative">
            <button
              onClick={() => setShowExtensionPopup(false)}
              className="absolute top-2 right-2 text-slate-300 hover:text-white text-xs font-bold z-10 p-1 cursor-pointer"
            >
              ✕
            </button>
            <ExtensionPopup
              scanResult={scanResult}
              isArmed={isInterceptionArmed}
              onToggleArmed={() => setIsInterceptionArmed(!isInterceptionArmed)}
              onOpenDetailedMatrix={() => {
                setShowExtensionPopup(false);
                setActiveTab('heuristics_matrix');
              }}
            />
          </div>
        </div>
      )}

      {/* High-Impact Interception Modal */}
      <UnveilWarningOverlay
        scanResult={scanResult}
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        onBypass={() => {
          setShowWarningModal(false);
          alert(`[Warning Bypassed] Proceeding to ${currentStore.name} checkout at user's own risk.`);
        }}
        onOpenAiAudit={() => {
          setShowWarningModal(false);
          setActiveTab('ai_forensics');
        }}
      />

      {/* Minimalist Liquid Glass Footer */}
      <footer className="backdrop-blur-2xl bg-[#04091A]/80 border-t border-[#A08348]/25 py-4 px-6 text-center text-xs text-slate-200 relative z-10 mt-auto font-exo">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VajraPiercedLogo size="sm" showSubtitle={false} />
            <span className="text-slate-300 font-medium hidden sm:inline">– Client-Side E-Commerce Anti-Fraud Shield</span>
          </div>
          <div className="text-xs font-mono text-[#E5C989] font-bold">
            Zero-latency Local Heuristics • Manifest V3 Compliant • Anti-False-Positive Filter
          </div>
        </div>
      </footer>
    </div>
  );
}
