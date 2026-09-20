import React from 'react';
import { BedDouble, Users, Maximize2, MessageSquare, ArrowUpRight, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';
import { RoomType } from '../types';

export const RoomsSection: React.FC = () => {
  const { config, setSelectedRoomSlug, openBookingModal } = useHotel();

  const handleEnquireRoom = (room: RoomType) => {
    openBookingModal({
      roomId: room.id,
      roomName: room.name
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="stay" className="py-16 sm:py-24 bg-[#fcf8f2] border-t border-[#b45309]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Motion Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
              <BedDouble className="w-3.5 h-3.5" />
              <span>Verified Pilgrim Accommodations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
              Clean & Peaceful Rooms in Shirdi
            </h2>
            <p className="text-base text-[#23150d]/80 leading-relaxed">
              Every room at Hotel Royal Retreat is maintained with high hygiene standards, individually controlled split air conditioning, and guaranteed 24-hour hot water for your early morning Aarti preparations.
            </p>
          </motion.div>

          <motion.div
            className="text-left md:text-right shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <span className="text-xs text-[#78350f] block mb-1 font-semibold">
              Direct Hotel Tariff • No Middlemen
            </span>
            <span className="text-sm font-bold text-[#23150d] flex items-center md:justify-end gap-1.5">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              Opposite Gate No. 2 • Best Price Promise
            </span>
          </motion.div>
        </div>

        {/* Room Cards Grid with Staggered Entrance and Smooth Hover */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {config.rooms.map(room => (
            <motion.div
              key={room.id}
              id={`room-card-${room.slug}`}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-[#fdfaf5] rounded-3xl overflow-hidden border border-[#d6c2a8] hover:border-[#b45309] shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col group"
            >
              {/* Image Container with Badge */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23150d]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badge if available */}
                {room.badge && (
                  <div className="absolute top-4 left-4 bg-[#23150d]/95 backdrop-blur-md text-[#f59e0b] border border-[#f59e0b]/40 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    {room.badge}
                  </div>
                )}

                {/* Dimensions Pill */}
                <div className="absolute bottom-4 right-4 bg-[#1a0f08]/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-mono border border-white/10">
                  <Maximize2 className="w-3 h-3 text-[#f59e0b]" />
                  <span>{room.sizeSqFt} sq.ft.</span>
                </div>
              </div>

              {/* Room Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#23150d] mb-2 group-hover:text-[#b45309] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#23150d]/75 line-clamp-2 leading-relaxed mb-4">
                    {room.description}
                  </p>

                  {/* Highlights Bullet */}
                  <div className="space-y-1 mb-4">
                    {room.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#78350f]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b45309] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Spec Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#b45309]/15 text-xs text-[#23150d] mb-4 bg-[#f6efe3]/60 rounded-xl px-2.5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-[#78350f] font-semibold">Bed</span>
                      <span className="font-medium truncate">{room.bedConfig}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-[#78350f] font-semibold">Guests</span>
                      <span className="font-medium">Up to {room.maxOccupancy}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-[#78350f] font-semibold">Hot Water</span>
                      <span className="font-medium text-[#b45309]">24 Hours</span>
                    </div>
                  </div>

                  {/* Amenities Highlight Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {room.amenities.slice(0, 3).map(a => (
                      <span
                        key={a}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#f6efe3] text-[#23150d] border border-[#d6c2a8] font-medium"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer and CTAs */}
                <div className="pt-4 border-t border-[#b45309]/15">
                  <div className="text-[11px] text-[#78350f] mb-3 flex items-center justify-between font-medium">
                    <span>{room.tariffNote}</span>
                    <span className="text-emerald-700 font-semibold">Free 48h Cancellation</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      id={`view-room-btn-${room.slug}`}
                      onClick={() => setSelectedRoomSlug(room.slug)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#b45309]/40 hover:border-[#b45309] text-xs font-bold text-[#23150d] hover:bg-[#f6efe3] transition-all cursor-pointer"
                    >
                      <span>Room Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#b45309]" />
                    </button>

                    <button
                      type="button"
                      id={`enquire-room-btn-${room.slug}`}
                      onClick={() => handleEnquireRoom(room)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
