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
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        fredoka: ['Fredoka', 'system-ui', 'sans-serif'],
        syne: ['Syne', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
