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
        scrolled || isArtists
          ? 'bg-[#F9F6F0]/95 dark:bg-[#141316]/95 backdrop-blur-md border-b border-[#141316]/12 dark:border-[#F9F6F0]/15 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2 select-none"
        >
          <span className="font-black text-xl md:text-2xl tracking-tighter text-[var(--text-primary)] transition-transform group-hover:scale-105">
            EPIPHRAME
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF425E] group-hover:bg-[#F3A72E] transition-colors shadow-sm" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-wider text-[var(--text-primary)]">
          <Link
            href="/#campaigns"
            className="hover:text-[#FF425E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF425E] hover:after:w-full after:transition-all"
          >
            WORKS
          </Link>
          <Link
            href="/artists"
            className={`transition-colors relative py-1 ${
              isArtists
                ? 'text-[#FF425E] font-black after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF425E]'
                : 'hover:text-[#FF425E] after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF425E] hover:after:w-full after:transition-all'
            }`}
          >
            ARTISTS
          </Link>
          <Link
            href="/#campaigns"
            className="hover:text-[#FF425E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF425E] hover:after:w-full after:transition-all"
          >
            CAMPAIGNS
          </Link>

          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-5 py-2.5 rounded-full border border-[#141316] bg-[#FF425E] text-white font-extrabold shadow-[2px_2px_0px_0px_#141316] hover:bg-[#E8334E] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-[#141316]/20 bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[#F3A72E]/15 transition-colors active:scale-90 shadow-sm"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#141316]" />
            ) : (
              <Sun className="w-4 h-4 text-[#F9F6F0]" />
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
              <Sun className="w-4 h-4 text-[#F3A72E]" />
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
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[#141316]/20 px-6 py-6 space-y-4 font-mono text-sm shadow-xl">
          <Link
            href="/#campaigns"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#FF425E]"
          >
            WORKS
          </Link>
          <Link
            href="/artists"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#FF425E]"
          >
            ARTISTS
          </Link>
          <Link
            href="/#campaigns"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[var(--text-primary)] font-bold hover:text-[#FF425E]"
          >
            CAMPAIGNS
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry?.();
            }}
            className="w-full mt-2 py-3 px-4 rounded-full bg-[#FF425E] text-white font-black text-xs tracking-wider uppercase border border-[#141316] shadow-[2px_2px_0px_0px_#141316] flex items-center justify-center gap-2"
          >
            LET&apos;S TALK <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </header>
  );
}
