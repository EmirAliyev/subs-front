<script setup>
import LoopIcon from '~/assets/svg/loop.svg'
import SubCard from '~/base/components/SubCard/SubCard.vue'
import FilterTags from '~/base/components/FilterTags.vue'
import Input from '~/base/ui/Input.vue'
import Filters from './ui/Filters.vue'
import { ref, watch, onMounted } from 'vue'
import { isEqual } from '~/base/utils/isEqual'
import { API_SUBCARDS_KEYS } from '~/base/api/sub-cards/keys'
import { categoriesApi } from '~/base/api/categories/api'
import { subCardsApi } from '~/base/api/sub-cards/api'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from '~/base/utils/debounce'

const route = useRoute()
const router = useRouter()

const filters = reactive({
  page: parseInt(route.query.page || '1'),
  search: route.query.search || '',
  categoryIds: route.query.categories ? route.query.categories.split(',').map(Number) : [],
})
watch(
  () => filters.search,
  () => {
    filters.page = 1
    debouncedSearch()
  }
)
const debouncedSearch = debounce(() => {
  updateRoute()
}, 500)

const {
  status,
  data: subCards,
  error,
  refresh,
} = useAsyncData(
  `${API_SUBCARDS_KEYS.SUBCARDS}-${filters.page}-${filters.search}-${filters.categoryIds.join(',')}`,
  () =>
    subCardsApi.getAllSubCards({
      page: filters.page,
      categoryIds: filters.categoryIds,
      search: filters.search,
    }),
  {
    watch: [filters.page, filters.search, () => filters.categoryIds],
    server: true,
  }
)

const updateRoute = () => {
  const query = {
    page: filters.page > 1 ? filters.page : undefined,
    search: filters.search || undefined,
    categories: filters.categoryIds.length ? filters.categoryIds.join(',') : undefined,
  }

  router.push({
    query: Object.fromEntries(Object.entries(query).filter(([_, value]) => value !== undefined)),
  })

  refresh()
}
const handlePageChange = (newPage) => {
  filters.page = newPage
  updateRoute()
}

const options = ref([])
const categories = ref([])
const getOptions = async () => {
  const data = await categoriesApi.getAllCategories()
  categories.value = data
}
watch(
  categories,
  (newCategories) => {
    if (newCategories) {
      options.value = newCategories.map((category) => ({
        ...category,
        checked: filters.categoryIds.includes(category.key),
      }))
    }
  },
  { immediate: true }
)
onMounted(() => {
  getOptions()
})

const handleCheckboxClick = (key) => {
  const option = options.value.find((opt) => opt.key === key)
  if (option) {
    option.checked = !option.checked
  }
}
const handleApplyFilters = () => {
  const currentFiltersIds = options.value
    .filter((option) => option.checked)
    .map((option) => option.key)

  if (isEqual(filters.categoryIds, currentFiltersIds)) {
    return
  }

  filters.categoryIds = [...currentFiltersIds]
  filters.page = 1
}
</script>

<template>
  <div class="subs">
    <div class="subs-header">
      <div class="subs-header-filter">
        <h1 class="subs-header-title">Все подписки</h1>
        <Filters
          :options="options"
          @update-options="handleCheckboxClick"
          @apply-filters="handleApplyFilters"
        />
      </div>
      <Input
        round
        size="large"
        class="subs-header-search"
        v-model="filters.search"
        placeholder="Поиск"
      >
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

    <div class="subs-content" v-if="subCards?.data.length">
      <SubCard
        v-for="card in subCards?.data || []"
        :card="card"
        :key="card.id"
        class="subs-content-card"
        @card-action="refresh"
      />
    </div>

    <ClientOnly>
      <n-pagination
        class="subs-load"
        v-model:page="filters.page"
        :page-count="subCards?.meta?.pages || 0"
        @update:page="handlePageChange"
      />
    </ClientOnly>
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
    width: 100%;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(310px, 310px));
    gap: 22px;
    margin-bottom: 60px;

    &-card {
      cursor: pointer;
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
