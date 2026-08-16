import React, { FC } from 'react';

interface VajraPiercedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const VajraPiercedLogo: FC<VajraPiercedLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'THE DEFENDER',
}) => {
  // Sizing definitions for SVG and badge
  const dimensions = {
    sm: { width: 165, height: 34, badgeSize: 'text-[9px] px-2 py-0.5' },
    md: { width: 220, height: 44, badgeSize: 'text-[10px] px-2.5 py-0.5' },
    lg: { width: 290, height: 56, badgeSize: 'text-xs px-3 py-1' },
    hero: { width: 380, height: 74, badgeSize: 'text-xs px-3.5 py-1.5' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Precision Master Vector SVG Pierced Logo with Shorter, Compact Vajra */}
      <svg
        viewBox="0 0 460 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: dimensions.width, height: dimensions.height }}
        className="overflow-visible drop-shadow-[0_2px_12px_rgba(160,131,72,0.4)] group-hover:drop-shadow-[0_4px_20px_rgba(160,131,72,0.7)] transition-all duration-300"
      >
        <defs>
          {/* Imperial Antique Gold Gradient */}
          <linearGradient id="v-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#F5F0E9" />
            <stop offset="55%" stopColor="#E5C989" />
            <stop offset="85%" stopColor="#A08348" />
            <stop offset="100%" stopColor="#6E531C" />
          </linearGradient>

          {/* Core Energy Beam Gradient */}
          <linearGradient id="v-energy-beam" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#A08348" stopOpacity="0" />
            <stop offset="20%" stopColor="#E5C989" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="80%" stopColor="#E5C989" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A08348" stopOpacity="0" />
          </linearGradient>

          {/* Letter Metallic Gradient */}
          <linearGradient id="v-letter-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F5F0E9" />
            <stop offset="75%" stopColor="#E5C989" />
            <stop offset="100%" stopColor="#A08348" />
          </linearGradient>

          {/* Radial Core Glow */}
          <radialGradient id="v-core-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5C989" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#A08348" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#04091A" stopOpacity="0" />
          </radialGradient>

          {/* Drop filter for fierce prongs */}
          <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Radial Backlight behind the central piercer */}
        <circle cx="230" cy="45" r="70" fill="url(#v-core-radial)" opacity="0.8" />

        {/* ======================================================== */}
        {/* 1. HORIZONTAL PIERCING ENERGY SHAFT (COMPACT & SHORTER)  */}
        {/* ======================================================== */}
        <line
          x1="35"
          y1="45"
          x2="425"
          y2="45"
          stroke="url(#v-energy-beam)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="55"
          y1="45"
          x2="405"
          y2="45"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* ======================================================== */}
        {/* 2. COMPACT SACRED HORIZONTAL VAJRA SCEPTER               */}
        {/* ======================================================== */}
        <g id="vajra-horizontal-scepter" filter="url(#gold-glow)">
          
          {/* ----- LEFT 5-PRONGED VAJRA HEAD (Shortened, Compact) ----- */}
          {/* Central Diamond Blade Tip (Left Apex at x=35) */}
          <polygon points="35,45 52,41 60,45 52,49" fill="url(#v-gold-grad)" stroke="#F5F0E9" strokeWidth="0.9" />
          <line x1="35" y1="45" x2="88" y2="45" stroke="url(#v-gold-grad)" strokeWidth="2.2" />

          {/* Top Outer Claw (Left) */}
          <path
            d="M 88 37 C 72 29, 58 33, 50 41"
            stroke="url(#v-gold-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Top Inner Claw (Left) */}
          <path
            d="M 88 41 C 76 35, 65 38, 54 43"
            stroke="url(#v-gold-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom Outer Claw (Left) */}
          <path
            d="M 88 53 C 72 61, 58 57, 50 49"
            stroke="url(#v-gold-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bottom Inner Claw (Left) */}
          <path
            d="M 88 49 C 76 55, 65 52, 54 47"
            stroke="url(#v-gold-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Lotus Petal Collar */}
          <path
            d="M 88 34 C 91 40, 91 50, 88 56 C 94 53, 96 49, 96 45 C 96 41, 94 37, 88 34 Z"
            fill="url(#v-gold-grad)"
            stroke="#F5F0E9"
            strokeWidth="1"
          />
          <circle cx="96" cy="45" r="3.5" fill="#F5F0E9" />


          {/* ----- CENTER BINDU & VAJRA WAIST SPHERE (Centered at x=230, y=45) ----- */}
          <ellipse cx="216" cy="45" rx="3" ry="10" fill="none" stroke="url(#v-gold-grad)" strokeWidth="1.8" />
          <ellipse cx="244" cy="45" rx="3" ry="10" fill="none" stroke="url(#v-gold-grad)" strokeWidth="1.8" />

          {/* Central Sacred Sphere */}
          <circle cx="230" cy="45" r="14" fill="#04091A" stroke="url(#v-gold-grad)" strokeWidth="2.5" />
          <circle cx="230" cy="45" r="8.5" fill="url(#v-gold-grad)" opacity="0.9" />
          <circle cx="230" cy="45" r="4" fill="#FFFFFF" />


          {/* ----- RIGHT 5-PRONGED VAJRA HEAD (Shortened, Compact) ----- */}
          {/* Central Diamond Blade Tip (Right Apex at x=425) */}
          <polygon points="425,45 408,41 400,45 408,49" fill="url(#v-gold-grad)" stroke="#F5F0E9" strokeWidth="0.9" />
          <line x1="425" y1="45" x2="372" y2="45" stroke="url(#v-gold-grad)" strokeWidth="2.2" />

          {/* Top Outer Claw (Right) */}
          <path
            d="M 372 37 C 388 29, 402 33, 410 41"
            stroke="url(#v-gold-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Top Inner Claw (Right) */}
          <path
            d="M 372 41 C 384 35, 395 38, 406 43"
            stroke="url(#v-gold-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom Outer Claw (Right) */}
          <path
            d="M 372 53 C 388 61, 402 57, 410 49"
            stroke="url(#v-gold-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bottom Inner Claw (Right) */}
          <path
            d="M 372 49 C 384 55, 395 52, 406 47"
            stroke="url(#v-gold-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Lotus Petal Collar */}
          <path
            d="M 372 34 C 369 40, 369 50, 372 56 C 366 53, 364 49, 364 45 C 364 41, 366 37, 372 34 Z"
            fill="url(#v-gold-grad)"
            stroke="#F5F0E9"
            strokeWidth="1"
          />
          <circle cx="364" cy="45" r="3.5" fill="#F5F0E9" />
        </g>

        {/* ======================================================== */}
        {/* 3. THE COMPLETE WORDMARK "VAJRA" PIERCED CLEANLY         */}
        {/* ======================================================== */}
        <g
          fontFamily="'Cinzel Decorative', 'Cinzel', serif"
          fontSize="44"
          fontWeight="900"
          letterSpacing="10"
          fill="url(#v-letter-grad)"
          stroke="#030712"
          strokeWidth="3.5"
          paintOrder="stroke fill"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {/* Letter V */}
          <text x="120" y="44" className="transition-all duration-300 group-hover:fill-[url(#v-gold-grad)]">
            V
          </text>

          {/* Letter A */}
          <text x="178" y="44" className="transition-all duration-300 group-hover:fill-[url(#v-gold-grad)]">
            A
          </text>

          {/* Letter J (Centered on Vajra Bindu Sphere) */}
          <text x="230" y="44" fill="#FFFFFF" stroke="#04091A" strokeWidth="4.5" className="transition-all duration-300">
            J
          </text>

          {/* Letter R */}
          <text x="284" y="44" className="transition-all duration-300 group-hover:fill-[url(#v-gold-grad)]">
            R
          </text>

          {/* Letter A */}
          <text x="342" y="44" className="transition-all duration-300 group-hover:fill-[url(#v-gold-grad)]">
            A
          </text>
        </g>

        {/* Crisp Metallic Refraction Highlights */}
        <line x1="168" y1="45" x2="188" y2="45" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
        <line x1="332" y1="45" x2="352" y2="45" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.95" />
      </svg>

      {/* Subtitle / Defender Tag with Exo Font */}
      {showSubtitle && (
        <span
          className={`font-exo font-bold tracking-widest uppercase rounded-full bg-gradient-to-r from-[#070F28] to-[#04091A] text-[#E5C989] border border-[#A08348]/60 shadow-[0_0_15px_rgba(160,131,72,0.3)] backdrop-blur-md self-center ${dimensions.badgeSize} group-hover:border-[#A08348]/90 group-hover:shadow-[0_0_20px_rgba(160,131,72,0.5)] transition-all whitespace-nowrap`}
        >
          {subtitleText}
        </span>
      )}
    </div>
  );
};
