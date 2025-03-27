<script setup>
import FilterIcon from '~/assets/svg/filter.svg'
import CircleArrowsIcon from '~/assets/svg/circle-arrows.svg'
import AngleRightIcon from '~/assets/svg/angle-right.svg'
import SubCard from '~/base/components/SubCard.vue'
import Button from '~/base/ui/Button.vue'
import RoundedButton from '~/base/ui/FilterButton.vue'
import FilterDropdown from '~/base/components/FilterDropdown.vue'
import FilterTags from '~/base/components/FilterTags.vue'
import Input from '~/base/ui/Input.vue'
import LoopIcon from '~/assets/svg/loop.svg'
import { ref, computed } from 'vue'

const isOpen = ref(false)
const options = ref([
  {
    label: 'Bay Sands',
    key: '2',
    checked: false,
  },
  {
    label: 'Brown645',
    key: '1',
    checked: false,
  },
  {
    label: 'A645',
    key: '3',
    checked: false,
  },
  {
    label: '657',
    key: '4',
    checked: false,
  },
])

const handleCheckboxClick = (key) => {
  const option = options.value.find((opt) => opt.key === key)

  if (option) {
    option.checked = !option.checked
  }
}

const hasActiveOption = computed(() => {
  return options.value.some((option) => option.checked)
})

const iconClass = computed(() => {
  return hasActiveOption.value ? 'subs-header-filter-icon active' : 'subs-header-filter-icon'
})
</script>

<template>
  <div class="subs">
    <div class="subs-header">
      <div class="subs-header-filter">
        <h1 class="subs-header-title">Все подписки</h1>
        <FilterDropdown
          :show-dropdown="isOpen"
          :options="options"
          @update-options="handleCheckboxClick"
        >
          <RoundedButton @click="isOpen = !isOpen">
            <FilterIcon :class="iconClass" />
          </RoundedButton>
        </FilterDropdown>
      </div>
      <Input round size="large" class="subs-header-search" placeholder="Поиск">
        <template #prefix>
          <LoopIcon />
        </template>
      </Input>
    </div>
    <FilterTags
      class="subs-header-tags"
      :options="options.filter((tag) => tag.checked)"
      @update-tags="handleCheckboxClick"
    />
    <div class="subs-content">
      <SubCard v-for="n in 18" :key="n" class="subs-content-card" />
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
    gap: 32px;
    margin-bottom: 16px;

    @media (max-width: $md) {
      flex-direction: column;
      align-items: start;
      gap: 16px;
    }

    &-filter {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    &-title {
      font-weight: 600;
      font-size: 48px;

      @media (max-width: $xl) {
        font-size: 32px;
      }
    }

    &-filter-icon {
      width: 26px;
      height: 30px;

      @media (max-width: $xl) {
        width: 13px;
        height: 15px;
      }
    }

    &-filter-icon.active {
      color: $purple;
    }

    &-search {
      margin-left: auto;
      @media (max-width: $md) {
        margin: 0 auto;
      }
    }

    &-tags {
      margin-bottom: 53px;
      @media (max-width: $md) {
        margin-bottom: 32px;
      }
    }
  }

  &-content {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(295px, 1fr));
    gap: 48px;
    margin-bottom: 60px;

    &-card {
      cursor: pointer;
    }

    @media (max-width: $xl) {
      grid-template-columns: repeat(auto-fit, minmax(285px, 1fr));
      gap: 40px;
    }
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
    transition: all 0.3s ease-in-out;

    &:hover {
      color: $purple;
    }
  }
}
</style>
