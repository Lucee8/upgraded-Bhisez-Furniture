import { Product } from './types';
import { CUSTOM_PRODUCTS, PRODUCT_OVERRIDES } from './custom_products';
import { PRODUCT_DESCRIPTIONS } from './product_descriptions';
import { getCsvSpecs } from './csv_pricing';

export interface SubCategory {
  name: string;
  count: number;
  slug: string;
  basePrice: number;
}

export interface CategoryData {
  name: string;
  slug: string;
  img: string;
  subCategories: SubCategory[];
  promoTitle: string;
  promoOffer: string;
}

export const CATEGORY_MAP: CategoryData[] = [
  {
    name: "DOOR FRAMES",
    slug: "door-frames",
    img: "/images/DOOR AND FRAMES/set 01.webP",
    subCategories: [
      { name: "Set", count: 33, slug: "set", basePrice: 14500 },
      { name: "Mandir room", count: 16, slug: "mandir-room", basePrice: 9500 },
      { name: "Door", count: 10, slug: "door", basePrice: 11000 },
      { name: "Cristian Door", count: 2, slug: "christian-door", basePrice: 16000 },
      { name: "Frame", count: 3, slug: "frame", basePrice: 6500 }
    ],
    promoTitle: "Traditional Safety Portals",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "WOODEN SOFAS",
    slug: "wooden-sofas",
    img: "/images/SOFA/sofa 01.webP",
    subCategories: [
      { name: "Sofa", count: 15, slug: "sofa", basePrice: 22000 }
    ],
    promoTitle: "Hand-Carved Living Comfort",
    promoOffer: "Upto 45% Off"
  },
  {
    name: "WOODEN CHAIRS",
    slug: "wooden-chairs",
    img: "/images/CHAIR/chair 01.webP",
    subCategories: [
      { name: "cane rocking chair", count: 1, slug: "cane-rocking-chair", basePrice: 8500 },
      { name: "rocking chair", count: 1, slug: "rocking-chair", basePrice: 7500 },
      { name: "royal chair", count: 1, slug: "royal-chair", basePrice: 5800 },
      { name: "aaram chair", count: 1, slug: "aaram-chair", basePrice: 6500 },
      { name: "curve chair", count: 1, slug: "curve-chair", basePrice: 4200 },
      { name: "z chair", count: 1, slug: "z-chair", basePrice: 4800 },
      { name: "chair", count: 8, slug: "chair", basePrice: 3200 },
      { name: "teacher chair", count: 2, slug: "teacher-chair", basePrice: 3800 }
    ],
    promoTitle: "Ergonomic Handcrafted Hardwood Chairs",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "BEDS",
    slug: "beds",
    img: "/images/BED/open bed 01.webP",
    subCategories: [
      { name: "premium bed", count: 4, slug: "premium-bed", basePrice: 42000 },
      { name: "open bed", count: 11, slug: "open-bed", basePrice: 24000 },
      { name: "floating bed", count: 1, slug: "floating-bed", basePrice: 32000 },
      { name: "box bed", count: 4, slug: "box-bed", basePrice: 27500 },
      { name: "trolley bed", count: 13, slug: "trolley-bed", basePrice: 34500 },
      { name: "poster bed", count: 1, slug: "poster-bed", basePrice: 48000 },
      { name: "bunk bed", count: 1, slug: "bunk-bed", basePrice: 29500 },
      { name: "hydrolic bed", count: 1, slug: "hydraulic-bed", basePrice: 41000 }
    ],
    promoTitle: "Durable Teakwood Beds",
    promoOffer: "Upto 40% Off"
  },
  {
    name: "DRESSING TABLE",
    slug: "dressing-table",
    img: "/images/DRESSING TABLE/dressing table 01.webP",
    subCategories: [
      { name: "DT", count: 5, slug: "dt", basePrice: 11000 }
    ],
    promoTitle: "Royal Teak Vanity Dressers",
    promoOffer: "Upto 30% Off"
  },
  {
    name: "WOODEN SWINGS",
    slug: "wooden-swings",
    img: "/images/SWING/swing 01.webP",
    subCategories: [
      { name: "Swing", count: 8, slug: "swing", basePrice: 18500 }
    ],
    promoTitle: "Solid Timber Courtyard Jhulas",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "WOODEN SAFETY DOORS",
    slug: "wooden-safety-doors",
    img: "/images/DOOR AND FRAMES/safety door 01.webP",
    subCategories: [
      { name: "Safety doors", count: 6, slug: "safety-doors", basePrice: 15500 }
    ],
    promoTitle: "Carved Hardwood Main Security Gates",
    promoOffer: "Upto 25% Off"
  },
  {
    name: "WOODEN MANDIRS",
    slug: "wooden-mandirs",
    img: "/images/MANDIR/mandir 01.webP",
    subCategories: [
      { name: "Mandir", count: 35, slug: "mandir", basePrice: 13000 },
      { name: "Rajasans", count: 14, slug: "rajasans", basePrice: 3800 },
      { name: "Pooja Mandir", count: 9, slug: "pooja-mandir", basePrice: 8500 }
    ],
    promoTitle: "Devine solid Rosewood Shrines",
    promoOffer: "Upto 50% Off"
  },
  {
    name: "TEAPOYS AND COFEE TABLES",
    slug: "teapoys-coffee-tables",
    img: "/images/TEAPOY/teapoy 01.webP",
    subCategories: [
      { name: "Teapoy", count: 17, slug: "teapoy", basePrice: 5800 }
    ],
    promoTitle: "Contemporary Living Teapoys",
    promoOffer: "Upto 30% Off"
  },
  {
    name: "SOFA CUM BEDS",
    slug: "sofa-cum-beds",
    img: "/images/SOFA/sofa cum bed 01.webP",
    subCategories: [
      { name: "Sofa cum Beds", count: 9, slug: "sofa-cum-beds", basePrice: 21500 }
    ],
    promoTitle: "Space-Saving Modern Sliders",
    promoOffer: "Upto 45% Off"
  },
  {
    name: "DINING TABLES",
    slug: "dining-tables",
    img: "/images/DINING/dining 01.webP",
    subCategories: [
      { name: "Dining", count: 9, slug: "dining", basePrice: 29000 }
    ],
    promoTitle: "Premium 6-Seater Banquet Sets",
    promoOffer: "Upto 40% Off"
  },
  {
    name: "WARDROBES",
    slug: "wardrobes",
    img: "/images/WARDROBE/wardrobe 01.webP",
    subCategories: [
      { name: "Wardrobe", count: 12, slug: "wardrobe", basePrice: 31000 }
    ],
    promoTitle: "Multi-Compartment Wooden Armoires",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "T.V UNITS",
    slug: "tv-units",
    img: "/images/TV UNIT/tv unit 01.webP",
    subCategories: [
      { name: "T.V Unit", count: 7, slug: "tv-unit", basePrice: 14500 }
    ],
    promoTitle: "Floating Entertainment Credenzas",
    promoOffer: "Upto 35% Off"
  },
  {
    name: "CHAURANG And PAATS",
    slug: "chaurang-and-paats",
    img: "/images/CHAURANG AND PATH/chaurang 01.webP",
    subCategories: [
      { name: "CHAURANG", count: 5, slug: "chaurang", basePrice: 2800 }
    ],
    promoTitle: "Aesthetic Pooja Worship Pedestals",
    promoOffer: "Upto 20% Off"
  },
  {
    name: "DIWANS",
    slug: "diwans",
    img: "/images/DIWAN/open diwan.webP",
    subCategories: [
      { name: "Open Diwan", count: 1, slug: "open-diwan", basePrice: 16500 },
      { name: "Box Diwan", count: 1, slug: "box-diwan", basePrice: 21000 },
      { name: "Trolley Diwan", count: 1, slug: "trolley-diwan", basePrice: 24500 },
      { name: "Bhaiyya Khat", count: 1, slug: "bhaiyya-khat", basePrice: 14000 }
    ],
    promoTitle: "Royal Indian Lounge Daybeds",
    promoOffer: "Upto 30% Off"
  }
];

