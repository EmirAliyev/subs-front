<script setup>
import Table from '~/base/ui/Table.vue'
import IconPencil from '~/assets/svg/pencil.svg'

const emit = defineEmits(['update-sub'])
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
    width: '16%',
  },
  {
    title: 'Цена',
    key: 'price',
    width: '10%',
  },
  {
    title: 'Период',
    key: 'period',
    width: '15%',
  },
  {
    title: 'Дата начала',
    key: 'date_start',
    width: '20%',
  },
  {
    title: 'Дата окончания',
    key: 'date_end',
    width: '20%',
  },
  {
    title: 'Настройка',
    key: 'settings',
    width: '10%',

    render(row) {
      return h(IconPencil, {
        onClick: () => {
          emit('open-sub', {
            card_id: row.id,
            name: row.name,
            period: row.period,
            date_start: row.date_start,
          })
        },
        style: { cursor: 'pointer' },
      })
    },
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
  overflow: auto;

  @media (max-width: $md) {
    padding: 25px 40px;
  }
}

::v-deep(.n-data-table) {
  min-width: 1120px;
}
</style>
