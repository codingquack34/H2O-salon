import React from 'react';
import { MapPin, Phone, Clock, Navigation, Calendar, Compass, Car } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface LocationSectionProps {
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="location" className="py-24 bg-[#0c0f12] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-[#2A8C9E]" />
              <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
                SALON LOCATION
              </span>
            </div>
            <h2 className="font-serif-custom text-4xl sm:text-5xl font-light text-[#FAF8F5]">
              Visit Us in <span className="italic font-normal text-[#E6DFD3]">Koregaon Park</span>
            </h2>
          </div>

          <p className="text-sm text-[#E6DFD3]/70 max-w-md font-light">
            Conveniently situated in Meera Nagar, Lane 6. Surrounded by greenery with seamless vehicle access and guest parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-sm border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.25em] font-mono text-[#2A8C9E] uppercase">
                  EXACT ADDRESS
                </span>
                <h3 className="font-serif-custom text-2xl font-bold text-[#FAF8F5] mt-1 mb-2">
                  H2O Unisex Salon
                </h3>
                <p className="text-xs sm:text-sm text-[#E6DFD3]/80 font-light leading-relaxed flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#2A8C9E] shrink-0 mt-1" />
                  <span>{SALON_INFO.address}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#E6DFD3]/60 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#2A8C9E]" /> Phone:
                  </span>
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="font-semibold text-[#FAF8F5] hover:text-[#2A8C9E] transition-colors"
                  >
                    {SALON_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between py-1 border-t border-white/5">
                  <span className="text-[#E6DFD3]/60 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#2A8C9E]" /> Hours:
                  </span>
                  <span className="font-semibold text-[#FAF8F5]">10:00 AM – 8:00 PM Daily</span>
                </div>

                <div className="flex items-center justify-between py-1 border-t border-white/5">
                  <span className="text-[#E6DFD3]/60 flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-[#2A8C9E]" /> Parking:
                  </span>
                  <span className="font-semibold text-[#FAF8F5]">Doorstep Vehicle Parking</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-xs space-y-1">
                <p className="font-semibold text-[#2A8C9E] uppercase text-[10px] tracking-wider">
                  LANDMARK GUIDE
                </p>
                <p className="text-[#E6DFD3]/80 font-light">
                  Near Meera Nagar Garden, Lane No. 6, Koregaon Park.
                </p>
              </div>
            </div>

            {/* Quick Location CTAs */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#FAF8F5] text-[#0c0f12] text-xs font-bold tracking-wider rounded-sm flex items-center justify-center gap-2 hover:bg-[#E6DFD3] transition-colors shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#0c0f12]" />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="py-2.5 px-3 bg-white/5 text-[#FAF8F5] border border-white/10 text-xs font-medium rounded-sm flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2A8C9E]" />
                  <span>Call H2O</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="py-2.5 px-3 bg-white/5 text-[#FAF8F5] border border-white/10 text-xs font-medium rounded-sm flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#2A8C9E]" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Embedded Google Map */}
          <div className="lg:col-span-7 glass-panel rounded-sm border border-white/10 overflow-hidden relative min-h-[380px] lg:min-h-full">
            <iframe
              title="H2O Salon Koregaon Park Google Map"
              src={SALON_INFO.mapEmbedUrl}
              className="w-full h-full min-h-[400px] border-0 filter contrast-[105%] grayscale-[20%]"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
