Here's a comprehensive, senior-engineer-grade prompt you can feed directly into Antigravity AI (or any AI builder):

---

## 🧠 Full Build Prompt for Bellstech Website

---

**PROJECT OVERVIEW**

Build a modern, multi-page React website for **Bellstech** (Bells Technology Multiconcept) — a gadget retail and repair business based in Abeokuta, Nigeria. Their tagline is **"Enhancing Your Digital Experience."**

The site must feel premium, trustworthy, and tech-forward — think clean lines, deep navy/electric blue palette, confident typography, and smooth interactions. The target audience is everyday Nigerian consumers looking to buy or repair smartphones, laptops, and gadgets.

---

**TECH STACK**

- React (with React Router v6 for multi-page routing)
- Tailwind CSS for utility styling
- Framer Motion for page transitions and scroll animations
- React Icons for iconography
- No backend required — static/mock data for products and services

---

**BRAND & DESIGN SYSTEM**

```
Primary:     #0A1F44  (deep navy)
Accent:      #1D6FEB  (electric blue)
Highlight:   #38BDF8  (sky blue for CTAs and hover states)
Surface:     #F0F6FF  (light blue-tinted white)
Text:        #0D1B2A  (near black)
Muted:       #64748B  (slate gray)
White:       #FFFFFF
```

Font pairing:
- Headings: `Syne` (bold, geometric, tech-feel) — from Google Fonts
- Body: `DM Sans` (clean, readable, modern) — from Google Fonts

---

**PAGES & ROUTING STRUCTURE**

```
/ → Home
/services → Services
/shop → Shop (Products)
/about → About
/contact → Contact
```

Use `React Router v6` with a shared `Layout` component containing `Navbar` and `Footer`.

---

**PAGE-BY-PAGE SPECIFICATIONS**

**1. HOME (`/`)**
- Full-viewport hero section with headline: *"Enhancing Your Digital Experience"*, subtext about gadget sales and repairs, and two CTA buttons: `Explore Services` and `Shop Now`
- Animated background: subtle animated gradient mesh in navy/blue tones — no static flat colors
- Section: "Why Choose Bellstech?" — 4 feature cards with icons: Fast Repairs, Genuine Products, Expert Team, Trusted Service
- Section: Services snapshot — horizontally scrollable cards linking to `/services`
- Section: Featured Products — 6 product cards pulled from mock data, linking to `/shop`
- Section: Booking CTA banner — "Book a Repair Appointment" with WhatsApp deep-link button (`https://wa.me/2348153838529`)
- Footer strip with social icons: Instagram (`@bellstech_`), WhatsApp, TikTok (`@Bellstech`)

**2. SERVICES (`/services`)**
- Page hero with title and breadcrumb
- Service cards grid (2 columns on mobile, 3 on desktop) for:
  1. Gadget Sales
  2. Phone Repairs
  3. Laptop Repairs
  4. Starlink Sales & Installation
  5. Networking Solutions
  6. Gadget Software & Hardware Solutions
  7. Workspace Setup
- Each card: icon, title, short description, and an `Enquire via WhatsApp` button that deep-links to WhatsApp with a pre-filled message like: `Hi Bellstech, I'd like to enquire about [Service Name]`
- Booking CTA section at bottom of page

**3. SHOP (`/shop`)**
- Filter bar at top: All | iPhones & iPads | Samsung | MacBooks & PCs | Consoles & Accessories | Starlink & Power
- Product grid (2 on mobile, 3-4 on desktop) using mock data with: product image placeholder, name, category badge, price (show "Contact for Price" as placeholder), and a `WhatsApp Enquiry` button
- Mock data: minimum 12 products spread across categories
- No cart/checkout required — all purchase intent goes through WhatsApp

**4. ABOUT (`/about`)**
- Brand story section: Who Bellstech is, their mission
- Use this address and info:
  - Location: KOC Plaza, Before City Computer Village, Behind New SLOT, Opp. FASLINK, Okeilewo, Abeokuta
  - Phone: 08153838529
  - Email: bellstechmulticoncept@gmail.com
  - Hours: Monday–Saturday, 9:00am–6:00pm
- Embed Google Maps link: `https://maps.app.goo.gl/Ukvtc3HAqxxJA9Lz8` (use an iframe or a styled "Get Directions" button)
- Values section: 3 pillars — Quality, Trust, Innovation

**5. CONTACT (`/contact`)**
- Contact info cards: WhatsApp, Email, Phone, Address, Hours
- WhatsApp CTA button (primary): deep-link to `https://wa.me/2348153838529`
- Simple enquiry form (name, email, message) — no backend needed, `mailto:bellstechmulticoncept@gmail.com` on submit or a "form submitted" state mock
- Social media links row: Instagram, WhatsApp, TikTok

---

**SHARED COMPONENTS**

**Navbar:**
- Logo placeholder (text "Bellstech" in brand font until logo is supplied)
- Nav links: Home, Services, Shop, About, Contact
- Sticky on scroll with slight blur/frosted glass effect
- Mobile: hamburger menu with slide-in drawer
- CTA button in nav: "Book a Repair" → WhatsApp link

**Footer:**
- Logo + tagline
- Quick links (all 5 pages)
- Contact info (phone, email, hours)
- Social icons row
- Bottom bar: "© 2025 Bellstech. All rights reserved."

---

**ANIMATIONS & INTERACTIONS**

- Page entry: fade-up stagger using Framer Motion `AnimatePresence`
- Cards: subtle lift on hover (`translateY(-4px)` + shadow deepening)
- Hero: animated gradient background that shifts slowly
- Navbar: transparent on hero, solid on scroll
- Smooth scroll behavior globally (`scroll-behavior: smooth`)
- Mobile-first responsive — test all breakpoints

---

**WHATSAPP INTEGRATION PATTERN**

All enquiry and booking CTAs should use this URL format:
```
https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20enquire%20about%20[URL-encoded-topic]
```

---

**PLACEHOLDER ASSETS**

- Logo: render "Bellstech" as styled text in `Syne Bold` with the accent blue until a real logo is provided
- Product images: use `https://placehold.co/400x300/0A1F44/FFFFFF?text=Product` as placeholders
- Service icons: use React Icons (`react-icons/fi` — Feather Icons set)

---

**FILE STRUCTURE TO FOLLOW**

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── WhatsAppButton.jsx  ← floating WhatsApp button on all pages
├── pages/
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Shop.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── data/
│   ├── services.js     ← mock service list
│   └── products.js     ← mock product list
├── App.jsx             ← Router setup
└── index.css           ← Tailwind + Google Fonts import
```

---

**EXTRA: Floating WhatsApp Button**
Add a fixed floating WhatsApp button (bottom-right corner) on every page — green circle with WhatsApp icon, links to `https://wa.me/2348153838529`. This is critical for conversion on mobile.

---

That prompt covers every page, every component, the full design system, routing, data layer, and interaction patterns — everything a developer needs to build it without guessing. Once Antigravity generates the base, the main things you'll swap in later are the **real logo**, **actual product photos**, and **final pricing** from the client.