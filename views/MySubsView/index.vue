<script setup>
import SubCard from '~/base/components/SubCard/SubCard.vue'
import MySubsTable from './ui/MySubsTable.vue'
import MySubsDoughnut from './ui/MySubsDoughnut.vue'
import CreateSubModal from '~/base/components/Modal/SubCard/ui/CreateSubModal.vue'
import { userApi } from '~/base/api/user/api'
import { useUserStore } from '~/store/user.store'
import { dateFormatter } from '~/base/utils/date_formatter'
import { subCardsApi } from '~/base/api/sub-cards/api'
import MONTH_OPTIONS from '~/base/configs/month_options'

const store = useUserStore()

const subs = ref([])
const getUserSubs = async () => {
  const { id } = store.user
  const data = await userApi.getUserSubs(id)
  subs.value = data
}
getUserSubs()

const totalPrice = computed(() =>
  (subs.value ?? []).reduce((acc, val) => acc + val.price_per_month, 0)
)

const tableData = computed(() => {
  return subs.value.map((s) => ({
    id: s.id,
    name: s.name,
    price: s.price_per_month,
    period: MONTH_OPTIONS.find((o) => +o.value === +s.period).label,
    date_start: dateFormatter(s.date_start),
    date_end: dateFormatter(s.date_end),
  }))
})

const isOpen = ref(false)
const loading = ref(false)
const handleUpdate = async (form) => {
  try {
    loading.value = true
    const { id: user_id } = store.user
    const { card_id } = subForm
    await subCardsApi.updateUserCard({
      ...form,
      date_start: form.date_start,
      card_id,
      user_id,
    })
    await getUserSubs()
  } catch (e) {
    console.log(e)
  } finally {
    handleClose()
    loading.value = false
  }
}

const subForm = reactive({})
const handleSetForm = (form) => {
  Object.assign(subForm, {
    card_id: form.card_id,
    name: form.name,
    period: MONTH_OPTIONS.find((o) => o.label === form.period).value,
    date_start: form.date_start,
  })
  console.log(subForm)

  isOpen.value = true
}

const handleClose = () => {
  isOpen.value = false
  subForm.card_id = null
  subForm.name = null
  subForm.period = null
  subForm.date_start = null
}
</script>

<template>
  <div class="my-subs">
    <h1 class="my-subs-title">Мои подписки</h1>
    <div class="my-subs-content">
      <div class="my-subs-content-cards">
        <SubCard v-for="card in subs" :card="card" :key="card.id" @card-action="getUserSubs" />
      </div>
      <div class="my-subs-content-info">
        <div class="my-subs-content-info-block-price">
          <span class="price-title">Стоимость в месяц</span>
          <span class="price-sum">{{ totalPrice }}$</span>
        </div>
        <MySubsDoughnut />
      </div>
    </div>
    <div class="my-subs-table-content">
      <h1 class="my-subs-table-content-title">Предстоящие оплаты</h1>
      <!-- <Button theme="white">Добавить подписку</Button> -->
    </div>
    <MySubsTable :table-data="tableData" @open-sub="handleSetForm" />
    <CreateSubModal
      v-if="isOpen"
      v-model="isOpen"
      :loading="loading"
      :name="subForm.name"
      :subForm="subForm"
      @close="handleClose"
      @confirm="handleUpdate"
    />
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
