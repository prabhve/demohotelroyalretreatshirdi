import React, { useState } from 'react';
import {
  BedDouble,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Send,
  Trash2,
  Edit3,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  FileText,
  User,
  Filter,
  Copy,
  Check
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { BookingRequest, EnquiryRequest, RequestStatus, EmailAcknowledgement } from '../../types';
import { EmailAcknowledgementModal } from '../EmailAcknowledgementModal';

interface ActionDecisionModal {
  decision: 'accept' | 'reject';
  type: 'booking' | 'enquiry';
  item: BookingRequest | EnquiryRequest;
  channel: 'whatsapp' | 'email';
  customMessage: string;
  emailSubject: string;
}

export const AdminRequestsManager: React.FC = () => {
  const {
    config,
    bookingRequests,
    enquiryRequests,
    updateBookingStatus,
    deleteBookingRequest,
    updateEnquiryStatus,
    deleteEnquiryRequest
  } = useHotel();

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'bookings' | 'enquiries'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | RequestStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item for decision & messaging dialog
  const [messagingTarget, setMessagingTarget] = useState<ActionDecisionModal | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Email acknowledgement viewer
  const [viewingEmailAck, setViewingEmailAck] = useState<{ ack: EmailAcknowledgement; name?: string; refId?: string } | null>(null);

  // Editing notes state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  // Analytics Calculations
  const totalBookings = bookingRequests.length;
  const totalEnquiries = enquiryRequests.length;
  const totalRequests = totalBookings + totalEnquiries;

  const pendingBookings = bookingRequests.filter(b => b.status === 'pending').length;
  const pendingEnquiries = enquiryRequests.filter(e => e.status === 'pending').length;
  const totalPending = pendingBookings + pendingEnquiries;

  const confirmedBookings = bookingRequests.filter(b => b.status === 'confirmed').length;
  const resolvedEnquiries = enquiryRequests.filter(e => e.status === 'resolved' || e.status === 'confirmed').length;
  const totalResolved = confirmedBookings + resolvedEnquiries;

  // Filtered Booking Requests
  const filteredBookings = bookingRequests.filter(req => {
    if (activeSubTab === 'enquiries') return false;
    if (statusFilter !== 'all' && req.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        req.customerName.toLowerCase().includes(q) ||
        req.phone.toLowerCase().includes(q) ||
        req.id.toLowerCase().includes(q) ||
        (req.email && req.email.toLowerCase().includes(q)) ||
        req.roomType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Enquiry Requests
  const filteredEnquiries = enquiryRequests.filter(req => {
    if (activeSubTab === 'bookings') return false;
    if (statusFilter !== 'all' && req.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        req.customerName.toLowerCase().includes(q) ||
        req.phone.toLowerCase().includes(q) ||
        req.id.toLowerCase().includes(q) ||
        (req.email && req.email.toLowerCase().includes(q)) ||
        (req.roomPreference && req.roomPreference.toLowerCase().includes(q)) ||
        req.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Open Decision (Accept / Reject) workflow
  const handleDecision = (
    decision: 'accept' | 'reject',
    type: 'booking' | 'enquiry',
    item: BookingRequest | EnquiryRequest
  ) => {
    // Automatically update status in hotel state
    if (decision === 'accept') {
      if (type === 'booking') {
        updateBookingStatus(item.id, 'confirmed');
      } else {
        updateEnquiryStatus(item.id, 'confirmed');
      }
    } else {
      if (type === 'booking') {
        updateBookingStatus(item.id, 'cancelled');
      } else {
        updateEnquiryStatus(item.id, 'cancelled');
      }
    }

    let initialMsg = '';
    let initialSubject = '';

    if (type === 'booking') {
      const b = item as BookingRequest;
      if (decision === 'accept') {
        initialSubject = `Room Reservation Confirmed (Ref: ${b.id}) - Hotel Royal Retreat, Shirdi`;
        initialMsg = `Jai Sai Ram ${b.customerName} ji,\n\nGreetings from Hotel Royal Retreat, Shirdi (Directly Opposite Temple Gate No. 2).\n\nWe are delighted to CONFIRM your room reservation!\n--------------------------------------------------\n• Booking Reference: ${b.id}\n• Room Category: ${b.roomType}\n• Check-In: ${b.checkInDate} (From 12:00 PM)\n• Check-Out: ${b.checkOutDate} (By 11:00 AM)\n• Guests / Pilgrims: ${b.guestsCount}\n• Requirements: ${b.specialRequirements || 'Standard Pilgrim Stay'}\n--------------------------------------------------\nKey Pilgrim Assurances:\n✓ Location: Just 100 meters walk from Gate No. 2 (2 Mins walk to Samadhi Mandir)\n✓ 24/7 Geyser Hot Water for early morning Kakad Aarti (3:30 AM snan)\n✓ Elevator / Lift to all floors for senior citizen ease\n✓ Sattva 100% Pure Veg Dining & Safe Car Parking\n\nFor arrival directions or railway/airport taxi pickup, reply here or call ${config.contact.primaryPhoneDisplay}.\nWe look forward to welcoming you for your holy darshan in Shirdi!\n\nWarm regards,\nFront Desk Reservations\nHotel Royal Retreat, Shirdi\nPhone: ${config.contact.primaryPhoneDisplay}`;
      } else {
        initialSubject = `Booking Request Update (${b.id}) - Hotel Royal Retreat, Shirdi`;
        initialMsg = `Jai Sai Ram ${b.customerName} ji,\n\nGreetings from Hotel Royal Retreat, Shirdi.\n\nThank you for your room booking request (${b.id}) for ${b.roomType} from ${b.checkInDate} to ${b.checkOutDate}.\n\nWe regret to inform you that we are unable to accept this reservation request as all rooms in this category are fully booked on your requested dates due to high devotee rush.\n\nIf your travel dates are flexible or if you would like to inquire about alternative room options, please reply to this message or call our front desk directly at ${config.contact.primaryPhoneDisplay}.\n\nWe pray for Sai Baba's divine blessings upon you and your family.\n\nWarm regards,\nReservations Manager\nHotel Royal Retreat, Shirdi`;
      }
    } else {
      const e = item as EnquiryRequest;
      if (decision === 'accept') {
        initialSubject = `Inquiry Response (${e.id}) - Hotel Royal Retreat, Shirdi`;
        initialMsg = `Jai Sai Ram ${e.customerName} ji,\n\nThank you for reaching out to Hotel Royal Retreat, Shirdi (Opposite Temple Gate No. 2).\n\nIn response to your inquiry regarding "${e.subject || e.roomPreference || 'Pilgrimage Stay'}":\nWe are pleased to assist you with your upcoming visit to Shri Sai Baba Samadhi Mandir.\n\nOur hotel is located just 100 meters opposite Gate 2 with 24-hour hot water for early Aarti, passenger elevator, pure satvik vegetarian dining, and safe vehicle parking.\n\nPlease let us know if you would like us to reserve your room or assist with temple Aarti timings.\n\nWarm regards,\nGuest Relations Desk\nHotel Royal Retreat, Shirdi\nContact: ${config.contact.primaryPhoneDisplay}`;
      } else {
        initialSubject = `Inquiry Update (${e.id}) - Hotel Royal Retreat, Shirdi`;
        initialMsg = `Jai Sai Ram ${e.customerName} ji,\n\nGreetings from Hotel Royal Retreat, Shirdi.\n\nThank you for your inquiry (${e.id}). We are currently unable to accommodate your requested requirements for the selected dates due to high pilgrim occupancy.\n\nPlease feel free to call our reception at ${config.contact.primaryPhoneDisplay} if your schedule changes or if you need any assistance in Shirdi.\n\nWarm regards,\nHotel Royal Retreat, Shirdi`;
      }
    }

    setMessagingTarget({
      decision,
      type,
      item,
      channel: 'whatsapp',
      customMessage: initialMsg,
      emailSubject: initialSubject
    });
  };

  const handleSendDispatch = () => {
    if (!messagingTarget) return;

    if (messagingTarget.channel === 'whatsapp') {
      const cleanPhone = messagingTarget.item.phone.replace(/\D/g, '');
      const encodedMsg = encodeURIComponent(messagingTarget.customMessage);
      const url = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const email = messagingTarget.item.email || '';
      const subject = encodeURIComponent(messagingTarget.emailSubject);
      const body = encodeURIComponent(messagingTarget.customMessage);
      const url = `mailto:${email}?subject=${subject}&body=${body}`;
      window.open(url, '_blank');
    }
  };

  const handleCopyMessage = () => {
    if (!messagingTarget) return;
    navigator.clipboard.writeText(messagingTarget.customMessage);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3" />
            Pending Review
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3" />
            Accepted / Confirmed
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
            <CheckCircle2 className="w-3 h-3" />
            Answered / Solved
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <XCircle className="w-3 h-3" />
            Declined / Rejected
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#b45309]/30">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-bold block mb-1">
            Real-Time Lead & Desk Management
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#fcfbf7] flex items-center gap-2">
            <span>Customer Booking & Enquiry Dashboard</span>
          </h2>
          <p className="text-xs text-[#d6c2a8]/80 mt-0.5">
            Review online room reservation requests, accept or reject with 1-click, and dispatch instant confirmations or regrets via WhatsApp & Email.
          </p>
        </div>
      </div>

      {/* Analytics KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="p-4 rounded-2xl bg-[#1f140c] border border-[#b45309]/30 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#d6c2a8]/70 font-semibold block">
              Total Requests
            </span>
            <span className="text-2xl font-serif font-bold text-white mt-1 block">
              {totalRequests}
            </span>
            <span className="text-[10px] text-[#f59e0b] mt-0.5 block">
              {totalBookings} Bookings • {totalEnquiries} Inquiries
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#b45309]/20 text-[#f59e0b] border border-[#b45309]/30">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Action Required */}
        <div className="p-4 rounded-2xl bg-[#2a1708] border border-amber-500/40 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-amber-300/80 font-semibold block">
              Pending Action
            </span>
            <span className="text-2xl font-serif font-bold text-amber-300 mt-1 block">
              {totalPending}
            </span>
            <span className="text-[10px] text-amber-400 mt-0.5 block">
              Awaiting Accept / Reject decision
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Confirmed / Solved */}
        <div className="p-4 rounded-2xl bg-[#112318] border border-emerald-500/30 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-300/80 font-semibold block">
              Confirmed / Accepted
            </span>
            <span className="text-2xl font-serif font-bold text-emerald-300 mt-1 block">
              {totalResolved}
            </span>
            <span className="text-[10px] text-emerald-400 mt-0.5 block">
              {confirmedBookings} Booked • {resolvedEnquiries} Answered
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Response Channel Status */}
        <div className="p-4 rounded-2xl bg-[#1f140c] border border-[#b45309]/30 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#d6c2a8]/70 font-semibold block">
              Fast Dispatch
            </span>
            <span className="text-xs font-bold text-white mt-1.5 block">
              WhatsApp & Email Notice
            </span>
            <span className="text-[10px] text-[#f59e0b] mt-0.5 block">
              1-Click Accept or Reject templates
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#b45309]/20 text-[#f59e0b] border border-[#b45309]/30">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-[#1a0f08] border border-[#b45309]/25 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Sub-tab pills */}
        <div className="flex items-center gap-1.5 bg-[#120a05] p-1 rounded-xl border border-[#b45309]/20 w-full md:w-auto">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeSubTab === 'all'
                ? 'bg-[#b45309] text-white'
                : 'text-[#d6c2a8] hover:text-white hover:bg-white/5'
            }`}
          >
            All Requests ({totalRequests})
          </button>
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeSubTab === 'bookings'
                ? 'bg-[#b45309] text-white'
                : 'text-[#d6c2a8] hover:text-white hover:bg-white/5'
            }`}
          >
            Room Bookings ({totalBookings})
          </button>
          <button
            onClick={() => setActiveSubTab('enquiries')}
            className={`flex-1 md:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeSubTab === 'enquiries'
                ? 'bg-[#b45309] text-white'
                : 'text-[#d6c2a8] hover:text-white hover:bg-white/5'
            }`}
          >
            General Inquiries ({totalEnquiries})
          </button>
        </div>

        {/* Status Filter & Search */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
              className="bg-[#120a05] text-xs font-medium text-[#fcfbf7] border border-[#b45309]/30 rounded-xl px-3 py-2 focus:outline-none focus:border-[#f59e0b] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="resolved">Solved</option>
              <option value="cancelled">Declined / Cancelled</option>
            </select>
          </div>

          <div className="relative flex-1 md:w-60">
            <Search className="w-3.5 h-3.5 text-[#d6c2a8]/60 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search name, phone, ref..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#120a05] text-xs text-white border border-[#b45309]/30 rounded-xl focus:outline-none focus:border-[#f59e0b]"
            />
          </div>
        </div>
      </div>

      {/* Requests List Section */}
      <div className="space-y-4">
        {/* Booking Requests List */}
        {(activeSubTab === 'all' || activeSubTab === 'bookings') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#f59e0b] flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                <span>Room Booking Requests ({filteredBookings.length})</span>
              </h3>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center bg-[#170e07] rounded-2xl border border-white/5 text-[#d6c2a8]/60 text-xs">
                No booking requests found matching the current filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map(req => {
                  const cleanPhone = req.phone.replace(/\D/g, '');
                  return (
                    <div
                      key={req.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#170e07] border border-[#b45309]/30 hover:border-[#b45309]/60 transition-all shadow-md space-y-3.5"
                    >
                      {/* Header Row: Name, Ref, Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span className="p-2 rounded-xl bg-[#b45309]/20 text-[#f59e0b] border border-[#b45309]/30">
                            <User className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white text-sm sm:text-base">{req.customerName}</h4>
                              <span className="font-mono text-xs text-[#f59e0b] bg-[#b45309]/10 px-2 py-0.5 rounded border border-[#b45309]/20">
                                {req.id}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#d6c2a8]/60">
                              Requested on: {new Date(req.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Status Selector */}
                        <div className="flex items-center gap-2">
                          {getStatusBadge(req.status)}
                          <select
                            value={req.status}
                            onChange={e => updateBookingStatus(req.id, e.target.value as RequestStatus)}
                            className="bg-[#100905] text-[11px] text-white border border-[#b45309]/40 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#f59e0b] cursor-pointer"
                          >
                            <option value="pending">Mark as Pending</option>
                            <option value="confirmed">Mark as Confirmed</option>
                            <option value="resolved">Mark as Solved</option>
                            <option value="cancelled">Mark as Declined</option>
                          </select>
                        </div>
                      </div>

                      {/* Room & Stay Specifics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#120a05] border border-white/5 text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#d6c2a8]/60 block font-semibold">
                            Room Type
                          </span>
                          <span className="font-bold text-[#fcfbf7] block mt-0.5">{req.roomType}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#d6c2a8]/60 block font-semibold">
                            Dates of Stay
                          </span>
                          <span className="font-medium text-white block mt-0.5">
                            {req.checkInDate} to {req.checkOutDate}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#d6c2a8]/60 block font-semibold">
                            Guests / Pilgrims
                          </span>
                          <span className="font-medium text-white block mt-0.5">{req.guestsCount}</span>
                        </div>
                      </div>

                      {/* Devotee Requirements */}
                      {req.specialRequirements && (
                        <div className="p-3 rounded-xl bg-[#23150d] border border-[#b45309]/20 text-xs">
                          <span className="font-bold text-[#f59e0b] block mb-1">
                            Pilgrim Requirements & Special Notes:
                          </span>
                          <p className="text-[#fcfbf7]/90 leading-relaxed">{req.specialRequirements}</p>
                        </div>
                      )}

                      {/* Automated Acknowledgement Badge */}
                      {req.acknowledgement && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="p-1 rounded-md bg-emerald-600/30 text-emerald-400">
                              <Mail className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-emerald-200">
                              Instant acknowledgement dispatched to <strong className="text-white font-mono">{req.acknowledgement.recipientEmail}</strong>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setViewingEmailAck({ ack: req.acknowledgement!, name: req.customerName, refId: req.id })}
                            className="text-emerald-400 hover:text-emerald-300 underline font-bold text-[11px] cursor-pointer whitespace-nowrap"
                          >
                            View Sent Confirmation Email
                          </button>
                        </div>
                      )}

                      {/* Internal Desk Notes */}
                      <div className="text-xs">
                        {editingNotesId === req.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={notesDraft}
                              onChange={e => setNotesDraft(e.target.value)}
                              placeholder="Add desk note (e.g. Room 202 allocated, payment on arrival)..."
                              className="flex-1 px-3 py-1.5 bg-[#120a05] border border-[#b45309]/40 rounded-lg text-white text-xs focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                updateBookingStatus(req.id, req.status, notesDraft);
                                setEditingNotesId(null);
                              }}
                              className="px-3 py-1 bg-[#b45309] hover:bg-[#d97706] text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Save Note
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-[#d6c2a8]/80 bg-white/5 px-3 py-1.5 rounded-lg">
                            <span>
                              <strong>Desk Remarks:</strong> {req.notes || 'No remarks added yet.'}
                            </span>
                            <button
                              onClick={() => {
                                setEditingNotesId(req.id);
                                setNotesDraft(req.notes || '');
                              }}
                              className="text-[#f59e0b] hover:underline text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Note</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* PRIMARY ACTION BAR: ACCEPT OR REJECT WORKFLOW */}
                      <div className="p-3 rounded-xl bg-[#23150d]/80 border border-[#b45309]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider text-[#f59e0b] font-bold">
                            Manager Decision:
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* ACCEPT BUTTON */}
                          <button
                            type="button"
                            onClick={() => handleDecision('accept', 'booking', req)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accept & Send Confirmation</span>
                          </button>

                          {/* REJECT BUTTON */}
                          <button
                            type="button"
                            onClick={() => handleDecision('reject', 'booking', req)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Decline / Reject</span>
                          </button>
                        </div>
                      </div>

                      {/* Secondary Direct Contact & Management Links */}
                      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#d6c2a8]">
                          {/* Call Phone Directly */}
                          <a
                            href={`tel:${req.phone}`}
                            className="inline-flex items-center gap-1 hover:text-[#f59e0b] transition-colors"
                            title="Call customer directly"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#f59e0b]" />
                            <span className="font-mono font-semibold">{req.phone}</span>
                          </a>

                          {/* Direct WhatsApp chat */}
                          <a
                            href={`https://wa.me/${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Direct</span>
                          </a>

                          {req.email && (
                            <a
                              href={`mailto:${req.email}`}
                              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{req.email}</span>
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete request ${req.id} for ${req.customerName}?`)) {
                                deleteBookingRequest(req.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-200 hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Delete Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* General Enquiry Requests List */}
        {(activeSubTab === 'all' || activeSubTab === 'enquiries') && (
          <div className="space-y-3 pt-6 border-t border-[#b45309]/30">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#f59e0b] flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>General Customer Inquiries ({filteredEnquiries.length})</span>
              </h3>
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="p-8 text-center bg-[#170e07] rounded-2xl border border-white/5 text-[#d6c2a8]/60 text-xs">
                No inquiries found matching the current filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredEnquiries.map(enq => {
                  const cleanPhone = enq.phone.replace(/\D/g, '');
                  return (
                    <div
                      key={enq.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#170e07] border border-[#b45309]/30 hover:border-[#b45309]/60 transition-all shadow-md space-y-3.5"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <span className="p-2 rounded-xl bg-sky-950 text-sky-400 border border-sky-800/40">
                            <MessageSquare className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-white text-sm sm:text-base">{enq.customerName}</h4>
                              <span className="font-mono text-xs text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800/40">
                                {enq.id}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#d6c2a8]/60">
                              Logged on: {new Date(enq.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          {getStatusBadge(enq.status)}
                          <select
                            value={enq.status}
                            onChange={e => updateEnquiryStatus(enq.id, e.target.value as RequestStatus)}
                            className="bg-[#100905] text-[11px] text-white border border-[#b45309]/40 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#f59e0b] cursor-pointer"
                          >
                            <option value="pending">Mark as Pending</option>
                            <option value="confirmed">Mark as Solved / Answered</option>
                            <option value="resolved">Mark as Resolved</option>
                            <option value="cancelled">Mark as Declined / Closed</option>
                          </select>
                        </div>
                      </div>

                      {/* Inquiry Content */}
                      <div className="p-3.5 rounded-xl bg-[#120a05] border border-white/5 text-xs space-y-2">
                        {enq.roomPreference && (
                          <div className="flex items-center gap-2 text-[#f59e0b]">
                            <BedDouble className="w-3.5 h-3.5" />
                            <span>Room Preference: <strong>{enq.roomPreference}</strong></span>
                          </div>
                        )}
                        <p className="text-[#fcfbf7]/90 leading-relaxed font-sans">{enq.message}</p>
                        {enq.dates && (
                          <span className="block text-[11px] text-[#d6c2a8]/70 pt-1 border-t border-white/5">
                            Planned Travel Dates: <strong>{enq.dates}</strong>
                          </span>
                        )}

                        {/* Automated Acknowledgement Badge */}
                        {enq.acknowledgement && (
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs mt-2">
                            <div className="flex items-center gap-2">
                              <span className="p-1 rounded-md bg-emerald-600/30 text-emerald-400">
                                <Mail className="w-3 h-3" />
                              </span>
                              <span className="text-emerald-200">
                                Polite confirmation sent to <strong className="text-white font-mono">{enq.acknowledgement.recipientEmail}</strong>
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setViewingEmailAck({ ack: enq.acknowledgement!, name: enq.customerName, refId: enq.id })}
                              className="text-emerald-400 hover:text-emerald-300 underline font-bold text-[11px] cursor-pointer whitespace-nowrap"
                            >
                              View Sent Email
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Admin remarks */}
                      <div className="text-xs">
                        {editingNotesId === enq.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={notesDraft}
                              onChange={e => setNotesDraft(e.target.value)}
                              placeholder="Add solution or resolution note..."
                              className="flex-1 px-3 py-1.5 bg-[#120a05] border border-[#b45309]/40 rounded-lg text-white text-xs focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                updateEnquiryStatus(enq.id, enq.status, notesDraft);
                                setEditingNotesId(null);
                              }}
                              className="px-3 py-1 bg-[#b45309] hover:bg-[#d97706] text-white rounded-lg text-xs font-bold cursor-pointer"
                            >
                              Save Note
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-3 py-1 bg-white/10 text-white rounded-lg text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-[#d6c2a8]/80 bg-white/5 px-3 py-1.5 rounded-lg">
                            <span>
                              <strong>Resolution Note:</strong> {enq.adminNotes || 'No notes yet.'}
                            </span>
                            <button
                              onClick={() => {
                                setEditingNotesId(enq.id);
                                setNotesDraft(enq.adminNotes || '');
                              }}
                              className="text-[#f59e0b] hover:underline text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Note</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* PRIMARY DECISION BAR FOR ENQUIRY */}
                      <div className="p-3 rounded-xl bg-[#23150d]/80 border border-[#b45309]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider text-[#f59e0b] font-bold">
                            Manager Decision:
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* ACCEPT & ANSWER */}
                          <button
                            type="button"
                            onClick={() => handleDecision('accept', 'enquiry', enq)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accept & Reply</span>
                          </button>

                          {/* DECLINE / CLOSE */}
                          <button
                            type="button"
                            onClick={() => handleDecision('reject', 'enquiry', enq)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Decline / Close</span>
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#d6c2a8]">
                          <a
                            href={`tel:${enq.phone}`}
                            className="inline-flex items-center gap-1 hover:text-[#f59e0b] transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#f59e0b]" />
                            <span className="font-mono">{enq.phone}</span>
                          </a>

                          <a
                            href={`https://wa.me/${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Direct</span>
                          </a>

                          {enq.email && (
                            <a
                              href={`mailto:${enq.email}`}
                              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{enq.email}</span>
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete enquiry ${enq.id}?`)) {
                                deleteEnquiryRequest(enq.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-200 hover:bg-red-950/40 transition-colors cursor-pointer"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DECISION & MESSAGING DISPATCH MODAL */}
      {messagingTarget && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#170e07] rounded-3xl border border-[#b45309]/60 shadow-2xl max-w-2xl w-full p-6 space-y-4 text-white">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-start gap-3">
                <span
                  className={`p-3 rounded-2xl text-white mt-0.5 shadow-md ${
                    messagingTarget.decision === 'accept'
                      ? 'bg-emerald-600 border border-emerald-400/40'
                      : 'bg-rose-600 border border-rose-400/40'
                  }`}
                >
                  {messagingTarget.decision === 'accept' ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        messagingTarget.decision === 'accept'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      Status Updated to:{' '}
                      {messagingTarget.decision === 'accept' ? 'Confirmed / Accepted' : 'Declined / Cancelled'}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold mt-1">
                    {messagingTarget.decision === 'accept'
                      ? `Send Booking Confirmation to ${messagingTarget.item.customerName}`
                      : `Send Regret / Rejection Notice to ${messagingTarget.item.customerName}`}
                  </h3>
                  <p className="text-xs text-[#d6c2a8]/80 mt-0.5">
                    Reference ID: <strong className="font-mono text-[#f59e0b]">{messagingTarget.item.id}</strong> • Phone: {messagingTarget.item.phone} {messagingTarget.item.email ? `• Email: ${messagingTarget.item.email}` : '• (No email provided)'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMessagingTarget(null)}
                className="p-2 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Communication Channel Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() => setMessagingTarget({ ...messagingTarget, channel: 'whatsapp' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  messagingTarget.channel === 'whatsapp'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white/5 text-[#d6c2a8] hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setMessagingTarget({ ...messagingTarget, channel: 'email' })}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  messagingTarget.channel === 'email'
                    ? 'bg-sky-700 text-white shadow-md'
                    : 'bg-white/5 text-[#d6c2a8] hover:bg-white/10'
                }`}
              >
                <Mail className="w-4 h-4 text-sky-300" />
                <span>Send via Email {messagingTarget.item.email ? '' : '(No Email)'}</span>
              </button>
            </div>

            {/* Email Subject if in Email mode */}
            {messagingTarget.channel === 'email' && (
              <div>
                {!messagingTarget.item.email && (
                  <div className="mb-2 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Customer did not provide an email address in the booking form. Please dispatch via WhatsApp or phone.</span>
                  </div>
                )}
                <label className="block text-xs font-bold text-[#f59e0b] mb-1">
                  Email Subject Line
                </label>
                <input
                  type="text"
                  value={messagingTarget.emailSubject}
                  onChange={e =>
                    setMessagingTarget({
                      ...messagingTarget,
                      emailSubject: e.target.value
                    })
                  }
                  className="w-full bg-[#100905] border border-[#b45309]/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>
            )}

            {/* Editable Message Content */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#f59e0b]">
                  {messagingTarget.decision === 'accept' ? 'Confirmation Message (Customizable)' : 'Regret Notice (Customizable)'}
                </label>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="text-[11px] font-semibold text-[#d6c2a8] hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                rows={9}
                value={messagingTarget.customMessage}
                onChange={e =>
                  setMessagingTarget({
                    ...messagingTarget,
                    customMessage: e.target.value
                  })
                }
                className="w-full bg-[#100905] border border-[#b45309]/40 rounded-xl p-3 text-xs text-white font-mono leading-relaxed focus:outline-none focus:border-[#f59e0b]"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
              <div className="text-[11px] text-[#d6c2a8]/70 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>The request status has been saved in hotel records.</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setMessagingTarget(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-[#d6c2a8] hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleSendDispatch}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer ${
                    messagingTarget.channel === 'whatsapp'
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-sky-700 hover:bg-sky-600'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    Send {messagingTarget.decision === 'accept' ? 'Confirmation' : 'Rejection'} via{' '}
                    {messagingTarget.channel === 'whatsapp' ? 'WhatsApp' : 'Email'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Email Acknowledgement Preview Modal */}
      {viewingEmailAck && (
        <EmailAcknowledgementModal
          acknowledgement={viewingEmailAck.ack}
          customerName={viewingEmailAck.name}
          refId={viewingEmailAck.refId}
          onClose={() => setViewingEmailAck(null)}
        />
      )}
    </div>
  );
};
