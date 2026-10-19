/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        md: "2rem",
        lg: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1220px",
        "2xl": "1220px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#002b60",
          dark: "#002563",
          deep: "#0b305b",
          darker: "#00162e",
          light: "#073b6c",
        },
        royal: "#06447d",
        heading: "#002563",
        gold: {
          DEFAULT: "#ffb800",
          light: "#ffd35a",
          lighter: "#ffe6a1",
          hover: "#ffce52",
          dark: "#e19b00",
          accent: "#eda500",
        },
        surface: "#f5fbff",
        muted: "#536889",
      },
      fontFamily: {
        body: ["Arial", "Helvetica", "sans-serif"],
        heading: ["Georgia", '"Times New Roman"', "serif"],
      },
      boxShadow: {
        card: "0 8px 30px rgba(6, 68, 125, 0.05)",
        lift: "0 12px 32px rgba(0, 43, 96, 0.12)",
        btn: "0 5px 16px rgba(255, 184, 0, 0.25)",
        form: "0 5px 20px rgba(0, 43, 96, 0.05)",
        modal: "0 10px 40px rgba(0, 22, 46, 0.35)",
      },
      borderRadius: {
        DEFAULT: "10px",
        card: "10px",
      },
      maxWidth: {
        container: "1220px",
      },
      keyframes: {
        "form-spin": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "form-spin": "form-spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
