import React, { useState } from 'react';
import { ShowroomWalkthrough } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  Clock, 
  MapPin, 
  Compass, 
  Sparkles,
  Phone,
  BookmarkCheck,
  Building
} from 'lucide-react';

interface ShowroomViewProps {
  onAddInquiry?: (inquiry: {
    name: string;
    phone: string;
    city: string;
    subject: string;
    message: string;
    customLength?: string;
    customWidth?: string;
    woodGrade?: string;
  }) => void;
}

export default function ShowroomView({ onAddInquiry }: ShowroomViewProps) {
  const [activeShowroom, setActiveShowroom] = useState<'malvan' | 'sukalwad'>('malvan');
  const [walkthroughForm, setWalkthroughForm] = useState<ShowroomWalkthrough>({
    name: '',
    phone: '',
    location: 'malvan',
    date: '',
    category: 'Beds & Bedroom Furniture',
    notes: ''
  });
  const [scheduled, setScheduled] = useState<boolean>(false);

  // Custom Sizing & Wood Grade states for showroom walkthroughs
  const [useCustomGrid, setUseCustomGrid] = useState<boolean>(false);
  const [customLength, setCustomLength] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<string>('');
  const [woodGrade, setWoodGrade] = useState<string>('Grade-A Sagwan');

  const handleBookWalkthrough = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkthroughForm.name || !walkthroughForm.phone || !walkthroughForm.date) {
      alert('Please fill out Name, Phone, and Preferred Date.');
      return;
    }
    setScheduled(true);

    const customDetailsText = useCustomGrid 
      ? `\n[Custom Sizing Grid - Length: ${customLength || 'Custom'} inches | Width: ${customWidth || 'Custom'} inches | Wood Grade: ${woodGrade}]`
      : '';

    if (onAddInquiry) {
      onAddInquiry({
        name: walkthroughForm.name,
        phone: walkthroughForm.phone,
        city: walkthroughForm.location === 'malvan' ? 'Malvan' : 'Sukalwad',
        subject: 'Showroom visit guide',
        message: `Walkthrough booked for: ${walkthroughForm.date}. Interested category: ${walkthroughForm.category}. Notes: ${walkthroughForm.notes || 'None'}${customDetailsText}`,
        customLength: useCustomGrid ? customLength : '',
        customWidth: useCustomGrid ? customWidth : '',
        woodGrade: useCustomGrid ? woodGrade : ''
      });
    }

    const textPayload = `Hi Bhisez! I would like to schedule a showroom walkthrough.
Name: ${walkthroughForm.name}
Phone: ${walkthroughForm.phone}
Location: ${walkthroughForm.location === 'malvan' ? 'Malvan Flagship' : 'Sukalwad Highway'}
Date: ${walkthroughForm.date}
Interests: ${walkthroughForm.category}${useCustomGrid ? `\n--- Custom Sizing Grid --- \nLength: ${customLength || 'Custom'} inches\nWidth: ${customWidth || 'Custom'} inches\nWood Grade: ${woodGrade}\n-------------------------` : ''}
Notes: ${walkthroughForm.notes}`;

    // Open prefilled WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/917057441122?text=${encodeURIComponent(textPayload)}`, '_blank');
    }, 1200);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-black tracking-widest text-[#8B6F5C] uppercase block">Malvan & Sukalwad · Seasoned logs</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3D2B1F] leading-tight">Come. Touch. Feel.<br /><span className="text-[#C9983A] italic">Experience.</span></h1>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
            No screen does absolute justice to the seasoned warmth of Indian timber grains. Walk through our model layouts, pull out drawers, open cupboards, and pick the heirloom of your dreams.
          </p>
          
          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={() => setActiveShowroom('malvan')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeShowroom === 'malvan' ? 'bg-[#3D2B1F] text-amber-50' : 'bg-white text-[#3D2B1F] border border-[#E0D8CF] hover:border-[#3D2B1F]'}`}
            >
              Showroom 01: Malvan Flagship
            </button>
            <button
              onClick={() => setActiveShowroom('sukalwad')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeShowroom === 'sukalwad' ? 'bg-[#3D2B1F] text-amber-50' : 'bg-white text-[#3D2B1F] border border-[#E0D8CF] hover:border-[#3D2B1F]'}`}
            >
              Showroom 02: Sukalwad Highway
            </button>
          </div>
        </div>

        {/* ACTIVE SHOWROOM BLOCK MAP + INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* MAP WRAPPER FRAME (Live responsive CSS frame) */}
          <div className="relative rounded-3xl overflow-hidden border border-[#E0D8CF] bg-stone-100 min-h-[350px] lg:min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowroom}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full"
              >
                {activeShowroom === 'malvan' ? (
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d973.6092088653397!2d73.47889493193321!3d16.056605625082074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0039d343d37b9%3A0x121c449423322376!2sGEETA&#39;S%20MASALE!5e0!3m2!1sen!2sin!4v1779375697198!5m2!1sen!2sin" 
                    className="w-full h-full border-none absolute inset-0"
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Malvan Showroom Map Location"
                  />
                ) : (
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.1322302594413!2d73.66784539999999!3d16.110459199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc01102233f4645%3A0xff582a22c3afe5b!2sBhisez%20furniture!5e0!3m2!1sen!2sin!4v1779367807161!5m2!1sen!2sin" 
                    className="w-full h-full border-none absolute inset-0" 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sukalwad Showroom Map Location"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ACTIVE LOCATION INFO SLAT */}
          <div className="bg-white border border-[#E0D8CF] p-8 rounded-3xl flex flex-col justify-between overflow-hidden relative min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowroom}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-rose-600 bg-transparent">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Open Today · Mon-Sat</span>
                  </div>

                  <h2 className="font-serif text-2xl font-black text-amber-950">
                    {activeShowroom === 'malvan' ? 'Malvan Flagship Showroom' : 'Sukalwad Highway Showroom'}
                  </h2>
                  
                  <p className="text-stone-500 text-xs leading-relaxed font-light">
                    {activeShowroom === 'malvan' 
                      ? 'Our primary flagship studio established in 2010. Spread over 3 curated floors showcasing rich living, master beds, and pooja mandirs setups.' 
                      : 'Located directly on the NH-66 highway for easy access. Our largest showroom spanning 6,800 sq.ft on a single ground tier, exhibiting massive cabinets, sideboards, and heavy double beds.'
                    }
                  </p>

                  <div className="space-y-3.5 pt-4">
                    <div className="flex items-start space-x-3 text-xs text-stone-600">
                      <MapPin size={16} className="text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-800">Address</span>
                        <p className="mt-0.5">
                          {activeShowroom === 'malvan' 
                            ? 'Main Market Road, Malvan, Sindhudurg, Maharashtra – 416606' 
                            : 'NH-66 Highway, Sukalwad, Sindhudurg, Maharashtra – 416520'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs text-stone-600">
                      <Clock size={16} className="text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-800">Hours</span>
                        <p className="mt-0.5">10:00 AM – 7:30 PM (Sunday Closed)</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs text-stone-600">
                      <Building size={16} className="text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-800">Concourse Floor Area</span>
                        <p className="mt-0.5">{activeShowroom === 'malvan' ? '4,200 sq.ft (3 floors model rooms)' : '6,800 sq.ft (Ground level access)'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#F2EDE4] bg-transparent">
                  <a 
                    href={activeShowroom === 'malvan' ? 'https://maps.google.com/?q=Malvan+Maharashtra' : 'https://maps.google.com/?q=Sukalwad+Sindhudurg+Maharashtra'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-[#3D2B1F] hover:bg-[#1C120A] text-amber-50 font-bold text-xs py-3.5 rounded-xl transition-colors active:scale-95 duration-200"
                  >
                    🗺️ Open in Google Maps
                  </a>
                  <a 
                    href={`https://wa.me/917057441122?text=${encodeURIComponent(`Hi Bhisez! I'd like to visit the ${activeShowroom === 'malvan' ? 'Malvan' : 'Sukalwad'} Showroom.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center border border-[#E0D8CF] hover:bg-stone-50 text-[#3D2B1F] text-xs font-bold py-3.5 rounded-xl transition-all active:scale-95 duration-200"
                  >
                    💬 Ask Directions
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* LANDMARKS / HOW TO REACH */}
        <div className="bg-white border border-[#E0D8CF] p-6 sm:p-8 rounded-3xl space-y-6 shadow-xs">
          <h3 className="font-serif text-sm font-black text-amber-950 uppercase tracking-widest pb-3 border-b border-[#E0D8CF]">
            Showroom Landmarks & Accessibility
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-stone-600">
            {activeShowroom === 'malvan' ? (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center shrink-0">🚌</div>
                  <div>
                    <span className="font-bold text-stone-800">Malvan Bus Stand</span>
                    <p className="mt-0.5">Approx. 350 meters walk, easily accessed within 2-3 mins.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center shrink-0">🏰</div>
                  <div>
                    <span className="font-bold text-stone-800">Sindhudurg Fort Jetty</span>
                    <p className="mt-0.5">Approx. 3.2 kms driving distance from Malvan flagship.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <span className="font-bold text-stone-800">Malvan Market Circle</span>
                    <p className="mt-0.5">Less than 100 meters walk from the city market square.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center shrink-0">🛣️</div>
                  <div>
                    <span className="font-bold text-stone-800">NH-66 Highway</span>
                    <p className="mt-0.5">Situated directly on the bypass side lanes, easy for trucks and cargos.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center shrink-0">🏘️</div>
                  <div>
                    <span className="font-bold text-stone-800">Sukalwad Village</span>
                    <p className="mt-0.5">Approx. 500 meters walking distance from the village panchayat.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E0D8CF] flex items-center justify-center shrink-0">🛤️</div>
                  <div>
                    <span className="font-bold text-stone-800">Kudal Junction (Railway)</span>
                    <p className="mt-0.5">Approx 18 kms drive, taking around 25 mins on smooth asphalt.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* BOOK WALKTHROUGH FORM */}
        <section className="bg-white border border-[#E0D8CF] rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start shadow-xs">
          
          {/* Left instructions block */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-bold text-[#8B6F5C] uppercase tracking-wider block">Private Walkthroughs</span>
            <h2 className="font-serif text-2xl font-black text-amber-950 leading-tight">Book a Private Guided Tour</h2>
            <p className="text-stone-500 text-xs leading-relaxed font-light">
              Are you furnishing an entire house or bedroom suite? Schedule a dedicated, 1-hour slot with Bhisez master artisans. We will have models room organized matching your wood preferences and specifications, saving you vital hours.
            </p>
            
            <div className="bg-[#FAF7F2] border border-[#E0D8CF] p-4 rounded-2xl space-y-2 text-xs text-stone-600 max-w-sm">
              <span className="text-[#C9983A] font-bold">★ What is inside the tour?</span>
              <ul className="space-y-1 list-disc pl-5">
                <li>Material seasoned grade comparative sheets</li>
                <li>Live dimension estimations with tape lines</li>
                <li>Exclusive discount quotes for composite orders</li>
              </ul>
            </div>
          </div>

          {/* Right form input slot */}
          <div className="lg:col-span-3 w-full">
            <form onSubmit={handleBookWalkthrough} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="E.g. Rajesh Patil"
                    value={walkthroughForm.name}
                    onChange={(e) => setWalkthroughForm({...walkthroughForm, name: e.target.value})}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">WhatsApp Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="E.g. +91 70574 41122"
                    value={walkthroughForm.phone}
                    onChange={(e) => setWalkthroughForm({...walkthroughForm, phone: e.target.value.replace(/[^\d+ ]/g, '')})}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Preferred Showroom *</label>
                  <select
                    value={walkthroughForm.location}
                    onChange={(e) => setWalkthroughForm({...walkthroughForm, location: e.target.value})}
                    className="bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="malvan">Malvan — Main Market Road</option>
                    <option value="sukalwad">Sukalwad — NH-66 Highway</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Preferred Date *</label>
                  <input 
                    type="date" 
                    required
                    value={walkthroughForm.date}
                    onChange={(e) => setWalkthroughForm({...walkthroughForm, date: e.target.value})}
                    className="bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">What are you looking for?</label>
                <select
                  value={walkthroughForm.category}
                  onChange={(e) => setWalkthroughForm({...walkthroughForm, category: e.target.value})}
                  className="bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option>Beds & Bedroom Furniture</option>
                  <option>Sofas & Recliners</option>
                  <option>Dining Tables & Chairs</option>
                  <option>Concealed Pooja Mandirs</option>
                  <option>Custom Handcrafted designs</option>
                </select>
              </div>

              {/* Custom Measurement Sizing Grid */}
              <div className="bg-[#FAF7F2] border border-[#E0D8CF] p-4 rounded-2xl space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={useCustomGrid}
                    onChange={(e) => setUseCustomGrid(e.target.checked)}
                    className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wide block">Need Custom Dimensions? (Length, Width & Wood Grade)</span>
                    <span className="text-[10px] text-stone-400 block">Bring pre-calculated measurements or requested timber types to the walkthrough</span>
                  </div>
                </label>

                {useCustomGrid && (
                  <div className="pt-3 border-t border-[#E0D8CF]/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-wider">Custom Length (Inches / Feet)</label>
                      <input 
                        type="text" 
                        placeholder="E.g. 78 inches"
                        value={customLength}
                        onChange={(e) => setCustomLength(e.target.value)}
                        className="bg-white border border-[#E0D8CF] rounded-xl px-3 py-2 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-wider">Custom Width (Inches / Feet)</label>
                      <input 
                        type="text" 
                        placeholder="E.g. 72 inches"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(e.target.value)}
                        className="bg-white border border-[#E0D8CF] rounded-xl px-3 py-2 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-[9px] font-black text-stone-400 uppercase tracking-wider">Timber Wood Grade Selection</label>
                      <select
                        value={woodGrade}
                        onChange={(e) => setWoodGrade(e.target.value)}
                        className="bg-white border border-[#E0D8CF] rounded-xl px-3 py-2 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500 font-bold"
                      >
                        <option value="Grade-A Sagwan">Grade-A Sagwan</option>
                        <option value="Premium Shivan">Premium Shivan</option>
                        <option value="Classic Nilgiri">Classic Nilgiri</option>
                        <option value="Standard Seasoned Teak">Standard Seasoned Teak</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Additional Notes</label>
                <textarea 
                  placeholder="E.g. Room sizing, wood grains selection, specific design codes..."
                  value={walkthroughForm.notes}
                  onChange={(e) => setWalkthroughForm({...walkthroughForm, notes: e.target.value})}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500 min-h-[70px] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-xs cursor-pointer"
                id="showroom-submit-booking-btn"
              >
                Book Guided Walkthrough
              </button>

              {scheduled && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-center text-xs flex justify-center items-center gap-1.5">
                  <BookmarkCheck size={14} className="text-emerald-600" />
                  <span>Request Transmitted! WhatsApp launch generated and pending confirm of slot.</span>
                </div>
              )}

            </form>
          </div>

        </section>

      </div>
    </div>
  );
}
