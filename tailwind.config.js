/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kabut: {
          light: '#E7E2DB',
          DEFAULT: '#C9C2B8',
          dark: '#9E978D',
        },
        gambut: {
          deep: '#1C1510',
          DEFAULT: '#3B2A20',
          light: '#5A4335',
        },
        bara: {
          DEFAULT: '#D8432B',
          glow: '#FF5733',
          dark: '#A62B17',
        },
        arang: {
          deep: '#121416',
          DEFAULT: '#2B2F33',
          light: '#42484F',
          muted: '#636B73',
        },
        tunas: {
          light: '#7DAA80',
          DEFAULT: '#5E8C61',
          dark: '#446646',
        },
      },
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
        instrument: ['"Instrument Sans"', 'sans-serif'],
      },
      maxWidth: {
        'prose-70': '70ch',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}

