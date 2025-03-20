<script setup>
import IconTime from '~/assets/svg/time.svg'
</script>

<template>
  <div class="card">
    <NuxtImg class="card-img" src="/images/test-card.png" />
    <div class="card-info">
      <div class="card-info-header">
        <span class="card-info-header-name">Netflix</span>
        <span class="card-info-header-price">9.99$</span>
      </div>
      <span class="card-info-category">Развлечение</span>
      <div class="card-info-update">
        <IconTime class="icon" />
        <span class="card-info-update-text">Обновлено 5 дней назад</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  max-width: 310px;
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

    &-update {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      margin-top: 11px;
    }
  }
}
</style>
