/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#c9a227',
        'gold-light': '#e8c547',
        'electric-blue': '#4a9eff',
        cream: '#f0e6d3',
        'space-dark': '#050510',
        'space-mid': '#0d0d1f',
        'space-light': '#1a1a35',
        'green-dino': '#22c55e',
        'amber-florence': '#f59e0b',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
