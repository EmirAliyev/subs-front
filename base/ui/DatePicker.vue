<script setup>
import { watch, ref } from 'vue'

const value = defineModel()
const props = defineProps({
  disableFuture: {
    type: Boolean,
    default: false,
  },
})

const disableDate = (ts) => {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

  if (props.disableFuture) return ts > todayStart
  if (props.disablePast) return ts < todayStart

  return false
}
</script>

<template>
  <n-date-picker
    size="large"
    placeholder="Выберите дату"
    type="date"
    :actions="null"
    update-value-on-close
    value-format="yyyy-MM-dd"
    v-model:formatted-value="value"
    :is-date-disabled="disableDate"
  />
</template>
