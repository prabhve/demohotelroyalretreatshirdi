import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Navigation, Send, CheckCircle2, Sparkles, Eye } from 'lucide-react';
import { useHotel } from '../context/HotelContext';
import { EnquiryRequest, EmailAcknowledgement } from '../types';
import { generateEnquiryAcknowledgement, dispatchAcknowledgementEmail } from '../services/emailService';
import { EmailAcknowledgementModal } from './EmailAcknowledgementModal';

export const ContactSection: React.FC = () => {
  const { config, openWhatsApp, addEnquiryRequest, updateEnquiryAcknowledgement } = useHotel();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [roomPref, setRoomPref] = useState('Superior Double Room');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<EnquiryRequest | null>(null);
  const [viewingEmailAck, setViewingEmailAck] = useState<EmailAcknowledgement | null>(null);
  const [postSubmitEmail, setPostSubmitEmail] = useState('');
  const [isSendingPostEmail, setIsSendingPostEmail] = useState(false);
  const [postEmailSuccessMsg, setPostEmailSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEnq = addEnquiryRequest({
      customerName: name,
      phone,
      email: email.trim() || undefined,
      dates: dates || 'Upcoming visit',
      roomPreference: roomPref,
      message: message || 'Please share availability and current tariff for our upcoming Shirdi Darshan stay.',
      source: 'contact_form'
    });

    if (email.trim()) {
      const ack = generateEnquiryAcknowledgement(newEnq, config);
      newEnq.acknowledgement = ack;
      updateEnquiryAcknowledgement(newEnq.id, ack);
      dispatchAcknowledgementEmail(ack, 'enquiry', newEnq.id, name);
    }

    setSubmittedRef(newEnq.id);
    setSubmittedEnquiry(newEnq);
  };

  const handleSendPostSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittedEnquiry || !postSubmitEmail.trim()) return;

    setIsSendingPostEmail(true);
    const updated: EnquiryRequest = {
      ...submittedEnquiry,
      email: postSubmitEmail.trim()
    };
    const ack = generateEnquiryAcknowledgement(updated, config);
    updated.acknowledgement = ack;
    updateEnquiryAcknowledgement(updated.id, ack);
    setSubmittedEnquiry(updated);

    await dispatchAcknowledgementEmail(ack, 'enquiry', updated.id, updated.customerName);
    setIsSendingPostEmail(false);
    setPostEmailSuccessMsg(`Polite confirmation dispatched to ${postSubmitEmail.trim()}`);
  };

  const handleForwardWhatsApp = () => {
    openWhatsApp('contact', {
      NAME: name,
      DATES: dates || 'Upcoming visit',
      MESSAGE: `Ref ID: ${submittedRef || 'New'} | Room Preference: ${roomPref} | Phone: ${phone} | Email: ${email || 'Not provided'} | Requirements: ${message || 'Please share availability and current tariff.'}`
    });
  };

  return (
    <>
      <section id="contact" className="py-16 sm:py-24 bg-[#fcf8f2] border-t border-[#b45309]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#b45309] mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Reservations & Front Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#23150d] font-bold tracking-tight mb-3">
            Contact Hotel Royal Retreat
          </h2>
          <p className="text-base text-[#23150d]/80 leading-relaxed">
            Reach out directly to our 24-hour reception desk opposite Gate No. 2 for instant room booking, Aarti guidance, or taxi pickup arrangements.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-[#fdfaf5] border border-[#d6c2a8] shadow-sm">
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-2xl bg-[#f6efe3] text-[#b45309] shrink-0 mt-0.5 border border-[#b45309]/20">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#23150d] mb-1">
                    Hotel Address in Shirdi
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23150d]/80 leading-relaxed mb-3">
                    <strong>{config.identity.name}</strong><br />
                    {config.identity.address.gate}, {config.identity.address.street}<br />
                    {config.identity.address.area}, {config.identity.address.city}, {config.identity.address.state} – {config.identity.address.pincode}
                  </p>
                  <a
                    href={config.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b45309] hover:text-[#d97706] transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps Navigation</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Phone Numbers */}
            <div className="p-6 rounded-3xl bg-[#fdfaf5] border border-[#d6c2a8] shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-2xl bg-[#f6efe3] text-[#b45309] shrink-0 mt-0.5 border border-[#b45309]/20">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#23150d] mb-1">
                    Direct Phone Numbers
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p>
                      <span className="text-[#23150d]/70">Primary Front Desk: </span>
                      <a
                        href={`tel:${config.contact.primaryPhone}`}
                        className="font-bold text-[#b45309] hover:underline"
                      >
                        {config.contact.primaryPhoneDisplay}
                      </a>
                    </p>
                    <p>
                      <span className="text-[#23150d]/70">Alt / WhatsApp Desk: </span>
                      <a
                        href={`tel:${config.contact.secondaryPhone}`}
                        className="font-bold text-[#b45309] hover:underline"
                      >
                        {config.contact.secondaryPhoneDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Row */}
              <div className="pt-3 border-t border-[#b45309]/15 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-[#23150d]/70 block">Official WhatsApp:</span>
                  <span className="font-bold text-[#23150d]">{config.contact.whatsappNumberDisplay}</span>
                </div>
                <button
                  onClick={() => openWhatsApp('general')}
                  className="px-4 py-2 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow"
                >
                  Chat Now
                </button>
              </div>
            </div>

            {/* Email Contact Card */}
            <div className="p-5 rounded-3xl bg-[#fdfaf5] border border-[#d6c2a8] shadow-sm flex items-center gap-4">
              <span className="p-3 rounded-2xl bg-[#f6efe3] text-[#b45309] shrink-0 border border-[#b45309]/20">
                <Mail className="w-5 h-5" />
              </span>
              <div className="text-xs sm:text-sm">
                <span className="text-[#23150d]/70 block text-[11px] uppercase tracking-wider font-semibold">Email Reservations</span>
                <a
                  href={`mailto:${config.contact.email}`}
                  className="font-bold text-[#23150d] hover:text-[#b45309] break-all"
                >
                  {config.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Reservation Enquiry Form */}
          <div className="lg:col-span-7 bg-[#fdfaf5] rounded-3xl p-6 sm:p-8 border border-[#d6c2a8] shadow-lg">
            {submittedRef ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Enquiry Registered Successfully
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#23150d] mt-2">
                    Thank You, {name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23150d]/80 mt-1 max-w-md mx-auto">
                    Your inquiry has been logged in Hotel Royal Retreat desk management.
                  </p>
                </div>

                {/* Automated Email Acknowledgement Notification Card */}
                {submittedEnquiry?.acknowledgement ? (
                  <div className="bg-emerald-50/90 border border-emerald-300/80 rounded-2xl p-4 text-left max-w-md mx-auto shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5 shadow-sm">
                        <Mail className="w-4 h-4" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                            Automated Confirmation Dispatched
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Sent
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800 mt-0.5">
                          A polite confirmation message has been dispatched to:
                        </p>
                        <p className="text-xs font-mono font-bold text-emerald-900 mt-0.5">
                          {submittedEnquiry.acknowledgement.recipientEmail}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-emerald-200/80 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-700">
                        Ref: <strong>{submittedRef}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setViewingEmailAck(submittedEnquiry.acknowledgement || null)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Sent Email</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Option to send acknowledgement if email not entered initially */
                  <div className="bg-[#fcf8f2] border border-[#d6c2a8] rounded-2xl p-4 text-left max-w-md mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-[#b45309]" />
                      <span className="text-xs font-bold text-[#23150d]">
                        Send Acknowledgement to Email
                      </span>
                    </div>
                    {postEmailSuccessMsg ? (
                      <div className="p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                        <span>✓ {postEmailSuccessMsg}</span>
                        {submittedEnquiry?.acknowledgement && (
                          <button
                            type="button"
                            onClick={() => setViewingEmailAck(submittedEnquiry.acknowledgement || null)}
                            className="text-xs font-bold text-emerald-800 underline cursor-pointer ml-2"
                          >
                            View
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
                          placeholder="Enter email address..."
                          className="flex-1 px-3 py-2 bg-white border border-[#d6c2a8] rounded-xl text-xs text-[#23150d] focus:outline-none focus:border-[#b45309]"
                        />
                        <button
                          type="submit"
                          disabled={isSendingPostEmail}
                          className="px-3.5 py-2 bg-[#b45309] hover:bg-[#d97706] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                        >
                          {isSendingPostEmail ? 'Sending...' : 'Send'}
                        </button>
                      </form>
                    )}
                  </div>
                )}

                <div className="bg-[#f6efe3] rounded-2xl p-4 border border-[#d6c2a8] text-left max-w-md mx-auto space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-[#b45309]/15">
                    <span className="text-[#23150d]/70">Reference Number:</span>
                    <span className="font-mono font-bold text-[#b45309] text-sm">{submittedRef}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#23150d]/70">Room Preference:</span>
                    <span className="font-semibold text-[#23150d]">{roomPref}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#23150d]/70">Travel Dates:</span>
                    <span className="font-semibold text-[#23150d]">{dates || 'Upcoming Visit'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#23150d]/70">Desk Status:</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Pending Manager Review
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 max-w-md mx-auto pt-2">
                  <button
                    type="button"
                    onClick={handleForwardWhatsApp}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] py-3 px-6 rounded-xl font-bold uppercase tracking-wider text-xs shadow transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send directly to WhatsApp Front Desk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setSubmittedEnquiry(null);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setDates('');
                      setMessage('');
                      setPostSubmitEmail('');
                      setPostEmailSuccessMsg(null);
                    }}
                    className="w-full py-2 text-xs font-semibold text-[#23150d]/70 hover:text-[#23150d] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl font-bold text-[#23150d] mb-1">
                  Pilgrimage Stay Enquiry
                </h3>
                <p className="text-xs text-[#23150d]/70 mb-6">
                  Fill in your planned dates below. We automatically dispatch an immediate polite acknowledgement to your email and log your enquiry with front desk management.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#23150d] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Ramesh Deshmukh"
                        className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#23150d] mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#23150d]">
                        Email Address
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        Instant Automated Acknowledgement
                      </span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@gmail.com (for instant confirmation email)"
                      className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                    />
                    <p className="text-[11px] text-[#78350f] mt-1">
                      ✉️ A polite acknowledgement with reference number & temple guidance will be emailed immediately.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#23150d] mb-1">
                        Travel Dates
                      </label>
                      <input
                        type="text"
                        value={dates}
                        onChange={e => setDates(e.target.value)}
                        placeholder="e.g. 15th to 17th Oct"
                        className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#23150d] mb-1">
                        Preferred Room
                      </label>
                      <select
                        value={roomPref}
                        onChange={e => setRoomPref(e.target.value)}
                        className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                      >
                        {config.rooms.map(r => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#23150d] mb-1">
                      Specific Requirements or Notes
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="e.g. Early check-in needed for Kakad Aarti / Senior citizen room on lower floor / Jain meal requested..."
                      className="w-full bg-[#f6efe3] border border-[#d6c2a8] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#23150d] focus:outline-none focus:border-[#b45309]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#b45309] hover:bg-[#d97706] text-[#fcfbf7] py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Pilgrimage Stay Enquiry</span>
                  </button>
                  <p className="text-center text-[11px] text-[#23150d]/60 mt-1">
                    ✓ Instant email acknowledgement receipt dispatched automatically upon submission
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Email Acknowledgement Preview Modal */}
    {viewingEmailAck && (
      <EmailAcknowledgementModal
        acknowledgement={viewingEmailAck}
        customerName={submittedEnquiry?.customerName}
        refId={submittedEnquiry?.id}
        onClose={() => setViewingEmailAck(null)}
      />
    )}
  </>
  );
};
