

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    preset: "node-server",
    output: {
      dir: "dist"
    }
  },

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/images/favicon.png" }
      ]
    }
  },
  build: {
    transpile: ['naive-ui', 'vueuc'],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      apiUrlDev: process.env.NUXT_PUBLIC_API_URL_DEV,
      apiUrlProd: process.env.NUXT_PUBLIC_API_URL_PROD
    },
  },
  modules: ['nuxt-svgo', '@nuxt/image', '@pinia/nuxt'],
  svgo: {
    svgo: true,
    defaultImport: 'component',
    svgoConfig: {
      multipass: true,
    },
  },

  css: [
    '~/assets/scss/app.scss',
  ],

  vite: {

    server: {
      hmr: {
        clientPort: 443, // Для работы с HTTPS
      },
      allowedHosts: [
        'subradar.ru'
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/_variables.scss";`
        }
      }
    }
  },

  compatibilityDate: '2025-03-26'
})