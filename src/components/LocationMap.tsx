import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Train, Plane, Bus, Sparkles, Phone, MessageSquare, Car, Share2, Check } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface LandmarkPoint {
  id: string;
  name: string;
  category: 'hotel' | 'temple' | 'transport' | 'attractions';
  distance: string;
  time: string;
  desc: string;
  highlight?: boolean;
  mapQuery: string;
  navMode: 'walk' | 'drive';
}

export const LocationMap: React.FC = () => {
  const { config, openWhatsApp } = useHotel();
  const [activeCategory, setActiveCategory] = useState<'all' | 'temple' | 'transport' | 'attractions'>('all');
  const [selectedPointId, setSelectedPointId] = useState<string>('gate2');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const points: LandmarkPoint[] = [
    {
      id: 'hotel',
      name: 'Hotel Royal Retreat (Opposite Gate No. 2)',
      category: 'hotel',
      distance: '0 meters (Your Stay)',
      time: 'Pilgrimage Base',
      desc: 'Opposite Gate No. 2, Pimpalwadi Road / Bhagyalaxmi Road, Sai Nagar, Shirdi 423109',
      highlight: true,
      mapQuery: 'Hotel Royal Retreat Gate No 2 Shirdi Maharashtra',
      navMode: 'walk'
    },
    {
      id: 'gate2',
      name: 'Sai Baba Temple Gate No. 2',
      category: 'temple',
      distance: '100 meters',
      time: '2 mins flat walk',
      desc: 'Main entrance for Darshan queues, VIP Aarti entry passes, and Samadhi Mandir sanctum.',
      mapQuery: 'Shri Sai Baba Temple Gate No 2 Shirdi',
      navMode: 'walk'
    },
    {
      id: 'dwarkamai',
      name: 'Dwarkamai Masjid',
      category: 'temple',
      distance: '200 meters',
      time: '3 mins walk',
      desc: 'Baba’s holy living quarters housing the sacred eternal Dhuni and grinding stone.',
      mapQuery: 'Dwarkamai Shirdi Maharashtra',
      navMode: 'walk'
    },
    {
      id: 'chavadi',
      name: 'Chavadi',
      category: 'temple',
      distance: '250 meters',
      time: '4 mins walk',
      desc: 'Historic shrine where Baba slept every alternate night; center of Thursday Palki procession.',
      mapQuery: 'Chavadi Shirdi Maharashtra',
      navMode: 'walk'
    },
    {
      id: 'lendi',
      name: 'Lendi Baug Garden',
      category: 'temple',
      distance: '300 meters',
      time: '4 mins walk',
      desc: 'Peaceful garden tended by Shri Sai Baba with sacred Nanda Deep.',
      mapQuery: 'Lendi Baug Shirdi',
      navMode: 'walk'
    },
    {
      id: 'railway',
      name: 'Sainagar Shirdi Railway Station (SNSI)',
      category: 'transport',
      distance: '2.9 km',
      time: '8–10 mins drive',
      desc: 'Major terminus for Vande Bharat and express trains from Mumbai, Pune, Delhi, Hyderabad.',
      mapQuery: 'Sainagar Shirdi Railway Station SNSI',
      navMode: 'drive'
    },
    {
      id: 'airport',
      name: 'Shirdi International Airport (SAG)',
      category: 'transport',
      distance: '14.2 km',
      time: '20–25 mins drive',
      desc: 'Daily nonstop flights from Mumbai, Delhi, Bengaluru, Hyderabad, and Chennai.',
      mapQuery: 'Shirdi International Airport SAG Kakadi',
      navMode: 'drive'
    },
    {
      id: 'bus',
      name: 'Shirdi Central Bus Stand (MSRTC)',
      category: 'transport',
      distance: '1.1 km',
      time: '4 mins drive / 12 mins walk',
      desc: 'State transport Shivshahi buses and private sleeper coaches.',
      mapQuery: 'Shirdi Central Bus Stand MSRTC',
      navMode: 'walk'
    },
    {
      id: 'prasadalaya',
      name: 'Shri Sai Sansthan Mega Prasadalaya',
      category: 'attractions',
      distance: '1.8 km',
      time: '5 mins by e-rickshaw',
      desc: 'World-famous solar-powered kitchen serving holy lunch and dinner prasad to thousands.',
      mapQuery: 'Shri Sai Baba Sansthan Trust Prasadalaya Shirdi',
      navMode: 'drive'
    },
    {
      id: 'shani',
      name: 'Shani Shingnapur Temple',
      category: 'attractions',
      distance: '70 km',
      time: '1.5 hrs by AC cab',
      desc: 'Famous doorless holy village; front desk arranges direct round-trip private cabs.',
      mapQuery: 'Shani Shingnapur Temple Ahmednagar Maharashtra',
      navMode: 'drive'
    }
  ];

  const filteredPoints = activeCategory === 'all'
    ? points
    : points.filter(p => p.category === activeCategory || p.category === 'hotel');

  const selectedPoint = points.find(p => p.id === selectedPointId) || points[1];

  // Direct turn-by-turn navigation URL in Google Maps
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('Hotel Royal Retreat Opposite Gate No 2 Pimpalwadi Road Shirdi')}&destination=${encodeURIComponent(selectedPoint.mapQuery)}&travelmode=${selectedPoint.navMode === 'walk' ? 'walking' : 'driving'}`;
  
  // Direct Google Maps Search / Pin URL
  const googleMapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPoint.mapQuery)}`;

  const handleShareOrCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${selectedPoint.name} - ${selectedPoint.distance} from Hotel Royal Retreat (Opposite Gate No. 2, Shirdi). Navigation: ${googleMapsDirectionsUrl}`);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }
  };

  const handleBookCabForPlace = () => {
    openWhatsApp('transport', {
      destination: selectedPoint.name
    });
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#fcf8f2] border-t border-[#b45309]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Locality Map & Direct Navigation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
            Directly Opposite Gate No. 2
          </h2>
          <p className="text-base text-[#23150d]/80 leading-relaxed">
            Stay just 100 meters from Shri Saibaba Samadhi Mandir. Select any shrine or transit point below to preview distance, route time, and launch direct turn-by-turn Google Maps navigation.
          </p>
        </div>

        {/* Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map Display & Active Navigation Card */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-[#fdfaf5] rounded-3xl p-5 sm:p-7 border border-[#d6c2a8] shadow-lg">
              {/* Filter Buttons */}
              <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === 'all'
                      ? 'bg-[#23150d] text-[#f59e0b]'
                      : 'bg-[#f6efe3] text-[#23150d] border border-[#d6c2a8] hover:bg-[#eee3d2]'
                  }`}
                >
                  All Landmarks
                </button>
                <button
                  onClick={() => setActiveCategory('temple')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === 'temple'
                      ? 'bg-[#23150d] text-[#f59e0b]'
                      : 'bg-[#f6efe3] text-[#23150d] border border-[#d6c2a8] hover:bg-[#eee3d2]'
                  }`}
                >
                  Temple & Shrines
                </button>
                <button
                  onClick={() => setActiveCategory('transport')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === 'transport'
                      ? 'bg-[#23150d] text-[#f59e0b]'
                      : 'bg-[#f6efe3] text-[#23150d] border border-[#d6c2a8] hover:bg-[#eee3d2]'
                  }`}
                >
                  Transit Hubs
                </button>
                <button
                  onClick={() => setActiveCategory('attractions')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeCategory === 'attractions'
                      ? 'bg-[#23150d] text-[#f59e0b]'
                      : 'bg-[#f6efe3] text-[#23150d] border border-[#d6c2a8] hover:bg-[#eee3d2]'
                  }`}
                >
                  Prasadalaya & Tours
                </button>
              </div>

              {/* Embedded Live Map / Diagram with Royal Retreat Highlight */}
              <div className="relative rounded-2xl overflow-hidden border border-[#b45309]/30 h-72 sm:h-96 bg-[#1a0f08] shadow-inner flex items-center justify-center text-center p-6">
                <iframe
                  key={selectedPoint.id}
                  title={`Hotel Royal Retreat Location - ${selectedPoint.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedPoint.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 absolute inset-0 filter saturate-150 contrast-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Live Badge */}
                <div className="absolute top-3 left-3 bg-[#23150d]/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#f59e0b]/40 text-[#fbf7f0] text-xs font-bold flex items-center gap-2 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping" />
                  <span className="truncate max-w-[220px] sm:max-w-xs">{selectedPoint.name}</span>
                </div>
              </div>

              {/* Address Strip */}
              <div className="mt-4 pt-4 border-t border-[#b45309]/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[#78350f] font-medium">
                  Base: Opposite Gate No. 2, Pimpalwadi Road, Shirdi 423109
                </span>
                <a
                  href={config.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#b45309] hover:text-[#d97706] transition-colors"
                >
                  <span>Hotel on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Active Place Navigation & Route Action Card (As requested in 4th point) */}
            <div className="bg-[#23150d] text-[#fbf7f0] rounded-3xl p-5 sm:p-6 border border-[#f59e0b]/40 shadow-xl relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#f59e0b]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#b45309] text-white">
                    <Navigation className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#f59e0b] block">
                      Selected Landmark Navigation
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#fcfbf7]">
                      {selectedPoint.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-xs font-bold font-mono">
                    {selectedPoint.distance}
                  </span>
                  <span className="text-xs text-[#e8ded1]/80">
                    ({selectedPoint.time})
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#e8ded1]/90 leading-relaxed mb-4">
                {selectedPoint.desc}
              </p>

              {/* Navigation CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary Google Maps Navigation */}
                <a
                  id="start-navigation-google-maps-btn"
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#fbbf24] text-[#23150d] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer hover:shadow-lg"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  <span>Navigate in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Secondary View Place */}
                <a
                  href={googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#fbf7f0] hover:text-[#f59e0b] border border-white/20 hover:border-[#f59e0b] transition-all bg-white/5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>View on Map</span>
                </a>

                {/* Share / Copy Details */}
                <button
                  onClick={handleShareOrCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#e8ded1] hover:text-white border border-white/10 hover:bg-white/5 transition-all"
                  title="Copy Directions Link"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Distance & Landmark Explorer */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#23150d] mb-1">
              Key Landmark Distances
            </h3>
            <p className="text-xs text-[#23150d]/75 mb-3">
              Click any place to preview route & launch Google Maps navigation:
            </p>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredPoints.map((point) => {
                const isSelected = point.id === selectedPointId;
                return (
                  <div
                    key={point.id}
                    onClick={() => setSelectedPointId(point.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#23150d] text-[#fbf7f0] border-[#f59e0b] shadow-md ring-2 ring-[#f59e0b]/50'
                        : 'bg-[#fdfaf5] text-[#23150d] border-[#d6c2a8] hover:border-[#b45309] hover:bg-[#f6efe3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-serif font-bold text-sm flex items-center gap-1.5">
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />}
                        {point.name}
                      </h4>
                      <span className={`text-xs font-bold font-mono ${
                        isSelected ? 'text-[#f59e0b]' : 'text-[#b45309]'
                      }`}>
                        {point.distance}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed ${
                      isSelected ? 'text-[#e8ded1]' : 'text-[#23150d]/70'
                    }`}>
                      {point.desc}
                    </p>

                    <div className={`mt-2 pt-2 border-t text-[11px] font-semibold flex items-center justify-between ${
                      isSelected ? 'border-white/10 text-[#f59e0b]' : 'border-[#b45309]/15 text-[#78350f]'
                    }`}>
                      <span>Walking / Drive: {point.time}</span>
                      <span className="text-[10px] uppercase tracking-wider underline flex items-center gap-1">
                        <Navigation className="w-2.5 h-2.5" />
                        {isSelected ? 'Ready to Navigate' : 'Click to Route'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Taxi Assistance Box */}
            <div className="p-4 rounded-2xl bg-[#f6efe3] border border-[#b45309]/30 text-xs text-[#23150d] flex items-center justify-between gap-3">
              <div>
                <strong className="block font-serif text-sm text-[#23150d] mb-0.5">Need Airport or Station Pickup?</strong>
                <span className="text-[#78350f]">Front desk arranges reliable AC cabs at fixed fares.</span>
              </div>
              <button
                onClick={handleBookCabForPlace}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-[#b45309] text-white font-bold uppercase tracking-wider text-[11px] shadow hover:bg-[#d97706] transition-colors"
              >
                Book Cab
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
