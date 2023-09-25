/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'lobby': 'url(./assets/main-background.jpg)'
      }
    },
  },
  plugins: [],
}

