/** @type {import('tailwindcss').Config} */

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

module.exports = {
    content: ["./src/**/*.{vue,html,js}", "index.html", 'docs/content/**/*.md'],
    safelist: [
        ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
        ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
        ...labelsClasses.map((lbl) => `text-${lbl}-400`)
    ],
    darkMode: "class",
    theme: {
        extend: {
            maxHeight: {
                '0': '0',
                xl: '36rem',
            },
            colors: {
                'primary-color': '#002776', //blue option: #172554
                'second-color': '#EAB308', //yellow
                'third-color': '#ca8a04', //darkYellow
                'fourth-color': '#009c3b', //green
                'fifth-color': '#008249', //darkGreen
                'sixth-color': '#00b84e', // lightGreen
                button: {
                    cta: '#fff',
                }
            },
            gridTemplateColumns: {
                "1/5": "1fr 5fr"
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        function ({ addVariant }) {
            addVariant("initial", "html :where(&)");
        }
    ]
}