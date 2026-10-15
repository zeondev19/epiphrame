'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('epiphrame-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('epiphrame-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleScrollTo = (targetId: string) => {
    setMobileMenuOpen(false);
    if (pathname === '/') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCommissionClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      const el = document.getElementById('commission-drawer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 h-16 px-6 md:px-12 backdrop-blur-md bg-[var(--bg-surface)]/85 border-b border-[var(--border-hairline)] z-50 flex items-center justify-between transition-colors">
      {/* a) Left Brand Logo */}
      <Link
        href="/"
        className="group flex items-center gap-2 select-none"
        aria-label="Epiphrame Home"
      >
        <span className="font-extrabold tracking-tight text-lg text-[var(--text-primary)]">
          EPIPHRAME
        </span>
        <div className="group-hover:rotate-180 transition-transform duration-500 w-6 h-6 flex-shrink-0">
          <SmilingFlowerIcon className="w-6 h-6" />
        </div>
      </Link>

      {/* b) Center Industry Navigation Links (Desktop) */}
      <nav
        className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-wider text-[var(--text-primary)]"
        aria-label="Primary Navigation"
      >
        <Link
          href={isArtists ? '/#showcase' : '#showcase'}
          onClick={() => handleScrollTo('showcase')}
          className="hover:text-[#FF425E] dark:hover:text-[#FFD400] transition-colors relative py-1"
        >
          SHOWCASE
        </Link>
        <Link
          href={isArtists ? '/#character-lab' : '#character-lab'}
          onClick={() => handleScrollTo('character-lab')}
          className="hover:text-[#FF425E] dark:hover:text-[#FFD400] transition-colors relative py-1"
        >
          CHARACTER LAB
        </Link>
        <Link
          href={isArtists ? '/#process' : '#process'}
          onClick={() => handleScrollTo('process')}
          className="hover:text-[#FF425E] dark:hover:text-[#FFD400] transition-colors relative py-1"
        >
          PROCESS
        </Link>
        <Link
          href="/artists"
          className={`transition-colors relative py-1 ${
            isArtists
              ? 'text-[#FF425E] dark:text-[#FFD400] font-black'
              : 'hover:text-[#FF425E] dark:hover:text-[#FFD400]'
          }`}
        >
          THE ARTISTS
        </Link>
      </nav>

      {/* c) Right Utility & CTA Cluster */}
      <div className="hidden md:flex items-center gap-3">
        {/* Theme Switcher Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[#211529] dark:hover:border-[#FFD400] transition-all active:scale-95 shadow-sm"
          aria-label={`Switch to ${theme === 'light' ? 'Dark Disco #211529' : 'Warm Cream #F6EDE4'} mode`}
          title={`Switch to ${theme === 'light' ? 'Dark Disco' : 'Warm Cream'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-[#211529]" />
          ) : (
            <Sun className="w-4 h-4 text-[#FFD400]" />
          )}
        </button>

        {/* Primary CTA Button */}
        <a
          href="#commission-drawer"
          onClick={handleCommissionClick}
          className="px-4 py-2 rounded-full bg-[#211529] text-[#F6EDE4] dark:bg-[#FFD400] dark:text-[#211529] font-mono text-xs font-bold tracking-wider hover:scale-105 transition-all inline-flex items-center gap-1 shadow-sm"
        >
          <span>COMMISSION US</span>
          <span>↗</span>
        </a>
      </div>

      {/* Mobile Controls */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--text-primary)]"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4 text-[#211529]" />
          ) : (
            <Sun className="w-4 h-4 text-[#FFD400]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--text-primary)]"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] px-6 py-6 space-y-4 font-mono text-sm shadow-xl md:hidden">
          <Link
            href={isArtists ? '/#showcase' : '#showcase'}
            onClick={() => handleScrollTo('showcase')}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#FF425E]"
          >
            SHOWCASE
          </Link>
          <Link
            href={isArtists ? '/#character-lab' : '#character-lab'}
            onClick={() => handleScrollTo('character-lab')}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#FF425E]"
          >
            CHARACTER LAB
          </Link>
          <Link
            href={isArtists ? '/#process' : '#process'}
            onClick={() => handleScrollTo('process')}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#FF425E]"
          >
            PROCESS
          </Link>
          <Link
            href="/artists"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#FF425E]"
          >
            THE ARTISTS
          </Link>
          <a
            href="#commission-drawer"
            onClick={handleCommissionClick}
            className="w-full mt-3 py-3 px-4 rounded-full bg-[#211529] text-[#F6EDE4] dark:bg-[#FFD400] dark:text-[#211529] font-mono text-xs font-bold tracking-wider uppercase text-center block shadow-md"
          >
            COMMISSION US ↗
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
