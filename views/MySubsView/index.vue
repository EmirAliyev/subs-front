<script setup>
import SubCard from '~/base/components/SubCard/SubCard.vue'
import MySubsTable from './ui/MySubsTable.vue'
import MySubsDoughnut from './ui/MySubsDoughnut.vue'
import CreateSubModal from '~/base/components/Modal/SubCard/ui/CreateSubModal.vue'
import { userApi } from '~/base/api/user/api'
import { useMessage } from 'naive-ui'
import { useUserStore } from '~/store/user.store'
import { dateFormatter } from '~/base/utils/date_formatter'
import { subCardsApi } from '~/base/api/sub-cards/api'
import MONTH_OPTIONS from '~/base/configs/month_options'
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import Button from '~/base/ui/Button.vue'
import { gptApi } from '~/base/api/gpt/api'

const store = useUserStore()
const message = useMessage()

const subs = ref([])
const isSubsLoading = ref(true)
const getUserSubs = async () => {
  isSubsLoading.value = true
  const { id } = store.user
  const data = await userApi.getUserSubs(id)
  subs.value = data
  isSubsLoading.value = false
}
getUserSubs()

const totalPrice = computed(() =>
  (subs.value ?? []).reduce((acc, val) => acc + val.converted_price_rub, 0)
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
const subForm = reactive({})

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

const handleSetForm = (form) => {
  Object.assign(subForm, {
    card_id: form.card_id,
    name: form.name,
    period: MONTH_OPTIONS.find((o) => o.label === form.period).value,
    date_start: form.date_start,
  })
  isOpen.value = true
}

const handleClose = () => {
  isOpen.value = false
  subForm.card_id = null
  subForm.name = null
  subForm.period = null
  subForm.date_start = null
}

const cardsRef = ref(null)
const infoRef = ref(null)
const containerRef = ref(null)
const isWrapped = ref(false)

const checkWrap = () => {
  if (!cardsRef.value || !infoRef.value) return
  const cardsTop = cardsRef.value.offsetTop
  const infoTop = infoRef.value.offsetTop
  isWrapped.value = infoTop > cardsTop
}

let resizeObserver

const isAnalyzeLoading = ref(false)
const analyzeSubs = async () => {
  isAnalyzeLoading.value = true

  message.info('Анализ может занять более минуты. Пожалуйста подождите', {
    duration: 3000,
    closable: true,
  })

  const data = await gptApi.analyzeUserSubs(store.user.id)

  isAnalyzeLoading.value = false

  message.success(data.analysis, {
    duration: 120000,
    closable: true,
  })
}

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    nextTick(() => {
      checkWrap()
    })
  })

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }

  window.addEventListener('resize', checkWrap)
  nextTick(() => {
    checkWrap()
  })
})

onUnmounted(() => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value)
  }
  window.removeEventListener('resize', checkWrap)
})
</script>

<template>
  <div class="my-subs">
    <div class="my-subs-header">
      <h1 class="my-subs-title">Мои подписки</h1>
      <Button
        class="my-subs-header-btn"
        theme="white"
        :loading="isAnalyzeLoading"
        @click="analyzeSubs"
        >Проанализировать</Button
      >
    </div>
    <div class="my-subs-content" ref="containerRef">
      <div class="my-subs-content-cards" ref="cardsRef">
        <SubCard v-for="card in subs" :card="card" :key="card.id" @card-action="getUserSubs" />
      </div>
      <div class="my-subs-content-info" :class="{ wrapped: isWrapped }" ref="infoRef">
        <div class="my-subs-content-info-block-price">
          <span class="price-title">Стоимость в месяц</span>
          <span class="price-sum">{{ totalPrice }}₽</span>
        </div>
        <MySubsDoughnut />
      </div>
    </div>
    <div class="my-subs-table-content">
      <h1 class="my-subs-table-content-title">Предстоящие оплаты</h1>
    </div>
    <MySubsTable v-if="!isSubsLoading" :table-data="tableData" @open-sub="handleSetForm" />
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
  overflow: hidden;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 52px;
    gap: 32px;
    flex-wrap: wrap;

    &-btn {
      width: 235px;
      @media (max-width: $sm) {
        width: 100%;
      }
    }
  }

  &-table-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 45px;

    &-title {
      font-weight: 600;
      font-size: 48px;

      @media (max-width: $xl) {
        font-size: 32px;
      }
    }
  }

  &-title {
    font-weight: 600;
    font-size: 48px;

    @media (max-width: $xl) {
      font-size: 32px;
    }
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    gap: 80px;
    margin-bottom: 75px;

    &-cards {
      flex: 1;
      min-width: 719px;
      max-width: 1054px;
      width: 100%;
      background: $light-grey;
      border-radius: 30px;
      height: 830px;
      padding: 40px 30px;
      display: grid;
      grid-template-columns: repeat(auto-fit, 310px);
      gap: 32px 25px;
      overflow: auto;

      @media (max-width: 1140px) {
        min-width: 371px;
      }

      @media (max-width: $sm) {
        display: flex;
        gap: 16px;
        height: max-content;
        padding: 15px 10px;
        grid-template-columns: unset;
        max-width: 100%;
        width: 100%;
        min-width: 320px;
        justify-content: unset;
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
      transition: all 0.3s ease;
      flex: 0 0 480px;
      min-width: 480px;
      margin: 0 auto;

      &-block-price {
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: 100%;
        min-width: 480px;
        max-width: 480px;
        padding: 28px 45px;
        box-shadow: 0px 5px 15px 0px #00000030;
        border-radius: 35px;

        @media (max-width: $sm) {
          min-width: max-content;
          max-width: max-content;
          max-height: max-content;
          padding: 14px 28px;
        }

        .price-title {
          font-weight: 600;
          font-size: 42px;
          line-height: 117%;

          @media (max-width: $sm) {
            font-size: 32px;
          }
          @media (max-width: $xs) {
            font-size: 24px;
          }
        }

        .price-sum {
          font-weight: 600;
          font-size: 72px;
          line-height: 117%;
          color: $purple;

          @media (max-width: $sm) {
            font-size: 52px;
          }

          @media (max-width: $xs) {
            font-size: 32px;
          }
        }
      }

      &.wrapped {
        width: max-content;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: 32px;
        margin: 0 auto;

        @media (max-width: $sm) {
          flex: unset;
          min-width: 100%;
        }
      }
    }
  }
}
</style>
