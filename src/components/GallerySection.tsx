import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { config } = useHotel();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms & Family Suites' },
    { id: 'dining', label: 'Sattva Restaurant' },
    { id: 'lobby', label: 'Reception & Desk' },
    { id: 'exterior', label: 'Gate 2 & Exterior' }
  ];

  const filteredItems = activeFilter === 'all'
    ? config.gallery
    : config.gallery.filter(item => item.category === activeFilter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems]);

  const nextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

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
    <section id="gallery" className="py-16 sm:py-24 bg-[#fcf8f2] border-t border-[#b45309]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Hotel Photo Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
              Moments at Hotel Royal Retreat
            </h2>
            <p className="text-base text-[#23150d]/80 leading-relaxed">
              Explore authentic photos of our air-conditioned guest rooms, Sattva pure vegetarian restaurant, and peaceful temple vicinity opposite Gate No. 2.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                id={`gallery-filter-${tab.id}`}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#23150d] text-[#f59e0b] shadow-md'
                    : 'bg-[#fdfaf5] text-[#23150d] hover:bg-[#eee3d2] border border-[#d6c2a8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid with Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-black h-64 sm:h-72 cursor-pointer border border-[#d6c2a8]"
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08]/90 via-[#1a0f08]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#f59e0b] font-bold block mb-0.5">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white drop-shadow">
                    {item.title}
                  </h4>
                </div>
                <span className="p-2 rounded-full bg-white/20 backdrop-blur-xs text-white group-hover:bg-[#b45309] group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && currentItem && (
        <div
          id="gallery-lightbox-overlay"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav Arrows */}
            <button
              onClick={prevLightbox}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextLightbox}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden max-h-[75vh] border border-white/10 shadow-2xl">
              <img
                src={currentItem.url}
                alt={currentItem.alt}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-center text-white">
              <span className="text-[11px] uppercase tracking-widest text-[#f59e0b] font-bold block mb-1">
                {currentItem.category}
              </span>
              <h3 className="font-serif text-lg font-bold">
                {currentItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
