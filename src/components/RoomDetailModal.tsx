import React, { useState, useEffect } from 'react';
import { X, Check, BedDouble, Users, Maximize2, Eye, MessageSquare, Phone, ShieldCheck, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const RoomDetailModal: React.FC = () => {
  const { activeRoom, setSelectedRoomSlug, openWhatsApp, openBookingModal, config } = useHotel();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedRoomSlug(null);
      }
    };
    if (activeRoom) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeRoom, setSelectedRoomSlug]);

  if (!activeRoom) return null;

  const handleRequestBooking = () => {
    const r = activeRoom;
    setSelectedRoomSlug(null);
    openBookingModal({
      roomId: r.id,
      roomName: r.name
    });
  };

  const handleEnquire = () => {
    openWhatsApp('room', {
      ROOM_NAME: activeRoom.name,
      CHECK_IN: 'Upcoming date',
      CHECK_OUT: 'Next day',
      GUESTS: `${activeRoom.maxOccupancy} Guests`
    });
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % activeRoom.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + activeRoom.images.length) % activeRoom.images.length);
  };

  return (
    <div
      id="room-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setSelectedRoomSlug(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="room-modal-title"
    >
      <div
        id="room-detail-modal-content"
        className="bg-[#fdfaf5] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-[#b45309]/40 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#fdfaf5]/95 backdrop-blur-md border-b border-[#b45309]/20 gap-2">
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-[#b45309] block truncate">
              Hotel Royal Retreat • Opposite Gate No. 2
            </span>
            <h2 id="room-modal-title" className="font-serif text-lg sm:text-2xl font-bold text-[#23150d] truncate">
              {activeRoom.name}
            </h2>
          </div>
          <button
            id="close-room-modal-btn"
            onClick={() => setSelectedRoomSlug(null)}
            className="p-1.5 sm:p-2 text-[#23150d]/70 hover:text-[#23150d] rounded-full hover:bg-black/5 transition-colors cursor-pointer shrink-0"
            aria-label="Close Room Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          {/* Gallery Carousel */}
          <div className="relative rounded-2xl overflow-hidden bg-black h-56 sm:h-80 md:h-96 group border border-[#b45309]/20">
            <img
              src={activeRoom.images[activeImageIndex]}
              alt={`${activeRoom.name} photograph ${activeImageIndex + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {/* Navigation Arrows */}
            {activeRoom.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                {/* Thumb dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 px-3 py-1 rounded-full">
                  {activeRoom.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        idx === activeImageIndex ? 'bg-[#f59e0b] w-4' : 'bg-white/60'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#f6efe3] border border-[#d6c2a8]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#fdfaf5] text-[#b45309] border border-[#d6c2a8]">
                <Maximize2 className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78350f] font-bold block">Room Size</span>
                <span className="text-xs sm:text-sm font-bold text-[#23150d]">{activeRoom.sizeSqFt} sq.ft.</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#fdfaf5] text-[#b45309] border border-[#d6c2a8]">
                <BedDouble className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78350f] font-bold block">Beds</span>
                <span className="text-xs sm:text-sm font-bold text-[#23150d]">{activeRoom.bedConfig}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#fdfaf5] text-[#b45309] border border-[#d6c2a8]">
                <Users className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78350f] font-bold block">Max Capacity</span>
                <span className="text-xs sm:text-sm font-bold text-[#23150d]">Up to {activeRoom.maxOccupancy} Guests</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#fdfaf5] text-[#b45309] border border-[#d6c2a8]">
                <Flame className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78350f] font-bold block">Hot Water</span>
                <span className="text-xs sm:text-sm font-bold text-[#23150d]">24/7 Geyser</span>
              </div>
            </div>
          </div>

          {/* Description & Highlights */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#23150d] mb-2">Room Overview</h3>
            <p className="text-xs sm:text-sm text-[#23150d]/80 leading-relaxed mb-4">
              {activeRoom.description}
            </p>

            <div className="space-y-2 p-4 rounded-2xl bg-[#f6efe3] border border-[#d6c2a8]">
              <span className="text-xs uppercase tracking-wider font-bold text-[#b45309] block mb-2">
                Room Highlights
              </span>
              {activeRoom.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#23150d]">
                  <Check className="w-4 h-4 text-[#b45309] shrink-0 font-bold" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="font-serif text-lg font-bold text-[#23150d] mb-3">Included Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {activeRoom.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#f6efe3] border border-[#d6c2a8] text-xs font-medium text-[#23150d]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b45309]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Stay Policies */}
          <div className="p-4 rounded-2xl bg-[#fdfaf5] border border-[#b45309]/30 text-xs text-[#23150d]/85 space-y-1.5 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-[#23150d]">
              <ShieldCheck className="w-4 h-4 text-[#b45309]" />
              <span>Standard Check-in & Pilgrim Guidelines</span>
            </div>
            <p>• Standard Check-in: 12:00 PM | Check-out: 11:00 AM (Early check-in subject to availability for Kakad Aarti).</p>
            <p>• All adult guests must carry valid Government photo identification (Aadhar / Driving License / Passport).</p>
            <p>• Strictly 100% pure vegetarian premises. Outside alcohol and non-veg food are strictly prohibited.</p>
          </div>
        </div>

        {/* Sticky Modal Action Footer */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#fdfaf5] border-t border-[#b45309]/20 shadow-md">
          <div className="text-xs text-[#23150d]">
            <span className="font-bold text-[#b45309] block text-sm">{activeRoom.tariffNote} / night</span>
            <span className="text-[#78350f] text-[11px]">Direct hotel reservation with zero advance fee</span>
          </div>

          <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`tel:${config.contact.primaryPhone}`}
              className="px-3 py-2.5 rounded-xl border border-[#23150d]/30 hover:border-[#b45309] text-xs font-bold text-[#23150d] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#b45309]" />
              <span>Call</span>
            </a>

            <button
              type="button"
              id="room-modal-whatsapp-enquire-btn"
              onClick={handleEnquire}
              className="px-3 py-2.5 rounded-xl bg-[#f6efe3] hover:bg-[#e8ded1] text-[#23150d] border border-[#d6c2a8] text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#b45309]" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              id="room-modal-request-bkg-btn"
              onClick={handleRequestBooking}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-md"
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Request Online Booking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
