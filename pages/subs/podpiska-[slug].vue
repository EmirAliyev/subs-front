<script setup>
import { useRoute } from 'vue-router'
import OneSubView from '~/views/OneSubView/index.vue'
import { subCardsApi } from '~/base/api/sub-cards/api'
import { API_SUBCARDS_KEYS } from '~/base/api/sub-cards/keys'

const route = useRoute()

const { data: subCard, refresh } = useAsyncData(
  API_SUBCARDS_KEYS.SUBCARD,
  () => subCardsApi.getSubBySlug(route.params.slug),
  {
    watch: [() => route.params.slug],
    server: true,
  }
)

console.log(subCard.value, 534)

useHead({
  title: () =>
    subCard.value?.name
      ? `Подписка ${subCard.value.name} - цена, описание, аналитика`
      : 'Подписки - сравнение и аналитика',
  meta: [
    {
      name: 'description',
      content: () =>
        subCard.value?.description
          ? `${subCard.value.description} | Цена: $${subCard.value.price_per_month}/мес`
          : 'Сравнение подписок, цены, аналитика использования',
    },
    {
      property: 'og:title',
      content: () => (subCard.value?.name ? `Подписка ${subCard.value.name}` : 'Подписки'),
    },
    {
      property: 'og:description',
      content: () => subCard.value?.description || 'Сравнение подписок и аналитика',
    },
    {
      property: 'og:image',
      content: () => subCard.value?.img || '/default-subscription-image.jpg',
    },
    { property: 'og:type', content: 'website' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => ({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: subCard.value?.name,
        description: subCard.value?.description,
        image: subCard.value?.img,
        brand: {
          '@type': 'Brand',
          name: subCard.value?.name,
        },
        offers: {
          '@type': 'Offer',
          price: subCard.value?.price_per_month,
          priceCurrency: subCard.value?.currency || 'USD',
        },
      }),
    },
  ],
})
</script>

<template>
  <OneSubView v-if="!pending" :card="subCard" @update-sub="refresh" />
</template>

<style scoped lang="scss"></style>
