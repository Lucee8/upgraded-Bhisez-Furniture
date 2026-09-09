import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewState, Product } from '../types';
import { CATEGORY_MAP, ALL_PRODUCTS, CategoryData } from '../data';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  User, 
  Search, 
  Menu, 
  X,
  PhoneCall,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Clock,
  Trash2,
  ShieldCheck,
  ExternalLink,
  LogOut,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  cartCount: number;
  wishlistCount: number;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onSelectCategory: (category: string, subCategory?: string | null) => void;
  onSelectProduct?: (productId: string | number) => void;
}

// Fallback high-resolution furniture photography by category for guaranteed 100% render reliability
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'door-frames': 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
  'wooden-sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  'wooden-chairs': 'https://images.unsplash.com/photo-1580481077194-c794014f3b23?w=600&q=80',
  'beds': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
  'dressing-table': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
  'wooden-swings': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
  'wooden-safety-doors': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
  'wooden-mandirs': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=80',
  'teapoys-coffee-tables': 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&q=80',
  'sofa-cum-beds': 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80',
  'dining-tables': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
  'wardrobes': 'https://images.unsplash.com/photo-1558997519-83ea9252def8?w=600&q=80',
  'tv-units': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  'chaurang-and-paats': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
  'diwans': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'
};

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80';

// Popular search tags for instant discovery
const POPULAR_SEARCH_TAGS = [
  { label: 'Solid Teak Beds', slug: 'beds' },
  { label: 'Temple Mandirs', slug: 'wooden-mandirs' },
  { label: 'Wooden Sofas', slug: 'wooden-sofas' },
  { label: 'Dining Tables', slug: 'dining-tables' },
  { label: 'Courtyard Swings', slug: 'wooden-swings' },
  { label: 'Coffee Teapoys', slug: 'teapoys-coffee-tables' },
];

