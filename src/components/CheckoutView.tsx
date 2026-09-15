import React, { useState } from 'react';
import { ViewState, CartItem } from '../types';
import { 
  Truck, 
  MapPin, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ShippingDetails {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  pincode: string;
  mobile: string;
  email: string;
  addressType: string;
}

interface CheckoutViewProps {
  onNavigate: (view: ViewState) => void;
  cart: CartItem[];
  shippingDetails: ShippingDetails | null;
  onSaveShippingDetails: (details: ShippingDetails) => void;
}

export default function CheckoutView({
  onNavigate,
  cart,
  shippingDetails,
  onSaveShippingDetails,
}: CheckoutViewProps) {
  const [addressType, setAddressType] = useState<string>(shippingDetails?.addressType || 'Home');
  const [firstName, setFirstName] = useState<string>(shippingDetails?.firstName || '');
  const [lastName, setLastName] = useState<string>(shippingDetails?.lastName || '');
  const [streetAddress, setStreetAddress] = useState<string>(shippingDetails?.streetAddress || '');
  const [city, setCity] = useState<string>(shippingDetails?.city || '');
  const [pincode, setPincode] = useState<string>(shippingDetails?.pincode || '');
  const [mobile, setMobile] = useState<string>(shippingDetails?.mobile || '');
  const [email, setEmail] = useState<string>(shippingDetails?.email || '');

  const subTotal = cart.reduce((acc, curr) => {
    let p = curr.product.price;
    if (curr.size === 'Queen Size') p -= 5000;
    if (curr.storage === 'Non Storage') p -= 10000;
    return acc + (p * curr.quantity);
  }, 0);

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !streetAddress || !city || !pincode || !mobile || !email) {
      alert('Please fill out all required fields.');
      return;
    }
    onSaveShippingDetails({
      firstName,
      lastName,
      streetAddress,
      city,
      pincode,
      mobile,
      email,
      addressType,
    });
    // Navigate to Payments
    onNavigate('payments');
  };

  return (
    <div className="bg-[#FAF5F2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl font-black text-[#5F220F] mb-8">Shipping Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: FORM BLOCK */}
          <div className="lg:col-span-2 bg-white border border-[#EADBD2] p-6 sm:p-8 rounded-2xl shadow-xs">
            
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#EADBD2]">
              <span className="w-8 h-8 rounded-full bg-[#FFC102] text-[#5F220F] font-black text-xs flex items-center justify-center">1</span>
              <div>
                <h3 className="font-serif text-base font-black text-[#5F220F]">Delivery Address</h3>
                <p className="text-[11px] text-[#7E655C]">Provide shipping coordinates and phone contacts.</p>
              </div>
            </div>

            <form onSubmit={handleSaveAndContinue} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">First Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#5F220F] bg-[#FAF5F2] focus:ring-1 focus:ring-[#FFC102] outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">Last Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#5F220F] bg-[#FAF5F2] focus:ring-1 focus:ring-[#FFC102] outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">Street Address *</label>
                <textarea 
                  required 
                  placeholder="Apartment, Landmark, Street"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#5F220F] bg-[#FAF5F2] min-h-[80px] focus:ring-1 focus:ring-[#FFC102] outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">City *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Malvan"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#5F220F] bg-[#FAF5F2] focus:ring-1 focus:ring-[#FFC102] outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">Pincode *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="416606"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#5F220F] bg-[#FAF5F2] focus:ring-1 focus:ring-[#FFC102] outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">State</label>
                  <input 
                    type="text" 
                    disabled 
                    value="Maharashtra"
                    className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#7E655C] bg-[#FAF5F2]/50 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider block">Address Type</label>
                <div className="flex space-x-3">
                  {['Home', 'Work', 'Other'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAddressType(type)}
                      className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all cursor-pointer ${addressType === type ? 'bg-[#5F220F] border-[#5F220F] text-[#FFC102]' : 'bg-transparent border-[#EADBD2] text-[#5F220F] hover:border-[#5F220F]'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2 pt-4 border-t border-[#EADBD2]/60">
                <h4 className="font-serif text-sm font-black text-[#5F220F]">Contact Points</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#5F220F] bg-[#FAF5F2] focus:ring-1 focus:ring-[#FFC102] outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-bold text-[#7E655C] uppercase tracking-wider">WhatsApp Phone *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+91 70574 41122"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/[^\d+ ]/g, ''))}
                    className="border border-[#EADBD2] rounded-xl px-4 py-2.5 text-xs text-[#5F220F] bg-[#FAF5F2] focus:ring-1 focus:ring-[#FFC102] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#FFC102] hover:bg-[#E5AC00] text-[#5F220F] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  id="checkout-shipping-continue-btn"
                >
                  Save and Continue to Payments <ArrowRight size={14} />
                </button>
              </div>

            </form>

          </div>

          {/* RIGHT: COST BREAKDOWN */}
          <div className="bg-white border border-[#EADBD2] p-5 rounded-2xl space-y-4 h-fit shadow-xs">
            <h3 className="font-serif text-sm font-black text-[#5F220F] pb-3 border-b border-[#EADBD2]">Your Order</h3>
            
            <div className="divide-y divide-[#EADBD2] max-h-56 overflow-y-auto pr-1">
              {cart.map((item, idx) => {
                const computedItemPrice = (() => {
                  let p = item.product.price;
                  if (item.size === 'Queen Size') p -= 5000;
                  if (item.storage === 'Non Storage') p -= 10000;
                  return p;
                })();

                return (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-[#5F220F] line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-[#7E655C]">Qty: {item.quantity} · {item.size}</p>
                    </div>
                    <span className="font-bold text-[#5F220F]">₹{(computedItemPrice * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#EADBD2] flex justify-between items-baseline bg-transparent">
              <span className="text-xs font-semibold text-[#7E655C]">Cart Total</span>
              <span className="text-base font-black text-[#5F220F]">₹{subTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="bg-[#FFF9E6] border border-[#FFC102]/50 p-3 rounded-xl flex items-center space-x-2 text-[11px] text-[#5F220F]">
              <ShieldCheck size={14} className="text-[#FFC102] shrink-0" />
              <span>Certified SSL secure encryption protected gateway.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
