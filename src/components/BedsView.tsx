import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product, ViewState } from '../types';
import { ALL_PRODUCTS, CATEGORY_MAP } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  SlidersHorizontal,
  ArrowUpDown,
  X,
  ChevronRight,
  Check,
  RotateCcw,
  Sparkles,
  TreePine,
  Layers,
  ArrowRight,
  Search
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
  cartCount?: number;
  wishlistCount?: number;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  products?: Product[];
}

// Fallback high-res imagery for categories
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'beds': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
  'wooden-sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'wooden-chairs': 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80',
  'door-frames': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80',
  'dressing-table': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  'wooden-swings': 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80',
  'wooden-safety-doors': 'https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?w=800&q=80',
  'wooden-mandirs': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
  'teapoys-coffee-tables': 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
  'sofa-cum-beds': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'dining-tables': 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=800&q=80',
  'wardrobes': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
  'tv-units': 'https://images.unsplash.com/photo-16074730318d2-64f26046e8c7?w=800&q=80',
  'chaurang-and-paats': 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=800&q=80',
  'diwans': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'all': 'Explore our complete catalog of handcrafted solid timber furniture, carved from seasoned Sagwan teak and Acacia direct from our Sindhudurg workshops.',
  'beds': 'Kiln-seasoned solid teak storage beds, box beds, and low-profile frames engineered with zero-sag hardwood slats to withstand coastal humidity.',
  'wooden-sofas': 'Ergonomically proportioned living sets hand-carved in solid teak with high-density posture support and durable natural PU finishes.',
  'wooden-mandirs': 'Sacred sanctums hand-carved with traditional Konkan motifs, deep pooja storage drawers, and brass bells in grade-A seasoned Sagwan.',
  'dining-tables': 'Handcrafted solid timber dining tables and sculpted chairs finished with food-grade, water-resistant protective timber coats.',
  'wooden-chairs': 'Rocking chairs, aaram recliners, and study chairs sculpted in seasoned timber for lifetime ergonomic comfort.',
  'door-frames': 'Architectural teak main doors, carved safety portals, and temple door sets crafted from solid matured wood logs.',
  'dressing-table': 'Handcrafted teak dressers with smooth-gliding storage drawers, vanity mirrors, and matching solid wood stools.',
  'wooden-swings': 'Heirloom indoor and verandah swings fitted with heavy-gauge solid brass hanging chains and comfortable cushion bases.',
  'wardrobes': 'Multi-door seasoned hardwood wardrobes with customizable internal hanging rods, locker drawers, and shelving.',
  'teapoys-coffee-tables': 'Hand-turned timber coffee tables, teapoys, and nested accent tables with durable polyurethane stain.',
  'sofa-cum-beds': 'Smooth-action foldout daybeds and convertible couches designed for versatile living spaces.',
  'tv-units': 'Low-profile solid teak entertainment consoles with organized cable routing and concealed media storage.',
  'chaurang-and-paats': 'Auspicious puja pedestals and low seating paats carved from sacred seasoned Sagwan.',
  'diwans': 'Traditional Indian lounge diwans crafted with turned timber legs and spacious underbed storage.'
};

const MATERIAL_OPTIONS = [
  { key: 'solid-wood', label: 'Solid Wood' },
  { key: 'teak', label: 'Seasoned Teak' },
  { key: 'acacia', label: 'Acacia / Aakashi' },
  { key: 'sheesham', label: 'Sheesham & Rosewood' },
  { key: 'mango-wood', label: 'Mango Wood' }
];

const SIZE_OPTIONS = [
  { key: 'king', label: 'King Size' },
  { key: 'queen', label: 'Queen Size' },
  { key: 'single', label: 'Single Bed' },
  { key: 'double', label: 'Double Bed' }
];

const STORAGE_OPTIONS = [
  { key: 'hydraulic', label: 'Hydraulic Storage' },
  { key: 'box', label: 'Box Storage' },
  { key: 'drawer', label: 'Drawer Storage' },
  { key: 'no-storage', label: 'No Storage' }
];

