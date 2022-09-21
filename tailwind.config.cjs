/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#0A3B71",
      background: "#F5F5F5",
      error: "#F45452",
      white: "#FCFCFC",
      body: "#5C5C5C",
      title: "#1E2222",
      label: "#888888",
      placeholder: "#BBBBBB",
      line: "#D7D7D7"
    }
  },
  plugins: [],
}
