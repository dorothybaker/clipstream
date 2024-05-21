/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: { primary: "#1d61e1" },
      backgroundColor: { primary: "#1d61e1" },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  plugins: [],
};
