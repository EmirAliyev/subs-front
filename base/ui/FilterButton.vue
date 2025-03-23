<script setup>
defineProps({
  theme: {
    type: String,
    default: '',
  },
  nativeType: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <button
    @click.stop="handleClick"
    :disabled="disabled"
    :type="nativeType"
    :class="['base-filter-button', { 'base-button-white': theme === 'white' }]"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.base-filter-button {
  background: white;
  color: $main-text;
  border-radius: 21px;
  cursor: pointer;
  height: 60px;
  width: 60px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 20.6px -10px #0000006e;

  &-white {
    background: white;
    color: $main-text;
  }

  @media (max-width: $xl) {
    width: 32px;
    height: 32px;
    border-radius: 11px;
  }
}
</style>
