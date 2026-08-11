import React from 'react';
import { UserCheck, Scissors, ShieldCheck, Sparkles, Coffee, MapPin } from 'lucide-react';

export const WhyH2OSection: React.FC = () => {
  const pillars = [
    {
      icon: UserCheck,
      title: "PERSONALIZED CONSULTATION",
      description: "Every cut, tone, or skin ritual begins with a dedicated face silhouette and hair porosity analysis."
    },
    {
      icon: Scissors,
      title: "PRECISION HAIR CRAFT",
      description: "Stylists trained in international cutting geometry, freehand balayage techniques, and seamless texture blending."
    },
    {
      icon: ShieldCheck,
      title: "HYGIENE & SANITATION",
      description: "Hospital-grade tool sterilization, single-use client capes, and spotless treatment stations for total comfort."
    },
    {
      icon: Sparkles,
      title: "PREMIUM FORMULATIONS",
      description: "Exclusively using professional hair and skin care lines tailored for Indian hair texture and urban climate."
    },
    {
      icon: Coffee,
      title: "SERENE BOUTIQUE AMBIENCE",
      description: "A tranquil soundscape, comfortable reclining wash lounges, and artisanal hot beverages served during sessions."
    },
    {
      icon: MapPin,
      title: "KOREGAON PARK CONVENIENCE",
      description: "Situated in quiet Lane No. 6, Meera Nagar with dedicated doorstep parking and effortless accessibility."
    }
  ];

  return (
    <section className="py-24 bg-[#080a0d] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#2A8C9E]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
              THE H2O STANDARD
            </span>
            <span className="w-6 h-[1px] bg-[#2A8C9E]" />
          </div>

          <h2 className="font-serif-custom text-4xl sm:text-5xl font-light text-[#FAF8F5]">
            Why Discerning Clients <br className="hidden sm:block" />
            <span className="italic font-normal text-[#E6DFD3]">Choose H2O Koregaon Park</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-panel p-8 rounded-sm border border-white/10 hover:border-[#2A8C9E]/50 transition-all duration-300 space-y-4 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-sm bg-white/5 border border-white/10 text-[#2A8C9E] flex items-center justify-center group-hover:bg-[#2A8C9E] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif-custom text-xl text-[#FAF8F5] tracking-wide">
                  {item.title}
                </h3>

                <p className="text-xs text-[#E6DFD3]/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