// ── ALL LOCAL IMAGE MAPS ──
// Folder names exactly match public/images/ as seen in VS Code explorer:
// BED, CHAIR, CHAURANG AND PATH, DINING, DIWAN,
// DOOR AND FRAMES, DRESSING TABLE, MANDIR,
// SOFA, SWING, TEAPOY, TV UNIT, WARDROBE

const LOCAL_IMAGES: Record<string, string[]> = {

  // ── BED ──
  "beds-premium-bed": [
    "/images/BED/premium bed 01.webP",
    "/images/BED/premium bed 02.webP",
    "/images/BED/premium bed 03.webP",
    "/images/BED/premium bed 04.webP",
  ],
  "beds-open-bed": [
    "/images/BED/open bed 01.webP",
    "/images/BED/open bed 02.webP",
    "/images/BED/open bed 03.webP",
    "/images/BED/open bed 04.webP",
    "/images/BED/open bed 05.webP",
    "/images/BED/open bed 06.webP",
    "/images/BED/open bed 07.webP",
    "/images/BED/open bed 08.webP",
    "/images/BED/open bed 09.webP",
    "/images/BED/open bed 10.webP",
    "/images/BED/open bed 11.webP",
  ],
  "beds-floating-bed": [
    "/images/BED/floating bed.webP",
  ],
  "beds-box-bed": [
    "/images/BED/box bed 01.webP",
    "/images/BED/box bed 02.webP",
    "/images/BED/box bed 03.webP",
    "/images/BED/box bed 04.webP",
  ],
  "beds-trolley-bed": [
    "/images/BED/trolley bed 01.webP",
    "/images/BED/trolley bed 02.webP",
    "/images/BED/trolley bed 03.webP",
    "/images/BED/trolley bed 04.webP",
    "/images/BED/trolley bed 05.webP",
    "/images/BED/trolley bed 06.webP",
    "/images/BED/trolley bed 07.webP",
    "/images/BED/trolley bed 08.webP",
    "/images/BED/trolley bed 09.webP",
    "/images/BED/trolley bed 10.webP",
    "/images/BED/trolley bed 11.webP",
    "/images/BED/trolley bed 12.webP",
    "/images/BED/trolley bed 13.webP",
  ],
  "beds-poster-bed": [
    "/images/BED/poster bed.webP",
  ],
  "beds-bunk-bed": [
    "/images/BED/bunk bed 01.webP",
  ],
  "beds-hydraulic-bed": [
    "/images/BED/hydrolic bed 01.webP",
  ],

  // ── CHAIR ──
  "wooden-chairs-cane-rocking-chair": [
    "/images/CHAIR/cane rocking chair.webP",
  ],
  "wooden-chairs-rocking-chair": [
    "/images/CHAIR/cane rocking chair.webP",
  ],
  "wooden-chairs-royal-chair": [
    "/images/CHAIR/royal chair 01.webP",
  ],
  "wooden-chairs-aaram-chair": [
    "/images/CHAIR/aaram chair 01.webP",
  ],
  "wooden-chairs-curve-chair": [
    "/images/CHAIR/curve chair 01.webP",
  ],
  "wooden-chairs-z-chair": [
    "/images/CHAIR/z chair.webP",
  ],
  "wooden-chairs-chair": [
    "/images/CHAIR/chair 01.webP",
    "/images/CHAIR/chair 02.webP",
    "/images/CHAIR/chair 03.webP",
    "/images/CHAIR/chair 04.webP",
    "/images/CHAIR/chair 05.webP",
    "/images/CHAIR/chair 06.webP",
    "/images/CHAIR/chair 07.webP",
    "/images/CHAIR/chair 08.webP",
  ],
  "wooden-chairs-teacher-chair": [
    "/images/CHAIR/teacher chair 01.webP",
    "/images/CHAIR/teacher chair 02.webP",
  ],

  // ── DOOR AND FRAMES ──
  "door-frames-set": [
    "/images/DOOR AND FRAMES/set 01.webP",
    "/images/DOOR AND FRAMES/set 02.webP",
    "/images/DOOR AND FRAMES/set 03.webP",
    "/images/DOOR AND FRAMES/set 04.webP",
    "/images/DOOR AND FRAMES/set 05.webP",
    "/images/DOOR AND FRAMES/set 06.webP",
    "/images/DOOR AND FRAMES/set 07.webP",
    "/images/DOOR AND FRAMES/set 08.webP",
    "/images/DOOR AND FRAMES/set 09.webP",
    "/images/DOOR AND FRAMES/set 10.webP",
    "/images/DOOR AND FRAMES/set 11.webP",
    "/images/DOOR AND FRAMES/set 12.webP",
    "/images/DOOR AND FRAMES/set 13.webP",
    "/images/DOOR AND FRAMES/set 14.webP",
    "/images/DOOR AND FRAMES/set 15.webP",
    "/images/DOOR AND FRAMES/set 16.webP",
    "/images/DOOR AND FRAMES/set 17.webP",
    "/images/DOOR AND FRAMES/set 18.webP",
    "/images/DOOR AND FRAMES/set 19.webP",
    "/images/DOOR AND FRAMES/set 20.webP",
    "/images/DOOR AND FRAMES/set 21.webP",
    "/images/DOOR AND FRAMES/set 22.webP",
    "/images/DOOR AND FRAMES/set 23.webP",
    "/images/DOOR AND FRAMES/set 24.webP",
    "/images/DOOR AND FRAMES/set 25.webP",
    "/images/DOOR AND FRAMES/set 26.webP",
    "/images/DOOR AND FRAMES/set 27.webP",
    "/images/DOOR AND FRAMES/set 28.webP",
    "/images/DOOR AND FRAMES/set 29.webP",
    "/images/DOOR AND FRAMES/set 30.webP",
    "/images/DOOR AND FRAMES/set 31.webP",
    "/images/DOOR AND FRAMES/set 32.webP",
    "/images/DOOR AND FRAMES/set 33.webP"
  ],
  "door-frames-mandir-room": [
    "/images/DOOR AND FRAMES/mandir 01.webP",
    "/images/DOOR AND FRAMES/mandir 02.webP",
    "/images/DOOR AND FRAMES/mandir 03.webP",
    "/images/DOOR AND FRAMES/mandir 04.webP",
    "/images/DOOR AND FRAMES/mandir 05.webP",
    "/images/DOOR AND FRAMES/mandir 06.webP",
    "/images/DOOR AND FRAMES/mandir 07.webP",
    "/images/DOOR AND FRAMES/mandir 08.webP",
    "/images/DOOR AND FRAMES/mandir 09.webP",
    "/images/DOOR AND FRAMES/mandir 10.webP",
    "/images/DOOR AND FRAMES/mandir 11.webP",
    "/images/DOOR AND FRAMES/mandir 12.webP",
    "/images/DOOR AND FRAMES/mandir 13.webP",
    "/images/DOOR AND FRAMES/mandir 14.webP",
    "/images/DOOR AND FRAMES/mandir 15.webP",
    "/images/DOOR AND FRAMES/mandir 16.webP"
  ],
  "door-frames-door": [
    "/images/DOOR AND FRAMES/door 01.webP",
    "/images/DOOR AND FRAMES/door 02.webP",
    "/images/DOOR AND FRAMES/door 03.webP",
    "/images/DOOR AND FRAMES/door 04.webP",
    "/images/DOOR AND FRAMES/door 05.webP",
    "/images/DOOR AND FRAMES/door 06.webP",
    "/images/DOOR AND FRAMES/door 07.webP",
    "/images/DOOR AND FRAMES/door 08.webP",
    "/images/DOOR AND FRAMES/door 09.webP",
    "/images/DOOR AND FRAMES/door 10.webP"
  ],
  "door-frames-christian-door": [
    "/images/DOOR AND FRAMES/christian 01.webP",
    "/images/DOOR AND FRAMES/christian 02.webP",
  ],
  "door-frames-frame": [
    "/images/DOOR AND FRAMES/frame 01.webP",
    "/images/DOOR AND FRAMES/frame 02.webP",
    "/images/DOOR AND FRAMES/frame 03.webP",
  ],

  // ── WOODEN SAFETY DOORS (inside DOOR AND FRAMES folder) ──
  "wooden-safety-doors-safety-doors": [
    "/images/DOOR AND FRAMES/safety door 01.webP",
    "/images/DOOR AND FRAMES/safety door 02.webP",
    "/images/DOOR AND FRAMES/safety door 03.webP",
    "/images/DOOR AND FRAMES/safety door 04.webP",
    "/images/DOOR AND FRAMES/safety door 05.webP",
    "/images/DOOR AND FRAMES/safety door 06.webP"
  ],

  // ── DRESSING TABLE ──
  "dressing-table-dt": [
    "/images/DRESSING TABLE/dressing table 01.webP",
    "/images/DRESSING TABLE/dressing table 02.webP",
    "/images/DRESSING TABLE/dressing table 03.webP",
    "/images/DRESSING TABLE/dressing table 04.webP",
    "/images/DRESSING TABLE/dressing table 05.webP"
  ],

  // ── SWING ──
  "wooden-swings-swing": [
    "/images/SWING/swing 01.webP",
    "/images/SWING/swing 02.webP",
    "/images/SWING/swing 03.webP",
    "/images/SWING/swing 04.webP",
    "/images/SWING/swing 05.webP",
    "/images/SWING/swing 06.webP",
    "/images/SWING/swing 07.webP",
    "/images/SWING/swing 08.webP"
  ],

  // ── MANDIR ──
  "wooden-mandirs-mandir": [
    "/images/MANDIR/mandir 01.webP",
    "/images/MANDIR/mandir 02.webP",
    "/images/MANDIR/mandir 03.webP",
    "/images/MANDIR/mandir 04.webP",
    "/images/MANDIR/mandir 05.webP",
    "/images/MANDIR/mandir 06.webP",
    "/images/MANDIR/mandir 07.webP",
    "/images/MANDIR/mandir 08.webP",
    "/images/MANDIR/mandir 09.webP",
    "/images/MANDIR/mandir 10.webP",
    "/images/MANDIR/mandir 11.webP",
    "/images/MANDIR/mandir 12.webP",
    "/images/MANDIR/mandir 13.webP",
    "/images/MANDIR/mandir 14.webP",
    "/images/MANDIR/mandir 15.webP",
    "/images/MANDIR/mandir 16.webP",
    "/images/MANDIR/mandir 17.webP",
    "/images/MANDIR/mandir 18.webP",
    "/images/MANDIR/mandir 19.webP",
    "/images/MANDIR/mandir 20.webP",
    "/images/MANDIR/mandir 21.webP",
    "/images/MANDIR/mandir 22.webP",
    "/images/MANDIR/mandir 23.webP",
    "/images/MANDIR/mandir 24.webP",
    "/images/MANDIR/mandir 25.webP",
    "/images/MANDIR/mandir 26.webP",
    "/images/MANDIR/mandir 27.webP",
    "/images/MANDIR/mandir 28.webP",
    "/images/MANDIR/mandir 29.webP",
    "/images/MANDIR/mandir 30.webP",
    "/images/MANDIR/mandir 31.webP",
    "/images/MANDIR/mandir 32.webP",
    "/images/MANDIR/mandir 33.webP",
    "/images/MANDIR/mandir 34.webP",
    "/images/MANDIR/mandir 35.webP"
  ],
  "wooden-mandirs-rajasans": [
    "/images/MANDIR/Rajasan 01.webP",
    "/images/MANDIR/Rajasan 02.webP",
    "/images/MANDIR/Rajasan 03.webP",
    "/images/MANDIR/Rajasan 04.webP",
    "/images/MANDIR/Rajasan 05.webP",
    "/images/MANDIR/Rajasan 06.webP",
    "/images/MANDIR/Rajasan 07.webP",
    "/images/MANDIR/Rajasan 08.webP",
    "/images/MANDIR/Rajasan 09.webP",
    "/images/MANDIR/Rajasan 10.webP",
    "/images/MANDIR/Rajasan 11.webP",
    "/images/MANDIR/Rajasan 12.webP",
    "/images/MANDIR/Rajasan 13.webP",
    "/images/MANDIR/Rajasan 14.webP"
  ],
  "wooden-mandirs-pooja-mandir": [
    "/images/MANDIR/Pooja mandir 01.webP",
    "/images/MANDIR/Pooja mandir 02.webP",
    "/images/MANDIR/Pooja mandir 03.webP",
    "/images/MANDIR/Pooja mandir 04.webP",
    "/images/MANDIR/Pooja mandir 05.webP",
    "/images/MANDIR/Pooja mandir 06.webP",
    "/images/MANDIR/Pooja mandir 07.webP",
    "/images/MANDIR/Pooja mandir 08.webP",
    "/images/MANDIR/Pooja mandir 09.webP"
  ],

  // ── TEAPOY ──
  "teapoys-coffee-tables-teapoy": [
    "/images/TEAPOY/teapoy 01.webP",
    "/images/TEAPOY/teapoy 02.webP",
    "/images/TEAPOY/teapoy 03.webP",
    "/images/TEAPOY/teapoy 04.webP",
    "/images/TEAPOY/teapoy 05.webP",
    "/images/TEAPOY/teapoy 06.webP",
    "/images/TEAPOY/teapoy 07.webP",
    "/images/TEAPOY/teapoy 08.webP",
    "/images/TEAPOY/teapoy 09.webP",
    "/images/TEAPOY/teapoy 10.webP",
    "/images/TEAPOY/teapoy 11.webP",
    "/images/TEAPOY/teapoy 12.webP",
    "/images/TEAPOY/teapoy 13.webP",
    "/images/TEAPOY/teapoy 14.webP",
    "/images/TEAPOY/teapoy 15.webP",
    "/images/TEAPOY/teapoy 16.webP",
    "/images/TEAPOY/teapoy 17.webP"
  ],

  // ── SOFA ──
  "wooden-sofas-sofa": [
    "/images/SOFA/sofa 01.webP",
    "/images/SOFA/sofa 02.webP",
    "/images/SOFA/sofa 03.webP",
    "/images/SOFA/sofa 04.webP",
    "/images/SOFA/sofa 05.webP",
    "/images/SOFA/sofa 06.webP",
    "/images/SOFA/sofa 07.webP",
    "/images/SOFA/sofa 08.webP",
    "/images/SOFA/sofa 09.webP",
    "/images/SOFA/sofa 10.webP",
    "/images/SOFA/sofa 11.webP",
    "/images/SOFA/sofa 12.webP",
    "/images/SOFA/sofa 13.webP",
    "/images/SOFA/sofa 14.webP",
    "/images/SOFA/sofa 15.webP"
  ],
  "sofa-cum-beds-sofa-cum-beds": [
    "/images/SOFA/sofa cum bed 01.webP",
    "/images/SOFA/sofa cum bed 02.webP",
    "/images/SOFA/sofa cum bed 03.webP",
    "/images/SOFA/sofa cum bed 04.webP",
    "/images/SOFA/sofa cum bed 05.webP",
    "/images/SOFA/sofa cum bed 06.webP",
    "/images/SOFA/sofa cum bed 07.webP",
    "/images/SOFA/sofa cum bed 08.webP",
    "/images/SOFA/sofa cum bed 09.webP"
  ],

  // ── DINING ──
  "dining-tables-dining": [
    "/images/DINING/dining 01.webP",
    "/images/DINING/dining 02.webP",
    "/images/DINING/dining 03.webP",
    "/images/DINING/dining 04.webP",
    "/images/DINING/dining 05.webP",
    "/images/DINING/dining 06.webP",
    "/images/DINING/dining 07.webP",
    "/images/DINING/dining 08.webP",
    "/images/DINING/dining 09.webP"
  ],

  // ── WARDROBE ──
  "wardrobes-wardrobe": [
    "/images/WARDROBE/wardrobe 01.webP",
    "/images/WARDROBE/wardrobe 02.webP",
    "/images/WARDROBE/wardrobe 03.webP",
    "/images/WARDROBE/wardrobe 04.webP",
    "/images/WARDROBE/wardrobe 05.webP",
    "/images/WARDROBE/wardrobe 06.webP",
    "/images/WARDROBE/wardrobe 07.webP",
    "/images/WARDROBE/wardrobe 08.webP",
    "/images/WARDROBE/wardrobe 09.webP",
    "/images/WARDROBE/wardrobe 10.webP",
    "/images/WARDROBE/wardrobe 11.webP",
    "/images/WARDROBE/wardrobe 12.webP"
  ],

  // ── TV UNIT ──
  "tv-units-tv-unit": [
    "/images/TV UNIT/tv unit 01.webP",
    "/images/TV UNIT/tv unit 02.webP",
    "/images/TV UNIT/tv unit 03.webP",
    "/images/TV UNIT/tv unit 04.webP",
    "/images/TV UNIT/tv unit 05.webP",
    "/images/TV UNIT/tv unit 06.webP",
    "/images/TV UNIT/tv unit 07.webP"
  ],

  // ── CHAURANG AND PATH ──
  "chaurang-and-paats-chaurang": [
    "/images/CHAURANG AND PATH/chaurang 01.webP",
    "/images/CHAURANG AND PATH/chaurang 02.webP",
    "/images/CHAURANG AND PATH/chaurang 03.webP",
    "/images/CHAURANG AND PATH/chaurang 04.webP",
    "/images/CHAURANG AND PATH/chaurang 05.webP"
  ],

  // ── DIWAN ──
  "diwans-open-diwan":    ["/images/DIWAN/open diwan.webP"],
  "diwans-box-diwan":     ["/images/DIWAN/box diwan.webP"],
  "diwans-trolley-diwan": ["/images/DIWAN/trolley diwan.webP"],
  "diwans-bhaiyya-khat":  ["/images/DIWAN/bhaiyya khat.webP"],
};

