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
		'custom-light-brown': '#fffaeb',
		'custom-dark-brown': '#e0b15e',
      },
	  backgroundImage: {
        'gradient-custom': 'linear-gradient(to right, #fffaeb, #e0b15e)', // Define your gradient
      },
	  width: {
        '90': '90%', // Custom width for 90%
      },
    },
  },
  plugins: [],
};
export default config;
