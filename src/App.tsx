import React, { useState, useEffect } from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LocationUSP } from './components/LocationUSP';
import { AartiScheduleSection } from './components/AartiScheduleSection';
import { AboutSection } from './components/AboutSection';
import { RoomsSection } from './components/RoomsSection';
import { SattvaDining } from './components/SattvaDining';
import { TempleExperience } from './components/TempleExperience';
import { ServicesSection } from './components/ServicesSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationMap } from './components/LocationMap';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { RoomDetailModal } from './components/RoomDetailModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { BookingRequestModal } from './components/BookingRequestModal';

function MainWebsite() {
  const [activeSection, setActiveSection] = useState('hero');
  const { openBookingModal } = useHotel();

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'stay', 'aarti', 'dining', 'temple', 'services', 'gallery', 'reviews', 'location', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-[#23150d] flex flex-col antialiased selection:bg-[#f59e0b]/30 selection:text-[#23150d] overflow-x-hidden">
      {/* Top Header */}
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreRooms={() => scrollToSection('stay')}
          onExploreDining={() => scrollToSection('dining')}
        />
        <LocationUSP />
        <AartiScheduleSection />
        <AboutSection />
        <RoomsSection />
        <SattvaDining />
        <TempleExperience />
        <ServicesSection />
        <GallerySection />
        <ReviewsSection />
        <LocationMap />
        <FAQSection />
        <ContactSection />
        <FinalCTA />
      </main>

      {/* Site Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Spacer to prevent mobile sticky bar from obscuring footer content on small screens */}
      <div className="h-16 lg:hidden bg-[#1a0f08]" aria-hidden="true" />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar onBookClick={() => openBookingModal()} />

      {/* Interactive Modals */}
      <BookingRequestModal />
      <RoomDetailModal />
      <PolicyModal />
      <AdminCMSModal />
    </div>
  );
}

export default function App() {
  return (
    <HotelProvider>
      <MainWebsite />
    </HotelProvider>
  );
}
