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
        'accent-blue': 'var(--accent-blue)',
        'accent-yellow': 'var(--accent-yellow)',
        'accent-pink': 'var(--accent-pink)',
        'accent-green': 'var(--accent-green)',
        'accent-lavender': 'var(--accent-lavender)',
        'accent-coral': 'var(--accent-coral)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        fredoka: ['Fredoka', '"Plus Jakarta Sans"', 'sans-serif'],
        syne: ['Syne', '"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
