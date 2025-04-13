<script setup>
import MySubsView from '~/views/MySubsView/index.vue'

useHead({
  title: 'Мои подписки — управление, аналитика и отслеживание расходов',
  meta: [
    {
      name: 'description',
      content:
        'Управляйте своими подписками, отслеживайте суммарные расходы, анализируйте категории и следите за датой следующей оплаты. Удобная аналитика и оптимизация расходов.',
    },
    {
      property: 'og:title',
      content: 'Мои подписки — аналитика расходов и отслеживание платежей',
    },
    {
      property: 'og:description',
      content:
        'Сервис для удобного управления подписками: анализ расходов, диаграммы по категориям и планирование следующих оплат.',
    },
    {
      property: 'og:image',
      content: '../../public/images/subradar.png',
    },
  ],
})
</script>

<template>
  <MySubsView />
</template>

<style scoped lang="scss"></style>
