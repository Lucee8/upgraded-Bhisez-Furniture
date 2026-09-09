import { ViewState, Product } from '../types';
import { ALL_PRODUCTS } from '../data';
import { 
  Heart, 
  ShoppingCart, 
  MessageCircle, 
  X,
  Trash2
} from 'lucide-react';

interface WishlistViewProps {
  onNavigate: (view: ViewState) => void;
  onSelectProduct: (id: string | number) => void;
  onToggleWishlist: (id: string | number) => void;
  wishlist: (string | number)[];
  products?: Product[];
}

export default function WishlistView({
  onNavigate,
  onSelectProduct,
  onToggleWishlist,
  wishlist,
  products
}: WishlistViewProps) {
  const wishlistedItems = (products || ALL_PRODUCTS).filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl font-black text-[#3D2B1F] mb-1">My Wishlist</h1>
        <p className="text-xs text-stone-500 mb-8">{wishlistedItems.length} design{wishlistedItems.length === 1 ? '' : 's'} saved</p>

        {wishlistedItems.length === 0 ? (
          <div className="bg-white border border-[#E0D8CF] rounded-2xl p-16 text-center space-y-4 shadow-xs">
            <div className="text-4xl">🤍</div>
            <h3 className="font-serif text-lg font-bold text-[#3D2B1F]">Your Wishlist is Empty</h3>
            <p className="text-stone-500 text-xs max-w-sm mx-auto leading-relaxed">
              Seal designs you love by clicking the heart button on lists! They will appear here for easy trackings.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedItems.map((p) => {
              const disc = p.orig && p.orig > 0 ? Math.round((1 - p.price / p.orig) * 100) : 0;
              return (
                <div 
                  key={p.id}
                  onClick={() => onSelectProduct(p.id)}
                  className="bg-white border border-[#E0D8CF] hover:border-[#C9983A] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-amber-50/20 overflow-hidden">
                    <img 
                      src={p.img} 
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* remove direct heart clicker */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(p.id);
                      }}
                      className="absolute top-3.5 right-3.5 p-1.5 bg-white/95 rounded-full shadow-md text-stone-500 hover:text-stone-800"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-1">SAVED TIMBER DESIGN</span>
                      <h3 className="font-serif text-sm font-bold text-[#3D2B1F] line-clamp-2 leading-tight group-hover:text-amber-800 transition-colors">
                        {p.name}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-[#F2EDE4] flex justify-between items-center bg-transparent">
                      <div className="flex flex-col">
                        {p.price > 0 ? (
                          <>
                            <span className="text-sm font-black text-amber-950">
                              ₹{p.price.toLocaleString('en-IN')}
                            </span>
                            {p.orig && p.orig > 0 && (
                              <div className="flex items-center space-x-1">
                                <span className="text-[10px] text-stone-400 line-through">₹{p.orig.toLocaleString('en-IN')}</span>
                                <span className="text-[10px] text-emerald-600 font-bold">({disc}% off)</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-xs font-bold text-amber-700">Enquiry Quote</span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(p.id);
                          }}
                          className="p-2 border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-500 rounded-md transition-colors cursor-pointer bg-transparent"
                          title="Remove"
                        >
                          <Trash2 size={13} />
                        </button>

                        <a 
                          href={`https://wa.me/917057441122?text=${encodeURIComponent(`Hi Bhisez! I am interested in ordering/getting a quote for: ${p.name}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#25D366] text-white hover:bg-[#1ebd59] text-[11px] font-bold px-3 py-2 rounded-md flex items-center gap-1 shadow-xs"
                        >
                          <MessageCircle size={12} /> Enquire
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
