import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
		'custom-light-brown': '#d9ad62',
		'custom-mid-brown': '#f4d59b',
		'custom-dark-brown': '#e0b15e',
		'custom-hover-white': '#e4eaf5',
      },
	  backgroundImage: {
        'gradient-custom': 'linear-gradient(to right, #fffaeb, #e0b15e)', // Define your gradient
      },
	  width: {
        '70': '70%',
		'90': '90%',
      },
    },
  },
  plugins: [],
};
export default config;
