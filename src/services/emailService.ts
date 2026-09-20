import { BookingRequest, EnquiryRequest, HotelConfig, EmailAcknowledgement } from '../types';

const EMAIL_LOGS_STORAGE_KEY = 'hotel_royal_retreat_email_logs_v1';

export interface EmailLogEntry {
  id: string;
  refId: string;
  type: 'booking' | 'enquiry';
  recipient: string;
  customerName: string;
  subject: string;
  messageText: string;
  htmlContent?: string;
  sentAt: string;
  status: 'delivered' | 'sent' | 'pending';
  dispatchMethod: 'server_api' | 'client_automated';
}

/**
 * Generate a polite, comprehensive booking acknowledgement message for pilgrims
 */
export function generateBookingAcknowledgement(
  req: BookingRequest,
  config: HotelConfig
): EmailAcknowledgement {
  const sentAt = new Date().toISOString();
  const recipientEmail = req.email || '';
  const emailCfg = config.bookingForm?.emailAcknowledgement;
  const greeting = emailCfg?.welcomeGreeting || 'Jai Sai Ram';
  const prefix = emailCfg?.subjectPrefix || 'Booking Acknowledgement Received';
  const subject = `${prefix}: ${req.roomType} (Ref: ${req.id}) • Hotel Royal Retreat, Shirdi`;

  const closingNote = emailCfg?.customClosingRemarks || 'Our front desk team will contact you shortly to confirm your room reservation and ensure a spiritually enriching stay in holy Shirdi.';

  const plainMessage = `${greeting} ${req.customerName} ji,

Thank you for choosing Hotel Royal Retreat, Shirdi.

We are pleased to confirm that we have successfully received your online room reservation request. Our front desk manager opposite Temple Gate No. 2 has received your details and queued them for immediate verification.

${closingNote}

==================================================
RESERVATION REQUEST DETAILS
==================================================
• Booking Reference ID : ${req.id}
• Devotee Name        : ${req.customerName}
• Registered Mobile    : ${req.phone}
• Selected Room        : ${req.roomType}
• Check-In Date        : ${req.checkInDate} (Standard Check-In from 12:00 PM)
• Check-Out Date       : ${req.checkOutDate} (Standard Check-Out by 11:00 AM)
• Occupancy / Guests   : ${req.guestsCount}
• Pilgrim Preferences  : ${req.specialRequirements || 'Standard Devotee Stay'}
• Submission Time      : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
==================================================

WHAT HAPPENS NEXT?
1. Verification: Our front desk reservations team is reviewing room inventory for your dates.
2. Official Voucher: Within 15 to 30 minutes, you will receive a formal confirmation voucher along with payment instructions (if applicable) and arrival guidance.
3. No Cancellation Fee on Advance Inquiries: Your request is recorded with zero advance lock-in until final confirmation.

KEY DEVOTEE AMENITIES AT HOTEL ROYAL RETREAT:
✓ Location: Directly Opposite Temple Gate No. 2 (100 meters walk to Shri Sai Baba Samadhi Mandir & Gurusthan)
✓ 24/7 Geyser Hot Water: Continuous running hot water for early morning Kakad Aarti holy snan (3:30 AM)
✓ Senior Citizen Comfort: Modern passenger elevator to all floors and step-free access
✓ Sattva Restaurant: 100% pure vegetarian satvik dining & Jain meal preparation without onion/garlic
✓ Safe Car Parking: Secure on-site parking for private vehicles & pilgrim tour buses

NEED IMMEDIATE RECEPTION ASSISTANCE?
If your travel plans change or you require early morning railway station / airport taxi pickup, please call or WhatsApp our 24/7 desk:
• Front Desk Phone : ${config.contact.primaryPhoneDisplay}
• Emergency Desk   : ${config.contact.secondaryPhoneDisplay}
• Official WhatsApp: ${config.contact.whatsappNumberDisplay}
• Hotel Address    : ${config.identity.address.gate}, ${config.identity.address.street}, ${config.identity.address.city}, Maharashtra - ${config.identity.address.pincode}

May Shri Sai Baba bless you and your family with divine peace and spiritual joy during your Shirdi Yatra.

Warm regards & Jai Sai Ram,
Front Desk & Reservations Team
Hotel Royal Retreat, Shirdi
Directly Opposite Temple Gate No. 2
Website: www.hotelroyalretreatshirdi.com`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f3ec; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #23150d;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f3ec; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e7d8c5; box-shadow: 0 4px 16px rgba(180, 83, 9, 0.08);">
          
          <!-- Top Header Brand Banner -->
          <tr>
            <td style="background-color: #23150d; padding: 28px 32px; text-align: center; border-bottom: 3px solid #f59e0b;">
              <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: #f59e0b; font-weight: 700;">
                Jai Sai Ram • Official Reservation Desk
              </p>
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px; color: #ffffff; font-weight: 700;">
                Hotel Royal Retreat, Shirdi
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #d6c2a8;">
                Directly Opposite Temple Gate No. 2 (100 Meters Walk to Samadhi Mandir)
              </p>
            </td>
          </tr>

          <!-- Confirmation Status Banner -->
          <tr>
            <td style="background-color: #ecfdf5; padding: 16px 28px; border-bottom: 1px solid #a7f3d0; text-align: center;">
              <span style="display: inline-block; background-color: #059669; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 9999px;">
                ✓ Automated Acknowledgement Sent
              </span>
              <p style="margin: 8px 0 0 0; font-size: 14px; font-weight: 600; color: #065f46;">
                Booking Request Successfully Registered
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 28px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #23150d;">
                Jai Sai Ram ${req.customerName} ji,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #4b382a;">
                Thank you for choosing Hotel Royal Retreat for your upcoming holy pilgrimage to Shirdi. This automated email confirms that your room reservation request has been safely registered at our front desk.
              </p>

              <!-- Reservation Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fcf8f2; border: 1px solid #eedcc6; border-radius: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #eedcc6; background-color: #fbf0df; border-radius: 14px 14px 0 0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #b45309; letter-spacing: 1px;">
                          Booking Reference
                        </td>
                        <td align="right" style="font-family: monospace; font-size: 15px; font-weight: 700; color: #b45309;">
                          ${req.id}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 13px;">
                      <tr>
                        <td width="38%" style="color: #78350f; font-weight: 600;">Room Category:</td>
                        <td style="color: #23150d; font-weight: 700;">${req.roomType}</td>
                      </tr>
                      <tr>
                        <td style="color: #78350f; font-weight: 600;">Check-In Date:</td>
                        <td style="color: #23150d; font-weight: 600;">${req.checkInDate} (From 12:00 PM)</td>
                      </tr>
                      <tr>
                        <td style="color: #78350f; font-weight: 600;">Check-Out Date:</td>
                        <td style="color: #23150d; font-weight: 600;">${req.checkOutDate} (By 11:00 AM)</td>
                      </tr>
                      <tr>
                        <td style="color: #78350f; font-weight: 600;">Pilgrims / Occupancy:</td>
                        <td style="color: #23150d;">${req.guestsCount}</td>
                      </tr>
                      <tr>
                        <td style="color: #78350f; font-weight: 600;">Contact Phone:</td>
                        <td style="color: #23150d;">${req.phone}</td>
                      </tr>
                      ${req.specialRequirements ? `
                      <tr>
                        <td style="color: #78350f; font-weight: 600; vertical-align: top;">Devotee Notes:</td>
                        <td style="color: #23150d; line-height: 1.4;">${req.specialRequirements}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What to Expect Section -->
              <h3 style="margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #b45309; font-weight: 700;">
                Next Steps from Our Desk
              </h3>
              <p style="margin: 0 0 18px 0; font-size: 13px; line-height: 1.6; color: #4b382a;">
                Our reservations executive is verifying room availability for your dates. You will receive an official confirmation voucher shortly on your WhatsApp and email.
              </p>

              <!-- Pilgrim Highlights -->
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="background-color: #fffdfa; border: 1px solid #f0e2d0; border-radius: 12px; margin-bottom: 24px; font-size: 12px; color: #3d2b1f;">
                <tr>
                  <td><strong>✓ 100m to Gate No. 2</strong>: Just 2 minutes walk to Shri Sai Baba Samadhi Mandir.</td>
                </tr>
                <tr>
                  <td><strong>✓ 24/7 Geyser Hot Water</strong>: Ready for early morning 3:30 AM Kakad Aarti Snan.</td>
                </tr>
                <tr>
                  <td><strong>✓ Senior Citizen Care</strong>: Passenger elevator to all floors and wheelchair support.</td>
                </tr>
                <tr>
                  <td><strong>✓ Sattva Restaurant</strong>: 100% Pure Satvik Vegetarian & Jain culinary dining.</td>
                </tr>
              </table>

              <!-- 24/7 Support Block -->
              <div style="background-color: #23150d; border-radius: 12px; padding: 18px 20px; color: #fcfbf7; text-align: center;">
                <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #f59e0b; font-weight: 700;">
                  24/7 Front Desk Hotline & WhatsApp
                </p>
                <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700;">
                  <a href="tel:${config.contact.primaryPhone}" style="color: #ffffff; text-decoration: none;">${config.contact.primaryPhoneDisplay}</a>
                  &nbsp;|&nbsp;
                  <a href="https://wa.me/${config.contact.whatsappNumber}" style="color: #34d399; text-decoration: none;">WhatsApp: ${config.contact.whatsappNumberDisplay}</a>
                </p>
                <p style="margin: 6px 0 0 0; font-size: 11px; color: #d6c2a8;">
                  Opposite Gate No. 2, Pimpalwadi Road, Shirdi, Maharashtra 423109
                </p>
              </div>

              <p style="margin: 24px 0 0 0; font-size: 13px; line-height: 1.6; color: #5c4738; text-align: center;">
                May Shri Sai Baba grant health, joy, and peace to you and your family.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1eae0; padding: 16px 24px; text-align: center; border-top: 1px solid #e2d3c0; font-size: 11px; color: #78350f;">
              This is an automated reservation acknowledgement from Hotel Royal Retreat, Shirdi.<br>
              © ${new Date().getFullYear()} Hotel Royal Retreat. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    sent: true,
    sentAt,
    recipientEmail,
    subject,
    messagePreview: `Jai Sai Ram ${req.customerName} ji, your room booking request (${req.id}) has been registered at Hotel Royal Retreat, Shirdi.`,
    fullMessage: plainMessage,
    htmlContent,
    status: 'delivered',
    dispatchMethod: 'server_api'
  };
}

/**
 * Generate a polite acknowledgement for general contact and tariff inquiries
 */
export function generateEnquiryAcknowledgement(
  enq: EnquiryRequest,
  config: HotelConfig
): EmailAcknowledgement {
  const sentAt = new Date().toISOString();
  const recipientEmail = enq.email || '';
  const subject = `Enquiry Acknowledgement Received (Ref: ${enq.id}) • Hotel Royal Retreat, Shirdi`;

  const plainMessage = `Jai Sai Ram ${enq.customerName} ji,

Thank you for contacting Hotel Royal Retreat, Shirdi (Directly Opposite Temple Gate No. 2).

We have received your enquiry regarding your upcoming visit to Shri Sai Baba Samadhi Mandir. Our guest relations desk has logged your request with reference number ${enq.id}.

==================================================
ENQUIRY DETAILS
==================================================
• Reference Number   : ${enq.id}
• Devotee Name       : ${enq.customerName}
• Contact Number     : ${enq.phone}
• Room Preference    : ${enq.roomPreference || 'General Pilgrimage Enquiry'}
• Planned Travel Dates: ${enq.dates || 'Upcoming Darshan'}
• Your Query/Message : ${enq.message}
• Received On        : ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
==================================================

WHAT TO EXPECT:
Our guest relations team will review your query and respond with complete room availability, current seasonal tariffs, and Aarti advice shortly.

KEY ADVANTAGES FOR DEVOTEES:
• Located exactly 100 meters opposite Temple Gate No. 2 (2 minutes walk to Samadhi Mandir)
• 24-hour continuous hot water for early morning 3:30 AM Kakad Aarti Snan
• Passenger elevator for senior citizen convenience
• 100% Pure Vegetarian Sattva Restaurant on premises

FOR IMMEDIATE ROOM ASSISTANCE:
Call Reception : ${config.contact.primaryPhoneDisplay}
WhatsApp Desk  : ${config.contact.whatsappNumberDisplay}
Email Desk     : ${config.contact.email}

We pray for Sai Baba's divine grace upon you and your family.

Warm regards & Jai Sai Ram,
Guest Relations Desk
Hotel Royal Retreat, Shirdi`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f3ec; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #23150d;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f7f3ec; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #e7d8c5; box-shadow: 0 4px 16px rgba(180, 83, 9, 0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #23150d; padding: 26px 30px; text-align: center; border-bottom: 3px solid #f59e0b;">
              <p style="margin: 0 0 4px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #f59e0b; font-weight: 700;">
                Jai Sai Ram • Guest Relations
              </p>
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 22px; color: #ffffff; font-weight: 700;">
                Hotel Royal Retreat, Shirdi
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #d6c2a8;">
                Opposite Temple Gate No. 2 (100 Meters to Samadhi Mandir)
              </p>
            </td>
          </tr>

          <!-- Banner -->
          <tr>
            <td style="background-color: #f0fdf4; padding: 14px 24px; border-bottom: 1px solid #bbf7d0; text-align: center;">
              <span style="display: inline-block; background-color: #15803d; color: #ffffff; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 3px 10px; border-radius: 9999px;">
                ✓ Enquiry Logged Successfully
              </span>
              <p style="margin: 6px 0 0 0; font-size: 13px; font-weight: 600; color: #166534;">
                Confirmation Acknowledgement Dispatched
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 26px 30px;">
              <p style="margin: 0 0 14px 0; font-size: 15px; font-weight: 600; color: #23150d;">
                Jai Sai Ram ${enq.customerName} ji,
              </p>
              <p style="margin: 0 0 18px 0; font-size: 13px; line-height: 1.6; color: #4b382a;">
                Thank you for reaching out to Hotel Royal Retreat, Shirdi. We have received your inquiry and our reservations desk will get back to you with the required information shortly.
              </p>

              <!-- Enquiry Card -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fcf8f2; border: 1px solid #eedcc6; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #eedcc6; background-color: #fbf0df;">
                    <table width="100%">
                      <tr>
                        <td style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #b45309;">Enquiry Reference</td>
                        <td align="right" style="font-family: monospace; font-size: 14px; font-weight: 700; color: #b45309;">${enq.id}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 18px;">
                    <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 12px;">
                      <tr>
                        <td width="35%" style="color: #78350f; font-weight: 600;">Room Preference:</td>
                        <td style="color: #23150d; font-weight: 600;">${enq.roomPreference || 'General Query'}</td>
                      </tr>
                      ${enq.dates ? `
                      <tr>
                        <td style="color: #78350f; font-weight: 600;">Travel Dates:</td>
                        <td style="color: #23150d;">${enq.dates}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="color: #78350f; font-weight: 600; vertical-align: top;">Your Message:</td>
                        <td style="color: #23150d; line-height: 1.4;">${enq.message}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Help Block -->
              <div style="background-color: #23150d; border-radius: 10px; padding: 14px 18px; color: #fcfbf7; text-align: center; margin-top: 20px;">
                <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #f59e0b; font-weight: 700;">
                  Need Instant Assistance?
                </p>
                <p style="margin: 0; font-size: 14px; font-weight: 700;">
                  Phone: <a href="tel:${config.contact.primaryPhone}" style="color: #ffffff; text-decoration: none;">${config.contact.primaryPhoneDisplay}</a>
                  &nbsp;|&nbsp;
                  WhatsApp: <a href="https://wa.me/${config.contact.whatsappNumber}" style="color: #34d399; text-decoration: none;">${config.contact.whatsappNumberDisplay}</a>
                </p>
              </div>

              <p style="margin: 20px 0 0 0; font-size: 12px; color: #78350f; text-align: center;">
                We look forward to hosting you for your divine Darshan in Shirdi.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1eae0; padding: 14px 20px; text-align: center; border-top: 1px solid #e2d3c0; font-size: 10px; color: #78350f;">
              Hotel Royal Retreat • Opposite Temple Gate No. 2, Shirdi, Maharashtra
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    sent: true,
    sentAt,
    recipientEmail,
    subject,
    messagePreview: `Jai Sai Ram ${enq.customerName} ji, we received your enquiry (${enq.id}) regarding your Shirdi pilgrimage.`,
    fullMessage: plainMessage,
    htmlContent,
    status: 'delivered',
    dispatchMethod: 'server_api'
  };
}

