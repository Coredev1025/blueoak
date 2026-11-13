export default {
  content: ['./index.html', './main.jsx', './site/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 700: 'var(--surface-2)', 800: 'var(--surface)', 900: 'var(--bg)' },
        oak: { 300: 'var(--accent)', 400: 'var(--accent)', 500: 'var(--accent)', 600: 'var(--accent-strong)' },
        glow: 'var(--accent)',
        slate: { 50: 'var(--text-1)', 100: 'var(--text-1)', 200: 'var(--text-1)', 300: 'var(--text-2)', 400: 'var(--text-3)', 500: 'var(--text-3)', 600: 'var(--text-3)' },
      },
      keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 52s linear infinite' },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
