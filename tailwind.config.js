/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      // key: "hsl(30, 25%, 89%) ",
      // calculator keys
      // "key-text": " hsl(221, 14%, 31%)",
      // "key-border": " hsl(28, 16%, 65%)",
      // "key-blue": "hsl(225, 21%, 49%)",
      // "key-blue-bg": " hsl(224, 28%, 35%)",
      // "key-red": " hsl(6, 63%, 50%)",
      // "key-red-bg": " hsl(6, 70%, 34%)",
      // calulator body
      // "body-bg": " hsl(222, 26%, 31%)",
      // "display-bg": " hsl(224, 36%, 15%)",
      // "keypad-bg": " hsl(223, 31%, 20%)",
      // white: " hsl(0, 0%, 100%)",
      // theme 2
      "bg-color": "var(--bg-color)",
      "key-text": "var(--key-text)",
      "alt-key-text": "var(--alt-key-text)",
      "key-bg": "var(--key-bg)",
      "key-border": "var(--key-border)",
      "alt-key-bg": "var(--alt-key-bg)",
      "alt-key-border": "var(--alt-key-border)",
      "display-bg": "var(--display-bg)",
      "keypad-bg": "var(--keypad-bg)",
      "accent-bg": "var(--accent-bg)",
      "accent-border": "var(--accent-border)",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
