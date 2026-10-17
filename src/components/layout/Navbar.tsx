'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry?: () => void;
}

export function SmilingFlowerIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="24"
      height="24"
      style={{ width: 24, height: 24, minWidth: 24, minHeight: 24 }}
      className={`${className} flex-shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 6 Petals radially positioned at 60 deg increments */}
      <circle cx="22" cy="16" r="4.5" fill="#FFD400" stroke="#211529" strokeWidth="1.6" />
      <circle cx="19" cy="21.2" r="4.5" fill="#FFD400" stroke="#211529" strokeWidth="1.6" />
      <circle cx="13" cy="21.2" r="4.5" fill="#FFD400" stroke="#211529" strokeWidth="1.6" />
      <circle cx="10" cy="16" r="4.5" fill="#FFD400" stroke="#211529" strokeWidth="1.6" />
      <circle cx="13" cy="10.8" r="4.5" fill="#FFD400" stroke="#211529" strokeWidth="1.6" />
      <circle cx="19" cy="10.8" r="4.5" fill="#FFD400" stroke="#211529" strokeWidth="1.6" />

      {/* Flower Center Disc */}
      <circle cx="16" cy="16" r="6.2" fill="#FFD400" stroke="#211529" strokeWidth="1.6" />

      {/* Smiling Face */}
      <circle cx="14" cy="14.8" r="1.1" fill="#211529" />
      <circle cx="18" cy="14.8" r="1.1" fill="#211529" />
      <path
        d="M 13.6 17.6 Q 16 20.2 18.4 17.6"
        stroke="#211529"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const pathname = usePathname();
  const isArtists = pathname === '/artists';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      const el =
        document.getElementById(targetId) ||
        (targetId === 'playground' ? document.getElementById('character-lab') : null);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSayHiClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (onOpenInquiry) {
      e.preventDefault();
      onOpenInquiry();
    } else {
      handleNavClick(e, 'contact');
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
      {/* Left: Playful Logo */}
      <div className="flex flex-col select-none">
        <Link
          href="/"
          className="group relative inline-flex items-center select-none font-fredoka font-black text-4xl text-[#FFD400] tracking-normal leading-none"
          style={{
            WebkitTextStroke: '6px #211529',
            paintOrder: 'stroke fill',
            filter: 'drop-shadow(0px 4px 0px #211529)',
          }}
          aria-label="epiphrame"
        >
          <span>ep</span>
          <span className="relative inline-flex items-center justify-center">
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none group-hover:rotate-180 transition-transform duration-500 origin-center filter drop-shadow-[0_2px_0_#211529]">
              <SmilingFlowerIcon className="w-7 h-7" />
            </span>
            <span>i</span>
          </span>
          <span>phrame</span>
        </Link>
      </div>

      {/* Right Desktop: Comic Pill Buttons */}
      <nav className="hidden md:flex items-center gap-3" aria-label="Main Navigation">
        <Link
          href={isArtists ? '/#showcase' : '#showcase'}
          onClick={(e) => handleNavClick(e, 'showcase')}
          className="bg-white/85 backdrop-blur-md text-[#211529] border border-white/40 shadow-soft-1 hover:translate-y-0.5 hover:shadow-soft-2 transition-all rounded-full px-5 py-2 font-bold text-xs uppercase tracking-wider select-none inline-flex items-center justify-center"
        >
          OUR DELIVERABLES
        </Link>
        <Link
          href="/artists"
          className="bg-white/85 backdrop-blur-md text-[#211529] border border-white/40 shadow-soft-1 hover:translate-y-0.5 hover:shadow-soft-2 transition-all rounded-full px-5 py-2 font-bold text-xs uppercase tracking-wider select-none inline-flex items-center justify-center"
        >
          MEET THE ARTISTS
        </Link>
        <Link
          href={isArtists ? '/#character-lab' : '#character-lab'}
          onClick={(e) => handleNavClick(e, 'character-lab')}
          className="bg-white/85 backdrop-blur-md text-[#211529] border border-white/40 shadow-soft-1 hover:translate-y-0.5 hover:shadow-soft-2 transition-all rounded-full px-5 py-2 font-bold text-xs uppercase tracking-wider select-none inline-flex items-center justify-center"
        >
          CHARACTER LAB
        </Link>
        <a
          href={isArtists ? '/#contact' : '#contact'}
          onClick={handleSayHiClick}
          className="bg-[#FFD400] text-[#211529] border border-black/10 shadow-soft-1 hover:translate-y-0.5 hover:shadow-soft-2 transition-all rounded-full px-5 py-2 font-bold text-xs uppercase tracking-wider select-none inline-flex items-center justify-center cursor-pointer"
        >
          SAY HI!
        </a>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2.5 bg-white/85 backdrop-blur-md text-[#211529] border border-white/40 rounded-full shadow-soft-1 hover:translate-y-0.5 hover:shadow-soft-2 transition-all flex items-center justify-center cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-soft-lg flex flex-col gap-2.5 md:hidden z-50">
          <Link
            href={isArtists ? '/#showcase' : '#showcase'}
            onClick={(e) => handleNavClick(e, 'showcase')}
            className="w-full text-center bg-white/80 text-[#211529] border border-black/5 shadow-soft-1 hover:translate-y-0.5 transition-all rounded-full px-5 py-2.5 font-bold text-xs uppercase tracking-wider block"
          >
            OUR DELIVERABLES
          </Link>
          <Link
            href="/artists"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center bg-white/80 text-[#211529] border border-black/5 shadow-soft-1 hover:translate-y-0.5 transition-all rounded-full px-5 py-2.5 font-bold text-xs uppercase tracking-wider block"
          >
            MEET THE ARTISTS
          </Link>
          <Link
            href={isArtists ? '/#character-lab' : '#character-lab'}
            onClick={(e) => handleNavClick(e, 'character-lab')}
            className="w-full text-center bg-white/80 text-[#211529] border border-black/5 shadow-soft-1 hover:translate-y-0.5 transition-all rounded-full px-5 py-2.5 font-bold text-xs uppercase tracking-wider block"
          >
            CHARACTER LAB
          </Link>
          <a
            href={isArtists ? '/#contact' : '#contact'}
            onClick={handleSayHiClick}
            className="w-full text-center bg-[#FFD400] text-[#211529] border border-black/10 shadow-soft-1 hover:translate-y-0.5 transition-all rounded-full px-5 py-2.5 font-bold text-xs uppercase tracking-wider block cursor-pointer"
          >
            SAY HI!
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
