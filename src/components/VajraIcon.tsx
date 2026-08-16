import React, { FC } from 'react';

interface VajraIconProps {
  className?: string;
  size?: number | string;
  variant?: 'gold' | 'ivory' | 'navy' | 'monochrome' | 'flame';
  glow?: boolean;
}

export const VajraIcon: FC<VajraIconProps> = ({
  className = 'w-6 h-6',
  size,
  variant = 'gold',
  glow = false,
}) => {
  const getStrokeAndGradients = () => {
    switch (variant) {
      case 'gold':
        return {
          stroke: 'url(#vajra-gold-gradient)',
          fillCenter: 'url(#vajra-gold-fill)',
          glowColor: 'rgba(160, 131, 72, 0.5)',
        };
      case 'ivory':
        return {
          stroke: '#F5F0E9',
          fillCenter: 'rgba(245, 240, 233, 0.15)',
          glowColor: 'rgba(245, 240, 233, 0.4)',
        };
      case 'navy':
        return {
          stroke: '#112250',
          fillCenter: 'rgba(17, 34, 80, 0.2)',
          glowColor: 'rgba(17, 34, 80, 0.5)',
        };
      case 'flame':
        return {
          stroke: 'url(#vajra-flame-gradient)',
          fillCenter: 'url(#vajra-flame-fill)',
          glowColor: 'rgba(217, 119, 6, 0.6)',
        };
      default:
        return {
          stroke: 'currentColor',
          fillCenter: 'currentColor',
          glowColor: 'rgba(160, 131, 72, 0.3)',
        };
    }
  };

  const { stroke, fillCenter, glowColor } = getStrokeAndGradients();

  return (
    <svg
      viewBox="0 0 100 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'filter drop-shadow-[0_0_12px_' + glowColor + ']' : ''}`}
      style={size ? { width: size, height: typeof size === 'number' ? size * 2 : size } : undefined}
    >
      <defs>
        {/* Majestic Imperial Antique Gold Gradient */}
        <linearGradient id="vajra-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E9" />
          <stop offset="25%" stopColor="#D8BA75" />
          <stop offset="50%" stopColor="#A08348" />
          <stop offset="75%" stopColor="#C5A869" />
          <stop offset="100%" stopColor="#7A6028" />
        </linearGradient>

        <linearGradient id="vajra-gold-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E9" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#A08348" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#112250" stopOpacity="0.6" />
        </linearGradient>

        {/* Fierce Flame / Interception Gradient */}
        <linearGradient id="vajra-flame-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        <linearGradient id="vajra-flame-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* ======================================================== */}
      {/* CENTRAL SPHERE & RINGS (BINDU - SUNYA) */}
      {/* ======================================================== */}
      {/* Center Sphere */}
      <circle cx="50" cy="100" r="14" stroke={stroke} strokeWidth="2.2" fill={fillCenter} />
      <circle cx="50" cy="100" r="8" stroke={stroke} strokeWidth="1.2" strokeDasharray="1 1" opacity="0.6" />

      {/* Top Ring Collar */}
      <ellipse cx="50" cy="84" rx="12" ry="3.5" stroke={stroke} strokeWidth="2" fill="none" />
      <path d="M 40 84 Q 50 81 60 84" stroke={stroke} strokeWidth="1.5" />
      
      {/* Bottom Ring Collar */}
      <ellipse cx="50" cy="116" rx="12" ry="3.5" stroke={stroke} strokeWidth="2" fill="none" />
      <path d="M 40 116 Q 50 119 60 116" stroke={stroke} strokeWidth="1.5" />

      {/* ======================================================== */}
      {/* TOP LOTUS PETALS PEDESTAL */}
      {/* ======================================================== */}
      {/* Lotus Base arch */}
      <path
        d="M 36 78 C 36 78, 38 83, 50 83 C 62 83, 64 78, 64 78 C 65 74, 61 70, 50 70 C 39 70, 35 74, 36 78 Z"
        stroke={stroke}
        strokeWidth="2"
      />
      {/* Center Lotus Petals (Top) */}
      <path d="M 44 70 C 44 75, 47 78, 50 78 C 53 78, 56 75, 56 70" stroke={stroke} strokeWidth="1.6" />
      <path d="M 37 73 C 39 76, 42 77, 44 76" stroke={stroke} strokeWidth="1.4" />
      <path d="M 63 73 C 61 76, 58 77, 56 76" stroke={stroke} strokeWidth="1.4" />
      
      {/* Upper Lotus Rim Bar */}
      <path d="M 33 69 C 38 66, 62 66, 67 69" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />

      {/* ======================================================== */}
      {/* TOP 5-PRONGED SCEPTER HEAD */}
      {/* ======================================================== */}
      {/* Center Spike / Diamond Blade */}
      <path d="M 50 68 L 50 14" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      {/* Central Diamond Apex */}
      <path d="M 50 2 L 53.5 12 L 50 17 L 46.5 12 Z" stroke={stroke} strokeWidth="1.8" fill={fillCenter} />
      <path d="M 50 35 L 53 43 L 50 48 L 47 43 Z" stroke={stroke} strokeWidth="1.4" />

      {/* Outer Left Curved Claw / Prong */}
      <path
        d="M 35 68 C 32 58, 31 46, 37 32 C 41 23, 46 17, 50 14"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner Left Claw */}
      <path
        d="M 42 68 C 39 56, 40 40, 46 25 C 48 20, 49 16, 50 14"
        stroke={stroke}
        strokeWidth="1.6"
      />

      {/* Outer Right Curved Claw / Prong */}
      <path
        d="M 65 68 C 68 58, 69 46, 63 32 C 59 23, 54 17, 50 14"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner Right Claw */}
      <path
        d="M 58 68 C 61 56, 60 40, 54 25 C 52 20, 51 16, 50 14"
        stroke={stroke}
        strokeWidth="1.6"
      />

      {/* Ornate Filigree Spirals / Clouds on Left (Top) */}
      <path
        d="M 33 66 C 26 65, 23 58, 25 51 C 27 45, 33 46, 35 48 C 37 50, 37 54, 34 56 C 30 58, 27 54, 28 50 C 29 42, 38 36, 41 33"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M 23 54 C 20 48, 22 41, 27 36 C 32 32, 38 31, 41 33" stroke={stroke} strokeWidth="1.5" />
      <path d="M 29 60 C 27 63, 29 67, 33 68" stroke={stroke} strokeWidth="1.4" />
      {/* Upper left flame wisp */}
      <path d="M 35 34 C 33 28, 36 21, 42 18 C 45 16, 48 14, 50 14" stroke={stroke} strokeWidth="1.6" />

      {/* Ornate Filigree Spirals / Clouds on Right (Top) */}
      <path
        d="M 67 66 C 74 65, 77 58, 75 51 C 73 45, 67 46, 65 48 C 63 50, 63 54, 66 56 C 70 58, 73 54, 72 50 C 71 42, 62 36, 59 33"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M 77 54 C 80 48, 78 41, 73 36 C 68 32, 62 31, 59 33" stroke={stroke} strokeWidth="1.5" />
      <path d="M 71 60 C 73 63, 71 67, 67 68" stroke={stroke} strokeWidth="1.4" />
      {/* Upper right flame wisp */}
      <path d="M 65 34 C 67 28, 64 21, 58 18 C 55 16, 52 14, 50 14" stroke={stroke} strokeWidth="1.6" />


      {/* ======================================================== */}
      {/* BOTTOM LOTUS PETALS PEDESTAL */}
      {/* ======================================================== */}
      {/* Lotus Base arch (Bottom) */}
      <path
        d="M 36 122 C 36 122, 38 117, 50 117 C 62 117, 64 122, 64 122 C 65 126, 61 130, 50 130 C 39 130, 35 126, 36 122 Z"
        stroke={stroke}
        strokeWidth="2"
      />
      {/* Center Lotus Petals (Bottom) */}
      <path d="M 44 130 C 44 125, 47 122, 50 122 C 53 122, 56 125, 56 130" stroke={stroke} strokeWidth="1.6" />
      <path d="M 37 127 C 39 124, 42 123, 44 124" stroke={stroke} strokeWidth="1.4" />
      <path d="M 63 127 C 61 124, 58 123, 56 124" stroke={stroke} strokeWidth="1.4" />
      
      {/* Lower Lotus Rim Bar */}
      <path d="M 33 131 C 38 134, 62 134, 67 131" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />

      {/* ======================================================== */}
      {/* BOTTOM 5-PRONGED SCEPTER HEAD */}
      {/* ======================================================== */}
      {/* Center Spike / Diamond Blade */}
      <path d="M 50 132 L 50 186" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" />
      {/* Central Diamond Apex (Bottom) */}
      <path d="M 50 198 L 53.5 188 L 50 183 L 46.5 188 Z" stroke={stroke} strokeWidth="1.8" fill={fillCenter} />
      <path d="M 50 165 L 53 157 L 50 152 L 47 157 Z" stroke={stroke} strokeWidth="1.4" />

      {/* Outer Left Curved Claw (Bottom) */}
      <path
        d="M 35 132 C 32 142, 31 154, 37 168 C 41 177, 46 183, 50 186"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner Left Claw (Bottom) */}
      <path
        d="M 42 132 C 39 144, 40 160, 46 175 C 48 180, 49 184, 50 186"
        stroke={stroke}
        strokeWidth="1.6"
      />

      {/* Outer Right Curved Claw (Bottom) */}
      <path
        d="M 65 132 C 68 142, 69 154, 63 168 C 59 177, 54 183, 50 186"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner Right Claw (Bottom) */}
      <path
        d="M 58 132 C 61 144, 60 160, 54 175 C 52 180, 51 184, 50 186"
        stroke={stroke}
        strokeWidth="1.6"
      />

      {/* Ornate Filigree Spirals / Clouds on Left (Bottom) */}
      <path
        d="M 33 134 C 26 135, 23 142, 25 149 C 27 155, 33 154, 35 152 C 37 150, 37 146, 34 144 C 30 142, 27 146, 28 150 C 29 158, 38 164, 41 167"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M 23 146 C 20 152, 22 159, 27 164 C 32 168, 38 169, 41 167" stroke={stroke} strokeWidth="1.5" />
      <path d="M 29 140 C 27 137, 29 133, 33 132" stroke={stroke} strokeWidth="1.4" />
      {/* Lower left flame wisp */}
      <path d="M 35 166 C 33 172, 36 179, 42 182 C 45 184, 48 186, 50 186" stroke={stroke} strokeWidth="1.6" />

      {/* Ornate Filigree Spirals / Clouds on Right (Bottom) */}
      <path
        d="M 67 134 C 74 135, 77 142, 75 149 C 73 155, 67 154, 65 152 C 63 150, 63 146, 66 144 C 70 142, 73 146, 72 150 C 71 158, 62 164, 59 167"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M 77 146 C 80 152, 78 159, 73 164 C 68 168, 62 169, 59 167" stroke={stroke} strokeWidth="1.5" />
      <path d="M 71 140 C 73 137, 71 133, 67 132" stroke={stroke} strokeWidth="1.4" />
      {/* Lower right flame wisp */}
      <path d="M 65 166 C 67 172, 64 179, 58 182 C 55 184, 52 186, 50 186" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
};
