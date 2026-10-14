'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry?: () => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const pathname = usePathname();
  const isArtists = pathname === '/artists';
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check initial system or local theme
    const savedTheme = localStorage.getItem('epiphrame-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-hairline)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2 select-none"
        >
          <span className="font-extrabold text-xl md:text-2xl tracking-tighter text-[var(--text-primary)] transition-transform group-hover:scale-105">
            EPIPHRAME
          </span>
          <span className="w-2 h-2 rounded-full bg-[#1388E5] group-hover:bg-[#FFD400] transition-colors" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-wider text-[var(--text-primary)]">
          <Link
            href="/#campaigns"
            className="hover:text-[#1388E5] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1388E5] hover:after:w-full after:transition-all"
          >
            WORKS
          </Link>
          <Link
            href="/artists"
            className={`transition-colors relative py-1 ${
              isArtists
                ? 'text-[#1388E5] font-black after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#1388E5]'
                : 'hover:text-[#1388E5] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1388E5] hover:after:w-full after:transition-all'
            }`}
          >
            ARTISTS
          </Link>
          <Link
            href="/#campaigns"
            className="hover:text-[#1388E5] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1388E5] hover:after:w-full after:transition-all"
          >
            CAMPAIGNS
          </Link>

          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-4 py-2 rounded-full border border-[var(--text-primary)] hover:bg-[#211529] hover:text-[#F6EDE4] transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--border-hairline)] transition-colors active:scale-90 shadow-sm"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#211529]" />
            ) : (
              <Sun className="w-4 h-4 text-[#FFD400]" />
            )}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-card)] text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
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
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-hairline)] px-6 py-6 space-y-4 font-mono text-sm shadow-xl">
          <Link
            href="/#campaigns"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#1388E5]"
          >
            WORKS
          </Link>
          <Link
            href="/artists"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#1388E5]"
          >
            ARTISTS
          </Link>
          <Link
            href="/#campaigns"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#1388E5]"
          >
            CAMPAIGNS
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry?.();
            }}
            className="w-full mt-2 py-3 px-4 rounded-full bg-[#211529] text-[#F6EDE4] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2"
          >
            LET&apos;S TALK <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
