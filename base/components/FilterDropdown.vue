<script setup>
import { h, defineEmits } from 'vue'
import Checkbox from '../ui/Checkbox.vue'
const emit = defineEmits(['update-options'])

const props = defineProps({
  options: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    default: '',
  },
  showDropdown: {
    type: Boolean,
    default: null,
  },
})

const dropdownProps = computed(() => {
  return props.showDropdown !== null ? { show: props.showDropdown } : { trigger: props.trigger }
})

const renderLabel = (option) => {
  return renderLabelComponent(option)
}

const handleSelect = (key) => {
  emit('update-options', key)
}

const renderLabelComponent = (option) => {
  // Динамически добавляем класс на основе состояния checked
  const labelClass = option.checked ? 'dropdown-label dropdown-label-active' : 'dropdown-label'

  return h('div', [
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        },
      },
      [
        h(Checkbox, {
          checked: option.checked,
        }),
        h('p', { class: labelClass }, option.label),
      ]
    ),
  ])
}
</script>

<template>
  <ClientOnly>
      <n-dropdown
        size="large"
        v-bind="dropdownProps"
        :render-label="renderLabel"
        :options="options"
        @select="handleSelect"
      >
        <slot></slot>
      </n-dropdown>
  </ClientOnly>
</template>

<style scoped lang="scss"></style>
