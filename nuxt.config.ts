import { repositoryName, apiEndpoint } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "TiskniLepe3D",
      htmlAttrs: { lang: "cs" },
      meta: [{ charset: "utf-8" }],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  css: ["~/assets/css/fonts.css"],

  modules: ["@nuxt/eslint", "@nuxtjs/prismic"],

  scripts: {
    registry: {
      googleAnalytics: {
        id: "G-XTE4079ZX7",
      },
    },
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: false,
    toolbar: false,
    clientConfig: {
      routes: [
        {
          type: "page",
          path: "/:uid",
        },
        {
          type: "page",
          uid: "home",
          path: "/",
        },
      ],
    },
  },
  compatibilityDate: "2025-07-16",
});
