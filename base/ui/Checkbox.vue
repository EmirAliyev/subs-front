<script setup>
import { defineEmits } from 'vue'
import { NCheckbox } from 'naive-ui'

const props = defineProps({
  size: {
    type: String,
    default: 'small',
  },
})
const emit = defineEmits(['update:checked'])

const onCheckedChange = (value) => {
  emit('update:checked', value)
}
</script>

<template>
  <NCheckbox
    class="base-checkbox"
    :size="size"
    :checked="checked"
    @update:checked="onCheckedChange"
  />
</template>

<style scoped lang="scss">
.base-checkbox {
  width: 16px;
  height: 16px;
}
</style>
