/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          main: '#F4F7FB',
          secondary: '#EAF0F7',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        navy: {
          DEFAULT: '#172033',
          charcoal: '#172033',
          900: '#172033',
          800: '#1E293B',
          700: '#334155',
        },
        slate: {
          muted: '#64748B',
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // primary blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['DM Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(23, 32, 51, 0.04), 0 1px 2px -1px rgba(23, 32, 51, 0.04)',
        card: '0 4px 20px -2px rgba(23, 32, 51, 0.04), 0 2px 6px -1px rgba(23, 32, 51, 0.02)',
        'card-hover': '0 12px 28px -4px rgba(23, 32, 51, 0.08), 0 4px 10px -2px rgba(23, 32, 51, 0.03)',
        hover: '0 10px 15px -3px rgba(23, 32, 51, 0.08), 0 4px 6px -4px rgba(23, 32, 51, 0.04)',
      },
    },
  },
  plugins: [],
}

