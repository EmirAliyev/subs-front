<script setup>
import IconPlus from '~/assets/svg/plus.svg'
import IconMinus from '~/assets/svg/minus.svg'

defineProps({
  active: {
    required: true,
  },
  loading: {
    default: false,
    type: Boolean,
  },
})
</script>

<template>
  <button class="sub-card-mini-btn" :loading="loading" @click="handleClick">
    <p v-if="loading" class="spin">...</p>
    <IconMinus v-else-if="!loading && active" />
    <IconPlus v-else />
  </button>
</template>

<style scoped lang="scss">
.sub-card-mini-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $main-text;
  font-weight: 600;
  border: 1px solid $main-text;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  border-width: 1px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
