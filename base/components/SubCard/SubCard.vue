<script setup>
import { getLastUpdatedText } from '~/base/utils/lastUpdate'
import IconTime from '~/assets/svg/time.svg'
import SubModal from '../Modal/SubCard/SubModal.vue'
import { useUserStore } from '~/store/user.store'
import { getCurrencySymbol } from '~/base/utils/getCurrencySymbol'
const props = defineProps({
  card: {
    type: Object,
    default: () => {},
  },
  hideMiniButton: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['card-action'])
const store = useUserStore
const router = useRouter()

const goToSubscriptionPage = () => {
  router.push(`/subs/podpiska-${props.card.slug}`)
}
</script>

<template>
  <div class="card" @click.stop="goToSubscriptionPage">
    <NuxtImg
      class="card-img"
      format="webp"
      loading="lazy"
      :src="card.img"
      :alt="`Подписка ${card.name}`"
    />
    <div class="card-info">
      <div class="card-info-header">
        <ClientOnly>
          <n-tooltip placement="top" trigger="hover">
            <template #trigger>
              <span class="card-info-header-name">{{ card.name }}</span>
            </template>
            {{ card.name }}
          </n-tooltip>
        </ClientOnly>
        <span class="card-info-header-price">
          {{ card.price_per_month }} {{ getCurrencySymbol(card.currency) }}
        </span>
      </div>
      <span class="card-info-category">{{ card.categories[0]?.name }}</span>
      <div class="card-info-bottom">
        <div class="card-info-bottom-update">
          <IconTime class="icon" />
          <span class="card-info-bottom-update-text">
            {{ getLastUpdatedText(card.last_updated) }}
          </span>
        </div>
        <div class="card-info-bottom-btn">
          <SubModal
            :card_id="card.id"
            :hide-mini-button="hideMiniButton"
            :is_subscribed="card.is_subscribed"
            :name="card.name"
            @card-action="emit('card-action')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 310px;
  min-width: 310px;
  height: 365px;
  box-shadow: 0px 5px 20.6px -10px #0000006e;
  border-radius: 40px;
  padding: 20px 30px 20px 30px;
  gap: 8px;
  background: white;
  cursor: pointer;

  &-img {
    max-width: 232px;
    max-height: 232px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &-info {
    width: 100%;
    &-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 20px;
      font-weight: 600;

      &-name {
        width: 170px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        position: relative;
      }
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 11px;

      &-update {
        display: flex;
        align-items: center;
        color: $main-text;
        gap: 5px;
        font-size: 13px;
      }
    }

    &-category {
      font-size: 13px;
      font-weight: 300;
    }
  }
}
</style>
