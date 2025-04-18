import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserStore } from '~/store/user.store'
import { authApi } from '~/base/api/auth/api'

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useUserStore()
  const tokenCookie = useCookie('auth-token')

  if (store.isUserLogged) return

  if (to.path === '/my-subs' && !tokenCookie.value) {
    return navigateTo('/subs?unauthorized=true')
  }

  if (tokenCookie.value) {
    try {
      const userData = await authApi.getMe()
      store.setUserLogged(true)
      store.setUser(userData)
    } catch (err) {
      console.error('Ошибка при получении данных пользователя:', err)
      store.setUserLogged(false)
      tokenCookie.value = null
      return navigateTo('/subs?unauthorized=true')
    }
  }
})
