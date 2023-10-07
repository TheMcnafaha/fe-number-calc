/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      "tp1-main-bg": " hsl(222, 26%, 31%)",
      "tp1-alt-bg": " hsl(223, 31%, 20%)",
      "tp1-screen-bg": " hsl(224, 36%, 15%)",

      "tp1-key-bg": " hsl(225, 21%, 49%)",
      "tp1-key-shadow": " hsl(224, 28%, 35%)",
      "tp1-key-alt-bg": " hsl(6, 63%, 50%)",
      "tp1-key-alt-shadow": " hsl(6, 70%, 34%)",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
