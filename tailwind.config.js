/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "serif"],
      },
      backgroundImage: {
        "banner-img": 'url("./assets/banner.jpg")',
      },
    },
  },
  plugins: [require("daisyui")],
};
