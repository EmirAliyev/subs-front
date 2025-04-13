<script setup>
import { useSlots } from 'vue'
import Button from './Button.vue'
import IconX from '~/assets/svg/x.svg'

const showModal = defineModel({ required: true })
const emit = defineEmits(['close-modal', 'confirm'])
defineProps({
  title: {
    type: String,
    default: '',
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()
const hasFooterSlot = !!slots.footer
</script>

<template>
  <slot></slot>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra
        ><IconX class="modal-close" v-if="showClose" @click="() => emit('close-modal')" />
      </template>

      <slot name="content"></slot>
      <template #footer>
        <slot name="footer" v-if="hasFooterSlot" />
        <div v-else class="modal-footer">
          <Button @click="() => emit('close-modal')">Отменить</Button>
          <Button @click="() => emit('confirm')" theme="white" :loading="loading"
            >Подтвердить</Button
          >
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped lang="scss">
.modal-footer {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.modal-close {
  cursor: pointer;
}

::v-deep(.n-card-header__main) {
  color: $main-text !important;
  font-weight: 400 !important;
  font-size: 18px;
}
</style>
