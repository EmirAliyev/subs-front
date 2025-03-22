<script setup>
import Tag from '../ui/Tag.vue'

const emit = defineEmits('update-tags')
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="tags">
    <Tag v-for="tag in options" :key="tag.key" closeIcon @update-tag="emit('update-tags', tag.key)">
      {{ tag.label }}
    </Tag>
  </div>
</template>

<style scoped lang="scss">
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
