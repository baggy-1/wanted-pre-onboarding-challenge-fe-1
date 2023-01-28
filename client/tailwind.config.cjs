/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-left": {
          from: {
            opacity: 0,
            transform: `translate3d(-3000px, 0, 0)`,
          },
          "60%": {
            opacity: 1,
            transform: `translate3d(25px, 0, 0)`,
          },
          "75%": {
            transform: `translate3d(-10px, 0, 0)`,
          },
          "90%": {
            transform: `translate3d(5px, 0, 0)`,
          },
          to: {
            transform: `none`,
          },
        },
        "fade-out-left": {
          from: {
            transform: `none`,
          },
          "30%": {
            transform: `translate3d(25px, 0, 0)`,
          },
          "75%": {
            opacity: 1,
          },
          to: {
            opacity: 0,
            transform: `translate3d(-3000px, 0, 0)`,
          },
        },
        "progress-bar": {
          from: {
            transform: "scaleX(1)",
          },
          to: {
            transform: "scaleX(0)",
          },
        },
      },
      animation: {
        "fade-in-left": "fade-in-left 0.5s ease-out forwards",
        "fade-out-left": "fade-out-left 0.5s ease-out forwards",
        "progress-bar": "progress-bar 3s linear forwards",
      },
    },
  },
  plugins: [],
};
