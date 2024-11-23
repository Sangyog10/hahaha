/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom Colors for darkModes and light Modes
      colors: {
        "primary": "#fff",
        "secondary": "#7147ec",
        "gradient": "linear-gradient(270deg, #7147ec 0%, #ffb636 100%)",
        "dark": "#18202D",
        "accent": "#ffb636",
        "success": "#6dcebe",
        "light": "#f9f9fb",
        "back": "#858996",
        "danger": "#ff5e5e",
      },
      fontFamily: {
        hanken: ['Hanken Grotesk', 'sans-serif'],
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'marquee': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        },
      }
    },
  },
  plugins: [],
};

