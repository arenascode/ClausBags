/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "node_modules/flowbite/**/*.js",
    "index.html",
    "src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media",
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
