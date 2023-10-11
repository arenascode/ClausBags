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
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
