import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, MapPin, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'SERVICES', href: '#services' },
    { name: 'ABOUT', href: '#brand' },
    { name: 'LOOKBOOK', href: '#lookbook' },
    { name: 'TRANSFORMATIONS', href: '#transformations' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'OFFERS', href: '#offers' },
    { name: 'LOCATION', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#141414]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-[#141414]/90 via-[#141414]/50 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2 text-left focus:outline-none"
            id="nav-logo"
          >
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif-custom text-3xl font-light tracking-[0.2em] text-[#F5F2ED] group-hover:text-[#87C1C1] transition-colors">
                  H2O
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#87C1C1] animate-pulse"></span>
              </div>
              <span className="text-[9px] tracking-[0.25em] text-[#F5F2ED]/50 uppercase font-sans-custom">
                KOREGAON PARK · PUNE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8" id="desktop-navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#F5F2ED]/70 hover:text-white transition-opacity py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center space-x-6">
            <span className="text-[10px] tracking-[0.2em] text-[#F5F2ED]/50 uppercase hidden xl:inline">
              PUNE · KOREGAON PARK
            </span>
            <button
              onClick={onOpenBooking}
              id="nav-book-now-btn"
              className="px-6 py-2 border border-ivory text-[#F5F2ED] text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors font-semibold cursor-pointer"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile Actions Right */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onOpenBooking}
              id="mobile-nav-book-btn"
              className="px-4 py-1.5 border border-ivory text-[#F5F2ED] text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              BOOK NOW
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 text-[#F5F2ED] hover:text-[#87C1C1] focus:outline-none rounded-md"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#141414]/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200"
          id="mobile-menu-overlay"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex flex-col">
              <span className="font-serif-custom text-2xl font-light tracking-[0.2em] text-[#F5F2ED]">H2O SALON</span>
              <span className="text-[10px] tracking-[0.2em] text-[#87C1C1]">KOREGAON PARK · PUNE</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#F5F2ED] hover:text-[#87C1C1]"
              aria-label="Close Menu"
              id="close-mobile-menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="my-8 flex flex-col space-y-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-serif-custom text-2xl text-[#F5F2ED] hover:text-[#87C1C1] transition-colors py-1 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#F5F2ED]/40 font-sans-custom">→</span>
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              id="mobile-overlay-book-btn"
              className="w-full py-3.5 bg-white text-black font-semibold text-[10px] tracking-[0.2em] uppercase rounded-none hover:bg-[#F5F2ED] shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK AN APPOINTMENT</span>
            </button>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="py-2.5 px-3 bg-white/5 text-[#F5F2ED] text-xs flex items-center justify-center gap-2 border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#87C1C1]" />
                <span>Call Salon</span>
              </a>
              <a
                href={SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 bg-white/5 text-[#F5F2ED] text-xs flex items-center justify-center gap-2 border border-white/10"
              >
                <MapPin className="w-3.5 h-3.5 text-[#87C1C1]" />
                <span>Directions</span>
              </a>
            </div>

            {onOpenAdmin && (
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-[11px] text-white/40 hover:text-white flex items-center justify-center gap-1 mx-auto font-mono"
                >
                  <Sparkles className="w-3 h-3 text-[#87C1C1]" />
                  <span>Salon Owner Portal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
