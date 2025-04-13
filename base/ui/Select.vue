<script setup>
defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Выбрать',
  },
})

const value = defineModel()
</script>

<template>
  <n-space vertical>
    <n-select v-model:value="value" size="large" :options="options" :placeholder="placeholder" />
  </n-space>
</template>
