import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        'text-ink': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        hairline: 'var(--border-hairline)',
        'border-strong': 'var(--border-strong)',
        'electric-pink': 'var(--accent-pink)',
        'sunshine-yellow': 'var(--accent-yellow)',
        'forest-green': 'var(--accent-green)',
        midnight: 'var(--accent-charcoal)',
        'accent-pink': 'var(--accent-pink)',
        'accent-yellow': 'var(--accent-yellow)',
        'accent-green': 'var(--accent-green)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        fredoka: ['Fredoka', 'system-ui', 'sans-serif'],
        syne: ['Syne', 'system-ui', 'sans-serif'],
        bricolage: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-1': '0 2px 4px rgba(33, 21, 41, 0.03), 0 8px 16px rgba(33, 21, 41, 0.05)',
        'soft-2': '0 4px 8px rgba(33, 21, 41, 0.04), 0 16px 32px rgba(33, 21, 41, 0.07), 0 32px 64px rgba(33, 21, 41, 0.03)',
        'soft-lg': '0 8px 24px -4px rgba(33, 21, 41, 0.08), 0 24px 48px -8px rgba(33, 21, 41, 0.06)',
        'glass': '0 8px 32px 0 rgba(33, 21, 41, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
