import { HotelConfig } from '../types';

export const initialHotelConfig: HotelConfig = {
  identity: {
    name: 'Hotel Royal Retreat',
    tagline: 'Directly Opposite Gate No. 2, Shirdi (100m to Temple)',
    secondaryTagline: 'Comfortable, Clean & Peaceful Stay Steps from Shri Sai Baba Samadhi Mandir',
    hotelType: '3-Star Premium Pilgrim Hotel',
    starCategoryListing: '3-Star',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
    address: {
      gate: 'Opposite Gate No. 2',
      street: 'Pimpalwadi Road / Bhagyalaxmi Road',
      landmark: 'Near Shri Sai Baba Temple Gate No. 2',
      area: 'Sai Nagar',
      city: 'Shirdi',
      state: 'Maharashtra',
      pincode: '423109',
      country: 'India',
      fullFormatted: 'Opposite Gate No. 2, Pimpalwadi Road, Sai Nagar, Shirdi, Maharashtra 423109, India'
    },
    coordinates: {
      lat: 19.7674,
      lng: 74.4776
    }
  },

  contact: {
    primaryPhone: '+919438856888',
    primaryPhoneDisplay: '+91 94388 56888',
    secondaryPhone: '+919049040902',
    secondaryPhoneDisplay: '+91 90490 40902',
    whatsappNumber: '919049040902',
    whatsappNumberDisplay: '+91 90490 40902',
    email: 'reservations@royalretreathotel.com',
    googleMapsUrl: 'https://maps.google.com/?q=Hotel+Royal+Retreat+Gate+2+Shirdi+Maharashtra'
  },

  bookingForm: {
    badgeText: 'Direct Front Desk Reservation',
    modalTitle: 'Request Room Booking • Hotel Royal Retreat',
    locationHighlight: 'Directly Opposite Gate No. 2 (100 Meters to Samadhi Mandir)',
    subHighlight: 'Zero Commission',
    enableDevotionalChecklist: true,
    devotionalSectionTitle: '3. Pilgrim Care & Yatra Preferences',
    devotionalOptions: [
      {
        id: 'aarti_water',
        label: '3:30 AM Kakad Aarti Hot Water',
        sublabel: 'Guaranteed high-pressure geyser hot water before morning Aarti',
        defaultChecked: true,
        enabled: true
      },
      {
        id: 'senior_care',
        label: 'Senior Citizen Room Near Elevator',
        sublabel: 'Lower floors with step-free wheelchair accessibility',
        defaultChecked: false,
        enabled: true
      },
      {
        id: 'jain_food',
        label: 'Jain Satvik Pure Veg Meals',
        sublabel: 'Freshly prepared meals without onion, garlic or root vegetables',
        defaultChecked: false,
        enabled: true
      },
      {
        id: 'airport_taxi',
        label: 'Airport / Railway Station Taxi Pickup',
        sublabel: 'Private verified cab transfer from Shirdi Airport or Sainagar Station',
        defaultChecked: false,
        enabled: true
      }
    ],
    enableSpecialNotes: true,
    specialNotesLabel: 'Special Notes or Arrival Timings (Optional)',
    specialNotesPlaceholder: 'e.g. Expected arrival at 11:00 AM / Aarti pass assistance / extra mattress for elder...',
    submitButtonText: 'Submit Room Booking Request',
    confirmationNotice: 'Direct Front Desk Assurance: Zero advance lock-in required for request submission. Pay comfortably at check-in.',
    allowInstantEmailReceipt: true,
    defaultGuestSelection: '2 Adults',
    guestOptions: [
      '1 Adult',
      '2 Adults',
      '3 Adults',
      '4 Adults (Family)',
      '2 Adults, 1 Child',
      '2 Adults, 2 Children',
      'Large Pilgrim Group (5+)'
    ],
    depositPolicyNote: 'Zero advance payment required to register your booking request. Our desk locks in direct tariff rates.',
    helplineDisplay: '+91 90490 40902',
    emailAcknowledgement: {
      enabled: true,
      subjectPrefix: 'Booking Request Registered',
      welcomeGreeting: 'Jai Sai Ram',
      customClosingRemarks: 'Our front desk team will contact you shortly to confirm your room reservation and ensure a spiritually enriching stay in holy Shirdi.'
    }
  },

  rooms: [
    {
      id: 'superior-double',
      slug: 'superior-double-room',
      name: 'Superior Double Room',
      badge: 'Most Popular for Couples',
      sizeSqFt: 200,
      sizeSqM: 18.6,
      bedConfig: '1 King Bed (or 2 Twin Beds on Request)',
      maxOccupancy: 2,
      view: 'Sai Nagar City / Temple Vicinity',
      tagline: 'Contemporary sanctuary crafted for restful devotee stays with round-the-clock hot water.',
      highlights: [
        'Opposite Gate 2 (2 min walk to Darshan)',
        '24-Hour Hot Water for early 4:30 AM Aarti',
        'Quiet corridor position away from main road noise'
      ],
      amenities: [
        'Individual Split Air Conditioning',
        '24-Hour Hot Water Geyser',
        'Electric Tea/Coffee Maker with complimentary supplies',
        'Flat Screen LED TV with multi-lingual devotional channels',
        'High-speed Wi-Fi',
        'Daily Mineral Water Bottles',
        'Work/Luggage Desk & Wardrobe',
        'Private Bathroom with Shower & Premium Toiletries',
        'Intercom connected to 24-hr Front Desk'
      ],
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
      ],
      features: [
        '24-hr Room Service for hot tea & meals',
        'Daily Fresh Linen & Towel Change',
        'Elevator Access to all room floors',
        'Power Backup in all rooms'
      ],
      tariffNote: 'Special pilgrim tariffs available for direct WhatsApp & phone bookings.',
      description: 'The Superior Double Room offers a spotless, quiet, and air-conditioned retreat after your temple visit. Fitted with an orthopedic mattress, tea maker, high-speed Wi-Fi, and guaranteed 24-hour hot water for your early morning Kakad Aarti preparation.'
    },
    {
      id: 'standard-triple',
      slug: 'standard-triple-room',
      name: 'Standard Triple Room',
      badge: 'Perfect for Small Families & Seniors',
      sizeSqFt: 240,
      sizeSqM: 22.3,
      bedConfig: '1 Queen Bed + 1 Single Bed (Comfortably sleeps 3 Adults)',
      maxOccupancy: 3,
      view: 'Courtyard / Shirdi Skyline',
      tagline: 'Spacious triple bed layout designed for parents traveling with children or three visiting devotees.',
      highlights: [
        'Accommodates 3 guests comfortably without cramped extra cot',
        'Elevator accessibility for senior pilgrims',
        'Guaranteed hot water at 3:30 AM'
      ],
      amenities: [
        'Individual Split Air Conditioning',
        '24-Hour Hot Water Supply',
        'Electric Kettle & Herbal Tea Kit',
        'LED TV with news, entertainment & Sai devotional broadcasts',
        'Complimentary High-speed Wi-Fi',
        'Packaged Drinking Water',
        'Spacious Attached Bathroom with Western commode',
        'Luggage Bench & Wardrobe',
        'Room Service Support'
      ],
      images: [
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
      ],
      features: [
        'Spacious room footprint allowing easy mobility',
        'Full generator power backup',
        'Daily Housekeeping and sanitized linens',
        'Direct dialing to reception for morning wake-up calls'
      ],
      tariffNote: 'Best price guarantee when confirming directly with the property desk.',
      description: 'Ideal for pilgrim families with a child or elderly parents. Featuring one queen and one dedicated single bed, ample luggage space, clean tiled flooring, and modern air-conditioning for peaceful rest after long queues at the temple.'
    },
    {
      id: 'deluxe-family',
      slug: 'deluxe-family-suite',
      name: 'Deluxe Family Suite',
      badge: 'Spacious 4–5 Guest Pilgrim Suite',
      sizeSqFt: 320,
      sizeSqM: 29.7,
      bedConfig: '2 Double/Queen Beds (Comfortably accommodates 4 to 5 guests)',
      maxOccupancy: 5,
      view: 'Temple Gate 2 & Shirdi Town View',
      tagline: 'Expansive family sanctuary with comfortable double bedding, sofa seating, and ample dressing area.',
      highlights: [
        'Keeps the entire family together under one roof',
        '100 meters walking distance to temple entry',
        'Express check-in and priority Aarti wake-up call'
      ],
      amenities: [
        'Multi-Point Split Air Conditioning',
        'Continuous 24-Hour Hot Water Geyser',
        'Large Flat Screen Smart TV',
        'High-Speed Wi-Fi for all devices',
        'Electric Kettle with tea, coffee & milk supplies',
        'Comfortable Sofa Seating & Coffee Table',
        'Spacious Modern Bathroom with vanity mirror',
        'Full Wardrobe with Safe Storage',
        'Complimentary Bottled Water'
      ],
      images: [
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
      ],
      features: [
        'Extra spacious for group morning preparations',
        'Double wardrobe storage for multi-day pilgrimage luggage',
        'Quiet sound-insulated windows',
        'Direct room service delivery'
      ],
      tariffNote: 'Best value option for family groups traveling together.',
      description: 'The Deluxe Family Suite is specifically arranged for devotees traveling in family units or group yatras. Generous 320 sq.ft. layout gives everyone personal space to unwind, refresh, and coordinate their darshan visits seamlessly.'
    }
  ],

  restaurant: {
    name: 'Sattva Pure Vegetarian Restaurant',
    subheading: 'Hygienic, Satvik & Multi-Cuisine Dining in Shirdi',
    description: 'Located on premises at Hotel Royal Retreat, Sattva serves clean, freshly cooked 100% vegetarian meals. Special attention is given to pilgrim diets, including authentic Maharashtrian cuisine, North Indian curries, crisp South Indian breakfast, and dedicated Jain preparation without root vegetables upon request.',
    timings: '06:30 AM – 10:30 PM (All Day Dining, Breakfast, Lunch, High Tea & Dinner)',
    cuisineHighlights: [
      '100% Pure Vegetarian & Satvik Preparation',
      'Dedicated Jain Meals (No Onion, No Garlic, No Root Vegetables on request)',
      'Early Morning Hot Tea, Poha, Upma & South Indian Idli-Vada before Kakad Aarti',
      'Wholesome Maharashtrian & North Indian Thalis with fresh Rotis & Ghee',
      'Hygienic Mineral Water Cooking & Strict Kitchen Cleanliness'
    ],
    menuCategories: [
      {
        id: 'breakfast',
        name: 'Pilgrim Morning Breakfast',
        description: 'Served piping hot from 6:30 AM to energize your temple day.',
        items: [
          { id: 'b1', name: 'Shirdi Special Poha', description: 'Flattened rice tempered with mustard, roasted peanuts, curry leaves, and grated coconut.', price: '₹90', isJainFriendly: false, isChefSpecial: true },
          { id: 'b2', name: 'Steamed Idli Sambar (2 Pcs)', description: 'Soft fluffy rice cakes served with authentic spiced lentil sambar and fresh coconut chutney.', price: '₹100', isJainFriendly: true },
          { id: 'b3', name: 'Medu Vada Crispy (2 Pcs)', description: 'Crisp golden lentil fritters served with hot coconut chutney and tangy vegetable sambar.', price: '₹110', isJainFriendly: true },
          { id: 'b4', name: 'Mysore Masala Dosa', description: 'Crisp golden crepe smeared with spicy red chutney and stuffed with seasoned potato filling.', price: '₹140', isJainFriendly: false },
          { id: 'b5', name: 'Plain Dosa / Ghee Roast', description: 'Paper-thin golden crepe made with pure ghee, served with mild coconut chutney.', price: '₹120', isJainFriendly: true },
          { id: 'b6', name: 'Aloo Paratha with Curd & Pickle', description: 'Whole wheat flatbread stuffed with spiced potato mash, served with fresh curd.', price: '₹120', isJainFriendly: false }
        ]
      },
      {
        id: 'thali',
        name: 'Wholesome Thalis & Lunches',
        description: 'Complete nutritional meals served with fresh hot rotis, dal, and sweets.',
        items: [
          { id: 't1', name: 'Royal Retreat Special Thali', description: '2 Seasonal Subzis, Paneer Special, Dal Fry, Jeera Rice, 4 Butter Phulkas, Sweet of the Day (Gulab Jamun / Shrikhand), Salad, Papad & Pickle.', price: '₹220', isChefSpecial: true },
          { id: 't2', name: 'Satvik Jain Thali', description: 'Carefully prepared without onion, garlic, or potatoes. Includes 2 Jain subzis, Jain Paneer, Yellow Dal, Steamed Basmati Rice, 4 Phulkas & Sweet.', price: '₹230', isJainFriendly: true },
          { id: 't3', name: 'Executive Mini Thali', description: '1 Paneer Gravy, 1 Seasonal Vegetable, Dal Tadka, Steamed Rice, 3 Phulkas, and Roasted Papad.', price: '₹180', isJainFriendly: false }
        ]
      },
      {
        id: 'main-course',
        name: 'Curries, Paneer & Breads',
        description: 'Aromatic gravies cooked in pure ghee and cold-pressed oil.',
        items: [
          { id: 'm1', name: 'Paneer Butter Masala', description: 'Tender cottage cheese simmered in a rich velvety tomato and butter gravy finished with kasoori methi.', price: '₹220', isChefSpecial: true },
          { id: 'm2', name: 'Kadhai Paneer', description: 'Fresh paneer tossed with crunchy bell peppers, onions, and freshly ground roasted coriander seeds.', price: '₹210', isSpicy: true },
          { id: 'm3', name: 'Dal Tadka Dhaba Style', description: 'Yellow lentils cooked to perfection, tempered with desi ghee, cumin, garlic, and dry red chilies.', price: '₹160' },
          { id: 'm4', name: 'Veg Kolhapuri', description: 'Spicy regional Maharashtrian vegetable medley cooked with roasted coconut and spicy red chilies.', price: '₹190', isSpicy: true },
          { id: 'm5', name: 'Jeera Rice / Peas Pulao', description: 'Fragrant long-grain basmati rice tempered with toasted cumin seeds in ghee.', price: '₹130', isJainFriendly: true },
          { id: 'm6', name: 'Butter Tandoori Roti / Phulka', description: 'Freshly baked whole wheat flatbread brushed with country butter.', price: '₹30', isJainFriendly: true }
        ]
      },
      {
        id: 'beverages',
        name: 'Beverages & Fasting Specials',
        description: 'Hot beverages and fasting (Upvas) refreshments.',
        items: [
          { id: 'v1', name: 'Special Masala Chai (Kulhad)', description: 'Simmered with ginger, cardamom, and tulsi leaves, served hot in traditional earthen cup.', price: '₹35', isChefSpecial: true },
          { id: 'v2', name: 'South Indian Filter Coffee', description: 'Freshly brewed chicory blend with frothy whole milk.', price: '₹50' },
          { id: 'v3', name: 'Sweet Lassi / Salted Buttermilk', description: 'Chilled hand-churned yogurt beverage spiced with roasted cumin or saffron.', price: '₹60' },
          { id: 'v4', name: 'Sabudana Khichdi (Upvas Special)', description: 'Fasting favorite sago pearls cooked with crushed peanuts, green chilies, and rock salt in ghee.', price: '₹100', isJainFriendly: true }
        ]
      }
    ],
    jainNotice: 'Kindly inform our servers upon taking your table for 100% strictly separate Jain preparations (without onion, garlic, potato, or root vegetables).',
    showMenuPrices: true
  },

  aartiSchedule: [
    {
      id: 'kakad',
      name: 'Kakad Aarti',
      marathiName: 'काकड आरती',
      time: '04:30 AM',
      description: 'The sublime early morning prayer offering bhupali songs to wake Baba and begin the temple day.',
      devoteeTip: 'Queue line entry starts around 3:30 AM at Gate No. 2. 24-hr hot water at Royal Retreat allows you to bathe peacefully by 3:00 AM.'
    },
    {
      id: 'snan',
      name: 'Mangal Snan & Prayer',
      marathiName: 'मंगल स्नान',
      time: '05:05 AM',
      description: 'Sacred ceremonial bath of Shri Sai Baba Samadhi with warm holy water, milk, and panchamrut.',
      devoteeTip: 'Witness the serene morning transformation of the Samadhi inside the inner sanctum.'
    },
    {
      id: 'madhyan',
      name: 'Madhyan Aarti',
      marathiName: 'मध्यान्ह आरती',
      time: '12:00 PM (Noon)',
      description: 'The grand royal afternoon Aarti followed by Naivedya (sacred food offering) to Baba.',
      devoteeTip: 'Heaviest devotee footfall of the day. Collect your entry token or VIP Darshan slot in advance.'
    },
    {
      id: 'dhoop',
      name: 'Dhoop Aarti',
      marathiName: 'धूप आरती',
      time: 'Sunset (~06:15 PM)',
      description: 'Mesmerizing evening prayer as holy incense is offered and temple lights glow golden.',
      devoteeTip: 'Arrive 45 minutes early at Gate 2. The chanting of devotional hymns across the campus is deeply uplifting.'
    },
    {
      id: 'shej',
      name: 'Shej Aarti',
      marathiName: 'शेज आरती',
      time: '10:00 PM',
      description: 'The final night lullaby Aarti preparing Baba for night rest, concluding with mosquito net placement.',
      devoteeTip: 'Mandir closes after Shej Aarti (~10:45 PM). Walking back to Royal Retreat takes merely 2 minutes without any commute stress.'
    }
  ],

  templeExperience: {
    heading: 'Begin Your Shirdi Visit with Ease',
    subheading: 'Sacred Landmarks within 2 to 5 Minutes Walk',
    description: 'Staying directly opposite Gate No. 2 places the entire holy complex of Shri Sai Baba within effortless walking distance, sparing elderly parents and tired families from chaotic traffic and autorickshaw negotiations.',
    sites: [
      {
        id: 'samadhi-mandir',
        name: 'Shri Sai Baba Samadhi Mandir',
        distance: 'Opposite Gate No. 2 (~100m)',
        walkingTime: '2 mins walk',
        significance: 'Main Sanctum & Holy Shrine',
        description: 'The sacred resting place of Shri Sai Baba made of pure Italian white marble. All main Aarti prayers, charan sparsh, and darshan lines originate right across our threshold.',
        image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
        mapQuery: 'Sai+Baba+Samadhi+Mandir+Shirdi'
      },
      {
        id: 'dwarkamai',
        name: 'Dwarkamai Masjid',
        distance: '200m from Hotel',
        walkingTime: '3 mins walk',
        significance: 'Baba\'s Dwelling & Eternal Dhuni',
        description: 'The historic dilapidated mosque where Baba spent nearly 60 years of His divine life. Houses the perpetual holy fire (Dhuni Maa) and sacred grinding stone (Chakki).',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        mapQuery: 'Dwarkamai+Shirdi'
      },
      {
        id: 'chavadi',
        name: 'Chavadi',
        distance: '250m from Hotel',
        walkingTime: '4 mins walk',
        significance: 'Historic Palki Processions',
        description: 'Where Shri Sai Baba rested every alternate night during his later years. The grand Thursday Palki procession ceremony proceeds between Dwarkamai and Chavadi.',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
        mapQuery: 'Chavadi+Shirdi'
      },
      {
        id: 'lendi-baug',
        name: 'Lendi Baug Garden',
        distance: '300m from Hotel',
        walkingTime: '4 mins walk',
        significance: 'Peaceful Meditative Garden',
        description: 'A serene green garden tended by Baba with his own hands. Contains the sacred Nanda Deep (eternal oil lamp) nestled between two pipala trees.',
        image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
        mapQuery: 'Lendi+Baug+Shirdi'
      },
      {
        id: 'prasadalaya',
        name: 'Shri Sai Sansthan Mega Prasadalaya',
        distance: '1.8 km from Hotel',
        walkingTime: '5 mins by e-rickshaw',
        significance: 'World’s Largest Solar Kitchen',
        description: 'A marvel of devotional logistics serving wholesome, sanctified holy meals (Bhojan Prasad) to tens of thousands of pilgrims daily with selfless hospitality.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        mapQuery: 'Shri+Sai+Baba+Sansthan+Prasadalaya+Shirdi'
      },
      {
        id: 'shani-shingnapur',
        name: 'Shani Shingnapur Day Trip',
        distance: 'Approx. 70 km',
        walkingTime: '1.5 hrs drive',
        significance: 'Sacred Swayambhu Shani Shrine',
        description: 'The miraculous village without doors where Lord Shaneshwara is worshipped in an open-air black stone swayambhu idol. Front desk arranges comfortable round-trip AC cabs.',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        mapQuery: 'Shani+Shingnapur+Temple'
      }
    ]
  },

  transportHubs: [
    {
      id: 'railway',
      name: 'Sainagar Shirdi Railway Station (SNSI)',
      distance: '2.9 km',
      approxDuration: '8–10 mins drive',
      type: 'railway',
      description: 'Primary rail terminus connecting pilgrims nationwide directly to Shirdi with modern high-speed railway connectivity.',
      frequencyNote: 'Direct CSMT Mumbai Vande Bharat Express, Pune, New Delhi, Hyderabad & Bengaluru superfast trains.',
      transferAssistance: 'Pre-arranged AC car transfers & verified prepaid auto rickshaws directly to hotel porch.',
      recommendation: 'Share train PNR or arrival time during booking for guaranteed platform greeting.',
      directionsUrl: 'https://maps.google.com/?q=Sainagar+Shirdi+Railway+Station'
    },
    {
      id: 'airport',
      name: 'Shirdi International Airport (SAG)',
      distance: '14.2 km',
      approxDuration: '20–25 mins drive',
      type: 'airport',
      description: 'Air-conditioned civil terminal operating daily commercial scheduled flights from major metros.',
      frequencyNote: 'Daily nonstop flights operated by IndiGo and SpiceJet from New Delhi, Mumbai, Bengaluru, Hyderabad, and Chennai.',
      transferAssistance: 'Dedicated hotel chauffeur with name placard pickup right outside terminal exit gate.',
      recommendation: 'Advance taxi booking recommended during peak festival days and Thursday aartis.',
      directionsUrl: 'https://maps.google.com/?q=Shirdi+Airport'
    },
    {
      id: 'bus',
      name: 'Shirdi Central Bus Stand (MSRTC)',
      distance: '1.1 km',
      approxDuration: '4 mins drive / 12 mins walk',
      type: 'bus',
      description: 'Central state transport depot and drop-off point for intercity luxury sleeper buses across Maharashtra.',
      frequencyNote: 'Round-the-clock MSRTC Shivneri, Shivshahi AC Volvo services & premium private sleeper buses.',
      transferAssistance: 'Continuous 24-hr auto-rickshaws available; hotel team assists with bags for senior citizens.',
      recommendation: 'Just 1.1 km away along Pimpalwadi Road; effortless transition to temple sanctum Gate No. 2.',
      directionsUrl: 'https://maps.google.com/?q=Shirdi+Bus+Stand'
    }
  ],

  gallery: [
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      title: 'Hotel Royal Retreat Front Entrance',
      category: 'exterior',
      alt: 'Hotel Royal Retreat Shirdi building front located opposite Gate No. 2',
      featured: true
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      title: 'Superior Double Guest Room',
      category: 'rooms',
      alt: 'Neat, air-conditioned superior double bedroom with clean white linens',
      featured: true
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      title: 'Standard Triple Family Room',
      category: 'rooms',
      alt: 'Three-bed family room ideal for parents with children visiting Shirdi',
      featured: true
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      title: 'Sattva Pure Veg Dining Hall',
      category: 'dining',
      alt: 'Clean and bright pure vegetarian dining hall serving thalis and breakfast'
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      title: 'Deluxe Suite Living Lounge',
      category: 'rooms',
      alt: 'Spacious Deluxe Family Suite living area with comfortable seating'
    },
    {
      id: 'g6',
      url: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      title: 'Sai Baba Temple Gate No. 2 Vicinity',
      category: 'exterior',
      alt: 'Spiritual surroundings and immediate proximity to Gate No. 2'
    },
    {
      id: 'g7',
      url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      title: 'Welcome Reception & Pilgrim Desk',
      category: 'lobby',
      alt: 'Welcoming front desk assisting guests with 24-hour check-in'
    },
    {
      id: 'g8',
      url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      title: 'Modern Attached Bathroom',
      category: 'rooms',
      alt: 'Spotless tiled bathroom with 24-hour hot water shower'
    }
  ],

  reviews: {
    summary: {
      google: { rating: 4.7, count: 190, max: 5 },
      booking: { rating: 8.8, count: 255, max: 10 },
      agoda: { rating: 9.0, count: 72, max: 10 },
      makemytrip: { rating: 4.3, count: 215, max: 5 }
    },
    featured: [
      {
        id: 'r1',
        author: 'Sunil & Sunita Deshmukh',
        source: 'Booking.com',
        rating: 10,
        maxRating: 10,
        date: 'Recent Pilgrim Stay',
        stayType: 'Family with Elderly Parents',
        excerpt: 'The location right opposite Gate No. 2 is unmatched in Shirdi! My 76-year-old mother could walk to both Kakad and Madhyan Aarti without needing a wheelchair or rickshaw. Hot water was available at 3:30 AM without fail. Very clean rooms and humble staff.'
      },
      {
        id: 'r2',
        author: 'Amitabh Sharma & Family',
        source: 'Google',
        rating: 5,
        maxRating: 5,
        date: 'Verified Visit',
        stayType: 'Family Pilgrimage',
        excerpt: 'Best decision we made. We drove from Mumbai and parked our SUV safely inside the hotel compound for free. The rooms are neat, AC chilled well, and food at Sattva restaurant was fresh, pure veg, and gentle on the stomach. Truly felt like a home in Baba’s Shirdi.'
      },
      {
        id: 'r3',
        author: 'Prashant K. Jain',
        source: 'Agoda',
        rating: 9.5,
        maxRating: 10,
        date: 'Solo Devotee Stay',
        stayType: 'Spiritual Retreat',
        excerpt: 'Spotless linen, peaceful ambiance, and courteous management. When I requested Jain food without onion or potato, the chef prepared special khichdi and phulkas happily. You literally cross the road and you are at the temple entrance.'
      },
      {
        id: 'r4',
        author: 'Rajalakshmi Iyer',
        source: 'MakeMyTrip',
        rating: 4.5,
        maxRating: 5,
        date: 'Weekend Stay',
        stayType: 'Couples Pilgrimage',
        excerpt: 'Ideal hotel for anyone planning an Aarti-focused visit. After late night Shej Aarti at 10:45 PM, we walked back to our room in less than 3 minutes. Elevator works smoothly and the staff helped arrange our airport taxi at fair rates.'
      }
    ]
  },

  faqs: [
    {
      question: 'Where exactly is Hotel Royal Retreat located in Shirdi?',
      answer: 'Hotel Royal Retreat is located directly opposite Gate No. 2 of Shri Saibaba Sansthan Temple on Pimpalwadi Road / Bhagyalaxmi Road in Sai Nagar, Shirdi (Pin: 423109). It is approximately 100 meters (a 2-minute flat walk) from the main temple compound.',
      category: 'location'
    },
    {
      question: 'Is 24-hour hot water available for early morning Kakad Aarti (4:30 AM)?',
      answer: 'Yes, absolutely. Guaranteed 24-hour hot water is available via geysers in every room, ensuring devotees can take a holy shower early at 3:00 AM or 3:30 AM before attending the sacred Kakad Aarti.',
      category: 'stay'
    },
    {
      question: 'Is the hotel suitable for senior citizens and elderly pilgrims?',
      answer: 'Yes, highly suitable. Because the hotel is merely 100 meters flat walking distance from Gate No. 2, senior citizens avoid strenuous commuting or uneven auto-rickshaw rides. Additionally, the hotel has an elevator/lift servicing all guest room floors.',
      category: 'location'
    },
    {
      question: 'Does the hotel have an on-site pure vegetarian restaurant? Is Jain food available?',
      answer: 'Yes, Sattva Pure Vegetarian Restaurant operates on the property premises, serving 100% vegetarian Indian, South Indian, and Maharashtrian dishes. Special Jain meals prepared strictly without onion, garlic, or root vegetables are available upon request.',
      category: 'dining'
    },
    {
      question: 'Is safe parking available for private cars and tempo travelers?',
      answer: 'Yes, Hotel Royal Retreat provides complimentary on-site parking for guests arriving by private car, SUV, or tempo traveler. The parking area is located within the property premises.',
      category: 'services'
    },
    {
      question: 'What are the check-in and check-out timings?',
      answer: 'Standard check-in time is 12:00 PM (Noon), and check-out is 11:00 AM. Early check-in or late check-out is accommodated depending on room availability on your travel date. If arriving early, you may securely store luggage at the front desk and proceed for Darshan.',
      category: 'policies'
    },
    {
      question: 'How do I reach Hotel Royal Retreat from Shirdi Airport or Railway Station?',
      answer: 'Sainagar Shirdi Railway Station (SNSI) is 2.9 km away (about 8–10 minutes by auto or taxi). Shirdi International Airport (SAG) is approximately 14.2 km away (20–25 minutes drive). Our front desk can arrange direct station or airport pickup cabs upon advance request.',
      category: 'services'
    },
    {
      question: 'Can the front desk assist with VIP Darshan passes or Shani Shingnapur cabs?',
      answer: 'Yes, our 24-hour reception staff is happy to guide you on current Shri Saibaba Sansthan booking procedures for Aarti and VIP passes. We also coordinate reliable AC cab services for the popular day excursion to Shani Shingnapur (70 km).',
      category: 'services'
    }
  ],

  policies: {
    checkInTime: '12:00 PM (Noon)',
    checkOutTime: '11:00 AM',
    cancellationPolicy: 'Free cancellation or date rescheduling up to 48 hours prior to scheduled arrival date. Within 48 hours, first night retention charge applies.',
    diningPolicy: '100% strictly pure vegetarian premises. Outside non-vegetarian meals or alcohol consumption is strictly prohibited.',
    idProofPolicy: 'All adult guests must carry valid government photo ID with address proof (Aadhaar Card, Passport, Voter ID, or Driving License) for statutory registration.',
    childPolicy: 'Children up to 5 years stay complimentary with parents using existing bedding.',
    parkingPolicy: 'Free on-site parking available for guest cars and private tourist vehicles.',
    petPolicy: 'Pets permitted on advance request and management confirmation.',
    smokingPolicy: 'Strictly non-smoking guest rooms and public corridors in reverence to the pilgrimage sanctuary.'
  },

  whatsappTemplates: {
    general: '🌸 Om Sai Ram! I would like to enquire about room availability and tariff at Hotel Royal Retreat, Shirdi for my upcoming pilgrimage. My travel dates: {DATES}, Guests: {GUESTS}. Please share current rates and details.',
    room: '🌸 Om Sai Ram! I am interested in booking the {ROOM_NAME} at Hotel Royal Retreat, Shirdi. Intended dates: {CHECK_IN} to {CHECK_OUT} for {GUESTS} guest(s). Please confirm availability and tariff.',
    dining: '🌸 Om Sai Ram! I would like to enquire about pure vegetarian dining / table reservation / Jain food options at Sattva Restaurant, Hotel Royal Retreat.',
    templeVisit: '🌸 Om Sai Ram! We are planning a Shirdi Darshan & Kakad Aarti visit. Could you please share room options near Gate No. 2 and assistance with Aarti schedule?',
    transport: '🌸 Om Sai Ram! I need taxi transfer assistance between Shirdi Airport / Railway Station and Hotel Royal Retreat. Please share rates.',
    event: '🌸 Om Sai Ram! I would like to inquire about group booking / family stay at Hotel Royal Retreat, Shirdi.',
    contact: '🌸 Om Sai Ram! Reservation inquiry from {NAME} for {DATES}. Message: {MESSAGE}'
  }
};
