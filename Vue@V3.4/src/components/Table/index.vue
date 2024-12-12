<template>
  <a-card title="" :bordered="false">
    <hy-form ref="formRef" v-if="hasSearch" :model="props.model" @submit-success="onSearch">
      <slot name="search" />
      <a-col :span="6" :offset="btnOffset.offset" :style="{ textAlign: btnOffset.textAlign }">
        <a-space>
          <div style="width: 80px;">
            <a-button type="primary" html-type="submit" :loading="loading">查询</a-button>
          </div>
          <div>
            <a-button @click="reset">清除</a-button>
          </div>
        </a-space>
      </a-col>
    </hy-form>
    <a-table :pagination="page" :columns="columns" :data="data" :loading="loading" @page-change="pageChange"
      @page-size-change="pageSizeChange">
      <template v-for="child in slotColumns" #[getKey(child)]="{ value, record }">
        <slot :name="child.slotName" :record="record" :value="value" />
      </template>
    </a-table>
  </a-card>
</template>
<script setup lang="ts">
import { isTruth } from '@/libs/utils/empty'
import type { TableColumnData } from '@arco-design/web-vue'
import { reactive, defineEmits, onMounted, toRefs, watch, computed, ref, unref, useSlots } from 'vue'
interface SlotColumns extends TableColumnData {
  slotName?: string
}
const slots = useSlots()

const props = defineProps({
  hasSearch: {
    type: Boolean,
    default: true
  },
  model: {
    type: Object,
    default: () => { }
  },
  api: {
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
      total: 0,
      pageSizeOptions: [5, 10, 30, 50, 100]
    }
  },
  handleParams: {
    type: Function
  },
  resultFun: {
    type: Function
  }
  // filtersFun: {
  //   type: Function
  // }
})

const columns = props.columns as TableColumnData[]

// const { columns, api, model } = toRefs(props)
const formRef = ref()

// const slefProps = reactive({
//   loading: false
// })
const tableProps = reactive({
  originData: [],
  data: [],
  loading: false,
  page: props.pagination,
  defaultValue: {
    pageIndex: 1,
    pageSize: 30,
  }
})

const { data, originData, loading, page } = toRefs(tableProps)
// const { loading } = toRefs(slefProps)
// watch(props.filters, () => {
//   tableProps.data = tableProps.data.filter(f=> )
// })

onMounted(() => {
  // if (props.model) {
  fetchData(props.model)
  // }
})

// table的操作按钮
const slotColumns = computed((): SlotColumns[] => {
  return columns.filter((f: any) => f.slotName)
})

// 计算form操作按钮所处位置
const btnOffset = computed(() => {
  const option = { offset: 0, textAlign: 'left' }
  if (slots && slots.search && slots.search().length) {
    // 过滤有field的slots子节点
    const len = slots.search().filter(f => f.props && f.props.field).length
    if (len < 4) {
      return option
    } else {
      return { offset: 18 - 6 * (len % 4), textAlign: 'right' }
    }
  }
  return option
})
// console.log(slots)
// 辅助函数
const getKey = (child: any) => {
  return child.slotName
}

const requestParams = (data = {}) => {
  let _data = data
  if (props.handleParams) {
    _data = props.handleParams(_data) || _data
  }
  const params = { ...tableProps.defaultValue, ..._data }
  return params
}

const handleResult = (data: any) => {
  let _data = data
  if (props.resultFun) {
    tableProps.originData = data
    _data = props.resultFun(_data)
  }
  if (_data && _data.records) {
    if (tableProps.page) {
      tableProps.page.total = _data.total
    }
    tableProps.data = _data.records
  } else {
    // _data.length || !tableProps.page
    tableProps.data = _data
    if (tableProps.page) {
      tableProps.page.total = _data.length
    }
  }

}
// 请求数据 包含默认复制与默认参数处理
const fetchData = async (data = {}) => {
  tableProps.loading = true
  if (props.api) {
    // 参数处理
    const params = requestParams(data)
    const res = await props.api(params)
    tableProps.defaultValue = params
    tableProps.loading = false
    // 处理返回参数
    const _res = handleResult(res)
    return _res
  }
  tableProps.loading = false
}
// 点击搜索
const onSearch = async (values: any) => {
  const res = await fetchData(values)
  $emits('on-success', res)
}
// 重置form
const reset = () => {
  const formIt = unref(formRef)
  formIt.formRef.resetFields()
  // formIt.formRef.
  query(formIt.formRef.model)
  // console.log({ formIt })
}

// 页码改变
const pageChange = (pageIndex: number) => {
  tableProps.page.pageIndex = pageIndex
  fetchData({ ...tableProps.defaultValue, pageIndex })
}
// 每页数据数改变
const pageSizeChange = (pageSize: number) => {
  tableProps.page.pageSize = pageSize
  fetchData({ ...tableProps.defaultValue, pageSize })
}
// 外部调用
const query = async (values?: any) => {
  fetchData(values)
}
const filters = async (callback: (data: any) => never[]) => {
  if (callback) {
    tableProps.data = callback(tableProps.originData)
  }
}
const $emits = defineEmits(['on-success'])
defineExpose({ query, filters })
</script>
