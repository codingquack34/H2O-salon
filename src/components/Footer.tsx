import React from 'react';
import { Phone, MapPin, Clock, ArrowUp, Sparkles, Navigation } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06080a] text-[#FAF8F5] pt-20 pb-24 lg:pb-12 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-custom text-4xl font-bold tracking-wider text-[#FAF8F5]">
                H2O
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2A8C9E]"></span>
            </div>

            <p className="font-serif-custom text-xl italic text-[#E6DFD3] font-light">
              "Beauty, refined."
            </p>

            <p className="text-xs text-[#E6DFD3]/70 font-light max-w-sm leading-relaxed">
              A luxury unisex beauty, hair and grooming salon in Koregaon Park, Pune. Delivering tailored precision craft, hospital-grade hygiene, and personalized aesthetic care.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 bg-[#FAF8F5] text-[#0c0f12] text-xs font-bold tracking-wider rounded-sm hover:bg-[#E6DFD3] transition-colors shadow-md"
              >
                RESERVE APPOINTMENT
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono font-semibold tracking-widest text-[#2A8C9E] uppercase">
              NAVIGATION
            </p>
            <ul className="space-y-2 text-xs font-sans-custom text-[#E6DFD3]/80">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services Menu</a></li>
              <li><a href="#brand" className="hover:text-white transition-colors">The H2O Experience</a></li>
              <li><a href="#lookbook" className="hover:text-white transition-colors">Editorial Lookbook</a></li>
              <li><a href="#transformations" className="hover:text-white transition-colors">Before &amp; After</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Google Reviews</a></li>
              <li><a href="#offers" className="hover:text-white transition-colors">This Week's Offers</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Location &amp; Directions</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <p className="text-xs font-mono font-semibold tracking-widest text-[#2A8C9E] uppercase">
              VISIT SALON
            </p>

            <div className="space-y-3 text-[#E6DFD3]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#2A8C9E] shrink-0 mt-0.5" />
                <span>Lane No. 6, Meera Nagar Garden Society, Koregaon Park, Pune 411001</span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2A8C9E] shrink-0" />
                <a href={`tel:${SALON_INFO.phoneRaw}`} className="hover:underline font-mono">
                  {SALON_INFO.phone}
                </a>
              </p>

              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2A8C9E] shrink-0" />
                <span>10:00 AM – 8:00 PM (Daily)</span>
              </p>

              <p className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#2A8C9E] shrink-0" />
                <a
                  href={SALON_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#2A8C9E] hover:underline"
                >
                  View Google Maps Pin
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E6DFD3]/50">
          <p>© {new Date().getFullYear()} H2O Salon Pune. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[10px]"
              >
                <Sparkles className="w-3 h-3 text-[#2A8C9E]" />
                <span>SALON OWNER PORTAL</span>
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
