import React from 'react';
import { Check, ShieldCheck, HeartHandshake, Sparkles, MapPin, Coffee, Flame, Hotel, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const AboutSection: React.FC = () => {
  const { config, openWhatsApp, openBookingModal } = useHotel();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#fcf8f2] overflow-hidden border-t border-[#b45309]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Editorial Imagery Column with Entrance Animation */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[#b45309]/30">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Hotel Royal Retreat contemporary room sanctuary in Shirdi"
                className="w-full h-[420px] sm:h-[480px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08]/90 via-[#1a0f08]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#fcfbf7]">
                <span className="text-xs uppercase tracking-widest text-[#f59e0b] font-bold block mb-1">
                  100 Meters to Gate No. 2
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold text-white">
                  Thoughtfully appointed to offer serene rest after hours of standing in Darshan lines.
                </p>
              </div>
            </div>

            {/* Subtle decorative frame element */}
            <motion.div
              className="hidden sm:block absolute -bottom-5 -left-5 w-48 h-48 rounded-3xl bg-[#f6efe3] -z-0 border border-[#b45309]/30"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <div className="hidden sm:block absolute -top-5 -right-5 w-32 h-32 rounded-full bg-[#f59e0b]/10 blur-2xl -z-0" />
          </motion.div>

          {/* Text Content Column with Staggered Entrance */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devotional Pilgrimage Sanctuary</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-5 leading-tight"
            >
              A Serene Retreat in the <br />
              <span className="text-[#b45309]">Heart of Shirdi</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base sm:text-lg text-[#23150d]/85 leading-relaxed mb-5"
            >
              Hotel Royal Retreat provides the ideal base for your pilgrimage to Shri Saibaba Sansthan. Situated directly opposite Temple Gate No. 2 on Pimpalwadi Road, our location saves your family and elderly parents from exhausting auto commutes and traffic congestion.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="text-sm sm:text-base text-[#23150d]/75 leading-relaxed mb-6"
            >
              From continuous 24/7 hot water so you can take a holy snan at 3:30 AM before Kakad Aarti, to an elevator connecting all floors and our pure vegetarian Sattva restaurant serving wholesome meals, every detail is tuned for your peace of mind.
            </motion.p>

            {/* 4 Quick Facts Grid with Staggered Entrance */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-[#b45309]/20 mb-7"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#fdfaf5] border border-[#d6c2a8] shadow-xs"
              >
                <span className="p-2 rounded-xl bg-[#f6efe3] text-[#b45309] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#23150d]">Gate No. 2 (100m)</h4>
                  <p className="text-xs text-[#23150d]/70 mt-0.5">2-minute flat walk across to temple sanctum.</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#fdfaf5] border border-[#d6c2a8] shadow-xs"
              >
                <span className="p-2 rounded-xl bg-[#f6efe3] text-[#b45309] shrink-0 mt-0.5">
                  <Flame className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#23150d]">24/7 Geyser Hot Water</h4>
                  <p className="text-xs text-[#23150d]/70 mt-0.5">Guaranteed hot water even at 3:30 AM.</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#fdfaf5] border border-[#d6c2a8] shadow-xs"
              >
                <span className="p-2 rounded-xl bg-[#f6efe3] text-[#b45309] shrink-0 mt-0.5">
                  <Coffee className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#23150d]">Sattva Pure Veg</h4>
                  <p className="text-xs text-[#23150d]/70 mt-0.5">Fresh satvik preparations & Jain food.</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#fdfaf5] border border-[#d6c2a8] shadow-xs"
              >
                <span className="p-2 rounded-xl bg-[#f6efe3] text-[#b45309] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[#23150d]">Lift & Free Parking</h4>
                  <p className="text-xs text-[#23150d]/70 mt-0.5">Elder-friendly elevator & safe car parking.</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Room Online</span>
              </button>

              <button
                onClick={() => openWhatsApp('general')}
                className="inline-flex items-center gap-2 bg-[#f6efe3] hover:bg-[#ebdcc8] text-[#23150d] border border-[#b45309]/30 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <span>WhatsApp Desk</span>
              </button>

              <a
                href={`tel:${config.contact.primaryPhone}`}
                className="text-xs sm:text-sm font-bold text-[#23150d] hover:text-[#b45309] px-3 py-2 transition-colors flex items-center gap-1.5"
              >
                <span>Call: {config.contact.primaryPhoneDisplay}</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
