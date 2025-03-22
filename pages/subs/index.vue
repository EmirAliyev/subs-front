<script setup>
import FilterIcon from '~/assets/svg/filter.svg'
import CircleArrowsIcon from '~/assets/svg/circle-arrows.svg'
import AngleRightIcon from '~/assets/svg/angle-right.svg'
import SubCard from '~/base/components/SubCard.vue'
import Button from '~/base/ui/Button.vue'
import RoundedButton from '~/base/ui/FilterButton.vue'
</script>

<template>
  <div class="subs">
    <div class="subs-header">
      <h1 class="subs-header-title">Все подписки</h1>
      <RoundedButton>
        <FilterIcon class="subs-header-filter-icon" />
      </RoundedButton>
    </div>
    <div class="subs-content">
      <div v-for="n in 18" :key="n" class="flip-card">
        <div class="flip-card-inner">
          <SubCard class="flip-card-front" />
          <div class="flip-card-back">
            <Button theme="white" size="large" class="flip-card-back-btn">
              <span>Оформить подписку</span>
              <AngleRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="subs-load">
      <CircleArrowsIcon class="subs-load-icon" />
      <span class="subs-load-text">Загрузить еще</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.subs {
  width: 100%;
  min-height: 100vh;

  &-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 53px;

    &-title {
      font-weight: 600;
      font-size: 48px;
    }

    &-filter-icon{
      width: 26px;
      height: 30px;
    }
  }

  &-content {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(295px, 1fr));
    gap: 48px;
    margin-bottom: 60px;
  }

  &-load {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: max-content;
    gap: 12px;
    font-weight: 300;
    font-size: 20px;
    margin: 0 auto;
  }
}

.flip-card {
  background-color: transparent;
  width: 100%;
  height: 100%;
  min-height: 365px;
  perspective: 1000px;
  cursor: pointer;

  &-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  &:hover &-inner {
    transform: rotateY(180deg);
  }

  &-front,
  &-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &-front {
    background-color: #fff;
    color: black;
  }

  &-back {
    cursor: pointer;
    transform: rotateY(180deg);
    display: flex;
    justify-content: center;
    align-items: end;
    font-size: 16px;
    box-shadow: 0px 5px 20.6px -10px #0000006e;
    border-radius: 40px;
    padding: 48px 20px;
    background: linear-gradient(
      360deg,
      rgba(66, 36, 94, 0.8) 25%,
      rgba(66, 36, 94, 0.75) 50%,
      rgba(55, 30, 78, 0.9) 100%
    );

    &-btn {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
