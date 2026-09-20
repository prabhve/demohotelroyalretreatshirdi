export interface HotelIdentity {
  name: string;
  tagline: string;
  secondaryTagline: string;
  hotelType: string;
  starCategoryListing: string;
  heroImage?: string;
  address: {
    gate: string;
    street: string;
    landmark: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    fullFormatted: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface HotelContact {
  primaryPhone: string;
  primaryPhoneDisplay: string;
  secondaryPhone: string;
  secondaryPhoneDisplay: string;
  whatsappNumber: string;
  whatsappNumberDisplay: string;
  email: string;
  googleMapsUrl: string;
}

export interface RoomType {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  sizeSqFt: number;
  sizeSqM: number;
  bedConfig: string;
  maxOccupancy: number;
  view: string;
  description: string;
  tagline: string;
  highlights: string[];
  amenities: string[];
  images: string[];
  features: string[];
  tariffNote: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: string;
  isJainFriendly?: boolean;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface TempleSite {
  id: string;
  name: string;
  distance: string;
  walkingTime?: string;
  significance: string;
  description: string;
  image: string;
  mapQuery: string;
}

export interface AartiItem {
  id: string;
  name: string;
  marathiName: string;
  time: string;
  description: string;
  devoteeTip: string;
}

export interface TransportHub {
  id: string;
  name: string;
  distance: string;
  approxDuration: string;
  type: 'airport' | 'railway' | 'bus';
  description: string;
  directionsUrl: string;
  frequencyNote?: string;
  transferAssistance?: string;
  recommendation?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'rooms' | 'dining' | 'lobby' | 'exterior' | 'services';
  alt: string;
  featured?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google' | 'Booking.com' | 'Agoda' | 'MakeMyTrip';
  rating: number;
  maxRating: number;
  date: string;
  excerpt: string;
  stayType?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'location' | 'stay' | 'dining' | 'services' | 'policies';
}

export interface WhatsAppTemplates {
  general: string;
  room: string;
  dining: string;
  templeVisit: string;
  transport: string;
  event: string;
  contact: string;
}

export interface HotelPolicies {
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  diningPolicy: string;
  idProofPolicy: string;
  childPolicy: string;
  parkingPolicy: string;
  petPolicy: string;
  smokingPolicy: string;
}

export type RequestStatus = 'pending' | 'confirmed' | 'resolved' | 'cancelled';

export interface EmailAcknowledgement {
  sent: boolean;
  sentAt: string;
  recipientEmail: string;
  subject: string;
  messagePreview: string;
  fullMessage: string;
  htmlContent?: string;
  status: 'delivered' | 'sent' | 'pending';
  dispatchMethod?: 'server_api' | 'client_automated';
}

export interface BookingRequest {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  roomId?: string;
  guestsCount: string;
  adults?: number;
  children?: number;
  specialRequirements?: string;
  status: RequestStatus;
  createdAt: string;
  notes?: string;
  estimatedAmount?: string;
  source?: 'website_modal' | 'booking_bar' | 'room_page' | 'room_modal' | 'whatsapp' | 'quick_enquiry' | 'contact_form' | 'website_form';
  acknowledgement?: EmailAcknowledgement;
}

export interface EnquiryRequest {
  id: string;
  referenceNumber?: string;
  customerName: string;
  phone: string;
  customerPhone?: string;
  email?: string;
  category?: string;
  subject?: string;
  message: string;
  dates?: string;
  roomPreference?: string;
  status: RequestStatus;
  createdAt: string;
  resolvedAt?: string;
  adminNotes?: string;
  source?: 'contact_form' | 'general' | 'website_modal' | 'room_modal' | 'booking_bar' | 'quick_enquiry';
  acknowledgement?: EmailAcknowledgement;
}

export interface BookingFormChecklistOption {
  id: string;
  label: string;
  sublabel?: string;
  defaultChecked: boolean;
  enabled: boolean;
}

export interface BookingFormEmailAckConfig {
  enabled: boolean;
  subjectPrefix: string;
  welcomeGreeting: string;
  customClosingRemarks: string;
}

export interface BookingFormConfig {
  badgeText: string;
  modalTitle: string;
  locationHighlight: string;
  subHighlight: string;
  enableDevotionalChecklist: boolean;
  devotionalSectionTitle: string;
  devotionalOptions: BookingFormChecklistOption[];
  enableSpecialNotes: boolean;
  specialNotesLabel: string;
  specialNotesPlaceholder: string;
  submitButtonText: string;
  confirmationNotice: string;
  allowInstantEmailReceipt: boolean;
  defaultGuestSelection: string;
  guestOptions: string[];
  depositPolicyNote: string;
  helplineDisplay: string;
  emailAcknowledgement: BookingFormEmailAckConfig;
}

export interface HotelConfig {
  identity: HotelIdentity;
  contact: HotelContact;
  rooms: RoomType[];
  bookingForm?: BookingFormConfig;
  restaurant: {
    name: string;
    subheading: string;
    description: string;
    timings: string;
    cuisineHighlights: string[];
    menuCategories: MenuCategory[];
    jainNotice: string;
    showMenuPrices?: boolean;
  };
  templeExperience: {
    heading: string;
    subheading: string;
    description: string;
    sites: TempleSite[];
  };
  aartiSchedule: AartiItem[];
  transportHubs: TransportHub[];
  gallery: GalleryItem[];
  reviews: {
    summary: {
      google: { rating: number; count: number; max: number };
      booking: { rating: number; count: number; max: number };
      agoda: { rating: number; count: number; max: number };
      makemytrip: { rating: number; count: number; max: number };
    };
    featured: ReviewItem[];
  };
  faqs: FAQItem[];
  policies: HotelPolicies;
  whatsappTemplates: WhatsAppTemplates;
}

