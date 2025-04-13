import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useUserStore } from '~/store/user.store'
import { authApi } from '~/base/api/auth/api'

export default defineNuxtRouteMiddleware(async () => {
  if (process.client) {
    const store = useUserStore()

    if (store.isUserLogged) return

    const token = localStorage.getItem('auth-token')

    if (token) {
      try {
        const userData = await authApi.getMe()
        store.setUserLogged(true)
        store.setUser(userData)
      } catch (err) {
        console.error('Ошибка при получении данных пользователя:', err)
        store.setUserLogged(false)
        localStorage.removeItem('auth-token')
      }
    }
  }
})
