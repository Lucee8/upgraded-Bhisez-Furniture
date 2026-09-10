import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewState, Product } from '../types';
import { ALL_PRODUCTS, TESTIMONIALS, CATEGORY_MAP, DEFAULT_WEBSITE_CONTENT } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageCircle,
  ShieldCheck,
  Store,
  ChevronRight,
  ChevronLeft,
  Star,
  ArrowRight,
  Hammer,
  TreePine,
  Sliders,
  CheckCircle2,
  MapPin,
  Sparkles,
  PhoneCall,
  X,
  Tag,
  Clock,
  Check,
  Layers,
  Award,
  Play
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  onSelectCategory: (category: string, subCategory?: string | null) => void;
  onSelectProduct: (productId: string | number) => void;
  onToggleWishlist: (productId: string | number) => void;
  wishlist: (string | number)[];
  products?: Product[];
  categories?: any[];
  websiteContent?: any;
}

// ── 1. Hero Slides using high-resolution authentic imagery ──
const HERO_SLIDES = [
  {
    id: 1,
    badge: 'MALVAN SACRED TIMBER',
    title: 'Handcrafted Teak Mandirs',
    subtitle: 'Sacred Sanctums Carved from Grade-A Seasoned Sagwan Teak',
    pricePrefix: 'Workshop direct from',
    priceVal: '₹13,000',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1600&q=85',
    linkCategory: 'wooden-mandirs',
    primaryCta: 'Explore Sacred Mandirs',
    timberTag: '100% Sagwan Hardwood'
  },
  {
    id: 2,
    badge: 'SOLID BEDROOM SANCTUARY',
    title: 'Solid Teakwood Storage Beds',
    subtitle: 'Kiln-Seasoned Hydraulic & Box Storage Beds Built to Last Generations',
    pricePrefix: 'Starting from',
    priceVal: '₹24,000',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=85',
    linkCategory: 'beds',
    primaryCta: 'View Teak Beds',
    timberTag: 'Zero-Sag Solid Slats'
  },
  {
    id: 3,
    badge: 'LIVING ROOM MASTERPIECES',
    title: 'Heritage Wooden Sofas',
    subtitle: 'Ergonomic Living Comfort with High-Density Posture Support',
    pricePrefix: 'Lounge sets from',
    priceVal: '₹22,000',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85',
    linkCategory: 'wooden-sofas',
    primaryCta: 'Explore Sofa Sets',
    timberTag: 'Natural Honey PU Finish'
  },
  {
    id: 4,
    badge: 'FAMILY HEIRLOOM GATHERINGS',
    title: 'Danish Teak Dining Sets',
    subtitle: 'Water-Resistant Resin-Sealed Dining Tables with Sculpted Chairs',
    pricePrefix: '6-Seater sets from',
    priceVal: '₹29,000',
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1600&q=85',
    linkCategory: 'dining-tables',
    primaryCta: 'Explore Dining Tables',
    timberTag: 'Anti-Warp Teak Slabs'
  }
];

// Fallback high-resolution category images for optimal presentation
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'beds': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&q=80',
  'wooden-sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80',
  'wooden-chairs': 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=700&q=80',
  'door-frames': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&q=80',
  'dressing-table': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
  'wooden-swings': 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=700&q=80',
  'wooden-safety-doors': 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=700&q=80',
  'wooden-mandirs': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=700&q=80',
  'teapoys-coffee-tables': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=700&q=80',
  'sofa-cum-beds': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80',
  'dining-tables': 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=700&q=80',
  'wardrobes': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=700&q=80',
  'tv-units': 'https://images.unsplash.com/photo-16074730318d2-64f26046e8c7?w=700&q=80',
  'chaurang-and-paats': 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=700&q=80',
  'diwans': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=700&q=80'
};

// Rooms for Section K (Shop by Room)
const ROOM_COLLECTIONS = [
  {
    id: 'living',
    name: 'Living Room',
    subtitle: 'Carved Teak Sofas, Swings & Coffee Tables',
    categorySlug: 'wooden-sofas',
    itemCount: '48 Designs',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'
  },
  {
    id: 'bedroom',
    name: 'Bedroom Sanctuary',
    subtitle: 'Hydraulic Storage Beds, Wardrobes & Dressers',
    categorySlug: 'beds',
    itemCount: '38 Designs',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80'
  },
  {
    id: 'dining',
    name: 'Dining & Kitchen',
    subtitle: 'Solid Teak Slabs & Ergonomic Chairs',
    categorySlug: 'dining-tables',
    itemCount: '19 Designs',
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80'
  },
  {
    id: 'pooja',
    name: 'Pooja & Sacred Space',
    subtitle: 'Hand-Carved Mandirs, Portals & Chaurangs',
    categorySlug: 'wooden-mandirs',
    itemCount: '24 Designs',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80'
  }
];

