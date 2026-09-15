import React from 'react';

interface BhisezLogoProps {
  compact?: boolean;
  className?: string;
  onDark?: boolean;
  align?: 'left' | 'center';
  showBadgeIcon?: boolean;
}

/**
 * Official Bhisez Furniture Brand Identity
 * 
 * Palette:
 * - 🟡 Gold / Yellow (#FFC102 / RGB 255, 193, 2): Main "Bhisez" text
 * - 🔴 Red (#E73129 / RGB 231, 49, 41): Dot above the "i"
 * - 🟤 Dark Brown (#5F220F / RGB 95, 34, 15): "FURNITURE" + horizontal lines
 * - ⚫ Transparent (0, 0, 0, 0): Background
 */
export default function BhisezLogo({
  compact = false,
  className = '',
  onDark = false,
  align = 'left',
  showBadgeIcon = false
}: BhisezLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none bg-transparent ${className}`}>
      {/* Optional Monogram Brand Mark */}
      {showBadgeIcon && (
        <div 
          className={`shrink-0 rounded-xl flex items-center justify-center font-serif font-black border transition-transform group-hover:scale-105 ${
            compact ? 'w-9 h-9 text-lg' : 'w-10 h-10 sm:w-11 sm:h-11 text-xl sm:text-2xl'
          } ${
            onDark 
              ? 'bg-[#5F220F] text-[#FFC102] border-[#FFC102]/40 shadow-xs' 
              : 'bg-[#5F220F] text-[#FFC102] border-[#5F220F] shadow-xs'
          }`}
          style={{ backgroundColor: '#5F220F' }}
        >
          <span className="relative text-[#FFC102]">
            B
            {/* Signature red dot accent */}
            <span 
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#E73129] ring-1 ring-white/50" 
              aria-hidden="true" 
            />
          </span>
        </div>
      )}

      {/* Main Brand Typography Block */}
      <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
        
        {/* Row 1: "Bhisez" with Gold text and Red dot above the "i" */}
        <div className="flex items-baseline leading-none">
          <span 
            className={`font-serif font-black tracking-tight ${
              compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-[32px]'
            }`}
            style={{ color: '#FFC102' }}
          >
            Bh
            {/* The letter 'i' with custom Red dot (#E73129) */}
            <span className="relative inline-block">
              {/* Dotless 'i' stem in Gold (#FFC102) */}
              <span>ı</span>
              {/* Red dot above 'i' */}
              <span 
                className="absolute -top-[0.2em] left-1/2 -translate-x-1/2 w-[0.24em] h-[0.24em] rounded-full bg-[#E73129] shadow-xs"
                style={{ backgroundColor: '#E73129' }}
                aria-hidden="true"
              />
            </span>
            sez
          </span>
        </div>

        {/* Row 2: "FURNITURE" + Horizontal Lines in Dark Brown (#5F220F) */}
        <div className="flex items-center justify-between gap-1.5 w-full mt-1">
          <span 
            className="h-[1.5px] flex-1 rounded-full"
            style={{ backgroundColor: onDark ? '#FFC102' : '#5F220F' }}
          />
          <span 
            className={`font-sans font-black tracking-[0.28em] uppercase whitespace-nowrap px-0.5 leading-none ${
              compact ? 'text-[8px] sm:text-[9px]' : 'text-[9.5px] sm:text-[10.5px]'
            }`}
            style={{ color: onDark ? '#FFC102' : '#5F220F' }}
          >
            FURNITURE
          </span>
          <span 
            className="h-[1.5px] flex-1 rounded-full"
            style={{ backgroundColor: onDark ? '#FFC102' : '#5F220F' }}
          />
        </div>

      </div>
    </div>
  );
}
