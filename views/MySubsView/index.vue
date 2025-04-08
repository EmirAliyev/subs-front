<script setup>
import SubCard from '~/base/components/SubCard/SubCard.vue'
import MySubsTable from './ui/MySubsTable.vue'
import Button from '~/base/ui/Button.vue'
import MySubsDoughnut from './ui/MySubsDoughnut.vue'
const tableData = [
  { name: 'Netflix', price: 23, period: '23 дня', date: '09.02.2024' },
  { name: 'Netflix', price: 23, period: '23 дня', date: '09.02.2024' },
  { name: 'Netflix', price: 23, period: '23 дня', date: '09.02.2024' },
]
</script>

<template>
  <div class="my-subs">
    <h1 class="my-subs-title">Мои подписки</h1>
    <div class="my-subs-content">
      <div class="my-subs-content-cards">
        <SubCard class="my-subs-content-cards-item" v-for="item in 14" />
      </div>
      <div class="my-subs-content-info">
        <div class="my-subs-content-info-block-price">
          <span class="price-title">Стоимость в месяц</span>
          <span class="price-sum">92$</span>
        </div>
        <MySubsDoughnut />
      </div>
    </div>
    <div class="my-subs-table-content">
      <h1 class="my-subs-table-content-title">Предстоящие оплаты</h1>
      <Button theme="white">Добавить подписку</Button>
    </div>
    <MySubsTable :table-data="tableData" />
  </div>
</template>

<style scoped lang="scss">
.my-subs {
  &-table-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 45px;

    &-title {
      font-weight: 600;
      font-size: 48px;
    }
  }

  &-title {
    font-weight: 600;
    font-size: 48px;
    margin-bottom: 52px;
  }

  &-content {
    display: flex;
    gap: 102px;
    margin-bottom: 75px;

    &-cards {
      max-width: 1054px;
      width: 100%;
      background: $light-grey;
      border-radius: 30px;
      height: 830px;
      padding: 46px 37px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 32px 25px;
      overflow: auto;

      &-item {
        background: white;
        margin: 0 auto;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: $purple;
        border-radius: 3px;
      }

      &::-webkit-scrollbar {
        display: none;
      }

      -ms-overflow-style: none;
      scrollbar-width: thin;
      scrollbar-color: $purple transparent;
    }

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      &-block-price {
        display: flex;
        flex-direction: column;
        gap: 4px;
        height: max-content;
        width: 100%;
        min-width: 480px;
        padding: 28px 45px;
        box-shadow: 0px 5px 15px 0px #00000030;
        border-radius: 35px;

        .price-title {
          font-weight: 600;
          font-size: 42px;
          line-height: 117%;
        }

        .price-sum {
          font-weight: 600;
          font-size: 72px;
          line-height: 117%;
          color: $purple;
        }
      }
    }
  }
}
</style>
