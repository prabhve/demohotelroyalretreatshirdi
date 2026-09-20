import React from 'react';
import { MapPin, Compass, ExternalLink, MessageSquare, Clock, Sparkles, Footprints, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const TempleExperience: React.FC = () => {
  const { config, openWhatsApp } = useHotel();
  const { templeExperience } = config;

  const handlePlanVisit = () => {
    openWhatsApp('templeVisit');
  };

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
    <section id="temple" className="py-16 sm:py-24 bg-[#fcf8f2] border-t border-[#b45309]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Sacred Shirdi Walking Circuit</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
              {templeExperience.heading}
            </h2>
            <p className="text-base text-[#23150d]/80 leading-relaxed">
              {templeExperience.description}
            </p>
          </div>

          <div className="shrink-0">
            <button
              id="plan-darshan-visit-btn"
              onClick={handlePlanVisit}
              className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Plan Darshan Stay</span>
            </button>
          </div>
        </motion.div>

        {/* Sacred Sites Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {templeExperience.sites.map(site => (
            <motion.div
              key={site.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#fdfaf5] rounded-3xl overflow-hidden border border-[#d6c2a8] hover:border-[#b45309] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23150d]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono bg-[#1a0f08]/85 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] text-[#f59e0b] border border-white/10 font-bold">
                    {site.distance}
                  </span>
                  {site.walkingTime && (
                    <span className="bg-[#b45309]/90 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-semibold">
                      {site.walkingTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Site Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#b45309] block mb-1">
                    {site.significance}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#23150d] mb-2 group-hover:text-[#b45309] transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-xs text-[#23150d]/75 leading-relaxed mb-4">
                    {site.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#b45309]/15 flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#23150d] hover:text-[#b45309] transition-colors"
                  >
                    <span>View on Map</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#b45309]" />
                  </a>

                  <button
                    onClick={handlePlanVisit}
                    className="text-xs text-[#78350f] hover:text-[#b45309] font-medium transition-colors cursor-pointer"
                  >
                    Ask Front Desk
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pro-Tips Devotee Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-3xl bg-[#f6efe3] border border-[#b45309]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <span className="p-3 rounded-2xl bg-[#23150d] text-[#f59e0b] shrink-0 mt-0.5 shadow">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#23150d] mb-1">
                Pilgrim Darshan & Aarti Tips
              </h4>
              <p className="text-xs sm:text-sm text-[#23150d]/80 leading-relaxed max-w-3xl">
                We recommend securing online Aarti passes or Mukh Darshan tokens in advance on the official Sansthan portal. Staying at Hotel Royal Retreat directly opposite Gate No. 2 lets you walk across in 2 minutes without auto rush, even for 4:30 AM Kakad Aarti or 10:00 PM Shej Aarti.
              </p>
            </div>
          </div>

          <button
            onClick={() => openWhatsApp('templeVisit')}
            className="shrink-0 px-5 py-3 rounded-xl bg-[#23150d] hover:bg-[#382315] text-[#f59e0b] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow"
          >
            Ask Aarti Help
          </button>
        </motion.div>
      </div>
    </section>
  );
};
