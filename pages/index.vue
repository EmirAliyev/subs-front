<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SubCard from '~/base/components/SubCard.vue'

const gradientLength = ref('10%')

const updateGradientLength = () => {
  const width = window.innerWidth
  if (width < 768) {
    gradientLength.value = '2%' 
  } else if (width < 1440) {
    gradientLength.value = '4%' 
  } else {
    gradientLength.value = '10%'  
  }
}

onMounted(() => {
  updateGradientLength() 
  window.addEventListener('resize', updateGradientLength)  
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateGradientLength) 
})
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
      :pause-on-hover="true"
      :gradient-length="gradientLength"
      duration="5"
      :clone="true"
      class="top-marquee"
    >
      <div class="top-marquee-card-wrapper">
        <SubCard class="top-marquee-card" />
      </div>
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
  &-marquee {
    display: flex;
    height: 395px;

    &-card {
      margin-left: 48px;
      cursor: pointer;
    }
  }
  &-title {
    font-size: 32px;
    margin-bottom: 34px;
    font-weight: 600;
  }
}
</style>
