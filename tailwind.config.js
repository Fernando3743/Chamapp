/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#3B82F6",
        "body-color": "#6B7280",
        "gray-1": "#F9FAFB",
        "glass-bg": "rgba(255, 255, 255, 0.1)",
        "glass-border": "rgba(255, 255, 255, 0.2)",
        "text-primary": "#ffffff",
        "text-secondary": "rgba(255, 255, 255, 0.8)",
        "dark-bg": "#0a0a0a",
        "success-color": "#4ade80",
        "warning-color": "#fbbf24",
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      height: {
        '9.5': '2.375rem',
      },
      padding: {
        '4.5': '1.125rem',
        '8.5': '2.125rem',
      },
      spacing: {
        '3.5': '0.875rem',
      },
      backdropBlur: {
        '15': '15px',
      },
      backdropSaturate: {
        '150': '150%',
      },
    },
  },
  plugins: [],
}