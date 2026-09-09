import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ViewState, Product } from '../types';
import { ALL_PRODUCTS, TESTIMONIALS, CATEGORY_MAP, DEFAULT_WEBSITE_CONTENT } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageCircle,
  Truck, 
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
  Layers,
  Compass
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (productId: string | number) => void;
  onToggleWishlist: (productId: string | number) => void;
  wishlist: (string | number)[];
  products?: Product[];
  categories?: any[];
  websiteContent?: any;
}

// 1. Curated Hero Slides matching authentic Bhisez timber lines
const HERO_SLIDES = [
  {
    id: 1,
    badge: 'MALVAN SACRED TIMBER',
    title: 'Handcrafted Teak Mandirs',
    subtitle: 'Sacred Sanctums Carved from Grade-A Seasoned Sagwan Teak',
    pricePrefix: 'Workshop direct from',
    priceVal: '₹20,000',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1400&q=85',
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
    priceVal: '₹19,999',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=85',
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
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85',
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
    priceVal: '₹34,999',
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1400&q=85',
    linkCategory: 'dining-tables',
    primaryCta: 'Explore Dining Tables',
    timberTag: 'Anti-Warp Teak Slabs'
  }
];

// Reliable image mapping for furniture categories
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

// Rooms for Section 7 (Shop by Room)
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
    name: 'Pooja & Prayer Space',
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
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Bestsellers Filter State
  const [bestsellerFilter, setBestsellerFilter] = useState<'all' | 'beds' | 'wooden-sofas' | 'wooden-mandirs' | 'dining-tables'>('all');

  // Slide auto-advance every 6.5s when not hovered
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

  // Curate 8 primary categories for Section 3
  const primaryCategories = useMemo(() => {
    // Pick 8 diverse, iconic categories
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

  // Curate real products for Section 4 (Product Showcase)
  const showcasedProducts = useMemo(() => {
    const list = products.filter((p) => {
      if (bestsellerFilter === 'all') return true;
      return p.category === bestsellerFilter;
    });
    return list.slice(0, 8);
  }, [products, bestsellerFilter]);

  // Featured Collection real items
  const featuredCollectionPieces = useMemo(() => {
    const centerpiece = products.find(p => p.category === 'wooden-mandirs') || products[0];
    const companion1 = products.find(p => p.category === 'beds') || products[1];
    const companion2 = products.find(p => p.category === 'wooden-sofas') || products[2];
    const companion3 = products.find(p => p.category === 'dining-tables') || products[3];
    return { centerpiece, companion1, companion2, companion3 };
  }, [products]);

  return (
    <div className="bg-[#FAF7F2] text-[#241810] min-h-screen">

      {/* ── 1. HERO ── */}
      <section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div className="relative min-h-[75vh] max-h-[820px] h-[78vh] max-sm:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#170E08] shadow-sm border border-[#E7DFD5]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.03 }}
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

              {/* Editorial Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#170E08]/92 via-[#170E08]/70 to-transparent sm:w-3/4 md:w-3/5 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#170E08]/85 via-transparent to-transparent sm:hidden pointer-events-none" />

              {/* Left-Aligned Editorial Text Box (Max 560px) */}
              <div className="absolute inset-y-0 left-0 pl-6 sm:pl-12 md:pl-16 pr-6 flex flex-col justify-center max-w-[560px] z-10 text-white">
                
                {/* Wood Tag & Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <span className="inline-flex items-center gap-1.5 bg-[#C28B38]/25 border border-[#C28B38]/60 text-[#F5C26B] text-[10px] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-xs">
                    <TreePine size={13} className="text-[#C28B38]" />
                    {HERO_SLIDES[currentSlide].badge}
                  </span>
                  <span className="hidden sm:inline-block text-stone-300 text-xs font-medium">
                    • {HERO_SLIDES[currentSlide].timberTag}
                  </span>
                </motion.div>

                {/* Primary Headline */}
                <motion.h1 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-3 drop-shadow-sm"
                >
                  {HERO_SLIDES[currentSlide].title}
                </motion.h1>

                {/* Subtitle / Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 }}
                  className="text-stone-300 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-6"
                >
                  {HERO_SLIDES[currentSlide].subtitle}
                </motion.p>

                {/* Pricing Ribbon */}
                <motion.div 
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.35 }}
                  className="flex items-baseline gap-2 mb-7 text-stone-200"
                >
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    {HERO_SLIDES[currentSlide].pricePrefix}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-[#F5C26B] font-mono">
                    {HERO_SLIDES[currentSlide].priceVal}
                  </span>
                  <span className="text-[11px] text-stone-400 hidden sm:inline">
                    (Direct Workshop Pricing)
                  </span>
                </motion.div>

                {/* Primary + Secondary CTAs */}
                <motion.div 
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-3.5"
                >
                  <button
                    onClick={() => onSelectCategory(HERO_SLIDES[currentSlide].linkCategory)}
                    className="min-h-[44px] bg-[#C28B38] hover:bg-[#A97428] text-[#170E08] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
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
                    <Store size={15} className="text-[#F5C26B]" />
                    <span>Visit Showrooms</span>
                  </button>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer border border-white/20"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 cursor-pointer border border-white/20"
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
                className={`min-h-[24px] min-w-[24px] flex items-center justify-center cursor-pointer`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`block rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'w-7 h-2 bg-[#C28B38]' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`} />
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* ── 2. TRUST / USP STRIP ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E7DFD5] p-4 sm:p-5 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E7DFD5]">
            
            {/* 1. Premium Materials */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center text-[#C28B38] shrink-0">
                <TreePine size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#241810] leading-tight">Premium Materials</h4>
                <p className="text-[11px] text-[#756455] mt-0.5">100% seasoned Sagwan & Acacia</p>
              </div>
            </div>

            {/* 2. Skilled Craftsmanship */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center text-[#C28B38] shrink-0">
                <Hammer size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#241810] leading-tight">Skilled Craftsmanship</h4>
                <p className="text-[11px] text-[#756455] mt-0.5">Hand-chiselled mortise joinery</p>
              </div>
            </div>

            {/* 3. Custom Furniture */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center text-[#C28B38] shrink-0">
                <Sliders size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#241810] leading-tight">Custom Furniture</h4>
                <p className="text-[11px] text-[#756455] mt-0.5">Exact millimeter room sizing</p>
              </div>
            </div>

            {/* 4. Trusted Service */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center text-[#C28B38] shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#241810] leading-tight">Trusted Service</h4>
                <p className="text-[11px] text-[#756455] mt-0.5">36-month solid timber warranty</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── 3. SHOP BY CATEGORY ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28B38] block mb-1">
              Curated Timber Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241810]">
              Shop by Furniture Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('beds')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#C28B38] hover:text-[#A97428] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4-Column Visual Grid on Desktop + Horizontal Scroll on Mobile */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar pb-3 sm:pb-0 snap-x snap-mandatory">
          {primaryCategories.map((cat: any) => {
            const minPrice = cat.subCategories?.reduce((min: number, s: any) => Math.min(min, s.basePrice || 99999), 99999) || 12000;
            const totalCount = cat.subCategories?.reduce((sum: number, s: any) => sum + (s.count || 0), 0) || 12;
            const imageSrc = CATEGORY_IMAGE_MAP[cat.slug] || cat.img;

            return (
              <div
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className="min-w-[240px] sm:min-w-0 flex-1 group bg-white rounded-xl border border-[#E7DFD5] hover:border-[#C28B38] p-4 shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between snap-start"
              >
                <div>
                  {/* Category Image */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF7F2] mb-3.5">
                    <img 
                      src={imageSrc} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {totalCount} Designs
                    </span>
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-serif font-bold text-base text-[#241810] group-hover:text-[#C28B38] transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#756455] mt-0.5">
                    From <span className="font-bold text-[#241810] font-mono">₹{minPrice.toLocaleString('en-IN')}</span>
                  </p>
                </div>

                {/* Action Link */}
                <div className="mt-3 pt-2.5 border-t border-[#F2ECE4] flex items-center justify-between text-xs font-semibold text-[#756455] group-hover:text-[#C28B38]">
                  <span>Explore Collection</span>
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </section>


      {/* ── 4. PRODUCT SHOWCASE (FEATURED / BESTSELLERS) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        
        {/* Section Header with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28B38] block mb-1">
              Sindhudurg Bestsellers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241810]">
              Featured Handcrafted Furniture
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
                    ? 'bg-[#241810] text-white shadow-2xs'
                    : 'bg-white text-[#756455] hover:text-[#241810] border border-[#E7DFD5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Products Desktop / 3 Tablet / 2 Mobile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {showcasedProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const discountPct = product.orig && product.orig > product.price 
              ? Math.round(((product.orig - product.price) / product.orig) * 100) 
              : 25;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product.id)}
                className="group bg-white rounded-xl border border-[#E7DFD5] hover:border-[#C28B38] shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Fixed Aspect Image Frame with Wishlist */}
                  <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Discount Badge */}
                    <span className="absolute top-2.5 left-2.5 bg-[#B94A30] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                      {discountPct}% OFF
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
                        className={isWishlisted ? 'fill-[#B94A30] stroke-[#B94A30] text-[#B94A30]' : 'text-stone-500'} 
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 sm:p-4">
                    <span className="text-[10px] font-bold text-[#C28B38] uppercase tracking-wider block mb-1">
                      {product.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-serif font-bold text-xs sm:text-sm text-[#241810] group-hover:text-[#C28B38] transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Price & Action Strip */}
                <div className="p-3.5 sm:p-4 pt-0">
                  <div className="pt-2.5 border-t border-[#F2ECE4] flex items-center justify-between">
                    <div>
                      <div className="text-[9px] uppercase font-bold text-[#756455]">Workshop Price</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-bold text-[#241810] font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.orig && (
                          <span className="text-[11px] text-[#756455] line-through font-mono">
                            ₹{product.orig.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#C28B38] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
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


      {/* ── 5. EDITORIAL BRAND / CRAFTSMANSHIP SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7DFD5] p-6 sm:p-10 lg:p-12 shadow-2xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Large Image (approx 58% width on desktop) */}
            <div className="lg:col-span-7 relative">
              <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E7DFD5]">
                <img 
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1100&q=80" 
                  alt="Crafted in Timber. Finished by Hand." 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Floating Craftsmanship Badge */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:right-6 bg-[#241810] text-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg border border-[#C28B38]/40 max-w-[240px]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-300 block mb-0.5">
                  Timber Heritage
                </span>
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#F5C26B]">
                  Est. 1995
                </div>
                <p className="text-[11px] text-stone-300 mt-1 leading-tight">
                  Over 4,500 custom solid wood pieces delivered across Sindhudurg & Goa.
                </p>
              </div>
            </div>

            {/* Text Story (approx 42% width on desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28B38] block mb-2">
                Sindhudurg Carpentry Heritage
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#241810] leading-tight mb-4">
                Crafted in Timber. Finished by Hand.
              </h2>

              <p className="text-xs sm:text-sm text-[#756455] leading-relaxed mb-4">
                Every piece leaving our Sindhudurg workshop is shaped from slow-seasoned native Sagwan teak and Acacia. Master karigars hand-chisel traditional mortise-and-tenon joints that withstand Konkan coastal humidity without sagging or warping.
              </p>

              <blockquote className="border-l-2 border-[#C28B38] pl-3.5 py-1 italic text-xs sm:text-sm text-[#756455] mb-6 bg-[#FAF7F2] rounded-r-lg">
                "{websiteContent?.aboutQuote || "Every ring in a log represents a monsoon we stood together. We don't just shape wood; we preserve Malvan's heritage in your living quarters."}"
              </blockquote>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="min-h-[44px] bg-[#241810] hover:bg-[#3D2B1F] text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read Our Workshop Story</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onNavigate('showroom')}
                  className="min-h-[44px] border border-[#E7DFD5] hover:border-[#C28B38] text-[#241810] font-medium text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MapPin size={14} className="text-[#C28B38]" />
                  <span>Showroom Tour</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ── 6. FEATURED COLLECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F2ECE4] rounded-2xl sm:rounded-3xl border border-[#E7DFD5] p-6 sm:p-10 shadow-2xs">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28B38] block mb-1">
                Curated Editorial Showcase
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241810]">
                The Sagwan Heirloom Sanctuary
              </h2>
              <p className="text-xs sm:text-sm text-[#756455] mt-1 max-w-xl">
                A cohesive suite of kiln-seasoned teak furniture designed for serene Indian homes—uniting sacred grace, generational durability, and timeless warm amber tones.
              </p>
            </div>

            <button
              onClick={() => onSelectCategory('beds')}
              className="min-h-[44px] bg-[#C28B38] hover:bg-[#A97428] text-[#170E08] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Explore Collection</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Collection Grid: 1 Hero Piece + 3 Related Products */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Main Feature (Mandir Centerpiece) */}
            <div 
              onClick={() => onSelectProduct(featuredCollectionPieces.centerpiece.id)}
              className="lg:col-span-7 bg-white rounded-xl sm:rounded-2xl border border-[#E7DFD5] hover:border-[#C28B38] overflow-hidden shadow-2xs group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] bg-[#FAF7F2] overflow-hidden">
                <img 
                  src={featuredCollectionPieces.centerpiece.img} 
                  alt={featuredCollectionPieces.centerpiece.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#241810] text-[#F5C26B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-2xs">
                  Collection Centerpiece
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-bold text-[#C28B38] uppercase tracking-wider block">
                    Sacred Woodcraft
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-xl text-[#241810] group-hover:text-[#C28B38] transition-colors mt-0.5">
                    {featuredCollectionPieces.centerpiece.name}
                  </h3>
                  <p className="text-xs text-[#756455] mt-1.5 leading-relaxed">
                    Designed for divine domestic spaces, hand-carved with traditional Konkan motifs and borer-resistant Sagwan seasoning.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#756455] uppercase block">Workshop Base Price</span>
                    <span className="text-lg font-bold text-[#241810] font-mono">
                      ₹{featuredCollectionPieces.centerpiece.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#C28B38] group-hover:translate-x-1 transition-transform flex items-center gap-1">
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
                  className="bg-white rounded-xl border border-[#E7DFD5] hover:border-[#C28B38] p-3 sm:p-4 shadow-2xs group cursor-pointer flex items-center gap-4 transition-all"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E7DFD5]">
                    <img 
                      src={piece.img} 
                      alt={piece.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9.5px] font-bold text-[#C28B38] uppercase tracking-wider block">
                      {piece.category.replace('-', ' ')}
                    </span>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#241810] group-hover:text-[#C28B38] transition-colors truncate">
                      {piece.name}
                    </h4>
                    <p className="text-xs text-[#241810] font-bold font-mono mt-1">
                      ₹{piece.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <ChevronRight size={16} className="text-stone-400 group-hover:text-[#C28B38] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ── 7. SHOP BY ROOM ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28B38] block mb-1">
            Harmonious Spaces
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241810]">
            Shop by Room Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#756455] mt-1.5">
            Explore complete solid timber arrangements tailored to your home layout.
          </p>
        </div>

        {/* Asymmetric Desktop Layout + Mobile Horizontal Cards */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible no-scrollbar pb-3 sm:pb-0 snap-x snap-mandatory">
          {ROOM_COLLECTIONS.map((room) => (
            <div
              key={room.id}
              onClick={() => onSelectCategory(room.categorySlug)}
              className="min-w-[260px] sm:min-w-0 flex-1 group bg-white rounded-xl sm:rounded-2xl border border-[#E7DFD5] hover:border-[#C28B38] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between snap-start"
            >
              {/* Room Image with Zoom on Hover */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                <img 
                  src={room.img} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {room.itemCount}
                </span>
              </div>

              {/* Room Body */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#241810] group-hover:text-[#C28B38] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-[#756455] mt-1 leading-snug">
                    {room.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#F2ECE4] flex items-center justify-between text-xs font-semibold text-[#756455] group-hover:text-[#C28B38]">
                  <span>View Room Designs</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>


      {/* ── 8. WHY BHISEZ ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        <div className="bg-[#241810] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden border border-[#3D2B1F] shadow-sm">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#C28B38]/10 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5C26B] block mb-1.5">
              The Bhisez Standard
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Why Discerning Konkan Families Choose Bhisez
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
              We reject cheap commercial particleboard and hollow plywood. Every unit leaving our workshop is built from solid logs to withstand coastal moisture and pass down as heirlooms.
            </p>
          </div>

          {/* 4 Strong Points with Visual Hierarchy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs hover:border-[#C28B38]/50 transition-colors">
              <div className="w-11 h-11 rounded-lg bg-[#C28B38]/20 border border-[#C28B38]/40 flex items-center justify-center text-[#F5C26B] mb-4">
                <TreePine size={22} />
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">
                100% Solid Seasoned Timber
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Slow-cured Malvani Sagwan (Teak) and resilient Acacia, seasoned to 10–12% moisture content to resist coastal warping and borers.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs hover:border-[#C28B38]/50 transition-colors">
              <div className="w-11 h-11 rounded-lg bg-[#C28B38]/20 border border-[#C28B38]/40 flex items-center justify-center text-[#F5C26B] mb-4">
                <Hammer size={22} />
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">
                Traditional Joinery
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Hand-chiselled mortise-and-tenon joints without relying on cheap staples. Engineered by artisans with 30+ years of carpentry mastery.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs hover:border-[#C28B38]/50 transition-colors">
              <div className="w-11 h-11 rounded-lg bg-[#C28B38]/20 border border-[#C28B38]/40 flex items-center justify-center text-[#F5C26B] mb-4">
                <Sliders size={22} />
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">
                Custom Millimeter Sizing
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Tailored dimensions, storage drawer configurations, and custom PU stains (Honey Teak, Dark Walnut, Natural Gloss) built to your blueprint.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-xs hover:border-[#C28B38]/50 transition-colors">
              <div className="w-11 h-11 rounded-lg bg-[#C28B38]/20 border border-[#C28B38]/40 flex items-center justify-center text-[#F5C26B] mb-4">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-serif text-base font-bold text-white mb-2">
                Direct Workshop Pricing
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Direct carpenter-to-home pricing without middleman distributor commissions. Backed by an ironclad 36-month solid timber warranty.
              </p>
            </div>

          </div>

          {/* Workshop Guarantee Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#F5C26B]" />
              <span>Inspection certificates available for all Teak & Sagwan logs upon request</span>
            </div>
            <button
              onClick={() => onNavigate('about')}
              className="text-[#F5C26B] hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore our Sindhudurg workshop story</span>
              <ChevronRight size={14} />
            </button>
          </div>

        </div>
      </section>


      {/* ── 9. TESTIMONIALS / CUSTOMER TRUST ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C28B38] block mb-1">
            Real Konkan Voices
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241810]">
            Trusted in Over 4,500 Homes
          </h2>
          <p className="text-xs sm:text-sm text-[#756455] mt-1.5">
            Authentic feedback from families who furnished their ancestral homes with Bhisez solid wood.
          </p>
        </div>

        {/* 1 Featured Testimonial + Supporting Testimonials on Desktop / Carousel on Mobile */}
        <div className="flex sm:grid sm:grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto sm:overflow-visible no-scrollbar pb-3 sm:pb-0 snap-x snap-mandatory">
          
          {/* Featured First Testimonial */}
          <div className="min-w-[280px] sm:min-w-0 md:col-span-2 bg-white rounded-xl sm:rounded-2xl border-2 border-[#C28B38]/30 p-6 sm:p-8 shadow-xs flex flex-col justify-between snap-start">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-500">
                  {[...Array(TESTIMONIALS[0]?.stars || 5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 bg-[#FAF7F2] text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 size={11} /> Verified Buyer
                </span>
              </div>

              <p className="font-serif text-sm sm:text-base md:text-lg text-[#241810] font-normal leading-relaxed mb-6 italic">
                "{TESTIMONIALS[0]?.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#F2ECE4] flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#241810]">
                  {TESTIMONIALS[0]?.name}
                </h4>
                <p className="text-xs text-[#756455] flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-[#C28B38]" />
                  <span>{TESTIMONIALS[0]?.location}, Sindhudurg</span>
                </p>
              </div>
              <span className="text-xs text-[#756455] font-medium hidden sm:inline">
                Bedroom & Storage Furniture
              </span>
            </div>
          </div>

          {/* Supporting Testimonials Column */}
          <div className="min-w-[260px] sm:min-w-0 flex flex-col gap-4 snap-start">
            {TESTIMONIALS.slice(1, 3).map((t, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-[#E7DFD5] p-5 shadow-2xs flex flex-col justify-between flex-1"
              >
                <div>
                  <div className="flex text-amber-500 mb-2.5">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#241810] leading-relaxed mb-3 font-light">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#241810]">
                      {t.name}
                    </h4>
                    <span className="text-[11px] text-[#756455]">
                      {t.location}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>


      {/* ── 10. FINAL CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
        <div className="bg-[#241810] rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-white relative overflow-hidden border border-[#3D2B1F] shadow-md text-center md:text-left">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28B38]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5C26B] block mb-2">
              Visit Our Sindhudurg Carpentry Centers
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight mb-3 text-white">
              Experience the Touch of Genuine Solid Teak
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Walk into our Malvan flagship store or our highway showroom at Sukalwad NH-66. Feel the solid timber weight, discuss custom room blueprints with master artisans, and select raw timber logs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5">
              <button
                onClick={() => onNavigate('beds')}
                className="min-h-[44px] bg-[#C28B38] hover:bg-[#A97428] text-[#170E08] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm transition-transform active:scale-98 cursor-pointer flex items-center gap-2"
                id="final-catalog-cta"
              >
                <span>Explore Furniture</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => onNavigate('showroom')}
                className="min-h-[44px] bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                id="final-showroom-cta"
              >
                <Store size={15} className="text-[#F5C26B]" />
                <span>Visit Showroom</span>
              </button>

              <a
                href={`https://wa.me/917057441122?text=${encodeURIComponent("Hello Bhisez Furniture! I am browsing your website and would like to discuss custom furniture sizing and teak pricing.")}`}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg shadow-sm transition-transform active:scale-98 cursor-pointer flex items-center gap-2"
                id="final-whatsapp-cta"
              >
                <MessageCircle size={15} />
                <span>Custom Furniture WhatsApp</span>
              </a>
            </div>

            {/* Quick Showroom Facts */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300 text-left">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#F5C26B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Malvan Flagship:</strong>
                  <span>Main Market Road, Malvan, Sindhudurg – 416606</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#F5C26B] shrink-0 mt-0.5" />
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
