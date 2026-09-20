import React from 'react';
import { Phone, MessageSquare, MapPin, Sparkles, UtensilsCrossed, ShieldCheck, Flame, ArrowDown, Users, Calendar, BedDouble } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { BookingBar } from './BookingBar';

interface HeroProps {
  onExploreRooms: () => void;
  onExploreDining: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRooms, onExploreDining }) => {
  const { config, openWhatsApp, openBookingModal } = useHotel();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative isolate min-h-[90vh] flex flex-col justify-between pt-12 pb-14 overflow-hidden bg-[#1a0f08]">
      {/* Background Ambience: Hotel Facade & Sanctuary Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={config.identity.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85'}
          alt="Hotel Royal Retreat Shirdi exterior facade and peaceful devotee sanctuary"
          className="w-full h-full object-cover object-center opacity-60 scale-105 transition-all duration-700"
          fetchPriority="high"
        />
        {/* Balanced warm dark scrim: reveals the hotel structure clearly while preserving high contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08] via-[#1a0f08]/65 to-[#1a0f08]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f08]/95 via-[#1a0f08]/75 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 sm:pt-8 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Spiritual Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#b45309]/25 backdrop-blur-md border border-[#f59e0b]/50 text-[#fbf7f0] mb-4 sm:mb-5 shadow-lg max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold text-[#f59e0b] leading-tight">
              🌸 100M FROM SAMADHI MANDIR • OPPOSITE GATE NO. 2
            </span>
          </div>

          {/* Devotional Headline */}
          <div className="mb-4">
            <span className="text-xs sm:text-base font-serif text-[#f59e0b] tracking-wider block font-semibold mb-1">
              श्रद्धा और सबूरी • Shraddha & Saburi
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#fcfbf7] font-bold leading-[1.2] sm:leading-[1.15] tracking-tight drop-shadow-md">
              Your Serene Abode in Shirdi, <br />
              <span className="italic font-light text-[#f59e0b]">Steps from Baba&apos;s Darshan.</span>
            </h1>
          </div>

          {/* Supporting Description - Well-managed, structured presentation */}
          <div className="mb-6 sm:mb-7 max-w-2xl space-y-3">
            <p className="text-xs sm:text-base md:text-lg text-[#fcfbf7]/90 font-normal leading-relaxed drop-shadow">
              Welcome to a peaceful family sanctuary directly opposite <strong>Shri Sai Baba Samadhi Mandir Gate No. 2</strong>. Thoughtfully created for devotees seeking rest, prayer, and effortless temple access.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#f59e0b] font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                <span>2-min walk to Aarti</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                <span>24/7 hot water</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                <span>Senior lift access</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                <span>Pure veg dining</span>
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
            <button
              id="hero-book-online-btn"
              onClick={() => openBookingModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] px-6 sm:px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer transform hover:-translate-y-0.5 min-h-[44px]"
            >
              <BedDouble className="w-4 h-4" />
              <span>Book Room Online (Form)</span>
            </button>

            <button
              id="hero-book-enquire-btn"
              onClick={() => openWhatsApp('general')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#23150d]/85 border border-[#25D366]/60 hover:border-[#25D366] text-[#fcfbf7] hover:text-[#25D366] px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all backdrop-blur-sm cursor-pointer shadow-md min-h-[44px]"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Front Desk</span>
            </button>

            <a
              id="hero-call-hotel-btn"
              href={`tel:${config.contact.primaryPhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#23150d]/85 border border-[#f59e0b]/50 hover:border-[#f59e0b] text-[#fcfbf7] hover:text-[#f59e0b] px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all backdrop-blur-sm cursor-pointer shadow-md min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#f59e0b]" />
              <span>Call: {config.contact.primaryPhoneDisplay}</span>
            </a>

            <button
              id="hero-explore-rooms-btn"
              onClick={onExploreRooms}
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#f59e0b] hover:text-[#fbbf24] px-3 py-2 transition-colors cursor-pointer text-center"
            >
              <span>View Verified Rooms →</span>
            </button>
          </div>

          {/* Devotional Locality USP Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#b45309]/30 text-xs text-[#fbf7f0]/90">
            <div className="flex items-center gap-2 bg-[#23150d]/60 p-2 rounded-lg border border-[#b45309]/20">
              <MapPin className="w-4 h-4 text-[#f59e0b] shrink-0" />
              <span className="font-medium">100m to Gate 2</span>
            </div>
            <div className="flex items-center gap-2 bg-[#23150d]/60 p-2 rounded-lg border border-[#b45309]/20">
              <Flame className="w-4 h-4 text-[#f59e0b] shrink-0" />
              <span className="font-medium">24-Hr Hot Water</span>
            </div>
            <div className="flex items-center gap-2 bg-[#23150d]/60 p-2 rounded-lg border border-[#b45309]/20">
              <UtensilsCrossed className="w-4 h-4 text-[#f59e0b] shrink-0" />
              <span className="font-medium">Pure Veg & Jain</span>
            </div>
            <div className="flex items-center gap-2 bg-[#23150d]/60 p-2 rounded-lg border border-[#b45309]/20">
              <ShieldCheck className="w-4 h-4 text-[#f59e0b] shrink-0" />
              <span className="font-medium">Free Safe Parking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Enquiry Panel */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <BookingBar onExploreRooms={onExploreRooms} />
      </div>
    </section>
  );
};
