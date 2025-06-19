/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        barlow: ['Barlow', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        latar: '#f3f4f6',
        teks: '#374151',
        teksSamping: '#6b7280',
        garis: '#e5e7eb',
        hijau: '#00B074',
        merah: '#ef4444',
        biru: '#3b82f6',
        kuning: '#f59e0b',
      },
    },
  },
  plugins: [],
}
