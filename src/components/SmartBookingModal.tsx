import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail, MessageSquare, ArrowRight, ArrowLeft, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { ServiceItem, BookingDetails } from '../types';
import { SALON_INFO } from '../data/salonData';

interface SmartBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  preSelectedService?: ServiceItem | null;
  onBookingConfirmed?: (booking: BookingDetails) => void;
}

export const SmartBookingModal: React.FC<SmartBookingModalProps> = ({
  isOpen,
  onClose,
  services,
  preSelectedService,
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  
  // Customer Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Form errors
  const [phoneError, setPhoneError] = useState<string>('');
  const [completedBooking, setCompletedBooking] = useState<BookingDetails | null>(null);

  // Available Time Slots
  const timeSlots = [
    '10:30 AM', '11:15 AM', '12:00 PM',
    '01:00 PM', '02:30 PM', '04:00 PM',
    '05:30 PM', '06:30 PM', '07:15 PM'
  ];

  // Set default date to tomorrow if not set
  useEffect(() => {
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formatted = tomorrow.toISOString().split('T')[0];
      setSelectedDate(formatted);
    }
  }, [selectedDate]);

  // If preSelectedService passed, select it automatically
  useEffect(() => {
    if (preSelectedService) {
      setSelectedServiceIds([preSelectedService.id]);
    } else if (selectedServiceIds.length === 0 && services.length > 0) {
      setSelectedServiceIds([services[0].id]);
    }
  }, [preSelectedService, services]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter((sId) => sId !== id));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const selectedServices = services.filter((s) => selectedServiceIds.includes(s.id));

  const validateStep4 = () => {
    if (!customerName.trim()) return false;
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleFinalConfirm = () => {
    if (!validateStep4()) return;

    const newBooking: BookingDetails = {
      id: `H2O-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceIds: selectedServiceIds,
      serviceNames: selectedServices.map((s) => s.name),
      totalPriceEstimate: selectedServices.some((s) => s.price) ? 'See Service Details' : 'Price on Consultation',
      date: selectedDate,
      timeSlot: selectedTimeSlot || '11:00 AM',
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
      status: 'PENDING_CONFIRMATION',
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('h2o_local_bookings') || '[]');
      localStorage.setItem('h2o_local_bookings', JSON.stringify([newBooking, ...existing]));
    } catch {
      // ignore storage error
    }

    setCompletedBooking(newBooking);
    if (onBookingConfirmed) {
      onBookingConfirmed(newBooking);
    }
    setStep(5);
  };

  // Generate WhatsApp Message Link
  const getWhatsAppBookingUrl = () => {
    const serviceNamesText = selectedServices.map((s) => s.name).join(', ');
    const text = `Hello H2O Salon! I would like to reserve an appointment:\n\n` +
      `📌 Services: ${serviceNamesText}\n` +
      `📅 Date: ${selectedDate}\n` +
      `⏰ Time: ${selectedTimeSlot || '11:00 AM'}\n` +
      `👤 Name: ${customerName}\n` +
      `📞 Phone: ${customerPhone}\n` +
      `📍 Location: Koregaon Park, Pune\n\n` +
      `Please confirm availability. Thank you!`;
    return `https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      id="booking-modal-overlay"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0c0f12] border border-white/15 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        id="booking-modal-container"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="font-serif-custom text-2xl font-bold text-[#FAF8F5]">H2O</span>
            <span className="text-xs text-[#2A8C9E] font-mono uppercase tracking-widest">
              · APPOINTMENT RESERVATION
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#E6DFD3]/60 hover:text-white rounded-md hover:bg-white/10"
            aria-label="Close booking modal"
            id="close-booking-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-mono text-[#E6DFD3]/70">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#2A8C9E] text-white flex items-center justify-center text-[10px] font-bold">
              {step}
            </span>
            <span className="uppercase text-[#FAF8F5] tracking-wider">
              {step === 1 && 'Step 1: Select Service(s)'}
              {step === 2 && 'Step 2: Select Date'}
              {step === 3 && 'Step 3: Choose Time Slot'}
              {step === 4 && 'Step 4: Your Contact Details'}
              {step === 5 && 'Step 5: Booking Summary'}
            </span>
          </div>

          <span className="text-[10px] text-[#E6DFD3]/50">STEP {step} OF 5</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: SELECT SERVICES */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-custom text-2xl text-[#FAF8F5] mb-1">Select Service(s)</h3>
                <p className="text-xs text-[#E6DFD3]/70">You can select multiple treatments for a single session.</p>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {services.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-sm border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#2A8C9E]/15 border-[#2A8C9E] text-[#FAF8F5]'
                          : 'bg-white/5 border-white/10 hover:border-white/20 text-[#E6DFD3]/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                            isSelected ? 'bg-[#2A8C9E] border-[#2A8C9E]' : 'border-white/30'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#FAF8F5]">{service.name}</p>
                          <p className="text-[11px] text-[#E6DFD3]/60">{service.category} · {service.duration || 'Consultation'}</p>
                        </div>
                      </div>

                      <span className="text-xs font-serif-custom font-semibold text-[#2A8C9E]">
                        {service.price ? service.price : 'Price on consultation'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE DATE */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-custom text-2xl text-[#FAF8F5] mb-1">Preferred Date</h3>
                <p className="text-xs text-[#E6DFD3]/70">Choose your preferred visit date at Koregaon Park salon.</p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-[#E6DFD3] font-mono">SELECT DATE:</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 text-[#FAF8F5] p-3 text-sm rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                />

                <div className="p-4 bg-white/5 border border-white/10 rounded-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#2A8C9E]">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold uppercase tracking-wider">H2O Operating Hours</span>
                  </div>
                  <p className="text-xs text-[#E6DFD3]/80 font-sans-custom">
                    Open daily from <strong className="text-white">10:00 AM to 8:00 PM</strong> at Lane No. 6, Meera Nagar, Koregaon Park, Pune.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE TIME SLOT */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-custom text-2xl text-[#FAF8F5] mb-1">Select Time Slot</h3>
                <p className="text-xs text-[#E6DFD3]/70">Pick an available time window for your visit.</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => {
                  const isSelected = selectedTimeSlot === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`py-3 px-2 text-xs font-semibold rounded-sm border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2A8C9E] text-white border-[#2A8C9E] shadow-md'
                          : 'bg-white/5 text-[#E6DFD3]/80 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-serif-custom text-2xl text-[#FAF8F5] mb-1">Customer Information</h3>
                <p className="text-xs text-[#E6DFD3]/70">Enter your details to generate your reservation ticket.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                    FULL NAME <span className="text-[#2A8C9E]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E6DFD3]/40" />
                    <input
                      type="text"
                      placeholder="e.g. Ananya Deshmukh"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] pl-9 pr-3 py-2.5 text-xs rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                    PHONE NUMBER <span className="text-[#2A8C9E]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E6DFD3]/40" />
                    <input
                      type="tel"
                      placeholder="+91 98501 00000"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        setPhoneError('');
                      }}
                      className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] pl-9 pr-3 py-2.5 text-xs rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    />
                  </div>
                  {phoneError && <p className="text-[11px] text-red-400 mt-1">{phoneError}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                    EMAIL ADDRESS <span className="text-[#E6DFD3]/40">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E6DFD3]/40" />
                    <input
                      type="email"
                      placeholder="ananya@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] pl-9 pr-3 py-2.5 text-xs rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                    SPECIAL REQUESTS / HAIR NOTES <span className="text-[#E6DFD3]/40">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-[#E6DFD3]/40" />
                    <textarea
                      rows={2}
                      placeholder="Specify hair length, preferred stylist, or allergies..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] pl-9 pr-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION & WHATSAPP ACTION */}
          {step === 5 && completedBooking && (
            <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#2A8C9E]/20 text-[#2A8C9E] flex items-center justify-center mx-auto border border-[#2A8C9E]/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#2A8C9E] uppercase tracking-widest">
                  REF: {completedBooking.id}
                </span>
                <h3 className="font-serif-custom text-3xl text-[#FAF8F5] mt-1">Booking Ticket Created!</h3>
                <p className="text-xs text-[#E6DFD3]/70 max-w-md mx-auto mt-2">
                  Your appointment request has been recorded locally. For instant confirmation from the Koregaon Park reception desk, tap below:
                </p>
              </div>

              {/* Summary Card */}
              <div className="glass-panel p-4 rounded-sm border border-white/10 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#E6DFD3]/60">Client:</span>
                  <span className="font-bold text-[#FAF8F5]">{completedBooking.customerName} ({completedBooking.customerPhone})</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#E6DFD3]/60">Services:</span>
                  <span className="font-bold text-[#FAF8F5]">{completedBooking.serviceNames.join(', ')}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-[#E6DFD3]/60">Scheduled:</span>
                  <span className="font-bold text-[#2A8C9E]">{completedBooking.date} @ {completedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E6DFD3]/60">Location:</span>
                  <span className="text-[#FAF8F5]">Lane 6, Koregaon Park, Pune</span>
                </div>
              </div>

              {/* Instant WhatsApp & Phone Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppBookingUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 bg-[#25D366] text-black font-bold text-xs tracking-wider rounded-sm shadow-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>CONFIRM INSTANTLY VIA WHATSAPP</span>
                </a>

                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="w-full py-3 px-4 bg-white/5 border border-white/15 text-[#FAF8F5] font-medium text-xs rounded-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#2A8C9E]" />
                  <span>OR CALL RECEPTION (+91 98501 80031)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/[0.02]">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-[#E6DFD3]/80 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => {
                  if (step === 3 && !selectedTimeSlot) {
                    setSelectedTimeSlot('11:00 AM');
                  }
                  setStep(step + 1);
                }}
                className="px-6 py-2.5 bg-[#FAF8F5] text-[#0c0f12] text-xs font-bold tracking-wider rounded-sm hover:bg-[#E6DFD3] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>NEXT STEP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinalConfirm}
                className="px-6 py-2.5 bg-[#2A8C9E] text-white text-xs font-bold tracking-wider rounded-sm hover:bg-[#2A8C9E]/80 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONFIRM APPOINTMENT</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
