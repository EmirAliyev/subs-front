<script setup>
import { ref, reactive, watch } from 'vue'
import Dialog from '~/base/ui/Dialog.vue'
import Select from '~/base/ui/Select.vue'
import DatePicker from '~/base/ui/DatePicker.vue'
import MONTH_OPTIONS from '~/base/configs/month_options'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  subForm: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['close', 'confirm'])
const isOpen = defineModel()

const form = reactive({
  period: props.subForm?.period ?? null,
  date_start: props.subForm?.date_start ?? null,
})

const handleReset = () => {
  form.period = null
  form.date_start = null
}

const handleClose = () => {
  isOpen.value = false
  handleReset()
}

const handleConfirm = () => {
  emit('confirm', { ...form })
  handleReset()
}
</script>

<template>
  <Dialog
    v-model="isOpen"
    :title="`Добавить подписку «${name}»`"
    :loading="loading"
    @close-modal="handleClose"
    @confirm="handleConfirm"
  >
    <template #content>
      <div class="add-sub-modal-content">
        <Select :options="MONTH_OPTIONS" v-model="form.period" placeholder="Выберите период" />
        <DatePicker v-model="form.date_start" disableFuture  placeholder="Выберите дату начала подписки"/>
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.add-sub-modal-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
