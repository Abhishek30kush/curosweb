/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Cyber Violet
          light: '#A78BFA',
          dark: '#6D28D9',
        },
        secondary: '#07021a', // Ultra-Deep Violet Void
        accent: '#00F5FF',    // Laser Cyan
        highlight: '#FF007F', // Neon Rose / Magenta
        dark: {
          DEFAULT: '#030014', // Obsidian Space Background
          50: '#06031b',
          100: '#0a052c',
          200: '#120b3e',
          300: '#1d1259',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #030014 0%, #07021a 50%, #030014 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #6D28D9 0%, #FF007F 50%, #00F5FF 100%)',
      }
    },
  },
  plugins: [],
}
