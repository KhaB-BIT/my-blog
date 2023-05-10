/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "main-background": "url('/src/img/background.jpg')",
            },
        },
    },
    plugins: [],
}
