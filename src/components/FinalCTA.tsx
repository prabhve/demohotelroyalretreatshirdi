import React from 'react';
import { MessageSquare, Phone, MapPin, Sparkles, BedDouble } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const FinalCTA: React.FC = () => {
  const { config, openWhatsApp, openBookingModal } = useHotel();

  return (
    <section id="final-cta" className="relative isolate py-20 sm:py-28 bg-[#1a0f08] text-[#fcfbf7] overflow-hidden">
      {/* Subtle background ambient texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=80"
          alt="Shirdi temple devotional atmosphere"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08] via-[#1a0f08] to-[#1a0f08]/90" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b45309]/20 border border-[#f59e0b]/40 text-[#f59e0b] text-xs uppercase tracking-widest font-bold mb-6">
            <MapPin className="w-3.5 h-3.5" />
            <span>Opposite Gate No. 2, Shirdi (100m)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#fcfbf7] tracking-tight mb-4 leading-tight">
            Your Spiritual Journey in Shirdi <br />
            <span className="italic text-[#f59e0b] font-normal">Deserves True Peace & Comfort.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#e8ded1] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Stay steps away from Shri Sai Baba Samadhi Mandir. Enjoy 24-hour hot water for Kakad Aarti, elevator access for elderly family members, and pure satvik dining at Hotel Royal Retreat.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              id="final-cta-book-online-btn"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2.5 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xl cursor-pointer transform hover:-translate-y-0.5"
            >
              <BedDouble className="w-4 h-4" />
              <span>Book Room Online (Form)</span>
            </button>

            <button
              id="final-cta-book-enquire-btn"
              onClick={() => openWhatsApp('general')}
              className="inline-flex items-center gap-2 border border-[#25D366]/60 hover:border-[#25D366] text-[#fcfbf7] hover:text-[#25D366] px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer bg-[#23150d]/80 shadow-md"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </button>

            <a
              id="final-cta-call-hotel-btn"
              href={`tel:${config.contact.primaryPhone}`}
              className="inline-flex items-center gap-2 border border-[#f59e0b]/50 hover:border-[#f59e0b] text-[#fcfbf7] hover:text-[#f59e0b] px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer bg-[#23150d]/80 shadow-md"
            >
              <Phone className="w-4 h-4 text-[#f59e0b]" />
              <span>Call {config.contact.primaryPhoneDisplay}</span>
            </a>
          </div>

          {/* Reassurance text */}
          <p className="text-xs text-[#e8ded1]/70 mt-8">
            Direct front desk confirmations • Transparent pilgrim tariffs • Safe on-site vehicle parking
          </p>
        </motion.div>
      </div>
    </section>
  );
};
