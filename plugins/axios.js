import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const baseURL = process.env.NODE_ENV === 'production'
    ? config.public.apiUrlProd
    : config.public.apiUrlDev

  const instance = axios.create({
    baseURL: `${baseURL}/api`,
  })

  instance.interceptors.request.use((config) => {
    if (process.client) {
      const token = localStorage.getItem('auth-token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })

  nuxtApp.provide('axios', instance)
})
