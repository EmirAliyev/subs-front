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
    :class="[
      'base-button',
      { 'base-button-white': theme === 'white' },
      { 'base-button-large': size === 'large' },
    ]"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  background: $purple;
  color: white;
  border-radius: 15px;
  padding: 9px 26px;
  cursor: pointer;
  height: 44px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: $xs) {
    font-size: 16px;
  }

  &-white {
    background: white;
    color: $purple;
    border: 1px solid $purple;
  }

  &-large {
    height: 50px;
    padding: 14px 20px;
    font-weight: 600;
  }
}
</style>
