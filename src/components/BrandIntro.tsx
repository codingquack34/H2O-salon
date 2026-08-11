import React from 'react';
import { Star, Clock, MapPin, Award, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const BrandIntro: React.FC = () => {
  return (
    <section id="brand" className="py-24 bg-[#141414] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-none overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                alt="H2O Hair Artistry Koregaon Park"
                className="w-full h-[480px] sm:h-[540px] object-cover object-center filter grayscale-[15%] contrast-[105%] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-none border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#87C1C1] uppercase font-mono">LOCATION</p>
                  <p className="font-serif-custom text-lg font-light text-[#F5F2ED]">Koregaon Park, Pune</p>
                </div>
                <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-current text-[#87C1C1]" />
                  <span className="text-xs font-bold text-white">4.4 / 5.0</span>
                </div>
              </div>
            </div>

            {/* Accent Water Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#87C1C1]/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#87C1C1]" />
                <span className="text-xs font-semibold tracking-[0.25em] text-[#87C1C1] uppercase font-sans-custom">
                  THE H2O EXPERIENCE
                </span>
              </div>
              
              <h2 className="font-serif-custom text-3xl sm:text-5xl md:text-6xl font-light text-[#F5F2ED] leading-tight">
                "Beauty is not a routine.<br />
                <span className="italic font-normal text-[#87C1C1]">It's an experience."</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#F5F2ED]/80 font-light leading-relaxed font-sans-custom space-y-4">
              Nestled in Lane No. 6, Meera Nagar, Koregaon Park, H2O represents a refined unisex destination for high-precision hair craft, bespoke skin treatments, and wedding beauty styling.
            </p>

            <p className="text-sm sm:text-base text-[#F5F2ED]/70 font-light leading-relaxed font-sans-custom">
              Our philosophy combines artistic intuition with rigorous consultation. Whether refreshing a signature fade, crafting dimensional balayage, or preparing for a bridal celebration, every session at H2O is structured around quiet luxury, hospital-grade sanitation, and tailored products.
            </p>

            {/* Real Verified Business Stats Grid */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-none bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-[#87C1C1] mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-serif-custom text-2xl font-light text-[#F5F2ED]">4.4★</span>
                </div>
                <p className="text-xs text-[#F5F2ED]/80 font-medium">Google Rating</p>
                <p className="text-[11px] text-[#F5F2ED]/50">Based on customer reviews</p>
              </div>

              <div className="p-4 rounded-none bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-[#87C1C1] mb-1">
                  <Award className="w-4 h-4" />
                  <span className="font-serif-custom text-2xl font-light text-[#F5F2ED]">1,100+</span>
                </div>
                <p className="text-xs text-[#F5F2ED]/80 font-medium font-sans-custom">Google Reviews</p>
                <p className="text-[11px] text-[#F5F2ED]/50">Verified Koregaon Park guests</p>
              </div>

              <div className="p-4 rounded-none bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 text-[#87C1C1] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-serif-custom text-2xl font-light text-[#F5F2ED]">10 AM – 8 PM</span>
                </div>
                <p className="text-xs text-[#F5F2ED]/80 font-medium font-sans-custom">Open Daily</p>
                <p className="text-[11px] text-[#F5F2ED]/50">7 Days a week in Pune</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#F5F2ED]/60 italic font-serif-custom">
              <Sparkles className="w-4 h-4 text-[#87C1C1] not-italic" />
              <span>Unisex Hair, Skin, Beauty & Grooming Suite — Koregaon Park, Pune</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
