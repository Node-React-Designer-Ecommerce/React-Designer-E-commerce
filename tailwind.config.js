/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        SecondaryColor: '#4e7f62',
       
      }
    }
  },
  plugins: [require('daisyui'),],
}

