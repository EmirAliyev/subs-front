<script setup>
import PeriodChart from './ui/PeriodChart.vue'
</script>
<template>
  <div class="expenses">
    <div class="expenses-period">
      <h1 class="expenses-period-title">Расходы за период</h1>
      <PeriodChart />
    </div>
  </div>
</template>

<style scoped lang="scss">
.expenses {
  &-period {
    &-title {
      font-weight: 600;
      font-size: 48px;
      margin-bottom: 45px;
    }
  }
}
</style>
