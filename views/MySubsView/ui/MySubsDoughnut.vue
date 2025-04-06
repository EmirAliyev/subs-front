<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs'
const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      hoverOffset: 4,
    },
  ],
}

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>

<template>
  <Doughnut :data="data" :options="chartOptions" class="my-subs-doughnut" />
</template>

<style lang="scss" scoped>
.my-subs-doughnut {
  max-height: 440px;

}
</style>
