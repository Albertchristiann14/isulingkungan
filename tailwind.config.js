/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F2EDE4',
          300: '#E7DFD3',
        },
        kabut: {
          light: '#F4EFEA',
          DEFAULT: '#C9C2B8', // Abu Kabut
          dark: '#7A7267',
        },
        gambut: {
          deep: '#1A1410',
          DEFAULT: '#3B2A20', // Gambut
          light: '#5A4335',
          muted: '#8D7B6F',
        },
        bara: {
          DEFAULT: '#D8432B', // Bara
          glow: '#FF5733',
          dark: '#B8321D',
          light: '#FFECE8',
        },
        arang: {
          deep: '#121416',
          DEFAULT: '#2B2F33', // Arang
          light: '#42484F',
          muted: '#6C757D',
        },
        tunas: {
          light: '#EAF3EC',
          DEFAULT: '#3D7845', // Tunas Hijau Harapan
          dark: '#28532F',
        },
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
        instrument: ['"Instrument Sans"', 'sans-serif'],
      },
      maxWidth: {
        'prose-70': '70ch',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(43, 47, 51, 0.06), 0 2px 6px -1px rgba(43, 47, 51, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(43, 47, 51, 0.08), 0 4px 12px -2px rgba(43, 47, 51, 0.04)',
        'bara': '0 8px 24px -4px rgba(216, 67, 43, 0.25)',
      }
    },
  },
  plugins: [],
}
