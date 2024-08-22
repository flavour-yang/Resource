<template>
  <a-checkbox v-model="showHidden" @change="onChange">显示hidden字段</a-checkbox>
  <hy-table ref="tableIt" :hasSearch="false" :pagination="false" :columns="columns" :requestFun="schemaStore.schema">
    <template #action="{record,value}">
      <a-button @click="onRow({record,value})">编辑</a-button>
    </template>
  </hy-table>
  <hy-modal ref="editModal" @on-success="onSuccess" :requestFun="schemaStore.save" :params="selfData.params" :beforeClose="beforeClose">
    <template #title>
      {{selfData.currentRow.tableName}}
    </template>
    <hy-textarea v-model="selfData.currentStrRow" />
  </hy-modal>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, reactive, toRefs, h } from 'vue'
import { useSchemaStore } from '@/stores/modules/schema'
import { useRouter } from 'vue-router'
import { unref } from 'vue'
import { toRaw } from 'vue'
type Checkbox = boolean | (string | number | boolean)[]
const router = useRouter()
const schemaStore = useSchemaStore()
const editModal = ref(null)
const tableIt = ref(null)
const showHidden = ref<Checkbox>(true)

const selfData = reactive({
  currentRow: { tableName: '' },
  currentStrRow: '',
  params: {}
})
const columns = [
  {
    title: '表名',
    dataIndex: 'tableName',
    width: 300,
    render: ({ record }: { record: any }) => {
      return h(
        'a',
        {
          onClick: () => {
            router.push({
              path: '/table',
              query: {
                tableName: record.tableName,
                databaseFile: JSON.stringify(record.dbFieldInfoList)
              }
            })
            schemaStore.setState({ databaseFile: record.dbFieldInfoList })
          }
        },
        record.tableName
      )
    }
  },
  {
    title: '描述',
    dataIndex: 'tableDesc'
    // width: 100
  },
  {
    title: '表使用容量(kb)',
    dataIndex: 'dataLength'
    // width: 100
  },
  {
    title: '已使用行数',
    dataIndex: 'tableRows'
    // width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    fixed: 'right'
  }
]
const onRow = ({ record, value }: any) => {
  const editRef = unref(editModal) as { open: () => void } | null
  if (editRef) {
    editRef.open()
  }
  selfData.currentRow = record
  selfData.currentStrRow = JSON.stringify(record, null, '\t')
}
const beforeClose = async () => {
  const clone = structuredClone(toRaw(schemaStore.schemaData))
  if (clone) {
    const findIndex = clone.findIndex((f) => f.tableName === selfData.currentRow.tableName)
    if (findIndex > -1) {
      clone[findIndex] = JSON.parse(JSON.stringify(JSON.parse(selfData.currentStrRow)))
      await (selfData.params = clone)
      schemaStore.setState({ schemaData: clone })
    }
  }
}
const onSuccess = async () => {
  const tableRef = unref(tableIt) as { query: () => void } | null
  if (tableRef) {
    tableRef.query?.()
  }
}
const onChange = (value: boolean | (string | number | boolean)[]) => {
  showHidden.value = value
  const tableRef = unref(tableIt) as { filters: (data: any) => void } | null
  if (tableRef) {
    tableRef.filters((data: any) => {
      if (value) {
        return data
      } else {
        return data.filter((f: any) => f.hidden !== true)
      }
    })
  }
}
// const requestFun = () => schemaStore.schema
// schemaStore.schema({})
</script>
<style lang="less" scoped>
</style>