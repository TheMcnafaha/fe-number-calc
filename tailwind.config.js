/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      // new colors xdd
      "key-text": " hsl(221, 14%, 31%)",
      "key-border": " hsl(28, 16%, 65%)",
      key: "hsl(30, 25%, 89%) ",
      "key-blue": "hsl(225, 21%, 49%)",
      "key-blue-bg": " hsl(224, 28%, 35%)",
      "key-red": " hsl(6, 63%, 50%)",
      "key-red-bg": " hsl(6, 70%, 34%)",
      "body-bg": " hsl(222, 26%, 31%)",
      "display-bg": " hsl(224, 36%, 15%)",
      "keypad-bg": " hsl(223, 31%, 20%)",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
