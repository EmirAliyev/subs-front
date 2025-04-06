import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: 'http://localhost:10005/api',
  })

  instance.interceptors.request.use((config) => {
    // Проверка, что код выполняется на клиенте
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
