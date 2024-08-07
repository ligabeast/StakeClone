/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#1475e1",
          600: "#105eb4",
        },
        gray: {
          600: "#1a2c38",
          700: "#0f212e",
          400: "#2f4553",
        },
      },
    },
  },
  plugins: [],
};
