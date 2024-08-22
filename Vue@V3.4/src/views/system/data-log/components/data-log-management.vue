<template>
  <div>
    <search-page :model="queryParam" v-bind="dataConfig" :ref="refName" @reset="reset">
      <template>
        <hy-input v-model="queryParam.actionName" label="操作方法" prop="actionName" />
        <hy-input v-model="queryParam.userName" label="用户名称" prop="userName" />
        <hy-datepicker v-model="queryParam.changeTimeFrom" type="date" label="变更时间（起）" :clearable="true" />
        <hy-datepicker v-model="queryParam.changeTimeTo" type="date" label="变更时间（止）" :clearable="true" />
      </template>
      <template #toolbar-buttons>
        <hy-button-list :list="toolbarButtons" />
      </template>
    </search-page>
  </div>
</template>


<script>
import { PageListBase } from '@/mixins'
import $consts from '@/libs/consts'
import TableItem from './table-item.vue'
const queryParam = {
  actionName: '',
  userName: '',
  changeTimeFrom: '',
  changeTimeTo: ''
}
export default {
  name: 'data_log',
  components: {},
  mixins: [PageListBase],
  props: [],
  watch: {},
  data() {
    return {
      queryParam: this.$utils.deepCopy(queryParam)
    }
  },
  methods: {
    reset() {
      this.queryParam = this.$utils.deepCopy(queryParam)
    }
  },
  async created() {},
  mounted() {},
  computed: {
    $consts() {
      return $consts
    },
    columns() {
      return [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            let content = JSON.parse(params.row.content)
            content = content.sort((a, b) => a.orderIndex - b.orderIndex)
            return h(TableItem, {
              props: {
                data: content
              }
            })
          }
        },
        { title: '变更时间', key: 'changeTime', width: 180, minWidth: 180, align: 'center' },
        {
          title: '用户',
          key: 'userName',
          width: 220,
          minWidth: 220,
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.row.userType + '-' + params.row.userName)
          }
        },
        { title: '操作方法', key: 'actionName', width: 220, minWidth: 220, align: 'center' },

        {
          title: '操作内容',
          key: '',
          render: (h, params) => {
            let content = JSON.parse(params.row.content)
            content = content.sort((a, b) => a.orderIndex - b.orderIndex)
            const strs = content.map(m => {
              const fField = m.changeFields
                .filter(f => f.originalData)
                .map(m => `${m.fieldTitle}：${m.originalData || '-'}，变更为：${m.updatedData || '-'}`)
              return fField
            })
            const list = [...new Set(strs)].flat(Infinity).map(m => h('div', { style: { fontWeight: 700 } }, m))
            const renderIt = h('div', [h('div', (content && content[0] && content[0].tableTitle) || ''), ...list])
            return renderIt
          }
        }
      ]
    },

    exportColumns() {
      return [
        { title: '变更时间', key: 'changeTime' },
        { title: '用户', key: 'userName' },
        { title: '动作名称', key: 'actionName' }
      ]
    },
    toolbarButtons() {
      return [this.exportButton({ excelName: '数据操作日志列表' })]
    },
    dataConfig() {
      return {
        queryApi: 'system/data-log/query',
        columns: this.columns,
        toolbarButtons: this.toolbarButtons,
        exportColumns: this.exportColumns
      }
    }
  }
}
</script>

<style scoped>
</style>