const getCategoryDefaults = (categorySlug: string) => {
  const FINISHES = [
    { name: 'Amber Walnut', color: '#c9a87c' },
    { name: 'Danish Walnut', color: '#5a3e28' },
    { name: 'Teak Brown', color: '#7a5230' }
  ];

  if (categorySlug === 'beds') {
    return {
      seriesName: "seasoned hardwood series",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Dimensions / Bed Sizing",
      sizesList: ["King Size", "Queen Size"],
      finishesLabel: "Hardwood Finish / Seal",
      finishesList: FINISHES,
      optionsLabel: "Underbed storage options",
      optionsList: ["Hydraulic Storage", "Non Storage"],
      priceRules: {
        sizeAdjustments: { "King Size": 0, "Queen Size": -5000 },
        origSizeAdjustments: { "King Size": 0, "Queen Size": -8000 },
        optionAdjustments: { "Hydraulic Storage": 0, "Non Storage": -10000 },
        origOptionAdjustments: { "Hydraulic Storage": 0, "Non Storage": -14000 }
      },
      deliverySubtext: "Includes free local white-glove installation & GST invoice."
    };
  }

  if (categorySlug === 'wooden-sofas' || categorySlug === 'sofa-cum-beds') {
    return {
      seriesName: "modular lounge series",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Seating Capacity / Lounge Sizing",
      sizesList: ["3 Seater", "2 Seater", "1 Seater"],
      finishesLabel: "Wood Finish & Polish",
      finishesList: [
        { name: 'Honey Teak', color: '#b98c5c' },
        { name: 'Dark Mahogany', color: '#4a2e1b' },
        { name: 'Teak Brown', color: '#7a5230' }
      ],
      optionsLabel: "Cushion Density Mode",
      optionsList: ["Ultra-density Foam", "Standard Tufted Classic"],
      priceRules: {
        sizeAdjustments: { "3 Seater": 0, "2 Seater": -4000, "1 Seater": -8000 },
        origSizeAdjustments: { "3 Seater": 0, "2 Seater": -6000, "1 Seater": -11000 },
        optionAdjustments: { "Ultra-density Foam": 0, "Standard Tufted Classic": -2000 },
        origOptionAdjustments: { "Ultra-density Foam": 0, "Standard Tufted Classic": -3000 }
      },
      deliverySubtext: "Includes free white-glove living room installation and cushion quality warranty."
    };
  }

  if (categorySlug === 'wooden-chairs') {
    return {
      seriesName: "ergonomic seating series",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Seating Elevation / Height",
      sizesList: ["Standard Dining Height", "Counter Height (+₹1,500)"],
      finishesLabel: "Sealer Coating & Stain",
      finishesList: FINISHES,
      optionsLabel: "Bottom Cushion Type",
      optionsList: ["Comfort Fabric Padding", "Wooden Flat Seat"],
      priceRules: {
        sizeAdjustments: { "Standard Dining Height": 0, "Counter Height (+₹1,500)": 1500 },
        origSizeAdjustments: { "Standard Dining Height": 0, "Counter Height (+₹1,500)": 2200 },
        optionAdjustments: { "Comfort Fabric Padding": 0, "Wooden Flat Seat": -500 },
        origOptionAdjustments: { "Comfort Fabric Padding": 0, "Wooden Flat Seat": -800 }
      },
      deliverySubtext: "Fully assembled and wood-waxed before handoff."
    };
  }

  if (categorySlug === 'wooden-mandirs') {
    return {
      seriesName: "divine sanctuary collection",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Temple Width & Height Sizing",
      sizesList: ["Standard Width (24\")", "Wide Width (36\") (+₹6,000)"],
      finishesLabel: "Glow polish luster",
      finishesList: [
        { name: 'Glossy Teak Glow', color: '#c9a87c' },
        { name: 'Rosewood Polish', color: '#5a3e28' }
      ],
      optionsLabel: "Utility Drawer Accessory",
      optionsList: ["Pooja Drawers Included", "Standard Platform Only (-₹2,000)"],
      priceRules: {
        sizeAdjustments: { "Standard Width (24\")": 0, "Wide Width (36\") (+₹6,000)": 6000 },
        origSizeAdjustments: { "Standard Width (24\")": 0, "Wide Width (36\") (+₹6,000)": 8500 },
        optionAdjustments: { "Pooja Drawers Included": 0, "Standard Platform Only (-₹2,000)": -2000 },
        origOptionAdjustments: { "Pooja Drawers Included": 0, "Standard Platform Only (-₹2,000)": -3000 }
      },
      deliverySubtext: "Shipped in safe wooden-crate packing with free local installation."
    };
  }

  if (categorySlug === 'door-frames' || categorySlug === 'wooden-safety-doors') {
    return {
      seriesName: "seasoned structural wood series",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Thickness & Sizing",
      sizesList: ["Standard Size (7' x 3')", "Large Size (8' x 4') (+₹5,000)"],
      finishesLabel: "Hardwood Weatherproof Shield",
      finishesList: FINISHES,
      optionsLabel: "Hinge & Lock Prep Slots",
      optionsList: ["Standard Pre-bored Hinges", "No Boring (Raw Frame)"],
      priceRules: {
        sizeAdjustments: { "Standard Size (7' x 3')": 0, "Large Size (8' x 4') (+₹5,000)": 5000 },
        origSizeAdjustments: { "Standard Size (7' x 3')": 0, "Large Size (8' x 4') (+₹5,000)": 7000 },
        optionAdjustments: { "Standard Pre-bored Hinges": 0, "No Boring (Raw Frame)": -800 },
        origOptionAdjustments: { "Standard Pre-bored Hinges": 0, "No Boring (Raw Frame)": -1200 }
      },
      deliverySubtext: "Made strictly with seasoned wood for absolute anti-warp durability."
    };
  }

  if (categorySlug === 'teapoys-coffee-tables' || categorySlug === 'dining-tables') {
    return {
      seriesName: "classic tabletop collection",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Tabletop Dimensions",
      sizesList: ["Standard Oval/Rectangle", "Premium Large Extension (+₹4,500)"],
      finishesLabel: "Spill-resistant PU Seal",
      finishesList: FINISHES,
      optionsLabel: "Glass Cover Protection",
      optionsList: ["8mm Tempered Glass Top", "Polished Solid Wood Only"],
      priceRules: {
        sizeAdjustments: { "Standard Oval/Rectangle": 0, "Premium Large Extension (+₹4,500)": 4500 },
        origSizeAdjustments: { "Standard Oval/Rectangle": 0, "Premium Large Extension (+₹4,500)": 6000 },
        optionAdjustments: { "8mm Tempered Glass Top": 0, "Polished Solid Wood Only": -2000 },
        origOptionAdjustments: { "8mm Tempered Glass Top": 0, "Polished Solid Wood Only": -3000 }
      },
      deliverySubtext: "Delivered completely bubble-wrapped with free local assembly."
    };
  }

  if (categorySlug === 'wardrobes' || categorySlug === 'dressing-table' || categorySlug === 'tv-units') {
    return {
      seriesName: "premium utility cabinetry",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Layout & Sizing Options",
      sizesList: ["Standard Cabinet", "Royal Combo (+₹5,500)"],
      finishesLabel: "Premium Lamination Polish",
      finishesList: FINISHES,
      optionsLabel: "Internal Locker Type",
      optionsList: ["Dual Godrej Mechanical Lock", "Standard Magnetic Latches Only"],
      priceRules: {
        sizeAdjustments: { "Standard Cabinet": 0, "Royal Combo (+₹5,500)": 5500 },
        origSizeAdjustments: { "Standard Cabinet": 0, "Royal Combo (+₹5,500)": 7500 },
        optionAdjustments: { "Dual Godrej Mechanical Lock": 0, "Standard Magnetic Latches Only": -1500 },
        origOptionAdjustments: { "Dual Godrej Mechanical Lock": 0, "Standard Magnetic Latches Only": -2200 }
      },
      deliverySubtext: "Premium hardware sliders and free alignment service included."
    };
  }

  if (categorySlug === 'wooden-swings') {
    return {
      seriesName: "royal timber swings",
      brandName: "Bhisez Furniture Showroom",
      sizingLabel: "Swing Plank Length",
      sizesList: ["4.5 Feet (Double-Seater)", "5.5 Feet (Triple-Seater) (+₹5,000)"],
      finishesLabel: "Glossy Waterproof Polish",
      finishesList: FINISHES,
      optionsLabel: "Supporting Hooks & Chains",
      optionsList: ["Brass Chains Set", "Rope/Standard S-hooks (-₹3,000)"],
      priceRules: {
        sizeAdjustments: { "4.5 Feet (Double-Seater)": 0, "5.5 Feet (Triple-Seater) (+₹5,000)": 5000 },
        origSizeAdjustments: { "4.5 Feet (Double-Seater)": 0, "5.5 Feet (Triple-Seater) (+₹5,000)": 7000 },
        optionAdjustments: { "Brass Chains Set": 0, "Rope/Standard S-hooks (-₹3,000)": -3000 },
        origOptionAdjustments: { "Brass Chains Set": 0, "Rope/Standard S-hooks (-₹3,000)": -4500 }
      },
      deliverySubtext: "Installation support for roof anchors can be coordinated locally on delivery."
    };
  }

  // General Fallback (e.g. Chaurang, Diwan, etc.)
  return {
    seriesName: "seasoned timber workshop series",
    brandName: "Bhisez Furniture Showroom",
    sizingLabel: "Standard Sizing",
    sizesList: ["Full Size"],
    finishesLabel: "Premium Sealer Wax",
    finishesList: FINISHES,
    optionsLabel: "Optional Extra Layer",
    optionsList: ["Waterproof Lacquer Shield", "Traditional Wood Finish Only"],
    priceRules: {
      sizeAdjustments: { "Full Size": 0 },
      optionAdjustments: { "Waterproof Lacquer Shield": 0, "Traditional Wood Finish Only": -1200 }
    },
    deliverySubtext: "Proudly handcrafted in Bhisez Sindhudurg workshop."
  };
};

