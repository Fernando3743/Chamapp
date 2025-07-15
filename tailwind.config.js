/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'scroll': 'scroll 30s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(100px, -100px) scale(1.1)' },
          '50%': { transform: 'translate(-100px, 100px) scale(0.9)' },
          '75%': { transform: 'translate(50px, 50px) scale(1.05)' }
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'tertiary-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'light-gradient': 'linear-gradient(135deg, #ffffff 0%, #a8a8a8 100%)'
      }
    }
  },
  plugins: [],
};
