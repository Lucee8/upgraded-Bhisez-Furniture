import { Product } from './types';

/**
 * 📝 PRODUCT_OVERRIDES Dictionary
 * 
 * This is the easiest way to customize ANY specific product individually!
 * You can edit the image, title, price, original (discounted) price, wood material,
 * badges, or description for any specific item by its product ID.
 * 
 * 💡 HOW TO FIND A PRODUCT'S ID:
 * The format is always: "[category-slug]-[subcategory-slug]-[number]"
 * Examples:
 * - "beds-premium-bed-1" (First Premium Bed)
 * - "beds-premium-bed-2" (Second Premium Bed)
 * - "beds-open-bed-3" (Third Open Bed)
 * - "wooden-sofas-sofa-4" (Fourth Wooden Sofa)
 * - "wooden-chairs-chair-2" (Second Wooden Chair)
 * - "wooden-mandirs-mandir-1" (First Temple Polish Mandir)
 * 
 * Simply add or edit a key in this dictionary to customize that product:
 */
export const PRODUCT_OVERRIDES: Record<string, Partial<Product>> = {
  // ── 🛏️ PREMIUM BEDS ──
  "beds-premium-bed-1": {
    name: "BED - premium bed #01",
    material: "Solid Teak Wood",
    badge: "bs",  // 'bs' = Bestseller, 'new' = New Arrival, 'cus' = Custom, null = No badge
    img: "/images/BED/premium bed 01.webP", // Set your local image path here
    seriesName: "seasoned hardwood series",  // ⭐️ "seasoned hardwood series" as requested
    brandName: "Bhisez Furniture Showroom",  // ⭐️ "By Bhisez Furniture Showroom" as requested
    sizingLabel: "Dimensions / Bed Sizing",   // ⭐️ "Dimensions / Bed Sizing" as requested
    sizesList: ["King Size", "Queen Size"],  // ⭐️ "King Size", "Queen Size" as requested
    finishesLabel: "Hardwood Finish / Seal",  // ⭐️ "Hardwood Finish / Seal" as requested
    finishesList: [                           // ⭐️ finishes as requested
      { name: 'Amber Walnut', color: '#c9a87c' },
      { name: 'Danish Walnut', color: '#5a3e28' },
      { name: 'Teak Brown', color: '#7a5230' }
    ],
    optionsLabel: "Underbed storage options",  // ⭐️ "Underbed storage options" as requested
    optionsList: ["Hydraulic Storage", "Non Storage"], // ⭐️ "Hydraulic Storage", "Non Storage" as requested
    priceRules: {
      // Offset values relative to the base price of King Size + Hydraulic Storage
      sizeAdjustments: { "King Size": 0, "Queen Size": -5000 },
      origSizeAdjustments: { "King Size": 0, "Queen Size": -8000 },
      optionAdjustments: { "Hydraulic Storage": 0, "Non Storage": -10000 },
      origOptionAdjustments: { "Hydraulic Storage": 0, "Non Storage": -14000 }
    },
    deliverySubtext: "Includes free local white-glove installation & GST invoice.", // ⭐️ standard as requested
    shortDesc: "Pristine Handcarved Royal Traditional Bed in Teakwood.",
    description: "Designed and perfected in Bhisez Sindhudurg workshop, this premium bed is a fine specimen of Indian carpentry. Features premium selected grains, borer resistant seasoning, and flawless double coat PU satin finish."
  },
  "beds-premium-bed-2": {
    name: "BED - premium bed #02",
    material: "Premium Cane & Rosewood",
    badge: "new",
    img: "/images/BED/premium bed 02.webP",
    seriesName: "artisan cane & timber collection",
    brandName: "Bhisez Furniture Showroom",
    sizingLabel: "Dimensions / Bed Sizing",
    sizesList: ["King Size", "Queen Size"],
    finishesLabel: "Hardwood Finish / Seal",
    finishesList: [
      { name: 'Amber Walnut', color: '#c9a87c' },
      { name: 'Danish Walnut', color: '#5a3e28' },
      { name: 'Teak Brown', color: '#7a5230' }
    ],
    optionsLabel: "Underbed storage options",
    optionsList: ["Hydraulic Storage", "Non Storage"],
    priceRules: {
      sizeAdjustments: { "King Size": 0, "Queen Size": -5000 },
      origSizeAdjustments: { "King Size": 0, "Queen Size": -8000 },
      optionAdjustments: { "Hydraulic Storage": 0, "Non Storage": -10000 },
      origOptionAdjustments: { "Hydraulic Storage": 0, "Non Storage": -14000 }
    },
    shortDesc: "Handcrafted with seasoned native timber wood. Built using durable standard premium joinery.",
    description: "Designed and perfected in Bhisez Sindhudurg workshop, this premium bed is a fine specimen of Indian carpentry."
  },
  "beds-premium-bed-3": {
    name: "BED - premium bed #03",
    material: "Premium Solid Wood",
    img: "/images/BED/premium bed 03.webP",
    shortDesc: "Elegant premium joinery with royal layout.",
  },
  "beds-premium-bed-4": {
    name: "BED - premium bed #04",
    material: "Premium Solid Wood",
    img: "/images/BED/premium bed 04.webP",
    shortDesc: "Elegant premium joinery with royal layout.",
  },

  // ── 🛏️ OPEN BEDS ──
  "beds-open-bed-1": {
    name: "BED - open bed #01",
    material: "Solid Teakwood",
    img: "/images/BED/open bed 01.webP",
    seriesName: "minimalist sleek frames",
    sizingLabel: "Platform Sizing",
    sizesList: ["King Size", "Queen Size"],
    finishesLabel: "Premium Sealer Polish",
    optionsLabel: "", // empty means no underbed storage option block shown!
    optionsList: [],
    shortDesc: "Minimalist open-slat hardwood base.",
  },

  // ── 🛋️ WOODEN SOFAS ──
  "wooden-sofas-sofa-1": {
    name: "WOODEN SOFA - Sofa #01",
    material: "Seasoned Teakwood",
    badge: "bs",
    img: "/images/SOFA/sofa 01.webP",
    seriesName: "modular lounge series",
    brandName: "Bhisez Furniture Showroom",
    sizingLabel: "Seating Capacity",
    sizesList: ["3 Seater", "2 Seater", "1 Seater"],
    finishesLabel: "Premium Polish and Wax Coating",
    finishesList: [
      { name: 'Honey Teak', color: '#b98c5c' },
      { name: 'Dark Mahogany', color: '#4a2e1b' }
    ],
    optionsLabel: "Cushion Density Mode",
    optionsList: ["Ultra-density Foam", "Standard Tufted Classic"],
    priceRules: {
      sizeAdjustments: { "3 Seater": 0, "2 Seater": -4000, "1 Seater": -8000 },
      origSizeAdjustments: { "3 Seater": 0, "2 Seater": -6000, "1 Seater": -11000 },
      optionAdjustments: { "Ultra-density Foam": 0, "Standard Tufted Classic": -2000 }
    },
    deliverySubtext: "Includes free white-glove setup and premium cushions warranty.",
    shortDesc: "Classic hand-carved designer teakwood living comfort sofa.",
    description: "Meticulously crafted robust framework using prime handpicked heavy Rosewood and Teak timbers, designed to anchor beautiful family memories generation over generation."
  },
  "wooden-sofas-sofa-2": {
    name: "WOODEN SOFA - Sofa #02",
    material: "Seasoned Teakwood",
    badge: "new",
    img: "/images/SOFA/sofa 02.webP",
  },

  // ── 🪑 WOODEN CHAIRS ──
  "wooden-chairs-chair-1": {
    name: "CHAIR - Solid Wood #01",
    material: "Selected Teakwood",
    img: "/images/CHAIR/chair 01.webP",
    seriesName: "handmade seat options",
    sizingLabel: "Seating Elevation",
    sizesList: ["Standard Height", "Counter Height (+₹1,500)"],
    finishesLabel: "Finish Polishing",
    optionsLabel: "", // No cushion or secondary options, so we hide the optional row!
    optionsList: [],
    priceRules: {
      sizeAdjustments: { "Standard Height": 0, "Counter Height (+₹1,500)": 1500 }
    },
    shortDesc: "Perfect ergonomic support for modern dining and work layouts.",
  },

  // ── 🛕 TEMPLE MANDIRS ──
  "wooden-mandirs-mandir-1": {
    name: "MANDIR - Teakwood Temple #01",
    material: "Premium Teakwood",
    img: "/images/MANDIR/mandir 01.webP",
    seriesName: "divine sanctuary collection",
    sizingLabel: "Temple Width / Sizing",
    sizesList: ["Standard Width (24\")", "Wide Width (36\") (+₹6,000)"],
    finishesLabel: "Polishing Finishes",
    optionsLabel: "Utility Drawer Options",
    optionsList: ["Pooja Drawers Included", "Platform Only (-₹2,000)"],
    priceRules: {
      sizeAdjustments: { "Standard Width (24\")": 0, "Wide Width (36\") (+₹6,000)": 6000 },
      optionAdjustments: { "Pooja Drawers Included": 0, "Platform Only (-₹2,000)": -2000 }
    },
    shortDesc: "Intricately finished pooja ghara with standard storage drawer accessory.",
  },

  /* 
   * 👇 YOU CAN ADD ANY OTHER INDIVIDUAL PRODUCT OVERRIDES HERE 👇
   * Just use the format:
   * "product-id": {
   *   name: "Custom Name",
   *   img: "/images/NEW_FOLDER/my_image.webP",
   *   price: 25000,
   *   orig: 35000,
   *   material: "Rose Wood / Teak Wood",
   *   badge: "bs",
   *   shortDesc: "A brief punchy description",
   *   description: "Full paragraphs explaining craft, sizing, etc."
   * },
   */
};

/**
 * 📝 CUSTOM_PRODUCTS (Legacy support)
 * If you want to append/inject brand-new products that aren't in the default CATEGORY_MAP,
 * you can add them to this array.
 */
export const CUSTOM_PRODUCTS: Product[] = [];