const generateProducts = (): Product[] => {
  const list: Product[] = [];

  CATEGORY_MAP.forEach((cat) => {
    cat.subCategories.forEach((sub) => {
      const defaults = getCategoryDefaults(cat.slug);
      for (let i = 1; i <= sub.count; i++) {
        const id = `${cat.slug}-${sub.slug}-${i}`;
        const numStr = i < 10 ? `0${i}` : `${i}`;

        let name = '';
        if (cat.slug === 'wooden-chairs') {
          if (sub.slug === 'cane-rocking-chair' || sub.slug === 'z-chair') {
            name = sub.name;
          } else {
            name = `${sub.name}-${numStr}`;
          }
        } else {
          name = `${cat.name === "DRESSING TABLE" ? "Premium DT" : cat.name.replace(/s$/i, '')} - ${sub.name} #${numStr}`;
        }

        // Image lookup: key = "cat.slug-sub.slug", pick image i (1-indexed), clamp to last
        const key = `${cat.slug}-${sub.slug}`;
        const pool = LOCAL_IMAGES[key] || [cat.img];
        const img = pool[Math.min(i - 1, pool.length - 1)];

        const calculatedPrice = sub.basePrice + (i - 1) * 350;
        const discountMult = 1.35 + (i % 3) * 0.05;

        let badge: 'bs' | 'new' | 'cus' | null = null;
        if (i === 1) badge = 'bs';
        else if (i === 2) badge = 'new';
        else if (i % 12 === 0) badge = 'cus';

        const descOverride = PRODUCT_DESCRIPTIONS[id];
        const shortDesc = descOverride?.shortDesc || `Handcrafted with seasoned native timber wood. Built using durable standard premium joinery for generation-lasting strength.`;
        const description = descOverride?.description || `Designed and perfected in Bhisez Sindhudurg workshop, this ${sub.name} is a fine specimen of Indian carpentry. Features premium selected grains, borer resistant seasoning, and flawless double coat PU satin finish. Excellent ergonomics matching compact as well as royal traditional architecture.`;

        // Retrieve specs mapped from CSV file
        const csvSpecs = getCsvSpecs(cat.slug, sub.slug, i);
        let woodTypePrices = csvSpecs.woodTypePrices;
        const availableSize = csvSpecs.availableSize;

        // If no explicit wood type prices are in the CSV, generate fallbacks dynamically
        if (!woodTypePrices) {
          woodTypePrices = {
            Aakashi: Math.round((calculatedPrice * 0.8) / 100) * 100,
            Shivan: Math.round(calculatedPrice / 100) * 100,
            Sagwan: Math.round((calculatedPrice * 1.25) / 100) * 100
          };
        }

        // Set the default base price in catalog list to Sagwan wood type's price (or first available if Sagwan is not in the set)
        let baseProductPrice = calculatedPrice;
        if (woodTypePrices) {
          if (woodTypePrices.Sagwan) {
            baseProductPrice = woodTypePrices.Sagwan;
          } else {
            const keys = Object.keys(woodTypePrices) as ('Aakashi' | 'Shivan' | 'Sagwan')[];
            if (keys.length > 0) {
              baseProductPrice = woodTypePrices[keys[0]] || calculatedPrice;
            }
          }
        }

        const origPrice = Math.round((baseProductPrice * discountMult) / 500) * 500;

        list.push({
          id,
          name,
          category: cat.slug,
          subCategory: sub.slug,
          price: baseProductPrice,
          orig: origPrice,
          img,
          badge,
          colors: ['#4A2511', '#2C1608', '#CBB89D'],
          shortDesc,
          description,
          woodTypePrices,
          availableSize,
          ...defaults
        });
      }
    });
  });

  return list;
};

