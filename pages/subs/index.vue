<script setup>
import SubsView from '~/views/SubsView/index.vue'

useHead({
  title: 'Все популярные подписки в одном месте — сравнение и цены',
  meta: [
    {
      name: 'description',
      content:
        'Сравните цены и условия подписок: музыка, фильмы, облачные сервисы и другое. Актуальные тарифы на все платформы в одном месте.',
    },
    {
      property: 'og:description',
      content:
        'Сравните цены и условия подписок: музыка, фильмы, облачные сервисы и другое. Актуальные тарифы на все платформы в одном месте.',
    },
    {
      property: 'og:image',
      content: '../../public/images/subradar.png',
    },
  ],
})
</script>

<template>
  <SubsView />
</template>
