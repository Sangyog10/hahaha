/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ['56px', { lineHeight: '62.6px' }],
        h2: ['48px', { lineHeight: '52.8px' }],
        h3: ['40px', { lineHeight: '44px' }],
        h4: ['32px', { lineHeight: '35.2px' }],
        h5: ['24px', { lineHeight: '26.4px' }],
        h6: ['20px', { lineHeight: '22px' }],
        p: ['16px', { lineHeight: '22.4px' }],
        lg: ['20px', { lineHeight: '28px' }],
        md: ['18px', { lineHeight: '25.2px' }],
        sm: ['14px', { lineHeight: '19.6px' }]
      }, 
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
        jetbrains: ['JetBrains Mono', 'sans-serif'],
        poppins: ['Poppins', "sans-serif"]
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

