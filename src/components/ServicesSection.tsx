import React from 'react';
import { Clock, ShieldCheck, Car, Briefcase, PhoneCall, Sparkles, Navigation, Stethoscope, ArrowRight, Flame, Utensils, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useHotel } from '../context/HotelContext';

export const ServicesSection: React.FC = () => {
  const { config, openWhatsApp } = useHotel();

  const services = [
    {
      icon: Flame,
      title: '24/7 Geyser Hot Water',
      description: 'Guaranteed hot water at 3:30 AM before Kakad Aarti or late evening Shej Aarti so you can take a holy snan comfortably.'
    },
    {
      icon: Clock,
      title: '24-Hour Reception Desk',
      description: 'Round-the-clock front desk on Pimpalwadi Road to accommodate late train/flight arrivals and early morning temple departures.'
    },
    {
      icon: Utensils,
      title: 'In-House Sattva Restaurant',
      description: 'Hygienic pure vegetarian dining with fresh thalis, hot rotis, tea, coffee, and customized Jain options without onion & garlic.'
    },
    {
      icon: Car,
      title: 'On-Site Private Parking',
      description: 'Secure open & shaded vehicle parking on hotel premises for guest cars, SUVs, and two-wheelers throughout your stay.'
    },
    {
      icon: Briefcase,
      title: 'Luggage Storage & Cloak Facility',
      description: 'Safe cloakroom storage if you arrive early or wish to attend afternoon Aarti and prasadalaya after 11:00 AM check-out.'
    },
    {
      icon: Navigation,
      title: 'Travel & Taxi Desk',
      description: 'Fixed-fare AC cab transfers to Shirdi Airport, Sainagar Railway Station, and day trips to Shani Shingnapur & Nashik.'
    }
  ];

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
      transition: { duration: 0.5, ease: 'easeOut' as const }
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#fdfaf5] border-t border-[#b45309]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Animation */}
        <motion.div
          className="max-w-3xl mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Pilgrim Hospitality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
            Thoughtful Facilities for Devotees & Families
          </h2>
          <p className="text-base text-[#23150d]/80 leading-relaxed">
            Every convenience at Hotel Royal Retreat is structured around the unique needs of Shirdi pilgrims, offering uninterrupted peace of mind.
          </p>
        </motion.div>

        {/* Services Grid with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-3xl bg-[#f6efe3] border border-[#d6c2a8] hover:border-[#b45309] transition-colors shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="p-3 rounded-2xl bg-[#23150d] text-[#f59e0b] border border-[#b45309]/30 inline-block mb-4 shadow">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#23150d] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23150d]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Transport Connectivity Sub-Section */}
        <div className="mt-14 pt-12 border-t border-[#b45309]/20">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest font-bold text-[#b45309] block mb-1">
                Direct Transit Connections
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23150d] mb-2">
                Getting to Hotel Royal Retreat
              </h3>
              <p className="text-sm text-[#23150d]/80 leading-relaxed">
                Located directly opposite Temple Gate No. 2 on Pimpalwadi Road. Our front desk provides round-the-clock arrival coordination so your pilgrimage begins smoothly without autorickshaw negotiations.
              </p>
            </div>

            {/* Managed Highlights Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl shrink-0">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fdfaf5] border border-[#d6c2a8]">
                <CheckCircle2 className="w-4 h-4 text-[#b45309] shrink-0" />
                <span className="text-xs font-semibold text-[#23150d]">24/7 Chauffeur Coordination</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fdfaf5] border border-[#d6c2a8]">
                <CheckCircle2 className="w-4 h-4 text-[#b45309] shrink-0" />
                <span className="text-xs font-semibold text-[#23150d]">Fixed Fair Pricing</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fdfaf5] border border-[#d6c2a8]">
                <CheckCircle2 className="w-4 h-4 text-[#b45309] shrink-0" />
                <span className="text-xs font-semibold text-[#23150d]">Elder & Luggage Assistance</span>
              </div>
            </div>
          </motion.div>

          {/* Hubs Cards with Staggered Entrance and Managed Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {config.transportHubs.map(hub => (
              <motion.div
                key={hub.id}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-3xl bg-[#fdfaf5] border border-[#d6c2a8] flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#b45309] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] bg-[#f6efe3] px-2.5 py-1 rounded-md border border-[#b45309]/20">
                      {hub.type}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-[#23150d] bg-[#f6efe3] px-2.5 py-1 rounded-full border border-[#d6c2a8]">
                        Approx. {hub.distance}
                      </span>
                      <span className="text-[11px] font-medium text-[#78350f] bg-[#fef3c7] px-2 py-1 rounded-full border border-[#f59e0b]/30">
                        {hub.approxDuration}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#23150d] mb-2 leading-snug">
                    {hub.name}
                  </h4>
                  
                  <p className="text-xs text-[#23150d]/80 leading-relaxed mb-4">
                    {hub.description}
                  </p>

                  {/* Managed Structured Specifications */}
                  <div className="space-y-2 mb-5 pt-3 border-t border-[#b45309]/15 text-xs">
                    {hub.frequencyNote && (
                      <div className="bg-[#f6efe3]/60 p-2.5 rounded-xl border border-[#d6c2a8]/50">
                        <strong className="block text-[#78350f] text-[11px] uppercase tracking-wider mb-0.5">
                          Connectivity:
                        </strong>
                        <span className="text-[#23150d]/85">{hub.frequencyNote}</span>
                      </div>
                    )}
                    {hub.transferAssistance && (
                      <div className="bg-[#f6efe3]/60 p-2.5 rounded-xl border border-[#d6c2a8]/50">
                        <strong className="block text-[#78350f] text-[11px] uppercase tracking-wider mb-0.5">
                          Pickup Service:
                        </strong>
                        <span className="text-[#23150d]/85">{hub.transferAssistance}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#b45309]/15 flex items-center justify-between text-xs">
                  <a
                    href={hub.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#23150d] hover:text-[#b45309] transition-colors flex items-center gap-1"
                  >
                    <span>Google Map Route</span>
                  </a>
                  <button
                    onClick={() =>
                      openWhatsApp('transport', {
                        TRANSFER_TYPE: hub.name,
                        DATE: 'Upcoming date',
                        TIME: 'Arrival time',
                        PASSENGERS: '2-4'
                      })
                    }
                    className="font-bold text-[#b45309] hover:text-[#d97706] transition-colors cursor-pointer px-3 py-1.5 rounded-lg bg-[#b45309]/10 hover:bg-[#b45309]/20"
                  >
                    Enquire Taxi
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
