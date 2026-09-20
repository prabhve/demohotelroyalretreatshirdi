import React, { createContext, useContext, useState, useEffect } from 'react';
import { HotelConfig, GalleryItem, RoomType, BookingRequest, EnquiryRequest, RequestStatus, EmailAcknowledgement, BookingFormConfig } from '../types';
import { initialHotelConfig } from '../data/hotelConfig';
import { initialBookingRequests, initialEnquiryRequests } from '../data/sampleRequests';

export interface BookingModalPref {
  roomId?: string;
  roomName?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}

interface HotelContextType {
  config: HotelConfig;
  selectedRoomSlug: string | null;
  setSelectedRoomSlug: (slug: string | null) => void;
  activeRoom: RoomType | null;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isDiningModalOpen: boolean;
  setIsDiningModalOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingModalPref: BookingModalPref | null;
  openBookingModal: (pref?: BookingModalPref) => void;
  closeBookingModal: () => void;
  activePolicy: 'terms' | 'privacy' | 'cancellation' | null;
  setActivePolicy: (policy: 'terms' | 'privacy' | 'cancellation' | null) => void;

  // Requests state & management
  bookingRequests: BookingRequest[];
  enquiryRequests: EnquiryRequest[];
  addBookingRequest: (req: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => BookingRequest;
  updateBookingStatus: (id: string, status: RequestStatus, notes?: string) => void;
  updateBookingAcknowledgement: (id: string, ack: EmailAcknowledgement) => void;
  deleteBookingRequest: (id: string) => void;
  addEnquiryRequest: (req: Omit<EnquiryRequest, 'id' | 'createdAt' | 'status'>) => EnquiryRequest;
  updateEnquiryStatus: (id: string, status: RequestStatus, adminNotes?: string) => void;
  updateEnquiryAcknowledgement: (id: string, ack: EmailAcknowledgement) => void;
  deleteEnquiryRequest: (id: string) => void;

  getWhatsAppUrl: (templateType: 'general' | 'room' | 'dining' | 'templeVisit' | 'transport' | 'event' | 'contact', replacements?: Record<string, string>) => string;
  openWhatsApp: (templateType: 'general' | 'room' | 'dining' | 'templeVisit' | 'transport' | 'event' | 'contact', replacements?: Record<string, string>) => void;
  updateContact: (newContact: Partial<HotelConfig['contact']>) => void;
  updateWhatsAppTemplates: (newTemplates: Partial<HotelConfig['whatsappTemplates']>) => void;
  updateIdentity: (newIdentity: Partial<HotelConfig['identity']>) => void;
  updateRestaurant: (newRestaurant: Partial<HotelConfig['restaurant']>) => void;
  updateRooms: (rooms: RoomType[]) => void;
  updateRoom: (room: RoomType) => void;
  addRoom: (room: RoomType) => void;
  deleteRoom: (roomId: string) => void;
  updateAartiSchedule: (schedule: HotelConfig['aartiSchedule']) => void;
  updateReviews: (reviews: HotelConfig['reviews']) => void;
  updateFaqs: (faqs: HotelConfig['faqs']) => void;
  updatePolicies: (policies: HotelConfig['policies']) => void;
  updateBookingFormConfig: (newBookingForm: Partial<BookingFormConfig>) => void;
  updateFullConfig: (newConfig: Partial<HotelConfig>) => void;
  updateHeroImage: (url: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  resetToDefaults: () => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const STORAGE_KEY = 'hotel_royal_retreat_config_v1';
const BOOKINGS_STORAGE_KEY = 'hotel_royal_retreat_bookings_v1';
const ENQUIRIES_STORAGE_KEY = 'hotel_royal_retreat_enquiries_v1';

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<HotelConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...initialHotelConfig,
            ...parsed,
            contact: { ...initialHotelConfig.contact, ...parsed.contact },
            bookingForm: {
              ...initialHotelConfig.bookingForm!,
              ...(parsed.bookingForm || {})
            }
          };
        }
      } catch {
        // Fallback to initial
      }
    }
    return initialHotelConfig;
  });

  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // fallback
      }
    }
    return initialBookingRequests;
  });

  const [enquiryRequests, setEnquiryRequests] = useState<EnquiryRequest[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // fallback
      }
    }
    return initialEnquiryRequests;
  });

  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isDiningModalOpen, setIsDiningModalOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingModalPref, setBookingModalPref] = useState<BookingModalPref | null>(null);
  const [activePolicy, setActivePolicy] = useState<'terms' | 'privacy' | 'cancellation' | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore storage error
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookingRequests));
    } catch {
      // ignore
    }
  }, [bookingRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiryRequests));
    } catch {
      // ignore
    }
  }, [enquiryRequests]);

  const openBookingModal = (pref?: BookingModalPref) => {
    if (pref) setBookingModalPref(pref);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const addBookingRequest = (req: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): BookingRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRequest: BookingRequest = {
      ...req,
      id: `RR-BKG-${randomSuffix}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookingRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const updateBookingStatus = (id: string, status: RequestStatus, notes?: string) => {
    setBookingRequests(prev =>
      prev.map(item => (item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item))
    );
  };

  const updateBookingAcknowledgement = (id: string, acknowledgement: EmailAcknowledgement) => {
    setBookingRequests(prev =>
      prev.map(item => (item.id === id ? { ...item, acknowledgement } : item))
    );
  };

  const deleteBookingRequest = (id: string) => {
    setBookingRequests(prev => prev.filter(item => item.id !== id));
  };

  const addEnquiryRequest = (req: Omit<EnquiryRequest, 'id' | 'createdAt' | 'status'>): EnquiryRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newEnquiry: EnquiryRequest = {
      ...req,
      id: `RR-ENQ-${randomSuffix}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setEnquiryRequests(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: RequestStatus, adminNotes?: string) => {
    setEnquiryRequests(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status,
              ...(status === 'resolved' || status === 'confirmed' ? { resolvedAt: new Date().toISOString() } : {}),
              ...(adminNotes !== undefined ? { adminNotes } : {})
            }
          : item
      )
    );
  };

  const updateEnquiryAcknowledgement = (id: string, acknowledgement: EmailAcknowledgement) => {
    setEnquiryRequests(prev =>
      prev.map(item => (item.id === id ? { ...item, acknowledgement } : item))
    );
  };

  const deleteEnquiryRequest = (id: string) => {
    setEnquiryRequests(prev => prev.filter(item => item.id !== id));
  };

  const activeRoom = selectedRoomSlug
    ? config.rooms.find(r => r.slug === selectedRoomSlug) || null
    : null;

  const getWhatsAppUrl = (
    templateType: 'general' | 'room' | 'dining' | 'templeVisit' | 'transport' | 'event' | 'contact',
    replacements: Record<string, string> = {}
  ): string => {
    let template = config.whatsappTemplates[templateType] || config.whatsappTemplates.general;
    Object.entries(replacements).forEach(([key, val]) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      template = template.replace(regex, val);
    });

    const cleanNumber = config.contact.whatsappNumber.replace(/\D/g, '');
    const encodedText = encodeURIComponent(template.trim());
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  };

  const openWhatsApp = (
    templateType: 'general' | 'room' | 'dining' | 'templeVisit' | 'transport' | 'event' | 'contact',
    replacements: Record<string, string> = {}
  ) => {
    const url = getWhatsAppUrl(templateType, replacements);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const updateContact = (newContact: Partial<HotelConfig['contact']>) => {
    setConfig(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...newContact
      }
    }));
  };

  const updateWhatsAppTemplates = (newTemplates: Partial<HotelConfig['whatsappTemplates']>) => {
    setConfig(prev => ({
      ...prev,
      whatsappTemplates: {
        ...prev.whatsappTemplates,
        ...newTemplates
      }
    }));
  };

  const updateIdentity = (newIdentity: Partial<HotelConfig['identity']>) => {
    setConfig(prev => ({
      ...prev,
      identity: {
        ...prev.identity,
        ...newIdentity
      }
    }));
  };

  const updateRestaurant = (newRestaurant: Partial<HotelConfig['restaurant']>) => {
    setConfig(prev => ({
      ...prev,
      restaurant: {
        ...prev.restaurant,
        ...newRestaurant
      }
    }));
  };

  const updateRooms = (rooms: RoomType[]) => {
    setConfig(prev => ({
      ...prev,
      rooms
    }));
  };

  const updateRoom = (room: RoomType) => {
    setConfig(prev => ({
      ...prev,
      rooms: prev.rooms.map(r => r.id === room.id ? room : r)
    }));
  };

  const addRoom = (room: RoomType) => {
    setConfig(prev => ({
      ...prev,
      rooms: [...prev.rooms, room]
    }));
  };

  const deleteRoom = (roomId: string) => {
    setConfig(prev => ({
      ...prev,
      rooms: prev.rooms.filter(r => r.id !== roomId)
    }));
  };

  const updateAartiSchedule = (schedule: HotelConfig['aartiSchedule']) => {
    setConfig(prev => ({
      ...prev,
      aartiSchedule: schedule
    }));
  };

  const updateReviews = (reviews: HotelConfig['reviews']) => {
    setConfig(prev => ({
      ...prev,
      reviews
    }));
  };

  const updateFaqs = (faqs: HotelConfig['faqs']) => {
    setConfig(prev => ({
      ...prev,
      faqs
    }));
  };

  const updatePolicies = (policies: HotelConfig['policies']) => {
    setConfig(prev => ({
      ...prev,
      policies
    }));
  };

  const updateFullConfig = (newConfig: Partial<HotelConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  };

  const updateHeroImage = (url: string) => {
    setConfig(prev => ({
      ...prev,
      identity: {
        ...prev.identity,
        heroImage: url
      }
    }));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: 'g_' + Date.now()
    };
    setConfig(prev => ({
      ...prev,
      gallery: [newItem, ...prev.gallery]
    }));
  };

  const deleteGalleryItem = (id: string) => {
    setConfig(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
  };

  const updateBookingFormConfig = (newBookingForm: Partial<BookingFormConfig>) => {
    setConfig(prev => ({
      ...prev,
      bookingForm: {
        ...(prev.bookingForm || initialHotelConfig.bookingForm!),
        ...newBookingForm
      }
    }));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(initialHotelConfig);
  };

  return (
    <HotelContext.Provider
      value={{
        config,
        selectedRoomSlug,
        setSelectedRoomSlug,
        activeRoom,
        isAdminOpen,
        setIsAdminOpen,
        isDiningModalOpen,
        setIsDiningModalOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingModalPref,
        openBookingModal,
        closeBookingModal,
        activePolicy,
        setActivePolicy,
        bookingRequests,
        enquiryRequests,
        addBookingRequest,
        updateBookingStatus,
        updateBookingAcknowledgement,
        deleteBookingRequest,
        addEnquiryRequest,
        updateEnquiryStatus,
        updateEnquiryAcknowledgement,
        deleteEnquiryRequest,
        getWhatsAppUrl,
        openWhatsApp,
        updateContact,
        updateWhatsAppTemplates,
        updateIdentity,
        updateRestaurant,
        updateRooms,
        updateRoom,
        addRoom,
        deleteRoom,
        updateAartiSchedule,
        updateReviews,
        updateFaqs,
        updatePolicies,
        updateBookingFormConfig,
        updateFullConfig,
        updateHeroImage,
        addGalleryItem,
        deleteGalleryItem,
        resetToDefaults
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
