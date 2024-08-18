/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            colors: {
                red: {
                    500: '#e9113c',
                    400: '#fe6e86',
                },
                blue: {
                    300: '#2f70d6',
                    400: '#4391e7',
                    500: '#1475e1',
                    600: '#105eb4',
                },
                gray: {
                    900: '#031a22',
                    800: '#071d2a',
                    700: '#0f212e',
                    600: '#1a2c38',
                    500: '#213743',
                    400: '#2f4553',
                    300: '#557086',
                    200: '#b1bad3',
                },
                green: {
                    700: '#69c267',
                    600: '#419e3f',
                    500: '#00e701',
                    400: '#1fff20',
                },
            },
        },
    },
    plugins: [],
};
