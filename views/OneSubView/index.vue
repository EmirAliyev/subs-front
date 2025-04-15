<script setup>
import Button from '~/base/ui/Button.vue'
import SubCard from '~/base/components/SubCard/SubCard.vue'
import { getCurrencySymbol } from '~/base/utils/getCurrencySymbol'
import { subCardsApi } from '~/base/api/sub-cards/api'
import { useUserStore } from '~/store/user.store'
import CreateSubModal from '~/base/components/Modal/SubCard/ui/CreateSubModal.vue'
import MONTH_OPTIONS from '~/base/configs/month_options'

const props = defineProps({
  card: {
    type: Object,
    default: () => {},
  },
})
const store = useUserStore()
const emit = defineEmits(['update-sub'])

const subs = ref([])
const getTopSubs = async () => {
  const data = await subCardsApi.getTopSubs(5)
  subs.value = data
}
getTopSubs()

const isOpen = ref(false)
const loading = ref(false)
const subForm = reactive({})
watch(
  () => props.card,
  (card) => {
    subForm.card_id = card?.id ?? null
    subForm.name = card?.name ?? null
    subForm.period =
      MONTH_OPTIONS.find((o) => o.value === card?.subscription?.period)?.value ?? null
    subForm.date_start = card?.subscription?.date_start ?? null
  },
  { immediate: true }
)

const handleReset = () => {
  subForm.card_id = null
  subForm.name = null
  subForm.period = null
  subForm.date_start = null
}
const handleOpen = () => {
  if (!store.isHasUser) {
    return
  }
  isOpen.value = true
}
const handleClose = () => {
  isOpen.value = false
}
const handleUpdate = async (form) => {
  try {
    loading.value = true
    const { id: user_id } = store.user
    const { card_id } = subForm

    const body = {
      ...form,
      date_start: form.date_start,
      card_id,
      user_id,
    }
    if (!props.card.is_subscribed) {
      await subCardsApi.addCardToUser(body)
    } else {
      await subCardsApi.updateUserCard(body)
    }
    emit('update-sub')
  } catch (e) {
    console.log(e)
  } finally {
    handleClose()
    loading.value = false
  }
}
</script>

<template>
  <div class="sub">
    <h1 class="sub-title">Информация по подписке</h1>
    <div class="sub-content">
      <NuxtImg :src="card?.img" :alt="`Подписка ${card.name}`" class="sub-content-img" />
      <div class="sub-content-block block">
        <div class="block-item">
          <span class="block-item__bold">Название: </span>
          <span class="block-item__light">{{ card.name }}</span>
        </div>
        <div class="block-item">
          <span class="block-item__bold">Описание: </span>
          <span class="block-item__light">{{ card.description }}</span>
        </div>
        <div class="block-item">
          <span class="block-item__bold">Категория: </span>
          <span class="block-item__light">
            {{ card.categories.map((c) => c.name).join(', ') }}
          </span>
        </div>
        <div class="block-item">
          <span class="block-item__bold">Срок: </span>
          <span class="block-item__light">1 месяц</span>
        </div>
        <div class="block-bottom">
          <Button class="block-bottom-btn" theme="white" @click="handleOpen">
            {{
              !store.isHasUser
                ? 'Авторизуйтесь'
                : card.is_subscribed
                  ? 'Редактировать'
                  : 'Добавить подписку'
            }}
          </Button>

          <h2 class="block-bottom-price">
            Цена: {{ card.price_per_month }} {{ getCurrencySymbol(card.currency) }}
          </h2>
        </div>
      </div>
    </div>
    <Vue3Marquee :pause-on-hover="true" duration="12" :clone="true" class="marquee">
      <SubCard
        v-for="card in subs"
        :key="card.id"
        hide-mini-button
        :card="card"
        class="marquee-card"
      />
    </Vue3Marquee>
    <CreateSubModal
      v-if="isOpen"
      :name="card.name"
      :subForm="subForm"
      :loading="loading"
      @close="handleClose"
      @confirm="handleUpdate"
      v-model="isOpen"
    />
  </div>
</template>

<style scoped lang="scss">
.sub {
  overflow: hidden;
  &-title {
    font-size: 32px;
    margin-bottom: 34px;
    font-weight: 600;
    margin-bottom: 69px;

    @media (max-width: $sm) {
      margin-bottom: 32px;
    }
  }

  &-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 127px;

    @media (max-width: $md) {
      flex-direction: column;
      gap: 60px;
    }

    &-img {
      width: 30vw;
      height: 30vw;
      max-width: 570px;
      max-height: 570px;
      border-radius: 50%;

      @media (max-width: $md) {
        width: 420px;
        height: 420px;
        border-radius: 0;
      }

      @media (max-width: $sm) {
        width: 360px;
        height: 360px;
        border-radius: 0;
      }

      @media (max-width: $xs) {
        width: 320px;
        height: 320px;
        border-radius: 0;
      }
    }

    &-block {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
  }
  .block {
    max-width: 906px;
    width: 100%;
    min-width: 300px;

    @media (max-width: $md) {
      min-width: 300px;
    }

    &-item__bold {
      color: $main-text;
      font-weight: 500;
      font-size: 24px;
    }

    &-item__light {
      color: $main-text;
      font-weight: 300;
      font-size: 24px;
    }

    &-bottom {
      display: flex;
      flex-direction: column;
      gap: 35px;
      margin-top: 18px;

      @media (max-width: $md) {
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
      }

      @media (max-width: $sm) {
        flex-direction: column-reverse;
      }

      &-btn {
        width: max-content;

        &-icon {
          path {
            stroke: $purple;
          }
        }
      }

      &-price {
        font-size: 48px;
        font-weight: 500;
      }
    }
  }

  .marquee-card {
    margin-left: 48px;
    cursor: pointer;
  }
}
</style>
