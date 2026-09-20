import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  MapPin,
  BedDouble,
  ChevronDown,
  Sparkles,
  Image as ImageIcon,
  Star
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const { config, openWhatsApp, openBookingModal } = useHotel();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation links with responsive labels
  const primaryNavLinks = [
    {
      id: 'stay',
      shortLabel: 'Rooms',
      fullLabel: 'Rooms & Suites'
    },
    {
      id: 'aarti',
      shortLabel: 'Aarti',
      fullLabel: 'Aarti Timings'
    },
    {
      id: 'dining',
      shortLabel: 'Dining',
      fullLabel: 'Sattva Dining'
    },
    {
      id: 'temple',
      shortLabel: 'Darshan',
      fullLabel: 'Darshan Guide',
      showOnlyOn2xl: true
    }
  ];

  // Secondary links cleanly organized inside the "Explore ▾" dropdown menu
  const dropdownNavLinks = [
    {
      id: 'temple',
      label: 'Darshan & Passes Guide',
      icon: Sparkles,
      desc: 'Samadhi Mandir entry guidelines & passes'
    },
    {
      id: 'location',
      label: 'Location & Map (Gate 2)',
      icon: MapPin,
      desc: 'Directly opposite Gate No. 2 • 100m to Temple'
    },
    {
      id: 'gallery',
      label: 'Photo Gallery',
      icon: ImageIcon,
      desc: 'High-res photos of rooms, lobby & sacred shrine'
    },
    {
      id: 'reviews',
      label: 'Pilgrim Reviews (4.8★)',
      icon: Star,
      desc: 'Devotee experiences and verified ratings'
    },
    {
      id: 'contact',
      label: 'Contact Front Desk',
      icon: Phone,
      desc: 'Direct telephone, WhatsApp & 24/7 helpdesk'
    }
  ];

  // Complete list for mobile drawer
  const allNavLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'stay', label: 'Rooms & Suites' },
    { id: 'aarti', label: 'Aarti Timings' },
    { id: 'dining', label: 'Sattva Dining' },
    { id: 'temple', label: 'Darshan Guide' },
    { id: 'location', label: 'Location (Opp. Gate No. 2)' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'reviews', label: 'Devotee Reviews' },
    { id: 'contact', label: 'Contact & Directions' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <div id="sticky-site-header" className="sticky top-0 z-50 w-full shadow-lg">
      {/* Top Devotional Announcement Bar */}
      <div className="bg-[#20130a] text-[#fbf7f0] text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 select-none border-b border-[#b45309]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate min-w-0">
            <span className="text-[#f59e0b] font-serif font-bold tracking-wide shrink-0">
              🌸 ॐ साईं राम
            </span>
            <span className="hidden sm:inline text-[#e2d5c3]/50 shrink-0">•</span>
            <span className="truncate text-[#fbf7f0]/90 text-[11px] sm:text-xs">
              Directly Opposite <strong className="text-[#f59e0b] font-semibold">Gate No. 2</strong> (100m to Samadhi Mandir)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline text-[#e2d5c3]/70 text-[11px]">
              24-Hr Hot Water for 4:30 AM Aarti
            </span>
            <span className="hidden md:inline text-[#e2d5c3]/30">•</span>
            <a
              href={`tel:${config.contact.primaryPhone}`}
              className="text-[#f59e0b] hover:text-[#fbbf24] font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap text-[11px] sm:text-xs"
            >
              <Phone className="w-3 h-3 text-[#f59e0b] shrink-0" />
              <span>{config.contact.primaryPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        id="main-header"
        className={`w-full transition-all duration-200 border-b border-[#b45309]/25 ${
          isScrolled
            ? 'bg-[#180e07]/98 backdrop-blur-md py-2 sm:py-2.5 shadow-xl'
            : 'bg-[#180e07]/95 backdrop-blur-sm py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between gap-2 sm:gap-3 xl:gap-6 w-full">
            {/* Logo / Brand Identity (Guaranteed Dedicated Space & Clean Scaling) */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('hero')}
              className="text-left flex flex-col group cursor-pointer focus:outline-none shrink-0 mr-1 sm:mr-3 lg:mr-2 xl:mr-5 2xl:mr-8"
              aria-label="Hotel Royal Retreat Shirdi Home"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-[13px] xs:text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl font-bold tracking-wide text-[#fcfbf7] group-hover:text-[#f59e0b] transition-colors whitespace-nowrap">
                  HOTEL ROYAL RETREAT
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[8.5px] xs:text-[9px] sm:text-[10px] xl:text-[11px] text-[#d6c2a8] leading-tight mt-0.5 whitespace-nowrap">
                <span className="font-bold text-[#f59e0b] tracking-wider uppercase">SHIRDI</span>
                <span className="text-[#f59e0b]/50">•</span>
                <span className="flex items-center gap-1 text-[#e8ded1]">
                  <MapPin className="w-2.5 h-2.5 text-[#f59e0b] shrink-0" />
                  Opp. Gate No. 2 (100m)
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links (Immune to Collisions, Generously Spaced) */}
            <nav
              className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-1 xl:mx-2 2xl:mx-4"
              aria-label="Main Navigation"
            >
              <div className="flex items-center gap-1 xl:gap-1.5 2xl:gap-3 flex-nowrap">
                {/* 1. Core Pilgrimage Links */}
                {primaryNavLinks.map(link => {
                  if (link.showOnlyOn2xl) {
                    const isActive = activeSection === link.id;
                    return (
                      <button
                        key={link.id}
                        id={`nav-link-${link.id}`}
                        onClick={() => handleNavClick(link.id)}
                        className={`hidden 2xl:inline-block text-xs uppercase tracking-wider font-semibold py-1.5 px-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'text-[#f59e0b] bg-[#b45309]/20 shadow-xs font-bold'
                            : 'text-[#fbf7f0]/85 hover:text-[#f59e0b] hover:bg-white/5'
                        }`}
                      >
                        {link.fullLabel}
                      </button>
                    );
                  }

                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      id={`nav-link-${link.id}`}
                      onClick={() => handleNavClick(link.id)}
                      className={`text-xs xl:text-[13px] uppercase tracking-wider font-semibold py-1.5 px-2 xl:px-2.5 2xl:px-3 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'text-[#f59e0b] bg-[#b45309]/20 shadow-xs font-bold'
                          : 'text-[#fbf7f0]/85 hover:text-[#f59e0b] hover:bg-white/5'
                      }`}
                    >
                      <span className="lg:inline xl:hidden">{link.shortLabel}</span>
                      <span className="hidden xl:inline">{link.fullLabel}</span>
                    </button>
                  );
                })}

                {/* 2. 'Explore ▾' Dropdown (Houses Darshan on lg/xl, Location, Gallery, Reviews, Contact) */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    id="explore-dropdown-btn"
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    className={`inline-flex items-center gap-1 text-xs xl:text-[13px] uppercase tracking-wider font-semibold py-1.5 px-2 xl:px-2.5 2xl:px-3 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      moreDropdownOpen || ['temple', 'location', 'gallery', 'reviews', 'contact'].includes(activeSection)
                        ? 'bg-[#b45309]/25 text-[#f59e0b]'
                        : 'text-[#fbf7f0]/85 hover:text-[#f59e0b] hover:bg-white/5'
                    }`}
                    aria-expanded={moreDropdownOpen}
                  >
                    <span>Explore</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#f59e0b]' : 'text-[#f59e0b]/80'}`} />
                  </button>

                  {/* Dropdown Menu Box */}
                  {moreDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2.5 w-72 rounded-2xl bg-[#1b1008] border border-[#b45309]/40 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 backdrop-blur-md">
                      <div className="px-2 py-1.5 border-b border-[#b45309]/20 mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b]">
                          Discover & Direct Desk
                        </span>
                        <span className="text-[10px] text-[#e8ded1]/50">Opp. Gate 2</span>
                      </div>
                      <div className="space-y-1">
                        {dropdownNavLinks.map(link => {
                          const IconComp = link.icon;
                          const isActive = activeSection === link.id;
                          return (
                            <button
                              key={link.id}
                              id={`dropdown-link-${link.id}`}
                              onClick={() => handleNavClick(link.id)}
                              className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#b45309]/25 text-[#f59e0b] border border-[#b45309]/40'
                                  : 'text-[#fbf7f0] hover:bg-white/5'
                              }`}
                            >
                              <div className="p-2 rounded-lg bg-[#b45309]/20 text-[#f59e0b] shrink-0 mt-0.5">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-bold block text-[#fcfbf7] truncate">{link.label}</span>
                                <span className="text-[11px] text-[#d6c2a8]/70 block leading-tight mt-0.5">{link.desc}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>

            {/* Right Action CTAs (shrink-0, perfectly positioned) */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3 shrink-0 ml-auto pl-1 sm:pl-2 xl:pl-4 2xl:pl-6">
              {/* WhatsApp Button (Clean & Compact) */}
              <button
                id="header-whatsapp-btn"
                onClick={() => openWhatsApp('general')}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 xl:py-2 rounded-xl text-xs font-semibold text-[#fbf7f0] hover:text-[#25D366] border border-[#b45309]/35 hover:border-[#25D366]/60 transition-all bg-[#23150d]/80 hover:bg-[#23150d] cursor-pointer whitespace-nowrap shadow-xs"
                title="Chat directly with front desk on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span className="hidden md:inline">WhatsApp</span>
              </button>

              {/* Primary Call to Action: Book Online (Compact on small screens, full on desktop) */}
              <button
                id="header-book-online-btn"
                onClick={() => openBookingModal()}
                className="hidden xs:inline-flex sm:inline-flex items-center gap-1.5 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <BedDouble className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Book Online</span>
                <span className="sm:hidden">Book</span>
              </button>

              {/* Mobile Menu Hamburger (Always Guaranteed Fully Visible & Tappable) */}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 sm:p-2 text-[#fbf7f0] hover:text-[#f59e0b] bg-white/10 hover:bg-white/15 active:bg-white/20 rounded-xl transition-all cursor-pointer lg:hidden shrink-0 border border-white/10 flex items-center justify-center"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#f59e0b]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer (Clean Structured Grid & Flex Layout, No Fixed Height Bleeding) */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden bg-[#180e07]/98 backdrop-blur-xl border-b border-[#b45309]/30 px-3.5 sm:px-6 pt-3 pb-8 shadow-2xl animate-in fade-in slide-in-from-top-2 max-h-[82vh] overflow-y-auto overscroll-contain no-scrollbar"
          >
            {/* Section 1: Core Navigation (2-Column Touch Grid) */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] block px-1 mb-2">
                Quick Navigation
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('hero')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[46px] text-left border ${
                    activeSection === 'hero'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0] border-white/5'
                  }`}
                >
                  <span className="text-base">🏠</span>
                  <span className="truncate">Home</span>
                </button>

                <button
                  onClick={() => handleNavClick('stay')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[46px] text-left border ${
                    activeSection === 'stay'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0] border-white/5'
                  }`}
                >
                  <BedDouble className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span className="truncate">Rooms & Tariffs</span>
                </button>

                <button
                  onClick={() => handleNavClick('aarti')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[46px] text-left border ${
                    activeSection === 'aarti'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0] border-white/5'
                  }`}
                >
                  <span className="text-base">🌸</span>
                  <span className="truncate font-bold text-[#f59e0b]">Aarti Timings</span>
                </button>

                <button
                  onClick={() => handleNavClick('dining')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[46px] text-left border ${
                    activeSection === 'dining'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0] border-white/5'
                  }`}
                >
                  <span className="text-base">🍲</span>
                  <span className="truncate">Sattva Dining</span>
                </button>
              </div>
            </div>

            {/* Section 2: Explore & Pilgrim Guides (Structured 2-Column / Stack Grid) */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] block px-1 mb-2">
                Explore Shirdi & Retreat
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('temple')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] text-left border ${
                    activeSection === 'temple'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0]/90 border-white/5'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span className="truncate">Darshan & Passes Guide</span>
                </button>

                <button
                  onClick={() => handleNavClick('location')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] text-left border ${
                    activeSection === 'location'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0]/90 border-white/5'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span className="truncate">Opp. Gate No. 2 Map</span>
                </button>

                <button
                  onClick={() => handleNavClick('gallery')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] text-left border ${
                    activeSection === 'gallery'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0]/90 border-white/5'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span className="truncate">Photo Gallery</span>
                </button>

                <button
                  onClick={() => handleNavClick('reviews')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] text-left border ${
                    activeSection === 'reviews'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0]/90 border-white/5'
                  }`}
                >
                  <Star className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span className="truncate">Devotee Reviews (4.8★)</span>
                </button>

                <button
                  onClick={() => handleNavClick('faq')}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] text-left border sm:col-span-2 ${
                    activeSection === 'faq'
                      ? 'bg-[#b45309]/30 text-[#f59e0b] border-[#f59e0b]/50'
                      : 'bg-white/5 hover:bg-white/10 text-[#fbf7f0]/90 border-white/5'
                  }`}
                >
                  <span className="text-sm">❓</span>
                  <span className="truncate">FAQs & Hotel Rules</span>
                </button>
              </div>
            </div>

            {/* Section 3: Contact & Direct Booking Action Buttons (Stacked & Grid Layout) */}
            <div className="pt-3 border-t border-[#b45309]/25 space-y-2.5 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#f59e0b] block px-1">
                Direct Reservations & Helpdesk
              </span>

              {/* Primary Book Online CTA */}
              <button
                id="mobile-menu-book-btn"
                onClick={() => {
                  openBookingModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#b45309] hover:bg-[#d97706] active:bg-[#92400e] text-[#fcfbf7] text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer min-h-[48px]"
              >
                <BedDouble className="w-4 h-4" />
                <span>Book Room Online (Reservation Form)</span>
              </button>

              {/* Front Desk Direct Buttons (2-Column Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  id="mobile-menu-whatsapp-btn"
                  onClick={() => {
                    openWhatsApp('general');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-[#25D366]/60 hover:border-[#25D366] text-[#fbf7f0] hover:text-[#25D366] text-xs font-semibold uppercase tracking-wider cursor-pointer bg-[#23150d]/90 min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                  <span>WhatsApp Desk</span>
                </button>

                <a
                  id="mobile-menu-call-btn"
                  href={`tel:${config.contact.primaryPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-[#f59e0b]/50 hover:border-[#f59e0b] text-[#fbf7f0] hover:text-[#f59e0b] text-xs font-semibold uppercase tracking-wider bg-[#23150d]/90 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#f59e0b] shrink-0" />
                  <span>Call: {config.contact.primaryPhoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
