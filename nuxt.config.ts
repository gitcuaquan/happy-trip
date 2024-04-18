// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  modules: [
    'nuxt-aos'
  ]
})
