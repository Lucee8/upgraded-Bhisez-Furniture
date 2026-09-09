import { useState } from 'react';
import { Product, ViewState } from '../types';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  Settings,
  ChevronDown
} from 'lucide-react';

interface ProductDetailViewProps {
  onNavigate: (view: ViewState) => void;
  product: Product;
  onAddToCart: (product: Product, quantity: number, size: string, finish: string, storage: string) => void;
  onToggleWishlist: (id: string | number) => void;
  wishlist: (string | number)[];
}

const FINISHES = [
  { name: 'Amber Walnut', color: '#c9a87c' },
  { name: 'Danish Walnut', color: '#5a3e28' },
  { name: 'Teak Brown', color: '#7a5230' }
];

export default function ProductDetailView({
  onNavigate,
  product,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: ProductDetailViewProps) {
  // Determine dynamic options & labels based on product configurations
  const seriesName = product.seriesName || "seasoned hardwood series";
  const brandName = product.brandName || "Bhisez Furniture Showroom";

  const isBedProduct = (product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')) && product.category !== 'sofa-cum-beds';

  const sizingLabel = isBedProduct
    ? "Dimensions / Bed Sizing"
    : (product.sizingLabel || (
        product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds'
          ? "Seating Capacity / Lounge Sizing"
          : product.category === 'wooden-chairs'
          ? "Seating Height Options"
          : product.category === 'wooden-mandirs'
          ? "Temple Height / Width Sizing"
          : "Dimensions / Bed Sizing"
      ));

  const sizesList = isBedProduct
    ? ["King Size", "Queen Size"]
    : (product.sizesList || (
        product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds'
          ? ["3 Seater", "2 Seater", "1 Seater"]
          : product.category === 'wooden-chairs'
          ? ["Standard Height", "Counter Height"]
          : product.category === 'wooden-mandirs'
          ? ["Standard Width (24\")", "Wide Width (36\")"]
          : ["King Size", "Queen Size"]
      ));

  const finishesLabel = product.finishesLabel || "Hardwood Finish / Seal";
  const finishesList = product.finishesList || FINISHES;

  const optionsLabel = product.optionsLabel || (
    product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')
      ? "Underbed storage options"
      : product.category === 'wooden-mandirs'
      ? "Drawer & Tray Configuration"
      : product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds'
      ? "Cushion Padding Mode"
      : ""
  );

  const optionsList = product.optionsList || (
    product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')
      ? ["Hydraulic Storage", "Non Storage"]
      : product.category === 'wooden-mandirs'
      ? ["Pooja Drawers Included", "Standard Platform Only"]
      : product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds'
      ? ["Ultra-density Foam", "Standard Tufted Classic"]
      : []
  );

  const deliverySubtext = product.deliverySubtext || "Includes free local white-glove installation & GST invoice.";

  const availableWoodTypes = product.woodTypePrices && Object.keys(product.woodTypePrices).length > 0
    ? (Object.keys(product.woodTypePrices) as ('Aakashi' | 'Shivan' | 'Sagwan')[])
    : (['Aakashi', 'Shivan', 'Sagwan'] as ('Aakashi' | 'Shivan' | 'Sagwan')[]);

  // Config state
  const [selectedSize, setSelectedSize] = useState<string>(() => {
    return sizesList.length > 0 ? sizesList[0] : 'King Size';
  });
  const [selectedFinish, setSelectedFinish] = useState<string>(() => {
    return finishesList.length > 0 ? finishesList[0].name : 'Amber Walnut';
  });
  const [selectedWoodType, setSelectedWoodType] = useState<string>(() => {
    return availableWoodTypes.includes('Sagwan') ? 'Sagwan' : (availableWoodTypes.length > 0 ? availableWoodTypes[0] : 'Sagwan');
  });
  const [selectedStorage, setSelectedStorage] = useState<string>(() => {
    return optionsList.length > 0 ? optionsList[0] : '';
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(false);
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('desc');

  // Sync state if product changes (Very important to keep selected options updated when switching products)
  const [prevProductId, setPrevProductId] = useState<any>(product.id);
  if (product.id !== prevProductId) {
    setPrevProductId(product.id);
    const isNewProductABed = (product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')) && product.category !== 'sofa-cum-beds';
    const newSizes = isNewProductABed
      ? ["King Size", "Queen Size"]
      : (product.sizesList || (
          product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds'
            ? ["3 Seater", "2 Seater", "1 Seater"]
            : product.category === 'wooden-chairs'
            ? ["Standard Height", "Counter Height"]
            : product.category === 'wooden-mandirs'
            ? ["Standard Width (24\")", "Wide Width (36\")"]
            : ["King Size", "Queen Size"]
        ));
    const newFinishes = product.finishesList || FINISHES;
    const newOptions = product.optionsList || (
      product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')
        ? ["Hydraulic Storage", "Non Storage"]
        : product.category === 'wooden-mandirs'
        ? ["Pooja Drawers Included", "Standard Platform Only"]
        : product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds'
        ? ["Ultra-density Foam", "Standard Tufted Classic"]
        : []
    );
    setSelectedSize(newSizes.length > 0 ? newSizes[0] : 'King Size');
    setSelectedFinish(newFinishes.length > 0 ? newFinishes[0].name : 'Amber Walnut');
    setSelectedStorage(newOptions.length > 0 ? newOptions[0] : '');
    
    const newWoodTypes = product.woodTypePrices && Object.keys(product.woodTypePrices).length > 0
      ? (Object.keys(product.woodTypePrices) as ('Aakashi' | 'Shivan' | 'Sagwan')[])
      : (['Aakashi', 'Shivan', 'Sagwan'] as ('Aakashi' | 'Shivan' | 'Sagwan')[]);
    setSelectedWoodType(newWoodTypes.includes('Sagwan') ? 'Sagwan' : (newWoodTypes.length > 0 ? newWoodTypes[0] : 'Sagwan'));

    setDeliveryDate('');
    setPincodeChecked(false);
    setPincode('');
  }

  // Main Image state
  const [mainImageUrl, setMainImageUrl] = useState<string>(product.img);
  
  // Sync image if product itself changes
  const [prevImgUrl, setPrevImgUrl] = useState<string>(product.img);
  if (product.img !== prevImgUrl) {
    setPrevImgUrl(product.img);
    setMainImageUrl(product.img);
  }

  const isWished = wishlist.includes(product.id);

  // Live price adjustment
  const computedPrice = (() => {
    let base = product.woodTypePrices && product.woodTypePrices[selectedWoodType as keyof typeof product.woodTypePrices]
      ? product.woodTypePrices[selectedWoodType as keyof typeof product.woodTypePrices]!
      : product.price;

    if (product.priceRules?.sizeAdjustments) {
      if (typeof product.priceRules.sizeAdjustments[selectedSize] !== 'undefined') {
        base += product.priceRules.sizeAdjustments[selectedSize];
      }
    } else {
      // Default beds live adjustments fallback
      if (product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')) {
        if (selectedSize === 'Queen Size') base -= 5000;
      } else if (product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds') {
        if (selectedSize === '2 Seater') base -= 4000;
        else if (selectedSize === '1 Seater') base -= 8000;
      }
    }

    if (product.priceRules?.optionAdjustments) {
      if (typeof product.priceRules.optionAdjustments[selectedStorage] !== 'undefined') {
        base += product.priceRules.optionAdjustments[selectedStorage];
      }
    } else {
      // Default beds live adjustments fallback
      if (product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')) {
        if (selectedStorage === 'Non Storage') base -= 10000;
      }
    }

    return base > 0 ? base : 0;
  })();

  const computedOrigPrice = (() => {
    let base = product.woodTypePrices && product.woodTypePrices[selectedWoodType as keyof typeof product.woodTypePrices]
      ? Math.round((product.woodTypePrices[selectedWoodType as keyof typeof product.woodTypePrices]! * 1.35) / 100) * 100
      : (product.orig || product.price);

    if (product.priceRules?.origSizeAdjustments) {
      if (typeof product.priceRules.origSizeAdjustments[selectedSize] !== 'undefined') {
        base += product.priceRules.origSizeAdjustments[selectedSize];
      }
    } else {
      // Default beds live adjustments fallback
      if (product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')) {
        if (selectedSize === 'Queen Size') base -= 8000;
      } else if (product.category === 'wooden-sofas' || product.category === 'sofa-cum-beds') {
        if (selectedSize === '2 Seater') base -= 6000;
        else if (selectedSize === '1 Seater') base -= 11000;
      }
    }

    if (product.priceRules?.origOptionAdjustments) {
      if (typeof product.priceRules.origOptionAdjustments[selectedStorage] !== 'undefined') {
        base += product.priceRules.origOptionAdjustments[selectedStorage];
      }
    } else {
      // Default beds live adjustments fallback
      if (product.category === 'beds' || product.subCategory?.includes('bed') || product.id?.toString().startsWith('beds-')) {
        if (selectedStorage === 'Non Storage') base -= 14000;
      }
    }

    return base > 0 ? base : 0;
  })();

  const computedDiscount = computedOrigPrice > 0 ? Math.round((1 - computedPrice / computedOrigPrice) * 100) : 0;

  const handlePincodeCheck = () => {
    if (pincode.length < 6) {
      alert('Please enter a valid 6-digit Pincode.');
      return;
    }
    const d = new Date();
    d.setDate(d.getDate() + 7);
    const dateStr = d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    setDeliveryDate(dateStr);
    setPincodeChecked(true);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize, selectedWoodType, selectedStorage);
    // After adding, go to cart
    onNavigate('cart');
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Slat */}
        <div className="flex items-center space-x-2 text-xs text-stone-500 font-medium mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-amber-800 bg-transparent border-none cursor-pointer">Home</button>
          <span>›</span>
          <button onClick={() => onNavigate('beds')} className="hover:text-amber-800 bg-transparent border-none cursor-pointer">Beds</button>
          <span>›</span>
          <span className="text-[#3D2B1F] line-clamp-1">{product.name}</span>
        </div>

        {/* MAIN PRODUCT SHEETS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: GALLERY SHEET */}
          <div className="space-y-4">
            
            {/* Main Stage Frame */}
            <div className="relative aspect-1.1/1 rounded-2xl overflow-hidden border border-[#E0D8CF] bg-white">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              <div className="absolute top-4 right-4 flex flex-col space-y-2.5 z-20">
                <button 
                  onClick={() => onToggleWishlist(product.id)}
                  className="p-2.5 bg-white/95 hover:bg-white rounded-full shadow-md text-stone-500 transition-transform hover:scale-115"
                >
                  <Heart size={16} className={isWished ? 'fill-red-500 stroke-red-500' : 'text-stone-600'} />
                </button>
                <button 
                  onClick={shareProduct}
                  className="p-2.5 bg-white/95 hover:bg-white rounded-full shadow-md text-stone-600 transition-transform hover:scale-115"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 text-[10px] font-bold text-white bg-black/40 px-3 py-1 rounded-sm uppercase tracking-widest pointer-events-none">
                📍 Tested Carpenter seasoned
              </div>
            </div>

          </div>

          {/* RIGHT: INFO/CONFIGURATION SECTION */}
          <div className="space-y-6">
            
            <div>
              <span className="text-xs font-black tracking-widest text-[#8B6F5C] uppercase">{seriesName}</span>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-amber-950 mt-1 leading-tight">{product.name}</h1>
              <p className="text-xs text-[#8B6F5C] mt-2">By <button onClick={() => onNavigate('about')} className="underline hover:text-amber-900 bg-transparent border-none p-0">{brandName}</button></p>
              
              {product.availableSize && !isBedProduct && (
                <div className="mt-3.5 inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-900 shadow-3xs">
                  <span>📐</span>
                  <span>Available Size/Dimensions: <strong>{product.availableSize}</strong></span>
                </div>
              )}
            </div>

            <hr className="border-[#E0D8CF]" />

            {/* Sizing switch triggers */}
            {sizesList.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">{sizingLabel}</span>
                <div className="flex flex-wrap gap-2.5">
                  {sizesList.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSelectedSize(opt)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${selectedSize === opt ? 'bg-[#3D2B1F] border-[#3D2B1F] text-amber-50' : 'bg-transparent border-[#E0D8CF] text-[#3D2B1F] hover:border-[#3D2B1F]'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Wood Type Selection */}
            {availableWoodTypes.length > 0 && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Wood Type selection</span>
                <div className="flex flex-wrap gap-2.5">
                  {availableWoodTypes.map(wood => {
                    const colors = { Sagwan: '#8F4A14', Shivan: '#C9A36C', Aakashi: '#A37233' };
                    const detailColor = colors[wood as keyof typeof colors] || '#C9A36C';
                    const price = product.woodTypePrices?.[wood as keyof typeof product.woodTypePrices];
                    return (
                      <button
                        key={wood}
                        onClick={() => setSelectedWoodType(wood)}
                        className={`flex flex-col items-start p-3 border rounded-xl transition-all min-w-[120px] cursor-pointer text-left ${selectedWoodType === wood ? 'bg-[#3D2B1F] border-[#2C1C11] text-amber-50 shadow-xs ring-1 ring-[#3D2B1F]' : 'bg-white border-[#E0D8CF] text-[#3D2B1F] hover:border-[#3D2B1F]'}`}
                        id={`wood-type-${wood}`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: detailColor }} />
                          <span className="font-extrabold text-xs tracking-wider">{wood}</span>
                        </div>
                        <span className={`text-[10px] font-bold ${selectedWoodType === wood ? 'text-amber-200' : 'text-stone-500'}`}>
                          {price ? `₹${price.toLocaleString('en-IN')}` : 'Contact Quote'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Storage configuration */}
            {optionsList.length > 0 && optionsLabel && (
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">{optionsLabel}</span>
                <div className="flex flex-wrap gap-2.5">
                  {optionsList.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSelectedStorage(opt)}
                      className={`px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${selectedStorage === opt ? 'bg-[#3D2B1F] border-[#3D2B1F] text-amber-50' : 'bg-transparent border-[#E0D8CF] text-[#3D2B1F] hover:border-[#3D2B1F]'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="border-[#E0D8CF]" />

            {/* LIVE PRICE PANEL */}
            {computedPrice > 0 ? (
              <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Season sale direct rate</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-amber-950">₹{computedPrice.toLocaleString('en-IN')}</span>
                  {computedOrigPrice > 0 && (
                    <>
                      <span className="text-xs text-stone-400 line-through">₹{computedOrigPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-emerald-600 font-bold">({computedDiscount}% OFF)</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-stone-500">{deliverySubtext}</p>
              </div>
            ) : (
              <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl flex flex-col items-start space-y-1">
                <span className="text-xs font-bold text-amber-800">🛠️ Price Upon Custom Quote</span>
                <p className="text-[11px] text-stone-500">Contact Bhisez directly to provide custom dimensional sketches or wood finishes.</p>
              </div>
            )}

            {/* Quantity Counter */}
            <div className="flex items-center space-x-4">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Quantity</span>
              <div className="inline-flex items-center border border-[#E0D8CF] rounded-xl bg-white overflow-hidden">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 hover:bg-stone-100 font-bold text-stone-700 bg-transparent cursor-pointer"
                >
                  −
                </button>
                <span className="px-4 py-1.5 font-bold text-stone-800 text-xs">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                  className="px-3 py-1.5 hover:bg-stone-100 font-bold text-stone-700 bg-transparent cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pin check Slat */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Check Delivery Pincode</span>
              <div className="flex max-w-xs overflow-hidden rounded-xl border border-[#E0D8CF] bg-white">
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-4 py-2 bg-transparent text-xs text-[#3D2B1F] outline-none"
                  id="pincode-entry-input"
                />
                <button 
                  onClick={handlePincodeCheck}
                  className="bg-[#3D2B1F] hover:bg-[#120a04] px-4 text-xs font-bold text-amber-50 cursor-pointer"
                  id="pincode-check-btn"
                >
                  Check
                </button>
              </div>

              {pincodeChecked && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center space-x-2 text-xs text-emerald-800 max-w-sm">
                  <span className="text-base text-emerald-600">✓</span>
                  <span><strong>Accessible!</strong> Delivered assembled by <strong>{deliveryDate}</strong>.</span>
                </div>
              )}
            </div>

            {/* Quick trust metrics row */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-3 bg-white border border-[#E0D8CF] rounded-xl text-center space-y-1">
                <span className="text-lg">🛡️</span>
                <h5 className="text-[10px] font-black text-amber-950 uppercase tracking-wide">3 Year Warranty</h5>
              </div>
              <div className="p-3 bg-white border border-[#E0D8CF] rounded-xl text-center space-y-1">
                <span className="text-lg">🚚</span>
                <h5 className="text-[10px] font-black text-amber-950 uppercase tracking-wide">Complimentary</h5>
              </div>
              <div className="p-3 bg-white border border-[#E0D8CF] rounded-xl text-center space-y-1">
                <span className="text-lg">🪚</span>
                <h5 className="text-[10px] font-black text-amber-950 uppercase tracking-wide">seasoned teak</h5>
              </div>
            </div>

            {/* ACTION DIRECT CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              {product.price > 0 ? (
                <button
                  onClick={handleAddToCartClick}
                  className="w-full bg-[#C9983A] hover:bg-[#E8B84B] text-amber-950 font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  id="add-to-cart-cta-btn"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-stone-300 text-stone-500 font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  Custom Quote Only
                </button>
              )}

              <a 
                href={`https://wa.me/917057441122?text=${encodeURIComponent(`Hi Bhisez! I want to order/enquire details.\nProduct: ${product.name}${product.availableSize ? `\nAvailable Size: ${product.availableSize}` : (sizesList.length > 0 ? `\n${sizingLabel}: ${selectedSize}` : '')}\nWood Type: ${selectedWoodType}${optionsList.length > 0 && optionsLabel ? `\n${optionsLabel}: ${selectedStorage}` : ''}\nQty: ${quantity}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center gap-2 shadow-xs text-center"
              >
                <MessageCircle size={16} /> Order on WhatsApp
              </a>

            </div>

          </div>

        </div>

        {/* BOTTOM ACCORDIONS DETAIL INFORMATION */}
        <div className="mt-16 bg-white border border-[#E0D8CF] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="flex border-b border-[#E0D8CF] space-x-6 overflow-x-auto">
            {[
              { id: 'desc', label: 'Description' },
              { id: 'spec', label: `Specifications (${selectedWoodType})` },
              { id: 'care', label: 'Woodwork Care' },
              { id: 'returns', label: 'Assembly & Returns' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap bg-transparent border-none cursor-pointer focus:outline-none ${activeTab === tab.id ? 'border-b-2 border-amber-800 text-[#3D2B1F]' : 'text-stone-400 hover:text-stone-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-stone-600 leading-relaxed space-y-4">
            
            {activeTab === 'desc' && (
              <div className="space-y-4">
                {product.description ? (
                  product.description.trim().startsWith('<') || product.description.includes('</') ? (
                    <div dangerouslySetInnerHTML={{ __html: product.description }} className="rich-description text-stone-600 text-xs sm:text-sm leading-relaxed" />
                  ) : (
                    <p className="whitespace-pre-line">{product.description}</p>
                  )
                ) : (
                  <>
                    <p>Designed and seasoned meticulously within our regional workshops in Malvan, Sindhudurg. This custom product has been the absolute masterpiece of Bhisez traditional structural cabinetry range.</p>
                    <p>Constructed completely using seasoned grade solid hardwood boards. Each frame segment undergo double-jointed lockouts preventing alignment failures under extreme humidity levels, accompanied by eco-friendly polyurethane hand lacquer finish.</p>
                  </>
                )}
              </div>
            )}

            {activeTab === 'spec' && (
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800 w-1/3">Seasoned Timber</td>
                    <td className="py-2.5">Solid {selectedWoodType} Hardwood (Grade A seasoned, borer-proof)</td>
                  </tr>
                  {isBedProduct && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2.5 font-bold text-stone-800">Available Dimensions</td>
                      <td className="py-2.5 text-stone-900 font-bold">King Size: 72x78 inches | Queen Size: 60x78 inches</td>
                    </tr>
                  )}
                  {product.availableSize && !isBedProduct && (
                    <tr className="border-b border-stone-100">
                      <td className="py-2.5 font-bold text-stone-800">Available Dimensions</td>
                      <td className="py-2.5 text-stone-900 font-bold">{product.availableSize}</td>
                    </tr>
                  )}
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Support Base Frame</td>
                    <td className="py-2.5">Engineered teak core board panels</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Hardware & Pistons</td>
                    <td className="py-2.5">Double gas pressure hydraulics (tested 10k cycles)</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Clear Clearance Height</td>
                    <td className="py-2.5">40 cm ground floor elevation</td>
                  </tr>
                  <tr className="border-b border-stone-100">
                    <td className="py-2.5 font-bold text-stone-800">Total Structural Weight</td>
                    <td className="py-2.5">~85 kilograms net deadweight</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === 'care' && (
              <ul className="space-y-2 list-disc pl-5">
                <li>Gently wipe with modular lint-free dry cloths every week.</li>
                <li>Avoid exposing seasoned teak elements to direct monsoon wall seepages or active heating pipelines.</li>
                <li>Gently treat with natural Teakwood restoration oils once every twelve months to preserve amber walnut gloss coatings.</li>
                <li>Utilize soft caster base pads under bed storage units if sliding across highly polished mosaic tiles.</li>
              </ul>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-3">
                <p><strong>White-Glove assembly:</strong> Our local delivery partners unpack and install the heavy hydraulic components completely free in your master bedroom. There is no additional installation fee.</p>
                <p><strong>24-Hour Settle limits:</strong> Any cancellations or customized layout adjustments must be filed within 24 hours of placing the order before logs enter the carpentry cuts stages.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
