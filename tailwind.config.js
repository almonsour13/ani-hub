/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    themes: [
      {
        mytheme: {
          primary: "#f0c38e",

          secondary: "#f1aa9b",

          accent: "#0057ff",

          neutral: "#48426d",

          "base-100": "#312c51",

          info: "#69bfff",

          success: "#00903a",

          warning: "#ac4200",

          error: "#ff3563",
        },
      },
    ],
  },
};
