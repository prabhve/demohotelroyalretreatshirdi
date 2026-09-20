import React from 'react';
import { MapPin, Flame, Users, UtensilsCrossed, Train, Plane, Bus, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const LocationUSP: React.FC = () => {
  const { config, openWhatsApp } = useHotel();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="location-usp" className="py-16 sm:py-24 bg-[#fcf8f2] border-y border-[#b45309]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>The Shirdi Pilgrim Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-4">
            Why Devotees Choose Hotel Royal Retreat
          </h2>
          <p className="text-base sm:text-lg text-[#23150d]/80 leading-relaxed">
            Positioned directly opposite <strong>Gate No. 2</strong> on Pimpalwadi Road, our hotel is thoughtfully equipped around the specific daily rituals of Shirdi pilgrims — from 3:30 AM hot water baths to pure satvik food and peaceful sleep.
          </p>
        </motion.div>

        {/* 4 Core Pilgrim Pillars Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
        >
          {/* Pillar 1: Gate 2 Proximity */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#23150d] text-[#fcfbf7] rounded-2xl p-6 border border-[#b45309]/50 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#b45309]/15 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#b45309]/30 text-[#f59e0b] flex items-center justify-center mb-4 border border-[#f59e0b]/40">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f59e0b] block mb-1">
                Opposite Gate No. 2
              </span>
              <h3 className="font-serif text-xl font-bold mb-2 text-white">
                100m to Temple
              </h3>
              <p className="text-xs text-[#e8ded1] leading-relaxed">
                Just cross the road. No autorickshaw bargaining or long waits in Shirdi traffic. Attend late Shej Aarti at 10 PM and return to your room in 2 minutes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#f59e0b] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>2-Minute Flat Walk</span>
            </div>
          </motion.div>

          {/* Pillar 2: 24-Hr Hot Water */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#fdfaf5] text-[#23150d] rounded-2xl p-6 border border-[#d6c2a8] hover:border-[#b45309] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#f6efe3] text-[#b45309] flex items-center justify-center mb-4 border border-[#b45309]/20">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] block mb-1">
                Sacred Morning Bath
              </span>
              <h3 className="font-serif text-xl font-bold mb-2 text-[#23150d]">
                24-Hour Hot Water
              </h3>
              <p className="text-xs text-[#23150d]/80 leading-relaxed">
                Kakad Aarti starts at 4:30 AM. Our dedicated individual geysers guarantee steaming hot water at 3:00 AM or 3:30 AM so you can take a holy shower on time.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#b45309]/15 text-[11px] text-[#b45309] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Ready for 4:30 AM Aarti</span>
            </div>
          </motion.div>

          {/* Pillar 3: Seniors & Families */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#fdfaf5] text-[#23150d] rounded-2xl p-6 border border-[#d6c2a8] hover:border-[#b45309] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#f6efe3] text-[#b45309] flex items-center justify-center mb-4 border border-[#b45309]/20">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] block mb-1">
                Senior Citizen Care
              </span>
              <h3 className="font-serif text-xl font-bold mb-2 text-[#23150d]">
                Elevator & Ground Access
              </h3>
              <p className="text-xs text-[#23150d]/80 leading-relaxed">
                Traveling with elderly parents or young kids? Our passenger elevator connects all floors, and spacious 3-bed and family suite rooms keep everyone together.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#b45309]/15 text-[11px] text-[#b45309] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Modern Passenger Lift</span>
            </div>
          </motion.div>

          {/* Pillar 4: Pure Veg Dining */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-[#fdfaf5] text-[#23150d] rounded-2xl p-6 border border-[#d6c2a8] hover:border-[#b45309] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#f6efe3] text-[#b45309] flex items-center justify-center mb-4 border border-[#b45309]/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] block mb-1">
                Sattva Restaurant
              </span>
              <h3 className="font-serif text-xl font-bold mb-2 text-[#23150d]">
                Pure Veg & Jain Food
              </h3>
              <p className="text-xs text-[#23150d]/80 leading-relaxed">
                Hygienic on-site vegetarian dining with hot Maharashtrian Poha, South Indian breakfast, nutritious Thalis, and dedicated Jain meals prepared without onion or garlic.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#b45309]/15 text-[11px] text-[#b45309] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Satvik Cleanliness</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Transport Hubs Connectivity Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#f6efe3] rounded-2xl p-6 border border-[#b45309]/20"
        >
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#78350f] mb-4 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#b45309]" />
            <span>Transit & Arrival Connectivity to Hotel Royal Retreat</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {config.transportHubs.map((hub) => (
              <div key={hub.id} className="bg-[#fdfaf5] p-3.5 rounded-xl border border-[#d6c2a8]/60 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#23150d] text-[#f59e0b] shrink-0 mt-0.5">
                  {hub.type === 'railway' && <Train className="w-4 h-4" />}
                  {hub.type === 'airport' && <Plane className="w-4 h-4" />}
                  {hub.type === 'bus' && <Bus className="w-4 h-4" />}
                </div>
                <div>
                  <strong className="block text-sm text-[#23150d] font-serif mb-0.5">{hub.name}</strong>
                  <div className="text-[#78350f] font-semibold mb-1">
                    {hub.distance} • {hub.approxDuration}
                  </div>
                  <p className="text-[#23150d]/70 text-[11px] leading-snug">
                    {hub.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
