<script setup>
import { telegramLoginTemp } from 'vue3-telegram-login'
import { useUserStore } from '~/store/user.store'
import { authApi } from '~/base/api/auth/api'
import Button from '../ui/Button.vue'

const store = useUserStore()

let telegramLoadedCallbackFunc = async (data) => {
  const { access_token } = await authApi.login(data)
  localStorage.setItem('auth-token', access_token)
  const userData = await authApi.getMe()
  store.setUserLogged(true)
  store.setUser(userData)
}

const logout = () => {
  localStorage.removeItem('auth-token')
  store.setUserLogged(false)
  store.setUser({})
}
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
