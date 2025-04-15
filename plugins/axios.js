// plugins/axios.ts
import axios from 'axios'
import { parseCookies } from 'h3'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const baseURL = process.env.NODE_ENV === 'production'
    ? config.public.apiUrlProd
    : config.public.apiUrlDev

  const instance = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true, 
  })

  instance.interceptors.request.use((config) => {
    if (process.client) {
      const token = useCookie('auth-token').value
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    // Сервер
    if (process.server) {
      const cookies = parseCookies(nuxtApp.ssrContext?.event)
      const token = cookies['auth-token']
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })

  nuxtApp.provide('axios', instance)
})
