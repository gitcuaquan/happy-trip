import type { build } from "nuxt";
import type { devtools } from "vue";
import type auth from "./middleware/auth";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T2DNRD76');`,
        },
      ],
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
