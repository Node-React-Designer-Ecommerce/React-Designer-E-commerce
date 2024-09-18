/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'SecondaryColor': '#4e7f62',
        'custom-bg': 'rgb(150 172 175)',
      }
    }
  },
  plugins: [require('daisyui'),],
}

