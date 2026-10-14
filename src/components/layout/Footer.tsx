'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_COPY } from '@/data/siteContent';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenInquiry?: () => void;
}

export function Footer({ onOpenInquiry }: FooterProps) {
  return (
    <footer className="relative w-full bg-[var(--bg-card)] border-t border-[var(--border-hairline)] pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[var(--border-hairline)]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="font-black text-2xl tracking-tighter text-[var(--text-primary)]">
                {SITE_COPY.brandName}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1388E5]" />
            </Link>
            <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed mb-6">
              {SITE_COPY.tagline}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] font-mono text-xs text-[var(--text-primary)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD400]" />
              <span>100% Hand-Crafted Human Art · 0% AI Slop</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/#manifesto" className="text-[var(--text-muted)] hover:text-[#1388E5] transition-colors">
                  01 / WHY HUMAN ART WINS
                </Link>
              </li>
              <li>
                <Link href="/#campaigns" className="text-[var(--text-muted)] hover:text-[#1388E5] transition-colors">
                  02 / SELECTED CAMPAIGNS
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-[var(--text-muted)] hover:text-[#1388E5] transition-colors">
                  03 / ARTIST ROSTER & SKETCHES
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="text-[var(--text-primary)] font-bold hover:text-[#1388E5] transition-colors inline-flex items-center gap-1"
                >
                  LET&apos;S TALK / INQUIRE <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Client Shoutouts */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] mb-4">
              PROUD PARTNERS
            </h4>
            <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
              Trusted by market-defining character AI and roleplay storytelling studios:
            </p>
            <div className="space-y-2 font-mono text-xs">
              <a
                href="https://www.cycleai.ai/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[#1388E5] transition-colors group"
              >
                <span className="font-bold text-[var(--text-primary)]">Cycle AI — Mobile UA Campaigns</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[#1388E5]" />
              </a>
              <a
                href="https://hangjam.ai/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[#1E7E48] transition-colors group"
              >
                <span className="font-bold text-[var(--text-primary)]">Hangjam — Interactive Bot Lore</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[#1E7E48]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Epiphrame Collective. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Jakarta · Tokyo · Remote</span>
            <span>·</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Vercel Edge Hosted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
