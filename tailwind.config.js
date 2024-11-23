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
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        mint: 'var(--mint)',
        lightMint: 'var(--light-mint)',
        gray: 'var(--gray)',
        lightGray: 'var(--light-gray)',
        danger: 'var(--danger)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [],
};
