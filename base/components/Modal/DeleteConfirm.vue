<script setup>
import Dialog from '~/base/ui/Dialog.vue'

const isOpen = defineModel({ required: true })
const emit = defineEmits(['confirm'])
</script>
<template>
  <Dialog
    v-model="isOpen"
    :title="`Окно подтверждения`"
    @close-modal="isOpen = false"
    @confirm="() => emit('confirm')"
  >
    <slot></slot>
    <template #content>
      <p class="confirm-default-text">Вы уверены, что хотите удалить?</p>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.confirm-default-text {
  font-size: 20px;
  font-weight: 500;
  color: $main-text;
}
</style>
