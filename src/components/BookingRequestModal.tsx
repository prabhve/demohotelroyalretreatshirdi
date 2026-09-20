import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, BedDouble, Phone, Mail, User, ShieldCheck, CheckCircle2, MessageSquare, Sparkles, Clock, MapPin, AlertCircle, Eye, ExternalLink, Send } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { BookingRequest, EmailAcknowledgement } from '../types';
import { generateBookingAcknowledgement, dispatchAcknowledgementEmail } from '../services/emailService';
import { EmailAcknowledgementModal } from './EmailAcknowledgementModal';

export const BookingRequestModal: React.FC = () => {
  const { config, isBookingModalOpen, closeBookingModal, bookingModalPref, addBookingRequest, updateBookingAcknowledgement, openWhatsApp } = useHotel();

  const bookingFormConfig = config.bookingForm;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(formatDate(tomorrow));
  const [checkOutDate, setCheckOutDate] = useState(formatDate(dayAfter));
  const [selectedRoomId, setSelectedRoomId] = useState<string>(config.rooms[0]?.id || 'superior-double');
  const [guestsCount, setGuestsCount] = useState(bookingFormConfig?.defaultGuestSelection || '2 Adults');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [specialRequirements, setSpecialRequirements] = useState('');
  
  // Devotional requirement checklist selection (synced with config.bookingForm options)
  const [selectedChecklistIds, setSelectedChecklistIds] = useState<string[]>(() => {
    const opts = bookingFormConfig?.devotionalOptions || [];
    return opts.filter(o => o.enabled && o.defaultChecked).map(o => o.id);
  });

  useEffect(() => {
    if (bookingFormConfig?.devotionalOptions) {
      setSelectedChecklistIds(
        bookingFormConfig.devotionalOptions.filter(o => o.enabled && o.defaultChecked).map(o => o.id)
      );
    }
  }, [bookingFormConfig?.devotionalOptions]);

  const toggleChecklist = (id: string) => {
    setSelectedChecklistIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const [submittedRequest, setSubmittedRequest] = useState<BookingRequest | null>(null);
  const [viewingEmailAck, setViewingEmailAck] = useState<EmailAcknowledgement | null>(null);
  const [postSubmitEmail, setPostSubmitEmail] = useState('');
  const [isSendingPostEmail, setIsSendingPostEmail] = useState(false);
  const [postEmailSentMessage, setPostEmailSentMessage] = useState<string | null>(null);

  useEffect(() => {
    if (bookingModalPref) {
      if (bookingModalPref.roomId) setSelectedRoomId(bookingModalPref.roomId);
      if (bookingModalPref.checkIn) setCheckInDate(bookingModalPref.checkIn);
      if (bookingModalPref.checkOut) setCheckOutDate(bookingModalPref.checkOut);
      if (bookingModalPref.guests) setGuestsCount(bookingModalPref.guests);
    }
  }, [bookingModalPref]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBookingModalOpen) {
        closeBookingModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookingModalOpen, closeBookingModal]);

  if (!isBookingModalOpen) return null;

  const selectedRoom = config.rooms.find(r => r.id === selectedRoomId) || config.rooms[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const enabledOptions = (bookingFormConfig?.devotionalOptions || []).filter(o => o.enabled);
    const tagNotes = enabledOptions
      .filter(opt => selectedChecklistIds.includes(opt.id))
      .map(opt => opt.label);

    const fullRequirements = [
      specialRequirements.trim(),
      tagNotes.length > 0 ? `Preferences: ${tagNotes.join(', ')}` : ''
    ].filter(Boolean).join(' | ');

    const newReq = addBookingRequest({
      customerName,
      phone,
      email: email.trim() || undefined,
      checkInDate,
      checkOutDate,
      roomType: selectedRoom ? selectedRoom.name : 'Best Available Room',
      roomId: selectedRoomId,
      guestsCount,
      adults,
      children,
      specialRequirements: fullRequirements || 'Standard Devotee Stay opposite Gate 2',
      source: 'website_modal'
    });

    // If an email was provided and email acknowledgements are permitted, dispatch
    if (email.trim() && (bookingFormConfig?.allowInstantEmailReceipt !== false)) {
      const ack = generateBookingAcknowledgement(newReq, config);
      newReq.acknowledgement = ack;
      updateBookingAcknowledgement(newReq.id, ack);
      // Dispatch in background
      dispatchAcknowledgementEmail(ack, 'booking', newReq.id, customerName);
    }

    setSubmittedRequest(newReq);
  };

  const handleSendPostSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittedRequest || !postSubmitEmail.trim()) return;

    setIsSendingPostEmail(true);
    const updatedReq: BookingRequest = {
      ...submittedRequest,
      email: postSubmitEmail.trim()
    };

    const ack = generateBookingAcknowledgement(updatedReq, config);
    updatedReq.acknowledgement = ack;
    updateBookingAcknowledgement(updatedReq.id, ack);
    setSubmittedRequest(updatedReq);

    await dispatchAcknowledgementEmail(ack, 'booking', updatedReq.id, updatedReq.customerName);
    setIsSendingPostEmail(false);
    setPostEmailSentMessage(`Polite confirmation dispatched to ${postSubmitEmail.trim()}`);
  };

  const handleForwardWhatsApp = () => {
    if (!submittedRequest) return;
    openWhatsApp('room', {
      ROOM_NAME: `${submittedRequest.roomType} (Ref: ${submittedRequest.id})`,
      CHECK_IN: submittedRequest.checkInDate,
      CHECK_OUT: submittedRequest.checkOutDate,
      GUESTS: `${submittedRequest.guestsCount} | Guest: ${submittedRequest.customerName} (${submittedRequest.phone}) | Requirements: ${submittedRequest.specialRequirements || 'None'}`
    });
  };

  const handleResetAndClose = () => {
    setSubmittedRequest(null);
    setViewingEmailAck(null);
    setPostSubmitEmail('');
    setPostEmailSentMessage(null);
    closeBookingModal();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
        <div className="relative w-full max-w-2xl bg-[#fcfbf7] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#b45309]/30 overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[92vh]">
          {/* Modal Top Header */}
          <div className="bg-[#23150d] text-[#fcfbf7] px-4 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between border-b border-[#b45309]/30 gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <span className="p-2 sm:p-2.5 rounded-xl bg-[#b45309]/30 border border-[#f59e0b]/40 text-[#f59e0b] shrink-0">
                <BedDouble className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#f59e0b] font-bold block truncate">
                  {bookingFormConfig?.badgeText || 'Direct Front Desk Reservation'}
                </span>
                <h2 className="font-serif text-base sm:text-xl font-bold truncate">
                  {bookingFormConfig?.modalTitle || 'Request Room Booking • Hotel Royal Retreat'}
                </h2>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 sm:p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 sm:space-y-6">
            {submittedRequest ? (
              /* Success Receipt View */
              <div className="py-2 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Booking Request Registered Successfully
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#23150d] mt-2">
                    Jai Sai Ram, {submittedRequest.customerName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23150d]/80 mt-1 max-w-md mx-auto">
                    Your booking request has been securely registered with Hotel Royal Retreat front desk manager.
                  </p>
                </div>

                {/* Automated Email Acknowledgement Notification Card */}
                {submittedRequest.acknowledgement ? (
                  <div className="bg-emerald-50/90 border border-emerald-300/80 rounded-2xl p-4 text-left max-w-lg mx-auto shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5 shadow-sm">
                          <Mail className="w-4 h-4" />
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                              Automated Confirmation Dispatched
                            </span>
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Delivered
                            </span>
                          </div>
                          <p className="text-xs text-emerald-800 mt-0.5">
                            A polite booking acknowledgement with reference <strong>{submittedRequest.id}</strong> has been sent to:
                          </p>
                          <p className="text-xs font-mono font-bold text-emerald-900 mt-1">
                            {submittedRequest.acknowledgement.recipientEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] text-emerald-700">
                        Includes check-in guidelines & Aarti assistance
                      </span>
                      <button
                        type="button"
                        onClick={() => setViewingEmailAck(submittedRequest.acknowledgement || null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Sent Email</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Option to get email confirmation if guest did not enter email initially */
                  <div className="bg-[#fcf8f2] border border-[#d6c2a8] rounded-2xl p-4 text-left max-w-lg mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-[#b45309]" />
                      <span className="text-xs font-bold text-[#23150d]">
                        Receive Instant Email Acknowledgement Receipt
                      </span>
                    </div>
                    {postEmailSentMessage ? (
                      <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                        <span>✓ {postEmailSentMessage}</span>
                        {submittedRequest.acknowledgement && (
                          <button
                            type="button"
                            onClick={() => setViewingEmailAck(submittedRequest.acknowledgement || null)}
                            className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer ml-2"
                          >
                            View Email
                          </button>
                        )}
                      </div>
                    ) : (
                      <form onSubmit={handleSendPostSubmitEmail} className="flex gap-2">
                        <input
                          type="email"
                          required
                          value={postSubmitEmail}
                          onChange={e => setPostSubmitEmail(e.target.value)}
                          placeholder="Enter your email address..."
                          className="flex-1 px-3 py-2 bg-white border border-[#d6c2a8] rounded-xl text-xs text-[#23150d] focus:outline-none focus:border-[#b45309]"
                        />
                        <button
                          type="submit"
                          disabled={isSendingPostEmail}
                          className="px-4 py-2 bg-[#b45309] hover:bg-[#d97706] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                        >
                          {isSendingPostEmail ? 'Sending...' : 'Send Voucher'}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* Booking Summary Box */}
                <div className="bg-[#f6efe3] rounded-2xl p-5 border border-[#d6c2a8] text-left max-w-lg mx-auto space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center pb-2.5 border-b border-[#b45309]/20">
                    <span className="text-[#23150d]/70">Reference ID:</span>
                    <span className="font-mono font-bold text-[#b45309] text-base">{submittedRequest.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#23150d]/70">Selected Room:</span>
                    <span className="font-bold text-[#23150d]">{submittedRequest.roomType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#23150d]/70">Dates:</span>
                    <span className="font-semibold text-[#23150d]">{submittedRequest.checkInDate} to {submittedRequest.checkOutDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#23150d]/70">Occupancy:</span>
                    <span className="font-semibold text-[#23150d]">{submittedRequest.guestsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#23150d]/70">Status:</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Pending Desk Confirmation
                    </span>
                  </div>
                  {submittedRequest.specialRequirements && (
                    <div className="pt-2 border-t border-[#b45309]/15 text-xs text-[#23150d]/80">
                      <strong>Special Requirements:</strong> {submittedRequest.specialRequirements}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 max-w-md mx-auto pt-2">
                  <button
                    type="button"
                    onClick={handleForwardWhatsApp}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Details on WhatsApp to Front Desk</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full py-2.5 text-xs font-bold text-[#23150d]/70 hover:text-[#23150d] transition-colors cursor-pointer"
                  >
                    Close & Return to Website
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form View */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Location Badge */}
                <div className="p-3 rounded-2xl bg-[#f6efe3] border border-[#b45309]/20 flex items-center justify-between text-xs text-[#23150d]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#b45309] shrink-0" />
                    <span>{bookingFormConfig?.locationHighlight || 'Directly Opposite Gate No. 2 (100 Meters to Samadhi Mandir)'}</span>
                  </div>
                  <span className="font-bold text-[#b45309] hidden sm:inline shrink-0">
                    {bookingFormConfig?.subHighlight || 'Zero Commission'}
                  </span>
                </div>

                {/* Guest Personal Info */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78350f]">1. Pilgrim Contact Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#23150d] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#78350f] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          placeholder="e.g. Ramesh Deshmukh"
                          className="w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#23150d] mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#78350f] absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#23150d]">
                        Email Address
                      </label>
                      {bookingFormConfig?.allowInstantEmailReceipt !== false && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                          Instant Automated Acknowledgement
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#78350f] absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. ramesh@gmail.com (for instant automated confirmation)"
                        className="w-full pl-10 pr-3.5 py-2.5 sm:py-2.5 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      />
                    </div>
                    <p className="text-[11px] text-[#78350f] mt-1">
                      ✉️ A polite reservation acknowledgement with your reference ID and stay summary will be dispatched immediately to this email.
                    </p>
                  </div>
                </div>

                {/* Stay & Room Details */}
                <div className="space-y-3 pt-3 border-t border-[#b45309]/15">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78350f]">2. Stay Dates & Room Selection</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#23150d] mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#b45309]" />
                        Check-In Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={checkInDate}
                        onChange={e => setCheckInDate(e.target.value)}
                        min={formatDate(new Date())}
                        className="w-full px-3.5 py-2.5 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#23150d] mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#b45309]" />
                        Check-Out Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOutDate}
                        onChange={e => setCheckOutDate(e.target.value)}
                        min={checkInDate || formatDate(new Date())}
                        className="w-full px-3.5 py-2.5 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#23150d] mb-1 flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#b45309]" />
                        Select Room Type *
                      </label>
                      <select
                        value={selectedRoomId}
                        onChange={e => setSelectedRoomId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309] font-medium"
                      >
                        {config.rooms.map(room => (
                          <option key={room.id} value={room.id}>
                            {room.name} ({room.bedConfig})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#23150d] mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#b45309]" />
                        Guests Count *
                      </label>
                      <select
                        value={guestsCount}
                        onChange={e => setGuestsCount(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      >
                        {(bookingFormConfig?.guestOptions && bookingFormConfig.guestOptions.length > 0
                          ? bookingFormConfig.guestOptions
                          : [
                              '1 Adult',
                              '2 Adults',
                              '3 Adults',
                              '4 Adults (Family)',
                              '2 Adults, 1 Child',
                              '2 Adults, 2 Children',
                              'Large Pilgrim Group (5+)'
                            ]
                        ).map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Devotional Comfort Quick Selection */}
                {bookingFormConfig?.enableDevotionalChecklist !== false && (
                  <div className="space-y-2 pt-3 border-t border-[#b45309]/15">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#78350f] block">
                      {bookingFormConfig?.devotionalSectionTitle || '3. Pilgrim Care & Yatra Preferences'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(bookingFormConfig?.devotionalOptions || [])
                        .filter(opt => opt.enabled)
                        .map(opt => {
                          const isChecked = selectedChecklistIds.includes(opt.id);
                          return (
                            <label
                              key={opt.id}
                              className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors text-xs text-[#23150d] ${
                                isChecked
                                  ? 'bg-amber-50/80 border-[#b45309] shadow-xs'
                                  : 'bg-[#f6efe3] border-[#d6c2a8] hover:border-[#b45309]/60'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleChecklist(opt.id)}
                                className="mt-0.5 rounded text-[#b45309] focus:ring-[#b45309]"
                              />
                              <div className="flex-1 min-w-0">
                                <span className="font-semibold block">{opt.label}</span>
                                {opt.sublabel && (
                                  <span className="text-[10px] text-[#23150d]/65 block mt-0.5 leading-tight">
                                    {opt.sublabel}
                                  </span>
                                )}
                              </div>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Additional Requests */}
                {bookingFormConfig?.enableSpecialNotes !== false && (
                  <div>
                    <label className="block text-xs font-bold text-[#23150d] mb-1">
                      {bookingFormConfig?.specialNotesLabel || 'Special Notes or Arrival Timings (Optional)'}
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequirements}
                      onChange={e => setSpecialRequirements(e.target.value)}
                      placeholder={bookingFormConfig?.specialNotesPlaceholder || 'e.g. Expected arrival at 11:00 AM by Sainagar Express...'}
                      className="w-full p-3 bg-[#f6efe3] border border-[#d6c2a8] rounded-xl text-base sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                    />
                  </div>
                )}

                {/* Action Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>{bookingFormConfig?.submitButtonText || 'Submit Room Booking Request'}</span>
                  </button>
                  <p className="text-center text-[11px] text-[#23150d]/60 mt-2">
                    {bookingFormConfig?.confirmationNotice || '✓ Immediate automated email acknowledgement • Verified directly with front desk'}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Email Acknowledgement Preview Modal */}
      {viewingEmailAck && (
        <EmailAcknowledgementModal
          acknowledgement={viewingEmailAck}
          customerName={submittedRequest?.customerName}
          refId={submittedRequest?.id}
          onClose={() => setViewingEmailAck(null)}
        />
      )}
    </>
  );
};