export const ALL_PRODUCTS: Product[] = (() => {
  const generated = generateProducts();
  const mergedMap = new Map<string | number, Product>();

  // Add all generated products first
  generated.forEach((p) => mergedMap.set(p.id, p));

  // Overwrite or append with custom defined products
  CUSTOM_PRODUCTS.forEach((p) => mergedMap.set(p.id, p));

  // Apply individual overrides from PRODUCT_OVERRIDES dictionary
  mergedMap.forEach((product, id) => {
    const override = PRODUCT_OVERRIDES[id as string];
    if (override) {
      mergedMap.set(id, {
        ...product,
        ...override
      });
    }
  });

  return Array.from(mergedMap.values());
})();

export const TESTIMONIALS = [
  {
    name: 'Rahul Desai',
    location: 'Malvan',
    stars: 5,
    text: 'Got our complete solid teak bedroom bed and wardrobes from Bhisez. The quality of seasoned timber is outstanding and delivery was fully set up in our room. Highly recommend Bhisez!'
  },
  {
    name: 'Sunita Naik',
    location: 'Kudal',
    stars: 5,
    text: 'The home pooja mandir they hand-polished is incredibly gorgeous. Karigars here are masters! It looks highly divine and makes our morning rituals joyful.'
  },
  {
    name: 'Manoj Sawant',
    location: 'Ratnagiri',
    stars: 5,
    text: 'Bhisez made us a custom layout sofa-bed matching our drawing room dimensions. They understood our fabric tastes and crafted a masterpiece!'
  }
];

