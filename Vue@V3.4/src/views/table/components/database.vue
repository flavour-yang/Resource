<template>
  <hy-table :pagination="false" :columns="data.columns" :requestFun="schemaStore.getDatabase" :params="params">
    <template #search>
      <hy-input v-model="params.tableName" label="表名" />
      <hy-input v-model="params.whereStatement" label="查询语句" />
    </template>
    <template #action="{record,value}">
      <a-button @click="clickRow({record,value})">查看</a-button>
    </template>
  </hy-table>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, reactive, toRefs } from 'vue'

import { useSchemaStore } from '@/stores/modules/schema'
import { useRoute } from 'vue-router'
const route = useRoute()
const schemaStore = useSchemaStore()
const data = reactive({
  columns: [
    {
      title: '操作',
      dataIndex: 'action',
      slotName: 'action',
      fixed: 'right'
    }
  ]
})

const params = reactive({ tableName: route.query.tableName, whereStatement: '' })

// const getDatabase = () => {
//   return schemaStore.getDatabase
// }
onMounted(() => {
  const fields = JSON.parse(route.query.databaseFile as string)?.map((m: any) => ({
    // ...m,
    title: `${m.fieldShortDesc || m.fieldName}  (${m.fieldName})`,
    dataIndex: m.fieldName,
    width: 200
  }))
  // const fields = schemaStore.databaseFile?.map((m) => ({
  //   // ...m,
  //   title: m.fieldDesc,
  //   dataIndex: m.fieldName
  // }))
  if (fields) {
    data.columns = [...fields, ...data.columns]
  }
  // if (route.query.tableName) {
  //   params.tableName = route.query.tableName
  // }
})
const clickRow = ({ record, value }: { record: any; value: any }) => {}
// const requestFun = () => schemaStore.schema
// schemaStore.schema({})
</script>
