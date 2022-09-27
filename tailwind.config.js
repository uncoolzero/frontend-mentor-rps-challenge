/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        custom: ["Barlow Semi Condensed", "sans-serif"]
      }
    },
    screens: {
      "1xl": "1366px",
    }
  },
  plugins: [],
}