export const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    name: 'Siddharth Rane',
    phone: '+91 98201 12234',
    city: 'Malvan',
    subject: 'Custom Furniture Inquiry',
    message: 'Need 3 massive teak door frames seasoned with custom walnut polish. Please provide sizing options and shipping durations.',
    notes: 'Teak wood, custom walnut polish',
    status: 'Pending',
    date: '2026-06-10'
  },
  {
    id: 'inq-2',
    name: 'Priyanka Desai',
    phone: '+91 91672 55431',
    city: 'Kudal',
    subject: 'Showroom visit guide',
    message: 'Planning to visit Sukalwad NH-66 showroom to lock premium double beds with hydraulic storage. Will Bhisez master artisans be there on Saturday?',
    notes: 'Premium double bed, hydraulic storage',
    status: 'Reviewed',
    date: '2026-06-09'
  },
  {
    id: 'inq-3',
    name: 'Rajesh Patil',
    phone: '+91 93245 67781',
    city: 'Sawantwadi',
    subject: 'Bulk/Commercial quote',
    message: 'Require 10 standard counter height wooden chairs and 4 mango-wood dining tables for our family homestay project. Need Grade-A seasoned logs.',
    notes: 'Homestay project, mango wood',
    status: 'Resolved',
    date: '2026-06-08'
  }
];

export const DEFAULT_WEBSITE_CONTENT = {
  heroTitle: 'Genuine Malvani Hardwoods. Masterfully Carved.',
  heroSubtitle: 'By Bhisez Carpenter Workshop. Direct heirloom luxury for doors, double-beds, and customized Mandirs since 1995.',
  aboutQuote: "Every ring in a log represents a monsoon we stood together. We don't just shape wood; we preserve Malvan's heritage in your living quarters.",
  whatsappLine: '+91 70574 41122',
  malvanAddress: 'Main Market Road, Malvan, Sindhudurg, Maharashtra – 416606',
  sukalwadAddress: 'NH-66 Highway, Sukalwad, Sindhudurg, Maharashtra – 416520',
  adminPasscode: '1234',
  currencySymbol: '₹',
  gstPercent: 18
};

