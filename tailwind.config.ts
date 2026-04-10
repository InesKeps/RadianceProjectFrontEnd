import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // assure-toi que tes fichiers sont bien inclus
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0DABCB",
        secondary: "#9616cc",
        accent: "#0caccc",
      },
    },
  },
  plugins: [],
};

export default config;
