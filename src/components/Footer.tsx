import React from 'react';
import { Phone, MessageSquare, MapPin, Mail, Settings, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { config, openWhatsApp, setIsAdminOpen, setActivePolicy } = useHotel();

  return (
    <footer className="bg-[#1a0f08] text-[#fcfbf7] pt-16 pb-24 sm:pb-16 border-t border-[#b45309]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#b45309]/20">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#f59e0b] block">
                HOTEL ROYAL RETREAT
              </span>
              <span className="text-xs font-sans tracking-widest text-[#e8ded1] uppercase font-semibold mt-0.5 block">
                SHIRDI • OPPOSITE GATE NO. 2
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#e8ded1]/80 leading-relaxed">
              Your peaceful sanctuary in the holy town of Shirdi. Situated just 100 meters (2-min walk) from Sai Baba Samadhi Mandir Gate No. 2, offering modern air-conditioned rooms, 24/7 hot water, lift, and Sattva pure vegetarian restaurant.
            </p>

            <div className="pt-1 text-xs text-[#f59e0b] flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Opposite Gate No. 2, Pimpalwadi Road, Shirdi 423109</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#e8ded1]/80">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stay')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">
                  Rooms & Suites
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aarti')} className="hover:text-[#f59e0b] transition-colors cursor-pointer text-[#f59e0b]">
                  ★ Aarti Timings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dining')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">
                  Sattva Pure Veg
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('temple')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">
                  Temple Circuit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">
                  Location Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Room Types */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
              Rooms & Tariffs
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e8ded1]/80">
              {config.rooms.map(room => (
                <li key={room.id}>
                  <button onClick={() => onNavigate('stay')} className="hover:text-[#f59e0b] transition-colors text-left block">
                    <span className="font-bold text-white block">{room.name}</span>
                    <span className="text-[11px] text-[#f59e0b]">
                      From {room.tariffNote} • Up to {room.maxOccupancy} Guests
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Contact & WhatsApp */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#e8ded1]/80">
              <p>
                <span className="text-[#e8ded1]/60 block text-[11px]">Primary Phone:</span>
                <a href={`tel:${config.contact.primaryPhone}`} className="text-white hover:text-[#f59e0b] font-bold text-sm">
                  {config.contact.primaryPhoneDisplay}
                </a>
              </p>
              <p>
                <span className="text-[#e8ded1]/60 block text-[11px]">WhatsApp / Alt:</span>
                <a href={`tel:${config.contact.secondaryPhone}`} className="text-white hover:text-[#f59e0b] font-semibold">
                  {config.contact.secondaryPhoneDisplay}
                </a>
              </p>
              <p>
                <span className="text-[#e8ded1]/60 block text-[11px]">Reservations Email:</span>
                <a href={`mailto:${config.contact.email}`} className="text-white hover:text-[#f59e0b] break-all">
                  {config.contact.email}
                </a>
              </p>
            </div>

            <button
              onClick={() => openWhatsApp('general')}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#b45309] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#d97706] transition-colors cursor-pointer shadow-md mt-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Booking Desk</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#e8ded1]/70 border-t border-[#b45309]/10 mt-2">
          {/* Copyright & Devotion */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center md:text-left">
            <span>© {new Date().getFullYear()} Hotel Royal Retreat, Shirdi.</span>
            <span className="hidden sm:inline text-[#f59e0b]/50">•</span>
            <span className="text-[#f59e0b] font-medium">🌸 ॐ साईं राम • Om Sai Ram</span>
          </div>

          {/* Policy & Admin Links (Cleanly wrapped without stray bullets) */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-[11px] sm:text-xs">
            <button
              onClick={() => setActivePolicy('privacy')}
              className="hover:text-[#f59e0b] transition-colors cursor-pointer py-1"
            >
              Privacy Policy
            </button>
            <span className="text-[#b45309]/40">|</span>
            <button
              onClick={() => setActivePolicy('terms')}
              className="hover:text-[#f59e0b] transition-colors cursor-pointer py-1"
            >
              Terms of Stay
            </button>
            <span className="text-[#b45309]/40">|</span>
            <button
              onClick={() => setActivePolicy('cancellation')}
              className="hover:text-[#f59e0b] transition-colors cursor-pointer py-1"
            >
              Cancellation Policy
            </button>
            <span className="text-[#b45309]/40">|</span>
            <button
              id="footer-admin-panel-btn"
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#b45309]/20 text-[#f59e0b] transition-all cursor-pointer font-medium border border-[#b45309]/30"
              title="Website Admin Panel & Full CMS"
            >
              <Settings className="w-3 h-3" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Distinctive Signature: Designed With Love By VYUVIK LABS */}
        <div className="mt-8 pt-6 border-t border-[#b45309]/15 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#2a170b]/90 via-[#3a2010]/80 to-[#2a170b]/90 border border-[#b45309]/35 hover:border-[#f59e0b]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300 group cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300 shrink-0" />
            <span className="font-['Outfit',sans-serif] text-[11px] sm:text-xs font-normal tracking-wide text-[#e8ded1]/90 flex items-center gap-1.5">
              <span>Designed with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse inline shrink-0 mx-0.5" />
              <span>by</span>
              <span className="font-black tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#f59e0b] to-[#fbbf24] drop-shadow-[0_1px_8px_rgba(245,158,11,0.4)] ml-1">
                VYUVIK LABS
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
