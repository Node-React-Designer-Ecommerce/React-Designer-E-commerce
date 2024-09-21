/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        SecondaryColor: "#4e7f62",
        "custom-bg": "rgb(104 42 34)",
      },
    },
  },
  plugins: [require("daisyui")],
};
