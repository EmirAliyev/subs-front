<script setup>
import IconTime from '~/assets/svg/time.svg'
import { getLastUpdatedText } from '~/base/utils/lastUpdate'

const props = defineProps({
  card: {
    type: Object,
    default: () => {},
  },
})

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
</script>

<template>
  <div class="card">
    <NuxtImg class="card-img" src="/images/test-card.png" />
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
        <div class="card-info-bottom-btn"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: 310px;
  min-width: 310px;
  height: 365px;
  box-shadow: 0px 5px 20.6px -10px #0000006e;
  border-radius: 40px;
  padding: 20px 30px 20px 30px;

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

    &-category {
      font-size: 13px;
      font-weight: 300;
    }

    &-bottom-update {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      margin-top: 11px;
    }
  }
}
</style>
