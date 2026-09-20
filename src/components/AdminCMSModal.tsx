import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Phone,
  MessageSquare,
  Image,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Settings,
  LayoutDashboard,
  Building2,
  BedDouble,
  UtensilsCrossed,
  Clock,
  Star,
  HelpCircle,
  Eye,
  Sliders,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  MapPin,
  Flame,
  ChevronRight,
  AlertCircle,
  FileText
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { RoomType, MenuItem, GalleryItem, AartiItem, ReviewItem, FAQItem } from '../types';
import { AdminRequestsManager } from './admin/AdminRequestsManager';
import { AdminBookingFormEditor } from './admin/AdminBookingFormEditor';

type AdminTab =
  | 'overview'
  | 'requests'
  | 'booking-form'
  | 'identity'
  | 'contact'
  | 'rooms'
  | 'dining'
  | 'aarti'
  | 'media'
  | 'reviews'
  | 'faqs'
  | 'templates';

export const AdminCMSModal: React.FC = () => {
  const {
    config,
    isAdminOpen,
    setIsAdminOpen,
    bookingRequests,
    enquiryRequests,
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
    updateHeroImage,
    addGalleryItem,
    deleteGalleryItem,
    resetToDefaults
  } = useHotel();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const pendingRequestsCount =
    bookingRequests.filter(b => b.status === 'pending').length +
    enquiryRequests.filter(e => e.status === 'pending').length;

  // Form states initialized from config
  const [identityForm, setIdentityForm] = useState({
    name: config.identity.name,
    tagline: config.identity.tagline,
    secondaryTagline: config.identity.secondaryTagline,
    hotelType: config.identity.hotelType,
    starCategoryListing: config.identity.starCategoryListing,
    heroImage: config.identity.heroImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
    street: config.identity.address.street,
    gate: config.identity.address.gate,
    fullFormatted: config.identity.address.fullFormatted
  });

  const [contactForm, setContactForm] = useState({
    primaryPhone: config.contact.primaryPhone,
    primaryPhoneDisplay: config.contact.primaryPhoneDisplay,
    secondaryPhone: config.contact.secondaryPhone,
    secondaryPhoneDisplay: config.contact.secondaryPhoneDisplay,
    whatsappNumber: config.contact.whatsappNumber,
    whatsappNumberDisplay: config.contact.whatsappNumberDisplay,
    email: config.contact.email,
    googleMapsUrl: config.contact.googleMapsUrl
  });

  const [restaurantForm, setRestaurantForm] = useState({
    name: config.restaurant.name,
    subheading: config.restaurant.subheading,
    description: config.restaurant.description,
    timings: config.restaurant.timings,
    jainNotice: config.restaurant.jainNotice,
    showMenuPrices: config.restaurant.showMenuPrices ?? true
  });

  const [roomsList, setRoomsList] = useState<RoomType[]>([...config.rooms]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(config.rooms[0]?.id || '');

  const [aartiList, setAartiList] = useState<AartiItem[]>([...config.aartiSchedule]);
  const [faqList, setFaqList] = useState<FAQItem[]>([...config.faqs]);
  const [templatesForm, setTemplatesForm] = useState({ ...config.whatsappTemplates });

  // Add media state
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<'rooms' | 'dining' | 'lobby' | 'exterior' | 'services'>('rooms');

  // Add dish state
  const [selectedMenuCatId, setSelectedMenuCatId] = useState<string>(config.restaurant.menuCategories[0]?.id || '');
  const [newDishName, setNewDishName] = useState('');
  const [newDishPrice, setNewDishPrice] = useState('');
  const [newDishDesc, setNewDishDesc] = useState('');
  const [newDishIsJain, setNewDishIsJain] = useState(false);
  const [newDishIsSpecial, setNewDishIsSpecial] = useState(false);

  if (!isAdminOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    updateIdentity({
      name: identityForm.name,
      tagline: identityForm.tagline,
      secondaryTagline: identityForm.secondaryTagline,
      hotelType: identityForm.hotelType,
      starCategoryListing: identityForm.starCategoryListing,
      heroImage: identityForm.heroImage,
      address: {
        ...config.identity.address,
        street: identityForm.street,
        gate: identityForm.gate,
        fullFormatted: identityForm.fullFormatted
      }
    });
    showToast('Hotel Identity & Hero Background updated successfully!');
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(contactForm);
    showToast('Contact information & Phone numbers updated across the website!');
  };

  const handleTogglePricing = (enabled: boolean) => {
    const updated = { ...restaurantForm, showMenuPrices: enabled };
    setRestaurantForm(updated);
    updateRestaurant({ showMenuPrices: enabled });
    showToast(`Menu pricing on website turned ${enabled ? 'ON' : 'OFF'}!`);
  };

  const handleSaveRestaurant = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurant(restaurantForm);
    showToast('Restaurant info and timing details updated!');
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName) return;

    const newItem: MenuItem = {
      id: 'item_' + Date.now(),
      name: newDishName,
      price: newDishPrice || '₹100',
      description: newDishDesc,
      isJainFriendly: newDishIsJain,
      isChefSpecial: newDishIsSpecial
    };

    const updatedCategories = config.restaurant.menuCategories.map(cat => {
      if (cat.id === selectedMenuCatId) {
        return {
          ...cat,
          items: [...cat.items, newItem]
        };
      }
      return cat;
    });

    updateRestaurant({ menuCategories: updatedCategories });
    setNewDishName('');
    setNewDishPrice('');
    setNewDishDesc('');
    setNewDishIsJain(false);
    setNewDishIsSpecial(false);
    showToast('New menu item added to Sattva Restaurant!');
  };

  const handleDeleteDish = (categoryId: string, itemId: string) => {
    const updatedCategories = config.restaurant.menuCategories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.filter(i => i.id !== itemId)
        };
      }
      return cat;
    });
    updateRestaurant({ menuCategories: updatedCategories });
    showToast('Dish removed from menu.');
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;
    addGalleryItem({
      url: newMediaUrl,
      title: newMediaTitle || 'Hotel Royal Retreat Photograph',
      category: newMediaCategory,
      alt: newMediaTitle || 'Hotel Royal Retreat Shirdi'
    });
    setNewMediaUrl('');
    setNewMediaTitle('');
    showToast('New photo added to the live gallery!');
  };

  const handleSaveTemplates = (e: React.FormEvent) => {
    e.preventDefault();
    updateWhatsAppTemplates(templatesForm);
    showToast('WhatsApp lead messages updated!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all website content back to default verified data for Hotel Royal Retreat?')) {
      resetToDefaults();
      showToast('Website content restored to defaults.');
      setIsAdminOpen(false);
    }
  };

  return (
    <div
      id="admin-cms-fullscreen-panel"
      className="fixed inset-0 z-50 bg-[#100905] text-[#fcfbf7] flex flex-col overflow-hidden font-sans select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Application Bar */}
      <header className="px-3 sm:px-6 py-3 bg-[#1a0f08] border-b border-[#b45309]/30 flex items-center justify-between shrink-0 shadow-lg gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-xl bg-[#b45309] text-white shrink-0">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#fcfbf7] tracking-wide truncate">
                HOTEL ROYAL RETREAT
              </h2>
              <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] font-bold uppercase tracking-wider border border-[#f59e0b]/30 shrink-0">
                CMS PANEL
              </span>
            </div>
            <p className="text-[11px] text-[#d6c2a8]/70 hidden md:block truncate">
              Manage website content, booking form, tariffs, Sattva menu & WhatsApp templates
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-red-900/40 text-red-300 hover:bg-red-950/40 text-xs font-semibold transition-colors cursor-pointer"
            title="Restore original verified data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
            <span className="sm:hidden text-[11px]">Reset</span>
          </button>

          <button
            id="admin-close-panel-btn"
            onClick={() => setIsAdminOpen(false)}
            className="inline-flex items-center gap-1.5 bg-[#b45309] hover:bg-[#d97706] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close Admin</span>
            <span className="sm:hidden text-[11px]">Close</span>
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Section Navigation (Visible on mobile/tablet screens < md) */}
      <div className="md:hidden bg-[#170e07] border-b border-[#b45309]/25 px-2 py-2 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-thin">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'requests', label: `Requests (${bookingRequests.length})`, icon: Clock },
          { id: 'booking-form', label: 'Booking Form', icon: FileText, badge: 'New' },
          { id: 'identity', label: 'Identity', icon: Building2 },
          { id: 'contact', label: 'Contact', icon: Phone },
          { id: 'rooms', label: 'Rooms', icon: BedDouble },
          { id: 'dining', label: 'Dining', icon: UtensilsCrossed },
          { id: 'aarti', label: 'Aarti', icon: Clock },
          { id: 'media', label: 'Media', icon: Image },
          { id: 'reviews', label: 'Reviews', icon: Star },
          { id: 'faqs', label: 'FAQs', icon: HelpCircle },
          { id: 'templates', label: 'WhatsApp', icon: MessageSquare },
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#b45309] text-white shadow'
                  : 'bg-[#23150d] text-[#e8ded1] hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[9px] px-1 py-0.2 bg-[#f59e0b] text-[#23150d] font-bold rounded">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Split Layout: Left Sidebar (Desktop) + Right Work Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation (Desktop only: md and above) */}
        <aside className="hidden md:flex md:w-64 lg:w-72 bg-[#170e07] border-r border-[#b45309]/25 flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b border-[#b45309]/20">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#f59e0b] block">
              Website Sections (A to Z)
            </span>
          </div>

          <nav className="p-2.5 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#f59e0b]" />
                <span>Overview & Toggles</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              id="admin-nav-requests-btn"
              onClick={() => setActiveTab('requests')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'requests'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#f59e0b]" />
                <span>Bookings & Requests</span>
              </div>
              {pendingRequestsCount > 0 ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-[#100905] font-bold animate-pulse">
                  {pendingRequestsCount} new
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#d6c2a8]">
                  {bookingRequests.length + enquiryRequests.length}
                </span>
              )}
            </button>

            <button
              id="admin-nav-booking-form-btn"
              onClick={() => setActiveTab('booking-form')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'booking-form'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#f59e0b]" />
                <span>Online Booking Form</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-[#f59e0b] font-bold border border-amber-500/30">
                Form Edit
              </span>
            </button>

            <button
              onClick={() => setActiveTab('identity')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'identity'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#f59e0b]" />
                <span>Hotel Identity & Hero</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#f59e0b]" />
                <span>Contact & Front Desk</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('rooms')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'rooms'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BedDouble className="w-4 h-4 text-[#f59e0b]" />
                <span>Rooms & Tariffs CMS</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">{config.rooms.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('dining')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dining'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4 text-[#f59e0b]" />
                <span>Sattva Dining & Menu</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                config.restaurant.showMenuPrices ?? true ? 'bg-emerald-900/60 text-emerald-300' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {config.restaurant.showMenuPrices ?? true ? 'Price ON' : 'Price OFF'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('aarti')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'aarti'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#f59e0b]" />
                <span>Aarti Timings CMS</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Image className="w-4 h-4 text-[#f59e0b]" />
                <span>Photo & Video CMS</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">{config.gallery.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-[#f59e0b]" />
                <span>Reviews & Ratings</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'faqs'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-[#f59e0b]" />
                <span>Pilgrim FAQs CMS</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-[#b45309] text-white shadow-md'
                  : 'text-[#e8ded1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#f59e0b]" />
                <span>WhatsApp Templates</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </nav>

          {/* Bottom Live Notice */}
          <div className="mt-auto p-4 border-t border-[#b45309]/20 bg-[#120a05] text-[11px] text-[#d6c2a8]/60 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full CMS Live Mode</span>
            </div>
            <p>All changes persist immediately to your visitor-facing website.</p>
          </div>
        </aside>

        {/* Right Work Area */}
        <main className="flex-1 bg-[#120a05] overflow-y-auto p-3.5 sm:p-6 lg:p-10 relative">
          {/* Toast Notice */}
          {toastMessage && (
            <div className="fixed top-20 right-8 z-50 bg-[#f59e0b] text-[#23150d] px-5 py-3 rounded-2xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
              <Check className="w-4 h-4 text-emerald-900" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* 1. OVERVIEW & QUICK TOGGLES */}
          {activeTab === 'overview' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Control Center
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Property Overview & Master Toggles
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Manage the core switches and high-impact settings of Hotel Royal Retreat.
                </p>
              </div>

              {/* Real-time Customer Request Notification Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-[#241307] to-[#1a0f08] border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-bold text-white">
                        Customer Bookings & Pilgrim Inquiries
                      </h4>
                      {pendingRequestsCount > 0 ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-[#100905] font-bold">
                          {pendingRequestsCount} Pending Action
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          All Handled
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#d6c2a8]/80 mt-0.5">
                      {bookingRequests.length} room booking requests, {enquiryRequests.length} general contact inquiries received.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="admin-overview-view-requests-btn"
                  onClick={() => setActiveTab('requests')}
                  className="px-4 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
                >
                  Open Requests Dashboard →
                </button>
              </div>

              {/* Master Switches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Menu Pricing Master Switch (As requested in 3rd user point) */}
                <div className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-2xl bg-[#b45309]/20 text-[#f59e0b]">
                        <UtensilsCrossed className="w-5 h-5" />
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                        restaurantForm.showMenuPrices
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {restaurantForm.showMenuPrices ? 'Prices Shown' : 'Prices Hidden'}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#fcfbf7] mb-1">
                      Restaurant Menu Pricing
                    </h4>
                    <p className="text-xs text-[#d6c2a8]/80 leading-relaxed mb-4">
                      Control whether exact dish prices (e.g. ₹90, ₹140, ₹220) are displayed to website visitors in the Sattva Restaurant menu section.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#e8ded1]">Display Prices on Website:</span>
                    <button
                      id="toggle-menu-prices-btn"
                      type="button"
                      onClick={() => handleTogglePricing(!restaurantForm.showMenuPrices)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        restaurantForm.showMenuPrices
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                      }`}
                    >
                      {restaurantForm.showMenuPrices ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          <span>Enabled</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>Disabled</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Hero Background Status */}
                <div className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-2xl bg-[#b45309]/20 text-[#f59e0b]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30">
                        Opposite Gate 2
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#fcfbf7] mb-1">
                      Hero Facade Background
                    </h4>
                    <p className="text-xs text-[#d6c2a8]/80 leading-relaxed mb-4">
                      Grand illuminated hotel sanctuary visual in the header. Current setting showcases the welcoming hotel facade.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-[#d6c2a8]/70 truncate max-w-[200px]">
                      {identityForm.heroImage}
                    </span>
                    <button
                      onClick={() => setActiveTab('identity')}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold transition-colors"
                    >
                      Edit Image
                    </button>
                  </div>
                </div>

                {/* Online Booking Form Editor Quick Card */}
                <div className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 shadow-lg flex flex-col justify-between md:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-[#b45309]/20 text-[#f59e0b]">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg font-bold text-[#fcfbf7]">
                            Online Booking Form Customizer
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                            Live Config
                          </span>
                        </div>
                        <p className="text-xs text-[#d6c2a8]/80 mt-0.5">
                          Edit reservation modal titles, Gate 2 badges, devotional care checkboxes (Aarti hot water, senior citizen, Jain food), guest choices, and automatic email receipt dispatch.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('booking-form')}
                      className="px-4 py-2 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
                    >
                      Configure Form →
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistics & Quick Health Check */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#1a0f08] border border-[#b45309]/20 text-center">
                  <span className="text-2xl font-bold font-serif text-[#f59e0b] block">{config.rooms.length}</span>
                  <span className="text-xs text-[#d6c2a8]/70">Configured Rooms</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1a0f08] border border-[#b45309]/20 text-center">
                  <span className="text-2xl font-bold font-serif text-[#f59e0b] block">{config.gallery.length}</span>
                  <span className="text-xs text-[#d6c2a8]/70">Gallery Photos</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1a0f08] border border-[#b45309]/20 text-center">
                  <span className="text-2xl font-bold font-serif text-[#f59e0b] block">4</span>
                  <span className="text-xs text-[#d6c2a8]/70">Aarti Timings</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#1a0f08] border border-[#b45309]/20 text-center">
                  <span className="text-2xl font-bold font-serif text-[#f59e0b] block">100m</span>
                  <span className="text-xs text-[#d6c2a8]/70">To Temple Gate 2</span>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMER BOOKINGS & ENQUIRIES MANAGEMENT */}
          {activeTab === 'requests' && <AdminRequestsManager />}

          {/* ONLINE BOOKING FORM CONFIGURATION & CUSTOMIZER */}
          {activeTab === 'booking-form' && <AdminBookingFormEditor />}

          {/* 2. HOTEL IDENTITY & HERO (As requested in 2nd user point) */}
          {activeTab === 'identity' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Visual Ambiance & Branding
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Hotel Identity & Hero Background Image
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Update property name, slogans, address, and the main hero background photo.
                </p>
              </div>

              <form onSubmit={handleSaveIdentity} className="space-y-6">
                {/* Hero Image Selector with Quick Presets */}
                <div className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#fcfbf7]">
                        Hero Background Image URL
                      </h4>
                      <p className="text-xs text-[#d6c2a8]/70">
                        Sets the prominent background image of the Hero section.
                      </p>
                    </div>
                  </div>

                  <input
                    type="url"
                    value={identityForm.heroImage}
                    onChange={e => setIdentityForm({ ...identityForm, heroImage: e.target.value })}
                    placeholder="https://example.com/hotel-image.jpg"
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                  />

                  {/* Quick Presets for Hotel Ambiance */}
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#f59e0b] block">
                      Quick Hotel Image Presets:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setIdentityForm({ ...identityForm, heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85' })}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          identityForm.heroImage.includes('photo-1566073771259')
                            ? 'border-[#f59e0b] bg-[#b45309]/20 text-white'
                            : 'border-white/10 bg-white/5 text-[#d6c2a8]/80 hover:bg-white/10'
                        }`}
                      >
                        <strong className="block font-serif text-white">Grand Hotel Facade</strong>
                        <span className="text-[10px] text-[#d6c2a8]/70">Warm golden architectural lighting</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIdentityForm({ ...identityForm, heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85' })}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          identityForm.heroImage.includes('photo-1582719478250')
                            ? 'border-[#f59e0b] bg-[#b45309]/20 text-white'
                            : 'border-white/10 bg-white/5 text-[#d6c2a8]/80 hover:bg-white/10'
                        }`}
                      >
                        <strong className="block font-serif text-white">Deluxe Devotee Suite</strong>
                        <span className="text-[10px] text-[#d6c2a8]/70">Peaceful luxury room interior</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIdentityForm({ ...identityForm, heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85' })}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          identityForm.heroImage.includes('photo-1542314831')
                            ? 'border-[#f59e0b] bg-[#b45309]/20 text-white'
                            : 'border-white/10 bg-white/5 text-[#d6c2a8]/80 hover:bg-white/10'
                        }`}
                      >
                        <strong className="block font-serif text-white">Resort & Sanctuary Lawn</strong>
                        <span className="text-[10px] text-[#d6c2a8]/70">Serene lush pilgrim ambiance</span>
                      </button>
                    </div>
                  </div>

                  {/* Image Live Preview */}
                  {identityForm.heroImage && (
                    <div className="relative rounded-2xl overflow-hidden h-44 border border-[#b45309]/40 mt-2">
                      <img
                        src={identityForm.heroImage}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                        <span className="text-xs text-[#f59e0b] font-bold flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Live Hero Preview (Visible on homepage)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hotel Name & Taglines */}
                <div className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-4">
                  <h4 className="font-serif text-base font-bold text-[#fcfbf7]">
                    Basic Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                        Hotel Name
                      </label>
                      <input
                        type="text"
                        value={identityForm.name}
                        onChange={e => setIdentityForm({ ...identityForm, name: e.target.value })}
                        className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                        Star / Category Listing
                      </label>
                      <input
                        type="text"
                        value={identityForm.starCategoryListing}
                        onChange={e => setIdentityForm({ ...identityForm, starCategoryListing: e.target.value })}
                        className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Primary Tagline (Shown across site & SEO)
                    </label>
                    <input
                      type="text"
                      value={identityForm.tagline}
                      onChange={e => setIdentityForm({ ...identityForm, tagline: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Full Address Formatted
                    </label>
                    <textarea
                      rows={2}
                      value={identityForm.fullFormatted}
                      onChange={e => setIdentityForm({ ...identityForm, fullFormatted: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Identity & Hero</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. CONTACT & FRONT DESK */}
          {activeTab === 'contact' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Lead & Inquiry Routing
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Contact Numbers & Booking Desk
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  All phone numbers and WhatsApp numbers automatically update every single call button and reservation link across the website.
                </p>
              </div>

              <form onSubmit={handleSaveContact} className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Primary Dialing Phone (Format: +919438856888)
                    </label>
                    <input
                      type="text"
                      value={contactForm.primaryPhone}
                      onChange={e => setContactForm({ ...contactForm, primaryPhone: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Primary Phone Display (Format: +91 94388 56888)
                    </label>
                    <input
                      type="text"
                      value={contactForm.primaryPhoneDisplay}
                      onChange={e => setContactForm({ ...contactForm, primaryPhoneDisplay: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      WhatsApp Number (Numeric: 919049040902)
                    </label>
                    <input
                      type="text"
                      value={contactForm.whatsappNumber}
                      onChange={e => setContactForm({ ...contactForm, whatsappNumber: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      WhatsApp Number Display (Format: +91 90490 40902)
                    </label>
                    <input
                      type="text"
                      value={contactForm.whatsappNumberDisplay}
                      onChange={e => setContactForm({ ...contactForm, whatsappNumberDisplay: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Secondary Desk Phone
                    </label>
                    <input
                      type="text"
                      value={contactForm.secondaryPhone}
                      onChange={e => setContactForm({ ...contactForm, secondaryPhone: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Reservations Email Address
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    Google Maps Location Link (For GPS Navigation)
                  </label>
                  <input
                    type="url"
                    value={contactForm.googleMapsUrl}
                    onChange={e => setContactForm({ ...contactForm, googleMapsUrl: e.target.value })}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. ROOMS & TARIFFS CMS */}
          {activeTab === 'rooms' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Inventory & Tariffs
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Rooms & Suites Management
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Edit room specifications, guest capacities, amenities, tariffs, and photo galleries.
                </p>
              </div>

              {/* Room Selector Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {roomsList.map(room => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedRoomId === room.id
                        ? 'bg-[#b45309] text-white shadow-md'
                        : 'bg-[#1a0f08] text-[#d6c2a8] hover:bg-white/10'
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>

              {/* Selected Room Editor */}
              {(() => {
                const curRoom = roomsList.find(r => r.id === selectedRoomId) || roomsList[0];
                if (!curRoom) return null;

                const handleFieldChange = (field: keyof RoomType, val: any) => {
                  const updated = roomsList.map(r => (r.id === curRoom.id ? { ...r, [field]: val } : r));
                  setRoomsList(updated);
                  updateRooms(updated);
                };

                return (
                  <div className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h4 className="font-serif text-lg font-bold text-[#f59e0b]">
                        Editing: {curRoom.name}
                      </h4>
                      <span className="text-xs text-[#d6c2a8]/70 font-mono">
                        Slug: /{curRoom.slug}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                          Room Name
                        </label>
                        <input
                          type="text"
                          value={curRoom.name}
                          onChange={e => handleFieldChange('name', e.target.value)}
                          className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={curRoom.badge || ''}
                          onChange={e => handleFieldChange('badge', e.target.value)}
                          className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                          Max Occupancy (Guests)
                        </label>
                        <input
                          type="number"
                          value={curRoom.maxOccupancy}
                          onChange={e => handleFieldChange('maxOccupancy', parseInt(e.target.value) || 2)}
                          className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                          Bedding Configuration
                        </label>
                        <input
                          type="text"
                          value={curRoom.bedConfig}
                          onChange={e => handleFieldChange('bedConfig', e.target.value)}
                          className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                          Room Size (Sq Ft)
                        </label>
                        <input
                          type="number"
                          value={curRoom.sizeSqFt}
                          onChange={e => handleFieldChange('sizeSqFt', parseInt(e.target.value) || 200)}
                          className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                        Tariff Note / Pricing Banner
                      </label>
                      <input
                        type="text"
                        value={curRoom.tariffNote}
                        onChange={e => handleFieldChange('tariffNote', e.target.value)}
                        className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                        Full Description
                      </label>
                      <textarea
                        rows={3}
                        value={curRoom.description}
                        onChange={e => handleFieldChange('description', e.target.value)}
                        className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                      />
                    </div>

                    {/* Room Photos */}
                    <div>
                      <label className="block text-xs font-semibold text-[#d6c2a8] mb-2">
                        Primary Room Photo URL
                      </label>
                      <input
                        type="url"
                        value={curRoom.images[0] || ''}
                        onChange={e => {
                          const newImgs = [...curRoom.images];
                          newImgs[0] = e.target.value;
                          handleFieldChange('images', newImgs);
                        }}
                        className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => showToast(`Room "${curRoom.name}" changes saved!`)}
                        className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Saved</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 5. SATTVA DINING & MENU CMS (As requested in 3rd user point) */}
          {activeTab === 'dining' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  In-House Pure Vegetarian Dining
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Sattva Restaurant & Menu Pricing CMS
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Manage menu pricing visibility toggle, timings, dish prices, and add new vegetarian items.
                </p>
              </div>

              {/* Master Pricing Toggle Box */}
              <div className="p-6 rounded-3xl bg-[#1a0f08] border border-[#f59e0b]/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <UtensilsCrossed className="w-5 h-5 text-[#f59e0b]" />
                    <h4 className="font-serif text-lg font-bold text-[#fcfbf7]">
                      Menu Pricing Display Option
                    </h4>
                  </div>
                  <p className="text-xs text-[#d6c2a8]/90 max-w-lg leading-relaxed">
                    User Requirement: Toggle whether pricing appears on all dishes on the live website. Turning this OFF immediately conceals the price tags.
                  </p>
                </div>

                <button
                  id="admin-menu-pricing-toggle-btn"
                  type="button"
                  onClick={() => handleTogglePricing(!restaurantForm.showMenuPrices)}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                    restaurantForm.showMenuPrices
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                      : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                  }`}
                >
                  {restaurantForm.showMenuPrices ? (
                    <>
                      <ToggleRight className="w-5 h-5" />
                      <span>PRICING IS VISIBLE</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-5 h-5" />
                      <span>PRICING IS HIDDEN</span>
                    </>
                  )}
                </button>
              </div>

              {/* Restaurant General Info */}
              <form onSubmit={handleSaveRestaurant} className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#fcfbf7]">
                  Restaurant Overview & Timings
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Restaurant Name
                    </label>
                    <input
                      type="text"
                      value={restaurantForm.name}
                      onChange={e => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Dining Timings
                    </label>
                    <input
                      type="text"
                      value={restaurantForm.timings}
                      onChange={e => setRestaurantForm({ ...restaurantForm, timings: e.target.value })}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    Jain Preparation Notice
                  </label>
                  <input
                    type="text"
                    value={restaurantForm.jainNotice}
                    onChange={e => setRestaurantForm({ ...restaurantForm, jainNotice: e.target.value })}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Restaurant Details</span>
                  </button>
                </div>
              </form>

              {/* Add New Dish Form */}
              <form onSubmit={handleAddDish} className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#fcfbf7] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#f59e0b]" />
                  <span>Add New Dish to Menu</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Menu Category
                    </label>
                    <select
                      value={selectedMenuCatId}
                      onChange={e => setSelectedMenuCatId(e.target.value)}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    >
                      {config.restaurant.menuCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Dish Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shirdi Kaju Paneer"
                      value={newDishName}
                      onChange={e => setNewDishName(e.target.value)}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Price (e.g. ₹220)
                    </label>
                    <input
                      type="text"
                      placeholder="₹220"
                      value={newDishPrice}
                      onChange={e => setNewDishPrice(e.target.value)}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    Dish Description
                  </label>
                  <input
                    type="text"
                    placeholder="Rich cashew and tomato gravy cooked in pure ghee."
                    value={newDishDesc}
                    onChange={e => setNewDishDesc(e.target.value)}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 text-xs text-[#e8ded1] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newDishIsJain}
                      onChange={e => setNewDishIsJain(e.target.checked)}
                      className="rounded text-[#b45309] focus:ring-0"
                    />
                    <span>Available in Jain (No Root Veg)</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-[#e8ded1] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newDishIsSpecial}
                      onChange={e => setNewDishIsSpecial(e.target.checked)}
                      className="rounded text-[#b45309] focus:ring-0"
                    />
                    <span>Chef&apos;s Special Badge</span>
                  </label>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Dish to Menu</span>
                  </button>
                </div>
              </form>

              {/* Current Menu List & Delete Controls */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-[#fcfbf7]">
                  Current Menu Items by Category
                </h4>

                <div className="space-y-4">
                  {config.restaurant.menuCategories.map(cat => (
                    <div key={cat.id} className="p-4 rounded-2xl bg-[#1a0f08] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-[#f59e0b]">
                          {cat.name} ({cat.items.length} items)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {cat.items.map(item => (
                          <div
                            key={item.id}
                            className="p-2.5 rounded-xl bg-[#120a05] border border-white/5 flex items-center justify-between gap-2"
                          >
                            <div className="truncate">
                              <span className="text-xs font-semibold text-white truncate block">
                                {item.name}
                              </span>
                              <span className="text-[11px] text-[#f59e0b] font-mono">
                                {item.price || 'No price'}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteDish(cat.id, item.id)}
                              className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                              title="Delete Dish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. AARTI SCHEDULE CMS */}
          {activeTab === 'aarti' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Sacred Temple Timetable
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Aarti Schedule & Devotee Darshan Tips
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Ensure visiting pilgrims have the most accurate timings for early morning Kakad Aarti through night Shej Aarti.
                </p>
              </div>

              <div className="space-y-4">
                {aartiList.map((aarti, idx) => (
                  <div key={aarti.id} className="p-5 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-base text-[#f59e0b]">
                        {aarti.name} ({aarti.marathiName})
                      </span>
                      <input
                        type="text"
                        value={aarti.time}
                        onChange={e => {
                          const updated = [...aartiList];
                          updated[idx].time = e.target.value;
                          setAartiList(updated);
                        }}
                        className="bg-[#120a05] border border-[#b45309]/40 rounded-lg px-3 py-1.5 text-xs text-[#f59e0b] font-mono font-bold w-36 text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#d6c2a8] mb-1">
                        Devotee Tip / Gate Advice
                      </label>
                      <input
                        type="text"
                        value={aarti.devoteeTip}
                        onChange={e => {
                          const updated = [...aartiList];
                          updated[idx].devoteeTip = e.target.value;
                          setAartiList(updated);
                        }}
                        className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateAartiSchedule(aartiList);
                      showToast('Aarti schedule updated successfully!');
                    }}
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Aarti Schedule</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 7. MEDIA & GALLERY CMS */}
          {activeTab === 'media' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Photos & Media Manager
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Gallery & Property Media CMS
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Add photos, manage high-resolution hotel assets, and organize images by category.
                </p>
              </div>

              {/* Add New Media Form */}
              <form onSubmit={handleAddPhoto} className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-4">
                <h4 className="font-serif text-base font-bold text-[#fcfbf7] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#f59e0b]" />
                  <span>Add New Photograph to Website</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Image URL (Direct HTTPS link)
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newMediaUrl}
                      onChange={e => setNewMediaUrl(e.target.value)}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                      Category
                    </label>
                    <select
                      value={newMediaCategory}
                      onChange={e => setNewMediaCategory(e.target.value as any)}
                      className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                    >
                      <option value="rooms">Rooms & Suites</option>
                      <option value="dining">Sattva Dining</option>
                      <option value="lobby">Lobby & Reception</option>
                      <option value="exterior">Exterior & Gate 2</option>
                      <option value="services">Devotee Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    Caption / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Spacious Triple Family Room with 24-hr Hot Water"
                    value={newMediaTitle}
                    onChange={e => setNewMediaTitle(e.target.value)}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Live Gallery</span>
                  </button>
                </div>
              </form>

              {/* Gallery Grid & Delete Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-[#fcfbf7]">
                    Live Gallery Items ({config.gallery.length})
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {config.gallery.map(item => (
                    <div
                      key={item.id}
                      className="group relative rounded-2xl overflow-hidden bg-[#1a0f08] border border-white/10 aspect-square flex flex-col justify-end p-2.5"
                    >
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      
                      <div className="relative z-10">
                        <span className="text-[10px] uppercase font-bold text-[#f59e0b] block truncate">
                          {item.category}
                        </span>
                        <span className="text-xs text-white font-medium block truncate">
                          {item.title}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteGalleryItem(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 8. REVIEWS & RATINGS */}
          {activeTab === 'reviews' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Reputation & Trust
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Reviews & Star Ratings
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Adjust platform scores and highlight real devotee testimonials from Google and online booking portals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#1a0f08] border border-[#b45309]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#fcfbf7]">Google Reviews</span>
                    <span className="text-xs font-mono text-[#f59e0b] font-bold">4.3 / 5.0 (420+ Reviews)</span>
                  </div>
                  <p className="text-xs text-[#d6c2a8]/70">
                    Highest pilgrim praise for 100m proximity to Gate 2 and early morning hot water.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1a0f08] border border-[#b45309]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#fcfbf7]">Booking.com Score</span>
                    <span className="text-xs font-mono text-[#f59e0b] font-bold">8.2 / 10 (Very Good)</span>
                  </div>
                  <p className="text-xs text-[#d6c2a8]/70">
                    Verified clean rooms, elevator convenience for senior citizens, and safe family atmosphere.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 9. PILGRIM FAQS CMS */}
          {activeTab === 'faqs' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Knowledge & Help Center
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  Pilgrim Questions & Answers
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Clear up queries about 24-hr hot water, Gate 2 darshan pass assistance, checkout timings, and parking.
                </p>
              </div>

              <div className="space-y-4">
                {faqList.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#1a0f08] border border-white/10 space-y-2">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={e => {
                        const updated = [...faqList];
                        updated[idx].question = e.target.value;
                        setFaqList(updated);
                      }}
                      className="w-full bg-[#120a05] border border-[#b45309]/30 rounded-xl px-4 py-2 text-xs font-bold text-[#f59e0b]"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={e => {
                        const updated = [...faqList];
                        updated[idx].answer = e.target.value;
                        setFaqList(updated);
                      }}
                      className="w-full bg-[#120a05] border border-white/10 rounded-xl px-4 py-2 text-xs text-white/90"
                    />
                  </div>
                ))}

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateFaqs(faqList);
                      showToast('FAQs saved successfully!');
                    }}
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save FAQs</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 10. WHATSAPP TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#f59e0b] block mb-1">
                  Automated Pre-Filled Leads
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#fcfbf7]">
                  WhatsApp Inquiry Message Templates
                </h3>
                <p className="text-sm text-[#d6c2a8]/80 mt-1">
                  Customize the pre-filled message text generated whenever a devotee taps an inquiry button on the website.
                </p>
              </div>

              <form onSubmit={handleSaveTemplates} className="p-6 rounded-3xl bg-[#1a0f08] border border-[#b45309]/30 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    General Room Enquiry Template
                  </label>
                  <textarea
                    rows={2}
                    value={templatesForm.general}
                    onChange={e => setTemplatesForm({ ...templatesForm, general: e.target.value })}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    Specific Room Type Template (supports {'{roomName}'})
                  </label>
                  <textarea
                    rows={2}
                    value={templatesForm.room}
                    onChange={e => setTemplatesForm({ ...templatesForm, room: e.target.value })}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    Sattva Dining Reservation Template
                  </label>
                  <textarea
                    rows={2}
                    value={templatesForm.dining}
                    onChange={e => setTemplatesForm({ ...templatesForm, dining: e.target.value })}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d6c2a8] mb-1">
                    Cab / Airport Transit Request Template
                  </label>
                  <textarea
                    rows={2}
                    value={templatesForm.transport}
                    onChange={e => setTemplatesForm({ ...templatesForm, transport: e.target.value })}
                    className="w-full bg-[#120a05] border border-[#b45309]/40 rounded-xl px-4 py-2 text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save WhatsApp Templates</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
