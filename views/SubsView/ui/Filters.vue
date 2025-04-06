<script setup>
import FilterDropdown from '~/base/components/FilterDropdown.vue'
import RoundedButton from '~/base/ui/FilterButton.vue'
import FilterIcon from '~/assets/svg/filter.svg'
import IconX from '~/assets/svg/x.svg'
import { isEqual } from '~/base/utils/isEqual'

const props = defineProps({
  options: {
    type: Array,
    required: false,
  },
})

const emit = defineEmits(['update-options', 'apply-filters'])
const isOpen = ref(false)

// Создаем копию массива options, чтобы отслеживать изменения
const initialOptions = ref([...props.options])

const hasActiveOption = computed(() => props.options.some((option) => option.checked))
const iconClass = computed(() =>
  hasActiveOption.value ? 'subs-header-filter-icon active' : 'subs-header-filter-icon'
)

const toogleOpen = () => {
  if (isOpen.value) {
    emit('apply-filters')
  }
  isOpen.value = !isOpen.value
}
</script>

<template>
  <FilterDropdown
    :show-dropdown="isOpen"
    :options="options"
    @update-options="(key) => emit('update-options', key)"
  >
    <n-tooltip placement="top" :show="isOpen">
      <template #trigger>
        <RoundedButton @click="toogleOpen">
          <IconX v-if="isOpen" />
          <FilterIcon v-else :class="iconClass" />
        </RoundedButton>
      </template>
      Закройте, чтобы применить фильтры
    </n-tooltip>
  </FilterDropdown>
</template>

<style scoped lang="scss">
.subs-header-filter-icon {
  width: 26px;
  height: 30px;

  @media (max-width: $xl) {
    width: 13px;
    height: 15px;
  }
  &.active {
    color: $purple;
  }
}
</style>
