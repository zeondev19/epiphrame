'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';
import { RefreshCw, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export function FallbackGalleryGrid({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="w-full min-h-screen bg-[var(--bg-surface)] py-20 px-6 md:px-12 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Banner notification */}
        <div className="mb-8 p-4 rounded-2xl bg-[var(--bg-card)] border border-[#141316]/15 dark:border-[#F9F6F0]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FFD400] text-[#211529]">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                WebGL Hardware Acceleration Fallback
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Displaying full archival gallery grid. All 8 human-crafted character campaigns are accessible below.
              </p>
            </div>
          </div>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-xs font-bold bg-[#211529] text-[#F6EDE4] dark:bg-[#FFD400] dark:text-[#211529] hover:scale-105 active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry 3D Ring</span>
            </button>
          )}
        </div>

        {/* 8-Card Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RING_SHOWCASE_ITEMS.map((item: RingShowcaseItem) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-[var(--bg-card)] border border-[#141316]/15 dark:border-[#F9F6F0]/20 overflow-hidden shadow-[2px_2px_0px_0px_#211529] dark:shadow-[2px_2px_0px_0px_#FFD400] flex flex-col hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[9/16] bg-neutral-900 overflow-hidden">
                <img
                  src={item.posterSrc || item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#211529]/80 backdrop-blur-sm text-[#F6EDE4] font-mono text-[10px] font-bold tracking-wider">
                  {item.indexLabel} / {item.category}
                </span>
                <span
                  className="absolute bottom-3 left-3 font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-[#211529]"
                  style={{ backgroundColor: item.accentColor || '#FFD400' }}
                >
                  {item.metricsBadge}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-[var(--text-primary)] leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[var(--text-muted)] font-semibold">{item.client}</span>
                  <a
                    href={`#campaign-${item.id}`}
                    className="inline-flex items-center gap-0.5 font-bold text-[var(--text-primary)] hover:text-[#FF425E] transition-colors"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGLErrorBoundary caught error in Canvas:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <FallbackGalleryGrid onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
