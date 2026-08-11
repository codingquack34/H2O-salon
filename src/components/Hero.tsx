import React from 'react';
import { Calendar, Compass, MapPin, ChevronDown, Star } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#141414]">
      {/* Background Image with Layered Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=85"
          alt="H2O Salon Luxury Interior"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 opacity-25 grayscale"
          referrerPolicy="no-referrer"
        />
        {/* Dark Editorial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-[#141414]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-[#141414]" />
        <div className="absolute inset-0 animate-water-shimmer opacity-20 pointer-events-none" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Copy Column */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#87C1C1]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#87C1C1] font-sans-custom font-semibold">
              WHERE BEAUTY MEETS PRECISION
            </span>
          </div>

          <h1 className="font-serif-custom text-6xl sm:text-7xl lg:text-8xl font-light text-[#F5F2ED] leading-[0.9] tracking-tight">
            The Art of<br />
            <span className="italic font-light text-[#87C1C1] pl-4 sm:pl-8">Transformation.</span>
          </h1>

          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#F5F2ED]/70 font-light">
            A refined hair, skin, and grooming experience in the heart of Pune. Experience luxury editorial styling with international expertise at Lane No. 6, Koregaon Park.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              id="hero-book-primary-btn"
              className="bg-[#F5F2ED] text-black px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span>Book Appointment</span>
            </button>

            <a
              href="#services"
              onClick={handleScrollToServices}
              id="hero-explore-secondary-btn"
              className="border border-ivory px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#F5F2ED] hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Menu</span>
            </a>
          </div>

          {/* Location details row */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-8 text-[10px] tracking-[0.2em] uppercase text-[#F5F2ED]/50 font-sans-custom">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#87C1C1]" /> PUNE · KOREGAON PARK
            </span>
            <span>HOURS: 10 AM — 08 PM</span>
            <span className="text-[#87C1C1] font-bold">1,100+ REVIEWS</span>
          </div>
        </div>

        {/* Right Glass Card Column */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <div className="glass p-8 border border-white/10 rounded-none w-full max-w-md space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#87C1C1]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-end pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#87C1C1]">Rating &amp; Reputation</span>
                <div className="text-4xl sm:text-5xl font-serif-custom italic text-[#F5F2ED] mt-1 flex items-baseline">
                  4.4<span className="text-xl not-italic text-[#87C1C1] ml-1">★</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] tracking-[0.2em] text-[#F5F2ED]/60 uppercase font-sans-custom">Verified Reviews</div>
                <div className="text-xl font-serif-custom text-[#F5F2ED]">{SALON_INFO.reviewCount}</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm italic text-[#F5F2ED]/80 leading-relaxed font-serif-custom">
              "H2O remains the gold standard for luxury hair styling and skin rejuvenation in Koregaon Park. The precision in their craft is unmatched."
            </p>

            <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#F5F2ED]/40 block mb-1">Location</span>
                <span className="text-xs font-light text-[#F5F2ED]">Lane No. 6, Meera Nagar</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#F5F2ED]/40 block mb-1">Helpline</span>
                <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-xs font-light text-[#87C1C1] hover:underline">
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#brand"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#F5F2ED]/40 hover:text-[#87C1C1] transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase font-sans-custom">SCROLL</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
