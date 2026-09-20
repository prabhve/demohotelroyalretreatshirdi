import React, { useState } from 'react';
import { UtensilsCrossed, Clock, Check, Sparkles, MessageSquare, Phone, Flame, Leaf, Coffee } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const SattvaDining: React.FC = () => {
  const { config, openWhatsApp } = useHotel();
  const restaurant = config.restaurant;
  const [activeCategoryId, setActiveCategoryId] = useState<string>(restaurant.menuCategories[0]?.id || '');
  const [jainOnlyFilter, setJainOnlyFilter] = useState<boolean>(false);

  const activeCategory = restaurant.menuCategories.find(c => c.id === activeCategoryId) || restaurant.menuCategories[0];
  const showPricing = restaurant.showMenuPrices ?? true;

  const displayedItems = activeCategory
    ? activeCategory.items.filter(item => (jainOnlyFilter ? item.isJainFriendly : true))
    : [];

  const handleReserveTable = () => {
    openWhatsApp('dining');
  };

  return (
    <section id="dining" className="py-16 sm:py-24 bg-[#fdfaf5] border-t border-[#b45309]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Introduction with Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          {/* Left Column Text */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>In-House Pure Veg Dining</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-4">
              Sattva Restaurant <br />
              <span className="text-lg sm:text-xl font-sans font-normal text-[#78350f] block mt-1">
                Pure Vegetarian & Satvik Flavors in Shirdi
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#23150d]/80 leading-relaxed mb-6">
              {restaurant.description}
            </p>

            {/* Timings & Jain Badge */}
            <div className="space-y-3 mb-7">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#23150d] p-3 rounded-xl bg-[#f6efe3] border border-[#b45309]/20 font-medium">
                <Clock className="w-4 h-4 text-[#b45309] shrink-0" />
                <span>{restaurant.timings}</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#23150d] p-3 rounded-xl bg-[#e8dec8]/70 border border-[#b45309]/20">
                <Leaf className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-bold text-emerald-800">Dedicated Jain Food:</strong> {restaurant.jainNotice}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                id="dining-reserve-table-btn"
                onClick={handleReserveTable}
                className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Reserve Table on WhatsApp</span>
              </button>

              <a
                href={`tel:${config.contact.primaryPhone}`}
                className="text-xs sm:text-sm font-semibold text-[#23150d] hover:text-[#b45309] px-3 py-2 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#b45309]" />
                <span>Call: {config.contact.primaryPhoneDisplay}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column Image Grid */}
          <motion.div
            className="lg:col-span-6 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md h-52 sm:h-64 border border-[#b45309]/20">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Sattva pure vegetarian dining hall at Hotel Royal Retreat"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#f6efe3] border border-[#b45309]/20 text-xs text-[#23150d]">
                <span className="font-bold text-[#78350f] block mb-0.5">Fresh Hot Breakfast from 6:30 AM</span>
                Poha, Idli-Vada, piping hot Masala Chai & South Indian Filter Coffee before Darshan.
              </div>
            </div>

            <div className="space-y-4 pt-5">
              <div className="p-3.5 rounded-2xl bg-[#23150d] text-[#fcfbf7] border border-[#b45309]/30 text-xs shadow-lg">
                <span className="font-serif text-sm font-bold text-[#f59e0b] block mb-0.5">
                  100% Pure Vegetarian
                </span>
                Strictly vegetarian kitchen upholding sacred Shirdi pilgrimage sanctity.
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md h-52 sm:h-64 border border-[#b45309]/20">
                <img
                  src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
                  alt="Wholesome Indian Thali meal with fresh rotis and paneer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Menu Experience Card with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#f6efe3] rounded-3xl p-6 sm:p-8 border border-[#b45309]/30 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#b45309]/20">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#b45309] block mb-1">
                Freshly Cooked & Hygienic
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#23150d]">
                Sattva Restaurant Menu
              </h3>
            </div>

            {/* Filter Toggle: Jain-Only */}
            <div className="flex items-center gap-2">
              <button
                id="filter-jain-toggle-btn"
                onClick={() => setJainOnlyFilter(!jainOnlyFilter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  jainOnlyFilter
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-[#fdfaf5] text-[#23150d] border border-[#d6c2a8] hover:bg-[#eee3d2]'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>{jainOnlyFilter ? 'Showing Jain-Friendly Only' : 'Show Jain Options'}</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {restaurant.menuCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryId === cat.id
                    ? 'bg-[#23150d] text-[#f59e0b] shadow-md'
                    : 'bg-[#fdfaf5] text-[#23150d] hover:bg-[#eee3d2] border border-[#d6c2a8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedItems.map(item => (
              <div
                key={item.id}
                className="bg-[#fdfaf5] p-4 rounded-2xl border border-[#d6c2a8] hover:border-[#b45309] transition-all flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#23150d]">
                      {item.name}
                    </h4>
                    {item.isChefSpecial && (
                      <span className="text-[10px] bg-[#b45309] text-white px-2 py-0.2 rounded font-bold">
                        Special
                      </span>
                    )}
                    {item.isJainFriendly && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded font-bold flex items-center gap-0.5">
                        <Leaf className="w-2.5 h-2.5" /> Jain
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-[#23150d]/70 leading-relaxed mb-1">
                      {item.description}
                    </p>
                  )}
                </div>
                {showPricing && item.price && (
                  <span className="font-bold text-sm text-[#b45309] bg-[#f6efe3] px-2.5 py-1 rounded-lg border border-[#b45309]/20 shrink-0 font-mono shadow-xs">
                    {item.price}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
