import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xxs': '240px',
      'xs': '320px',
      'sm': '450px',  
      'md': '540px',  
      'xl': '768px',
      '2xl': '1024px',
      '3xl': '1280px',
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-homePage": "linear-gradient(180deg, rgba(51,51,163,1) 0%, rgba(18,18,18,1) 60%)",
      },
      spacing: {
      
      },
      width: {
       
      },
    },
    minWidth: {
   
    },
  },
  plugins: [],
};
export default config;
