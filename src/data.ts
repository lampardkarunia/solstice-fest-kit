/**
 * One data model for the whole kit.
 *
 * Every template in this repo — the confirmation email, the printable PDF
 * ticket, the event web page and the social card — reads from this file.
 * Change the festival here and all four outputs change together.
 */

export interface SetTime {
  time: string;
  artist: string;
  note?: string;
}

export interface Stage {
  name: string;
  tagline: string;
  sets: SetTime[];
}

export interface Tier {
  name: string;
  price: string;
  blurb: string;
}

export const event = {
  name: "SOLSTICE FEST",
  edition: "Vol. III — The Longest Day",
  tagline: "The longest day, played loud.",
  date: "Saturday, 20 June 2027",
  dateShort: "20 JUN 2027",
  gates: "Gates 14:00 · First set 15:30 · Curfew 02:00",
  venue: "Cliffside Grounds, Uluwatu",
  city: "Bali, Indonesia",
  url: "https://solsticefest.example",
};

export const stages: Stage[] = [
  {
    name: "SOL STAGE",
    tagline: "Main bowl, facing the sunset",
    sets: [
      { time: "15:30", artist: "Senja Kala", note: "Opening ceremony" },
      { time: "17:45", artist: "The Paper Suns" },
      { time: "19:20", artist: "Nara & The Currents" },
      { time: "21:05", artist: "LUNAR YOUTH" },
      { time: "23:00", artist: "AURORA VEIL", note: "Headline set" },
      { time: "00:45", artist: "Midnight Cartel", note: "Closing" },
    ],
  },
  {
    name: "DUNE STAGE",
    tagline: "Electronic tent, sand floor",
    sets: [
      { time: "16:15", artist: "Pasir Putih Club" },
      { time: "18:30", artist: "Gamelan Re:Wire" },
      { time: "20:15", artist: "Batu Karang" },
      { time: "22:30", artist: "OMBAK AUDIO", note: "Silent-disco switch at midnight" },
    ],
  },
];

export const tiers: Tier[] = [
  { name: "Golden Hour Pass", price: "$89", blurb: "Priority entry from 13:30, main bowl deck, one sunset drink" },
  { name: "Day Pass", price: "$59", blurb: "General entry from 14:00, both stages" },
  { name: "Sunset Duo", price: "$158", blurb: "Two Day Passes plus a shared picnic mat spot on the lawn" },
  { name: "Under-18 Pass", price: "$39", blurb: "Day Pass for ages 13–17, entry with an adult" },
];

export const attendee = {
  firstName: "Kirana",
  fullName: "Kirana Maheswari",
  email: "kirana@example.com",
};

export const order = {
  id: "SLST-2027-0482",
  passUrl: "https://solsticefest.example/passes/SLST-2027-0482",
  items: [
    { label: "Golden Hour Pass × 2", price: "$178.00" },
    { label: "Booking fee", price: "$9.80" },
  ],
  total: "$187.80",
};

export const ticket = {
  tier: "Golden Hour Pass",
  holder: attendee.fullName,
  code: "SLST-7K4D-9QX2",
  gate: "Gate A — Cliff Entry",
  zone: "Main Bowl · Deck",
  admits: "Admits 2",
};

export const goodToKnow: string[] = [
  "Bring photo ID — the name on the pass is checked at Gate A.",
  "Free water stations at both stages; empty bottles welcome.",
  "Last shuttle to Canggu and Ubud leaves the main gate at 02:30.",
  "No re-entry after 22:00, and the cliff path is lit but steep — wear real shoes.",
];
