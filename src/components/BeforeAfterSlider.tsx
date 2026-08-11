import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { BeforeAfterItem } from '../types';

interface BeforeAfterSliderProps {
  items: BeforeAfterItem[];
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const isDragging = useRef<boolean>(false);

  const categories = ['ALL', 'COLOUR', 'HAIR', 'SKIN'];

  const filteredItems = items.filter(
    (item) => activeCategory === 'ALL' || item.category === activeCategory
  );

  const currentItem = filteredItems[activeItemIndex] || items[0];

  const handleMove = useCallback((clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <section id="transformations" className="py-24 bg-[#080a0d] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#2A8C9E]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
              TRANSFORMATION ARCHIVE
            </span>
            <span className="w-6 h-[1px] bg-[#2A8C9E]" />
          </div>
          <h2 className="font-serif-custom text-4xl sm:text-5xl font-light text-[#FAF8F5]">
            Real Results, Drag <span className="italic font-normal text-[#E6DFD3]">to Compare</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#E6DFD3]/70 font-light max-w-xl mx-auto">
            Slide horizontally across the image to reveal the before and after transformation crafted at H2O Koregaon Park.
          </p>

          {/* Categories */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveItemIndex(0);
                  setSliderPosition(50);
                }}
                className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase rounded-sm transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2A8C9E] text-white'
                    : 'bg-white/5 text-[#E6DFD3]/60 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Showcase Container */}
        {currentItem && (
          <div className="max-w-4xl mx-auto glass-panel border border-white/10 rounded-sm p-4 sm:p-6 shadow-2xl">
            {/* Title & Description */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-widest text-[#2A8C9E] font-mono uppercase">
                  {currentItem.treatmentName}
                </span>
                <h3 className="font-serif-custom text-2xl font-normal text-[#FAF8F5]">
                  {currentItem.title}
                </h3>
              </div>
              <p className="text-xs text-[#E6DFD3]/70 max-w-xs font-light">
                {currentItem.description}
              </p>
            </div>

            {/* Interactive Drag Comparison Canvas */}
            <div
              className="relative w-full h-[360px] sm:h-[480px] rounded-sm overflow-hidden select-none cursor-ew-resize touch-none border border-white/10"
              onMouseDown={() => (isDragging.current = true)}
              onMouseUp={() => (isDragging.current = false)}
              onMouseLeave={() => (isDragging.current = false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background) */}
              <img
                src={currentItem.afterImage}
                alt="After Transformation"
                className="absolute inset-0 w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-sm text-[10px] font-mono text-[#2A8C9E] border border-[#2A8C9E]/40 font-bold uppercase tracking-widest z-10">
                AFTER H2O CURE
              </div>

              {/* Before Image (Clipped Foreground) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentItem.beforeImage}
                  alt="Before Transformation"
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                  style={{ width: '100%', height: '100%' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-sm text-[10px] font-mono text-[#E6DFD3] border border-white/20 uppercase tracking-widest z-10">
                  BEFORE TREATMENT
                </div>
              </div>

              {/* Slider Handle Line */}
              <div
                className="absolute inset-y-0 w-0.5 bg-[#FAF8F5] shadow-[0_0_15px_rgba(42,140,158,0.8)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FAF8F5] text-[#0c0f12] shadow-xl flex items-center justify-center border-2 border-[#2A8C9E]">
                  <SlidersHorizontal className="w-4 h-4 text-[#0c0f12]" />
                </div>
              </div>
            </div>

            {/* Pagination Thumbnails if multiple */}
            {filteredItems.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-white/10">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveItemIndex(idx);
                      setSliderPosition(50);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-all cursor-pointer ${
                      activeItemIndex === idx
                        ? 'bg-[#2A8C9E] text-white font-bold'
                        : 'bg-white/5 text-[#E6DFD3]/60 hover:text-white'
                    }`}
                  >
                    CASE #{idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
