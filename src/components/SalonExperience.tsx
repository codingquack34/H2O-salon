import React from 'react';

export const SalonExperience: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      caption: "Main Styling Suite & Ergonomic Seating"
    },
    {
      url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
      caption: "Relaxing Scalp Wash & Spa Lounge"
    },
    {
      url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      caption: "Private Bridal & Beauty Studio"
    },
    {
      url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      caption: "Custom Colour Mixing Bar"
    }
  ];

  return (
    <section className="py-24 bg-[#0c0f12] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#2A8C9E]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
              SALON ATMOSPHERE
            </span>
            <span className="w-6 h-[1px] bg-[#2A8C9E]" />
          </div>

          <h2 className="font-serif-custom text-4xl sm:text-6xl font-light text-[#FAF8F5] leading-tight">
            "Step into a space designed around <br />
            <span className="italic font-normal text-[#E6DFD3]">comfort, confidence and personal style."</span>
          </h2>

          <p className="text-sm text-[#E6DFD3]/70 font-light max-w-xl mx-auto">
            Located in Lane No. 6, Meera Nagar, Koregaon Park. Engineered with soft architectural lighting, sound dampening, and high hygiene controls.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative rounded-sm overflow-hidden border border-white/10 glass-panel h-80 hover:border-[#2A8C9E]/50 transition-all duration-500"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f12] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-[10px] font-mono text-[#2A8C9E] uppercase tracking-widest mb-0.5">
                  SPACE 0{idx + 1}
                </p>
                <p className="font-serif-custom text-base text-[#FAF8F5]">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