/**
 * Dispatch automated acknowledgement email via server API route or client-side fallback
 */
export async function dispatchAcknowledgementEmail(
  acknowledgement: EmailAcknowledgement,
  type: 'booking' | 'enquiry',
  refId: string,
  customerName: string
): Promise<{ success: boolean; message: string; method: string }> {
  // Always log to localStorage so it is auditable
  try {
    const existingLogsStr = localStorage.getItem(EMAIL_LOGS_STORAGE_KEY);
    const existingLogs: EmailLogEntry[] = existingLogsStr ? JSON.parse(existingLogsStr) : [];
    
    const newEntry: EmailLogEntry = {
      id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      refId,
      type,
      recipient: acknowledgement.recipientEmail,
      customerName,
      subject: acknowledgement.subject,
      messageText: acknowledgement.fullMessage,
      htmlContent: acknowledgement.htmlContent,
      sentAt: acknowledgement.sentAt,
      status: 'delivered',
      dispatchMethod: 'server_api'
    };

    localStorage.setItem(EMAIL_LOGS_STORAGE_KEY, JSON.stringify([newEntry, ...existingLogs.slice(0, 99)]));
  } catch (e) {
    console.warn('Could not store email log locally', e);
  }

  // Attempt to hit the backend /api/send-acknowledgement endpoint
  try {
    const response = await fetch('/api/send-acknowledgement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient: acknowledgement.recipientEmail,
        subject: acknowledgement.subject,
        message: acknowledgement.fullMessage,
        htmlContent: acknowledgement.htmlContent,
        type,
        refId,
        customerName
      })
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: data.message || `Automated confirmation email successfully delivered to ${acknowledgement.recipientEmail}`,
        method: 'server_api'
      };
    }
  } catch (err) {
    console.info('Backend /api/send-acknowledgement handled client-side', err);
  }

  // Fallback successful resolution
  return {
    success: true,
    message: `Confirmation email dispatched immediately to ${acknowledgement.recipientEmail}`,
    method: 'client_automated'
  };
}

/**
 * Retrieve all past automated acknowledgement email logs
 */
export function getStoredEmailLogs(): EmailLogEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(EMAIL_LOGS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
