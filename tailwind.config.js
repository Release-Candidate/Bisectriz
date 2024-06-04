/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{ts,tsx}", "./index.html"],
    theme: {
        extend: {
            fontFamily: {
                zodiac: ["FreeMono"],
            },
            colors: {
                DarkBrown: {
                    light: "#bfab91",
                    DEFAULT: "#bfab91",
                    dark: "#bfab91",
                },
                LightBrown: {
                    light: "#f6dcbc",
                    DEFAULT: "#f6dcbc",
                    dark: "#f6dcbc",
                },
                DarkRed: {
                    light: "#8b2a02",
                    DEFAULT: "#8b2a02",
                    dark: "#8b2a02",
                },
            },
        },
    },
    plugins: [],
};
