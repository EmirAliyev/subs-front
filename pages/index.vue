<script setup>
import SubCard from '~/base/components/SubCard.vue'
</script>

<template>
  <div class="banner">
    <h1 class="banner-title">SUBRADAR - ВСЕ ВАШИ ПОДПИСКИ В ОДНОМ МЕСТЕ</h1>
    <h6 class="banner-desc">
      Сервис для удобного управления подписками. Добавляйте, отслеживайте расходы и отключайте
      ненужные подписки в пару кликов, находите лучшие предложения и экономьте деньги.
    </h6>
  </div>
  <div class="top">
    <h2 class="top-title">Топовые предложения</h2>
    <Vue3Marquee
      :gradient="true"
      gradient-length="10%"
      duration="5"
      :clone="true"
      class="top-marquee"
    >
      <SubCard class="top-marquee-card" />
    </Vue3Marquee>
  </div>
</template>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 271px;
  border-radius: 50px;
  color: #ffffff;
  padding: 54px;
  font-weight: 600;
  font-size: 55px;
  background: url('~/public/images/banner-bg.png');
  margin-bottom: 40px;
  
  &-title {
    max-width: 935px;
    margin-bottom: 10px;
  }

  &-desc {
    max-width: 905px;
    font-weight: 300;
    font-size: 17px;
  }
}

.top {
  &-marquee {
    display: flex;
    height: 395px;

    &-card {
      margin-left: 48px;
    }
  }
  &-title {
    font-size: 32px;
    margin-bottom: 34px;
    font-weight: 600;
  }
}
</style>
