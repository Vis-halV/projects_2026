import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0d12',
        paper: '#f6f5f2',
      },
      boxShadow: {
        shoji: '0 30px 80px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
} satisfies Config

