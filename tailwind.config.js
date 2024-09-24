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
      screens: {
        xs: "683px", // From 683px
        mdplus: "1024px", // From 1024px
        lgplus: "1270px", // From 1283px
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require("daisyui")],
};
