<template>
  <hy-form v-if="hasSearch" :model="props.params" @submit-success="onSearch">
    <slot name="search" />
    <a-button type="primary" html-type="submit" long :loading="loading">查询</a-button>
  </hy-form>
  <a-table :pagination="pagination" :columns="columns" :data="data">
    <template v-for="child in slotColumns" #[getKey(child)]="{value, record}">
      <slot :name="child.slotName" :record="record" :value="value" />
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { isObjectEmpty } from '@/libs/utils/empty'
import type { TableColumnData } from '@arco-design/web-vue'
import { reactive, defineEmits, onMounted, toRefs, watch, computed } from 'vue'
interface SlotColumns extends TableColumnData {
  slotName?: string
}
const props = defineProps({
  hasSearch: {
    type: Boolean,
    default: true
  },
  params: {
    type: Object,
    default: () => {}
  },
  requestFun: {
    type: Function
  },
  columns: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object || Boolean,
    default: {
      pageSize: 30,
      showPageSize: true,
      pageSizeOptions: [10, 30, 50, 100]
    }
  },
  resultFun: {
    type: Function
  }
  // filtersFun: {
  //   type: Function
  // }
})

const columns = props.columns as TableColumnData[]

// const { columns, requestFun, params } = toRefs(props)

const slefProps = reactive({
  loading: false
})
const tableProps = reactive({
  originData: [],
  data: []
})

const { data, originData } = toRefs(tableProps)
const { loading } = toRefs(slefProps)
// watch(props.filters, () => {
//   tableProps.data = tableProps.data.filter(f=> )
// })
onMounted(() => {
  // if (props.params) {
  fetchData(props.params)
  // }
})

const slotColumns = computed((): SlotColumns[] => {
  return columns.filter((f: any) => f.slotName)
})

const getKey = (child: any) => {
  return child.slotName
}

const fetchData = async (requestParams = {}) => {
  if (props.requestFun) {
    slefProps.loading = true
    const res = await props.requestFun(requestParams)
    slefProps.loading = false
    const _res = res?.records ? res?.records : res
    if (_res) {
      if (props.resultFun) {
        tableProps.data = props.resultFun(_res)
        tableProps.originData = _res
      } else {
        tableProps.data = _res
        tableProps.originData = _res
      }
    }
    return res
  }
  slefProps.loading = false
}
const query = async () => {
  fetchData()
}
const filters = async (callback: (data: any) => never[]) => {
  if (callback) {
    tableProps.data = callback(tableProps.originData)
  }
}
const onSearch = async (values: any) => {
  const res = await fetchData(values)
  $emits('on-success', res)
}
const $emits = defineEmits(['on-success'])
defineExpose({ query, filters })
</script>
