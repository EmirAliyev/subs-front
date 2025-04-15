<script setup>
import SubCardCreateDialog from '../SubCard/ui/CreateSubModal.vue'
import MiniButton from '../../SubCard/ui/MiniButton.vue'
import { subCardsApi } from '~/base/api/sub-cards/api'
import { useUserStore } from '~/store/user.store'
import DeleteConfirm from '../DeleteConfirm.vue'

const isCreateModalOpen = ref(false)
const isConfirmModalOpen = ref(false)
const loading = ref(false)

const emit = defineEmits(['card-action'])

const props = defineProps({
  name: String,
  is_subscribed: Boolean,
  card_id: Number,
  hideMiniButton: {
    type: Boolean,
    default: false,
  },
})

const store = useUserStore()
const { id: user_id } = store.user

const handleAction = async (type, data = {}) => {
  try {
    loading.value = true
    const body = {
      user_id,
      card_id: props.card_id,
    }

    if (type === 'add') {
      await subCardsApi.addCardToUser({ ...body, ...data })
      isCreateModalOpen.value = false
    } else {
      await subCardsApi.removeCardFromUser(body)
      isConfirmModalOpen.value = false
    }

    emit('card-action')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const handleClick = () => {
  if (props.is_subscribed) {
    isConfirmModalOpen.value = true
  } else {
    isCreateModalOpen.value = true
  }
}

</script>

<template>
  <MiniButton
    v-if="!hideMiniButton && store.isHasUser"
    :active="is_subscribed"
    :loading="loading"
    @click.stop="handleClick"
  />

  <DeleteConfirm
    v-if="is_subscribed"
    v-model="isConfirmModalOpen"
    :loading="loading"
    @confirm="() => handleAction('remove')"
  />

  <SubCardCreateDialog
    v-else
    v-model="isCreateModalOpen"
    :loading="loading"
    :name="name"
    @confirm="(form) => handleAction('add', form)"
  />
</template>
