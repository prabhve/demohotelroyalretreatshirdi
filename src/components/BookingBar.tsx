import React, { useState } from 'react';
import { Calendar, Users, BedDouble, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface BookingBarProps {
  className?: string;
  onExploreRooms?: () => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({ className = '', onExploreRooms }) => {
  const { config, openWhatsApp, openBookingModal } = useHotel();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDateForInput = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDateForInput(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDateForInput(dayAfter));
  const [guests, setGuests] = useState<string>('2 Adults');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('any');

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal({
      roomId: selectedRoomId !== 'any' ? selectedRoomId : undefined,
      checkIn,
      checkOut,
      guests
    });
  };

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const room = config.rooms.find(r => r.id === selectedRoomId);
    const roomName = room ? room.name : 'Any Available Room (Double / Triple / Family)';

    openWhatsApp('room', {
      ROOM_NAME: roomName,
      CHECK_IN: checkIn || 'Upcoming date',
      CHECK_OUT: checkOut || 'Next day',
      GUESTS: guests
    });
  };

  return (
    <div
      id="booking-enquiry-bar"
      className={`bg-[#fdfaf5] rounded-2xl shadow-2xl border border-[#b45309]/30 p-4 sm:p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#b45309]/15">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
          <span className="text-xs uppercase tracking-wider font-bold text-[#b45309]">
            Instant Pilgrimage Stay & Tariff Enquiry
          </span>
        </div>
        <span className="text-[11px] text-[#78350f] font-medium hidden sm:inline">
          Best Rate Guarantee • Direct WhatsApp with Front Desk
        </span>
      </div>

      <form onSubmit={handleCheckAvailability}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
          {/* Check-In */}
          <div className="space-y-1">
            <label htmlFor="booking-checkin" className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#23150d]">
              <Calendar className="w-3.5 h-3.5 text-[#b45309]" />
              Check-In Date
            </label>
            <input
              id="booking-checkin"
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] font-medium focus:outline-none focus:border-[#b45309] transition-colors"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1">
            <label htmlFor="booking-checkout" className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#23150d]">
              <Calendar className="w-3.5 h-3.5 text-[#b45309]" />
              Check-Out Date
            </label>
            <input
              id="booking-checkout"
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] font-medium focus:outline-none focus:border-[#b45309] transition-colors"
              required
            />
          </div>

          {/* Guests */}
          <div className="space-y-1">
            <label htmlFor="booking-guests" className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#23150d]">
              <Users className="w-3.5 h-3.5 text-[#b45309]" />
              Pilgrims / Guests
            </label>
            <select
              id="booking-guests"
              value={guests}
              onChange={e => setGuests(e.target.value)}
              className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] font-medium focus:outline-none focus:border-[#b45309] transition-colors cursor-pointer"
            >
              <option value="1 Adult (Solo Pilgrim)">1 Adult (Solo Devotee)</option>
              <option value="2 Adults (Couple / Family)">2 Adults (Couple / Friends)</option>
              <option value="3 Guests (Triple Family)">3 Guests (Family / Triple Room)</option>
              <option value="4 Guests (Family Suite)">4 Guests (Deluxe Family Suite)</option>
              <option value="5+ Guests (Large Group)">5+ Guests (Family Yatra Group)</option>
            </select>
          </div>

          {/* Room Selection */}
          <div className="space-y-1">
            <label htmlFor="booking-room" className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#23150d]">
              <BedDouble className="w-3.5 h-3.5 text-[#b45309]" />
              Room Type
            </label>
            <select
              id="booking-room"
              value={selectedRoomId}
              onChange={e => setSelectedRoomId(e.target.value)}
              className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] font-medium focus:outline-none focus:border-[#b45309] transition-colors cursor-pointer"
            >
              <option value="any">Best Available Room</option>
              {config.rooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.name} ({room.bedConfig})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Bar & Action Row */}
        <div className="mt-4 pt-3.5 border-t border-[#b45309]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#23150d]/80">
            <ShieldCheck className="w-4 h-4 text-[#b45309] shrink-0" />
            <span>Zero booking commission • Instant confirmation from Hotel Royal Retreat Desk</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {onExploreRooms && (
              <button
                type="button"
                id="booking-bar-explore-rooms-btn"
                onClick={onExploreRooms}
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-[#23150d] hover:text-[#b45309] px-3 py-2 transition-colors cursor-pointer"
              >
                <span>View Photos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={handleDirectWhatsApp}
              id="booking-bar-whatsapp-btn"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 bg-[#f6efe3] hover:bg-[#e8ded1] text-[#23150d] border border-[#d6c2a8] px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#b45309]" />
              <span>WhatsApp</span>
            </button>

            <button
              type="submit"
              id="booking-bar-check-avail-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              <BedDouble className="w-4 h-4" />
              <span>Send Booking Request</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
