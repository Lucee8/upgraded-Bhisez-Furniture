import { useState } from 'react';
import { CartItem, Product, ViewState } from '../types';
import { 
  Trash2, 
  ShoppingBag, 
  Tag, 
  CheckCircle,
  Truck,
  ArrowRight
} from 'lucide-react';

interface CartViewProps {
  onNavigate: (view: ViewState) => void;
  cart: CartItem[];
  onUpdateCartItemQty: (itemId: number | string, qty: number) => void;
  onRemoveCartItem: (itemId: number | string) => void;
}

export default function CartView({
  onNavigate,
  cart,
  onUpdateCartItemQty,
  onRemoveCartItem,
}: CartViewProps) {
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState<string>('');
  const [couponSuccess, setCouponSuccess] = useState<boolean>(false);

  // Totals calculations
  const mrpTotal = cart.reduce((acc, curr) => {
    const orig = curr.product.orig || curr.product.price;
    const adjusted = curr.size === 'Queen Size' ? orig - 8000 : orig;
    return acc + (adjusted * curr.quantity);
  }, 0);

  const subTotal = cart.reduce((acc, curr) => {
    let price = curr.product.price;
    if (curr.size === 'Queen Size') price -= 5000;
    if (curr.storage === 'Non Storage') price -= 10000;
    return acc + (price * curr.quantity);
  }, 0);

  const productDiscount = mrpTotal - subTotal;
  const couponDiscount = Math.round(subTotal * (discountPercent / 100));
  const finalTotal = subTotal - couponDiscount;

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'FIRST15') {
      setDiscountPercent(15);
      setCouponMsg('Promo code FIRST15 loaded! Save 15% on solid teak designs.');
      setCouponSuccess(true);
    } else if (code === 'SUMMER20') {
      setDiscountPercent(20);
      setCouponMsg('Promo code SUMMER20 loaded! Save 20% on your complete order.');
      setCouponSuccess(true);
    } else if (code) {
      setDiscountPercent(0);
      setCouponMsg('Invalid coupon code. Try FIRST15 or SUMMER20!');
      setCouponSuccess(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl font-black text-[#3D2B1F] mb-2">Shopping Cart</h1>
        <p className="text-xs text-stone-500 mb-8">{cart.length} item{cart.length === 1 ? '' : 's'} placed for review</p>

        {cart.length === 0 ? (
          <div className="bg-white border border-[#E0D8CF] rounded-2xl p-16 text-center space-y-4 shadow-xs">
            <div className="text-4xl">🛒</div>
            <h3 className="font-serif text-lg font-bold text-[#3D2B1F]">Your Cart is Currently Empty</h3>
            <p className="text-stone-500 text-xs max-w-sm mx-auto leading-relaxed">
              Explore our handcrafted seasoned timber beds, divans or modular mandirs to begin furnishing your premium Konkan home.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate('beds')}
                className="bg-[#C9983A] text-amber-950 font-bold text-xs py-2.5 px-6 rounded-md hover:bg-[#E8B84B] transition-colors"
              >
                Inquire Beds Series
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT COLUMN: SELECTED ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => {
                const computedItemPrice = (() => {
                  let p = item.product.price;
                  if (item.size === 'Queen Size') p -= 5000;
                  if (item.storage === 'Non Storage') p -= 10000;
                  return p;
                })();

                return (
                  <div 
                    key={idx}
                    className="bg-white border border-[#E0D8CF] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                  >
                    {/* Item details */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#E0D8CF] bg-amber-50">
                        <img src={item.product.img} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-sm font-black text-amber-950 leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                          <span>Size: {item.size}</span>
                          <span>|</span>
                          <span>Finish: {item.finish}</span>
                          <span>|</span>
                          <span>Storage: {item.storage}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Adjustment + Price */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateCartItemQty(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg border border-[#E0D8CF] flex items-center justify-center font-bold hover:bg-stone-50 bg-transparent cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold text-stone-800 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateCartItemQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-[#E0D8CF] flex items-center justify-center font-bold hover:bg-stone-50 bg-transparent cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-stone-400 uppercase block">Total</span>
                        <span className="text-sm font-black text-amber-950">
                          ₹{(computedItemPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button 
                        onClick={() => onRemoveCartItem(item.product.id)}
                        className="text-stone-400 hover:text-red-600 rounded-md p-2 transition-colors bg-transparent border-none cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* White glove help slat */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center space-x-3 text-xs text-emerald-800">
                <Truck size={16} className="text-emerald-600 shrink-0" />
                <span><strong>Complimentary Assembly:</strong> All selected items are unpacked, fully assembled and aligned in your home with absolutely zero extra charges.</span>
              </div>
            </div>

            {/* RIGHT COLUMN: REWARDS & PRICE BREAKDOWN */}
            <div className="space-y-6">
              
              {/* Promo section */}
              <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl space-y-4 shadow-xs">
                <h3 className="font-serif text-xs font-black text-[#3D2B1F] uppercase tracking-wider flex items-center gap-1">
                  <Tag size={12} className="text-amber-700" /> Apply Promo Coupon
                </h3>
                
                <div className="flex overflow-hidden rounded-xl border border-[#E0D8CF] bg-[#FAF7F2]">
                  <input
                    type="text"
                    placeholder="Enter FIRST15 or SUMMER20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-transparent text-xs text-stone-800 outline-none uppercase font-bold"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold px-4 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {couponMsg && (
                  <div className={`p-2.5 rounded-lg text-[11px] font-semibold flex items-center space-x-1.5 ${couponSuccess ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                    {couponSuccess && <CheckCircle size={12} className="text-emerald-600" />}
                    <span>{couponMsg}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap gap-2">
                  <button onClick={() => { setCouponCode('FIRST15'); setDiscountPercent(0); setCouponMsg(''); }} className="text-[10px] font-bold bg-[#E8DDD1]/40 hover:bg-[#E8DDD1]/80 px-2.5 py-1 rounded-sm text-[#3D2B1F] border border-transparent">
                    FIRST15
                  </button>
                  <button onClick={() => { setCouponCode('SUMMER20'); setDiscountPercent(0); setCouponMsg(''); }} className="text-[10px] font-bold bg-[#E8DDD1]/40 hover:bg-[#E8DDD1]/80 px-2.5 py-1 rounded-sm text-[#3D2B1F] border border-transparent">
                    SUMMER20
                  </button>
                </div>
              </div>

              {/* Price details sheet */}
              <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl space-y-4 shadow-xs">
                <h3 className="font-serif text-sm font-black text-[#3D2B1F] pb-3 border-b border-[#E0D8CF]">Price Details</h3>
                
                <div className="space-y-2.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>MRP Total</span>
                    <span>₹{mrpTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Product Discount</span>
                    <span className="text-emerald-600 font-bold">− ₹{productDiscount.toLocaleString('en-IN')}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between items-center text-rose-700">
                      <span>Coupon Discount ({discountPercent}%)</span>
                      <span className="font-bold">− ₹{couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>White-Glove Delivery</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E0D8CF] flex justify-between items-baseline bg-transparent">
                  <span className="text-sm font-bold text-amber-950">Grand Billing Total</span>
                  <span className="text-xl font-black text-amber-950">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Savings box */}
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs space-y-1">
                  <span><strong>Splendid!</strong> You are saving</span>
                  <span className="text-sm font-black text-emerald-700 block">
                    ₹{(productDiscount + couponDiscount).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => onNavigate('checkout')}
                  className="w-full py-3.5 rounded-xl bg-[#3D2B1F] hover:bg-[#1C120A] text-amber-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  id="cart-checkout-cta-btn"
                >
                  Proceed to Shipping <ArrowRight size={14} />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
