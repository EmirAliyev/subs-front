<script setup>
import Table from '~/base/ui/Table.vue'
const props = defineProps({
  tableData: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const columns = ref([
  {
    title: 'Имя',
    key: 'name',
    width: '25%',
  },
  {
    title: 'Цена',
    key: 'price',
    width: '25%',
  },
  {
    title: 'Период',
    key: 'period',
    width: '25%',
  },
  {
    title: 'Дата',
    key: 'date',
    width: '25%',
  },
])
</script>

<template>
  <div class="my-subs-table">
    <Table
      singleColumn
      singleLine
      :tableData="tableData"
      :columns="columns"
      row-class-name="bg-light-grey"
    />
  </div>
</template>

<style scoped lang="scss">
.my-subs-table {
  max-width: 1760px;
  padding: 45px 73px;
  border-radius: 36px;
  background: $light-grey;
}
</style>
