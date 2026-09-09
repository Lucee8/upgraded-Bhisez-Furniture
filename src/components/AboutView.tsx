import { ViewState } from '../types';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  Settings,
  TreePine,
  HelpCircle,
  Clock
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: ViewState) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Brand Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-black tracking-widest text-[#C9983A] uppercase block">BHISSE'Z LEGACY SINCE 2010</span>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-amber-950 leading-tight">
              Crafted with Soul.<br />Made to Outlast Generations.
            </h1>
            
            <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
              We are more than just a brand catalog. We are carpenter-led team who believe that seasoned Teakwood, Sheesham (Indian Rosewood), and Mango timber holds active soul within its grains. What started as Bhisez standalone Southern Konkan workshop has evolved into Sindhudurg’s most reliable custom woodwork house.
            </p>

            <div className="flex border-l-2 border-[#C9983A] pl-4 italic text-stone-500 text-xs leading-relaxed max-w-sm">
              "We season every timber log under the coastal atmospheric moisture levels so that your beds, mandirs, and dining suites do not creak or distort." <br />— Bhisez Artisans
            </div>
          </div>

          <div className="relative aspect-1.3/1 rounded-3xl overflow-hidden border border-[#E0D8CF] shadow-sm bg-amber-50">
            <img 
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80" 
              alt="Timber carpentry seasoning models showcase" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-stone-950/60 p-4 text-center">
              <span className="text-white text-xs font-serif italic">Bhisez master artisans, managing woodcarvings to custom polishes</span>
            </div>
          </div>

        </section>

        {/* STATS MATRIX */}
        <section className="bg-white border border-[#E0D8CF] rounded-3xl p-8 sm:p-12 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
          
          <div className="space-y-2">
            <span className="font-serif text-4xl font-extrabold text-[#C9983A] block leading-none">16+</span>
            <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">Years of Craft</span>
          </div>

          <div className="space-y-2 pt-4 sm:pt-0">
            <span className="font-serif text-4xl font-extrabold text-[#C9983A] block leading-none">2</span>
            <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">Showroom tiers</span>
          </div>

          <div className="space-y-2 pt-4 lg:pt-0">
            <span className="font-serif text-4xl font-extrabold text-[#C9983A] block leading-none">5,000+</span>
            <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">Happy Konkan Homes</span>
          </div>

          <div className="space-y-2 pt-4 lg:pt-0">
            <span className="font-serif text-4xl font-extrabold text-[#C9983A] block leading-none">3</span>
            <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">Districts active Delivery</span>
          </div>

        </section>

        {/* CORE SOLID TIMBER STANDARDS */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#8B6F5C] uppercase tracking-wider block">Material Standards</span>
            <h2 className="font-serif text-2xl font-black text-amber-950">Timber Wisdom We Adhere to</h2>
            <p className="text-stone-500 text-xs leading-relaxed font-light">We do not use structural MDF, fragile particle dust boards, or standard laminates under structural points.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-600">
            
            <div className="bg-white border border-[#E0D8CF] p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center text-amber-700">🌲</div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-950">Seasoned Teak Wood</h4>
              <p className="leading-relaxed font-light">Known as the king of timber. Resists natural moisture distortions and termites. We season teak elements inside specialized drafts to lock wood grain cells.</p>
            </div>

            <div className="bg-white border border-[#E0D8CF] p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center text-amber-700">🍁</div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-950">Indian Rosewood (Sheesham)</h4>
              <p className="leading-relaxed font-light">Offers a rich, dark marbling texture. Dense structure capable of sustaining high weights. Built for heavy double-beds and safety gate boards.</p>
            </div>

            <div className="bg-white border border-[#E0D8CF] p-6 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center text-amber-700">🍂</div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-950">Durable Mango Timber</h4>
              <p className="leading-relaxed font-light">Eco-friendly and has unique wild grain. Best suited for bedside drawers and storage chests where lightweight, tough boards are optimal.</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
