'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { Send, CheckCircle2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

const DELIVERABLE_OPTIONS = [
  '9:16 TikTok/Reels Video Ad',
  'Character IP & Expression Sheet',
  'Animated GIF / Discord Sticker Pack',
  'App Store Feature Banner',
];

const ARTIST_OPTIONS = [
  { id: 'any', label: 'Any Collective Artist' },
  { id: 'iris', label: 'Iris (Quirky Pop & Color)' },
  { id: 'raka', label: 'Raka (60fps Motion & Live2D)' },
  { id: 'nadia', label: 'Nadia (Webtoon & Romance Hook)' },
  { id: 'bima', label: 'Bima (World & Key Art)' },
];

const BUDGET_RANGES = ['<$2k', '$2k–$5k', '$5k–$10k', '$10k+'] as const;

export const commissionSchema = z.object({
  deliverables: z
    .array(z.string())
    .min(1, 'Please select at least one deliverable format.'),
  preferredArtist: z.string().default('any'),
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(80, 'Name must be under 80 characters.'),
  contact: z
    .string()
    .trim()
    .min(3, 'Please enter a valid work email or Discord handle.')
    .max(100, 'Contact handle is too long.'),
  budgetRange: z.enum(['<$2k', '$2k–$5k', '$5k–$10k', '$10k+'], {
    errorMap: () => ({ message: 'Please select a project budget range.' }),
  }),
  brief: z
    .string()
    .trim()
    .min(10, 'Please share at least a sentence about your campaign (min 10 characters).')
    .max(1500, 'Brief cannot exceed 1500 characters.'),
});

export type CommissionFormData = z.infer<typeof commissionSchema>;

