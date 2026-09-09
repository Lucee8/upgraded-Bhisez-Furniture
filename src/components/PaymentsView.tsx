import { useState } from 'react';
import { ViewState, CartItem } from '../types';
import { 
  CheckCircle, 
  CreditCard, 
  Smartphone, 
  Banknote,
  Lock,
  ArrowLeft,
  Heart
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

interface PaymentsViewProps {
  onNavigate: (view: ViewState) => void;
  cart: CartItem[];
  onClearCart: () => void;
  shippingDetails: ShippingDetails | null;
  onPlaceOrder: (orderId: string, paymentMethod: string) => void;
}

export default function PaymentsView({
  onNavigate,
  cart,
  onClearCart,
  shippingDetails,
  onPlaceOrder,
}: PaymentsViewProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('gpay');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const subTotal = cart.reduce((acc, curr) => {
    let p = curr.product.price;
    if (curr.size === 'Queen Size') p -= 5000;
    if (curr.storage === 'Non Storage') p -= 10000;
    return acc + (p * curr.quantity);
  }, 0);

  const gstValue = Math.round(subTotal * 0.18);
  const finalBill = subTotal + gstValue;

  const handlePlaceOrder = () => {
    // Generate mock order ID
    const randomId = 'BHISEZ-' + Math.floor(100000 + Math.random() * 90000);
    setOrderId(randomId);
    setOrderPlaced(true);
    // Call the callback to persist the order to database
    onPlaceOrder(randomId, selectedMethod);
    // Clear shopping cart on callback
    onClearCart();
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {orderPlaced ? (
          /* Order Placement Success Stage view */
          <div className="max-w-md mx-auto bg-white border border-[#E0D8CF] rounded-2xl p-8 text-center space-y-6 shadow-md animate-scale-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full border border-emerald-300 flex items-center justify-center font-bold text-3xl mx-auto">
              ✓
            </div>
            
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-black text-amber-950">Grand Order Placed!</h2>
              <p className="text-xs text-stone-500 font-medium">Your request has been successfully generated and seasoned.</p>
            </div>

            <div className="p-4 bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl font-mono text-xs text-stone-700 flex justify-between">
              <span>Order Reference:</span>
              <span className="font-bold text-amber-900">{orderId}</span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Bhisez workshop will contact you over WhatsApp shortly to verify shipping coordinates, arrange a delivery slot, and review custom woodwork details!
            </p>

            <div className="pt-2 flex flex-col space-y-3">
              <a 
                href={`https://wa.me/917057441122?text=${encodeURIComponent(`Hi Bhisez! I just placed an order. Order Reference ID: ${orderId}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] text-white hover:bg-[#1ebd59] text-xs font-bold rounded-xl flex justify-center items-center gap-1 shadow-xs"
              >
                💬 Track on WhatsApp
              </a>
              <button 
                onClick={() => onNavigate('home')}
                className="w-full py-3 border border-[#E0D8CF] hover:bg-stone-50 text-[#3D2B1F] text-xs font-semibold rounded-xl"
              >
                Back to Home Showcase
              </button>
            </div>
          </div>
        ) : (
          /* Main Payment Gate page */
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-[#E0D8CF]">
              <button 
                onClick={() => onNavigate('checkout')}
                className="p-1.5 hover:bg-stone-200 rounded-full text-stone-500 bg-transparent border-none cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h1 className="font-serif text-3xl font-black text-[#3D2B1F]">Complete Payment</h1>
                <p className="text-xs text-stone-500">Pick raw cash or SSL secure payment systems.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* LEFT: PAYMENT OPTIONS */}
              <div className="lg:col-span-2 bg-white border border-[#E0D8CF] rounded-2xl text-left shadow-xs overflow-hidden divide-y divide-[#F2EDE4]">
                
                {/* GPay/PhonePe */}
                <div 
                  onClick={() => setSelectedMethod('gpay')}
                  className={`p-5 flex items-center justify-between cursor-pointer transition-colors ${selectedMethod === 'gpay' ? 'bg-[#FAF7F2]' : 'hover:bg-stone-50'}`}
                >
                  <div className="flex items-center space-x-4">
                    <Smartphone size={20} className="text-stone-700" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-800">UPI Payments (GPay/PhonePe)</h4>
                      <p className="text-[10px] text-stone-400">Secure instant bank transfers using UPI pin keys.</p>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    checked={selectedMethod === 'gpay'}
                    onChange={() => setSelectedMethod('gpay')}
                    className="text-amber-700 focus:ring-amber-500"
                  />
                </div>

                {/* Credit Card */}
                <div 
                  onClick={() => setSelectedMethod('card')}
                  className={`p-5 flex items-center justify-between cursor-pointer transition-colors ${selectedMethod === 'card' ? 'bg-[#FAF7F2]' : 'hover:bg-stone-50'}`}
                >
                  <div className="flex items-center space-x-4">
                    <CreditCard size={20} className="text-stone-700" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-800">Credit / Debit Cards</h4>
                      <p className="text-[10px] text-stone-400">Accepting Visa, Mastercard, and RuPay cards.</p>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    checked={selectedMethod === 'card'}
                    onChange={() => setSelectedMethod('card')}
                    className="text-amber-700 focus:ring-amber-500"
                  />
                </div>

                {/* Cash on Delivery */}
                <div 
                  onClick={() => setSelectedMethod('cod')}
                  className={`p-5 flex items-center justify-between cursor-pointer transition-colors ${selectedMethod === 'cod' ? 'bg-[#FAF7F2]' : 'hover:bg-stone-50'}`}
                >
                  <div className="flex items-center space-x-4">
                    <Banknote size={20} className="text-stone-700" />
                    <div>
                      <h4 className="text-xs font-bold text-stone-800">Cash on Delivery (COD)</h4>
                      <p className="text-[10px] text-stone-400">Hand over Cash directly to our white-glove delivery boys upon room installation.</p>
                    </div>
                  </div>
                  <input 
                    type="radio" 
                    checked={selectedMethod === 'cod'}
                    onChange={() => setSelectedMethod('cod')}
                    className="text-amber-700 focus:ring-amber-500"
                  />
                </div>

              </div>

              {/* RIGHT: COST SHEET */}
              <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl space-y-4 shadow-xs">
                <h3 className="font-serif text-sm font-black text-[#3D2B1F] pb-3 border-b border-[#E0D8CF]">Financial Ledger</h3>
                
                <div className="space-y-2.5 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Furniture subtotals</span>
                    <span>₹{subTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>White-Glove installation</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{gstValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E0D8CF] flex justify-between items-baseline bg-transparent">
                  <span className="text-sm font-bold text-amber-950">Grand Net Total</span>
                  <span className="text-xl font-black text-amber-950">
                    ₹{finalBill.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  id="place-order-payment-btn"
                >
                  <Lock size={14} /> Place Secure Order
                </button>

                <div className="text-stone-400 text-[10px] text-center pt-2 flex items-center justify-center gap-1">
                  🔒 Secured with AES 256-bit SSL transaction encryption
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
