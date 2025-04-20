// plugins/axios.ts
import axios from 'axios'
import { parseCookies } from 'h3'
import { createDiscreteApi } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  let msg
  const baseURL =
    process.env.NODE_ENV === 'production' ? config.public.apiUrlProd : config.public.apiUrlDev

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

    const { message } = createDiscreteApi(['message'], {
      messageProviderProps: { placement: 'top-right' },
    })


    msg = message

    return config
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error)
      if (msg) {
        if (error.response) {
          msg.error(`Ошибка: ${error.response.data.message || 'Неизвестная ошибка'}`)
        } else if (error.request) {
          msg.error('Нет ответа от сервера. Пожалуйста, попробуйте снова.')
        } else {
          msg.error('Произошла ошибка при настройке запроса.')
        }
      }
      return Promise.reject(error)
    }
  )

  nuxtApp.provide('axios', instance)
})
