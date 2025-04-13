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
    transpile: ['naive-ui', 'vueuc']
  },
  runtimeConfig: {
    public: {
      backendDevPort: process.env.BACKEND_DEV_PORT,
      exchangeApi: process.env.EXCANGE_API,
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
        '7fd6-185-146-112-205.ngrok-free.app' // Добавь свой хост
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