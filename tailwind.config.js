/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "very-dark-gray": "hsl(0, 0%, 17%)",
      "dark-gray": "hsl(0, 0%, 59%)",
      'white': '#ffffff',
      'black': '#000000'
    },
    fontFamily: {
      'rubik': ['Rubik', 'sans-serif']
    }
  },
  plugins: [],
}

