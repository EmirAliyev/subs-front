<script setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs'

const chartData = {
  type: 'line',
  labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
  datasets: [
    {
      label: 'Продажи',
      data: [10, 20, 15, 25, 30, 40],
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      fill: true,
    },
  ],
}

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>

<template>
  <div class="expenses-period-chart">
    <Line :data="chartData" :options="chartOptions" height="400"/>
  </div>
</template>

<style scoped lang="scss">
.expenses-period-chart {
  max-width: 100%;
  margin: 0 auto;
}
</style>
