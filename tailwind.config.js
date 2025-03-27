const defaultTheme = require('tailwindcss/defaultTheme')
export default {
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
            map[index] = `${index}px`;
            return map;
        }, {}),
        extend: {
            fontSize: ({ theme }) => ({
                ...theme("spacing"),
                base: ['14px', { lineHeight: '18px' }],
            }),
            width: {
                '82-1': '82%',
                '100-1': '100%',
            },
            height: {
                '82-1': '82%',
                '100-1': '100%',
            }
        },
        colors: {
            white: '#fff',
            black: '#333',
        }
    },
    plugins: [],
}
