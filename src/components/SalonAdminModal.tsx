import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Check, RefreshCw, Calendar, Tag, Database, Sparkles, Download } from 'lucide-react';
import { ServiceItem, OfferItem, BookingDetails } from '../types';

interface SalonAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  onUpdateServices: (updated: ServiceItem[]) => void;
  offers: OfferItem[];
  onUpdateOffers: (updated: OfferItem[]) => void;
}

export const SalonAdminModal: React.FC<SalonAdminModalProps> = ({
  isOpen,
  onClose,
  services,
  onUpdateServices,
  offers,
  onUpdateOffers,
}) => {
  const [activeTab, setActiveTab] = useState<'SERVICES' | 'OFFERS' | 'BOOKINGS'>('SERVICES');
  const [localBookings, setLocalBookings] = useState<BookingDetails[]>([]);

  // Editing service state
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);
  
  // Editing offer state
  const [editingOffer, setEditingOffer] = useState<Partial<OfferItem> | null>(null);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('h2o_local_bookings') || '[]');
        setLocalBookings(stored);
      } catch {
        // fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Service Save
  const handleSaveService = () => {
    if (!editingService?.name) return;

    if (editingService.id) {
      const updated = services.map((s) =>
        s.id === editingService.id ? ({ ...s, ...editingService } as ServiceItem) : s
      );
      onUpdateServices(updated);
    } else {
      const newService: ServiceItem = {
        id: `s-${Date.now()}`,
        name: editingService.name,
        category: (editingService.category as any) || 'HAIR',
        description: editingService.description || '',
        duration: editingService.duration || '45 mins',
        price: editingService.price || undefined,
        popular: editingService.popular || false,
        forGender: editingService.forGender || 'UNISEX',
      };
      onUpdateServices([newService, ...services]);
    }
    setEditingService(null);
  };

  // Handle Service Delete
  const handleDeleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      onUpdateServices(services.filter((s) => s.id !== id));
    }
  };

  // Handle Offer Toggle
  const handleToggleOffer = (id: string) => {
    const updated = offers.map((o) => (o.id === id ? { ...o, active: !o.active } : o));
    onUpdateOffers(updated);
  };

  // Export JSON Configuration
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ services, offers, exportedAt: new Date().toISOString() }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `h2o_salon_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#0c0f12] border border-white/20 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2A8C9E]" />
            <h3 className="font-serif-custom text-2xl text-[#FAF8F5]">Salon Owner Admin Portal</h3>
            <span className="text-[10px] font-mono bg-[#2A8C9E]/20 text-[#2A8C9E] px-2 py-0.5 rounded-sm">
              LIVE DATA
            </span>
          </div>

          <button onClick={onClose} className="p-1 text-[#E6DFD3]/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-6 border-b border-white/10 bg-white/5">
          <div className="flex gap-4 text-xs font-mono">
            <button
              onClick={() => setActiveTab('SERVICES')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'SERVICES'
                  ? 'border-[#2A8C9E] text-white font-bold'
                  : 'border-transparent text-[#E6DFD3]/60 hover:text-white'
              }`}
            >
              MANAGE SERVICES ({services.length})
            </button>
            <button
              onClick={() => setActiveTab('OFFERS')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'OFFERS'
                  ? 'border-[#2A8C9E] text-white font-bold'
                  : 'border-transparent text-[#E6DFD3]/60 hover:text-white'
              }`}
            >
              SPECIAL OFFERS ({offers.length})
            </button>
            <button
              onClick={() => setActiveTab('BOOKINGS')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'BOOKINGS'
                  ? 'border-[#2A8C9E] text-white font-bold'
                  : 'border-transparent text-[#E6DFD3]/60 hover:text-white'
              }`}
            >
              ONLINE REQUESTS ({localBookings.length})
            </button>
          </div>

          <button
            onClick={handleExportJSON}
            className="py-1.5 px-3 bg-white/10 hover:bg-white/20 text-[#FAF8F5] text-[11px] font-mono rounded-sm flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#2A8C9E]" />
            <span>EXPORT CONFIG JSON</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* SERVICES TAB */}
          {activeTab === 'SERVICES' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#E6DFD3]/70">
                  Update service descriptions, duration, pricing, or add new treatments.
                </p>
                <button
                  onClick={() =>
                    setEditingService({
                      name: '',
                      category: 'HAIR',
                      description: '',
                      duration: '45 mins',
                      price: undefined,
                      popular: false,
                    })
                  }
                  className="px-3 py-1.5 bg-[#2A8C9E] text-white text-xs font-bold rounded-sm flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD SERVICE</span>
                </button>
              </div>

              {/* Service Edit Form */}
              {editingService && (
                <div className="p-4 bg-white/5 border border-[#2A8C9E] rounded-sm space-y-3 text-xs">
                  <h4 className="font-bold text-[#FAF8F5]">
                    {editingService.id ? 'Edit Service Details' : 'New Service Specification'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-[#E6DFD3] mb-1">NAME</label>
                      <input
                        type="text"
                        value={editingService.name || ''}
                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                        className="w-full bg-[#0c0f12] border border-white/20 text-white p-2 rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#E6DFD3] mb-1">CATEGORY</label>
                      <select
                        value={editingService.category || 'HAIR'}
                        onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                        className="w-full bg-[#0c0f12] border border-white/20 text-white p-2 rounded-sm"
                      >
                        <option value="HAIR">HAIR</option>
                        <option value="SKIN">SKIN</option>
                        <option value="MAKEUP">MAKEUP</option>
                        <option value="GROOMING">GROOMING</option>
                        <option value="BRIDAL">BRIDAL</option>
                        <option value="TREATMENTS">TREATMENTS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-[#E6DFD3] mb-1">DESCRIPTION</label>
                    <textarea
                      rows={2}
                      value={editingService.description || ''}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                      className="w-full bg-[#0c0f12] border border-white/20 text-white p-2 rounded-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono text-[#E6DFD3] mb-1">DURATION</label>
                      <input
                        type="text"
                        placeholder="e.g. 60 mins"
                        value={editingService.duration || ''}
                        onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                        className="w-full bg-[#0c0f12] border border-white/20 text-white p-2 rounded-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#E6DFD3] mb-1">PRICE (Leave blank for Consultation)</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹1,200"
                        value={editingService.price || ''}
                        onChange={(e) => setEditingService({ ...editingService, price: e.target.value || undefined })}
                        className="w-full bg-[#0c0f12] border border-white/20 text-white p-2 rounded-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <input
                        type="checkbox"
                        id="popular-check"
                        checked={editingService.popular || false}
                        onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                        className="w-4 h-4 accent-[#2A8C9E]"
                      />
                      <label htmlFor="popular-check" className="text-xs text-[#FAF8F5]">
                        Popular Tag
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setEditingService(null)}
                      className="px-3 py-1.5 text-xs text-[#E6DFD3]/60 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveService}
                      className="px-4 py-1.5 bg-[#2A8C9E] text-white text-xs font-bold rounded-sm"
                    >
                      Save Service
                    </button>
                  </div>
                </div>
              )}

              {/* Service Table */}
              <div className="space-y-2">
                {services.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between text-xs hover:border-white/20"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#FAF8F5]">{s.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 bg-white/10 text-[#2A8C9E] rounded-xs">
                          {s.category}
                        </span>
                        {s.popular && <span className="text-[9px] text-[#2A8C9E] font-bold">★ POPULAR</span>}
                      </div>
                      <p className="text-[11px] text-[#E6DFD3]/60 line-clamp-1">{s.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-serif-custom text-xs font-semibold text-[#2A8C9E]">
                        {s.price || 'Price on consultation'}
                      </span>

                      <button
                        onClick={() => setEditingService(s)}
                        className="p-1.5 text-[#E6DFD3]/60 hover:text-white"
                        aria-label="Edit service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteService(s.id)}
                        className="p-1.5 text-red-400 hover:text-red-300"
                        aria-label="Delete service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OFFERS TAB */}
          {activeTab === 'OFFERS' && (
            <div className="space-y-4">
              <p className="text-xs text-[#E6DFD3]/70">
                Activate or deactivate weekly promotional privileges displayed on the website.
              </p>

              <div className="space-y-3">
                {offers.map((off) => (
                  <div
                    key={off.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#FAF8F5]">{off.title}</span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                            off.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {off.active ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#E6DFD3]/60">{off.subtitle} — {off.description}</p>
                    </div>

                    <button
                      onClick={() => handleToggleOffer(off.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-sm ${
                        off.active ? 'bg-red-500/20 text-red-300' : 'bg-[#2A8C9E] text-white'
                      }`}
                    >
                      {off.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === 'BOOKINGS' && (
            <div className="space-y-4 text-xs">
              <p className="text-xs text-[#E6DFD3]/70">
                Local appointment reservation tickets submitted through the website.
              </p>

              {localBookings.length === 0 ? (
                <div className="text-center py-12 bg-white/5 border border-white/10 rounded-sm">
                  <Calendar className="w-8 h-8 text-[#2A8C9E] mx-auto mb-2 opacity-60" />
                  <p className="text-[#FAF8F5] font-serif-custom text-lg">No Online Requests Recorded Yet</p>
                  <p className="text-[11px] text-[#E6DFD3]/50">Test the booking modal on the website to see live entries here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {localBookings.map((b) => (
                    <div key={b.id} className="p-4 bg-white/5 border border-white/10 rounded-sm space-y-2">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-mono text-[#2A8C9E] font-bold">{b.id}</span>
                        <span className="text-[10px] text-[#E6DFD3]/50 font-mono">{b.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-[#E6DFD3]/60">Client:</span>{' '}
                          <strong className="text-white">{b.customerName} ({b.customerPhone})</strong>
                        </div>
                        <div>
                          <span className="text-[#E6DFD3]/60">Slot:</span>{' '}
                          <strong className="text-[#2A8C9E]">{b.date} @ {b.timeSlot}</strong>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#E6DFD3]/80">
                        <span className="text-[#E6DFD3]/60">Services:</span> {b.serviceNames.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
