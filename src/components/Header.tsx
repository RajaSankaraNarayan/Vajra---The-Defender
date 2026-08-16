import { FC } from 'react';
import { ActiveAppTab } from '../types';
import { 
  LayoutDashboard, 
  Compass, 
  Sliders, 
  Sparkles, 
  Code2, 
  AlertTriangle,
} from 'lucide-react';
import { VajraPiercedLogo } from './VajraPiercedLogo';

interface HeaderProps {
  activeTab: ActiveAppTab;
  setActiveTab: (tab: ActiveAppTab) => void;
  isInterceptionArmed: boolean;
  setIsInterceptionArmed: (armed: boolean) => void;
  scamCount: number;
}

export const Header: FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isInterceptionArmed,
  setIsInterceptionArmed,
  scamCount,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveAppTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'simulator' as ActiveAppTab,
      label: 'Store Sandbox',
      icon: Compass,
    },
    {
      id: 'heuristics_matrix' as ActiveAppTab,
      label: '5-Vector Matrix',
      icon: Sliders,
    },
    {
      id: 'ai_forensics' as ActiveAppTab,
      label: 'AI Forensic Lab',
      icon: Sparkles,
    },
    {
      id: 'extension_code' as ActiveAppTab,
      label: 'Extension Source',
      icon: Code2,
    },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#04091A]/90 border-b border-[#A08348]/35 text-[#F3F4F6] transition-all shadow-[0_4px_30px_rgba(0,0,0,0.8)] font-exo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Identity: Majestic Vajra Pierced Logo */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center group text-left transition-all cursor-pointer"
          >
            <VajraPiercedLogo size="md" showSubtitle={true} subtitleText="THE DEFENDER" />
          </button>

          {/* Desktop Striking Liquid Glass Navigation Dock */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#060D24]/80 border border-[#A08348]/30 backdrop-blur-2xl shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#A08348]/35 via-[#0A183D] to-[#A08348]/35 text-white shadow-[0_0_15px_rgba(160,131,72,0.3)] border border-[#A08348]/60 font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-[#A08348]/15'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C989]' : 'text-slate-300'}`} />
                  <span className={isActive ? 'font-bold tracking-wide text-white' : 'font-medium'}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Indicator & Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              id="toggle-guard-interceptor"
              onClick={() => setIsInterceptionArmed(!isInterceptionArmed)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all duration-300 ${
                isInterceptionArmed
                  ? 'bg-[#0A183D] border-[#A08348]/60 text-[#E5C989] shadow-[0_0_18px_rgba(160,131,72,0.3)] hover:border-[#A08348]'
                  : 'bg-amber-950/60 border-amber-500/40 text-amber-200 hover:bg-amber-950/80'
              }`}
              title={isInterceptionArmed ? 'Vajra Interceptor Active' : 'Vajra Interceptor Standby'}
            >
              <span className={`w-2 h-2 rounded-full ${isInterceptionArmed ? 'bg-[#E5C989] shadow-[0_0_8px_#E5C989] animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden sm:inline tracking-wider">{isInterceptionArmed ? 'ARMED' : 'STANDBY'}</span>
            </button>

            {scamCount > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-200 text-xs font-mono font-bold shadow-[0_0_10px_rgba(244,63,94,0.25)]">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-300" />
                <span>{scamCount}</span>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center gap-1 pb-3 overflow-x-auto no-scrollbar border-t border-[#A08348]/20 pt-2 font-exo">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-bold ${
                  isActive
                    ? 'bg-[#0A183D] text-white border border-[#A08348]/60 shadow-[0_0_10px_rgba(160,131,72,0.3)]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5C989]' : 'text-slate-300'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
