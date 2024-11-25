/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'winter-blue': '#f0f8ff', // Add your custom colors
        'deep-blue': '#1e3a8a',
        'ice-blue': '#e0f2fe',
        'button-blue': '#3b82f6',
      }
    },
  },
  plugins: [],
}