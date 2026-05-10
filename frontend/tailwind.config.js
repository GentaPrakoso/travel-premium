// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',           // <-- tambahkan ini
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        navy: '#0a192f',
        gold: '#d4af37',
        'blue-modern': '#2563eb',
      }
    },
  },
  plugins: [],
}