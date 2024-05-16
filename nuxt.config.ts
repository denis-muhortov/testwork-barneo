export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      title: "test",
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: { 
      name: 'page', 
      mode: 'out-in' 
    }
  },

  components: [
    "~/components",
  ],

  css: [
    "@/assets/style/index.scss",
  ],
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    "@nuxt/ui"
  ],

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
})