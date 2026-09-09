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
  Award
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
  const [activeHotspot, setActiveHotspot] = useState<number | null>(1);

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
      if (!seenCat.has(p.category)) {
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
    const bedItem = products.find(p => p.category === 'beds') || products[0];
    const sofaItem = products.find(p => p.category === 'wooden-sofas') || products[1];
    const mandirItem = products.find(p => p.category === 'wooden-mandirs') || products[2];

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

  // Shop The Look Living Room Hotspots (Section H)
  const lookHotspots = useMemo(() => {
    const sofa = products.find(p => p.category === 'wooden-sofas') || products[0];
    const table = products.find(p => p.category === 'teapoys-coffee-tables') || products[1];
    const swing = products.find(p => p.category === 'wooden-swings') || products[2];

    return [
      {
        id: 1,
        x: 36, // percent from left
        y: 62, // percent from top
        product: sofa,
        label: 'Solid Teak Sofa Set'
      },
      {
        id: 2,
        x: 62,
        y: 74,
        product: table,
        label: 'Hand-Carved Coffee Table'
      },
      {
        id: 3,
        x: 78,
        y: 38,
        product: swing,
        label: 'Traditional Teak Swing'
      }
    ];
  }, [products]);

  // Featured Collection Pieces (Section I)
  const featuredCollectionPieces = useMemo(() => {
    const centerpiece = products.find(p => p.category === 'wooden-mandirs') || products[0];
    const companion1 = products.find(p => p.category === 'beds') || products[1];
    const companion2 = products.find(p => p.category === 'wooden-sofas') || products[2];
    const companion3 = products.find(p => p.category === 'dining-tables') || products[3];
    return { centerpiece, companion1, companion2, companion3 };
  }, [products]);

  // Bestsellers (Section J)
  const bestsellerProducts = useMemo(() => {
    const list = products.filter((p) => {
      if (bestsellerFilter === 'all') return true;
      return p.category === bestsellerFilter;
    });
    return list.slice(0, 8);
  }, [products, bestsellerFilter]);

  return (
    <div className="bg-[#F7F4EE] text-[#211A16] min-h-screen font-sans">

      {/* ── SECTION A: ANNOUNCEMENT / OFFER BAR ── */}
      {showAnnouncement && (
        <div className="bg-[#2B1D17] text-[#F7F4EE] border-b border-[#3A2922] py-2 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden text-center sm:text-left mx-auto sm:mx-0">
              <span className="inline-flex items-center gap-1 bg-[#B08A57] text-[#2B1D17] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0">
                <Sparkles size={11} /> Workshop Direct
              </span>
              <span className="text-[11px] sm:text-xs text-stone-200 truncate">
                100% Seasoned Sagwan Teak & Acacia with 3-Year Solid Wood Warranty • Direct delivery across Sindhudurg, Goa & Western Maharashtra
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[11px] text-stone-300 shrink-0">
              <button 
                onClick={() => onNavigate('showroom')} 
                className="hover:text-[#B08A57] transition-colors cursor-pointer"
              >
                Malvan & Sukalwad Showrooms Open 7 Days
              </button>
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="text-stone-400 hover:text-white p-0.5 transition-colors cursor-pointer"
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
        <div className="relative min-h-[75vh] max-h-[820px] h-[78vh] max-sm:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#2B1D17] shadow-sm border border-[#DED6CC]">
          
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B1D17]/95 via-[#2B1D17]/75 to-transparent sm:w-3/4 md:w-3/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D17]/90 via-transparent to-transparent sm:hidden pointer-events-none" />

              {/* Left-Aligned Editorial Content Box (Max 560px) */}
              <div className="absolute inset-y-0 left-0 pl-6 sm:pl-12 md:pl-16 pr-6 flex flex-col justify-center max-w-[560px] z-10 text-white">
                
                {/* Wood Tag & Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="inline-flex items-center gap-1.5 bg-[#B08A57]/25 border border-[#B08A57]/60 text-[#B08A57] text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-xs">
                    <TreePine size={13} className="text-[#B08A57]" />
                    {HERO_SLIDES[currentSlide].badge}
                  </span>
                  <span className="hidden sm:inline-block text-stone-300 text-xs font-medium">
                    • {HERO_SLIDES[currentSlide].timberTag}
                  </span>
                </motion.div>

                {/* Primary Headline (Playfair Display 40–48px desktop / 28–34px mobile) */}
                <motion.h1 
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-3 drop-shadow-xs"
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.h1>

                {/* Subtitle / Description (DM Sans) */}
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
                  <span className="text-xl sm:text-2xl font-bold text-[#B08A57] font-mono">
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
                    className="min-h-[44px] bg-[#B08A57] hover:bg-[#C59A63] text-[#2B1D17] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-xs transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
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
                    <Store size={15} className="text-[#B08A57]" />
                    <span>Visit Showrooms</span>
                  </button>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Arrow Navigation */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2B1D17]/60 hover:bg-[#2B1D17]/90 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer border border-white/20"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2B1D17]/60 hover:bg-[#2B1D17]/90 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer border border-white/20"
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
                  i === currentSlide ? 'w-7 h-2 bg-[#B08A57]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`} />
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* ── TRUST / USP STRIP ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#DED6CC] p-4 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#DED6CC]">
            
            {/* 1. Premium Materials */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F4EE] border border-[#DED6CC] flex items-center justify-center text-[#B08A57] shrink-0">
                <TreePine size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#211A16] leading-tight">100% Solid Timber</h4>
                <p className="text-[11px] text-[#756B62] mt-0.5">Kiln-seasoned Sagwan & Acacia</p>
              </div>
            </div>

            {/* 2. Skilled Joinery */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F4EE] border border-[#DED6CC] flex items-center justify-center text-[#B08A57] shrink-0">
                <Hammer size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#211A16] leading-tight">Skilled Joinery</h4>
                <p className="text-[11px] text-[#756B62] mt-0.5">Mortise & tenon artisan craft</p>
              </div>
            </div>

            {/* 3. Custom Sizing */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F4EE] border border-[#DED6CC] flex items-center justify-center text-[#B08A57] shrink-0">
                <Sliders size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#211A16] leading-tight">Custom Sizing</h4>
                <p className="text-[11px] text-[#756B62] mt-0.5">Millimeter-accurate blueprints</p>
              </div>
            </div>

            {/* 4. 3-Year Warranty */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F4EE] border border-[#DED6CC] flex items-center justify-center text-[#B08A57] shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#211A16] leading-tight">36-Month Warranty</h4>
                <p className="text-[11px] text-[#756B62] mt-0.5">Direct workshop guarantees</p>
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
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1">
              Curated Timber Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
              Shop by Furniture Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('beds')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#B08A57] hover:text-[#C59A63] transition-colors cursor-pointer self-start sm:self-auto"
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
                className="min-w-[240px] sm:min-w-0 flex-1 group bg-white rounded-xl border border-[#DED6CC] hover:border-[#B08A57] p-4 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between snap-start"
              >
                <div>
                  {/* Category Image */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#F7F4EE] mb-3.5">
                    <img 
                      src={imageSrc} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 bg-[#2B1D17]/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {totalCount} Designs
                    </span>
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-serif font-bold text-base text-[#211A16] group-hover:text-[#B08A57] transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#756B62] mt-0.5">
                    From <span className="font-bold text-[#211A16] font-mono">₹{minPrice.toLocaleString('en-IN')}</span>
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-3 pt-2.5 border-t border-[#F7F4EE] flex items-center justify-between text-xs font-semibold text-[#756B62] group-hover:text-[#B08A57]">
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
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1">
              Fresh From Our Konkan Workshop
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
              New Arrivals & Trending Designs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('beds')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#B08A57] hover:text-[#C59A63] transition-colors cursor-pointer self-start sm:self-auto"
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

                    {/* Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-[#B08A57] text-[#2B1D17] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
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
                        className={isWishlisted ? 'fill-[#B08A57] stroke-[#B08A57] text-[#B08A57]' : 'text-stone-500'} 
                      />
                    </button>
                  </div>

                  <div className="p-3.5 sm:p-4">
                    <span className="text-[10px] font-bold text-[#B08A57] uppercase tracking-wider block mb-1">
                      {product.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#211A16] group-hover:text-[#B08A57] transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
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


      {/* ── SECTION G: DEAL ZONE / WORKSHOP VALUE OFFERS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-[#EFE9DF] rounded-2xl sm:rounded-3xl border border-[#DED6CC] p-6 sm:p-10 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#47705A]/15 text-[#47705A] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 border border-[#47705A]/30">
                <Tag size={13} /> Direct Workshop Savings
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
                Deal Zone & Furniture Value Bundles
              </h2>
              <p className="text-xs sm:text-sm text-[#756B62] mt-1 max-w-xl">
                Bypass middleman distributor margins. Order complete authentic timber room suites crafted from single-source Malvan Sagwan logs.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="min-h-[44px] bg-[#2B1D17] hover:bg-[#3A2922] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
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
                className="bg-white rounded-xl border border-[#DED6CC] hover:border-[#B08A57] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-[#F7F4EE] overflow-hidden">
                    <img 
                      src={bundle.img} 
                      alt={bundle.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    
                    {/* Savings Tag */}
                    <span className="absolute top-2.5 left-2.5 bg-[#47705A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-2xs flex items-center gap-1">
                      <Check size={11} /> Save ₹{bundle.savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    <span className="text-[10px] font-bold text-[#B08A57] uppercase tracking-wider block mb-1">
                      {bundle.tag}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#211A16] group-hover:text-[#B08A57] transition-colors leading-snug">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-[#756B62] mt-1.5 leading-relaxed line-clamp-2">
                      {bundle.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-[#F7F4EE] flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-[#756B62]">Bundle Price</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#211A16] font-mono">
                          ₹{bundle.dealPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#756B62] line-through font-mono">
                          ₹{bundle.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <span className="min-h-[36px] px-3.5 bg-[#F7F4EE] group-hover:bg-[#B08A57] text-[#211A16] group-hover:text-[#2B1D17] font-bold text-xs rounded flex items-center gap-1 transition-colors">
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


      {/* ── SECTION H: SHOP THE LOOK / LIVING SPACES (INTERACTIVE SHOPPABLE ROOM) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B08A57] block mb-1">
            Curated Living Environments
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#211A16]">
            Shop The Look: The Heritage Konkan Drawing Room
          </h2>
          <p className="text-xs sm:text-sm text-[#756B62] mt-1.5">
            Click on the interactive markers to explore the handcrafted solid teakwood pieces styled in this room.
          </p>
        </div>

        {/* Interactive Staged Room Container */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DED6CC] bg-[#2B1D17] shadow-sm">
          
          {/* Main Background Styled Room Photography */}
          <div className="relative aspect-[16/9] max-h-[640px] w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85" 
              alt="The Heritage Konkan Drawing Room" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Hotspot Markers */}
            {lookHotspots.map((spot) => (
              <div 
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  className="relative group cursor-pointer p-2 flex items-center justify-center focus:outline-none"
                  aria-label={`View ${spot.label}`}
                >
                  {/* Pulsing ring animation */}
                  <span className="absolute w-8 h-8 rounded-full bg-[#B08A57]/40 animate-ping" />
                  
                  {/* Core button */}
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                    activeHotspot === spot.id 
                      ? 'bg-[#B08A57] border-white text-[#2B1D17] scale-110' 
                      : 'bg-[#2B1D17]/90 border-[#B08A57] text-white hover:scale-110'
                  }`}>
                    +
                  </span>
                </button>

                {/* Floating Hotspot Card Popover */}
                {activeHotspot === spot.id && spot.product && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 bg-white rounded-xl p-3 shadow-xl border border-[#DED6CC] text-[#211A16] z-30 pointer-events-auto"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={spot.product.img} 
                        alt={spot.product.name} 
                        className="w-14 h-14 rounded-lg object-cover bg-[#F7F4EE] border border-[#DED6CC] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-[#B08A57] uppercase tracking-wider block truncate">
                          {spot.product.category.replace('-', ' ')}
                        </span>
                        <h4 className="font-serif font-bold text-xs text-[#211A16] truncate">
                          {spot.product.name}
                        </h4>
                        <div className="text-xs font-bold text-[#211A16] font-mono mt-0.5">
                          ₹{spot.product.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#F7F4EE] flex items-center justify-between">
                      <button
                        onClick={() => spot.product && onSelectProduct(spot.product.id)}
                        className="w-full bg-[#2B1D17] hover:bg-[#3A2922] text-white text-[11px] font-bold py-1.5 rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Product Specs</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

          </div>

          {/* Quick-select carousel bar underneath the room photo */}
          <div className="bg-[#2B1D17] text-white p-4 sm:p-5 border-t border-[#3A2922]">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B08A57]">
                Featured In This Scene ({lookHotspots.length} Pieces)
              </span>
              <span className="text-stone-400 text-[11px]">
                Click any piece to inspect specifications
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lookHotspots.map((spot) => (
                <div 
                  key={spot.id}
                  onClick={() => {
                    setActiveHotspot(spot.id);
                    if (spot.product) onSelectProduct(spot.product.id);
                  }}
                  className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    activeHotspot === spot.id 
                      ? 'bg-white/15 border-[#B08A57]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <img 
                    src={spot.product?.img} 
                    alt={spot.label} 
                    className="w-11 h-11 rounded object-cover bg-stone-800 shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-stone-300 block truncate">{spot.label}</span>
                    <h5 className="font-serif font-bold text-xs text-white truncate">{spot.product?.name}</h5>
                    <span className="text-[11px] text-[#B08A57] font-mono font-bold">
                      ₹{spot.product?.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-stone-400 shrink-0" />
                </div>
              ))}
            </div>
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
                      {piece.category.replace('-', ' ')}
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
                      {product.category.replace('-', ' ')}
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
