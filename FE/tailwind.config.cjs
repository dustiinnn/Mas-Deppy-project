/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            hk: ["Hanken Grotesk"],
        },
        extend: {
            backgroundImage: {
                "circle-component": "url('./src/assets/images/component1.png')",
            },
        },
    },
    plugins: [],
};
