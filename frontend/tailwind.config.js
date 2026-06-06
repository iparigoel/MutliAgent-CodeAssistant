// const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    ".flowbite-react\\class-list.json"
  ],
  content: [],
  theme: {
    extend: {},
  },
  plugins: {
    '@tailwindcss/postcss': {},
  },
}