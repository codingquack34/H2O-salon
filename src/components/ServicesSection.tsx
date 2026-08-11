import React, { useState, useMemo } from 'react';
import { Search, Clock, Calendar, Sparkles, Filter, ChevronRight, Info } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceToBook: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceToBook,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState<'ALL' | 'WOMEN' | 'MEN'>('ALL');

  const categories = ['ALL', 'HAIR', 'SKIN', 'MAKEUP', 'GROOMING', 'BRIDAL', 'TREATMENTS'];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = activeCategory === 'ALL' || service.category === activeCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGender =
        selectedGenderFilter === 'ALL' ||
        service.forGender === 'UNISEX' ||
        service.forGender === selectedGenderFilter;

      return matchesCategory && matchesSearch && matchesGender;
    });
  }, [services, activeCategory, searchQuery, selectedGenderFilter]);

  return (
    <section id="services" className="py-24 bg-[#141414] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#87C1C1]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#87C1C1] uppercase font-sans-custom">
                SERVICE MENU
              </span>
            </div>
            <h2 className="font-serif-custom text-4xl sm:text-5xl font-light text-[#F5F2ED]">
              Curated Hair, Beauty <br className="hidden sm:block" />
              <span className="italic font-normal text-[#87C1C1]">&amp; Grooming Craft</span>
            </h2>
          </div>

          <p className="text-sm text-[#F5F2ED]/70 max-w-md font-light">
            Every ritual begins with a personal texture and skin consultation. All treatments strictly utilize salon-grade formulation protocols.
          </p>
        </div>

        {/* Filter and Search Bar Container */}
        <div className="glass p-4 rounded-none mb-10 space-y-4 border border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F5F2ED]/50" />
              <input
                type="text"
                placeholder="Search services (e.g., Balayage, Keratin, Facial)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-[#F5F2ED] pl-10 pr-4 py-2.5 text-xs rounded-none focus:outline-none focus:border-[#87C1C1] placeholder:text-[#F5F2ED]/40 transition-colors"
              />
            </div>

            {/* Gender Filter Buttons */}
            <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
              <span className="text-xs text-[#F5F2ED]/50 mr-2 flex items-center gap-1 font-mono">
                <Filter className="w-3 h-3" /> GENDER:
              </span>
              {(['ALL', 'WOMEN', 'MEN'] as const).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGenderFilter(gender)}
                  className={`px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                    selectedGenderFilter === gender
                      ? 'bg-[#87C1C1] text-black font-semibold'
                      : 'bg-white/5 text-[#F5F2ED]/70 hover:bg-white/10'
                  }`}
                >
                  {gender === 'ALL' ? 'ALL CLIENTS' : gender}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#F5F2ED] text-black shadow-md'
                    : 'bg-transparent text-[#F5F2ED]/60 hover:text-[#F5F2ED] hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services List Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 glass rounded-none border border-white/10">
            <Info className="w-8 h-8 text-[#87C1C1] mx-auto mb-3 opacity-70" />
            <p className="font-serif-custom text-xl text-[#F5F2ED] mb-1">No services match your search</p>
            <p className="text-xs text-[#F5F2ED]/60 max-w-sm mx-auto mb-4">
              Try searching for "Haircut", "Facial", "Beard", or reset your category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
                setSelectedGenderFilter('ALL');
              }}
              className="px-4 py-2 bg-[#87C1C1] text-black font-bold text-xs rounded-none hover:bg-[#87C1C1]/80 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative glass p-6 rounded-none border border-white/10 hover:border-[#87C1C1]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Card Header Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.2em] font-semibold text-[#87C1C1] uppercase font-mono">
                      {service.category}
                    </span>
                    {service.popular && (
                      <span className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] uppercase bg-[#87C1C1]/20 text-[#87C1C1] border border-[#87C1C1]/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> POPULAR
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-custom text-2xl font-normal text-[#F5F2ED] group-hover:text-[#87C1C1] transition-colors mb-2">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#F5F2ED]/70 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer Details & CTA */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    {service.duration ? (
                      <div className="flex items-center gap-1.5 text-[#F5F2ED]/60">
                        <Clock className="w-3.5 h-3.5 text-[#87C1C1]" />
                        <span>{service.duration}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#F5F2ED]/40">Personalized Timing</span>
                    )}

                    <div className="text-right">
                      <span className="font-serif-custom text-sm font-semibold text-[#F5F2ED]">
                        {service.price ? service.price : 'Price on consultation'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectServiceToBook(service)}
                    id={`book-service-${service.id}`}
                    className="w-full py-3 px-4 bg-white/5 hover:bg-[#F5F2ED] text-[#F5F2ED] hover:text-black border border-white/10 hover:border-[#F5F2ED] text-[10px] font-semibold tracking-[0.2em] uppercase rounded-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <Calendar className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                    <span>BOOK THIS SERVICE</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Note on Pricing */}
        <div className="mt-12 text-center text-xs text-[#F5F2ED]/50 italic font-serif-custom flex items-center justify-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#87C1C1] not-italic" />
          <span>Note: All prices are subject to hair length, density &amp; consultation at the salon.</span>
        </div>
      </div>
    </section>
  );
};
