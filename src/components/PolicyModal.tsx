import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const PolicyModal: React.FC = () => {
  const { activePolicy, setActivePolicy, config } = useHotel();

  if (!activePolicy) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#222120]/80 leading-relaxed">
          <p>
            Hotel Royal Retreat, Shirdi (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;property&rdquo;) is committed to honoring and protecting the privacy of our website visitors and staying guests.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">Information We Collect</h4>
          <p>
            When you initiate a reservation inquiry via WhatsApp or our contact forms, we receive your name, telephone/mobile number, email address, dates of intended stay, guest count, and specific room preferences. This information is utilized solely to facilitate your reservation, check availability, and coordinate your arrival.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">No Third-Party Sharing</h4>
          <p>
            We do not sell, lease, or distribute your private contact details to external marketing agencies or third-party lead brokers. All communications are direct between you and Hotel Royal Retreat management.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">Statutory Guest Records</h4>
          <p>
            In compliance with Government of Maharashtra and local law enforcement regulations, valid official identification is securely recorded upon check-in for physical guest registers.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Stay & House Policies',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#222120]/80 leading-relaxed">
          <h4 className="font-semibold text-sm text-[#1e1611]">Check-In & Check-Out Timings</h4>
          <p>
            Standard Check-In time is 12:00 PM (Noon). Standard Check-Out time is 11:00 AM. Early check-in or late check-out is subject to room availability on the date of travel and may incur nominal charges as confirmed by the front desk.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">Identity Verification</h4>
          <p>
            Each adult guest must present a valid government-recognized photo ID card with address proof (Aadhaar Card, Passport, Driving License, or Voter ID) at check-in. PAN cards are not accepted as valid address proof per local regulations.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">Pure Vegetarian Premises</h4>
          <p>
            Hotel Royal Retreat and Sattva Restaurant maintain strictly pure vegetarian premises. Outside non-vegetarian meals and alcohol consumption are strictly prohibited across all rooms and public spaces.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">Quiet Hours & Pilgrimage Sanctity</h4>
          <p>
            To honor the rest of all pilgrims preparing for early morning Kakad Aarti (4:30 AM), quiet hours are observed in guest corridors between 10:30 PM and 5:00 AM.
          </p>
        </div>
      )
    },
    cancellation: {
      title: 'Cancellation & Rescheduling Policy',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#222120]/80 leading-relaxed">
          <h4 className="font-semibold text-sm text-[#1e1611]">Standard Reservations</h4>
          <p>
            Cancellations or date modifications notified at least 48 hours prior to 12:00 PM on the scheduled arrival date are eligible for full rescheduling or refund per hotel terms.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">Within 48 Hours / No-Show</h4>
          <p>
            Cancellations received within 48 hours of scheduled arrival or failure to check in (&ldquo;No-Show&rdquo;) will be subject to a retention charge equivalent to the first night&apos;s tariff.
          </p>
          <h4 className="font-semibold text-sm text-[#1e1611]">Peak Festival Periods</h4>
          <p>
            For reservations during major temple festivals (Guru Purnima, Ram Navami, Vijayadashami / Dussehra, and New Year Eve), special non-refundable booking terms apply as advised at the time of reservation confirmation.
          </p>
        </div>
      )
    }
  };

  const activeContent = contentMap[activePolicy];

  return (
    <div
      id="policy-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setActivePolicy(null)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#fcfbf7] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#c5a880]/40 relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#c5a880]/20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#b38f58]" />
            <h3 className="font-serif text-xl font-medium text-[#1e1611]">
              {activeContent.title}
            </h3>
          </div>
          <button
            onClick={() => setActivePolicy(null)}
            className="p-1.5 rounded-full text-[#222120]/60 hover:text-[#1e1611] hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{activeContent.body}</div>

        <div className="mt-8 pt-4 border-t border-[#c5a880]/20 text-right">
          <button
            onClick={() => setActivePolicy(null)}
            className="px-5 py-2 rounded-xl bg-[#1e1611] text-[#fcfbf7] text-xs font-semibold uppercase tracking-wider hover:bg-[#2a1f18]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