export default function Navbar({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onSearchChange,
  searchQuery,
  isLoggedIn,
  onLogout,
  mobileMenuOpen,
  setMobileMenuOpen,
  onSelectCategory,
  onSelectProduct,
}: NavbarProps) {
  // Mega menu states
  const [activeMegaCat, setActiveMegaCat] = useState<string | null>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Search states
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  // Mobile drawer category accordion
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bhisez_recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveRecentSearch = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    try {
      const filtered = recentSearches.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('bhisez_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, [recentSearches]);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('bhisez_recent_searches');
    } catch {
      // ignore
    }
  }, []);

  // Handle outside click to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false);
        setMobileSearchOpen(false);
        setActiveMegaCat(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Debounced/memoized live instant search matches
  const liveSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_PRODUCTS.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(q))
      );
    }).slice(0, 6);
  }, [searchQuery]);

  // Matching categories for search term
  const matchingCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return CATEGORY_MAP.filter(cat => 
      cat.name.toLowerCase().includes(q) || 
      cat.slug.toLowerCase().includes(q) ||
      cat.subCategories.some(sub => sub.name.toLowerCase().includes(q))
    ).slice(0, 3);
  }, [searchQuery]);

  // Handle submitting a search
  const handleExecuteSearch = (queryToRun?: string) => {
    const term = (queryToRun !== undefined ? queryToRun : searchQuery).trim();
    if (term) {
      saveRecentSearch(term);
      onSearchChange(term);
    }
    setSearchFocused(false);
    setMobileSearchOpen(false);
    if (currentView !== 'beds') {
      onNavigate('beds');
    }
  };

  // Safe mega menu hover handlers to prevent jitter
  const handleMouseEnterCat = (slug: string) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveMegaCat(slug);
  };

  const handleMouseLeaveCat = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaCat(null);
    }, 120);
  };

  // Brand Logo Mark
  const renderBrandLogo = (compact = false) => (
    <div className="flex items-center gap-2.5 select-none text-left">
      <div className={`${compact ? 'w-8 h-8 text-base' : 'w-9 h-9 sm:w-10 sm:h-10 text-lg sm:text-xl'} rounded-lg bg-[#241810] text-[#C28B38] flex items-center justify-center font-serif font-black tracking-tight shrink-0 shadow-xs border border-[#3E2B1E]`}>
        B
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`font-serif font-black tracking-tight text-[#241810] uppercase ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
            Bhisez
          </span>
          <span className="font-sans font-bold text-[9px] sm:text-[10.5px] text-[#C28B38] tracking-[0.2em] uppercase">
            Furniture
          </span>
        </div>
        <span className="text-[8.5px] sm:text-[9px] font-sans font-semibold tracking-wider text-[#756455] uppercase -mt-0.5">
          Solid Teak Wood • Sindhudurg
        </span>
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-[120] bg-white border-b border-[#E7DFD5] shadow-xs">
        
        {/* ========================================================================= */}
        {/* LEVEL 1: SMALL UTILITY BAR (Desktop Only)                                */}
        {/* ========================================================================= */}
        <div className="bg-[#FAF7F2] border-b border-[#E7DFD5] text-[#756455] text-[11px] font-medium py-1.5 px-4 sm:px-6 lg:px-8 hidden md:block select-none">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left: Workshop & Quality Heritage */}
            <div className="flex items-center space-x-5">
              <span className="inline-flex items-center gap-1.5 text-[#241810] font-semibold">
                <ShieldCheck size={13} className="text-[#C28B38]" />
                100% Seasoned Malvani Hardwoods & Sagwan Teak
              </span>
              <span className="text-[#E7DFD5]">|</span>
              <button 
                onClick={() => onNavigate('showroom')}
                className="hover:text-[#241810] transition-colors cursor-pointer flex items-center gap-1"
                id="utility-showrooms-link"
              >
                <MapPin size={11} className="text-[#C28B38]" />
                Showrooms: Malvan Flagship & Sukalwad NH-66
              </button>
            </div>

            {/* Right: Direct Hotline, Custom Enquiries & Admin */}
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+917057441122" 
                className="flex items-center gap-1.5 text-[#241810] hover:text-[#C28B38] transition-colors font-bold"
                title="Direct Phone Consultation"
              >
                <PhoneCall size={11} className="text-[#C28B38]" />
                +91 70574 41122
              </a>
              <span className="text-[#E7DFD5]">|</span>
              <button 
                onClick={() => onNavigate('contact')}
                className="hover:text-[#241810] transition-colors cursor-pointer"
                id="utility-custom-orders-link"
              >
                Custom Dimensions
              </button>
              <span className="text-[#E7DFD5]">|</span>
              <button 
                onClick={() => onNavigate('about')}
                className="hover:text-[#241810] transition-colors cursor-pointer"
                id="utility-timber-heritage-link"
              >
                Timber Heritage
              </button>
              <span className="text-[#E7DFD5]">|</span>
              <a 
                href="?view=admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8F5E15] hover:text-[#241810] transition-colors cursor-pointer font-bold inline-flex items-center gap-1 bg-[#F2ECE4] px-2 py-0.5 rounded text-[10px]"
                id="utility-admin-link"
                title="Workshop Administration Center"
              >
                <span>🔒</span> Workshop Admin
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LEVEL 2: MAIN HEADER (Desktop)                                           */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
          <div className="flex justify-between items-center py-3 bg-white">
            {/* Logo on Left */}
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center bg-transparent border-none cursor-pointer focus:outline-none shrink-0 group transition-transform hover:opacity-95"
              id="nav-brand-logo-desktop"
              aria-label="Bhisez Furniture Home"
            >
              {renderBrandLogo(false)}
            </button>

            {/* Instant Search Bar (Center) */}
            <div className="flex-1 max-w-2xl mx-8 relative" ref={searchContainerRef}>
              <div className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search solid teak beds, mandirs, dining tables, sofas..."
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    if (!searchFocused) setSearchFocused(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleExecuteSearch();
                    }
                  }}
                  className="w-full bg-[#FAF7F2] border border-[#E7DFD5] text-[#241810] text-xs sm:text-sm rounded-lg pl-10 pr-20 py-2.5 focus:bg-white focus:ring-2 focus:ring-[#C28B38]/30 focus:border-[#C28B38] outline-none transition-all placeholder-[#756455]/60 font-sans shadow-2xs"
                  id="navbar-instant-search-input"
                  aria-label="Search furniture catalog"
                />
                <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#756455] pointer-events-none" />
                
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                  {searchQuery && (
                    <button
                      onClick={() => {
                        onSearchChange('');
                        searchInputRef.current?.focus();
                      }}
                      className="p-1 text-[#756455] hover:text-[#241810] transition-colors rounded-full hover:bg-stone-200/60"
                      title="Clear search"
                      type="button"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleExecuteSearch()}
                    className="bg-[#241810] hover:bg-[#4A2E1B] text-white text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    type="button"
                    id="navbar-search-submit-btn"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Instant Search Dropdown Experience */}
              <AnimatePresence>
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-[#E7DFD5] overflow-hidden z-[160]"
                  >
                    {/* State A: User is typing and has live matches */}
                    {searchQuery.trim().length > 0 ? (
                      <div className="p-3">
                        {/* Matching Categories row */}
                        {matchingCategories.length > 0 && (
                          <div className="mb-2.5 pb-2 border-b border-[#F2ECE4]">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#756455] px-2 mb-1">
                              Matching Categories
                            </div>
                            <div className="flex flex-wrap gap-1.5 px-2">
                              {matchingCategories.map((cat) => (
                                <button
                                  key={cat.slug}
                                  onClick={() => {
                                    onSelectCategory(cat.slug, null);
                                    setSearchFocused(false);
                                  }}
                                  className="text-xs bg-[#FAF7F2] hover:bg-[#F2ECE4] text-[#241810] font-medium px-2.5 py-1 rounded-md border border-[#E7DFD5] flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <span>{cat.name}</span>
                                  <ArrowRight size={11} className="text-[#C28B38]" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Live Product Suggestions */}
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#756455] px-2 mb-1.5">
                          Products Matching "{searchQuery}"
                        </div>

                        {liveSearchResults.length > 0 ? (
                          <div className="space-y-1">
                            {liveSearchResults.map((prod) => (
                              <button
                                key={prod.id}
                                onClick={() => {
                                  saveRecentSearch(prod.name);
                                  setSearchFocused(false);
                                  if (onSelectProduct) {
                                    onSelectProduct(prod.id);
                                  } else {
                                    onSearchChange(prod.name);
                                    if (currentView !== 'beds') onNavigate('beds');
                                  }
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-[#FAF7F2] transition-colors flex items-center justify-between group cursor-pointer"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-10 h-10 rounded-md bg-[#F2ECE4] overflow-hidden shrink-0 border border-[#E7DFD5]">
                                    <img 
                                      src={prod.img || CATEGORY_FALLBACK_IMAGES[prod.category] || DEFAULT_FALLBACK_IMAGE}
                                      alt={prod.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                      onError={(e) => {
                                        const fb = CATEGORY_FALLBACK_IMAGES[prod.category] || DEFAULT_FALLBACK_IMAGE;
                                        if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                                      }}
                                    />
                                  </div>
                                  <div className="truncate">
                                    <div className="text-xs font-bold text-[#241810] group-hover:text-[#C28B38] transition-colors truncate">
                                      {prod.name}
                                    </div>
                                    <div className="text-[10px] text-[#756455] capitalize truncate">
                                      {prod.category.replace(/-/g, ' ')} {prod.subCategory ? `• ${prod.subCategory}` : ''}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right shrink-0 pl-2">
                                  <div className="text-xs font-bold text-[#241810]">
                                    ₹{prod.price.toLocaleString('en-IN')}
                                  </div>
                                  {prod.orig && prod.orig > prod.price && (
                                    <div className="text-[10px] text-[#756455] line-through">
                                      ₹{prod.orig.toLocaleString('en-IN')}
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-xs text-[#756455]">
                            No direct product matches for "{searchQuery}". Try searching by wood type, size or category.
                          </div>
                        )}

                        {/* View all results footer */}
                        <div className="mt-2 pt-2 border-t border-[#F2ECE4] px-1">
                          <button
                            onClick={() => handleExecuteSearch()}
                            className="w-full text-center py-2 bg-[#241810] hover:bg-[#4A2E1B] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>View all results for "{searchQuery}"</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* State B: Empty search input — show Recent Searches + Popular Categories */
                      <div className="p-4 space-y-4">
                        {recentSearches.length > 0 && (
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#756455] mb-2">
                              <span className="flex items-center gap-1">
                                <Clock size={12} className="text-[#C28B38]" />
                                Recent Searches
                              </span>
                              <button
                                onClick={clearRecentSearches}
                                className="text-[10px] text-[#756455] hover:text-[#B94A30] transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Trash2 size={11} /> Clear
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {recentSearches.map((term, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleExecuteSearch(term)}
                                  className="text-xs bg-[#FAF7F2] hover:bg-[#F2ECE4] text-[#241810] px-3 py-1 rounded-full border border-[#E7DFD5] transition-colors cursor-pointer"
                                >
                                  {term}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#756455] mb-2 flex items-center gap-1">
                            <Sparkles size={12} className="text-[#C28B38]" />
                            Popular Timber Collections
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {POPULAR_SEARCH_TAGS.map((tag) => (
                              <button
                                key={tag.slug}
                                onClick={() => {
                                  onSelectCategory(tag.slug, null);
                                  setSearchFocused(false);
                                }}
                                className="text-left p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F2ECE4] border border-[#E7DFD5] transition-colors group cursor-pointer"
                              >
                                <div className="text-xs font-bold text-[#241810] group-hover:text-[#C28B38] transition-colors">
                                  {tag.label}
                                </div>
                                <div className="text-[10px] text-[#756455] mt-0.5">
                                  Explore Designs →
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick Workshop Service Note */}
                        <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E7DFD5] text-[11px] text-[#756455] flex items-center justify-between">
                          <span>Need customized sizing for room architecture?</span>
                          <button
                            onClick={() => {
                              onNavigate('contact');
                              setSearchFocused(false);
                            }}
                            className="font-bold text-[#241810] hover:text-[#C28B38] transition-colors cursor-pointer"
                          >
                            Request Quote →
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Action Icons (Showroom, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0 select-none">
              
              {/* Showroom Visit Button */}
              <button 
                onClick={() => onNavigate('showroom')} 
                className="flex flex-col items-center p-1.5 text-[#241810] hover:text-[#C28B38] transition-colors cursor-pointer group"
                id="navbar-showrooms-btn-desktop"
                title="Experience Centers & Showrooms"
              >
                <MapPin size={20} className="group-hover:scale-105 transition-transform stroke-[1.8]" />
                <span className="text-[10px] font-bold text-[#756455] group-hover:text-[#241810] mt-1">
                  Showrooms
                </span>
              </button>

              {/* Account / User Portal */}
              <button 
                onClick={() => onNavigate(isLoggedIn ? 'home' : 'login')} 
                className="flex flex-col items-center p-1.5 text-[#241810] hover:text-[#C28B38] transition-colors cursor-pointer group relative"
                id="navbar-account-btn-desktop"
                title={isLoggedIn ? "Account Profile" : "Customer Sign In"}
              >
                <User size={20} className="group-hover:scale-105 transition-transform stroke-[1.8]" />
                <span className="text-[10px] font-bold text-[#756455] group-hover:text-[#241810] mt-1">
                  {isLoggedIn ? 'Account' : 'Sign In'}
                </span>
              </button>

              {/* Wishlist Button with Real Counter */}
              <button 
                onClick={() => onNavigate('wishlist')} 
                className="relative flex flex-col items-center p-1.5 text-[#241810] hover:text-[#C28B38] transition-colors cursor-pointer group"
                id="navbar-wishlist-btn-desktop"
                title="Saved Designs Wishlist"
              >
                <div className="relative">
                  <Heart 
                    size={20} 
                    className={`stroke-[1.8] group-hover:scale-105 transition-transform ${
                      currentView === 'wishlist' ? 'fill-[#B94A30] stroke-[#B94A30] text-[#B94A30]' : 'text-[#241810]'
                    }`} 
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#B94A30] text-white rounded-full text-[9px] font-black w-4 h-4 flex items-center justify-center shadow-xs">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#756455] group-hover:text-[#241810] mt-1">
                  Wishlist
                </span>
              </button>

              {/* Cart Button with Real Counter */}
              <button 
                onClick={() => onNavigate('cart')} 
                className="relative flex flex-col items-center p-1.5 text-[#241810] hover:text-[#C28B38] transition-colors cursor-pointer group"
                id="navbar-cart-btn-desktop"
                title="Your Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag 
                    size={20} 
                    className={`stroke-[1.8] group-hover:scale-105 transition-transform ${
                      currentView === 'cart' ? 'stroke-[#C28B38] text-[#C28B38]' : 'text-[#241810]'
                    }`} 
                  />
                  <span className="absolute -top-1.5 -right-2.5 bg-[#C28B38] text-white rounded-full text-[9px] font-black w-4 h-4 flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#756455] group-hover:text-[#241810] mt-1">
                  Cart
                </span>
              </button>

              {/* Logout Option (If logged in) */}
              {isLoggedIn && (
                <button
                  onClick={onLogout}
                  className="flex flex-col items-center p-1.5 text-[#756455] hover:text-[#B94A30] transition-colors cursor-pointer"
                  title="Sign out of account"
                >
                  <LogOut size={18} className="stroke-[1.8]" />
                  <span className="text-[10px] font-bold mt-1">Exit</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LEVEL 3: ARCHITECTURAL CATEGORY BAR & MEGA-MENU (Desktop)                 */}
        {/* ========================================================================= */}
        <div 
          className="bg-[#FAF7F2] border-t border-[#E7DFD5] relative hidden md:block select-none"
          onMouseLeave={handleMouseLeaveCat}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between overflow-x-auto no-scrollbar whitespace-nowrap py-1">
              {CATEGORY_MAP.map((cat) => {
                const isActive = activeMegaCat === cat.slug;
                const hasSubCategories = cat.subCategories && cat.subCategories.length > 0;
                return (
                  <div 
                    key={cat.slug} 
                    className="relative py-1.5 px-2"
                    onMouseEnter={() => handleMouseEnterCat(cat.slug)}
                  >
                    <button
                      onClick={() => {
                        onSelectCategory(cat.slug, null);
                        setActiveMegaCat(null);
                      }}
                      className={`text-[11.5px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer pb-0.5 ${
                        isActive 
                          ? 'text-[#C28B38] font-black border-b-2 border-[#C28B38]' 
                          : 'text-[#241810] hover:text-[#C28B38]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {hasSubCategories && (
                        <ChevronDown 
                          size={11} 
                          className={`transition-transform duration-200 ${isActive ? 'rotate-180 text-[#C28B38]' : 'text-[#756455]'}`} 
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Sophisticated Architectural Mega-Menu Dropdown */}
          <AnimatePresence>
            {activeMegaCat && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute top-full left-0 right-0 w-full bg-white border-t border-[#E7DFD5] shadow-2xl z-[150]"
                onMouseEnter={() => handleMouseEnterCat(activeMegaCat)}
                onMouseLeave={handleMouseLeaveCat}
              >
                {(() => {
                  const currentCat = CATEGORY_MAP.find(c => c.slug === activeMegaCat);
                  if (!currentCat) return null;
                  
                  const fallbackImg = CATEGORY_FALLBACK_IMAGES[currentCat.slug] || DEFAULT_FALLBACK_IMAGE;

                  return (
                    <div className="max-w-7xl mx-auto px-8 py-8">
                      <div className="grid grid-cols-12 gap-8">
                        
                        {/* Subcategories Architectural Grid (Left 8 Cols) */}
                        <div className="col-span-8">
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7DFD5]">
                            <div className="flex items-baseline gap-2">
                              <h3 className="font-serif text-lg font-bold text-[#241810] uppercase tracking-wide">
                                {currentCat.name}
                              </h3>
                              <span className="text-xs text-[#756455] font-sans font-medium">
                                ({currentCat.subCategories.reduce((sum, s) => sum + s.count, 0)} Total Craft Designs)
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                onSelectCategory(currentCat.slug, null);
                                setActiveMegaCat(null);
                              }}
                              className="text-xs font-bold text-[#C28B38] hover:text-[#241810] transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span>View All {currentCat.name}</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>

                          {/* Subcategory Cards Grid */}
                          <div className="grid grid-cols-3 gap-4">
                            {currentCat.subCategories.map((sub) => (
                              <button
                                key={sub.slug}
                                onClick={() => {
                                  onSelectCategory(currentCat.slug, sub.slug);
                                  setActiveMegaCat(null);
                                }}
                                className="text-left p-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F2ECE4] border border-[#E7DFD5] transition-all group cursor-pointer"
                              >
                                <div className="text-xs font-bold text-[#241810] group-hover:text-[#C28B38] transition-colors capitalize">
                                  {sub.name}
                                </div>
                                <div className="flex items-center justify-between mt-1 text-[11px] text-[#756455]">
                                  <span>{sub.count} Designs</span>
                                  {sub.basePrice > 0 && (
                                    <span className="font-semibold text-[#241810]">From ₹{sub.basePrice.toLocaleString('en-IN')}</span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Quality Specifications Footer */}
                          <div className="mt-6 pt-4 border-t border-[#F2ECE4] flex items-center justify-between text-[11px] text-[#756455]">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <ShieldCheck size={13} className="text-[#C28B38]" /> 
                                100% Native Solid Hardwoods
                              </span>
                              <span>•</span>
                              <span>Kiln & Air Seasoned Against Borers</span>
                              <span>•</span>
                              <span>Hand-buffed PU Wax Finish</span>
                            </div>
                            <button
                              onClick={() => {
                                onNavigate('contact');
                                setActiveMegaCat(null);
                              }}
                              className="text-[#241810] font-bold hover:text-[#C28B38] transition-colors cursor-pointer"
                            >
                              Custom Dimensions Available →
                            </button>
                          </div>
                        </div>

                        {/* Right Featured Promotional Card (Right 4 Cols) */}
                        <div className="col-span-4">
                          <div className="relative rounded-xl overflow-hidden shadow-md border border-[#E7DFD5] bg-[#241810] h-[260px] group flex flex-col justify-end p-6">
                            <img 
                              src={currentCat.img || fallbackImg} 
                              alt={currentCat.name} 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                              onError={(e) => {
                                if (e.currentTarget.src !== fallbackImg) {
                                  e.currentTarget.src = fallbackImg;
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#241810] via-[#241810]/40 to-transparent"></div>

                            <div className="relative z-10">
                              <span className="inline-block bg-[#C28B38] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                                {currentCat.promoOffer || 'Workshop Direct'}
                              </span>
                              <h4 className="font-serif text-lg font-bold text-white leading-tight uppercase tracking-wide">
                                {currentCat.promoTitle || currentCat.name}
                              </h4>
                              <p className="text-[#E7DFD5] text-xs mt-1">
                                Masterfully handcrafted in Malvan workshops
                              </p>
                              <button
                                onClick={() => {
                                  onSelectCategory(currentCat.slug, null);
                                  setActiveMegaCat(null);
                                }}
                                className="mt-3 bg-white hover:bg-[#FAF7F2] text-[#241810] text-xs font-bold px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <span>Browse Showcase</span>
                                <ArrowRight size={13} />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE COMPACT HEADER BAR (Mobile First: 320px - 767px)                   */}
        {/* ========================================================================= */}
        <div className="md:hidden flex items-center justify-between px-3.5 py-2.5 bg-white relative h-[56px]">
          {/* Left: 44px Touch Target Hamburger Menu */}
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="w-11 h-11 -ml-1 text-[#241810] hover:text-[#C28B38] cursor-pointer transition-colors flex items-center justify-center rounded-lg hover:bg-[#FAF7F2] active:bg-[#F2ECE4]"
            id="mobile-nav-hamburger-btn"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} className="stroke-[2.2]" />
          </button>

          {/* Center: Brand Logo */}
          <button 
            onClick={() => onNavigate('home')} 
            className="flex items-center justify-center bg-transparent border-none cursor-pointer focus:outline-none"
            id="mobile-nav-logo-btn"
            aria-label="Bhisez Furniture Home"
          >
            {renderBrandLogo(true)}
          </button>

          {/* Right: Quick Action Icons (Search, Wishlist, Cart) */}
          <div className="flex items-center space-x-1 text-[#241810]">
            
            {/* Search Toggle Icon */}
            <button 
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                if (!mobileSearchOpen) {
                  setTimeout(() => mobileSearchInputRef.current?.focus(), 150);
                }
              }} 
              className="w-10 h-10 flex items-center justify-center text-[#241810] hover:text-[#C28B38] cursor-pointer transition-colors rounded-lg hover:bg-[#FAF7F2]"
              title="Search Products"
              id="mobile-search-toggle-btn"
              aria-label="Toggle Search"
            >
              <Search size={20} className="stroke-[2]" />
            </button>

            {/* Wishlist with Real Badge */}
            <button 
              onClick={() => onNavigate('wishlist')} 
              className="w-10 h-10 relative flex items-center justify-center text-[#241810] hover:text-[#C28B38] cursor-pointer transition-colors rounded-lg hover:bg-[#FAF7F2]"
              id="mobile-nav-wishlist-btn"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart 
                size={20} 
                className={`stroke-[2] ${currentView === 'wishlist' ? 'fill-[#B94A30] stroke-[#B94A30] text-[#B94A30]' : 'text-[#241810]'}`} 
              />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#B94A30] text-white rounded-full text-[8.5px] font-black w-4 h-4 flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart with Real Badge */}
            <button 
              onClick={() => onNavigate('cart')} 
              className="w-10 h-10 relative flex items-center justify-center text-[#241810] hover:text-[#C28B38] cursor-pointer transition-colors rounded-lg hover:bg-[#FAF7F2]"
              id="mobile-nav-cart-btn"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag 
                size={20} 
                className={`stroke-[2] ${currentView === 'cart' ? 'stroke-[#C28B38] text-[#C28B38]' : 'text-[#241810]'}`} 
              />
              <span className="absolute top-1.5 right-1.5 bg-[#C28B38] text-white rounded-full text-[8.5px] font-black w-4 h-4 flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE INSTANT SEARCH OVERLAY                                             */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden bg-white border-t border-[#E7DFD5] px-4 py-3 overflow-hidden shadow-lg"
            >
              <div className="relative w-full">
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  placeholder="Search beds, mandirs, dining, sofas..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleExecuteSearch();
                    }
                  }}
                  className="w-full bg-[#FAF7F2] border border-[#E7DFD5] text-[#241810] text-xs rounded-lg pl-9 pr-8 py-2.5 focus:ring-1 focus:ring-[#C28B38] focus:border-[#C28B38] outline-none font-medium"
                  id="mobile-search-input"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#756455] pointer-events-none" />
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')} 
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756455] p-1"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Mobile Live Suggestions */}
              {searchQuery.trim().length > 0 ? (
                <div className="mt-3 space-y-1 max-h-60 overflow-y-auto">
                  {liveSearchResults.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        saveRecentSearch(prod.name);
                        setMobileSearchOpen(false);
                        if (onSelectProduct) {
                          onSelectProduct(prod.id);
                        } else {
                          onSearchChange(prod.name);
                          if (currentView !== 'beds') onNavigate('beds');
                        }
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#FAF7F2] flex items-center justify-between transition-colors"
                    >
                      <div className="truncate text-xs font-bold text-[#241810]">
                        {prod.name}
                      </div>
                      <div className="text-xs font-bold text-[#241810] shrink-0 pl-2">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => handleExecuteSearch()}
                    className="w-full mt-2 py-2 bg-[#241810] text-white text-xs font-bold rounded-lg text-center"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              ) : (
                /* Mobile Popular Chips */
                <div className="mt-3">
                  <div className="text-[10px] font-bold text-[#756455] uppercase tracking-wider mb-2">
                    Popular Collections
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_SEARCH_TAGS.map((tag) => (
                      <button
                        key={tag.slug}
                        onClick={() => {
                          onSelectCategory(tag.slug, null);
                          setMobileSearchOpen(false);
                        }}
                        className="text-xs bg-[#FAF7F2] text-[#241810] px-2.5 py-1 rounded-full border border-[#E7DFD5]"
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-OUT NAVIGATION DRAWER (Genuinely Mobile-First UX)            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] bg-[#241810]/60 backdrop-blur-xs cursor-pointer" 
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Slide-out Panel with 44px+ Touch Targets */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 top-0 bottom-0 z-[210] w-[85vw] max-w-sm bg-[#FBF9F5] shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#E7DFD5]"
              id="mobile-navigation-drawer"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex justify-between items-center px-4 py-3.5 border-b border-[#E7DFD5] bg-white">
                  {renderBrandLogo(true)}
                  <button 
                    onClick={() => setMobileMenuOpen(false)} 
                    className="w-11 h-11 rounded-lg hover:bg-[#FAF7F2] text-[#756455] hover:text-[#241810] cursor-pointer transition-colors flex items-center justify-center"
                    aria-label="Close Navigation Drawer"
                    id="close-mobile-drawer-btn"
                  >
                    <X size={20} className="stroke-[2.2]" />
                  </button>
                </div>

                {/* Primary Navigation Sections */}
                <div className="p-4 space-y-1 border-b border-[#E7DFD5]">
                  <button 
                    onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
                    className={`w-full min-h-[44px] text-left text-sm font-bold px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                      currentView === 'home' ? 'bg-[#F2ECE4] text-[#241810]' : 'text-[#241810] hover:bg-[#F2ECE4]/60'
                    }`}
                  >
                    <span className="text-base">🏠</span> Home Storefront
                  </button>

                  <button 
                    onClick={() => { onNavigate('beds'); setMobileMenuOpen(false); }} 
                    className={`w-full min-h-[44px] text-left text-sm font-bold px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                      currentView === 'beds' ? 'bg-[#F2ECE4] text-[#241810]' : 'text-[#241810] hover:bg-[#F2ECE4]/60'
                    }`}
                  >
                    <span className="text-base">🛋️</span> All Furniture & Timber Crafts
                  </button>

                  <button 
                    onClick={() => { onNavigate('showroom'); setMobileMenuOpen(false); }} 
                    className={`w-full min-h-[44px] text-left text-sm font-bold px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                      currentView === 'showroom' ? 'bg-[#F2ECE4] text-[#241810]' : 'text-[#241810] hover:bg-[#F2ECE4]/60'
                    }`}
                  >
                    <span className="text-base">📍</span> Visit Experience Showrooms
                  </button>

                  <button 
                    onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} 
                    className={`w-full min-h-[44px] text-left text-sm font-bold px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                      currentView === 'contact' ? 'bg-[#F2ECE4] text-[#241810]' : 'text-[#241810] hover:bg-[#F2ECE4]/60'
                    }`}
                  >
                    <span className="text-base">📐</span> Custom Sizing & Quotes
                  </button>

                  <button 
                    onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} 
                    className={`w-full min-h-[44px] text-left text-sm font-bold px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer ${
                      currentView === 'about' ? 'bg-[#F2ECE4] text-[#241810]' : 'text-[#241810] hover:bg-[#F2ECE4]/60'
                    }`}
                  >
                    <span className="text-base">🪵</span> Timber Seasoning Heritage
                  </button>
                </div>

                {/* Expandable Category Accordion */}
                <div className="p-4">
                  <div className="text-[10px] font-black tracking-widest text-[#756455] uppercase mb-2 px-1">
                    Shop Categories ({CATEGORY_MAP.length})
                  </div>
                  
                  <div className="space-y-1">
                    {CATEGORY_MAP.map((cat) => {
                      const isExpanded = expandedMobileCategory === cat.slug;
                      const hasSubs = cat.subCategories && cat.subCategories.length > 0;

                      return (
                        <div key={cat.slug} className="rounded-lg border border-[#E7DFD5] overflow-hidden bg-white">
                          <div className="flex items-center justify-between min-h-[44px] px-3">
                            <button
                              onClick={() => {
                                onSelectCategory(cat.slug, null);
                                setMobileMenuOpen(false);
                              }}
                              className="text-left text-xs font-bold text-[#241810] hover:text-[#C28B38] py-2 flex-1 cursor-pointer"
                            >
                              {cat.name}
                            </button>

                            {hasSubs && (
                              <button
                                onClick={() => setExpandedMobileCategory(isExpanded ? null : cat.slug)}
                                className="w-10 h-10 flex items-center justify-center text-[#756455] hover:text-[#241810] cursor-pointer"
                                aria-label={`Toggle ${cat.name} subcategories`}
                              >
                                <ChevronDown 
                                  size={16} 
                                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#C28B38]' : ''}`} 
                                />
                              </button>
                            )}
                          </div>

                          {/* Subcategories Accordion Content */}
                          <AnimatePresence>
                            {isExpanded && hasSubs && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18 }}
                                className="bg-[#FAF7F2] px-3 py-2 border-t border-[#E7DFD5] space-y-1"
                              >
                                {cat.subCategories.map((sub) => (
                                  <button
                                    key={sub.slug}
                                    onClick={() => {
                                      onSelectCategory(cat.slug, sub.slug);
                                      setMobileMenuOpen(false);
                                    }}
                                    className="w-full min-h-[38px] text-left text-xs text-[#756455] hover:text-[#241810] py-1.5 px-2 rounded flex items-center justify-between cursor-pointer"
                                  >
                                    <span className="capitalize">{sub.name}</span>
                                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#E7DFD5]">
                                      {sub.count}
                                    </span>
                                  </button>
                                ))}
                                <button
                                  onClick={() => {
                                    onSelectCategory(cat.slug, null);
                                    setMobileMenuOpen(false);
                                  }}
                                  className="w-full text-center text-xs font-bold text-[#C28B38] py-2 pt-2.5 block"
                                >
                                  View All {cat.name} →
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Footer & Direct WhatsApp Support */}
              <div className="p-4 border-t border-[#E7DFD5] bg-white space-y-2.5">
                <a 
                  href="https://wa.me/917057441122?text=Hi!%20I%20want%20to%20enquire%20about%20Bhisez%20solid%20teak%20furniture." 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full min-h-[44px] text-center bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>💬</span> WhatsApp Direct Craftsman Line
                </a>

                {/* Sign In / Sign Out */}
                {isLoggedIn ? (
                  <button 
                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                    className="w-full min-h-[44px] text-center font-bold text-xs text-[#B94A30] py-2 hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer border border-[#E7DFD5]"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button 
                    onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}
                    className="w-full min-h-[44px] text-center font-bold text-xs text-[#241810] py-2 bg-[#F2ECE4] hover:bg-[#E7DFD5] rounded-lg transition-colors cursor-pointer"
                  >
                    Customer Sign In / Register
                  </button>
                )}

                {/* Workshop Admin Link */}
                <div className="pt-2 text-center">
                  <a 
                    href="?view=admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[11px] font-bold text-[#8F5E15] hover:underline"
                  >
                    🔒 Workshop Admin Center
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
