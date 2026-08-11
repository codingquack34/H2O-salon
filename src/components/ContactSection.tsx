import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Hair Care & Styling');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please provide your name and phone number.');
      return;
    }

    const submission = {
      id: `inq-${Date.now()}`,
      name,
      phone,
      email,
      service,
      preferredDate,
      message,
      submittedAt: new Date().toISOString(),
    };

    // Save to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('h2o_contact_inquiries') || '[]');
      localStorage.setItem('h2o_contact_inquiries', JSON.stringify([submission, ...existing]));
    } catch {
      // storage fallback
    }

    setSubmitted(true);
    setErrorMsg('');
  };

  const getWhatsAppDirectLink = () => {
    const text = `Hello H2O Salon! I have an inquiry:\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n` +
      `Date: ${preferredDate || 'Flexible'}\n` +
      `Message: ${message || 'General Inquiry'}`;
    return `https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-24 bg-[#080a0d] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inquiries Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-[#2A8C9E]" />
                <span className="text-xs font-semibold tracking-[0.25em] text-[#2A8C9E] uppercase font-sans-custom">
                  GET IN TOUCH
                </span>
              </div>
              <h2 className="font-serif-custom text-4xl sm:text-5xl font-light text-[#FAF8F5]">
                Start Your Beauty <br />
                <span className="italic font-normal text-[#E6DFD3]">Consultation Today</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#E6DFD3]/70 font-light leading-relaxed">
              Have questions regarding bridal packages, customized keratin treatments, or hair color consultations? Send us a message or call our reception.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#2A8C9E] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#FAF8F5]">H2O Salon Koregaon Park</p>
                  <p className="text-[#E6DFD3]/70 font-light leading-relaxed">{SALON_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#2A8C9E] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#FAF8F5]">Direct Helpline</p>
                  <a href={`tel:${SALON_INFO.phoneRaw}`} className="text-[#2A8C9E] hover:underline font-mono">
                    {SALON_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-[#2A8C9E] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-[#FAF8F5]">WhatsApp Support</p>
                  <p className="text-[#E6DFD3]/70 font-light">Instant replies during 10 AM – 8 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-sm border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#2A8C9E]/20 text-[#2A8C9E] flex items-center justify-center mx-auto border border-[#2A8C9E]/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="font-serif-custom text-3xl text-[#FAF8F5]">Inquiry Received</h3>
                <p className="text-xs text-[#E6DFD3]/80 max-w-sm mx-auto font-light leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your inquiry has been logged. Our Koregaon Park desk will contact you shortly.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppDirectLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-[#25D366] text-black text-xs font-bold rounded-sm shadow-md"
                  >
                    FORWARD TO WHATSAPP
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-4 py-2.5 bg-white/5 text-[#E6DFD3] text-xs rounded-sm hover:bg-white/10"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif-custom text-2xl text-[#FAF8F5] mb-2">Send an Inquiry</h3>

                {errorMsg && (
                  <p className="p-2.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-sm text-xs">
                    {errorMsg}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                      YOUR NAME <span className="text-[#2A8C9E]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Kulkarni"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-3 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                      PHONE NUMBER <span className="text-[#2A8C9E]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98501 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-3 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      placeholder="rohan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-3 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                      SERVICE INTEREST
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-[#0c0f12] border border-white/15 text-[#FAF8F5] p-3 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                    >
                      <option value="Hair Care & Styling">Haircut &amp; Styling</option>
                      <option value="Balayage & Hair Colour">Balayage &amp; Hair Colour</option>
                      <option value="Keratin / Cysteine">Keratin &amp; Smoothing</option>
                      <option value="HydraFacial / Skin Care">Skin Care &amp; HydraFacial</option>
                      <option value="Grooming & Beard">Men's Grooming &amp; Beard</option>
                      <option value="Bridal & Event Makeup">Bridal &amp; Event Packages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                    PREFERRED DATE
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-3 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#E6DFD3] mb-1">
                    MESSAGE OR SPECIAL REQUIREMENTS
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your hair type, event date, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 text-[#FAF8F5] p-3 rounded-sm focus:outline-none focus:border-[#2A8C9E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FAF8F5] text-[#0c0f12] text-xs font-bold tracking-[0.18em] uppercase rounded-sm hover:bg-[#E6DFD3] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#0c0f12]" />
                  <span>REQUEST AN APPOINTMENT</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
