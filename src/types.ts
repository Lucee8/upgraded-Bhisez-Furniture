export interface Product {
  id: number | string;
  name: string;
  category: string;
  subCategory?: string;
  size?: 'king' | 'queen' | 'single' | 'double' | string;
  material?: 'solid-wood' | 'engineered-wood' | 'teak' | 'mango-wood' | 'sheesham' | string;
  storage?: 'hydraulic' | 'box' | 'drawer' | 'no-storage' | string;
  price: number; // 0 means Custom Quote
  orig?: number;
  img: string;
  badge?: 'bs' | 'new' | 'cus' | null;
  colors?: string[];
  description?: string;
  shortDesc?: string;

  // 🎨 Customized layout overrides matching screenshot requirements
  seriesName?: string;       // e.g. "SEASONED HARDWOOD SERIES"
  brandName?: string;        // e.g. "Bhisez Furniture Showroom"
  sizingLabel?: string;      // e.g. "Dimensions / Bed Sizing" or "Dimensions / Sofa Sizing"
  sizesList?: string[];      // e.g. ["King Size", "Queen Size"]
  finishesLabel?: string;    // e.g. "Hardwood Finish / Seal"
  finishesList?: { name: string; color: string }[];
  optionsLabel?: string;     // e.g. "Underbed storage options"
  optionsList?: string[];     // e.g. ["Hydraulic Storage", "Non Storage"]
  woodTypePrices?: {
    Aakashi?: number;
    Shivan?: number;
    Sagwan?: number;
  };
  availableSize?: string;     // e.g. "78x36"
  dimensions?: string;        // e.g. "78L x 72W x 40H inches"
  finish?: string;            // e.g. "Polyurethane Glossy Polish"
  stockStatus?: 'In Stock' | 'Out of Stock' | 'Made on Order' | string;
  images?: string[];          // Multiple gallery images
  featured?: boolean;         // Featured toggle
  priceRules?: {
    sizeAdjustments?: Record<string, number>;        // adjustments for the selected size
    origSizeAdjustments?: Record<string, number>;    // adjustments for the original (un-discounted) price
    optionAdjustments?: Record<string, number>;      // adjustments for selection options (e.g. Non Storage)
    origOptionAdjustments?: Record<string, number>;  // adjustments for selection options (e.g. Non Storage)
  };
  deliverySubtext?: string;  // e.g. "Includes free local white-glove installation & GST invoice."
}

export type ViewState = 
  | 'home'
  | 'beds'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'payments'
  | 'wishlist'
  | 'showroom'
  | 'about'
  | 'contact'
  | 'login'
  | 'admin';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  finish: string;
  storage: string;
}

export interface ShowroomWalkthrough {
  name: string;
  phone: string;
  location: string;
  date: string;
  category: string;
  notes: string;
}
