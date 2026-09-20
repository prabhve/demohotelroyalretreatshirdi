import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface MobileStickyBarProps {
  onBookClick?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onBookClick }) => {
  const { config, openWhatsApp, openBookingModal } = useHotel();

  const handleBook = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      openBookingModal();
    }
  };

  return (
    <div
      id="mobile-sticky-action-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1a0f08]/95 backdrop-blur-md border-t border-[#f59e0b]/30 p-2.5 shadow-2xl safe-bottom"
    >
      <div className="grid grid-cols-3 gap-2">
        {/* CALL HOTEL */}
        <a
          id="sticky-call-btn"
          href={`tel:${config.contact.primaryPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/5 hover:bg-white/10 text-[#fcfbf7] border border-white/10 transition-colors"
          aria-label="Call Hotel directly"
        >
          <Phone className="w-4 h-4 text-[#f59e0b] mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-bold">Call Hotel</span>
        </a>

        {/* WHATSAPP */}
        <button
          id="sticky-whatsapp-btn"
          onClick={() => openWhatsApp('general')}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer shadow"
          aria-label="Chat with Hotel on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-bold">WhatsApp</span>
        </button>

        {/* BOOK / ENQUIRE */}
        <button
          id="sticky-book-btn"
          onClick={handleBook}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white font-bold transition-colors cursor-pointer shadow"
          aria-label="Book or Enquire Room"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] uppercase tracking-wider font-bold">Book Online</span>
        </button>
      </div>
    </div>
  );
};
