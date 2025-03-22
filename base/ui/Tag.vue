<script setup>
import IconX from '~/assets/svg/x.svg'
const emit = defineEmits(['update-tag'])

const props = defineProps({
  closeIcon: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="tag">
    <IconX v-if="closeIcon" class="tag-icon" @click="emit('update-tag')" />
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: $light-grey;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 300;
  cursor: default;

  &-icon {
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: $purple;
    }
  }
}
</style>
