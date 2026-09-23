/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#19b7c8",
        'dark-teal': "#087f91",
        'deep-navy': "#082b3a",
        'dark-navy': "#062c3b",
        'bg-light': "#f4fbfc",
        'muted-text': "#6c8188",
        'success-teal': "#18a875",
        'danger-red': "#e65d67",
        'warning-gold': "#e5a93d",
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(240px, 1fr))'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'orbit': 'orbit 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(25, 183, 200, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(25, 183, 200, 0.7))' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        }
      }
    },
  },
  plugins: [],
}


