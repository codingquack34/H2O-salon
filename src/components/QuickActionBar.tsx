import React from 'react';
import { Calendar, Phone, Navigation } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface QuickActionBarProps {
  onOpenBooking: () => void;
}

export const QuickActionBar: React.FC<QuickActionBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Mobile quick actions"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0c0f12]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
        {/* BOOK button */}
        <button
          onClick={onOpenBooking}
          id="quick-bar-book-btn"
          className="py-2.5 px-2 bg-[#FAF8F5] text-[#0c0f12] text-xs font-bold tracking-wider rounded-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5 text-[#0c0f12]" />
          <span>BOOK</span>
        </button>

        {/* CALL button */}
        <a
          href={`tel:${SALON_INFO.phoneRaw}`}
          id="quick-bar-call-btn"
          className="py-2.5 px-2 bg-white/5 border border-white/15 text-[#FAF8F5] text-xs font-medium tracking-wider rounded-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-[#2A8C9E]" />
          <span>CALL</span>
        </a>

        {/* DIRECTIONS button */}
        <a
          href={SALON_INFO.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          id="quick-bar-directions-btn"
          className="py-2.5 px-2 bg-white/5 border border-white/15 text-[#FAF8F5] text-xs font-medium tracking-wider rounded-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <Navigation className="w-3.5 h-3.5 text-[#2A8C9E]" />
          <span>MAPS</span>
        </a>
      </div>
    </aside>
  );
};
