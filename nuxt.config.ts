// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: false,
    css: [
        '~/assets/css/main.css',
        'notivue/notification.css',
        'notivue/notification-progress.css',
        'notivue/animations.css',
    ],
    plugins: ['~/plugins/pinia.js', '~/plugins/apollo-overwrite.js'],
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL,
            oddParam: process.env.ODD_PARAM_A,
            websocketUrl: process.env.WEBSOCKET_URL,
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    googleFonts: {
        download: true,
        preload: true,
        families: {
            Montserrat: [400, 500, 600, 700],
        },
    },
    modules: ['@nuxtjs/google-fonts', '@nuxtjs/apollo', 'notivue/nuxt'],
    apollo: {
        autoImports: true,
        // authType: "Bearer",
        // authHeader: "Authorization",
        tokenStorage: 'cookie',
        // proxyCookies: true,
        clients: {
            default: {
                httpEndpoint: process.env.BASE_URL + '/graphql',
                inMemoryCacheOptions: {},
            },
            // tokenName: "apollo:<client-name>.token",
            // tokenStorage: "cookie",
            // authType: "Bearer",
            // authHeader: "Authorization",
        },
    },
    notivue: {
        position: 'top-left',
        limit: 4,
        enqueue: true,
        avoidDuplicates: false,
        notifications: {
            global: {
                duration: 3000,
            },
        },
    },
});
