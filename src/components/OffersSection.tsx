import React from 'react';
import { Tag, Calendar, Sparkles, Copy, Check } from 'lucide-react';
import { OfferItem } from '../types';

interface OffersSectionProps {
  offers: OfferItem[];
  onOpenBooking: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ offers, onOpenBooking }) => {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const activeOffers = offers.filter((o) => o.active);

  if (activeOffers.length === 0) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-20 bg-[#080a0d] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-[#2A8C9E]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
                EXCLUSIVE PRIVILEGES
              </span>
            </div>
            <h2 className="font-serif-custom text-3xl sm:text-4xl font-light text-[#FAF8F5]">
              This Week <span className="italic font-normal text-[#E6DFD3]">at H2O Koregaon Park</span>
            </h2>
          </div>

          <p className="text-xs text-[#E6DFD3]/70 font-light max-w-sm">
            Mention offer codes during booking or present at salon reception during checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="relative glass-panel p-6 sm:p-8 rounded-sm border border-white/15 hover:border-[#2A8C9E]/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-widest bg-[#2A8C9E]/20 text-[#2A8C9E] border border-[#2A8C9E]/40 rounded-full uppercase">
                    {offer.badge || 'PROMOTION'}
                  </span>
                  <span className="text-[11px] text-[#E6DFD3]/60 font-mono">
                    {offer.validity}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-custom text-2xl sm:text-3xl font-light text-[#FAF8F5] mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2A8C9E] uppercase tracking-wider mb-3">
                    {offer.subtitle}
                  </p>
                  <p className="text-xs text-[#E6DFD3]/80 font-light leading-relaxed">
                    {offer.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                {offer.code && (
                  <button
                    onClick={() => handleCopyCode(offer.code!)}
                    className="w-full sm:w-auto px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#FAF8F5] rounded-sm border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    {copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">COPIED CODE</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#2A8C9E]" />
                        <span>CODE: {offer.code}</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-5 py-2 bg-[#FAF8F5] text-[#0c0f12] text-xs font-bold tracking-wider rounded-sm hover:bg-[#E6DFD3] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#0c0f12]" />
                  <span>CLAIM &amp; BOOK NOW</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
