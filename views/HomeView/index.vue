<script setup>
import Marquee from './ui/Marquee.vue'
</script>

<template>
  <div class="banner">
    <h1 class="banner-title">SUBRADAR - ВСЕ ВАШИ ПОДПИСКИ В ОДНОМ МЕСТЕ</h1>
    <h6 class="banner-desc">
      Сервис для удобного управления подписками. Узнавайте актуальные цены, добавляйте свои подписки
      и анализируйте расходы. Находите лучшие предложения, оптимизируйте свои затраты и экономьте
      деньги.
    </h6>
  </div>
  <div class="top">
    <h2 class="top-title">Топовые предложения</h2>
    <Marquee />
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
  background: url('~/public/images/banner-bg.png') no-repeat center center;
  margin-bottom: 40px;

  @media (max-width: $md) {
    height: 100%;
    padding: 22px 38px;
  }

  &-title {
    max-width: 941px;
    line-height: 117%;
    vertical-align: middle;
    margin-bottom: 10px;

    @media (max-width: $xl) {
      font-size: 38px;
    }

    @media (max-width: $md) {
      font-size: 30px;
      max-width: 524px;
    }

    @media (max-width: $sm) {
      font-size: 24px;
    }
  }

  &-desc {
    max-width: 905px;
    font-weight: 300;
    font-size: 17px;

    @media (max-width: $xl) {
      font-size: 15px;
    }

    @media (max-width: $md) {
      font-size: 12px;
      max-width: 636px;
    }
  }
}

.top {
  &-title {
    font-size: 32px;
    margin-bottom: 34px;
    font-weight: 600;
  }
}
</style>
