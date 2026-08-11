import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickActionBar } from './components/QuickActionBar';
import { BrandIntro } from './components/BrandIntro';
import { ServicesSection } from './components/ServicesSection';
import { SmartBookingModal } from './components/SmartBookingModal';
import { LookbookGallery } from './components/LookbookGallery';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ReviewsSection } from './components/ReviewsSection';
import { WhyH2OSection } from './components/WhyH2OSection';
import { SalonExperience } from './components/SalonExperience';
import { OffersSection } from './components/OffersSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SalonAdminModal } from './components/SalonAdminModal';

import {
  INITIAL_SERVICES,
  GALLERY_ITEMS,
  BEFORE_AFTER_ITEMS,
  REVIEWS_DATA,
  INITIAL_OFFERS,
} from './data/salonData';
import { ServiceItem, OfferItem, ReviewItem } from './types';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('h2o_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [offers, setOffers] = useState<OfferItem[]>(() => {
    try {
      const saved = localStorage.getItem('h2o_offers');
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('h2o_reviews');
      return saved ? JSON.parse(saved) : REVIEWS_DATA;
    } catch {
      return REVIEWS_DATA;
    }
  });

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preSelectedService, setPreSelectedService] = useState<ServiceItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync services state to localStorage
  const handleUpdateServices = (updated: ServiceItem[]) => {
    setServices(updated);
    try {
      localStorage.setItem('h2o_services', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Sync offers state to localStorage
  const handleUpdateOffers = (updated: OfferItem[]) => {
    setOffers(updated);
    try {
      localStorage.setItem('h2o_offers', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddReview = (newReview: ReviewItem) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('h2o_reviews', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenBookingWithService = (service: ServiceItem) => {
    setPreSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setPreSelectedService(null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#F5F2ED] flex flex-col font-sans-custom selection:bg-[#87C1C1]/30 selection:text-[#F5F2ED]">
      {/* Sticky Header */}
      <Navbar
        onOpenBooking={handleOpenGeneralBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Full-screen Hero */}
        <Hero onOpenBooking={handleOpenGeneralBooking} />

        {/* Brand Introduction */}
        <BrandIntro />

        {/* Interactive Services Catalog */}
        <ServicesSection
          services={services}
          onSelectServiceToBook={handleOpenBookingWithService}
        />

        {/* Promotional Offers Module */}
        <OffersSection
          offers={offers}
          onOpenBooking={handleOpenGeneralBooking}
        />

        {/* Lookbook Gallery */}
        <LookbookGallery items={GALLERY_ITEMS} />

        {/* Interactive Before & After Transformations */}
        <BeforeAfterSlider items={BEFORE_AFTER_ITEMS} />

        {/* Why H2O Pillars */}
        <WhyH2OSection />

        {/* Salon Experience & Interior */}
        <SalonExperience />

        {/* Customer Reviews */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Salon Location & Map */}
        <LocationSection onOpenBooking={handleOpenGeneralBooking} />

        {/* Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenGeneralBooking}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <QuickActionBar onOpenBooking={handleOpenGeneralBooking} />

      {/* Multi-step Smart Booking Modal */}
      <SmartBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        preSelectedService={preSelectedService}
      />

      {/* Salon Owner Admin Portal Modal */}
      <SalonAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        services={services}
        onUpdateServices={handleUpdateServices}
        offers={offers}
        onUpdateOffers={handleUpdateOffers}
      />
    </div>
  );
}
