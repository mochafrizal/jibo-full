/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgprimary: "#f7f8f9",
        primary: "#222222",
        accent: "34495E",
        whitecolor: "#ffffff",
        firstcolor: "#ff6600",
        secondcolor: "#333333",
        graycolor: "#cccccc",
        firstcolor: "#A02334",
        secondcolor: "#000",
        secondcolorlight: "#0c0c0c",
        whitecolor: "#FFF",
        blackcolor: "#000",
        graycolor: "#C4C4C450",
        paragraphcolor: "#000000B3",
      },
    },
  },
  plugins: [],
}