export function CommissionArcade() {
  const [deliverables, setDeliverables] = useState<string[]>([
    '9:16 TikTok/Reels Video Ad',
  ]);
  const [preferredArtist, setPreferredArtist] = useState<string>('any');
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [budgetRange, setBudgetRange] =
    useState<(typeof BUDGET_RANGES)[number]>('$5k–$10k');
  const [brief, setBrief] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleDeliverable = (item: string) => {
    setDeliverables((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = commissionSchema.safeParse({
      deliverables,
      preferredArtist,
      name,
      contact,
      budgetRange,
      brief,
    });

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

    // Simulated instant submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setDeliverables(['9:16 TikTok/Reels Video Ad']);
    setPreferredArtist('any');
    setName('');
    setContact('');
    setBudgetRange('$5k–$10k');
    setBrief('');
    setErrors({});
  };

  return (
    <section
      id="commission-drawer"
      className="relative w-full py-24 md:py-36 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)]"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#FFD400] text-[#211529] font-black border border-[#141316] shadow-[2px_2px_0px_0px_#141316] mb-3">
            05 / PROJECT INQUIRY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
            Ready to frame your next character campaign?
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] mt-3 max-w-xl mx-auto">
            Submit your project scope below. Direct collaboration with resident artists, transparent milestones, and a 48-hour proposal turnaround.
          </p>
        </div>

        {/* Card Form Wrapper */}
        <div className="rounded-3xl bg-[var(--bg-card)] border-2 border-[#141316] dark:border-[#F9F6F0]/30 p-8 sm:p-12 shadow-[6px_6px_0px_0px_#141316] dark:shadow-[6px_6px_0px_0px_#FFD400] relative">
          {isSuccess ? (
            /* Success Confirmation State */
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#FFD400] text-[#211529] border-2 border-[#141316] flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#141316]">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h3 className="text-3xl font-black text-[var(--text-primary)] mb-2">
                Brief Received &amp; Queued!
              </h3>
              <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto leading-relaxed mb-6">
                Thanks <strong className="text-[var(--text-primary)]">{name}</strong>. Our art director will review your brief with{' '}
                <strong className="text-[var(--text-primary)]">
                  {ARTIST_OPTIONS.find((a) => a.id === preferredArtist)?.label}
                </strong>{' '}
                and email a tailored production roadmap to{' '}
                <strong className="text-[var(--text-primary)]">{contact}</strong> within 24–48 hours.
              </p>
              <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] max-w-sm w-full text-left font-mono text-xs mb-8 space-y-1.5">
                <p>
                  <span className="text-[var(--text-muted)]">Deliverables:</span>{' '}
                  <span className="font-bold text-[var(--text-primary)]">{deliverables.join(', ')}</span>
                </p>
                <p>
                  <span className="text-[var(--text-muted)]">Target Budget:</span>{' '}
                  <span className="font-bold text-[#FF425E]">{budgetRange}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141316] text-[#F9F6F0] dark:bg-[#FFD400] dark:text-[#141316] font-mono text-xs font-black tracking-wider hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0px_0px_#FF425E]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>BUILD ANOTHER BRIEF</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Clickable Deliverable Chips */}
              <div>
                <label className="block font-mono text-xs font-black uppercase tracking-wider text-[var(--text-primary)] mb-3">
                  Step 1 : Select Desired Deliverables (Multi-Select)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DELIVERABLE_OPTIONS.map((item) => {
                    const selected = deliverables.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleDeliverable(item)}
                        className={`p-3.5 rounded-2xl text-left border-2 font-mono text-xs font-bold transition-all flex items-center justify-between ${
                          selected
                            ? 'bg-[#141316] text-[#F9F6F0] border-[#141316] dark:bg-[#FFD400] dark:text-[#141316] dark:border-[#FFD400] shadow-[3px_3px_0px_0px_#FF425E]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[#141316]'
                        }`}
                      >
                        <span>{item}</span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            selected
                              ? 'bg-[#FF425E] text-white border-white'
                              : 'border-current/40'
                          }`}
                        >
                          {selected ? '✓' : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.deliverables && (
                  <p className="mt-2 text-xs font-mono text-[#FF425E] flex items-center gap-1 font-bold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.deliverables}
                  </p>
                )}
              </div>

              {/* Step 2: Preferred Artist Style Selector */}
              <div>
                <label className="block font-mono text-xs font-black uppercase tracking-wider text-[var(--text-primary)] mb-3">
                  Step 2 : Preferred Artist Style (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {ARTIST_OPTIONS.map((artist) => {
                    const isSelected = preferredArtist === artist.id;
                    return (
                      <button
                        key={artist.id}
                        type="button"
                        onClick={() => setPreferredArtist(artist.id)}
                        className={`p-3 rounded-xl border text-center font-mono text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-[#FF425E] text-white border-[#141316] shadow-[2px_2px_0px_0px_#141316]'
                            : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[#FF425E]'
                        }`}
                      >
                        {artist.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Client Details */}
              <div className="space-y-5 pt-4 border-t border-[var(--border-hairline)]">
                <label className="block font-mono text-xs font-black uppercase tracking-wider text-[var(--text-primary)]">
                  Step 3 : Project &amp; Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block font-mono text-[11px] font-bold text-[var(--text-muted)] mb-1">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[#FF425E] font-medium"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-mono text-[#FF425E] font-bold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Contact / Email */}
                  <div>
                    <label className="block font-mono text-[11px] font-bold text-[var(--text-muted)] mb-1">
                      WORK EMAIL OR DISCORD *
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="alex@studio.ai or alex#1234"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[#FF425E] font-medium"
                    />
                    {errors.contact && (
                      <p className="mt-1 text-xs font-mono text-[#FF425E] font-bold">
                        {errors.contact}
                      </p>
                    )}
                  </div>
                </div>

                {/* Budget Range Pills */}
                <div>
                  <label className="block font-mono text-[11px] font-bold text-[var(--text-muted)] mb-2">
                    PROJECT BUDGET RANGE *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {BUDGET_RANGES.map((range) => {
                      const isSelected = budgetRange === range;
                      return (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setBudgetRange(range)}
                          className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold border transition-all text-center ${
                            isSelected
                              ? 'bg-[#141316] text-[#F9F6F0] dark:bg-[#FFD400] dark:text-[#141316] border-[#141316] shadow-[2px_2px_0px_0px_#FF425E]'
                              : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-hairline)] hover:border-[#141316]'
                          }`}
                        >
                          {range}
                        </button>
                      );
                    })}
                  </div>
                  {errors.budgetRange && (
                    <p className="mt-1 text-xs font-mono text-[#FF425E] font-bold">
                      {errors.budgetRange}
                    </p>
                  )}
                </div>

                {/* Brief Textarea */}
                <div>
                  <label className="block font-mono text-[11px] font-bold text-[var(--text-muted)] mb-1">
                    CAMPAIGN BRIEF &amp; OBJECTIVES *
                  </label>
                  <textarea
                    rows={4}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Tell us about the world, characters, target platforms (TikTok/Discord), and timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-sm text-[var(--text-primary)] focus:outline-hidden focus:border-[#FF425E] font-medium leading-relaxed resize-none"
                  />
                  {errors.brief && (
                    <p className="mt-1 text-xs font-mono text-[#FF425E] font-bold">
                      {errors.brief}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#FF425E] hover:bg-[#E8334E] text-white font-mono text-sm font-black tracking-wider border-2 border-[#141316] shadow-[4px_4px_0px_0px_#141316] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#141316] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'SUBMITTING BRIEF...' : 'SUBMIT COMMISSION BRIEF ↗'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
