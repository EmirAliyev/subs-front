<script setup>
import { telegramLoginTemp } from 'vue3-telegram-login'
import { useUserStore } from '~/store/user.store'
import { authApi } from '~/base/api/auth/api'
import Button from '../ui/Button.vue'
import { ref, onMounted } from 'vue'

const store = useUserStore()
const isLoggedIn = ref(false)

let telegramLoadedCallbackFunc = async (data) => {
  const { access_token } = await authApi.login(data)
  localStorage.setItem('auth-token', access_token)
  store.setUserLogged(true)
  store.setUser(data)
}

const logout = () => {
  localStorage.removeItem('auth-token')
  store.setUserLogged(false)
  store.setUser({})
}

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('auth-token')
    if (token) {
      const userData = await authApi.getMe()
      store.setUserLogged(true)
      store.setUser(userData)
    }
  } catch (error) {
    console.error('Не удалось получить данные пользователя:', error)
    store.setUserLogged(false)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div>
    <telegram-login-temp
      v-if="!store.isUserLogged"
      mode="callback"
      telegram-login="subradar_bot"
      @callback="telegramLoadedCallbackFunc"
    />
    <Button v-else theme="white" @click="logout">Выйти</Button>
  </div>
</template>
