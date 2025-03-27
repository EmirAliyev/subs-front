<template>
  <n-data-table
    :bordered="bordered"
    :single-line="singleLine"
    :row-class-name="rowClassName"
    :single-column="singleColumn"
    :columns="createColumns()"
    :data="tableData"
  />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
const route = useRoute()
const router = useRouter()
const props = defineProps({
  columns: {
    required: true,
    type: Array,
  },
  tableData: {
    required: true,
    type: Array,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  singleLine: {
    type: Boolean,
    default: false,
  },
  singleColumn: {
    type: Number,
    default: false,
  },
  rowClassName: {
    type: String,
    default: '',
  },
  currentPage: {
    type: Number,
  },
})

let pageNum = ref(props.currentPage)
const createColumns = () => {
  return props.columns
}

let onClickHandler = (page) => {
  router.push({ path: `${route.fullPath}`, query: { page: `${page}` } })
  pageNum.value = page
}
</script>

<style scoped lang="scss">
:deep(.bg-light-grey td) {
  background: $light-grey !important;
}
:deep(.n-data-table .n-data-table-thead th) {
  background: red !important;
}
</style>
