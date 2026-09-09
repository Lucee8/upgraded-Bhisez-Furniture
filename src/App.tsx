import { useState, useEffect } from 'react';
import { ViewState, CartItem, Product, ShowroomWalkthrough } from './types';
import { ALL_PRODUCTS, CATEGORY_MAP, DEFAULT_INQUIRIES, DEFAULT_WEBSITE_CONTENT } from './data';
import { motion, AnimatePresence } from 'motion/react';

// Import Firebase CRUD integrations
import { 
  getDbProducts, saveDbProduct, deleteDbProduct, 
  getDbCategories, saveDbCategory, deleteDbCategory, 
  getDbInquiries, saveDbInquiry, deleteDbInquiry, 
  getDbWebsiteContent, saveDbWebsiteContent 
} from './firebase';

// Import sub components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import BedsView from './components/BedsView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import PaymentsView from './components/PaymentsView';
import ShowroomView from './components/ShowroomView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import WishlistView from './components/WishlistView';
import LoginView from './components/LoginView';
import AdminView from './components/AdminView';

// Named icons
import { MessageCircle, Heart, X, Check } from 'lucide-react';


export default function App() {
  // Helper to determine if current URL is the dedicated admin link
  const isAdminRoute = () => {
    return (
      window.location.pathname === '/admin' || 
      window.location.pathname === '/admin/' || 
      window.location.hash === '#/admin' || 
      window.location.hash === '#admin' || 
      window.location.search.includes('admin=true') ||
      window.location.search.includes('view=admin')
    );
  };

  // Navigation states
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    return isAdminRoute() ? 'admin' : 'home';
  });

  // Dynamic application state systems
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bhisez_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ALL_PRODUCTS;
  });

  const [categories, setCategories] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bhisez_categories');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CATEGORY_MAP;
  });

  const [inquiries, setInquiries] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bhisez_inquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_INQUIRIES;
  });

  const [websiteContent, setWebsiteContent] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('bhisez_webcontent');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_WEBSITE_CONTENT;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0] || ALL_PRODUCTS[0]);
  const [initialCategoryFilter, setInitialCategoryFilter] = useState<string | null>('all');
  const [initialSubCategoryFilter, setInitialSubCategoryFilter] = useState<string | null>(null);

  const [loadingDb, setLoadingDb] = useState<boolean>(true);

  // Fetch all initial data from live Firebase Firestore
  useEffect(() => {
    async function initFirestore() {
      try {
        const dbProds = await getDbProducts();
        setProducts(dbProds);
        if (dbProds && dbProds.length > 0) {
          setSelectedProduct(dbProds[0]);
        }
        
        const dbCats = await getDbCategories();
        setCategories(dbCats);
        
        const dbInqs = await getDbInquiries();
        setInquiries(dbInqs);
        
        const dbContent = await getDbWebsiteContent();
        setWebsiteContent(dbContent);
      } catch (err) {
        console.error("Failed to fetch initial Firestore records:", err);
      } finally {
        setLoadingDb(false);
      }
    }
    initFirestore();
  }, []);

  const handleUpdateProducts = async (nextProds: Product[]) => {
    setProducts(nextProds);
    try {
      const prevMap = new Map(products.map(p => [p.id, p]));
      const nextMap = new Map(nextProds.map(p => [p.id, p]));
      for (const p of products) {
        if (!nextMap.has(p.id)) {
          await deleteDbProduct(p.id);
        }
      }
      for (const p of nextProds) {
        const prev = prevMap.get(p.id);
        if (!prev || JSON.stringify(prev) !== JSON.stringify(p)) {
          await saveDbProduct(p);
        }
      }
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
  };

  const handleUpdateCategories = async (nextCats: any[]) => {
    setCategories(nextCats);
    try {
      const prevMap = new Map(categories.map(c => [c.slug, c]));
      const nextMap = new Map(nextCats.map(c => [c.slug, c]));
      for (const c of categories) {
        if (!nextMap.has(c.slug)) {
          await deleteDbCategory(c.slug);
        }
      }
      for (const c of nextCats) {
        const prev = prevMap.get(c.slug);
        if (!prev || JSON.stringify(prev) !== JSON.stringify(c)) {
          await saveDbCategory(c);
        }
      }
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
  };

  const handleUpdateInquiries = async (nextInqs: any[]) => {
    setInquiries(nextInqs);
    try {
      const prevMap = new Map(inquiries.map(i => [i.id, i]));
      const nextMap = new Map(nextInqs.map(i => [i.id, i]));
      for (const i of inquiries) {
        if (!nextMap.has(i.id)) {
          await deleteDbInquiry(i.id);
        }
      }
      for (const i of nextInqs) {
        const prev = prevMap.get(i.id);
        if (!prev || JSON.stringify(prev) !== JSON.stringify(i)) {
          await saveDbInquiry(i);
        }
      }
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
  };

  const handleUpdateWebsiteContent = async (nextContent: any) => {
    setWebsiteContent(nextContent);
    try {
      await saveDbWebsiteContent(nextContent);
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
  };

  const handleAddInquiry = async (inqData: {
    name: string;
    phone: string;
    city: string;
    subject: string;
    message: string;
    customLength?: string;
    customWidth?: string;
    woodGrade?: string;
  }) => {
    const newInq = {
      id: `inq-${Date.now()}`,
      name: inqData.name,
      phone: inqData.phone,
      city: inqData.city,
      subject: inqData.subject,
      message: inqData.message,
      customLength: inqData.customLength || '',
      customWidth: inqData.customWidth || '',
      woodGrade: inqData.woodGrade || '',
      notes: 'Submitted via web portal',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    const nextInqs = [newInq, ...inquiries];
    setInquiries(nextInqs);
    try {
      await saveDbInquiry(newInq);
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
    triggerToast('✓ Request registered in database!');
  };

  const [shippingDetails, setShippingDetails] = useState<{
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    pincode: string;
    mobile: string;
    email: string;
    addressType: string;
  } | null>(null);

  const handlePlaceOrder = async (orderId: string, paymentMethod: string) => {
    if (!shippingDetails) {
      console.error("Missing shipping details for order placement.");
      return;
    }

    const cartItemsSummary = cart.map(item => {
      let p = item.product.price;
      if (item.size === 'Queen Size') p -= 5000;
      if (item.storage === 'Non Storage') p -= 10000;
      return `${item.product.name} (Qty: ${item.quantity}, Size: ${item.size}, Finish: ${item.finish}, Storage: ${item.storage}) - ₹${p.toLocaleString('en-IN')}`;
    }).join('\n');

    const totalCost = cart.reduce((acc, curr) => {
      let p = curr.product.price;
      if (curr.size === 'Queen Size') p -= 5000;
      if (curr.storage === 'Non Storage') p -= 10000;
      return acc + (p * curr.quantity);
    }, 0);
    const gst = Math.round(totalCost * 0.18);
    const totalWithGst = totalCost + gst;

    const summaryMessage = `PLACED SECURE ORDER #${orderId}\n\n` +
      `Items:\n${cartItemsSummary}\n\n` +
      `Subtotal: ₹${totalCost.toLocaleString('en-IN')}\n` +
      `GST (18%): ₹${gst.toLocaleString('en-IN')}\n` +
      `Grand Total: ₹${totalWithGst.toLocaleString('en-IN')}\n\n` +
      `Shipping Address:\n${shippingDetails.streetAddress}, ${shippingDetails.city} - ${shippingDetails.pincode} (${shippingDetails.addressType})\n\n` +
      `Payment Method Chosen: ${paymentMethod.toUpperCase()}`;

    const newInq = {
      id: `inq-${Date.now()}`,
      name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
      phone: shippingDetails.mobile,
      city: shippingDetails.city,
      subject: `Secure Order Placed #${orderId}`,
      message: summaryMessage,
      notes: `Order Ref: ${orderId} | Method: ${paymentMethod}`,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    const nextInqs = [newInq, ...inquiries];
    setInquiries(nextInqs);
    try {
      await saveDbInquiry(newInq);
    } catch (e) {
      console.error("Firestore sync error:", e);
    }
    triggerToast('✓ Secure Order logged in database!');
  };

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<(string | number)[]>([]);

  // User details & state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Active Toast notify
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('bhisez_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bhisez_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('bhisez_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('bhisez_webcontent', JSON.stringify(websiteContent));
  }, [websiteContent]);

  // Load wishlist from local storage on launch
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bhisez_wl');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync state with URL location changes (for back button, separate tab navigation)
  useEffect(() => {
    const handleLocationChange = () => {
      if (isAdminRoute()) {
        setCurrentView('admin');
      } else if (currentView === 'admin' && !isAdminRoute()) {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [currentView]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleNavigate = (view: ViewState) => {
    if (isAdminRoute() && view === 'home') {
      window.location.href = window.location.origin;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  // Select category from dashboard & redirect
  const handleSelectCategory = (category: string, subCategory?: string | null) => {
    setInitialCategoryFilter(category);
    setInitialSubCategoryFilter(subCategory || null);
    handleNavigate('beds');
  };

  // View specific product detailed setup
  const handleSelectProduct = (productId: string | number) => {
    const prod = products.find(p => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      handleNavigate('product-detail');
    }
  };

  // Toggle saving to wishlist
  const handleToggleWishlist = (productId: string | number) => {
    let next: (string | number)[];
    const isWished = wishlist.includes(productId);

    if (isWished) {
      next = wishlist.filter(id => id !== productId);
      triggerToast('🤍 Removed from Wishlist!');
    } else {
      next = [...wishlist, productId];
      triggerToast('❤️ Added to Wishlist!');
    }

    setWishlist(next);
    localStorage.setItem('bhisez_wl', JSON.stringify(next));
  };

  // Adding to Shopping Cart Array
  const handleAddToCart = (
    product: Product, 
    quantity: number, 
    size: string, 
    finish: string, 
    storage: string
  ) => {
    const existingIdx = cart.findIndex(item => 
      item.product.id === product.id && 
      item.size === size && 
      item.finish === finish && 
      item.storage === storage
    );

    if (existingIdx > -1) {
      const nextCart = [...cart];
      nextCart[existingIdx].quantity += quantity;
      setCart(nextCart);
    } else {
      setCart([...cart, { product, quantity, size, finish, storage }]);
    }
    triggerToast('🛒 Added to Cart successfully!');
  };

  const handleUpdateCartItemQty = (productId: string | number, qty: number) => {
    if (qty < 1) return;
    const nextCart = cart.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    setCart(nextCart);
  };

  const handleRemoveCartItem = (productId: string | number) => {
    setCart(cart.filter(item => item.product.id !== productId));
    triggerToast('🗑️ Item removed from Cart!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    triggerToast('🔓 Signed out successfully!');
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    triggerToast('🔒 Welcomed as privileged member!');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] font-sans antialiased text-[#3D2B1F]">
      
      {/* Live Database Sync Status Ribbon */}
      {loadingDb && (
        <div className="bg-[#EAE1D5]/80 backdrop-blur-md text-[#3D2B1F] text-[10px] sm:text-xs font-semibold py-2 px-4 text-center border-b border-[#E0D8CF] flex items-center justify-center gap-2 select-none z-[100] transition-opacity">
          <span className="w-3 h-3 rounded-full border-2 border-[#3D2B1F] border-t-transparent animate-spin shrink-0"></span>
          <span>Connecting to live Bhisez Workshop Firebase Database...</span>
        </div>
      )}

      {/* Dynamic Alert Toast */}
      {toastVisible && (
        <div className="fixed bottom-24 right-6 sm:bottom-8 sm:right-8 z-[200] max-w-sm bg-[#1A1209] text-[#FAF7F2] border border-[#3D2B1F] shadow-xl px-5 py-3.5 rounded-xl flex items-center space-x-2.5 animate-scale-in">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white font-bold text-xs">
            ✓
          </span>
          <span className="text-xs font-bold font-space select-none tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Primary Header/Navbar */}
      {!isAdminRoute() && currentView !== 'admin' && (
        <div className={currentView === 'beds' ? 'hidden md:block' : ''}>
          <Navbar 
            currentView={currentView}
            onNavigate={handleNavigate}
            cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
            wishlistCount={wishlist.length}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={handleSelectProduct}
          />
        </div>
      )}

      {/* Main active view port */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            {currentView === 'home' && (
              <HomeView 
                onNavigate={handleNavigate}
                onSelectCategory={handleSelectCategory}
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                products={products}
                categories={categories}
                websiteContent={websiteContent}
              />
            )}

            {currentView === 'beds' && (
              <BedsView 
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                initialCategoryFilter={initialCategoryFilter}
                initialSubCategoryFilter={initialSubCategoryFilter}
                cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
                wishlistCount={wishlist.length}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                products={products}
              />
            )}

            {currentView === 'product-detail' && (
              <ProductDetailView 
                onNavigate={handleNavigate}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
              />
            )}

            {currentView === 'cart' && (
              <CartView 
                onNavigate={handleNavigate}
                cart={cart}
                onUpdateCartItemQty={handleUpdateCartItemQty}
                onRemoveCartItem={handleRemoveCartItem}
              />
            )}

            {currentView === 'checkout' && (
              <CheckoutView 
                onNavigate={handleNavigate}
                cart={cart}
                shippingDetails={shippingDetails}
                onSaveShippingDetails={(details) => setShippingDetails(details)}
              />
            )}

            {currentView === 'payments' && (
              <PaymentsView 
                onNavigate={handleNavigate}
                cart={cart}
                onClearCart={handleClearCart}
                shippingDetails={shippingDetails}
                onPlaceOrder={handlePlaceOrder}
              />
            )}

            {currentView === 'showroom' && (
              <ShowroomView onAddInquiry={handleAddInquiry} />
            )}

            {currentView === 'about' && (
              <AboutView onNavigate={handleNavigate} />
            )}

            {currentView === 'contact' && (
              <ContactView onAddInquiry={handleAddInquiry} />
            )}

            {currentView === 'wishlist' && (
              <WishlistView 
                onNavigate={handleNavigate}
                onSelectProduct={handleSelectProduct}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                products={products}
              />
            )}

            {currentView === 'login' && (
              <LoginView 
                onNavigate={handleNavigate}
                onLoginSuccess={handleLoginSuccess}
              />
            )}

            {currentView === 'admin' && (
              <AdminView 
                products={products}
                onUpdateProducts={handleUpdateProducts}
                categories={categories}
                onUpdateCategories={handleUpdateCategories}
                inquiries={inquiries}
                onUpdateInquiries={handleUpdateInquiries}
                websiteContent={websiteContent}
                onUpdateWebsiteContent={handleUpdateWebsiteContent}
                onNavigate={handleNavigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Primary Footer */}
      {!isAdminRoute() && currentView !== 'admin' && (
        <div className={currentView === 'beds' ? 'hidden md:block' : ''}>
          <Footer onNavigate={handleNavigate} />
        </div>
      )}

      {/* Ambient Floating WhatsApp helper button */}
      {!isAdminRoute() && currentView !== 'admin' && (
        <a 
          href={`https://wa.me/917057441122?text=${encodeURIComponent(`Hi Bhisez! I'd like to get an estimate for solid hardwood furniture.`)}`}
          target="_blank"
          className="fixed bottom-6 left-6 z-[90] w-12 h-12 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          rel="noreferrer"
          title="Chat on WhatsApp (+91 70574 41122)"
          id="whatsapp-floating-btn"
        >
          <MessageCircle size={22} className="fill-current text-white stroke-none" />
        </a>
      )}



    </div>
  );
}
