/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          900: '#2E0A11',
          800: '#4A101B', // Primary Deep Burgundy
          700: '#681C2B', // Royal Maroon
          600: '#842637',
          500: '#9E3245',
          100: '#FBE8EB',
          50: '#FDF2F4',
        },
        royalGold: {
          900: '#543F14',
          800: '#826425',
          700: '#B0883C',
          DEFAULT: '#D4AF65', // Antique Gold
          500: '#D4AF65',
          400: '#E4C788',
          300: '#F3DCA5', // Light Gold
          200: '#F9ECCC',
          100: '#FDF7E7',
          50: '#FEFBF3',
        },
        ivory: {
          DEFAULT: '#FFF8EF',
          50: '#FFFCF8',
          100: '#FFF8EF',
          200: '#FDF0DF',
          300: '#F9E2C6',
          400: '#EED0A8',
        },
        espresso: {
          DEFAULT: '#32151B',
          800: '#2A1116',
          700: '#3D1B22',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'serif'],
        script: ['Great Vibes', 'cursive'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'royal-gold': '0 10px 30px -5px rgba(212, 175, 101, 0.35)',
        'royal-burgundy': '0 20px 50px -10px rgba(74, 16, 27, 0.45)',
        'wax-seal': '0 12px 28px rgba(0, 0, 0, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
