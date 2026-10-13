import React, { useRef, useState } from 'react';
import { ArrowRight, MapPin, Eye, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ShowcaseDestination } from '../data/showcaseDestinations';
import { useLanguage } from '../context/LanguageContext';

interface Destination3DCardProps {
  dest: ShowcaseDestination;
  index: number;
  totalSlides: number;
}

export const Destination3DCard: React.FC<Destination3DCardProps> = ({
  dest,
  index,
  totalSlides,
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalizing between -1 and +1
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Subtle 3D perspective tilt
    const maxRotate = 10; // degrees
    setTilt({
      rotateX: -yPct * maxRotate,
      rotateY: xPct * maxRotate,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(dest.link)}
      style={{
        perspective: '1000px',
      }}
      className="h-full select-none"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(12px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="group relative flex flex-col h-full bg-slate-900/95 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-950/60 transition-colors duration-300 cursor-pointer"
      >
        {/* Ambient Top Glow on Hover */}
        <div
          className={`absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`}
        />

        {/* Floating Photograph Container with 3D Depth Layer */}
        <div className="relative h-60 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-950">
          <div
            style={{
              transform: isHovered ? 'scale(1.08) translateZ(20px)' : 'scale(1.0) translateZ(0px)',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="w-full h-full relative"
          >
            <img
              src={dest.image}
              alt={dest.nameEn}
              className="w-full h-full object-cover filter brightness-[0.92] group-hover:brightness-105 transition-all duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent" />
          </div>

          {/* Top Left Tag Badge with 3D Elevation */}
          <div
            style={{
              transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
              transition: 'transform 0.3s ease-out',
            }}
            className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-lg shadow-black/40 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{language === 'bn' ? dest.tagBn : dest.tagEn}</span>
          </div>

          {/* Slide Counter on Top Right */}
          <div
            style={{
              transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
              transition: 'transform 0.3s ease-out',
            }}
            className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-slate-300 text-xs font-mono tabular-nums shadow-md"
          >
            {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </div>

          {/* Division and Location Overlay at Bottom of Photo */}
          <div
            style={{
              transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
              transition: 'transform 0.3s ease-out',
            }}
            className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs"
          >
            <span className="text-emerald-400 font-medium flex items-center gap-1 drop-shadow-md">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{language === 'bn' ? dest.locationBn : dest.locationEn}</span>
            </span>
            <span className="text-slate-300/90 text-[11px] drop-shadow-md font-medium">
              {language === 'bn' ? dest.divisionBn : dest.divisionEn}
            </span>
          </div>
        </div>

        {/* Card Content & Information */}
        <div
          style={{
            transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)',
            transition: 'transform 0.3s ease-out',
          }}
          className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4"
        >
          <div className="space-y-1.5">
            {/* Primary Destination Name */}
            <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors tracking-tight leading-snug">
              {language === 'bn' ? dest.nameBn : dest.nameEn}
            </h3>

            {/* Secondary Destination Name */}
            <h4 className="text-xs sm:text-sm font-semibold text-emerald-400/90 tracking-wide">
              {language === 'bn' ? dest.nameEn : dest.nameBn}
            </h4>

            {/* Short Description */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 pt-1">
              {language === 'bn' ? dest.descriptionBn : dest.descriptionEn}
            </p>
          </div>

          {/* Card Footer: Explore More Button */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium group-hover:text-slate-300 transition-colors flex items-center gap-1">
              <Compass className="w-3 h-3 text-emerald-400" />
              <span>{language === 'bn' ? 'ট্যুরিস্ট গাইড' : 'Tourist Guide'}</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(dest.link);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'bn' ? 'বিস্তারিত দেখুন' : 'Explore More'}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
