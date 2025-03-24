export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    output: {
      dir: "dist"
    }
  },
  build: {
    transpile: ['naive-ui', 'vueuc']
  },
  modules: ['nuxt-svgo', '@nuxt/image'],
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/_variables.scss";`
        }
      }
    }
  }
})