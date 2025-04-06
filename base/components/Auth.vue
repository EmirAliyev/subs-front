<script setup>
import { telegramLoginTemp } from 'vue3-telegram-login'
import { useUserStore } from '~/store/user.store'
const store = useUserStore()

let telegramLoadedCallbackFunc = async (data) => {}
</script>

<template>
  <telegram-login-temp
    mode="callback"
    telegram-login="subradar_bot"
    @callback="telegramLoadedCallbackFunc"
  />
</template>
