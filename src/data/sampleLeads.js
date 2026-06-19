/**
 * Enriched dataset of sample client leads for Startup CRM Lite.
 * Conforms to the shape required by the Advanced Analytics Dashboard:
 * includes numeric deal values, owners (sales reps), and stage-progression timestamps.
 * 
 * Shape of lead object:
 * @typedef {Object} Lead
 * @property {string} id - Unique UUID string or timestamp.
 * @property {string} name - Full contact name.
 * @property {string} company - Associated corporate entity.
 * @property {string} email - Email contact address.
 * @property {string} phone - Contact phone number.
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Lead workflow stage.
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Lead reference channel.
 * @property {number} value - Est. deal value in ₹ (Rupees).
 * @property {string} createdAt - ISO 8601 creation date string.
 * @property {string} [contactedAt] - Timestamp when first contacted.
 * @property {string} [meetingAt] - Timestamp when meeting was held.
 * @property {string} [proposalAt] - Timestamp when proposal was sent.
 * @property {string} [wonAt] - Timestamp when closed-won.
 * @property {string} owner - Assigned sales representative.
 */
export const sampleLeads = [
  {
    id: "lead-1",
    name: "Rajesh Kumar",
    company: "Kumar & Sons Enterprises",
    email: "rajesh@kumarent.co.in",
    phone: "+91 98765 43210",
    status: "New",
    source: "LinkedIn",
    value: 120000,
    owner: "Alex",
    createdAt: new Date("2026-06-15T10:00:00.000Z").toISOString(),
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    company: "Sharma Tech Solutions",
    email: "priya@sharmatech.in",
    phone: "+91 99887 76655",
    status: "New",
    source: "Website",
    value: 75000,
    owner: "Sarah",
    createdAt: new Date("2026-06-10T11:15:00.000Z").toISOString(),
  },
  {
    id: "lead-3",
    name: "Amit Patel",
    company: "Patel Logistics Pvt Ltd",
    email: "amit@patellogistics.com",
    phone: "+91 91234 56789",
    status: "Contacted",
    source: "Cold Call",
    value: 65000,
    owner: "David",
    createdAt: new Date("2026-05-08T14:30:00.000Z").toISOString(),
    contactedAt: new Date("2026-05-10T10:00:00.000Z").toISOString(),
  },
  {
    id: "lead-4",
    name: "Sunita Rao",
    company: "Rao Financial Consulting",
    email: "sunita@raoconsulting.com",
    phone: "+91 93456 78901",
    status: "Meeting Scheduled",
    source: "Referral",
    value: 185000,
    owner: "David",
    createdAt: new Date("2026-04-15T09:45:00.000Z").toISOString(),
    contactedAt: new Date("2026-04-17T11:00:00.000Z").toISOString(),
    meetingAt: new Date("2026-04-20T14:00:00.000Z").toISOString(),
  },
  {
    id: "lead-5",
    name: "Vikram Singh",
    company: "Singh Infrastructure & Builders",
    email: "vikram@singhbuilders.in",
    phone: "+91 94567 89012",
    status: "Won",
    source: "LinkedIn",
    value: 280000,
    owner: "Sarah",
    createdAt: new Date("2026-03-05T16:20:00.000Z").toISOString(),
    contactedAt: new Date("2026-03-06T10:00:00.000Z").toISOString(),
    meetingAt: new Date("2026-03-10T15:00:00.000Z").toISOString(),
    proposalAt: new Date("2026-03-15T11:00:00.000Z").toISOString(),
    wonAt: new Date("2026-03-20T12:00:00.000Z").toISOString(),
  },
  {
    id: "lead-6",
    name: "Neha Gupta",
    company: "Gupta Garments & Fabrics",
    email: "neha@guptafabrics.co.in",
    phone: "+91 95678 90123",
    status: "Lost",
    source: "Email Campaign",
    value: 95000,
    owner: "Alex",
    createdAt: new Date("2026-02-12T13:10:00.000Z").toISOString(),
    contactedAt: new Date("2026-02-15T11:00:00.000Z").toISOString(),
  },
];