const PRICE_PRESETS = [
  { label: 'Under ₹20,000', shortLabel: '< ₹20k', min: 0, max: 20000 },
  { label: '₹20,000 – ₹40,000', shortLabel: '₹20k–₹40k', min: 20000, max: 40000 },
  { label: '₹40,000 – ₹60,000', shortLabel: '₹40k–₹60k', min: 40000, max: 60000 },
  { label: 'Above ₹60,000', shortLabel: '> ₹60k', min: 60000, max: Infinity }
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
  products = ALL_PRODUCTS
}: BedsViewProps) {
  // Navigation categories
  const categoriesList = useMemo(() => {
    return [
      { id: 'all', title: 'All Furniture', slug: 'all' },
      ...CATEGORY_MAP.map(cat => ({
        id: cat.slug,
        title: cat.name,
        slug: cat.slug
      }))
    ];
  }, []);

  // Selected category & subcategory state
  const [activeCategory, setActiveCategory] = useState<string>(initialCategoryFilter || 'all');
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(initialSubCategoryFilter || null);

  // Sync state if navigation props change
  useEffect(() => {
    if (initialCategoryFilter) {
      setActiveCategory(initialCategoryFilter);
    }
    setActiveSubCategory(initialSubCategoryFilter || null);
  }, [initialCategoryFilter, initialSubCategoryFilter]);

  // Filters state
  const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [selectedStorages, setSelectedStorages] = useState<Set<string>>(new Set());
  const [selectedPricePreset, setSelectedPricePreset] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('default');

  // UI state
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Briefly show skeleton when category shifts
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 180);
    return () => clearTimeout(t);
  }, [activeCategory, activeSubCategory]);

  // Active Category Meta
  const activeCategoryMeta = useMemo(() => {
    if (activeCategory === 'all') {
      return {
        name: 'All Furniture Collections',
        slug: 'all',
        description: CATEGORY_DESCRIPTIONS['all'],
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        subCategories: []
      };
    }
    const cat = CATEGORY_MAP.find(c => c.slug === activeCategory);
    return {
      name: cat ? cat.name : 'Furniture Collection',
      slug: activeCategory,
      description: CATEGORY_DESCRIPTIONS[activeCategory] || cat?.promoTitle || 'Handcrafted solid timber furniture built for generational durability.',
      image: CATEGORY_IMAGE_MAP[activeCategory] || cat?.img || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
      subCategories: cat?.subCategories || []
    };
  }, [activeCategory]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedMaterials.size > 0) count += selectedMaterials.size;
    if (selectedSizes.size > 0) count += selectedSizes.size;
    if (selectedStorages.size > 0) count += selectedStorages.size;
    if (selectedPricePreset !== null) count += 1;
    if (searchQuery.trim()) count += 1;
    return count;
  }, [selectedMaterials, selectedSizes, selectedStorages, selectedPricePreset, searchQuery]);

  // Filter & Sort Calculation
  const filteredProducts = useMemo(() => {
    let result = (products || ALL_PRODUCTS).slice();

    // 1. Category filter
    if (activeCategory && activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Subcategory filter
    if (activeSubCategory) {
      result = result.filter(p => p.subCategory === activeSubCategory);
    }

    // 3. Search query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(p => {
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesShortDesc = p.shortDesc && p.shortDesc.toLowerCase().includes(query);
        const matchesDesc = p.description && p.description.toLowerCase().includes(query);
        const matchesCat = p.category && p.category.toLowerCase().includes(query);
        const matchesSubCat = p.subCategory && p.subCategory.toLowerCase().includes(query);
        return matchesName || matchesShortDesc || matchesDesc || matchesCat || matchesSubCat;
      });
    }

    // 4. Material filter
    if (selectedMaterials.size > 0) {
      result = result.filter(p => {
        if (!p.material) return false;
        return selectedMaterials.has(p.material);
      });
    }

    // 5. Size filter
    if (selectedSizes.size > 0) {
      result = result.filter(p => {
        const sizes = p.sizesList || (p.category === 'beds' ? ["King Size", "Queen Size"] : []);
        return Array.from(selectedSizes).some(sz => {
          if (sz === 'king') return sizes.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('king'));
          if (sz === 'queen') return sizes.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('queen'));
          if (sz === 'single') return sizes.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('single'));
          if (sz === 'double') return sizes.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('double'));
          return false;
        });
      });
    }

    // 6. Storage filter
    if (selectedStorages.size > 0) {
      result = result.filter(p => {
        const storages = p.optionsList || (p.category === 'beds' ? ["Hydraulic Storage", "Non Storage"] : []);
        return Array.from(selectedStorages).some(st => {
          if (st === 'hydraulic') return storages.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('hydraulic'));
          if (st === 'box') return storages.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('box'));
          if (st === 'drawer') return storages.some((s: any) => typeof s === 'string' && s.toLowerCase().includes('drawer'));
          if (st === 'no-storage') return storages.some((s: any) => typeof s === 'string' && (s.toLowerCase().includes('non') || s.toLowerCase().includes('no storage')));
          return false;
        });
      });
    }

    // 7. Price Preset
    if (selectedPricePreset !== null) {
      const preset = PRICE_PRESETS[selectedPricePreset];
      result = result.filter(p => p.price >= preset.min && p.price <= preset.max);
    }

    // 8. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
    } else if (sortBy === 'disc-desc') {
      result.sort((a, b) => {
        const discA = a.orig && a.orig > a.price ? (a.orig - a.price) / a.orig : 0;
        const discB = b.orig && b.orig > b.price ? (b.orig - b.price) / b.orig : 0;
        return discB - discA;
      });
    }

    return result;
  }, [products, activeCategory, activeSubCategory, searchQuery, selectedMaterials, selectedSizes, selectedStorages, selectedPricePreset, sortBy]);

  // Filter actions
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

  const handleSelectCategoryTab = (catSlug: string) => {
    setActiveCategory(catSlug);
    setActiveSubCategory(null);
    clearAllFilters();
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#241810]">
      
      {/* ── 1. BREADCRUMB ── */}
      <nav 
        aria-label="Breadcrumb" 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-xs text-[#756455]"
      >
        <ol className="flex items-center flex-wrap gap-1.5 font-medium">
          <li>
            <button 
              onClick={() => onNavigate('home')}
              className="hover:text-[#241810] transition-colors cursor-pointer"
            >
              Home
            </button>
          </li>
          <li className="text-stone-400">/</li>
          <li>
            <button 
              onClick={() => handleSelectCategoryTab('all')}
              className={`hover:text-[#241810] transition-colors cursor-pointer ${activeCategory === 'all' && !activeSubCategory ? 'font-bold text-[#241810]' : ''}`}
            >
              Furniture Catalog
            </button>
          </li>

          {activeCategory !== 'all' && (
            <>
              <li className="text-stone-400">/</li>
              <li className="font-semibold text-[#241810]">
                <button
                  onClick={() => setActiveSubCategory(null)}
                  className="hover:text-[#C28B38] transition-colors cursor-pointer"
                >
                  {activeCategoryMeta.name}
                </button>
              </li>
            </>
          )}

          {activeSubCategory && (
            <>
              <li className="text-stone-400">/</li>
              <li className="font-bold text-[#C28B38] capitalize">
                {activeSubCategory.replace(/-/g, ' ')}
              </li>
            </>
          )}

          {searchQuery && (
            <li className="inline-flex items-center gap-1 ml-2 bg-[#FAF7F2] border border-[#E7DFD5] px-2 py-0.5 rounded text-[11px] text-[#241810]">
              <Search size={11} className="text-[#C28B38]" />
              <span>"{searchQuery}"</span>
              <button 
                onClick={() => onSearchChange('')}
                className="hover:text-[#B94A30] cursor-pointer ml-1"
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            </li>
          )}
        </ol>
      </nav>


      {/* ── 2. CATEGORY HEADER (Compact & Editorial) ── */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white rounded-2xl border border-[#E7DFD5] p-5 sm:p-7 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left Text Column */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#C28B38] flex items-center gap-1">
                <TreePine size={13} />
                Sindhudurg Solid Woodcraft
              </span>
              <span className="text-stone-300">•</span>
              <span className="bg-[#FAF7F2] border border-[#E7DFD5] text-[#241810] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#241810] tracking-tight">
              {activeSubCategory 
                ? `${activeSubCategory.replace(/-/g, ' ').toUpperCase()}` 
                : activeCategoryMeta.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#756455] mt-2 leading-relaxed font-light">
              {activeCategoryMeta.description}
            </p>
          </div>

          {/* Right Restrained Thumbnail Banner */}
          {activeCategoryMeta.image && (
            <div className="hidden sm:block shrink-0 w-36 h-24 lg:w-44 lg:h-28 rounded-xl overflow-hidden border border-[#E7DFD5] bg-[#FAF7F2] shadow-2xs">
              <img 
                src={activeCategoryMeta.image} 
                alt={activeCategoryMeta.name}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

        </div>
      </header>


      {/* ── 3. CATEGORY & SUBCATEGORY NAVIGATION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        
        {/* Main Category Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategoryTab(cat.slug)}
                className={`min-h-[44px] whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-[#241810] text-white shadow-2xs' 
                    : 'bg-white hover:bg-stone-50 text-[#756455] hover:text-[#241810] border border-[#E7DFD5]'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategory Secondary Tabs (if active category has subcategories) */}
        {activeCategoryMeta.subCategories && activeCategoryMeta.subCategories.length > 0 && (
          <div className="mt-2.5 pt-2.5 border-t border-[#E7DFD5] flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveSubCategory(null)}
              className={`min-h-[36px] whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeSubCategory === null
                  ? 'bg-[#C28B38] text-[#170E08] font-bold shadow-2xs'
                  : 'bg-white text-[#756455] hover:text-[#241810] border border-[#E7DFD5]'
              }`}
            >
              All {activeCategoryMeta.name}
            </button>

            {activeCategoryMeta.subCategories.map((sub: any) => {
              const isSubActive = activeSubCategory === sub.slug;
              return (
                <button
                  key={sub.slug}
                  onClick={() => setActiveSubCategory(sub.slug)}
                  className={`min-h-[36px] whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                    isSubActive
                      ? 'bg-[#241810] text-white font-bold shadow-2xs'
                      : 'bg-white text-[#756455] hover:text-[#241810] border border-[#E7DFD5]'
                  }`}
                >
                  <span>{sub.name}</span>
                  {sub.count > 0 && (
                    <span className="text-[10px] opacity-75 font-mono">({sub.count})</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

      </section>


      {/* ── 4. FILTER + SORT TOOLBAR ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
        <div className="bg-white rounded-xl border border-[#E7DFD5] p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
          
          {/* Left Controls: Filter Button + Quick Presets */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* Filter Drawer Trigger */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-2 ${
                activeFilterCount > 0
                  ? 'bg-[#241810] text-white border-[#241810]'
                  : 'bg-white text-[#241810] border-[#E7DFD5] hover:border-[#C28B38]'
              }`}
              id="category-filter-trigger"
            >
              <SlidersHorizontal size={15} className={activeFilterCount > 0 ? 'text-[#F5C26B]' : 'text-[#C28B38]'} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#C28B38] text-[#170E08] text-[10px] font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Quick Filter Chips */}
            <div className="hidden lg:flex items-center gap-1.5">
              {PRICE_PRESETS.slice(0, 2).map((preset, idx) => {
                const isSelected = selectedPricePreset === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedPricePreset(isSelected ? null : idx)}
                    className={`min-h-[36px] px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-50 text-[#C28B38] border-[#C28B38] font-bold'
                        : 'bg-white text-[#756455] border-[#E7DFD5] hover:border-stone-400'
                    }`}
                  >
                    {preset.shortLabel}
                  </button>
                );
              })}

              <button
                onClick={() => toggleMaterial('teak')}
                className={`min-h-[36px] px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  selectedMaterials.has('teak')
                    ? 'bg-amber-50 text-[#C28B38] border-[#C28B38] font-bold'
                    : 'bg-white text-[#756455] border-[#E7DFD5] hover:border-stone-400'
                }`}
              >
                Seasoned Teak
              </button>
            </div>

            {/* Clear All CTA (if filters active) */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="min-h-[36px] text-xs font-medium text-[#B94A30] hover:text-[#933823] flex items-center gap-1 px-2 py-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Clear all ({activeFilterCount})</span>
              </button>
            )}

          </div>

          {/* Right Controls: Sort Select + Total Match Count */}
          <div className="flex items-center gap-3 ml-auto">
            
            <span className="hidden sm:inline text-xs text-[#756455]">
              Showing <strong className="text-[#241810] font-mono">{filteredProducts.length}</strong> designs
            </span>

            {/* Sort Control */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="min-h-[44px] bg-white border border-[#E7DFD5] hover:border-[#C28B38] text-[#241810] text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isSortDropdownOpen}
              >
                <ArrowUpDown size={14} className="text-[#C28B38]" />
                <span>
                  {sortBy === 'price-asc' && 'Price: Low to High'}
                  {sortBy === 'price-desc' && 'Price: High to Low'}
                  {sortBy === 'newest' && 'Newest Arrivals'}
                  {sortBy === 'disc-desc' && 'Biggest Discount'}
                  {sortBy === 'default' && 'Sort: Recommended'}
                </span>
              </button>

              {/* Sort Dropdown Menu */}
              <AnimatePresence>
                {isSortDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsSortDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-[#E7DFD5] rounded-xl shadow-lg p-1 z-50 select-none"
                    >
                      {[
                        { val: 'default', label: 'Recommended' },
                        { val: 'price-asc', label: 'Price: Low to High' },
                        { val: 'price-desc', label: 'Price: High to Low' },
                        { val: 'newest', label: 'Newest Arrivals' },
                        { val: 'disc-desc', label: 'Biggest Discount' }
                      ].map(opt => (
                        <button
                          key={opt.val}
                          onClick={() => {
                            setSortBy(opt.val);
                            setIsSortDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                            sortBy === opt.val
                              ? 'bg-[#FAF7F2] text-[#C28B38] font-bold'
                              : 'text-[#241810] hover:bg-stone-50'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.val && <Check size={14} className="text-[#C28B38]" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>


      {/* ── 5. PRODUCT GRID & 6. EMPTY / LOADING STATES ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        
        {/* Loading Skeleton State */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E7DFD5] p-4 shadow-2xs animate-pulse flex flex-col justify-between h-[340px]">
                <div>
                  <div className="aspect-[4/3] bg-stone-100 rounded-lg mb-3" />
                  <div className="h-3 bg-stone-200 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-stone-200 rounded w-4/5 mb-1" />
                  <div className="h-4 bg-stone-200 rounded w-3/5" />
                </div>
                <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
                  <div className="h-5 bg-stone-200 rounded w-20" />
                  <div className="h-4 bg-stone-100 rounded w-10" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          
          /* 6. Empty State */
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-10 sm:p-16 text-center max-w-xl mx-auto shadow-2xs my-10">
            <div className="w-14 h-14 bg-[#FAF7F2] border border-[#E7DFD5] rounded-full flex items-center justify-center mx-auto text-[#C28B38] mb-4">
              <TreePine size={26} />
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#241810]">
              No Furniture Designs Found
            </h3>

            <p className="text-xs sm:text-sm text-[#756455] mt-1.5 leading-relaxed font-light">
              We couldn't find any designs in <strong className="text-[#241810] font-medium">{activeCategoryMeta.name}</strong> matching your specific filter criteria.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={clearAllFilters}
                className="min-h-[44px] bg-[#241810] hover:bg-[#3D2B1F] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>

              <button
                onClick={() => handleSelectCategoryTab('all')}
                className="min-h-[44px] bg-[#FAF7F2] hover:bg-stone-100 text-[#241810] font-bold text-xs px-5 py-2.5 rounded-lg border border-[#E7DFD5] transition-colors cursor-pointer"
              >
                Explore All Furniture
              </button>
            </div>

            {/* Useful Category Navigation Shortcuts */}
            <div className="mt-8 pt-6 border-t border-[#F2ECE4]">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-3">
                Or browse popular collections:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {['beds', 'wooden-sofas', 'wooden-mandirs', 'dining-tables'].map(slug => {
                  const cat = CATEGORY_MAP.find(c => c.slug === slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => handleSelectCategoryTab(slug)}
                      className="text-xs bg-[#FAF7F2] hover:bg-[#C28B38]/15 text-[#241810] border border-[#E7DFD5] px-3 py-1.5 rounded-md transition-colors cursor-pointer"
                    >
                      {cat?.name || slug}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        ) : (

          /* 5. Product Grid (4 columns desktop, 3 tablet, 2 mobile) */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product, idx) => {
              const isWishlisted = wishlist.includes(product.id);
              const hasRealDiscount = product.orig && product.orig > product.price;
              const discountPct = hasRealDiscount 
                ? Math.round(((product.orig! - product.price) / product.orig!) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product.id)}
                  className="group bg-white rounded-xl border border-[#E7DFD5] hover:border-[#C28B38] shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    
                    {/* Fixed Aspect Image Frame */}
                    <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden">
                      <img 
                        src={product.img} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to verified category image if broken
                          const target = e.currentTarget;
                          const fallback = CATEGORY_IMAGE_MAP[product.category] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80';
                          if (target.src !== fallback) {
                            target.src = fallback;
                          }
                        }}
                      />

                      {/* Real Discount Badge Only */}
                      {hasRealDiscount && discountPct > 0 && (
                        <span className="absolute top-2.5 left-2.5 bg-[#B94A30] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs">
                          {discountPct}% OFF
                        </span>
                      )}

                      {/* Wishlist Button (Min 44px touch target) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                        className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-stone-600 flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer z-10"
                        title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                        aria-label="Save to wishlist"
                      >
                        <Heart 
                          size={16} 
                          className={isWishlisted ? 'fill-[#B94A30] stroke-[#B94A30] text-[#B94A30]' : 'text-stone-500'} 
                        />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-3.5 sm:p-4">
                      <span className="text-[10px] font-bold text-[#C28B38] uppercase tracking-wider block mb-1">
                        {product.category.replace(/-/g, ' ')}
                      </span>
                      
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-[#241810] group-hover:text-[#C28B38] transition-colors line-clamp-2 min-h-[34px] leading-snug">
                        {product.name}
                      </h3>
                    </div>

                  </div>

                  {/* Card Price & Action Strip */}
                  <div className="p-3.5 sm:p-4 pt-0">
                    <div className="pt-2.5 border-t border-[#F2ECE4] flex items-center justify-between">
                      <div>
                        <div className="text-[9px] uppercase font-bold text-[#756455]">Workshop Price</div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm sm:text-base font-bold text-[#241810] font-mono">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {hasRealDiscount && (
                            <span className="text-[11px] text-[#756455] line-through font-mono">
                              ₹{product.orig!.toLocaleString('en-IN')}
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

        )}

      </main>


      {/* ── FILTERS DRAWER (Mobile Bottom Sheet / Desktop Panel) ── */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-[150] flex justify-end">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-2xs"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="bg-white w-full max-w-sm sm:max-w-md h-full relative shadow-2xl z-10 flex flex-col justify-between select-none"
            >
              
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-[#E7DFD5] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#241810] flex items-center gap-2">
                    <SlidersHorizontal size={17} className="text-[#C28B38]" />
                    <span>Filter Products</span>
                  </h3>
                  <span className="text-[11px] text-[#756455] font-medium block mt-0.5">
                    {filteredProducts.length} matching designs
                  </span>
                </div>

                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-stone-700 rounded-full transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Filters Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                
                {/* 1. Price Budget Range */}
                <div>
                  <span className="text-xs font-bold text-[#241810] uppercase tracking-wider block mb-2.5">
                    Price Budget
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {PRICE_PRESETS.map((preset, idx) => {
                      const isSelected = selectedPricePreset === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedPricePreset(isSelected ? null : idx)}
                          className={`min-h-[44px] p-2.5 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-amber-50 text-[#C28B38] border-[#C28B38] font-bold shadow-2xs'
                              : 'bg-white text-[#756455] border-[#E7DFD5] hover:border-stone-400'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Timber Material */}
                <div>
                  <span className="text-xs font-bold text-[#241810] uppercase tracking-wider block mb-2.5">
                    Timber & Material
                  </span>
                  <div className="space-y-2">
                    {MATERIAL_OPTIONS.map(mat => {
                      const isChecked = selectedMaterials.has(mat.key);
                      return (
                        <label
                          key={mat.key}
                          className="flex items-center space-x-3 text-xs text-[#241810] font-medium cursor-pointer p-2.5 rounded-lg border border-[#E7DFD5] hover:bg-[#FAF7F2] transition-colors"
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleMaterial(mat.key)}
                            className="w-4 h-4 rounded text-[#C28B38] accent-[#C28B38] cursor-pointer"
                          />
                          <span>{mat.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Sizing (if applicable) */}
                {(activeCategory === 'beds' || activeCategory === 'all') && (
                  <div>
                    <span className="text-xs font-bold text-[#241810] uppercase tracking-wider block mb-2.5">
                      Bed Dimensions
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {SIZE_OPTIONS.map(sz => {
                        const isChecked = selectedSizes.has(sz.key);
                        return (
                          <button
                            key={sz.key}
                            onClick={() => toggleSize(sz.key)}
                            className={`min-h-[44px] p-2.5 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                              isChecked
                                ? 'bg-amber-50 text-[#C28B38] border-[#C28B38] font-bold shadow-2xs'
                                : 'bg-white text-[#756455] border-[#E7DFD5] hover:border-stone-400'
                            }`}
                          >
                            {sz.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. Storage Designs (if applicable) */}
                {(activeCategory === 'beds' || activeCategory === 'all') && (
                  <div>
                    <span className="text-xs font-bold text-[#241810] uppercase tracking-wider block mb-2.5">
                      Storage Mechanism
                    </span>
                    <div className="space-y-2">
                      {STORAGE_OPTIONS.map(st => {
                        const isChecked = selectedStorages.has(st.key);
                        return (
                          <label
                            key={st.key}
                            className="flex items-center space-x-3 text-xs text-[#241810] font-medium cursor-pointer p-2.5 rounded-lg border border-[#E7DFD5] hover:bg-[#FAF7F2] transition-colors"
                          >
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleStorage(st.key)}
                              className="w-4 h-4 rounded text-[#C28B38] accent-[#C28B38] cursor-pointer"
                            />
                            <span>{st.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 sm:p-6 border-t border-[#E7DFD5] flex items-center gap-3 bg-[#FAF7F2]">
                <button
                  onClick={clearAllFilters}
                  className="min-h-[44px] flex-1 py-2.5 text-xs font-bold border border-[#E7DFD5] hover:bg-white text-[#756455] rounded-xl transition-colors cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="min-h-[44px] flex-2 py-2.5 bg-[#C28B38] hover:bg-[#A97428] text-[#170E08] font-bold text-xs rounded-xl shadow-sm transition-transform active:scale-98 cursor-pointer text-center"
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
