import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  addDoc, 
  deleteDoc, 
  updateDoc 
} from "firebase/firestore";
import { Product } from "./types";
import { ALL_PRODUCTS, CATEGORY_MAP } from "./data";

const firebaseConfig = {
  apiKey: "AIzaSyCxif03RPQvm1MQiW8ASL-mz6AGtgKLqLw",
  authDomain: "bhisez-furniture-store.firebaseapp.com",
  projectId: "bhisez-furniture-store",
  storageBucket: "bhisez-furniture-store.firebasestorage.app",
  messagingSenderId: "578731884316",
  appId: "1:578731884316:web:ce11b835a9c7aa854bc4d9",
  measurementId: "G-WQM3N6H52N"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Helper to convert Firestore ID or document content
const DEFAULT_INQUIRIES = [
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

const DEFAULT_WEBSITE_CONTENT = {
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

// Helper utility to strip undefined properties recursively before sending to Firestore
function cleanUndefined<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return null as any;
  }
  if (Array.isArray(obj)) {
    return obj
      .filter((item) => item !== undefined)
      .map((item) => cleanUndefined(item)) as any;
  }
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key];
        if (val !== undefined) {
          cleaned[key] = cleanUndefined(val);
        }
      }
    }
    return cleaned;
  }
  return obj;
}

// 1. PRODUCTS
export async function getDbProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Product);
    });

    if (list.length < ALL_PRODUCTS.length) {
      console.log(`Firestore has only ${list.length} products, but we expect ${ALL_PRODUCTS.length}. Seeding missing products...`);
      const existingIds = new Set(list.map(p => String(p.id)));
      const missingProducts = ALL_PRODUCTS.filter(prod => !existingIds.has(String(prod.id)));
      
      // Seed missing products in small parallel chunks to be fast and safe
      const chunkSize = 25;
      for (let i = 0; i < missingProducts.length; i += chunkSize) {
        const chunk = missingProducts.slice(i, i + chunkSize);
        await Promise.all(chunk.map(prod => 
          setDoc(doc(db, "products", String(prod.id)), cleanUndefined(prod))
        ));
      }
      
      // Refetch or append to list
      missingProducts.forEach(p => list.push(p));
      console.log("Seeding of missing products completed successfully.");
    }
    return list;
  } catch (error) {
    console.error("Firestore getDbProducts error, falling back to localState:", error);
    return ALL_PRODUCTS;
  }
}

export async function saveDbProduct(prod: Product): Promise<void> {
  try {
    await setDoc(doc(db, "products", String(prod.id)), cleanUndefined(prod));
  } catch (error) {
    console.error("Firestore saveDbProduct error:", error);
  }
}

export async function deleteDbProduct(id: string | number): Promise<void> {
  try {
    await deleteDoc(doc(db, "products", String(id)));
  } catch (error) {
    console.error("Firestore deleteDbProduct error:", error);
  }
}

// 2. CATEGORIES
export async function getDbCategories(): Promise<any[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const list: any[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push(docSnap.data());
    });

    if (list.length < CATEGORY_MAP.length) {
      console.log(`Firestore has only ${list.length} categories, but we expect ${CATEGORY_MAP.length}. Seeding missing categories...`);
      const existingSlugs = new Set(list.map(c => c.slug));
      const missingCategories = CATEGORY_MAP.filter(cat => !existingSlugs.has(cat.slug));
      
      await Promise.all(missingCategories.map(cat => 
        setDoc(doc(db, "categories", cat.slug), cleanUndefined(cat))
      ));
      
      missingCategories.forEach(c => list.push(c));
      console.log("Seeding of missing categories completed successfully.");
    }
    return list;
  } catch (error) {
    console.error("Firestore getDbCategories error:", error);
    return CATEGORY_MAP;
  }
}

export async function saveDbCategory(cat: any): Promise<void> {
  try {
    await setDoc(doc(db, "categories", cat.slug), cleanUndefined(cat));
  } catch (error) {
    console.error("Firestore saveDbCategory error:", error);
  }
}

export async function deleteDbCategory(slug: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "categories", slug));
  } catch (error) {
    console.error("Firestore deleteDbCategory error:", error);
  }
}

// 3. INQUIRIES
export async function getDbInquiries(): Promise<any[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "inquiries"));
    if (querySnapshot.empty) {
      console.log("No inquiries in Firestore. Seeding default inquiries...");
      for (const inq of DEFAULT_INQUIRIES) {
        await setDoc(doc(db, "inquiries", String(inq.id)), cleanUndefined(inq));
      }
      return DEFAULT_INQUIRIES;
    }
    const list: any[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push(docSnap.data());
    });
    // Sort by date/id
    return list.sort((a, b) => b.id.localeCompare(a.id));
  } catch (error) {
    console.error("Firestore getDbInquiries error:", error);
    return DEFAULT_INQUIRIES;
  }
}

export async function saveDbInquiry(inq: any): Promise<void> {
  try {
    await setDoc(doc(db, "inquiries", String(inq.id)), cleanUndefined(inq));
  } catch (error) {
    console.error("Firestore saveDbInquiry error:", error);
  }
}

export async function deleteDbInquiry(id: string | number): Promise<void> {
  try {
    await deleteDoc(doc(db, "inquiries", String(id)));
  } catch (error) {
    console.error("Firestore deleteDbInquiry error:", error);
  }
}

// 4. WEBSITE CONTENT
export async function getDbWebsiteContent(): Promise<any> {
  try {
    const querySnapshot = await getDocs(collection(db, "website_content"));
    if (querySnapshot.empty) {
      console.log("No website_content in Firestore. Seeding defaults...");
      await setDoc(doc(db, "website_content", "main"), cleanUndefined(DEFAULT_WEBSITE_CONTENT));
      return DEFAULT_WEBSITE_CONTENT;
    }
    let data = DEFAULT_WEBSITE_CONTENT;
    querySnapshot.forEach((docSnap) => {
      if (docSnap.id === "main") {
        data = docSnap.data() as any;
      }
    });
    return data;
  } catch (error) {
    console.error("Firestore getDbWebsiteContent error:", error);
    return DEFAULT_WEBSITE_CONTENT;
  }
}

export async function saveDbWebsiteContent(content: any): Promise<void> {
  try {
    await setDoc(doc(db, "website_content", "main"), cleanUndefined(content));
  } catch (error) {
    console.error("Firestore saveDbWebsiteContent error:", error);
  }
}
