// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  css: ["~/assets/css/main.css"],
  runtimeConfig: { public: { baseUrl: process.env.BASE_URL } },
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
      Montserrat: [400],
    },
  },
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/apollo"],
  apollo: {
    autoImports: true,
    // authType: "Bearer",
    // authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: { httpEndpoint: process.env.BASE_URL + "/graphql" },
      tokenName: "apollo:<client-name>.token",
      tokenStorage: "cookie",
      // authType: "Bearer",
      // authHeader: "Authorization",
    },
  },
});
