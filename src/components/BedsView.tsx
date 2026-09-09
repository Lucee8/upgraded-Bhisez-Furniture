import { useState, useMemo, useEffect } from 'react';
import { Product, ViewState } from '../types';
import { ALL_PRODUCTS, CATEGORY_MAP } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Search, 
  MessageCircle, 
  X,
  SlidersHorizontal,
  ChevronLeft,
  User,
  ShoppingBag,
  ArrowUpDown,
  LayoutGrid,
  Info,
  Check,
  Video,
  ExternalLink
} from 'lucide-react';

interface BedsViewProps {
  onNavigate: (view: ViewState) => void;
  onSelectProduct: (id: string | number) => void;
  onToggleWishlist: (id: string | number) => void;
  wishlist: (string | number)[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  initialCategoryFilter?: string | null;
  initialSubCategoryFilter?: string | null;
  // Extra e-commerce props to render the gorgeous native header
  cartCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
  products?: Product[];
}

const MATERIAL_MAP: Record<string, string> = {
  'solid-wood': 'Solid Wood',
  'engineered-wood': 'Engineered Wood',
  'teak': 'Teak wood',
  'mango-wood': 'Mango Wood',
  'sheesham': 'Sheesham & Rosewood'
};

const SIZE_MAP: Record<string, string> = {
  'king': 'King Size (180x200cm)',
  'queen': 'Queen Size (160x200cm)',
  'single': 'Single (90x200cm)',
  'double': 'Double Size'
};

const STORAGE_MAP: Record<string, string> = {
  'hydraulic': 'Hydraulic Storage',
  'box': 'Box Storage',
  'drawer': 'Drawer Storage',
  'no-storage': 'No Storage Slots'
};

const PRICE_PRESETS = [
  { label: 'Under ₹20,000', labelShort: '< ₹20k', min: 0, max: 20000 },
  { label: '₹20,000 – ₹40,000', labelShort: '₹20k-40k', min: 20000, max: 40000 },
  { label: '₹40,000 – ₹60,000', labelShort: '₹40k-60k', min: 40000, max: 60000 },
  { label: 'Above ₹60,000', labelShort: '₹60k+', min: 60000, max: Infinity }
];

export default function BedsView({
  onNavigate,
  onSelectProduct,
  onToggleWishlist,
  wishlist,
  searchQuery,
  onSearchChange,
  initialCategoryFilter,
  initialSubCategoryFilter,
  cartCount,
  wishlistCount,
  isLoggedIn,
  onLogout,
  products
}: BedsViewProps) {
  // Navigation categories list generated dynamically
  const CATEGORIES = useMemo(() => {
    const list = [
      { id: 'all', title: 'All Crafts', subtitle: `${(products || ALL_PRODUCTS).length} Styles Available` }
    ];
    CATEGORY_MAP.forEach(cat => {
      const count = cat.subCategories.reduce((sum, sub) => sum + sub.count, 0);
      list.push({
        id: cat.slug,
        title: cat.name,
        subtitle: `${count} Custom Designs`
      });
    });
    return list;
  }, [products]);

  // Selected category state backing
  const [activeCategory, setActiveCategory] = useState<string>(initialCategoryFilter || 'all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(initialSubCategoryFilter || null);

  // Sync state if initial filters change from navigation
  useEffect(() => {
    if (initialCategoryFilter) {
      setActiveCategory(initialCategoryFilter);
    }
    setActiveSubCategory(initialSubCategoryFilter || null);
  }, [initialCategoryFilter, initialSubCategoryFilter]);

  // Reset active category selection to 'all' if user initiates search
  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      setActiveCategory('all');
      setActiveSubCategory(null);
      setIsSearchVisible(true);
    }
  }, [searchQuery]);

  // Filters active states
  const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedStorages, setSelectedStorages] = useState<Set<string>>(new Set());
  const [selectedPricePreset, setSelectedPricePreset] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');

  // Drawer toggles
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isLiveVideoOpen, setIsLiveVideoOpen] = useState<boolean>(false);

  // Search input visible state
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(!!searchQuery);

  // Calculate matching dynamic metadata for active category
  const activeCategoryMeta = useMemo(() => {
    return CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  }, [CATEGORIES, activeCategory]);

  // Filter and compute items
  const filteredProducts = useMemo(() => {
    let result = (products || ALL_PRODUCTS).slice();

    // 1. Dynamic category check
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 1b. Dynamic sub-category check
    if (activeSubCategory) {
      result = result.filter(p => p.subCategory === activeSubCategory);
    }

    // 2. Search check
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(p => {
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesShortDesc = p.shortDesc && p.shortDesc.toLowerCase().includes(query);
        const matchesDesc = p.description && p.description.toLowerCase().includes(query);
        const matchesCategory = p.category && p.category.toLowerCase().includes(query);
        const matchesSubCategory = p.subCategory && p.subCategory.toLowerCase().includes(query);
        
        const catObj = CATEGORY_MAP.find(c => c.slug === p.category);
        const matchesCategoryName = catObj && catObj.name.toLowerCase().includes(query);
        
        return matchesName || matchesShortDesc || matchesDesc || matchesCategory || matchesSubCategory || matchesCategoryName;
      });
    }

    // 3. Material check
    if (selectedMaterials.size > 0) {
      result = result.filter(p => p.material && selectedMaterials.has(p.material));
    }

    // 4. Size check
    if (selectedSizes.size > 0) {
      result = result.filter(p => {
        const sizes = p.sizesList || (p.category === 'beds' ? ["King Size", "Queen Size"] : []);
        return Array.from(selectedSizes).some(sz => {
          if (sz === 'king') return sizes.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('king'));
          if (sz === 'queen') return sizes.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('queen'));
          return sizes.some((s: any) => typeof s === 'string' && s.toLowerCase().includes((sz as string).toLowerCase()));
        });
      });
    }

    // 5. Storage check
    if (selectedStorages.size > 0) {
      result = result.filter(p => {
        const storages = p.optionsList || (p.category === 'beds' ? ["Hydraulic Storage", "Non Storage"] : []);
        return Array.from(selectedStorages).some(st => {
          if (st === 'hydraulic') return storages.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('hydraulic'));
          if (st === 'box') return storages.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('box'));
          if (st === 'drawer') return storages.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('drawer'));
          if (st === 'no-storage') return storages.some((s: any) => typeof s === 'string' && (s.toLowerCase().includes('non') || s.toLowerCase().includes('no storage')));
          return storages.some((s: any) => typeof s === 'string' && s.toLowerCase().includes((st as string).toLowerCase()));
        });
      });
    }

    // 6. Price Preset Check
    if (selectedPricePreset !== null) {
      const preset = PRICE_PRESETS[selectedPricePreset];
      result = result.filter(p => p.price >= preset.min && p.price <= preset.max);
    }

    // 7. Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'disc-desc') {
      result.sort((a, b) => {
        const discA = a.orig ? (a.orig - a.price) / a.orig : 0;
        const discB = b.orig ? (b.orig - b.price) / b.orig : 0;
        return discB - discA;
      });
    }

    return result;
  }, [products, activeCategory, activeSubCategory, searchQuery, selectedMaterials, selectedSizes, selectedStorages, selectedPricePreset, sortBy]);

  // Swatches mock colors list mapped specifically to elevate grid aesthetic
  const getProductSwatches = (product: Product, index: number) => {
    // Return custom stylish colors if not provided, exactly matching screenshot swatches
    if (product.colors && product.colors.length > 0) {
      return {
        colors: product.colors.slice(0, 2),
        extra: product.colors.length > 2 ? `+${product.colors.length - 2}` : ''
      };
    }
    // High-contrast beautiful defaults
    const presetSwatches = [
      { colors: ['#5c4033', '#1c1c1c'], extra: '+4' },
      { colors: ['#4a2511', '#c19a6b'], extra: '+14' },
      { colors: ['#2e4053', '#d7ccc8'], extra: '+2' },
      { colors: ['#243010', '#827366'], extra: '+10' }
    ];
    return presetSwatches[index % presetSwatches.length];
  };

  const toggleMaterial = (mat: string) => {
    const next = new Set(selectedMaterials);
    next.has(mat) ? next.delete(mat) : next.add(mat);
    setSelectedMaterials(next);
  };

  const toggleSize = (sz: string) => {
    const next = new Set(selectedSizes);
    next.has(sz) ? next.delete(sz) : next.add(sz);
    setSelectedSizes(next);
  };

  const toggleStorage = (st: string) => {
    const next = new Set(selectedStorages);
    next.has(st) ? next.delete(st) : next.add(st);
    setSelectedStorages(next);
  };

  const clearAllFilters = () => {
    setSelectedMaterials(new Set());
    setSelectedSizes(new Set());
    setSelectedStorages(new Set());
    setSelectedPricePreset(null);
    onSearchChange('');
  };

  const handleSelectCategoryFromList = (catId: string) => {
    setActiveCategory(catId);
    clearAllFilters();
    setIsCategoryOpen(false);
  };

  return (
    <div className="bg-[#fcfbf9] min-h-screen relative flex flex-col pb-20">
      
      {/* ── HIGH-FIDELITY MOBILE EMBED HEADER ── */}
      <header className="sticky top-0 z-[110] bg-white border-b border-stone-200/80 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Back key + title stack */}
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => onNavigate('home')}
              className="p-1.5 hover:bg-stone-50 rounded-full text-stone-700 transition-colors cursor-pointer"
              aria-label="Back to dashboard"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold text-base sm:text-lg text-stone-900 tracking-tight leading-none">
                {activeCategoryMeta.title}
              </span>
              <span className="text-[10px] sm:text-xs text-stone-400 font-normal mt-1 block">
                {activeCategoryMeta.subtitle}
              </span>
            </div>
          </div>

          {/* Quick interactive utility icons exactly matching screenshot */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="p-2 text-stone-700 hover:bg-stone-50 rounded-full transition-colors relative cursor-pointer"
              title="Search items"
            >
              <Search size={21} className={isSearchVisible ? 'text-[#f06e38]' : 'text-stone-700'} />
            </button>

            {isLoggedIn ? (
              <button 
                onClick={onLogout}
                className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-900 text-xs shadow-2xs hover:bg-amber-200 transition-colors cursor-pointer"
                title="Account Settings"
              >
                BD
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="p-2 text-stone-700 hover:bg-stone-50 rounded-full transition-colors cursor-pointer"
                title="Sign In"
              >
                <User size={21} />
              </button>
            )}

            <button
              onClick={() => onNavigate('wishlist')}
              className="p-2 text-stone-700 hover:bg-stone-50 rounded-full transition-colors relative cursor-pointer"
              title="My Wishlist"
            >
              <Heart size={21} className={wishlistCount > 0 ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-stone-700'} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white rounded-full text-[9px] font-black w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="p-2 text-stone-700 hover:bg-stone-50 rounded-full transition-colors relative cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#f06e38] text-white rounded-full text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Dynamic sliding Search strip on toggle */}
        <AnimatePresence>
          {isSearchVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-2 bg-stone-50 rounded-xl"
            >
              <div className="relative p-2 flex items-center">
                <Search size={16} className="absolute left-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Query designs (e.g., modular, teak size...)"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-200/80 rounded-lg pl-9 pr-8 py-2.5 outline-none focus:ring-1 focus:ring-[#f06e38]"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-5 text-stone-400 hover:text-stone-600"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── BREADCRUMB SLAT OR CHIPS DESK ONLY ── */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 mt-4 w-full">
        <div className="flex justify-between items-center bg-stone-50 border border-stone-250 p-3.5 rounded-xl">
          <div className="flex items-center space-x-1.5 text-xs text-stone-500 font-medium">
            <button onClick={() => onNavigate('home')} className="hover:text-amber-800 bg-transparent text-stone-500 cursor-pointer">Home</button>
            <span>›</span>
            <span className="text-stone-800 font-bold">{activeCategoryMeta.title}</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            {searchQuery && (
              <span className="bg-[#f06e38]/10 text-[#f06e38] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-3xs text-[11px]">
                Search: "{searchQuery}"
                <X size={12} className="cursor-pointer" onClick={() => onSearchChange('')} />
              </span>
            )}
            <span className="text-stone-500 font-bold">
              {filteredProducts.length} Match{filteredProducts.length === 1 ? '' : 'es'}
            </span>
          </div>
        </div>
      </div>

      {/* ── SUBCATEGORY QUICK-TABS (Wooden Street Category style sub-header) ── */}
      {activeCategory && activeCategory !== 'all' && (
        <div className="max-w-7xl mx-auto px-4 mt-3 flex items-center gap-2 overflow-x-auto select-none no-scrollbar whitespace-nowrap">
          <button
            onClick={() => setActiveSubCategory(null)}
            className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !activeSubCategory 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            All {activeCategoryMeta.title}
          </button>
          {(() => {
            const catObj = CATEGORY_MAP.find(c => c.slug === activeCategory);
            if (!catObj) return null;
            return catObj.subCategories.map(sub => (
              <button
                key={sub.slug}
                onClick={() => setActiveSubCategory(sub.slug)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSubCategory === sub.slug 
                    ? 'bg-[#3d2b1f] text-white shadow-xs' 
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {sub.name} ({sub.count})
              </button>
            ));
          })()}
        </div>
      )}

      {/* ── CORE GRID OR EMPTY STATE ── */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 flex-1 w-full pt-2">
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-stone-200/60 rounded-2xl p-16 text-center space-y-4 my-8 max-w-2xl mx-auto shadow-2xs">
            <div className="text-4xl">🏜️</div>
            <h3 className="font-serif text-lg font-bold text-stone-800">No Product Matches Found</h3>
            <p className="text-stone-500 text-xs leading-relaxed max-w-sm mx-auto">
              We couldn't find designs in {activeCategoryMeta.title} matching those filters. Try adjusting your query or filters using the action options!
            </p>
            <div className="pt-2">
              <button 
                onClick={clearAllFilters}
                className="bg-[#3d2b1f] hover:bg-stone-900 text-amber-50 font-bold text-xs py-2.5 px-6 rounded-lg transition-transform cursor-pointer"
              >
                Reset Selection
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 sm:gap-x-4 gap-y-4 sm:gap-y-6">
            {filteredProducts.map((p, idx) => {
              const isWished = wishlist.includes(p.id);
              const discount = p.orig && p.orig > 0 ? Math.round((1 - p.price / p.orig) * 100) : 0;
              const swatchMeta = getProductSwatches(p, idx);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
                  key={p.id}
                  onClick={() => onSelectProduct(p.id)}
                  className="bg-white border border-stone-200/60 rounded-none overflow-hidden hover:border-[#f06e38] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  {/* Card top banner / image wrapper */}
                  <div className="relative aspect-[4/5] bg-stone-50/50 overflow-hidden w-full">
                    <img 
                      src={p.img} 
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />

                    {/* Wishlist toggle absolute button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(p.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-xs text-stone-500 transition-transform active:scale-90 hover:scale-110 cursor-pointer z-10"
                    >
                      <Heart size={16} className={isWished ? 'fill-red-500 stroke-red-500 text-red-500' : 'text-stone-500'} />
                    </button>

                    {/* Dynamic label pill top-left mapping from screenshot */}
                    {p.badge ? (
                      <span className="absolute top-2.5 left-0 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-[#f06e38] text-white pl-2.5 pr-3 py-1 rounded-r-md shadow-xs">
                        {p.badge === 'bs' ? 'BESTSELLER' : p.badge === 'new' ? 'NEW ARRIVALS' : 'CUSTOM LUX'}
                      </span>
                    ) : (
                      idx % 3 === 0 && (
                        <span className="absolute top-2.5 left-0 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-[#3d2b1f] text-white pl-2.5 pr-3 py-1 rounded-r-md shadow-xs">
                          NEW ARRIVALS
                        </span>
                      )
                    )}
                  </div>

                  {/* Card bottom details */}
                  <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between bg-transparent">
                    
                    <div className="space-y-1 text-left">
                      {/* Brand name */}
                      <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                        BHISEZ FURNITURE
                      </span>
                      {/* Title description inline-clamped */}
                      <h3 className="text-xs sm:text-sm font-semibold text-stone-800 leading-snug line-clamp-2 min-h-[34px] group-hover:text-[#f06e38] transition-colors">
                        {p.name}
                      </h3>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-stone-100 mt-2 bg-transparent">
                      {/* Price layout */}
                      <div className="flex items-baseline flex-wrap gap-1">
                        {p.price > 0 ? (
                          <>
                            <span className="text-sm sm:text-base font-black text-stone-900 leading-none">
                              ₹{p.price.toLocaleString('en-IN')}
                            </span>
                            {p.orig && p.orig > 0 && (
                              <span className="text-[10px] sm:text-xs text-stone-400 line-through font-medium ml-1">
                                ₹{p.orig.toLocaleString('en-IN')}
                              </span>
                            )}
                            {discount > 0 && (
                              <span className="text-[10px] sm:text-xs text-emerald-600 font-bold ml-1.5 leading-none">
                                {discount}% OFF
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                            <Info size={11} /> Call for Estimate
                          </span>
                        )}
                      </div>

                      {/* Swatches color indicator circles mapped inside */}
                      <div className="flex items-center space-x-1 border-t border-stone-50/50 pt-1.5 bg-transparent">
                        {swatchMeta.colors.map((hex, cIdx) => (
                          <span 
                            key={cIdx}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-stone-200/80 shadow-3xs inline-block"
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                        {swatchMeta.extra && (
                          <span className="inline-flex items-center justify-center bg-stone-100 text-[#444] text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-stone-200/40">
                            {swatchMeta.extra}
                          </span>
                        )}
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── COMPLIMENTARY LOCAL SHIPPING INFO BAR ── */}
      <section className="bg-stone-50 border-t border-stone-150 py-6 px-4 mt-12 max-w-7xl mx-auto w-full rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-xs sm:text-sm font-black text-stone-800 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
              🚚 Complimentary Assembly & Delivery
            </h4>
            <p className="text-stone-500 text-xs mt-1">
              Safe transit with full white-glove wood setup included across Malvan, Sukalwad, Kudal & Goa.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="text-xs font-bold text-white bg-stone-900 hover:bg-black px-4.5 py-2.5 rounded-lg whitespace-nowrap cursor-pointer transition-transform active:scale-95 duration-150"
            id="complimentary-install-action"
          >
            Custom Sizing Order
          </button>
        </div>
      </section>

      {/* ── FLOATING ORANGE VIDEO CALL HERO BUTTON FROM SCREENSHOT ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsLiveVideoOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[115] w-14 h-14 bg-[#f06e38] hover:bg-[#e65100] active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        title="Live Video Showroom Tour"
        id="camera-live-floating-btn"
      >
        <span className="absolute inset-0 rounded-full bg-[#f06e38] animate-ping opacity-25"></span>
        <Video size={25} className="text-white fill-white" />
      </motion.button>

      {/* Live Video Walkthrough dialog box modal */}
      <AnimatePresence>
        {isLiveVideoOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLiveVideoOpen(false)}
              className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs" 
            />
            
            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="bg-white border border-stone-200 rounded-3xl p-6 shadow-2xl relative max-w-md w-full text-center space-y-4 z-10"
            >
              <button 
                onClick={() => setIsLiveVideoOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
              >
                <X size={18} />
              </button>
              
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-[#f06e38]">
                <Video size={22} className="fill-current" />
              </div>
              
              <h3 className="font-serif text-lg font-bold text-stone-900">Showroom Live Walkthrough</h3>
              <p className="text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                Connect directly with Bhisez or store representatives for a live HD WhatsApp video walkthrough to inspect the teak grades, drawer joints, or fabric finishes of our showroom items in real-time!
              </p>

              <div className="pt-3 flex flex-col space-y-2 bg-transparent">
                <a
                  href={`https://wa.me/917057441122?text=${encodeURIComponent(`Hi Bhisez! I would like to schedule/initiate a Live WhatsApp Video Walkthrough of the showrooms to see the furniture designs in real-time.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsLiveVideoOpen(false)}
                  className="w-full text-center bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                >
                  💬 Chat & Request video
                </a>
                <button
                  onClick={() => setIsLiveVideoOpen(false)}
                  className="w-full text-center border border-stone-200 text-stone-500 hover:bg-stone-50 font-bold text-xs py-3 rounded-xl"
                >
                  Close Options
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM STICKY INTERACTIVE FOOTER FROM SCREENSHOT ── */}
      <footer className="fixed bottom-0 left-0 right-0 z-[120] bg-white border-t border-stone-200 px-1 py-1.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          
          {/* SORT BY column trigger */}
          <button
            onClick={() => setIsSortOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 py-1.5 flex-1 hover:text-[#f06e38] transition-colors text-stone-700 bg-transparent cursor-pointer border-none"
            id="bottom-sticky-sort-trigger"
          >
            <ArrowUpDown size={18} className="text-stone-700 hover:text-[#f06e38]" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase">SORT BY</span>
          </button>

          {/* FILTERS column trigger */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 py-1.5 flex-1 border-l border-r border-stone-150 hover:text-[#f06e38] transition-colors text-stone-700 bg-transparent cursor-pointer border-none"
            id="bottom-sticky-filter-trigger"
          >
            <SlidersHorizontal size={18} className="text-stone-700 hover:text-[#f06e38]" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase">FILTERS</span>
          </button>

          {/* CATEGORY column trigger */}
          <button
            onClick={() => setIsCategoryOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 py-1.5 flex-1 hover:text-[#f06e38] transition-colors text-stone-700 bg-transparent cursor-pointer border-none"
            id="bottom-sticky-category-trigger"
          >
            <LayoutGrid size={18} className="text-stone-700 hover:text-[#f06e38]" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase">CATEGORY</span>
          </button>

        </div>
      </footer>

      {/* ── DRAWERS AND MODALS TRANSITIONAL LAYERS (Framer motion) ── */}

      {/* 1. SORT BY DRAWER SHEET */}
      <AnimatePresence>
        {isSortOpen && (
          <div className="fixed inset-0 z-[150] flex items-end justify-center">
            
            {/* Backdrop black layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSortOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-2xs"
            />

            {/* Slider panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="bg-white w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl relative z-10 select-none pb-8"
            >
              {/* Slider handle */}
              <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-stone-400 uppercase tracking-widest">Select sequence</span>
                <button onClick={() => setIsSortOpen(false)} className="text-stone-400 hover:text-stone-600">
                  <X size={18} />
                </button>
              </div>

              <h3 className="font-serif text-lg font-black text-stone-900 mb-4">Sort Products</h3>

              <div className="space-y-2 bg-transparent">
                {[
                  { value: 'default', label: 'Relevance & Popularity' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'disc-desc', label: 'Biggest Value Discount' },
                  { value: 'name-asc', label: 'Alphabetical Order (A-Z)' }
                ].map((opt) => {
                  const isActive = sortBy === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${isActive ? 'bg-amber-50 border-[#f06e38] text-stone-900 font-extrabold' : 'bg-transparent border-stone-200/80 text-stone-600'}`}
                    >
                      {opt.label}
                      {isActive && <Check size={16} className="text-[#f06e38]" />}
                    </button>
                  );
                })}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CATEGORY SELECTOR DRAWER SHEET */}
      <AnimatePresence>
        {isCategoryOpen && (
          <div className="fixed inset-0 z-[150] flex items-end justify-center">
            
            {/* Backdrop black layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-2xs"
            />

            {/* Slider panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="bg-white w-full max-w-md rounded-t-3xl p-6 relative shadow-2xl relative z-10 select-none pb-8"
            >
              {/* Slider handle */}
              <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-stone-400 uppercase tracking-widest">Select Category</span>
                <button onClick={() => setIsCategoryOpen(false)} className="text-stone-400 hover:text-stone-600">
                  <X size={18} />
                </button>
              </div>

              <h3 className="font-serif text-lg font-black text-stone-900 mb-4">Furniture Showrooms</h3>

              <div className="grid grid-cols-2 gap-3.5 bg-transparent overflow-y-auto max-h-[300px] pr-1.5 scrollbar-thin">
                {[
                  { id: 'all', label: 'All Collections', icon: '🪵' },
                  { id: 'door-frames', label: 'Door Frames', icon: '🚪' },
                  { id: 'wooden-sofas', label: 'Wooden Sofas', icon: '🛋️' },
                  { id: 'wooden-chairs', label: 'Wooden Chairs', icon: '🪑' },
                  { id: 'beds', label: 'Premium Beds', icon: '🛏️' },
                  { id: 'dressing-table', label: 'Dressing Table', icon: '🪞' },
                  { id: 'wooden-swings', label: 'Swings & Jhulas', icon: '🪵' },
                  { id: 'wooden-safety-doors', label: 'Safety Doors', icon: '🛡️' },
                  { id: 'wooden-mandirs', label: 'Divine Mandirs', icon: '🛕' },
                  { id: 'teapoys-coffee-tables', label: 'Coffee Tables', icon: '☕' },
                  { id: 'sofa-cum-beds', label: 'Sofa Cum Beds', icon: '🛏️' },
                  { id: 'dining-tables', label: 'Dining Tables', icon: '🍽️' },
                  { id: 'wardrobes', label: 'Wardrobes', icon: '🚪' },
                  { id: 'tv-units', label: 'TV Units', icon: '📺' },
                  { id: 'chaurang-and-paats', label: 'Chaurang & Paats', icon: '🪆' },
                  { id: 'diwans', label: 'Indian Diwans', icon: '🛋️' },
                ].map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategoryFromList(cat.id)}
                      className={`text-left p-4 rounded-xl border flex flex-col justify-between h-24 transition-all cursor-[#f06e38] cursor-pointer ${isActive ? 'bg-amber-50 border-[#f06e38] text-stone-900 font-black' : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-400'}`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-[11px] font-bold leading-none">{cat.label}</span>
                    </button>
                  );
                })}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. FILTERS EXPERT SIDEBAR/DRAWER */}
      <AnimatePresence>
        {isFilterOpen && (
          <div className="fixed inset-0 z-[150] flex justify-end">
            
            {/* Backdrop black layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-2xs"
            />

            {/* Flyout panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="bg-white w-full max-w-sm sm:max-w-md h-full relative shadow-2xl relative z-10 flex flex-col justify-between py-6 select-none bg-[#fcfbf9]"
            >
              
              {/* Flyout Custom Header */}
              <div className="px-6 pb-4 border-b border-stone-200. flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-black text-stone-950 flex items-center gap-1.5">
                    <SlidersHorizontal size={16} /> Filters
                  </h3>
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mt-0.5">
                    Narrow your timber search
                  </span>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1.5 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Filters forms */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                
                {/* 1. Timber options */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Timber material</span>
                  <div className="space-y-2">
                    {Object.entries(MATERIAL_MAP).map(([key, label]) => {
                      const isChecked = selectedMaterials.has(key);
                      return (
                        <label key={key} className="flex items-center space-x-2.5 text-xs text-stone-700 font-bold cursor-pointer bg-white border border-stone-150 p-2.5 rounded-lg">
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleMaterial(key)}
                            className="rounded-full w-4.5 h-4.5 accent-[#f06e38]" 
                          />
                          <span>{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Sizing if applicable */}
                {activeCategory === 'beds' && (
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Bed sizes</span>
                    <div className="space-y-2">
                      {Object.entries(SIZE_MAP).map(([key, label]) => {
                        const isChecked = selectedSizes.has(key);
                        return (
                          <label key={key} className="flex items-center space-x-2.5 text-xs text-stone-700 font-bold cursor-pointer bg-white border border-stone-150 p-2.5 rounded-lg">
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={() => toggleSize(key)}
                              className="rounded-full w-4.5 h-4.5 accent-[#f06e38]" 
                            />
                            <span>{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Storage layout if applicable */}
                {activeCategory === 'beds' && (
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Storage designs</span>
                    <div className="space-y-2">
                      {Object.entries(STORAGE_MAP).map(([key, label]) => {
                        const isChecked = selectedStorages.has(key);
                        return (
                          <label key={key} className="flex items-center space-x-2.5 text-xs text-stone-700 font-bold cursor-pointer bg-white border border-stone-150 p-2.5 rounded-lg">
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={() => toggleStorage(key)}
                              className="rounded-full w-4.5 h-4.5 accent-[#f06e38]" 
                            />
                            <span>{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Price Pre-sets */}
                <div className="space-y-2.5">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">Price budget limit</span>
                  <div className="grid grid-cols-2 gap-2">
                    {PRICE_PRESETS.map((p, pIdx) => {
                      const isSelected = selectedPricePreset === pIdx;
                      return (
                        <button
                          key={pIdx}
                          onClick={() => setSelectedPricePreset(isSelected ? null : pIdx)}
                          className={`text-center p-3 text-xs font-bold rounded-lg border cursor-pointer transition-all ${isSelected ? 'bg-amber-50 border-[#f06e38] text-[#f06e38]' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'}`}
                        >
                          {p.labelShort}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Flyout footer actions CTA */}
              <div className="px-6 pt-4 border-t border-stone-150 flex items-center space-x-3 bg-white">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3 text-xs font-bold border border-stone-250 rounded-xl text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-2 py-3 text-center bg-[#f06e38] hover:bg-[#e65100] hover:scale-102 transition-transform font-bold text-xs rounded-xl text-white shadow-md active:scale-95"
                >
                  Apply ({filteredProducts.length} Results)
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
