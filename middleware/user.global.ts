import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserStore } from '~/store/user.store'
import { authApi } from '~/base/api/auth/api'

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useUserStore()
  const tokenCookie = useCookie('auth-token')

  // Если пользователь уже авторизован, пропускаем этот middleware
  if (store.isUserLogged) return

  // Если пользователь пытается попасть на /my-subs без токена, редиректим на /subs
  if (to.path === '/my-subs' && !tokenCookie.value) {
    return navigateTo('/subs?unauthorized=true')
  }

  // Если токен есть, пытаемся получить данные о пользователе
  if (tokenCookie.value) {
    try {
      const userData = await authApi.getMe()
      store.setUserLogged(true)
      store.setUser(userData)
    } catch (err) {
      console.error('Ошибка при получении данных пользователя:', err)
      store.setUserLogged(false)
      tokenCookie.value = null
      // Если что-то пошло не так, редиректим на /subs с параметром unauthorized
      return navigateTo('/subs?unauthorized=true')
    }
  }

  // Если мы находимся уже на странице /subs, не делаем редирект, чтобы избежать зацикливания
  if (to.path === '/subs' && to.query.unauthorized) {
    return
  }
})
