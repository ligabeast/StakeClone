// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
  modules: ["@nuxtjs/google-fonts"],
});
