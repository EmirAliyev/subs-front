export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'node-server',
    output: {
      dir: '.output'
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