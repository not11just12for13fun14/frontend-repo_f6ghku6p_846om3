/**** Tailwind Config ****/ 
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e11d48', // red-600 vibe
          dark: '#b91c1c',
          light: '#f43f5e'
        },
        graybrand: {
          DEFAULT: '#1f2937', // dark gray
          soft: '#374151',
          softer: '#4b5563'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.12)',
        card: '0 12px 24px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [],
};