export default function HomeView({
  onNavigate,
  onSelectCategory,
  onSelectProduct,
  onToggleWishlist,
  wishlist,
  products = ALL_PRODUCTS,
  categories = CATEGORY_MAP,
  websiteContent = DEFAULT_WEBSITE_CONTENT
}: HomeViewProps) {
  // Announcement banner state
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Bestsellers Filter State
  const [bestsellerFilter, setBestsellerFilter] = useState<'all' | 'beds' | 'wooden-sofas' | 'wooden-mandirs' | 'dining-tables'>('all');

  // Shop The Look Hotspot State
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  // Inspiration Carousel Ref & Scroll Handler
  const inspirationCarouselRef = useRef<HTMLDivElement>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<any | null>(null);
  const handleScrollInspiration = (direction: 'left' | 'right') => {
    if (!inspirationCarouselRef.current) return;
    const container = inspirationCarouselRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Hydraulic Beds Carousel Ref & Scroll Handler
  const hydraulicBedsCarouselRef = useRef<HTMLDivElement>(null);
  const handleScrollHydraulicBeds = (direction: 'left' | 'right') => {
    if (!hydraulicBedsCarouselRef.current) return;
    const container = hydraulicBedsCarouselRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Lounge Chairs Carousel Ref & Scroll Handler
  const loungeChairsCarouselRef = useRef<HTMLDivElement>(null);
  const handleScrollLoungeChairs = (direction: 'left' | 'right') => {
    if (!loungeChairsCarouselRef.current) return;
    const container = loungeChairsCarouselRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Auto-advance hero slides every 6.5s
  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isHeroHovered]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // 8 Primary Core Categories for Section E (Shop by Category)
  const primaryCategories = useMemo(() => {
    const targetSlugs = [
      'beds', 
      'wooden-sofas', 
      'wooden-mandirs', 
      'dining-tables', 
      'wooden-chairs', 
      'dressing-table', 
      'wooden-swings', 
      'wardrobes'
    ];
    return targetSlugs
      .map(slug => categories.find(c => c.slug === slug))
      .filter(Boolean);
  }, [categories]);

  // New Arrivals (Section F)
  const newArrivals = useMemo(() => {
    // Pick distinct categories to display a well-balanced spread
    const selected: Product[] = [];
    const seenCat = new Set<string>();
    
    // First try items with badge 'new' or high diversity
    for (const p of products) {
      if (p?.category && !seenCat.has(p.category)) {
        selected.push(p);
        seenCat.add(p.category);
      }
      if (selected.length >= 4) break;
    }
    // If not enough, fill up to 4
    if (selected.length < 4) {
      for (const p of products) {
        if (!selected.some(s => s.id === p.id)) {
          selected.push(p);
          if (selected.length >= 4) break;
        }
      }
    }
    return selected;
  }, [products]);

  // Deal Zone Bundles (Section G)
  const dealBundles = useMemo(() => {
    const bedItem = products.find(p => p?.category === 'beds') || products[0];
    const sofaItem = products.find(p => p?.category === 'wooden-sofas') || products[1];
    const mandirItem = products.find(p => p?.category === 'wooden-mandirs') || products[2];

    return [
      {
        id: 'bundle-bed',
        tag: 'BEDROOM VALUE BUNDLE',
        title: 'Master Bedroom Teak Suite',
        description: 'Seasoned Sagwan Bed with hydraulic storage + matching nightstand pair direct from our workshop.',
        originalPrice: Math.round((bedItem?.price || 34000) * 1.35),
        dealPrice: bedItem?.price || 34000,
        savings: Math.round((bedItem?.price || 34000) * 0.35),
        img: bedItem?.img || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        productRefId: bedItem?.id,
        categorySlug: 'beds'
      },
      {
        id: 'bundle-sofa',
        tag: 'LIVING ROOM SUITE',
        title: 'Konkan Royal Sofa & Coffee Set',
        description: 'Hand-carved 3+1+1 teak lounge set with high-density posture foam and matching teapoy.',
        originalPrice: Math.round((sofaItem?.price || 42000) * 1.30),
        dealPrice: sofaItem?.price || 42000,
        savings: Math.round((sofaItem?.price || 42000) * 0.30),
        img: sofaItem?.img || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        productRefId: sofaItem?.id,
        categorySlug: 'wooden-sofas'
      },
      {
        id: 'bundle-mandir',
        tag: 'FESTIVE SANCTUARY SUITE',
        title: 'Sacred Sagwan Mandir & Chaurang',
        description: 'Intricately chiselled home mandir with brass bell array and matching carved pooja pedestal.',
        originalPrice: Math.round((mandirItem?.price || 22000) * 1.32),
        dealPrice: mandirItem?.price || 22000,
        savings: Math.round((mandirItem?.price || 22000) * 0.32),
        img: mandirItem?.img || 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
        productRefId: mandirItem?.id,
        categorySlug: 'wooden-mandirs'
      }
    ];
  }, [products]);

  // ── SHOP THE LOOK (Section H) ──
  // 5 Authentic Staged Scenes with verified product hotspots
  const shopTheLookScenes = useMemo(() => {
    const sofa = products.find(p => p?.category === 'wooden-sofas') || products[0];
    const teapoy = products.find(p => p?.category === 'teapoys-coffee-tables') || products[1];
    const bed = products.find(p => p?.category === 'beds') || products[2];
    const dining = products.find(p => p?.category === 'dining-tables') || products[3];
    const mandir = products.find(p => p?.category === 'wooden-mandirs') || products[4];
    const swing = products.find(p => p?.category === 'wooden-swings') || products[5];

    return [
      {
        id: 'scene-living',
        title: 'Konkan Royal Drawing Room',
        subtitle: 'Kiln-Seasoned Teakwood Sofa & Hand-Carved Teapoy',
        roomTag: 'Living Room Ensemble',
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85',
        hotspots: [
          {
            id: 'hs-sofa',
            x: 38,
            y: 64,
            product: sofa,
            label: 'Solid Teak Sofa Set'
          },
          {
            id: 'hs-teapoy',
            x: 64,
            y: 76,
            product: teapoy,
            label: 'Hand-Carved Coffee Table'
          }
        ]
      },
      {
        id: 'scene-bedroom',
        title: 'Master Bedroom Teak Suite',
        subtitle: 'Solid Wood Hydraulic Storage Bed',
        roomTag: 'Bedroom Sanctuary',
        img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
        hotspots: [
          {
            id: 'hs-bed',
            x: 52,
            y: 62,
            product: bed,
            label: 'Hydraulic Storage Bed'
          }
        ]
      },
      {
        id: 'scene-dining',
        title: 'Banquet Dining Space',
        subtitle: '6-Seater Solid Timber Dining Table & Ergonomic Chairs',
        roomTag: 'Dining Collection',
        img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&q=80',
        hotspots: [
          {
            id: 'hs-dining',
            x: 50,
            y: 65,
            product: dining,
            label: 'Solid Teak Dining Table'
          }
        ]
      },
      {
        id: 'scene-mandir',
        title: 'Sacred Sagwan Mandir Sanctum',
        subtitle: 'Intricately Carved Divine Home Temple with Brass Accents',
        roomTag: 'Sacred Timber',
        img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80',
        hotspots: [
          {
            id: 'hs-mandir',
            x: 50,
            y: 48,
            product: mandir,
            label: 'Carved Sagwan Mandir'
          }
        ]
      },
      {
        id: 'scene-veranda',
        title: 'Sindhudurg Veranda Leisure',
        subtitle: 'Royal Traditional Carved Teak Zopala Swing',
        roomTag: 'Veranda & Swing',
        img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1200&q=80',
        hotspots: [
          {
            id: 'hs-swing',
            x: 48,
            y: 54,
            product: swing,
            label: 'Traditional Teak Zopala'
          }
        ]
      }
    ];
  }, [products]);

  // ── BHISEZ INSPIRATION FEED ──
  // 10 Real Bhisez product showcases with verified products and routes
  const inspirationFeed = useMemo(() => {
    const bed = products.find(p => p?.category === 'beds') || products[0];
    const mandir = products.find(p => p?.category === 'wooden-mandirs') || products[1];
    const sofa = products.find(p => p?.category === 'wooden-sofas') || products[2];
    const dining = products.find(p => p?.category === 'dining-tables') || products[3];
    const swing = products.find(p => p?.category === 'wooden-swings') || products[4];
    const chair = products.find(p => p?.category === 'wooden-chairs') || products[5];
    const dressing = products.find(p => p?.category === 'dressing-table') || products[6];
    const door = products.find(p => p?.category === 'door-frames') || products[7];
    const teapoy = products.find(p => p?.category === 'teapoys-coffee-tables') || products[8];
    const wardrobe = products.find(p => p?.category === 'wardrobes') || products[9];

    return [
      {
        id: 'insp-bed',
        title: bed?.name || 'Solid Wood Master Bed',
        category: 'Bedroom Sanctuary',
        tag: 'Bedroom Sanctuary',
        categorySlug: 'beds',
        productId: bed?.id || 'beds-1',
        product: bed,
        price: bed?.price || 48000,
        orig: bed?.orig,
        img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-mandir',
        title: mandir?.name || 'Sagwan Carved Temple',
        category: 'Sacred Timber',
        tag: 'Sacred Timber',
        categorySlug: 'wooden-mandirs',
        productId: mandir?.id || 'mandir-1',
        product: mandir,
        price: mandir?.price || 42000,
        orig: mandir?.orig,
        img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-sofa',
        title: sofa?.name || 'Handcrafted Teak Sofa Set',
        category: 'Living Room',
        tag: 'Living Room',
        categorySlug: 'wooden-sofas',
        productId: sofa?.id || 'sofa-1',
        product: sofa,
        price: sofa?.price || 56000,
        orig: sofa?.orig,
        img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-dining',
        title: dining?.name || 'Solid Wood Dining Suite',
        category: 'Dining Spaces',
        tag: 'Dining Spaces',
        categorySlug: 'dining-tables',
        productId: dining?.id || 'dining-1',
        product: dining,
        price: dining?.price || 64000,
        orig: dining?.orig,
        img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-swing',
        title: swing?.name || 'Traditional Teak Zopala',
        category: 'Veranda Living',
        tag: 'Veranda Living',
        categorySlug: 'wooden-swings',
        productId: swing?.id || 'swing-1',
        product: swing,
        price: swing?.price || 38000,
        orig: swing?.orig,
        img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-chair',
        title: chair?.name || 'Ergonomic Wood Chair',
        category: 'Study & Work',
        tag: 'Study & Work',
        categorySlug: 'wooden-chairs',
        productId: chair?.id || 'chair-1',
        product: chair,
        price: chair?.price || 12000,
        orig: chair?.orig,
        img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-dressing',
        title: dressing?.name || 'Royal Teak Dressing Unit',
        category: 'Dressing & Vanity',
        tag: 'Dressing & Vanity',
        categorySlug: 'dressing-table',
        productId: dressing?.id || 'dressing-1',
        product: dressing,
        price: dressing?.price || 28000,
        orig: dressing?.orig,
        img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-door',
        title: door?.name || 'Grand Teakwood Entrance Door',
        category: 'Entrance Portals',
        tag: 'Entrance Portals',
        categorySlug: 'door-frames',
        productId: door?.id || 'door-1',
        product: door,
        price: door?.price || 35000,
        orig: door?.orig,
        img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-teapoy',
        title: teapoy?.name || 'Handcrafted Teak Teapoy Table',
        category: 'Living Accents',
        tag: 'Living Accents',
        categorySlug: 'teapoys-coffee-tables',
        productId: teapoy?.id || 'teapoy-1',
        product: teapoy,
        price: teapoy?.price || 14500,
        orig: teapoy?.orig,
        img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80',
        isVideo: false
      },
      {
        id: 'insp-wardrobe',
        title: wardrobe?.name || 'Solid Sagwan 3-Door Wardrobe',
        category: 'Bedroom Storage',
        tag: 'Bedroom Storage',
        categorySlug: 'wardrobes',
        productId: wardrobe?.id || 'wardrobe-1',
        product: wardrobe,
        price: wardrobe?.price || 52000,
        orig: wardrobe?.orig,
        img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
        isVideo: false
      }
    ];
  }, [products]);

  // ── EXPLORE HYDRAULIC BEDS (Shared Image 1) ──
  const hydraulicBeds = useMemo(() => {
    const bedsInCatalog = products.filter(p => p?.category === 'beds');
    const fallbackBed = bedsInCatalog[0] || products[0];

    return [
      {
        id: 'hyd-bed-1',
        brand: 'Bhisez Sagwan',
        name: 'Hanoi Solid Wood Cane Queen Size Bed With Hydraulic Storage (Amber Walnut Finish)',
        price: 79999,
        orig: 96999,
        discount: '18% OFF',
        img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
        productId: bedsInCatalog[0]?.id || fallbackBed?.id
      },
      {
        id: 'hyd-bed-2',
        brand: 'Bhisez Sagwan',
        name: 'Aruba Solid Teak Queen Size Bed With Hydraulic Storage (Rustic Walnut Finish)',
        price: 26999,
        orig: 45399,
        discount: '41% OFF',
        img: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?w=800&q=80',
        productId: bedsInCatalog[1]?.id || fallbackBed?.id
      },
      {
        id: 'hyd-bed-3',
        brand: 'Bhisez Sagwan',
        name: 'Toledo Solid Wood Queen Size Bed With Hydraulic Storage (Danish Walnut Finish)',
        price: 65999,
        orig: 105999,
        discount: '38% OFF',
        img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
        productId: bedsInCatalog[2]?.id || fallbackBed?.id
      },
      {
        id: 'hyd-bed-4',
        brand: 'Bhisez Sagwan',
        name: 'Milan Seasoned Timber Queen Bed With Hydraulic Storage (Mocha Velvet Headboard)',
        price: 49999,
        orig: 82999,
        discount: '40% OFF',
        img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80',
        productId: bedsInCatalog[3]?.id || fallbackBed?.id
      },
      {
        id: 'hyd-bed-5',
        brand: 'Bhisez Sagwan',
        name: 'Stanhope Handcrafted Hardwood Queen Bed With Hydraulic Storage (Brown Finish)',
        price: 49999,
        orig: 74999,
        discount: '33% OFF',
        img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
        productId: bedsInCatalog[4]?.id || fallbackBed?.id
      },
      {
        id: 'hyd-bed-6',
        brand: 'Bhisez Sagwan',
        name: 'Malvan Royal Carved King Bed With Hydraulic Storage (Honey Oak Finish)',
        price: 72000,
        orig: 98000,
        discount: '27% OFF',
        img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
        productId: bedsInCatalog[5]?.id || fallbackBed?.id
      }
    ];
  }, [products]);

  // ── EXPLORE LOUNGE CHAIRS (Shared Image 2) ──
  const loungeChairs = useMemo(() => {
    const chairsInCatalog = products.filter(p => p?.category === 'wooden-chairs');
    const fallbackChair = chairsInCatalog[0] || products[0];

    return [
      {
        id: 'ch-1',
        brand: 'Bhisez Sagwan',
        name: 'Florence Solid Wood Lounge Chair in Calico Floral Colour',
        price: 9999,
        orig: 14999,
        discount: '33% OFF',
        img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
        productId: chairsInCatalog[0]?.id || fallbackChair?.id
      },
      {
        id: 'ch-2',
        brand: 'Bhisez Sagwan',
        name: 'Othello Fabric Lounge Chair in Icy Turquoise Colour',
        price: 14999,
        orig: 30999,
        discount: '52% OFF',
        img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        productId: chairsInCatalog[1]?.id || fallbackChair?.id
      },
      {
        id: 'ch-3',
        brand: 'Bhisez Sagwan',
        name: 'Eclipse Fabric Lounge Chair in Charcoal Colour',
        price: 39999,
        orig: 89999,
        discount: '56% OFF',
        img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
        productId: chairsInCatalog[2]?.id || fallbackChair?.id
      },
      {
        id: 'ch-4',
        brand: 'Bhisez Sagwan',
        name: 'Hayworth Solid Wood Lounge Chair in American Walnut Finish and Dusty Turquoise',
        price: 14999,
        orig: 26799,
        discount: '44% OFF',
        img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
        productId: chairsInCatalog[3]?.id || fallbackChair?.id
      },
      {
        id: 'ch-5',
        brand: 'Bhisez Sagwan',
        name: 'Genoa Fabric Wing Chair in Mon Paisley Colour',
        price: 19999,
        orig: 32999,
        discount: '39% OFF',
        img: 'https://images.unsplash.com/photo-1580481077194-e818b8f2a967?w=800&q=80',
        productId: chairsInCatalog[4]?.id || fallbackChair?.id
      },
      {
        id: 'ch-6',
        brand: 'Bhisez Sagwan',
        name: 'Malvan Traditional Teak Aaram Rocking Chair with Cane Backrest',
        price: 16500,
        orig: 24000,
        discount: '31% OFF',
        img: 'https://images.unsplash.com/photo-1519947486513-ce62b99f2162?w=800&q=80',
        productId: chairsInCatalog[5]?.id || fallbackChair?.id
      }
    ];
  }, [products]);

  // ── HOME DECOR (Shared Image 3) ──
  const homeDecorCategories = useMemo(() => [
    {
      id: 'decor-mirrors',
      title: 'Mirrors',
      startPrice: 'From ₹989',
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
      category: 'chaurang-and-paats'
    },
    {
      id: 'decor-paintings',
      title: 'Wall Paintings',
      startPrice: 'From ₹975',
      img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80',
      category: 'wooden-mandirs'
    },
    {
      id: 'decor-trays',
      title: 'Serving Trays',
      startPrice: 'From ₹630',
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
      category: 'teapoys-coffee-tables'
    },
    {
      id: 'decor-vases',
      title: 'Vases',
      startPrice: 'From ₹299',
      img: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&q=80',
      category: 'teapoys-coffee-tables'
    },
    {
      id: 'decor-sculptures',
      title: 'Sculptures & Figurines',
      startPrice: 'From ₹899',
      img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
      category: 'wooden-mandirs'
    },
    {
      id: 'decor-florals',
      title: 'Table Flowers & Accents',
      startPrice: 'From ₹349',
      img: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=600&q=80',
      category: 'dining-tables'
    },
    {
      id: 'decor-clocks',
      title: 'Wall Clocks',
      startPrice: 'From ₹1,299',
      img: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
      category: 'chaurang-and-paats'
    },
    {
      id: 'decor-frames',
      title: 'Photo Frames & Art',
      startPrice: 'From ₹450',
      img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80',
      category: 'teapoys-coffee-tables'
    }
  ], []);

  // Featured Collection Pieces (Section I)
  const featuredCollectionPieces = useMemo(() => {
    const centerpiece = products.find(p => p?.category === 'wooden-mandirs') || products[0];
    const companion1 = products.find(p => p?.category === 'beds') || products[1];
    const companion2 = products.find(p => p?.category === 'wooden-sofas') || products[2];
    const companion3 = products.find(p => p?.category === 'dining-tables') || products[3];
    return { centerpiece, companion1, companion2, companion3 };
  }, [products]);

  // Bestsellers (Section J)
  const bestsellerProducts = useMemo(() => {
    const list = products.filter((p) => {
      if (bestsellerFilter === 'all') return true;
      return p?.category === bestsellerFilter;
    });
    return list.slice(0, 8);
  }, [products, bestsellerFilter]);

  return (
    <div className="bg-[#FAFAF8] text-[#222222] min-h-screen font-sans">

      {/* ── SECTION A: ANNOUNCEMENT / OFFER BAR ── */}
      {showAnnouncement && (
        <div className="bg-[#2F7779] text-white border-b border-[#256264] py-2 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden text-center sm:text-left mx-auto sm:mx-0">
              <span className="inline-flex items-center gap-1 bg-[#F47B20] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 shadow-2xs">
                <Sparkles size={11} /> Workshop Direct
              </span>
              <span className="text-[11px] sm:text-xs text-stone-100 truncate">
                100% Seasoned Sagwan Teak & Acacia with 3-Year Solid Wood Warranty • Direct delivery across Sindhudurg, Goa & Western Maharashtra
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px] text-stone-100 shrink-0">
              <button 
                onClick={() => onNavigate('showroom')} 
                className="hover:text-[#FAFAF8] transition-colors cursor-pointer font-medium"
              >
                Malvan & Sukalwad Showrooms Open 7 Days
              </button>
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="text-white/70 hover:text-white p-0.5 transition-colors cursor-pointer"
                title="Dismiss banner"
                aria-label="Dismiss banner"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ── SECTION D: HERO SECTION (Multi-Slide Carousel) ── */}
      <section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-5"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div className="relative min-h-[75vh] max-h-[820px] h-[78vh] max-sm:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#222222] shadow-sm border border-[#E2E2E2]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              {/* High-resolution Furniture Photo */}
              <img 
                src={HERO_SLIDES[currentSlide].img} 
                alt={HERO_SLIDES[currentSlide].title} 
                className="w-full h-full object-cover object-center sm:object-right"
                referrerPolicy="no-referrer"
                loading="eager"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#222222]/95 via-[#222222]/75 to-transparent sm:w-3/4 md:w-3/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/90 via-transparent to-transparent sm:hidden pointer-events-none" />

              {/* Left-Aligned Editorial Content Box (Max 560px) */}
              <div className="absolute inset-y-0 left-0 pl-6 sm:pl-12 md:pl-16 pr-6 flex flex-col justify-center max-w-[560px] z-10 text-white">
                
                {/* Wood Tag & Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="inline-flex items-center gap-1.5 bg-[#3F8F91]/25 border border-[#3F8F91]/60 text-[#3F8F91] text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-xs">
                    <TreePine size={13} className="text-[#3F8F91]" />
                    {HERO_SLIDES[currentSlide].badge}
                  </span>
                  <span className="hidden sm:inline-block text-stone-300 text-xs font-medium">
                    • {HERO_SLIDES[currentSlide].timberTag}
                  </span>
                </motion.div>

                {/* Primary Headline */}
                <motion.h1 
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-3 drop-shadow-xs"
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.h1>

                {/* Subtitle / Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.26 }}
                  className="text-stone-300 text-xs sm:text-sm md:text-base font-normal leading-relaxed mb-6"
                >
                  {HERO_SLIDES[currentSlide].subtitle}
                </motion.p>

                {/* Pricing Ribbon */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.32 }}
                  className="flex items-baseline gap-2 mb-7 text-stone-200"
                >
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    {HERO_SLIDES[currentSlide].pricePrefix}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#3F8F91] font-mono">
                    {HERO_SLIDES[currentSlide].priceVal}
                  </span>
                  <span className="text-[11px] text-stone-400 hidden sm:inline">
                    (Direct Workshop Pricing)
                  </span>
                </motion.div>

                {/* Primary + Secondary CTAs */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.38 }}
                  className="flex flex-wrap items-center gap-3.5"
                >
                  <button
                    onClick={() => onSelectCategory(HERO_SLIDES[currentSlide].linkCategory)}
                    className="min-h-[44px] bg-[#3F8F91] hover:bg-[#2F7779] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-xs transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
                    id="hero-primary-cta"
                  >
                    <span>{HERO_SLIDES[currentSlide].primaryCta}</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={() => onNavigate('showroom')}
                    className="min-h-[44px] bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-lg backdrop-blur-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    id="hero-secondary-cta"
                  >
                    <Store size={15} className="text-[#3F8F91]" />
                    <span>Visit Showrooms</span>
                  </button>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Arrow Navigation */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#222222]/60 hover:bg-[#222222]/90 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer border border-white/20"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#222222]/60 hover:bg-[#222222]/90 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer border border-white/20"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {HERO_SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(i)}
                className="min-h-[24px] min-w-[24px] flex items-center justify-center cursor-pointer"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-7 h-2 bg-[#3F8F91]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`} />
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* ── TRUST / USP STRIP ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E2E2E2] p-4 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E2E2]">
            
            {/* 1. Premium Materials */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-[#E2E2E2] flex items-center justify-center text-[#3F8F91] shrink-0">
                <TreePine size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#222222] leading-tight">100% Solid Timber</h4>
                <p className="text-[11px] text-[#777777] mt-0.5">Kiln-seasoned Sagwan & Acacia</p>
              </div>
            </div>

            {/* 2. Skilled Joinery */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-[#E2E2E2] flex items-center justify-center text-[#3F8F91] shrink-0">
                <Hammer size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#222222] leading-tight">Skilled Joinery</h4>
                <p className="text-[11px] text-[#777777] mt-0.5">Mortise & tenon artisan craft</p>
              </div>
            </div>

            {/* 3. Custom Sizing */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-[#E2E2E2] flex items-center justify-center text-[#3F8F91] shrink-0">
                <Sliders size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#222222] leading-tight">Custom Sizing</h4>
                <p className="text-[11px] text-[#777777] mt-0.5">Millimeter-accurate blueprints</p>
              </div>
            </div>

            {/* 4. 3-Year Warranty */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-[#E2E2E2] flex items-center justify-center text-[#3F8F91] shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#222222] leading-tight">36-Month Warranty</h4>
                <p className="text-[11px] text-[#777777] mt-0.5">Direct workshop guarantees</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── SECTION E: SHOP BY CATEGORY ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#3F8F91] block mb-1">
              Curated Timber Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222]">
              Shop by Furniture Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('beds')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#3F8F91] hover:text-[#2F7779] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4-Column Grid on Desktop / Smooth Horizontal Scroll on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar pb-3 sm:pb-0 snap-x snap-mandatory">
          {primaryCategories.map((cat: any) => {
            const minPrice = cat.subCategories?.reduce((min: number, s: any) => Math.min(min, s.basePrice || 99999), 99999) || 12000;
            const totalCount = cat.subCategories?.reduce((sum: number, s: any) => sum + (s.count || 0), 0) || 12;
            const imageSrc = CATEGORY_IMAGE_MAP[cat.slug] || cat.img;

            return (
              <div
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className="min-w-[240px] sm:min-w-0 flex-1 group bg-white rounded-xl border border-[#E2E2E2] hover:border-[#3F8F91] p-4 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between snap-start"
              >
                <div>
                  {/* Category Image */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F5F5F5] mb-3.5">
                    <img 
                      src={imageSrc} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#222222]/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {totalCount} Designs
                    </span>
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-serif font-bold text-base text-[#222222] group-hover:text-[#3F8F91] transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#777777] mt-0.5">
                    From <span className="font-bold text-[#222222] font-mono">₹{minPrice.toLocaleString('en-IN')}</span>
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-3 pt-2.5 border-t border-[#F5F5F5] flex items-center justify-between text-xs font-semibold text-[#777777] group-hover:text-[#3F8F91]">
                  <span>Explore Collection</span>
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </section>


      {/* ── SECTION F: NEW ARRIVALS / TRENDING FURNITURE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#3F8F91] block mb-1">
              Fresh From Our Konkan Workshop
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222]">
              New Arrivals & Trending Designs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('beds')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#3F8F91] hover:text-[#2F7779] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Browse All New Pieces</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const discountPct = product.orig && product.orig > product.price 
              ? Math.round(((product.orig - product.price) / product.orig) * 100) 
              : 25;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="group bg-white rounded-xl border border-[#E2E2E2] hover:border-[#3F8F91] shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#F5F5F5] overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-[#F47B20] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
                      NEW CRAFT
                    </span>

                    {/* Wishlist Button (Min 44px touch target) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-600 flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      aria-label="Save to wishlist"
                    >
                      <Heart 
                        size={16} 
                        className={isWishlisted ? 'fill-[#E53935] stroke-[#E53935] text-[#E53935]' : 'text-stone-500'} 
                      />
                    </button>
                  </div>

                  <div className="p-3.5 sm:p-4">
                    <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                      {(product?.category || '').replace(/-/g, ' ')}
                    </span>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#222222] group-hover:text-[#3F8F91] transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 pt-0">
                  <div className="pt-2.5 border-t border-[#F5F5F5] flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-[#777777]">Workshop Price</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-bold text-[#222222] font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.orig && (
                          <span className="text-[11px] text-[#999999] line-through font-mono">
                            ₹{product.orig.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#3F8F91] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      <span>View</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>


      {/* ── SECTION F2: FURNITURE INSPIRATION FEED ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        {/* Section Header with Desktop Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#3F8F91] block mb-1">
              Curated Living Ideas
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222]">
              Furniture Inspiration
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-1">
              Discover furniture, spaces and ideas for your home.
            </p>
          </div>

          {/* Desktop Arrow Navigation */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleScrollInspiration('left')}
              className="w-11 h-11 rounded-full border border-[#E2E2E2] bg-white text-[#222222] hover:bg-[#F5F5F5] hover:border-[#3F8F91] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Previous inspiration items"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleScrollInspiration('right')}
              className="w-11 h-11 rounded-full border border-[#E2E2E2] bg-white text-[#222222] hover:bg-[#F5F5F5] hover:border-[#3F8F91] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              aria-label="Next inspiration items"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Inspiration Cards Carousel (approx 5-6 cards visible on desktop, 1.5-2 on mobile) */}
        <div 
          ref={inspirationCarouselRef}
          className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {inspirationFeed.map((item) => {
            const prod = item.product;
            const targetId = prod?.id || item.productId;
            const displayName = prod?.name || item.title;
            const displayPrice = prod?.price || item.price || 0;
            const origPrice = prod?.orig || item.orig;
            const categoryLabel = (prod?.category || item.categorySlug || item.category || '').replace(/-/g, ' ');

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.isVideo && item.videoUrl) {
                    setActiveVideoModal(item);
                  } else if (targetId) {
                    onSelectProduct(targetId);
                  }
                }}
                className="group w-[190px] sm:w-[210px] md:w-[220px] lg:w-[228px] shrink-0 snap-start relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2E2E2] bg-[#222222] cursor-pointer shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#3F8F91]"
              >
                {/* Tall portrait container with 9:15 (~0.60) proportion */}
                <div className="relative aspect-[9/15] w-full overflow-hidden bg-stone-900">
                  <img
                    src={item.img}
                    alt={displayName}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Dark subtle bottom gradient for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/95 via-[#222222]/35 to-transparent pointer-events-none" />

                  {/* Play button ONLY when asset is actual video */}
                  {item.isVideo && item.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-[#222222]/85 text-white flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 group-hover:bg-[#3F8F91] group-hover:text-white transition-all duration-200">
                        <Play size={20} className="fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Content Area */}
                  <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 pointer-events-auto">
                    {categoryLabel && (
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#3F8F91] mb-1 block truncate">
                        {categoryLabel}
                      </span>
                    )}

                    <h3 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-[#3F8F91] transition-colors line-clamp-2 leading-snug">
                      {displayName}
                    </h3>

                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-xs sm:text-sm font-bold text-white font-mono">
                        ₹{displayPrice.toLocaleString('en-IN')}
                      </span>
                      {origPrice && (
                        <span className="text-[10px] sm:text-xs text-white/60 line-through font-mono">
                          ₹{origPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Guidance Note */}
        <div className="flex sm:hidden items-center justify-between mt-3 text-xs text-[#777777]">
          <span className="text-[11px]">
            ← Swipe to explore inspiration feed →
          </span>
          <span className="text-[11px] font-bold text-[#3F8F91]">
            Tap card to inspect piece
          </span>
        </div>

      </section>

      {/* Video Modal (Only active if an actual video is selected) */}
      <AnimatePresence>
        {activeVideoModal && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveVideoModal(null)}
          >
            <div 
              className="relative w-full max-w-lg bg-[#222222] rounded-2xl overflow-hidden border border-[#E2E2E2]/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
              {activeVideoModal.videoUrl ? (
                <video 
                  src={activeVideoModal.videoUrl} 
                  poster={activeVideoModal.img}
                  controls 
                  autoPlay 
                  className="w-full aspect-[9/16] max-h-[70vh] object-cover"
                />
              ) : (
                <div className="p-8 text-center text-white">
                  <p className="font-serif text-lg font-bold">{activeVideoModal.title}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>


      {/* ── SECTION G: DEAL ZONE / WORKSHOP VALUE OFFERS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E2E2E2] p-6 sm:p-10 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#E53935]/10 text-[#E53935] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-[#E53935]/25">
                <Tag size={13} /> Direct Workshop Savings
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222]">
                Deal Zone & Furniture Value Bundles
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-1 max-w-xl">
                Bypass middleman distributor margins. Order complete authentic timber room suites crafted from single-source Malvan Sagwan logs.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="min-h-[44px] bg-[#3F8F91] hover:bg-[#2F7779] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Custom Suite Consultation</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* 3 Bundle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dealBundles.map((bundle) => (
              <div 
                key={bundle.id}
                onClick={() => {
                  if (bundle.productRefId) {
                    onSelectProduct(bundle.productRefId);
                  } else {
                    onSelectCategory(bundle.categorySlug);
                  }
                }}
                className="bg-[#FAFAF8] rounded-xl border border-[#E2E2E2] hover:border-[#3F8F91] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#F5F5F5] overflow-hidden">
                    <img 
                      src={bundle.img} 
                      alt={bundle.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    
                    {/* Savings Tag */}
                    <span className="absolute top-2.5 left-2.5 bg-[#E53935] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-2xs flex items-center gap-1">
                      <Check size={11} /> Save ₹{bundle.savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    <span className="text-[10px] font-bold text-[#F47B20] uppercase tracking-wider block mb-1">
                      {bundle.tag}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#222222] group-hover:text-[#3F8F91] transition-colors leading-snug">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-[#555555] mt-1.5 leading-relaxed line-clamp-2">
                      {bundle.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-[#E2E2E2] flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-[#777777]">Bundle Price</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#E53935] font-mono">
                          ₹{bundle.dealPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#999999] line-through font-mono">
                          ₹{bundle.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <span className="min-h-[36px] px-3.5 bg-[#F5F5F5] group-hover:bg-[#3F8F91] text-[#222222] group-hover:text-white font-bold text-xs rounded flex items-center gap-1 transition-colors">
                      <span>Explore</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ── SECTION H: SHOP THE LOOK (EDITORIAL IMAGE MOSAIC WITH PRODUCT HOTSPOTS) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#3F8F91] block mb-1">
              Curated Living Environments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#222222]">
              Shop The Look
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] mt-1">
              Explore authentic handcrafted solid timber ensembles styled in real living spaces.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#555555]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#3F8F91]" />
            <span>Click any circular marker to inspect handcrafted pieces</span>
          </div>
        </div>

        {/* Desktop: Asymmetric 5-Image Editorial Mosaic Grid */}
        <div className="hidden md:flex md:flex-col gap-3.5">
          {/* Top Row: Large Feature (7 cols) + Supporting Suite (5 cols) */}
          <div className="grid grid-cols-12 gap-3.5 h-[350px]">
            {/* Scene 1: Large Feature Living Room (Col 1-7) */}
            {(() => {
              const scene = shopTheLookScenes[0];
              return (
                <div 
                  key={scene.id}
                  className="col-span-7 relative rounded-2xl overflow-hidden border border-[#E2E2E2] group bg-stone-900"
                >
                  <img
                    src={scene.img}
                    alt={scene.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/85 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Room Tag & Title */}
                  <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3F8F91] block mb-0.5">
                      {scene.roomTag}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white drop-shadow-xs">
                      {scene.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 line-clamp-1">
                      {scene.subtitle}
                    </p>
                  </div>

                  {/* Hotspots */}
                  {scene.hotspots.map((spot) => {
                    const isActive = activeHotspotId === spot.id;
                    const horizontalClass = spot.x > 70 
                      ? 'right-0 translate-x-2' 
                      : spot.x < 30 
                      ? 'left-0 -translate-x-2' 
                      : 'left-1/2 -translate-x-1/2';
                    const verticalClass = spot.y < 35 
                      ? 'top-full mt-2.5' 
                      : 'bottom-full mb-2.5';

                    return (
                      <div
                        key={spot.id}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotId(isActive ? null : spot.id);
                          }}
                          className="group/hs relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-none"
                          aria-label={`View ${spot.label}`}
                          title={`View ${spot.label}`}
                        >
                          <span className="absolute w-8 h-8 rounded-full bg-white/40 opacity-0 group-hover/hs:opacity-100 group-hover/hs:scale-125 transition-all duration-300 pointer-events-none" />
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 ${
                            isActive 
                              ? 'bg-[#3F8F91] border-white text-white scale-110' 
                              : 'bg-[#222222]/85 backdrop-blur-xs border-white/80 text-white hover:bg-[#222222] hover:border-[#3F8F91] group-hover/hs:scale-105'
                          }`}>
                            <span className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              isActive ? 'bg-white' : 'bg-[#3F8F91] group-hover/hs:bg-white'
                            }`} />
                          </span>
                        </button>

                        {/* Compact Product Preview */}
                        <AnimatePresence>
                          {isActive && spot.product && (
                            <motion.div
                              initial={{ opacity: 0, y: spot.y < 35 ? -6 : 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: spot.y < 35 ? -6 : 6, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute ${verticalClass} ${horizontalClass} w-60 sm:w-64 bg-white rounded-xl p-3 shadow-2xl border border-[#E2E2E2] text-[#222222] z-40 pointer-events-auto`}
                            >
                              <div className="flex items-start gap-2.5">
                                <img
                                  src={spot.product.img}
                                  alt={spot.product.name}
                                  className="w-13 h-13 rounded-lg object-cover bg-[#F5F5F5] border border-[#E2E2E2] shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[9px] font-bold text-[#3F8F91] uppercase tracking-wider block truncate">
                                    {(spot.product?.category || '').replace(/-/g, ' ')}
                                  </span>
                                  <h4 className="font-serif font-bold text-xs text-[#222222] line-clamp-2 leading-tight mt-0.5">
                                    {spot.product.name}
                                  </h4>
                                  <div className="text-xs font-bold text-[#222222] font-mono mt-1">
                                    ₹{spot.product.price.toLocaleString('en-IN')}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspotId(null);
                                  }}
                                  className="text-stone-400 hover:text-stone-700 p-0.5 transition-colors cursor-pointer"
                                  aria-label="Close preview"
                                >
                                  <X size={14} />
                                </button>
                              </div>

                              <div className="mt-2.5 pt-2 border-t border-[#EEEEEE]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (spot.product) onSelectProduct(spot.product.id);
                                  }}
                                  className="w-full min-h-[34px] bg-[#3F8F91] hover:bg-[#347F81] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <span>View Product</span>
                                  <ArrowRight size={13} />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Scene 2: Bedroom Suite (Col 8-12) */}
            {(() => {
              const scene = shopTheLookScenes[1];
              return (
                <div 
                  key={scene.id}
                  className="col-span-5 relative rounded-2xl overflow-hidden border border-[#E2E2E2] group bg-stone-900"
                >
                  <img
                    src={scene.img}
                    alt={scene.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/85 via-transparent to-black/20 pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3F8F91] block mb-0.5">
                      {scene.roomTag}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white drop-shadow-xs">
                      {scene.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 line-clamp-1">
                      {scene.subtitle}
                    </p>
                  </div>

                  {scene.hotspots.map((spot) => {
                    const isActive = activeHotspotId === spot.id;
                    const horizontalClass = spot.x > 70 
                      ? 'right-0 translate-x-2' 
                      : spot.x < 30 
                      ? 'left-0 -translate-x-2' 
                      : 'left-1/2 -translate-x-1/2';
                    const verticalClass = spot.y < 35 
                      ? 'top-full mt-2.5' 
                      : 'bottom-full mb-2.5';

                    return (
                      <div
                        key={spot.id}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotId(isActive ? null : spot.id);
                          }}
                          className="group/hs relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-none"
                          aria-label={`View ${spot.label}`}
                          title={`View ${spot.label}`}
                        >
                          <span className="absolute w-8 h-8 rounded-full bg-white/40 opacity-0 group-hover/hs:opacity-100 group-hover/hs:scale-125 transition-all duration-300 pointer-events-none" />
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 ${
                            isActive 
                              ? 'bg-[#3F8F91] border-white text-white scale-110' 
                              : 'bg-[#222222]/85 backdrop-blur-xs border-white/80 text-white hover:bg-[#222222] hover:border-[#3F8F91] group-hover/hs:scale-105'
                          }`}>
                            <span className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              isActive ? 'bg-white' : 'bg-[#3F8F91] group-hover/hs:bg-white'
                            }`} />
                          </span>
                        </button>

                        <AnimatePresence>
                          {isActive && spot.product && (
                            <motion.div
                              initial={{ opacity: 0, y: spot.y < 35 ? -6 : 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: spot.y < 35 ? -6 : 6, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute ${verticalClass} ${horizontalClass} w-60 sm:w-64 bg-white rounded-xl p-3 shadow-2xl border border-[#E2E2E2] text-[#222222] z-40 pointer-events-auto`}
                            >
                              <div className="flex items-start gap-2.5">
                                <img
                                  src={spot.product.img}
                                  alt={spot.product.name}
                                  className="w-13 h-13 rounded-lg object-cover bg-[#F5F5F5] border border-[#E2E2E2] shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[9px] font-bold text-[#3F8F91] uppercase tracking-wider block truncate">
                                    {(spot.product?.category || '').replace(/-/g, ' ')}
                                  </span>
                                  <h4 className="font-serif font-bold text-xs text-[#222222] line-clamp-2 leading-tight mt-0.5">
                                    {spot.product.name}
                                  </h4>
                                  <div className="text-xs font-bold text-[#222222] font-mono mt-1">
                                    ₹{spot.product.price.toLocaleString('en-IN')}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspotId(null);
                                  }}
                                  className="text-stone-400 hover:text-stone-700 p-0.5 transition-colors cursor-pointer"
                                  aria-label="Close preview"
                                >
                                  <X size={14} />
                                </button>
                              </div>

                              <div className="mt-2.5 pt-2 border-t border-[#EEEEEE]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (spot.product) onSelectProduct(spot.product.id);
                                  }}
                                  className="w-full min-h-[34px] bg-[#3F8F91] hover:bg-[#347F81] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <span>View Product</span>
                                  <ArrowRight size={13} />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          {/* Bottom Row: 3 Distinct Dimension Supporting Rooms (4 cols each) */}
          <div className="grid grid-cols-12 gap-3.5 h-[280px]">
            {shopTheLookScenes.slice(2, 5).map((scene) => (
              <div 
                key={scene.id}
                className="col-span-4 relative rounded-2xl overflow-hidden border border-[#E2E2E2] group bg-stone-900"
              >
                <img
                  src={scene.img}
                  alt={scene.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/85 via-transparent to-black/20 pointer-events-none" />
                
                <div className="absolute bottom-3.5 left-4 right-4 pointer-events-none">
                  <span className="text-[9.5px] font-bold uppercase tracking-widest text-[#3F8F91] block mb-0.5">
                    {scene.roomTag}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-white drop-shadow-xs truncate">
                    {scene.title}
                  </h3>
                </div>

                {scene.hotspots.map((spot) => {
                  const isActive = activeHotspotId === spot.id;
                  const horizontalClass = spot.x > 70 
                    ? 'right-0 translate-x-2' 
                    : spot.x < 30 
                    ? 'left-0 -translate-x-2' 
                    : 'left-1/2 -translate-x-1/2';
                  const verticalClass = spot.y < 35 
                    ? 'top-full mt-2.5' 
                    : 'bottom-full mb-2.5';

                  return (
                    <div
                      key={spot.id}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspotId(isActive ? null : spot.id);
                        }}
                        className="group/hs relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-none"
                        aria-label={`View ${spot.label}`}
                        title={`View ${spot.label}`}
                      >
                        <span className="absolute w-8 h-8 rounded-full bg-white/40 opacity-0 group-hover/hs:opacity-100 group-hover/hs:scale-125 transition-all duration-300 pointer-events-none" />
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 ${
                          isActive 
                            ? 'bg-[#3F8F91] border-white text-white scale-110' 
                            : 'bg-[#222222]/85 backdrop-blur-xs border-white/80 text-white hover:bg-[#222222] hover:border-[#3F8F91] group-hover/hs:scale-105'
                        }`}>
                          <span className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            isActive ? 'bg-white' : 'bg-[#3F8F91] group-hover/hs:bg-white'
                          }`} />
                        </span>
                      </button>

                      <AnimatePresence>
                        {isActive && spot.product && (
                          <motion.div
                            initial={{ opacity: 0, y: spot.y < 35 ? -6 : 6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: spot.y < 35 ? -6 : 6, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute ${verticalClass} ${horizontalClass} w-60 bg-white rounded-xl p-3 shadow-2xl border border-[#E2E2E2] text-[#222222] z-40 pointer-events-auto`}
                          >
                            <div className="flex items-start gap-2.5">
                              <img
                                src={spot.product.img}
                                alt={spot.product.name}
                                className="w-13 h-13 rounded-lg object-cover bg-[#F5F5F5] border border-[#E2E2E2] shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-1 min-w-0">
                                <span className="text-[9px] font-bold text-[#3F8F91] uppercase tracking-wider block truncate">
                                  {(spot.product?.category || '').replace(/-/g, ' ')}
                                </span>
                                <h4 className="font-serif font-bold text-xs text-[#222222] line-clamp-2 leading-tight mt-0.5">
                                  {spot.product.name}
                                </h4>
                                <div className="text-xs font-bold text-[#222222] font-mono mt-1">
                                  ₹{spot.product.price.toLocaleString('en-IN')}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveHotspotId(null);
                                }}
                                className="text-stone-400 hover:text-stone-700 p-0.5 transition-colors cursor-pointer"
                                aria-label="Close preview"
                              >
                                <X size={14} />
                              </button>
                            </div>

                              <div className="mt-2.5 pt-2 border-t border-[#EEEEEE]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (spot.product) onSelectProduct(spot.product.id);
                                  }}
                                  className="w-full min-h-[34px] bg-[#3F8F91] hover:bg-[#347F81] text-white text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                  <span>View Product</span>
                                  <ArrowRight size={13} />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Horizontal Swipeable Image Carousel (md:hidden) */}
          <div className="md:hidden">
            <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3.5 pb-2 -mx-4 px-4">
              {shopTheLookScenes.map((scene) => (
                <div
                  key={scene.id}
                  className="w-[86vw] max-w-[360px] aspect-[4/3] relative rounded-xl overflow-hidden shrink-0 snap-center border border-[#E2E2E2] bg-stone-900"
                >
                  <img
                    src={scene.img}
                    alt={scene.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/85 via-transparent to-black/20 pointer-events-none" />

                  {/* Room tag & title at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F8F91] block">
                      {scene.roomTag}
                    </span>
                    <h3 className="font-serif text-sm font-bold text-white drop-shadow-xs truncate">
                      {scene.title}
                    </h3>
                  </div>

                  {/* Hotspots */}
                  {scene.hotspots.map((spot) => {
                    const isActive = activeHotspotId === spot.id;
                    const horizontalClass = spot.x > 60 
                      ? 'right-0 translate-x-2' 
                      : spot.x < 40 
                      ? 'left-0 -translate-x-2' 
                      : 'left-1/2 -translate-x-1/2';
                    const verticalClass = spot.y < 45 
                      ? 'top-full mt-2' 
                      : 'bottom-full mb-2';

                    return (
                      <div
                        key={spot.id}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotId(isActive ? null : spot.id);
                          }}
                          className="group/hs relative min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-none"
                          aria-label={`View ${spot.label}`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 ${
                            isActive 
                              ? 'bg-[#3F8F91] border-white text-white scale-110' 
                              : 'bg-[#222222]/85 backdrop-blur-xs border-white/80 text-white'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              isActive ? 'bg-white' : 'bg-[#3F8F91]'
                            }`} />
                          </span>
                        </button>

                        <AnimatePresence>
                          {isActive && spot.product && (
                            <motion.div
                              initial={{ opacity: 0, y: spot.y < 45 ? -6 : 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: spot.y < 45 ? -6 : 6, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute ${verticalClass} ${horizontalClass} w-56 bg-white rounded-xl p-2.5 shadow-2xl border border-[#E2E2E2] text-[#222222] z-40 pointer-events-auto`}
                            >
                              <div className="flex items-start gap-2">
                                <img
                                  src={spot.product.img}
                                  alt={spot.product.name}
                                  className="w-12 h-12 rounded-lg object-cover bg-[#F5F5F5] border border-[#E2E2E2] shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[8.5px] font-bold text-[#3F8F91] uppercase tracking-wider block truncate">
                                    {(spot.product?.category || '').replace(/-/g, ' ')}
                                  </span>
                                  <h4 className="font-serif font-bold text-[11px] text-[#222222] line-clamp-2 leading-tight mt-0.5">
                                    {spot.product.name}
                                  </h4>
                                  <div className="text-[11px] font-bold text-[#222222] font-mono mt-0.5">
                                    ₹{spot.product.price.toLocaleString('en-IN')}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspotId(null);
                                  }}
                                  className="text-stone-400 hover:text-stone-700 p-0.5 transition-colors cursor-pointer"
                                  aria-label="Close preview"
                                >
                                  <X size={13} />
                                </button>
                              </div>

                              <div className="mt-2 pt-1.5 border-t border-[#EEEEEE]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (spot.product) onSelectProduct(spot.product.id);
                                  }}
                                  className="w-full min-h-[32px] bg-[#3F8F91] hover:bg-[#347F81] text-white text-[10.5px] font-bold py-1 px-2.5 rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <span>View Product</span>
                                  <ArrowRight size={12} />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-[#555555]">
              <span className="text-[11px]">
                ← Swipe to explore 5 styled environments →
              </span>
              <span className="text-[11px] font-bold text-[#3F8F91]">
                Tap markers for product specs
              </span>
            </div>
          </div>

        </section>


      {/* ── SECTION H2: EXPLORE HYDRAULIC BEDS (Shared Image 1) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
            Explore Hydraulic Beds
          </h2>
          <button
            type="button"
            onClick={() => onSelectCategory('beds')}
            className="text-[#B08A57] hover:text-[#211A16] font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>View All</span>
          </button>
        </div>

        {/* Carousel Container with Overlaid Right Arrow */}
        <div className="relative group/carousel">
          <div
            ref={hydraulicBedsCarouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {hydraulicBeds.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.productId) onSelectProduct(item.productId);
                }}
                className="group w-[240px] sm:w-[270px] shrink-0 snap-start bg-white rounded-xl overflow-hidden border border-[#DED6CC] hover:border-[#B08A57] transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer flex flex-col"
              >
                {/* Image Container with 1:1 Square Ratio */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F7F4EE]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-1">
                  <span className="text-[11px] text-[#756B62] font-medium block mb-1">
                    {item.brand}
                  </span>

                  <h3 className="text-xs sm:text-sm font-semibold text-[#211A16] line-clamp-2 leading-snug group-hover:text-[#B08A57] transition-colors min-h-[36px]">
                    {item.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-[#F0EBE3]">
                    <span className="text-sm sm:text-base font-bold text-[#211A16] font-mono">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.orig && (
                      <span className="text-xs text-[#756B62] line-through font-mono">
                        ₹{item.orig.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#2E7D32] ml-auto">
                      {item.discount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Navigation Controls */}
          <button
            type="button"
            onClick={() => handleScrollHydraulicBeds('left')}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#211A16]/80 hover:bg-[#211A16] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs border border-white/20 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Previous beds"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => handleScrollHydraulicBeds('right')}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#211A16]/80 hover:bg-[#211A16] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs border border-white/20"
            aria-label="Next beds"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>


      {/* ── SECTION H3: EXPLORE LOUNGE CHAIRS (Shared Image 2) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
            Explore Lounge Chairs
          </h2>
          <button
            type="button"
            onClick={() => onSelectCategory('wooden-chairs')}
            className="text-[#B08A57] hover:text-[#211A16] font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>View All</span>
          </button>
        </div>

        {/* Carousel Container with Overlaid Right Arrow */}
        <div className="relative group/carousel">
          <div
            ref={loungeChairsCarouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {loungeChairs.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.productId) onSelectProduct(item.productId);
                }}
                className="group w-[240px] sm:w-[270px] shrink-0 snap-start bg-white rounded-xl overflow-hidden border border-[#DED6CC] hover:border-[#B08A57] transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer flex flex-col"
              >
                {/* Image Container with 1:1 Square Ratio */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#F7F4EE]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-1">
                  <span className="text-[11px] text-[#756B62] font-medium block mb-1">
                    {item.brand}
                  </span>

                  <h3 className="text-xs sm:text-sm font-semibold text-[#211A16] line-clamp-2 leading-snug group-hover:text-[#B08A57] transition-colors min-h-[36px]">
                    {item.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-2 pt-2 border-t border-[#F0EBE3]">
                    <span className="text-sm sm:text-base font-bold text-[#211A16] font-mono">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.orig && (
                      <span className="text-xs text-[#756B62] line-through font-mono">
                        ₹{item.orig.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#2E7D32] ml-auto">
                      {item.discount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Navigation Controls */}
          <button
            type="button"
            onClick={() => handleScrollLoungeChairs('left')}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#211A16]/80 hover:bg-[#211A16] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs border border-white/20 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Previous chairs"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => handleScrollLoungeChairs('right')}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#211A16]/80 hover:bg-[#211A16] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-xs border border-white/20"
            aria-label="Next chairs"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>


      {/* ── SECTION H4: HOME DECOR (Shared Image 3) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-[#FAF7F2] rounded-2xl sm:rounded-3xl border border-[#E8E1D7] p-6 sm:p-10 shadow-2xs">
          
          {/* Section Header */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
                Home Decor
              </h2>
              <p className="text-xs sm:text-sm text-[#756B62] mt-0.5">
                Because every detail matters
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectCategory('chaurang-and-paats')}
              className="border border-[#211A16]/25 bg-white/80 hover:bg-[#211A16] hover:text-white rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-semibold text-[#211A16] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 8-Item Decor Categories Grid (4 cols on desktop, 2 cols on mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {homeDecorCategories.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectCategory(item.category)}
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8E1D7] shadow-2xs hover:shadow-md hover:border-[#B08A57] transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F4EE]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="p-3 sm:p-4 text-center sm:text-left">
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#211A16] group-hover:text-[#B08A57] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#756B62] mt-0.5 font-medium">
                    {item.startPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ── SECTION I: FEATURED COLLECTION SPOTLIGHT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-gradient-to-br from-[#F7F4EE] to-[#EFE9DF] rounded-2xl sm:rounded-3xl border border-[#DED6CC] p-6 sm:p-10 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1">
                Signature Collection Spotlight
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
                The Sagwan Heirloom Sanctuary
              </h2>
              <p className="text-xs sm:text-sm text-[#756B62] mt-1 max-w-xl">
                A cohesive suite of kiln-seasoned teak furniture designed for serene Indian homes—uniting sacred grace, generational durability, and timeless warm amber tones.
              </p>
            </div>

            <button
              onClick={() => onSelectCategory('beds')}
              className="min-h-[44px] bg-[#B08A57] hover:bg-[#C59A63] text-[#2B1D17] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore Entire Suite</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Collection Grid: 1 Hero Centerpiece + 3 Companion Pieces */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Main Feature (Mandir Centerpiece) */}
            <div 
              onClick={() => onSelectProduct(featuredCollectionPieces.centerpiece.id)}
              className="lg:col-span-7 bg-white rounded-xl sm:rounded-2xl border border-[#DED6CC] hover:border-[#B08A57] overflow-hidden shadow-2xs group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#F7F4EE] overflow-hidden">
                <img 
                  src={featuredCollectionPieces.centerpiece.img} 
                  alt={featuredCollectionPieces.centerpiece.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#2B1D17] text-[#B08A57] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-2xs">
                  Collection Centerpiece
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-bold text-[#B08A57] uppercase tracking-wider block">
                    Sacred Woodcraft
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-xl text-[#211A16] group-hover:text-[#B08A57] transition-colors mt-0.5">
                    {featuredCollectionPieces.centerpiece.name}
                  </h3>
                  <p className="text-xs text-[#756B62] mt-1.5 leading-relaxed">
                    Designed for divine domestic spaces, hand-carved with traditional Konkan motifs and borer-resistant Sagwan seasoning.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F7F4EE] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#756B62] uppercase block">Workshop Base Price</span>
                    <span className="text-lg font-bold text-[#211A16] font-mono">
                      ₹{featuredCollectionPieces.centerpiece.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#B08A57] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Inspect Design</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>

            {/* Right Mini-Grid (3 Related Products) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {[featuredCollectionPieces.companion1, featuredCollectionPieces.companion2, featuredCollectionPieces.companion3].map((piece, idx) => (
                <div
                  key={piece.id || idx}
                  onClick={() => onSelectProduct(piece.id)}
                  className="bg-white rounded-xl border border-[#DED6CC] hover:border-[#B08A57] p-3 sm:p-4 shadow-2xs group cursor-pointer flex items-center gap-4 transition-all"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#F7F4EE] shrink-0 border border-[#DED6CC]">
                    <img 
                      src={piece.img} 
                      alt={piece.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9.5px] font-bold text-[#B08A57] uppercase tracking-wider block">
                      {(piece?.category || '').replace(/-/g, ' ')}
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#211A16] group-hover:text-[#B08A57] transition-colors truncate">
                      {piece.name}
                    </h4>
                    <p className="text-xs text-[#211A16] font-bold font-mono mt-1">
                      ₹{piece.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <ChevronRight size={16} className="text-stone-400 group-hover:text-[#B08A57] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ── SECTION J: BESTSELLING FURNITURE (With Category Tabs) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        {/* Section Header with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1">
              Sindhudurg Classics
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
              Customer Bestselling Furniture
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {[
              { label: 'All Bestsellers', val: 'all' },
              { label: 'Teak Beds', val: 'beds' },
              { label: 'Living Sofas', val: 'wooden-sofas' },
              { label: 'Sacred Mandirs', val: 'wooden-mandirs' },
              { label: 'Dining Tables', val: 'dining-tables' }
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setBestsellerFilter(tab.val as any)}
                className={`min-h-[38px] whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  bestsellerFilter === tab.val
                    ? 'bg-[#2B1D17] text-white shadow-2xs'
                    : 'bg-white text-[#756B62] hover:text-[#211A16] border border-[#DED6CC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Products Desktop / 3 Tablet / 2 Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellerProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const discountPct = product.orig && product.orig > product.price 
              ? Math.round(((product.orig - product.price) / product.orig) * 100) 
              : 25;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="group bg-white rounded-xl border border-[#DED6CC] hover:border-[#B08A57] shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-[#F7F4EE] overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Discount Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-[#47705A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                      {discountPct}% OFF
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-600 flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      aria-label="Save to wishlist"
                    >
                      <Heart 
                        size={16} 
                        className={isWishlisted ? 'fill-[#B08A57] stroke-[#B08A57] text-[#B08A57]' : 'text-stone-500'} 
                      />
                    </button>
                  </div>

                  <div className="p-3.5 sm:p-4">
                    <span className="text-[10px] font-bold text-[#B08A57] uppercase tracking-wider block mb-1">
                      {(product?.category || '').replace(/-/g, ' ')}
                    </span>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#211A16] group-hover:text-[#B08A57] transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>

                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mt-1.5 text-amber-500">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#756B62] font-mono">(4.9)</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 pt-0">
                  <div className="pt-2.5 border-t border-[#F7F4EE] flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-[#756B62]">Workshop Price</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-bold text-[#211A16] font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.orig && (
                          <span className="text-[11px] text-[#756B62] line-through font-mono">
                            ₹{product.orig.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#B08A57] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      <span>View</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>


      {/* ── SECTION K: SHOP BY ROOM ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1">
            Harmonious Spaces
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
            Shop by Room Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#756B62] mt-1.5">
            Explore complete solid timber arrangements tailored to your home layout.
          </p>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar pb-3 sm:pb-0 snap-x snap-mandatory">
          {ROOM_COLLECTIONS.map((room) => (
            <div
              key={room.id}
              onClick={() => onSelectCategory(room.categorySlug)}
              className="min-w-[260px] sm:min-w-0 flex-1 group bg-white rounded-xl sm:rounded-2xl border border-[#DED6CC] hover:border-[#B08A57] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between snap-start"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F4EE]">
                <img 
                  src={room.img} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 bg-[#2B1D17]/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {room.itemCount}
                </span>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#211A16] group-hover:text-[#B08A57] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#756B62] mt-1 leading-snug">
                    {room.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#F7F4EE] flex items-center justify-between text-xs font-semibold text-[#756B62] group-hover:text-[#B08A57]">
                  <span>View Room Designs</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>


      {/* ── SECTION L: CRAFTSMANSHIP & HERITAGE STORY ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#DED6CC] p-6 sm:p-10 lg:p-12 shadow-2xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Large Workshop Image */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F7F4EE] border border-[#DED6CC]">
                <img 
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1100&q=80" 
                  alt="Crafted in Timber. Finished by Hand." 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Floating Heritage Badge */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:right-6 bg-[#2B1D17] text-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border border-[#B08A57]/40 max-w-[240px]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-300 block mb-0.5">
                  Timber Heritage
                </span>
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#B08A57]">
                  Est. 1995
                </div>
                <p className="text-[11px] text-stone-300 mt-1 leading-tight">
                  Over 4,500 custom solid wood pieces delivered across Sindhudurg & Goa.
                </p>
              </div>
            </div>

            {/* Editorial Story */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-2">
                Sindhudurg Carpentry Heritage
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#211A16] leading-tight mb-4">
                Crafted in Timber. Finished by Hand.
              </h2>

              <p className="text-xs sm:text-sm text-[#756B62] leading-relaxed mb-4">
                Every piece leaving our Sindhudurg workshop is shaped from slow-seasoned native Sagwan teak and Acacia. Master karigars hand-chisel traditional mortise-and-tenon joints that withstand Konkan coastal humidity without sagging or warping.
              </p>

              <blockquote className="border-l-2 border-[#B08A57] pl-3.5 py-1.5 italic text-xs sm:text-sm text-[#756B62] mb-6 bg-[#F7F4EE] rounded-r-lg">
                "{websiteContent?.aboutQuote || "Every ring in a log represents a monsoon we stood together. We don't just shape wood; we preserve Malvan's heritage in your living quarters."}"
              </blockquote>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="min-h-[44px] bg-[#2B1D17] hover:bg-[#3A2922] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read Our Workshop Story</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onNavigate('showroom')}
                  className="min-h-[44px] border border-[#DED6CC] hover:border-[#B08A57] text-[#211A16] font-medium text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin size={14} className="text-[#B08A57]" />
                  <span>Showroom Tour</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ── SECTION M: EXPERIENCE STORES / SHOWROOM VISIT CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-[#2B1D17] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden border border-[#3A2922] shadow-sm">
          
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1.5">
              Sindhudurg Experience Centers
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Experience the Weight of Real Teakwood
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Touch genuine hand-rubbed oil finishes, test hydraulic storage mechanisms, and consult directly with our master craftsmen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Showroom 1: Malvan Flagship */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xs hover:border-[#B08A57]/60 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B08A57] tracking-wider block mb-0.5">
                    Flagship Workshop & Store
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Malvan Town Center
                  </h3>
                </div>
                <span className="bg-[#B08A57]/20 text-[#B08A57] text-[10px] font-bold px-2 py-0.5 rounded border border-[#B08A57]/40">
                  Open 7 Days
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                Main Market Road, Malvan, Sindhudurg, Maharashtra – 416606
              </p>

              <div className="text-xs text-stone-300 flex flex-col gap-1.5 pt-3 border-t border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#B08A57]" />
                  <span>9:00 AM – 8:30 PM (Daily)</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall size={13} className="text-[#B08A57]" />
                  <span>+91 70574 41122</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('showroom')}
                  className="flex-1 min-h-[40px] bg-[#B08A57] hover:bg-[#C59A63] text-[#2B1D17] font-bold text-xs py-2 rounded transition-colors cursor-pointer text-center"
                >
                  Showroom Details
                </button>
                <a
                  href="https://maps.google.com/?q=Malvan+Sindhudurg"
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] px-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
                >
                  <MapPin size={13} />
                  <span>Map</span>
                </a>
              </div>
            </div>

            {/* Showroom 2: Sukalwad Highway */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xs hover:border-[#B08A57]/60 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#B08A57] tracking-wider block mb-0.5">
                    Highway Mega Display
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Sukalwad NH-66 Showroom
                  </h3>
                </div>
                <span className="bg-[#B08A57]/20 text-[#B08A57] text-[10px] font-bold px-2 py-0.5 rounded border border-[#B08A57]/40">
                  Easy Parking
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed mb-4">
                NH-66 Highway, Sukalwad, Sindhudurg, Maharashtra – 416520
              </p>

              <div className="text-xs text-stone-300 flex flex-col gap-1.5 pt-3 border-t border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#B08A57]" />
                  <span>9:00 AM – 9:00 PM (Daily)</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall size={13} className="text-[#B08A57]" />
                  <span>+91 70574 41122</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('showroom')}
                  className="flex-1 min-h-[40px] bg-[#B08A57] hover:bg-[#C59A63] text-[#2B1D17] font-bold text-xs py-2 rounded transition-colors cursor-pointer text-center"
                >
                  Showroom Details
                </button>
                <a
                  href="https://maps.google.com/?q=Sukalwad+Sindhudurg"
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] px-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
                >
                  <MapPin size={13} />
                  <span>Map</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── SECTION N: CUSTOMER TRUST & SOCIAL PROOF ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1">
            Real Konkan Voices
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
            Trusted in Over 4,500 Homes
          </h2>
          <p className="text-xs sm:text-sm text-[#756B62] mt-1.5">
            Authentic feedback from families who furnished their ancestral homes with Bhisez solid wood.
          </p>
        </div>

        {/* 1 Featured First Testimonial + Supporting Testimonials Column */}
        <div className="flex sm:grid sm:grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto sm:overflow-visible no-scrollbar pb-3 sm:pb-0 snap-x snap-mandatory">
          
          {/* Featured First Testimonial */}
          <div className="min-w-[280px] sm:min-w-0 md:col-span-2 bg-white rounded-xl sm:rounded-2xl border-2 border-[#B08A57]/30 p-6 sm:p-8 shadow-2xs flex flex-col justify-between snap-start">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-500">
                  {[...Array(TESTIMONIALS[0]?.stars || 5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 bg-[#F7F4EE] text-[#47705A] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#47705A]/30">
                  <CheckCircle2 size={11} /> Verified Buyer
                </span>
              </div>

              <p className="font-serif text-sm sm:text-base md:text-lg text-[#211A16] font-normal leading-relaxed mb-6 italic">
                "{TESTIMONIALS[0]?.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#F7F4EE] flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#211A16]">
                  {TESTIMONIALS[0]?.name}
                </h4>
                <p className="text-xs text-[#756B62] flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-[#B08A57]" />
                  <span>{TESTIMONIALS[0]?.location}, Sindhudurg</span>
                </p>
              </div>
              <span className="text-xs text-[#756B62] font-medium hidden sm:inline">
                Bedroom & Storage Furniture
              </span>
            </div>
          </div>

          {/* Supporting Testimonials Column */}
          <div className="min-w-[260px] sm:min-w-0 flex flex-col gap-4 snap-start">
            {TESTIMONIALS.slice(1, 3).map((t, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-[#DED6CC] p-5 shadow-2xs flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex text-amber-500 mb-2.5">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#211A16] leading-relaxed mb-3 font-normal">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F7F4EE] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#211A16]">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-[#756B62]">
                      {t.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#47705A] font-semibold bg-[#47705A]/10 px-1.5 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>


      {/* ── SECTION O: FINAL CONVERSION CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-[#2B1D17] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-white relative overflow-hidden border border-[#3A2922] shadow-md text-center md:text-left">
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-2">
              Bespoke Carpentry & Workshop Orders
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight mb-3 text-white">
              Furnish Your Home with Generational Teak
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-normal leading-relaxed mb-6">
              Need custom room sizing, matrimonial bedroom packages, or sacred temple architecture? Connect directly with our master craftsmen on WhatsApp or visit our Konkan showrooms.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5">
              <button
                onClick={() => onNavigate('beds')}
                className="min-h-[44px] bg-[#B08A57] hover:bg-[#C59A63] text-[#2B1D17] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center gap-2"
                id="final-catalog-cta"
              >
                <span>Explore Catalog</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => onNavigate('showroom')}
                className="min-h-[44px] bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                id="final-showroom-cta"
              >
                <Store size={15} className="text-[#B08A57]" />
                <span>Visit Showroom</span>
              </button>

              <a
                href={`https://wa.me/917057441122?text=${encodeURIComponent("Hello Bhisez Furniture! I am browsing your website and would like to discuss custom furniture sizing and teak pricing.")}`}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] bg-[#47705A] hover:bg-[#3d604d] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center gap-2"
                id="final-whatsapp-cta"
              >
                <MessageCircle size={15} />
                <span>Custom Furniture WhatsApp</span>
              </a>
            </div>

            {/* Quick Showroom Facts */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300 text-left">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#B08A57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Malvan Flagship:</strong>
                  <span>Main Market Road, Malvan, Sindhudurg – 416606</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#B08A57] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Highway Showroom:</strong>
                  <span>NH-66 Highway, Sukalwad, Sindhudurg – 416520</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
