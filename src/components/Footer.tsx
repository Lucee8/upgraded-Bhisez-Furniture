import { useState } from 'react';
import { ViewState } from '../types';
import bhisezLogo from "../public/images/bhisez logo.png";
interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#F5F5F5] text-[#555555] border-t border-[#E2E2E2] pt-14 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      
      {/* Decorative Teal Brand Accent line */}
      <div className="h-1 bg-gradient-to-r from-[#3F8F91] via-[#2F7779] to-[#3F8F91] mb-12 rounded-full"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer select-none"
          >
<img
  src={bhisezLogo}
  alt="Bhisez Furniture"
  className="h-11 sm:h-14 w-auto object-contain"
/>
          </div>
          <p className="text-xs text-[#555555] leading-relaxed max-w-sm">
            Handcrafted with solid teak, sheesham, and mango hardwoods based out of the premium coastal region of Malvan & Sukalwad, Sindhudurg since 2010. Designed to outlast trends.
          </p>
          <div className="text-[11px] font-mono text-[#C99A3A] font-bold tracking-wider">
            ESTD. 2010 · SINDHUDURG, MH
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-sans text-[#222222] text-sm font-bold tracking-wider uppercase mb-5">Quick Links</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#3F8F91] transition-colors cursor-pointer bg-transparent border-none text-[#555555]">
                Home Showcase
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('beds')} className="hover:text-[#3F8F91] transition-colors cursor-pointer bg-transparent border-none text-[#555555]">
                All Products & Beds
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('showroom')} className="hover:text-[#3F8F91] transition-colors cursor-pointer bg-transparent border-none text-[#555555]">
                Visits & Walkthroughs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-[#3F8F91] transition-colors cursor-pointer bg-transparent border-none text-[#555555]">
                Our Story & Wood Grades
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="font-sans text-[#222222] text-sm font-bold tracking-wider uppercase mb-5">Our Showrooms</h4>
          <ul className="space-y-4 text-xs text-[#555555]">
            <li className="flex items-start space-x-2">
              <span className="text-[#3F8F91]">📍</span>
              <span>
                <strong className="text-[#222222]">Malvan Showroom:</strong><br />
                Main Market Road, Malvan, Sindhudurg, Maharashtra – 416606
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#3F8F91]">📍</span>
              <span>
                <strong className="text-[#222222]">Sukalwad Showroom:</strong><br />
                NH-66 Highway, Sukalwad, Sindhudurg, Maharashtra – 416520
              </span>
            </li>
          </ul>
        </div>

        {/* Help Column */}
        <div>
          <h4 className="font-sans text-[#222222] text-sm font-bold tracking-wider uppercase mb-5">Support & Sales</h4>
          <p className="text-xs text-[#555555] leading-relaxed mb-4">
            Get instant price quotes or customise design widths, depths or polish stains over WhatsApp.
          </p>
          <div className="flex flex-col space-y-2">
            <a 
              href="https://wa.me/917057441122?text=Hi Bhisez! I'd like to get a pricing quote for teak furniture." 
              target="_blank" 
              rel="noreferrer"
              className="text-center bg-[#3F8F91] hover:bg-[#2F7779] text-white font-bold text-xs py-2.5 px-4 rounded-md transition-colors shadow-xs"
            >
              💬 Chat on WhatsApp
            </a>
            <a 
              href="tel:+917057441122" 
              className="text-center border border-[#E2E2E2] text-[#222222] hover:bg-white text-xs font-semibold py-2.5 px-4 rounded-md transition-all"
            >
              📞 Call +91 70574 41122
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-[#E2E2E2] flex flex-col md:flex-row justify-between items-center text-xs text-[#777777]">
        <p>© 2026 Bhisez Furniture. Handcrafted with Care in Southern Konkan (Maharashtra). All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <button onClick={() => onNavigate('contact')} className="hover:underline bg-transparent border-none text-[#777777] cursor-pointer">Inquire</button>
          <span>·</span>
          <span className="text-[#C99A3A] font-medium">Bhisez Master Timber Designs</span>
        </div>
      </div>

    </footer>
  );
}
