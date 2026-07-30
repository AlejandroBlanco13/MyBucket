/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / var(--tw-bg-opacity, 1))',
        paper: 'rgb(var(--paper) / var(--tw-bg-opacity, 1))',
        mute: 'rgb(var(--mute) / 1)',
        line: 'rgb(var(--line) / 1)',
        'line-dark': 'rgb(var(--line-dark) / 1)',
        surface: 'rgb(var(--surface) / 1)',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
        mark: ['"Great Vibes"', 'cursive'],
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-line': {
          '0%': { opacity: '0.35' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0.35' },
        },
        'film-roll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'film-roll-y': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-line': 'pulse-line 3s ease-in-out infinite',
        'film-roll': 'film-roll 48s linear infinite',
        'film-roll-y': 'film-roll-y 42s linear infinite',
      },
    },
  },
  plugins: [],
}
