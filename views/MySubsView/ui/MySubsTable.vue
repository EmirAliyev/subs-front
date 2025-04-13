<script setup>
import Table from '~/base/ui/Table.vue'

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
    width: '18%',
  },
  {
    title: 'Цена',
    key: 'price',
    width: '18%',
  },
  {
    title: 'Период',
    key: 'period',
    width: '18%',
  },
  {
    title: 'Дата начала',
    key: 'date_start',
    width: '18%',
  },
  {
    title: 'Дата окончания',
    key: 'date_end',
    width: '18%',
  },
  {
    title: 'Настройка',
    key: 'settings',
    width: '10%',
    render(row) {
      return h(
        'p',
        {
          onClick: () => {
            emit('open-sub', {
              card_id: row.id,
              name: row.name,
              period: row.period,
              date_start: row.date_start,
            })
          },
          style: { cursor: 'pointer' },
        },
        'Редактировать'
      )
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
}
</style>
