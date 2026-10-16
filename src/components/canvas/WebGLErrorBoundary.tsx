'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RING_SHOWCASE_ITEMS, RingShowcaseItem } from '@/data/siteContent';
import { RefreshCw } from 'lucide-react';

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
        {/* Simple notice */}
        <div className="mb-8 p-4 rounded-2xl bg-white border-2 border-[#211529] flex items-center justify-between gap-4 shadow-[3px_3px_0_#211529]">
          <p className="text-sm font-bold text-[#211529]">
            Here are all 8 drawings from our ring — your browser prefers the flat view today!
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FFD400] text-[#211529] border-2 border-[#211529] shadow-[2px_2px_0_#211529] hover:translate-y-0.5 hover:shadow-[1px_1px_0_#211529] transition-all flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try 3D Ring
            </button>
          )}
        </div>

        {/* 8-Card Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RING_SHOWCASE_ITEMS.map((item: RingShowcaseItem) => (
            <div
              key={item.id}
              className="group rounded-3xl bg-white border-2 border-[#211529] overflow-hidden shadow-[3px_3px_0_#211529] hover:-translate-y-1 transition-all"
            >
              <div className="relative aspect-[9/16] bg-[#F6EDE4] overflow-hidden">
                <img
                  src={item.posterSrc || item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <span className="bg-white border-2 border-[#211529] shadow-[2px_2px_0_#211529] rounded-full px-3 py-1 text-xs font-bold text-[#211529]">
                  Drawn by @{item.artistName} ✿
                </span>
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
