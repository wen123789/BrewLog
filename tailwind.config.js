/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        coffee: {
          50: '#fdfbf7',
          100: '#f8f3ea',
          200: '#efe6d5',
          300: '#e4d5bc',
          400: '#d4b994',
          500: '#c49a6c',
          600: '#a67c52',
          700: '#8b6243',
          800: '#734f38',
          900: '#5e4130',
          950: '#321f18',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#f9f0e3',
          300: '#f3e5d0',
          400: '#e9d4b8',
          500: '#d9bc94',
        },
        forest: {
          50: '#f4f7f4',
          100: '#e6ece5',
          200: '#ccd9ca',
          300: '#a8c0a5',
          400: '#7fa07a',
          500: '#5f805c',
          600: '#4a6648',
          700: '#3d533c',
          800: '#354534',
          900: '#2e3b2d',
        },
      },
    },
  },
  plugins: [],
};