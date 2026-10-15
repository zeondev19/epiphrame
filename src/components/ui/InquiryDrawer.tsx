'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { X, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { ARTISTS_ROSTER } from '@/data/siteContent';

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be under 60 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid work email')
    .max(100, 'Email must be under 100 characters'),
  company: z
    .string()
    .trim()
    .min(1, 'Company or project name is required')
    .max(80, 'Company name is too long'),
  projectType: z.enum(
    [
      'video-ad-campaign',
      'character-design',
      'animated-stickers',
      'worldbuilding-key-art',
      'full-custom-package',
    ],
    {
      errorMap: () => ({ message: 'Please select a project type' }),
    }
  ),
  preferredArtist: z.string().optional(),
  budgetRange: z.enum(
    ['$3k - $5k', '$5k - $10k', '$10k - $25k', '$25k+'],
    {
      errorMap: () => ({ message: 'Please select a budget range' }),
    }
  ),
  message: z
    .string()
    .trim()
    .min(10, 'Please include at least a brief description (min 10 characters)')
    .max(1000, 'Brief cannot exceed 1000 characters'),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectType?: string;
  defaultArtist?: string;
}

export function InquiryDrawer({
  isOpen,
  onClose,
  defaultProjectType = 'video-ad-campaign',
  defaultArtist = 'any',
}: InquiryDrawerProps) {
  const [formData, setFormData] = useState<Partial<InquiryFormData>>({
    projectType: (defaultProjectType as any) || 'video-ad-campaign',
    preferredArtist: defaultArtist,
    budgetRange: '$5k - $10k',
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = inquirySchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      projectType: 'video-ad-campaign',
      preferredArtist: 'any',
      budgetRange: '$5k - $10k',
      name: '',
      email: '',
      company: '',
      message: '',
    });
    onClose();
  };

  return (
    <div id="commission-drawer-modal" className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#141316]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-card)] border-l border-[var(--border-hairline)] shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF425E]" />
                <h3 className="font-mono text-sm tracking-wider uppercase text-[var(--text-primary)] font-bold">
                  LET&apos;S TALK · PROJECT BRIEF
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[var(--border-hairline)] text-[var(--text-primary)] transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src="/assets/mascots/flower-yellow.png"
                    alt="Success Mascot"
                    className="w-24 h-24 object-contain drop-shadow-md"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#204A36] text-white p-1.5 rounded-full">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2">
                  BRIEF RECEIVED!
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  Thank you, <span className="font-bold text-[var(--text-primary)]">{formData.name}</span>.
                  Iris, Raka, Nadia, Bima, and the Epiphrame collective have received your project inquiry for{' '}
                  <span className="font-semibold text-[var(--text-primary)]">{formData.company}</span>.
                  We&apos;ll get back to you within 24 to 48 hours with scope details and scheduling options.
                </p>
                <div className="w-full bg-[var(--bg-surface)] rounded-xl p-4 border border-[var(--border-hairline)] text-left mb-6 font-mono text-xs text-[var(--text-muted)] space-y-1">
                  <div><strong className="text-[var(--text-primary)]">Format:</strong> {formData.projectType}</div>
                  <div><strong className="text-[var(--text-primary)]">Budget:</strong> {formData.budgetRange}</div>
                  <div><strong className="text-[var(--text-primary)]">Direct contact:</strong> {formData.email}</div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3.5 px-6 rounded-full bg-[#FF425E] text-white font-black text-sm tracking-wide hover:bg-[#E8334E] border border-[#141316] shadow-[2px_2px_0px_0px_#141316] transition-all"
                >
                  DONE · BACK TO SITE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    className={`w-full px-3.5 py-2.5 rounded-xl border-2 ${
                      errors.name ? 'border-[#FF425E] bg-rose-50/20' : 'border-[#141316]/20 focus:border-[#FF425E]'
                    } bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF425E]`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-[#FF425E] mt-1 flex items-center gap-1 font-mono font-bold">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@cycleai.ai"
                    className={`w-full px-3.5 py-2.5 rounded-xl border-2 ${
                      errors.email ? 'border-[#FF425E] bg-rose-50/20' : 'border-[#141316]/20 focus:border-[#FF425E]'
                    } bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF425E]`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#FF425E] mt-1 flex items-center gap-1 font-mono font-bold">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    Company / AI Platform *
                  </label>
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Cycle AI / Hangjam / Stealth RPG"
                    className={`w-full px-3.5 py-2.5 rounded-xl border-2 ${
                      errors.company ? 'border-[#FF425E] bg-rose-50/20' : 'border-[#141316]/20 focus:border-[#FF425E]'
                    } bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF425E]`}
                  />
                  {errors.company && (
                    <p className="text-[11px] text-[#FF425E] mt-1 flex items-center gap-1 font-mono font-bold">
                      <AlertCircle className="w-3 h-3" /> {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    Project Deliverable *
                  </label>
                  <select
                    value={formData.projectType || 'video-ad-campaign'}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value as any })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF425E]"
                  >
                    <option value="video-ad-campaign">Video Ad Campaign (9:16 Vertical Video)</option>
                    <option value="character-design">Character Design &amp; Turnaround Sheet</option>
                    <option value="animated-stickers">Animated GIF &amp; Discord Reaction Pack</option>
                    <option value="worldbuilding-key-art">Isometric Worlds &amp; App Store Key Art</option>
                    <option value="full-custom-package">Full Character Platform Launch Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    Requested Artist Lead (Optional)
                  </label>
                  <select
                    value={formData.preferredArtist || 'any'}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredArtist: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF425E]"
                  >
                    <option value="any">Any Artist / Studio Recommended</option>
                    {ARTISTS_ROSTER.map((artist) => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name} ({artist.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    Estimated Budget Tier *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['$3k - $5k', '$5k - $10k', '$10k - $25k', '$25k+'].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() =>
                          setFormData({ ...formData, budgetRange: tier as any })
                        }
                        className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold transition-all ${
                          formData.budgetRange === tier
                            ? 'bg-[#FF425E] text-white border-[#141316] shadow-[2px_2px_0px_0px_#141316]'
                            : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[#FF425E]'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider mb-1.5">
                    Campaign Goals & Brief *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your characters, audience, target CTR, and timeline..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border-2 ${
                      errors.message ? 'border-[#FF425E] bg-rose-50/20' : 'border-[#141316]/20 focus:border-[#FF425E]'
                    } bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF425E]`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-[#FF425E] mt-1 flex items-center gap-1 font-mono font-bold">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#FF425E] hover:bg-[#E8334E] text-white font-black text-sm tracking-wider uppercase border border-[#141316] shadow-[2px_2px_0px_0px_#141316] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'DISPATCHING BRIEF...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 stroke-[2.5]" />
                      DISPATCH INQUIRY TO ARTISTS
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer inside drawer */}
          <div className="pt-6 border-t border-[var(--border-hairline)] text-center">
            <p className="font-mono text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#F3A72E] fill-[#F3A72E]" />
              Hand-Drawn &amp; Animated by Collective Artists
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
