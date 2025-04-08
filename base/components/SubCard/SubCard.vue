<script setup>
import { computed } from 'vue'
import { getLastUpdatedText } from '~/base/utils/lastUpdate'
import { subCardsApi } from '~/base/api/sub-cards/api'
import { useUserStore } from '~/store/user.store'
import IconTime from '~/assets/svg/time.svg'
import MiniButton from './ui/MiniButton.vue'

const props = defineProps({
  card: {
    type: Object,
    default: () => {},
  },
})

const emit = defineEmits(['card-action'])
const store = useUserStore()

const currencySymbol = computed(() => {
  switch (props.card.currency) {
    case 'RUB':
      return '₽'
    case 'USD':
      return '$'
    case 'EUR':
      return '€'
    default:
      return ''
  }
})

const loading = ref(false)
const handleMiniButton = async () => {
  try {
    loading.value = true
    const { id } = store.user
    const body = {
      user_id: id,
      card_id: props.card.id,
    }

    if (props.card.is_subscribed) {
      await subCardsApi.removeCardFromUser(body)
    } else {
      await subCardsApi.addCardToUser(body)
    }
    emit('card-action')
    loading.value = false
  } catch (e) {
    loading.value = false
    console.log(e)
  }
}
</script>

<template>
  <div class="card">
    <NuxtImg class="card-img" :src="card.img" />
    <div class="card-info">
      <div class="card-info-header">
        <span class="card-info-header-name">{{ card.name }}</span>
        <span class="card-info-header-price">
          {{ card.price_per_month }} {{ currencySymbol }}
        </span>
      </div>
      <span class="card-info-category">{{ card.categories[0]?.name }}</span>
      <div class="card-info-bottom">
        <div class="card-info-bottom-update">
          <IconTime class="icon" />
          <span class="card-info-bottom-update-text">
            {{ getLastUpdatedText(card.lastUpdated) }}
          </span>
        </div>
        <div class="card-info-bottom-btn">
          <MiniButton :active="card.is_subscribed" :loading="loading" @click="handleMiniButton" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 310px;
  min-width: 310px;
  height: 365px;
  box-shadow: 0px 5px 20.6px -10px #0000006e;
  border-radius: 40px;
  padding: 20px 30px 20px 30px;
  gap: 8px;

  &-img {
    max-width: 232px;
    max-height: 232px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &-info {
    width: 100%;
    &-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 20px;
      font-weight: 600;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 11px;

      &-update {
        display: flex;
        align-items: center;
        color: $main-text;
        gap: 5px;
        font-size: 13px;
      }
    }

    &-category {
      font-size: 13px;
      font-weight: 300;
    }
  }
}
</style>
