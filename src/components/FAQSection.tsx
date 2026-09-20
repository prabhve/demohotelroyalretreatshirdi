import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const FAQSection: React.FC = () => {
  const { config, openWhatsApp } = useHotel();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#fdfaf5] border-t border-[#b45309]/20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Devotee Assistance & Information</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#23150d]/80 leading-relaxed">
            Essential information regarding our location opposite Gate No. 2, 24-hour hot water, senior citizen facilities, and pure vegetarian dining.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3">
          {config.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: 'easeOut' }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#f6efe3] border-[#b45309] shadow-sm'
                    : 'bg-[#fdfaf5] border-[#d6c2a8] hover:border-[#b45309]/60'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#23150d]">
                    {faq.question}
                  </span>
                  <span
                    className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                      isOpen
                        ? 'rotate-180 bg-[#23150d] text-[#f59e0b]'
                        : 'bg-[#eee3d2] text-[#23150d]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#23150d]/80 leading-relaxed border-t border-[#b45309]/15 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Unresolved Question CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-12 text-center p-6 rounded-3xl bg-[#f6efe3] border border-[#b45309]/30 shadow-md"
        >
          <h3 className="text-base font-bold text-[#23150d] mb-1.5">
            Have another question about your Shirdi pilgrimage?
          </h3>
          <p className="text-xs text-[#23150d]/75 mb-4">
            Our front desk is active 24/7 on WhatsApp to confirm Aarti guidance, wheelchair access, or custom meal requests.
          </p>
          <button
            onClick={() => openWhatsApp('general')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Directly on WhatsApp</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
