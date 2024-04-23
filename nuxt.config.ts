// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: ['nuxt-aos', 'nuxt-gtag', ["nuxt-mail",{
    message: {
      to: 'tamanhquan2k@gmail.com',
    },
    smtp: {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: 'tamanhquan2k@gmail.com',
        pass: 'tnjh qeex jqio bdkr',
      },
    },
  }]],

})