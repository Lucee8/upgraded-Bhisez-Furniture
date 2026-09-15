import { useState } from 'react';
import { ViewState } from '../types';
import BhisezLogo from './BhisezLogo';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#42170B] text-stone-300 border-t-2 border-[#5F220F] pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      
      {/* Wooden Strip pattern decor in Brand Colors */}
      <div className="h-2 bg-gradient-to-r from-[#5F220F] via-[#FFC102] to-[#5F220F] mb-12 rounded-full opacity-80"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer select-none transition-transform hover:opacity-95"
          >
            <BhisezLogo onDark={true} showBadgeIcon={true} />
          </div>
          <p className="text-xs text-[#EADBD2]/80 leading-relaxed max-w-sm font-light">
            Handcrafted with seasoned solid teak, sheesham, and tropical hardwoods based out of Malvan & Sukalwad, Sindhudurg since 2010. Designed to outlast trends.
          </p>
          <div className="text-[11px] font-mono text-[#FFC102] tracking-wider font-bold">
            ESTD. 2010 · SINDHUDURG, MH
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-serif text-[#FFC102] text-sm font-bold tracking-wider uppercase mb-5">Quick Links</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#FFC102] transition-colors cursor-pointer bg-transparent border-none text-[#EADBD2]/90">
                Home Showcase
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('beds')} className="hover:text-[#FFC102] transition-colors cursor-pointer bg-transparent border-none text-[#EADBD2]/90">
                All Products & Beds
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('showroom')} className="hover:text-[#FFC102] transition-colors cursor-pointer bg-transparent border-none text-[#EADBD2]/90">
                Visits & Walkthroughs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#FFC102] transition-colors cursor-pointer bg-transparent border-none text-[#EADBD2]/90">
                Our Story & Wood Grades
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="font-serif text-[#FFC102] text-sm font-bold tracking-wider uppercase mb-5">Our Showrooms</h4>
          <ul className="space-y-4 text-xs text-[#EADBD2]/90">
            <li className="flex items-start space-x-2">
              <span className="text-[#FFC102]">📍</span>
              <span>
                <strong className="text-white">Malvan Showroom:</strong><br />
                Main Market Road, Malvan, Sindhudurg, Maharashtra – 416606
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#FFC102]">📍</span>
              <span>
                <strong className="text-white">Sukalwad Showroom:</strong><br />
                NH-66 Highway, Sukalwad, Sindhudurg, Maharashtra – 416520
              </span>
            </li>
          </ul>
        </div>

        {/* Help Column */}
        <div>
          <h4 className="font-serif text-[#FFC102] text-sm font-bold tracking-wider uppercase mb-5">Support & Sales</h4>
          <p className="text-xs text-[#EADBD2]/80 leading-relaxed mb-4 font-light">
            Get instant price quotes or customise design widths, depths or polish stains over WhatsApp.
          </p>
          <div className="flex flex-col space-y-2">
            <a 
              href="https://wa.me/917057441122?text=Hi Bhisez! I'd like to get a pricing quote for teak furniture." 
              target="_blank" 
              rel="noreferrer"
              className="text-center bg-[#FFC102] hover:bg-[#E5AC00] text-[#5F220F] font-black text-xs py-2.5 px-4 rounded-lg transition-colors shadow-xs"
            >
              💬 Chat on WhatsApp
            </a>
            <a 
              href="tel:+917057441122" 
              className="text-center border border-[#FFC102]/30 text-white hover:bg-[#5F220F] text-xs font-semibold py-2 px-4 rounded-lg transition-all"
            >
              📞 Call +91 70574 41122
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#5F220F]/60 flex flex-col md:flex-row justify-between items-center text-xs text-[#EADBD2]/60">
        <p>© 2026 Bhisez Furniture. Handcrafted with Care in Southern Konkan (Maharashtra). All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button onClick={() => onNavigate('contact')} className="hover:underline bg-transparent border-none text-[#EADBD2]/80 cursor-pointer">Inquire</button>
          <span>·</span>
          <span className="text-[#FFC102] font-semibold">Bhisez Master Solid Hardwoods</span>
        </div>
      </div>

    </footer>
  );
}
