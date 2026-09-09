import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  BookmarkCheck
} from 'lucide-react';

interface ContactViewProps {
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

export default function ContactView({ onAddInquiry }: ContactViewProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [subject, setSubject] = useState<string>('Custom Furniture Inquiry');
  const [sent, setSent] = useState<boolean>(false);

  // Custom Sizing & Wood Grade states
  const [useCustomGrid, setUseCustomGrid] = useState<boolean>(false);
  const [customLength, setCustomLength] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<string>('');
  const [woodGrade, setWoodGrade] = useState<string>('Grade-A Sagwan');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert('Please fill out Name, Phone, and Message fields.');
      return;
    }
    setSent(true);

    const customDetailsText = useCustomGrid 
      ? `\n[Custom Sizing Grid - Length: ${customLength || 'Custom'} inches | Width: ${customWidth || 'Custom'} inches | Wood Grade: ${woodGrade}]`
      : '';

    if (onAddInquiry) {
      onAddInquiry({ 
        name, 
        phone, 
        city, 
        subject, 
        message: message + customDetailsText,
        customLength: useCustomGrid ? customLength : '',
        customWidth: useCustomGrid ? customWidth : '',
        woodGrade: useCustomGrid ? woodGrade : ''
      });
    }

    const payload = `Hi Bhisez! I'd like to submit an inquiry over the website.
Name: ${name}
Phone: ${phone}
City: ${city}
Subject: ${subject}${useCustomGrid ? `\n--- Custom Sizing Grid --- \nLength: ${customLength || 'Custom'} inches\nWidth: ${customWidth || 'Custom'} inches\nWood Grade: ${woodGrade}\n-------------------------` : ''}
Message: ${message}`;

    setTimeout(() => {
      window.open(`https://wa.me/917057441122?text=${encodeURIComponent(payload)}`, '_blank');
    }, 1200);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-black tracking-widest text-[#8B6F5C] uppercase block">Workshop direct link</span>
          <h1 className="font-serif text-3xl font-extrabold text-[#3D2B1F]">Connect With Bhisez</h1>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light">
            Do you require specific dimensional custom frames, polish stain guides, or catalog estimates? Submit an inquiry - we verify immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* LEFT: GENERAL CONTACT INFO CARDS */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="bg-white border border-[#E0D8CF] p-5 rounded-2xl shadow-xs space-y-4 text-xs text-stone-600">
              <h4 className="font-serif text-sm font-black text-amber-950 uppercase tracking-widest pb-3 border-b border-[#E0D8CF]">Direct contacts</h4>
              
              <div className="flex items-start space-x-3.5">
                <span className="text-lg shrink-0">📞</span>
                <div>
                  <span className="font-bold text-stone-800">Malvan Flagship Line</span>
                  <p className="mt-0.5"><a href="tel:+917057441122" className="text-[#3D2B1F] font-bold hover:underline">+91 70574 41122</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="text-lg shrink-0">💬</span>
                <div>
                  <span className="font-bold text-stone-800">WhatsApp Sales desk</span>
                  <p className="mt-0.5"><a href="https://wa.me/917057441122" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline">Message Bhisez (+91 70574 41122)</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <span className="text-lg shrink-0">🕐</span>
                <div>
                  <span className="font-bold text-stone-800">Operational Timings</span>
                  <p className="mt-0.5">Monday – Saturday: 10:00 AM – 7:30 PM (Sunday Closed)</p>
                </div>
              </div>
            </div>

            {/* Custom choice notice box */}
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl text-xs space-y-2 max-w-sm">
              <span className="font-bold flex items-center gap-1"><Sparkles size={12} className="text-amber-600" /> Custom Wood Seasoning</span>
              <p className="leading-relaxed font-light">
                Send your floor plan blueprint drawings or Pinterest furniture screenshots. Our master carpenters will advise correct thicknesses and teak grain layouts over call.
              </p>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-3 bg-white border border-[#E0D8CF] p-6 sm:p-8 rounded-3xl shadow-xs">
            
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <h3 className="font-serif text-sm font-black text-amber-950 uppercase tracking-widest pb-3 border-b border-[#E0D8CF]">Inquiry Form</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Rohan Desai"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF7F2]"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g. +91 70574 41122"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d+ ]/g, ''))}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF7F2]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option>Custom Furniture Inquiry</option>
                    <option>Product pricing quote</option>
                    <option>Showroom visit guide</option>
                    <option>Bulk/Commercial quote</option>
                    <option>Other Help</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">City</label>
                  <input
                    type="text"
                    placeholder="E.g. Malvan"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500 bg-[#FAF7F2]"
                  />
                </div>
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
                    <span className="text-[10px] text-stone-400 block">Add customized carpentry constraints directly to the live request</span>
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
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Inquiry details *</label>
                <textarea
                  required
                  placeholder="Identify your required timber woods, size configs or help details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-[#E0D8CF] rounded-xl px-4 py-2.5 text-xs text-stone-700 outline-none focus:ring-1 focus:ring-amber-500 h-24 resize-none bg-[#FAF7F2]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                id="contact-submit-inquiry-btn"
              >
                <Send size={12} /> Submit Inquiry over Web
              </button>

              {sent && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-center text-xs flex justify-center items-center gap-1.5">
                  <BookmarkCheck size={14} className="text-emerald-600" />
                  <span>Request registered! Custom quote will initiate over WhatsApp.</span>
                </div>
              )}

            </form>

          </div>

        </div>

      </div>
    </div>
  );
}
