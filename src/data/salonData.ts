import { ServiceItem, GalleryItem, BeforeAfterItem, ReviewItem, OfferItem } from '../types';

export const SALON_INFO = {
  name: "H2O Salon",
  tagline: "Where Beauty Meets Precision",
  subheading: "A refined hair, beauty and grooming experience in the heart of Koregaon Park.",
  address: "Lane No. 6, Meera Nagar Garden Society, Meera Nagar, Koregaon Park, Pune, Maharashtra 411001",
  landmark: "Near Meera Nagar Garden, Koregaon Park",
  phone: "+91 98501 80031",
  phoneRaw: "+919850180031",
  whatsapp: "+919850180031",
  hours: "10:00 AM – 8:00 PM Daily",
  rating: 4.4,
  reviewCount: "1,100+",
  googleMapsUrl: "https://maps.app.goo.gl/f1GjwNSGV9LFfZvN7",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.973948215682!2d73.89182317592477!3d18.536259068884962!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0f135b8ca81%3A0xb308c37d6e6423c5!2sLane%206%2C%20Meera%20Nagar%20Garden%20Society%2C%20Meera%20Nagar%2C%20Koregaon%20Park%2C%20Pune%2C%20Maharashtra%20411001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

export const INITIAL_SERVICES: ServiceItem[] = [
  // HAIR
  {
    id: "h1",
    name: "Couture Haircut & Precision Styling",
    category: "HAIR",
    description: "Tailored haircut customized to face silhouette, hair density, and personal vibe. Includes scalp wash, conditioning & blow-dry styling.",
    duration: "45 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "UNISEX",
    tags: ["Haircut", "Styling", "Signature"]
  },
  {
    id: "h2",
    name: "Balayage & Dimensional Highlights",
    category: "HAIR",
    description: "Freehand hand-painted balayage or foil highlights creating seamless, sun-kissed dimension with premium Olaplex hair bond protection.",
    duration: "120 - 180 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "UNISEX",
    tags: ["Balayage", "Colour", "Trending"]
  },
  {
    id: "h3",
    name: "Global Hair Colouring & Glossing",
    category: "HAIR",
    description: "Rich ammonia-free root touchup or global tone enhancement yielding glossy, multi-reflective sheen and 100% grey coverage.",
    duration: "60 mins",
    price: "Contact us for current pricing",
    popular: false,
    forGender: "UNISEX",
    tags: ["Global Colour", "Grey Coverage"]
  },
  {
    id: "h4",
    name: "Keratin Smooth & Anti-Frizz Therapy",
    category: "HAIR",
    description: "Deep protein rebuilding treatment that eliminates stubborn humidity frizz, softens texture, and delivers effortless mirror shine for up to 4 months.",
    duration: "150 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "UNISEX",
    tags: ["Keratin", "Smoothing", "Frizz Control"]
  },
  {
    id: "h5",
    name: "Cysteine Hair Protein Reconstruction",
    category: "HAIR",
    description: "Formaldehyde-free natural amino acid protein infusion designed to restore elasticity and natural hair smoothness.",
    duration: "120 mins",
    price: "Price on consultation",
    popular: false,
    forGender: "UNISEX",
    tags: ["Cysteine", "Hair Health"]
  },
  {
    id: "h6",
    name: "Luxury Organic Hair Spa & Scalp Detox",
    category: "HAIR",
    description: "Nourishing scalp massage, essential oil steam therapy, and deep conditioning mask designed to revive dry, stressed tresses.",
    duration: "60 mins",
    price: "Contact us for current pricing",
    popular: true,
    forGender: "UNISEX",
    tags: ["Hair Spa", "Scalp Care", "Relaxation"]
  },

  // SKIN & FACIALS
  {
    id: "s1",
    name: "Hydra-Radiance Medical Facial",
    category: "SKIN",
    description: "Multi-step deep pore vacuum extraction, gentle lactic exfoliation, and intense hyaluronic hydration infusion for instantaneous glow.",
    duration: "60 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "UNISEX",
    tags: ["Hydra Facial", "Glow", "Best Seller"]
  },
  {
    id: "s2",
    name: "O2 Detox & Oxygen Skin Therapy",
    category: "SKIN",
    description: "Hyperbaric oxygen pressurization with localized vitamin serums to counteract Koregaon Park urban pollution and brighten dull tone.",
    duration: "60 mins",
    price: "Contact us for current pricing",
    popular: false,
    forGender: "UNISEX",
    tags: ["Oxygen Facial", "Anti-Pollution"]
  },
  {
    id: "s3",
    name: "Organic Honey & Gold Radiance Polish",
    category: "SKIN",
    description: "Luxurious skin brightening facial with micro-fine 24k gold leaf particles and botanical skin soothing extracts.",
    duration: "75 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "WOMEN",
    tags: ["Gold Facial", "Bridal Glow"]
  },
  {
    id: "s4",
    name: "Silk Liposoluble Waxing & Threading",
    category: "SKIN",
    description: "Gentle, low-temperature Italian wax formulated for sensitive skin types along with precision facial contour threading.",
    duration: "30 - 60 mins",
    price: "Contact us for current pricing",
    popular: false,
    forGender: "WOMEN",
    tags: ["Waxing", "Threading", "Essential"]
  },

  // MAKEUP
  {
    id: "m1",
    name: "High-Definition Airbrush Makeup",
    category: "MAKEUP",
    description: "Weightless 18-hour waterproof airbrush foundation application for flawless camera-ready high definition finish.",
    duration: "90 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "WOMEN",
    tags: ["HD Makeup", "Airbrush", "Events"]
  },
  {
    id: "m2",
    name: "Soft Glam & Evening Soirée Makeup",
    category: "MAKEUP",
    description: "Subtle luminous skin base, customized mink lashes, and defined eyes for dinner, cocktail parties, and festive celebrations.",
    duration: "60 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "WOMEN",
    tags: ["Soft Glam", "Party Makeup"]
  },

  // GROOMING (GENTS & UNISEX)
  {
    id: "g1",
    name: "Executive Beard Design & Hot Towel Shave",
    category: "GROOMING",
    description: "Precision beard sculpt, razor edge detail, organic beard oil conditioning, and soothing hot towel facial compress.",
    duration: "30 mins",
    price: "Contact us for current pricing",
    popular: true,
    forGender: "MEN",
    tags: ["Beard Sculpt", "Hot Towel", "Men's Special"]
  },
  {
    id: "g2",
    name: "Gentleman’s Scalp Detox & Fade Cut",
    category: "GROOMING",
    description: "Customized fade or classic taper cut combined with invigorating peppermint scalp scrub and styling finish.",
    duration: "45 mins",
    price: "Contact us for current pricing",
    popular: true,
    forGender: "MEN",
    tags: ["Fade Cut", "Men's Haircut"]
  },
  {
    id: "g3",
    name: "Luxury Pedicure & Manicure Care",
    category: "GROOMING",
    description: "Exfoliating sea salt scrub, cuticle care, deep heel softening treatment, and therapeutic foot & hand pressure massage.",
    duration: "60 mins",
    price: "Contact us for current pricing",
    popular: false,
    forGender: "UNISEX",
    tags: ["Pedicure", "Manicure", "Nails"]
  },

  // BRIDAL
  {
    id: "b1",
    name: "The H2O Royal Bridal Experience",
    category: "BRIDAL",
    description: "Comprehensive bridal transformation including consultation, trial session, HD/Airbrush makeup, saree draping, hair design, & body polish.",
    duration: "240 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "WOMEN",
    tags: ["Bridal Package", "Wedding", "Vip"]
  },
  {
    id: "b2",
    name: "Groom Wedding Day Styling Suite",
    category: "BRIDAL",
    description: "Complete wedding day hair sculpting, skin radiance glow, beard detailing, and subtle touch-ups for the modern Indian groom.",
    duration: "90 mins",
    price: "Price on consultation",
    popular: false,
    forGender: "MEN",
    tags: ["Groom Package", "Wedding"]
  },

  // TREATMENTS
  {
    id: "t1",
    name: "Olaplex Bond Repair & Intensive Reconstruct",
    category: "TREATMENTS",
    description: "Patented molecular bond-building treatment that heals bleached, heat-damaged, or chemically stressed hair from within.",
    duration: "45 mins",
    price: "Price on consultation",
    popular: true,
    forGender: "UNISEX",
    tags: ["Olaplex", "Hair Repair"]
  },
  {
    id: "t2",
    name: "Anti-Dandruff Scalp Balancing Cure",
    category: "TREATMENTS",
    description: "Targeted clinical scalp treatment formulated to eliminate flaking, restore microbiome balance, and relieve scalp itchiness.",
    duration: "50 mins",
    price: "Contact us for current pricing",
    popular: false,
    forGender: "UNISEX",
    tags: ["Scalp Care", "Anti-Dandruff"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal1",
    title: "Dimensional Honey Balayage & Silk Blowout",
    category: "COLOUR",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    description: "Hand-crafted warm blonde balayage with seamless melt transitions created at H2O Koregaon Park."
  },
  {
    id: "gal2",
    title: "Precision Men's Fade & Textured Top",
    category: "HAIR",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80",
    description: "Clean skin fade with sharp razor outline and textured crown styling."
  },
  {
    id: "gal3",
    title: "Royal Indian Bridal Glow & Hair Artistry",
    category: "BRIDAL",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
    description: "Luminous airbrush makeup and traditional floral hair adornment for a Koregaon Park bride."
  },
  {
    id: "gal4",
    title: "Sleek Keratin Glass Hair Finish",
    category: "HAIR",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
    description: "Silky, mirror-shine finish achieved following our customized Keratin smoothness treatment."
  },
  {
    id: "gal5",
    title: "Editorial Evening Glam & Smoky Eye Accent",
    category: "MAKEUP",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80",
    description: "Sophisticated cocktail soirée makeup with nude velvet lips and defined lashes."
  },
  {
    id: "gal6",
    title: "H2O Luxury Styling Stations & Ambience",
    category: "SALON",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
    description: "Serene interior lighting and ergonomic luxury chairs designed for comfort."
  },
  {
    id: "gal7",
    title: "Caramel Highlights & Soft Beach Waves",
    category: "COLOUR",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
    description: "Muted warm caramel tone dimension tailored for Indian hair texture."
  },
  {
    id: "gal8",
    title: "HydraFacial Dewy Skin Glow",
    category: "DETAILS",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
    description: "Ultra-hydrated, plump skin texture following deep oxygen facial therapy."
  }
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: "ba1",
    title: "Brittle Frizzy Hair → Mirror Silk Balayage",
    category: "COLOUR",
    beforeImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80",
    afterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    treatmentName: "Dimensional Balayage + Olaplex Bond Builder",
    description: "Transformed uneven brassy tones and dryness into seamless, silky dimensional caramel highlights."
  },
  {
    id: "ba2",
    title: "Humidity Frizz → Ultra-Sleek Keratin Glass Hair",
    category: "HAIR",
    beforeImage: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",
    afterImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
    treatmentName: "Pro-Keratin Smooth & Seal Therapy",
    description: "Eliminated 95% curl frizz while retaining natural movement and softness."
  },
  {
    id: "ba3",
    title: "Dull Stressed Skin → Dewy Hydra-Glow",
    category: "SKIN",
    beforeImage: "https://images.unsplash.com/photo-1512290900673-0eb9a55280c4?auto=format&fit=crop&w=900&q=80",
    afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    treatmentName: "Hydra-Radiance Detox Facial",
    description: "Exfoliated dead skin buildup and restored natural moisture barrier for intense clarity."
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: "r1",
    author: "Ananya Deshmukh",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "H2O in Koregaon Park is by far the best salon experience in Pune! I got a balayage done here and the stylist was super attentive to detail. The atmosphere feels so peaceful and luxurious. Highly recommended!",
    serviceMentioned: "Balayage & Hair Styling",
    verified: true
  },
  {
    id: "r2",
    author: "Rohan Kulkarni",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Very professional grooming service for men. The beard trim and hot towel massage were top-notch. Cleanliness and hygiene are maintained meticulously. Lane 6 location is super convenient.",
    serviceMentioned: "Executive Beard Design & Haircut",
    verified: true
  },
  {
    id: "r3",
    author: "Pooja Mehta",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Booked my bridal makeup and hair trials at H2O. The airbrush makeup stayed flawless all evening without feeling heavy. Everyone complimented my look! Thank you team H2O!",
    serviceMentioned: "Royal Bridal Experience",
    verified: true
  },
  {
    id: "r4",
    author: "Siddharth Verma",
    rating: 4,
    timeAgo: "1 month ago",
    text: "Great atmosphere in Meera Nagar! Staff is polite and skilled. My go-to place for haircuts whenever I'm in Koregaon Park.",
    serviceMentioned: "Gentleman's Fade Cut",
    verified: true
  },
  {
    id: "r5",
    author: "Kavita Rao",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Did the HydraFacial before an event. The results were instantly visible! Skin felt soft, hydrated and brightened. Worth every rupee.",
    serviceMentioned: "Hydra-Radiance Facial",
    verified: true
  }
];

export const INITIAL_OFFERS: OfferItem[] = [
  {
    id: "off1",
    title: "Mid-Week Pamper Ritual",
    subtitle: "Monday to Thursday Exclusive",
    description: "Complimentary Scalp Detox Steam with any Couture Haircut or Global Colour session.",
    validity: "Valid Mon – Thu | By Reservation",
    badge: "FEATURED",
    active: true,
    code: "H2O-MIDWEEK"
  },
  {
    id: "off2",
    title: "Koregaon Park Bridal Suite Pass",
    subtitle: "Wedding Season Special",
    description: "Complimentary pre-wedding HydraFacial consultation when reserving complete Bridal & Family packages.",
    validity: "Limited Availability",
    badge: "BRIDAL SPECIAL",
    active: true,
    code: "H2O-BRIDE"
  }
];
