<script setup>
import { NInput } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  round: {
    type: Boolean,
    default: false,
  },
})

const value = ref('')
</script>

<template>
  <n-input
    class="base-input"
    v-model:value="value"
    :round="round"
    :size="size"
    :clearable="clearable"
    :disabled="disabled"
    :type="type"
    :placeholder="placeholder"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </n-input>
</template>

<style scoped lang="scss">
.base-input {
  max-width: 320px;
  width: 100%;
}
</style>
