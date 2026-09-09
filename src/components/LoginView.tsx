import React, { useState } from 'react';
import { ViewState } from '../types';
import { 
  Mail, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface LoginViewProps {
  onNavigate: (view: ViewState) => void;
  onLoginSuccess: () => void;
}

export default function LoginView({
  onNavigate,
  onLoginSuccess,
}: LoginViewProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // validations
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Delay callback to show welcome screen
      setTimeout(() => {
        onLoginSuccess();
        onNavigate('home');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white border border-[#E0D8CF] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden">
        
        {/* SUCCESS OVERLAY */}
        {isSuccess && (
          <div className="absolute inset-0 bg-[#3D2B1F]/95 z-50 flex flex-col items-center justify-center text-center p-6 space-y-4 animate-scale-in">
            <div className="w-14 h-14 bg-[#E8B84B] text-amber-950 rounded-full flex items-center justify-center font-bold text-2xl animate-bounce">
              ✓
            </div>
            <h2 className="font-serif text-xl font-bold text-amber-50">Welcome Back!</h2>
            <p className="text-xs text-[#E8DDD1] font-light leading-relaxed">
              Login authenticated successfully. Redirecting you safely back to our furniture showroom...
            </p>
          </div>
        )}

        <div className="text-center space-y-2">
          <span className="text-[10px] font-black tracking-widest text-[#8B6F5C] uppercase block">exclusive member portal</span>
          <h1 className="font-serif text-2xl font-black text-amber-950 leading-tight">MEMBER LOG IN</h1>
          <p className="text-[11px] text-stone-500 font-light">Access your wishlists, quotes lists, and premier delivery schedules.</p>
        </div>

        {/* MOCK GOOGLE LOGIN */}
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setIsSuccess(true);
              setTimeout(() => { onLoginSuccess(); onNavigate('home'); }, 1500);
            }, 1000);
          }}
          className="w-full py-2.5 border border-[#E0D8CF] hover:border-[#3D2B1F] rounded-xl text-xs font-bold text-[#3D2B1F] flex items-center justify-center gap-2 transition-all cursor-pointer bg-white"
        >
          <svg width="14" height="14" viewBox="0 0 18 18">
            <path d="M17.64 9.2a10.34 10.34 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26a5.4 5.4 0 0 1-8.05-2.84H.96v2.33A9 9 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.99 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.97a9 9 0 0 0 0 8.08l3.02-2.33z" fill="#FBBC05"/>
            <path d="M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .97 4.96L4 7.29A5.36 5.36 0 0 1 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase tracking-widest bg-transparent">
          <span className="h-px bg-[#E0D8CF] flex-1"></span>
          <span className="px-3">or email credentials</span>
          <span className="h-px bg-[#E0D8CF] flex-1"></span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-2.5 rounded-lg text-center text-xs leading-normal">
              {errorMsg}
            </div>
          )}

          {/* Email input */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                placeholder="E.g. youname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#E0D8CF] focus:ring-1 focus:ring-amber-500 bg-[#FAF7F2] rounded-xl pl-9 pr-4 py-2.5 text-xs text-stone-800 outline-none"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col space-y-1">
            <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#E0D8CF] focus:ring-1 focus:ring-amber-500 bg-[#FAF7F2] rounded-xl pl-9 pr-10 py-2.5 text-xs text-stone-800 outline-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 bg-transparent border-none cursor-pointer"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Checkboxes remember me */}
          <div className="flex justify-between items-center text-xs text-stone-400 font-bold uppercase tracking-wider">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="rounded-xs border-[#E0D8CF] text-amber-700" />
              <span>Remember me</span>
            </label>
            <button 
              type="button" 
              onClick={() => alert('A Password Reset link has been dispatched to your email coordinates.')}
              className="hover:underline text-[#3D2B1F] bg-transparent border-none font-bold cursor-pointer"
            >
              Forgot?
            </button>
          </div>

          {/* Login button cta */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#3D2B1F] hover:bg-stone-900 text-amber-50 text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            id="login-submit-btn"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={14} />
          </button>

        </form>

        <p className="text-center text-xs text-stone-500 font-light">
          Don't have an account? <button onClick={() => alert('Custom accounts are preconfigured from showroom logs. Click standard login options or GPay to access.')} className="text-[#3D2B1F] font-bold hover:underline bg-transparent border-none cursor-pointer">Create account free</button>
        </p>

        {/* Bottom security strip */}
        <div className="border-t border-[#E0D8CF]/60 pt-4 flex justify-between text-[10px] text-stone-400 font-semibold tracking-wide">
          <span className="flex items-center gap-1"><ShieldCheck size={11} className="text-stone-400" /> SSL secure</span>
          <span>5000+ members</span>
        </div>

      </div>
    </div>
  );
}
