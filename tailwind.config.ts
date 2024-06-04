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
				"regal-blue": "#243c5a",
			},
			transitionDuration: {
				"800": "800ms",
				"950": "950ms",
				"1700":"1700ms",
				"2300": "2300ms",
			},
			transitionTimingFunction: {
				"in-expo": "cubic-bezier(0.22, 0.82, 0.35, 0.95)",
			},
			keyframes: () => ({
				slideRight: {
					"0%": { transform: "translateX(-10px)" },
					"100%": { transform: "translateX(0px)" },
				},
				slideLeft: {
					"0%": { transform: "translateX(10px)" },
					"100%": { transform: "translateX(0px)" },
				},
			}),
			animation: {
				slideRight: "slideRight 1s ease-in",
				slideLeft: "slideLeft 1s ease-in",
			},
		},
	},
	plugins: [],
};
export default config;
