import React from 'react';
import { Star, MessageSquare, ExternalLink, ShieldCheck, Heart, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const ReviewsSection: React.FC = () => {
  const { config, openWhatsApp } = useHotel();
  const { summary, featured } = config.reviews;

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
    <section id="reviews" className="py-16 sm:py-24 bg-[#fdfaf5] border-t border-[#b45309]/20 overflow-hidden">
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
            <Star className="w-3.5 h-3.5 fill-[#b45309]" />
            <span>Verified Pilgrim Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
            Trusted by Devotees & Families
          </h2>
          <p className="text-base text-[#23150d]/80 leading-relaxed">
            Consistently praised for our 100-meter walk to Gate No. 2, hot water at 3:30 AM for Kakad Aarti, clean family rooms, and helpful pilgrimage guidance.
          </p>
        </motion.div>

        {/* Platform Scores Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12"
        >
          {/* Google */}
          <motion.div
            variants={cardVariants}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#f6efe3] border border-[#d6c2a8] flex flex-col justify-between shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between gap-1 mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#23150d] uppercase tracking-wider truncate">
                Google
              </span>
              <div className="flex text-[#f59e0b] shrink-0">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#23150d]">
                  {summary.google.rating}
                </span>
                <span className="text-[11px] sm:text-xs text-[#78350f] font-semibold">/ {summary.google.max}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#23150d]/70 mt-0.5 sm:mt-1 truncate">
                {summary.google.count}+ local ratings
              </p>
            </div>
          </motion.div>

          {/* Booking.com */}
          <motion.div
            variants={cardVariants}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#f6efe3] border border-[#d6c2a8] flex flex-col justify-between shadow-sm overflow-hidden"
          >
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#23150d] uppercase tracking-wider truncate">
                Booking.com
              </span>
              <span className="inline-block self-start xs:self-auto text-[9px] sm:text-[10px] font-bold bg-[#23150d] text-[#f59e0b] px-1.5 sm:px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                Fabulous
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#23150d]">
                  {summary.booking.rating}
                </span>
                <span className="text-[11px] sm:text-xs text-[#78350f] font-semibold">/ {summary.booking.max}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#23150d]/70 mt-0.5 sm:mt-1 truncate">
                {summary.booking.count}+ verified stays
              </p>
            </div>
          </motion.div>

          {/* Agoda */}
          <motion.div
            variants={cardVariants}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#f6efe3] border border-[#d6c2a8] flex flex-col justify-between shadow-sm overflow-hidden"
          >
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#23150d] uppercase tracking-wider truncate">
                Agoda.com
              </span>
              <span className="inline-block self-start xs:self-auto text-[9px] sm:text-[10px] font-bold bg-[#23150d] text-[#f59e0b] px-1.5 sm:px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                Exceptional
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#23150d]">
                  {summary.agoda.rating}
                </span>
                <span className="text-[11px] sm:text-xs text-[#78350f] font-semibold">/ {summary.agoda.max}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#23150d]/70 mt-0.5 sm:mt-1 truncate">
                {summary.agoda.count}+ guest reviews
              </p>
            </div>
          </motion.div>

          {/* MakeMyTrip */}
          <motion.div
            variants={cardVariants}
            className="p-3.5 sm:p-5 rounded-2xl bg-[#f6efe3] border border-[#d6c2a8] flex flex-col justify-between shadow-sm overflow-hidden"
          >
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold text-[#23150d] uppercase tracking-wider truncate">
                MakeMyTrip
              </span>
              <span className="inline-block self-start xs:self-auto text-[9px] sm:text-[10px] font-bold bg-[#b45309] text-white px-1.5 sm:px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                Top Value
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#23150d]">
                  {summary.makemytrip.rating}
                </span>
                <span className="text-[11px] sm:text-xs text-[#78350f] font-semibold">/ {summary.makemytrip.max}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#23150d]/70 mt-0.5 sm:mt-1 truncate">
                {summary.makemytrip.count}+ pilgrim ratings
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Reviews Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featured.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-[#fdfaf5] p-6 rounded-3xl border border-[#d6c2a8] hover:border-[#b45309] transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#f59e0b] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#f6efe3] text-[#78350f] border border-[#d6c2a8]">
                    {review.source}
                  </span>
                </div>

                <p className="text-sm text-[#23150d]/85 italic leading-relaxed mb-4">
                  &ldquo;{review.excerpt}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#b45309]/15 flex items-center justify-between text-xs">
                <div>
                  <strong className="block text-[#23150d] font-serif">{review.author}</strong>
                  <span className="text-[#78350f] text-[11px]">{review.stayType}</span>
                </div>
                <span className="text-[#23150d]/50 text-[11px]">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
