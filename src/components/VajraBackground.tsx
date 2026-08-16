import React, { FC } from 'react';
import { VajraIcon } from './VajraIcon';

export const VajraBackground: FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Obsidian Midnight Base Layer */}
      <div className="absolute inset-0 bg-radial-gradient from-[#060D22]/60 via-[#030714]/90 to-[#02040A]" />

      {/* Ambient Deep Gold & Midnight Lighting Flares */}
      <div className="absolute -top-40 right-1/4 w-[750px] h-[750px] bg-[#A08348]/10 rounded-full blur-[180px]" />
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#071330]/60 rounded-full blur-[160px]" />
      <div className="absolute top-1/3 left-1/3 w-[900px] h-[700px] bg-[#A08348]/6 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-10 w-[700px] h-[500px] bg-[#061026]/70 rounded-full blur-[180px]" />
      <div className="absolute -bottom-20 left-1/4 w-[600px] h-[600px] bg-[#A08348]/8 rounded-full blur-[170px]" />

      {/* Structural Vajra Sacred Geometry Behind UI */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Luminous Golden Halo Rings */}
        <div className="absolute w-[800px] h-[800px] rounded-full border border-[#A08348]/12 opacity-35" />
        <div className="absolute w-[1050px] h-[1050px] rounded-full border border-[#A08348]/6 opacity-25" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-[#F3F4F6]/8 opacity-20" />

        {/* Diagonal Light Radiance Rays */}
        <div className="absolute w-[1px] h-[1200px] bg-gradient-to-b from-transparent via-[#A08348]/15 to-transparent rotate-45" />
        <div className="absolute w-[1px] h-[1200px] bg-gradient-to-b from-transparent via-[#A08348]/15 to-transparent -rotate-45" />

        {/* Central Expanded Majestic Vajra */}
        <div className="relative transform scale-[3] sm:scale-[4] lg:scale-[4.8] opacity-[0.10] transition-all duration-1000 filter blur-[1px]">
          <VajraIcon variant="gold" className="w-64 h-[512px]" glow />
        </div>
      </div>
    </div>
  );
};
