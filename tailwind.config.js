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
        'float-delayed': 'float 20s ease-in-out infinite 5s',
        'float-delayed-10': 'float 20s ease-in-out infinite 10s',
        'scroll': 'scroll 30s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'modalSlideIn': 'modalSlideIn 0.3s ease',
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
        },
        modalSlideIn: {
          'from': {
            transform: 'translateY(-50px)',
            opacity: '0',
          },
          'to': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'tertiary-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'light-gradient': 'linear-gradient(135deg, #ffffff 0%, #a8a8a8 100%)',
        'sphere-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'sphere-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'sphere-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      colors: {
        'glass-border': 'rgba(255, 255, 255, 0.2)',
        'text-secondary': 'rgba(255, 255, 255, 0.8)',
        'dark-bg': '#0a0a0a',
      },
      backdropBlur: {
        'glass': '20px',
        'heavy': '30px',
      },
    }
  },
  plugins: [],
};
