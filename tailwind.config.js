/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#0F0F17",
                darker: "#08080D",
                purple: {
                    neon: "#B000FF",
                    light: "#D47DFF",
                    dark: "#7A00B8",
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
            },
            backdropBlur: {
                'xs': '2px',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}