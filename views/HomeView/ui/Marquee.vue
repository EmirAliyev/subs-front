<script setup>
import SubCard from '~/base/components/SubCard/SubCard.vue'
import { subCardsApi } from '~/base/api/sub-cards/api'
import { API_SUBCARDS_KEYS } from '~/base/api/sub-cards/keys'

const { status, data: subCards } = useAsyncData(API_SUBCARDS_KEYS.TOP_SUBCARDS, () =>
  subCardsApi.getTopSubs()
)

console.log(subCards, 53)
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
  <Vue3Marquee
    :gradient="true"
    :gradient-length="gradientLength"
    :pause-on-hover="true"
    duration="12"
    :clone="true"
    class="marquee"
  >
    <div class="marquee-card-wrapper" v-for="card in subCards?.slice(0, 5)" :key="card.id">
      <SubCard hide-mini-button class="marquee-card" :card="card" />
    </div>
  </Vue3Marquee>

  <Vue3Marquee
    :gradient="true"
    :gradient-length="gradientLength"
    duration="12"
    :pause-on-hover="true"
    :clone="true"
    class="marquee"
    direction="reverse"
  >
    <div class="marquee-card-wrapper" v-for="card in subCards?.slice(5, 10)" :key="card.id">
      <SubCard hide-mini-button class="marquee-card" :card="card" />
    </div>
  </Vue3Marquee>
</template>

<style scoped lang="scss">
.marquee {
  display: flex;
  height: 395px;

  &-card {
    margin-left: 48px;
  }
}
</style>
