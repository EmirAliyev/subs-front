<script setup>
import { Doughnut } from 'vue-chartjs'
import { useUserStore } from '~/store/user.store'
import { ref, computed, onMounted } from 'vue'
import { userApi } from '~/base/api/user/api'

const store = useUserStore()
const isLoading = ref(true)
const chartData = ref({ labels: [], quantity: [] })

const COLORS = [
  '#4F46E5', // Indigo
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#9CA3AF', // Gray for "Другие"
]

const fetchData = async () => {
  const { id } = store.user
  const response = await userApi.getUserSubsCategories(id)

  const combined = response.labels.map((label, index) => ({
    name: label,
    count: response.quantity[index],
  }))

  const sorted = combined.sort((a, b) => b.count - a.count)
  const topFive = sorted.slice(0, 5)
  const others = sorted.slice(5)

  const labels = topFive.map((item) => item.name)
  const quantity = topFive.map((item) => item.count)

  if (others.length > 0) {
    labels.push('Другие')
    quantity.push(others.reduce((sum, item) => sum + item.count, 0))
  }

  chartData.value = { labels, quantity }
  isLoading.value = false
}

onMounted(fetchData)

const data = computed(() => ({
  labels: chartData.value.labels,
  datasets: [
    {
      data: chartData.value.quantity,
      backgroundColor: COLORS.slice(0, chartData.value.labels.length),
      hoverOffset: 4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <Doughnut v-if="!isLoading" :data="data" :options="chartOptions" class="my-subs-doughnut" />
</template>

<style lang="scss" scoped>
.my-subs-doughnut {
  max-height: 440px;
}
</style>
