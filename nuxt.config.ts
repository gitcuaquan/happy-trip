// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/img/logohpt.png" }],
    },
  },
  css: ["~/assets/styles/main.scss"],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  modules: [
    "nuxt-aos",
    "nuxt-gtag",
    [
      "nuxt-mail",
      {
        message: {
          to: "happytripexpress@gmail.com",
        },
        smtp: {
          host: "smtp.gmail.com",
          port: 587,
          auth: {
            user: "happytripexpress@gmail.com",
            pass: "xbxc lmci kldt lusk",
          },
        },
      },
    ],
  ],
  gtag: {
    id: "AW-16661686858",
  },
});
