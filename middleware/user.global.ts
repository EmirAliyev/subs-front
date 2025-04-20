import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserStore } from '~/store/user.store'
import { authApi } from '~/base/api/auth/api'

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useUserStore()

  const tokenCookie = useCookie('auth-token')

  if (tokenCookie.value) {
    try {
      const userData = await authApi.getMe()
      store.setUserLogged(true)
      store.setUser(userData)
    } catch (err) {
      console.error('Ошибка при получении данных пользователя:', err)
      store.setUserLogged(false)
      tokenCookie.value = null
    }
  }

  if (!store.isUserLogged && to.path === '/my-subs') {
    return navigateTo('/subs')
  }
})
