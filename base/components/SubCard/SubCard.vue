<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    default: () => {}
  }
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

const jsonLdData = computed(() => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": props.card.name,
  "description": props.card.description,
  "image": props.card.img,
  "offers": {
    "@type": "Offer",
    "url": `https://finance.ingroup.tech/stats/general?sources_ids[0]=1&webs_ids[0]=1&sites_ids[0]=4`, // Используйте динамическую ссылку для каждой карточки
    "priceCurrency": "RUB",
    "price": props.card.price_per_month,
    "itemCondition": "https://schema.org/NewCondition"
  }
}))
</script>

<template>
  <div class="card">
    <script type="application/ld+json">
      {{ JSON.stringify(jsonLdData.value) }}
    </script>

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
