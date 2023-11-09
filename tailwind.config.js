/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{vue,html,js}", "index.html"],
    darkMode: "class",
    theme: {
        extend: {
            maxHeight: {
                '0': '0',
                xl: '36rem',
            },
            colors: {
                yellowBrazil: '#EAB308',
                darkYellowBrazil: '#ca8a04',
                greenBrazil: '#009c3b',
                darkGreenBrazil: '#008249',
                blueBrazil: '#002776'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
}