import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

interface LookbookGalleryProps {
  items: GalleryItem[];
}

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', 'HAIR', 'COLOUR', 'MAKEUP', 'BRIDAL', 'SALON', 'DETAILS'];

  const filteredItems = items.filter(
    (item) => activeCategory === 'ALL' || item.category === activeCategory
  );

  const handleOpenLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems]);

  const activeItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section id="lookbook" className="py-24 bg-[#0c0f12] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#2A8C9E]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
                EDITORIAL LOOKBOOK
              </span>
            </div>
            <h2 className="font-serif-custom text-4xl sm:text-5xl font-light text-[#FAF8F5]">
              The H2O Aesthetic <br className="hidden sm:block" />
              <span className="italic font-normal text-[#E6DFD3]">&amp; Visual Archive</span>
            </h2>
          </div>

          <p className="text-sm text-[#E6DFD3]/70 max-w-md font-light">
            Real client creations photographed inside our Koregaon Park salon space. Highlighting color depth, precision cuts, and wedding styling.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#2A8C9E] text-white shadow-lg'
                  : 'bg-white/5 text-[#E6DFD3]/60 hover:text-[#FAF8F5] hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative rounded-sm overflow-hidden border border-white/10 glass-panel cursor-pointer aspect-4/5 hover:border-[#2A8C9E]/60 transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Dark Overlay with Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f12] via-[#0c0f12]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[9px] tracking-[0.2em] font-mono text-[#2A8C9E] uppercase mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif-custom text-lg text-[#FAF8F5] leading-snug mb-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-[11px] text-[#E6DFD3]/70 font-light line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
          id="lightbox-overlay"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 text-white hover:text-[#2A8C9E] bg-white/10 rounded-full transition-colors z-50"
            aria-label="Close Lightbox"
            id="close-lightbox-btn"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-[#2A8C9E] bg-white/10 rounded-full transition-colors z-50"
            aria-label="Previous Image"
            id="lightbox-prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-[#2A8C9E] bg-white/10 rounded-full transition-colors z-50"
            aria-label="Next Image"
            id="lightbox-next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col md:flex-row glass-panel border border-white/20 rounded-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            id="lightbox-container"
          >
            {/* Image */}
            <div className="md:w-2/3 bg-black flex items-center justify-center p-2">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain rounded-sm"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Sidebar Details */}
            <div className="md:w-1/3 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#0c0f12]/90">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.25em] font-mono text-[#2A8C9E] uppercase">
                  {activeItem.category} · EXHIBIT {activeLightboxIndex + 1}/{filteredItems.length}
                </span>

                <h3 className="font-serif-custom text-2xl text-[#FAF8F5] leading-snug">
                  {activeItem.title}
                </h3>

                <p className="text-xs text-[#E6DFD3]/80 leading-relaxed font-light">
                  {activeItem.description || 'Crafted exclusively at H2O Unisex Salon in Koregaon Park, Pune.'}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 text-[11px] text-[#E6DFD3]/50 space-y-1">
                <p>📍 H2O Salon, Lane 6, Koregaon Park</p>
                <p>⌨️ Use Arrow keys to navigate</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
