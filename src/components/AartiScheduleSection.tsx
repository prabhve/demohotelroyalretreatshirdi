import React, { useState } from 'react';
import { Clock, Bell, Sparkles, MapPin, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const AartiScheduleSection: React.FC = () => {
  const { config, openWhatsApp, openBookingModal } = useHotel();
  const [selectedAarti, setSelectedAarti] = useState(config.aartiSchedule[0].id);

  const activeAarti = config.aartiSchedule.find(a => a.id === selectedAarti) || config.aartiSchedule[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="aarti" className="py-16 sm:py-24 bg-[#fbf7f0] border-t border-[#b45309]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
              <Bell className="w-3.5 h-3.5" />
              <span>Shri Saibaba Sansthan Official Timings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
              Daily Temple Aarti Schedule
            </h2>
            <p className="text-sm sm:text-base text-[#23150d]/80 leading-relaxed">
              Plan your devotional darshan and prayers. Because Hotel Royal Retreat is located directly opposite <strong>Gate No. 2 (~100m)</strong>, you can walk to early morning Kakad Aarti and late Shej Aarti in under 2 minutes.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => openWhatsApp('templeVisit')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Aarti Pass Guidance</span>
            </button>
          </div>
        </motion.div>

        {/* Interactive Aarti Cards Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10"
        >
          {config.aartiSchedule.map((aarti) => {
            const isSelected = aarti.id === selectedAarti;
            return (
              <motion.div
                key={aarti.id}
                variants={itemVariants}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                onClick={() => setSelectedAarti(aarti.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#23150d] text-[#fbf7f0] border-[#f59e0b] shadow-xl scale-[1.02]'
                    : 'bg-[#fdfaf5] text-[#23150d] border-[#d6c2a8]/60 hover:border-[#b45309]/60 hover:bg-[#f6efe3]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-[#b45309] text-white' : 'bg-[#eee3d2] text-[#78350f]'
                    }`}>
                      {aarti.marathiName}
                    </span>
                    <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#f59e0b]' : 'text-[#b45309]'}`} />
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold mb-1">
                    {aarti.name}
                  </h3>

                  <div className={`font-mono text-xl sm:text-2xl font-bold mb-3 ${
                    isSelected ? 'text-[#f59e0b]' : 'text-[#b45309]'
                  }`}>
                    {aarti.time}
                  </div>
                </div>

                <div className={`text-[11px] pt-2 border-t line-clamp-2 ${
                  isSelected ? 'border-white/10 text-[#e8ded1]' : 'border-[#b45309]/15 text-[#23150d]/70'
                }`}>
                  {aarti.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Aarti Detail Feature Box with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#23150d] text-[#fbf7f0] rounded-3xl p-6 sm:p-8 border border-[#b45309]/40 shadow-xl relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#b45309]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Selected Prayer: {activeAarti.marathiName}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {activeAarti.name} ({activeAarti.time})
              </h3>
              <p className="text-sm text-[#e8ded1] leading-relaxed">
                {activeAarti.description}
              </p>

              {/* Devotee Tip */}
              <div className="p-4 rounded-xl bg-[#1a0f08]/80 border border-[#f59e0b]/30 text-xs sm:text-sm text-[#fbf7f0] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f59e0b] block mb-0.5">Devotee Recommendation:</strong>
                  <span>{activeAarti.devoteeTip}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#1a0f08]/90 rounded-2xl p-5 border border-[#b45309]/30 space-y-3 text-xs">
              <h4 className="font-semibold text-[#f59e0b] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Royal Retreat Proximity</span>
              </h4>
              <p className="text-[#e8ded1]">
                • Distance to Temple Gate 2: <strong>100 meters (2 Mins Walk)</strong>
              </p>
              <p className="text-[#e8ded1]">
                • 24-Hour Hot Water for pre-Aarti holy snan
              </p>
              <p className="text-[#e8ded1]">
                • Elevator to all rooms for senior citizen comfort
              </p>
              <button
                onClick={() => {
                  if (openBookingModal) {
                    openBookingModal();
                  } else {
                    openWhatsApp('room', { ROOM_NAME: 'Room near Gate 2 for Aarti' });
                  }
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#1a0f08] font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Request Room for Aarti
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
