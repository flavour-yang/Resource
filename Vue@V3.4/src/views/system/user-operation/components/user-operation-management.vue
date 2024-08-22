<template>
  <div>
    <search-page :model="queryParam" v-bind="dataConfig" :ref="refName" @reset="reset">
      <template>
        <hy-input v-model="queryParam.actionName" label="动作名称" prop="actionName"/>
        <hy-input v-model="queryParam.userType" label="用户类型" prop="userType"/>
        <hy-input v-model="queryParam.userName" label="用户名" prop="userName"/>
        <hy-select v-model="queryParam.dataChanged" label="数据变化" prop="dataChanged" :list="onlyYesList"/>
        <hy-datepicker v-model="queryParam.logDateFrom" type="datetime" label="操作时间(开始)" :clearable="true"/>
        <hy-datepicker v-model="queryParam.logDateTo" type="datetime" label="操作时间(结束)" :clearable="true"/>
      </template>
      <template #toolbar-buttons>
        <hy-button-list :list="toolbarButtons"/>
      </template>
    </search-page>
  </div>
</template>


<script>

import HyRadio from "@/components/common/form-item-controls/hy-radio.vue";

const queryParam = {
  actionName: '',
  userType: '',
  userName: '',
  dataChanged: '',
  logDateFrom: '',
  logDateTo: '',
}

import {PageListBase} from "@/mixins";
import $consts from "@/libs/consts";
import HySelect from "@/components/common/form-item-controls/hy-select.vue";
import HyDatepicker from "@/components/common/form-item-controls/hy-datepicker.vue";

export default {
  name: "user_operation_management",
  components: {HyDatepicker, HySelect, HyRadio},
  mixins: [PageListBase],
  props: [],
  watch: {},
  data() {
    return {
      queryParam: this.$utils.deepCopy(queryParam),
      roleTypeList: [],
      onlyYesList: [{key: "Y", value: "是"}],
    }
  },
  methods: {
    reset() {
      this.queryParam = this.$utils.deepCopy(queryParam);
    },
  },
  async created() {
  },
  mounted() {
  },
  computed: {
    $consts() {
      return $consts
    },
    columns() {
      return [
        {title: "操作时间", key: "createTime", tooltip: true, minWidth: 120, align: "center"},
        {
          title: "用户",
          key: "userName",
          tooltip: true,
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.userType + "-" + params.row.userName);
          }
        },
        {title: "动作名称", key: "actionName", tooltip: true, minWidth: 120, align: "center"},
        {
          title: "数据变化",
          key: "dataAudit",
          tooltip: true,
          minWidth: 160,
          align: "center",
        },
        {title: "操作结果", key: "actionResult", tooltip: true, minWidth: 120, align: "center"},
        {title: "接口地址", key: "actionUrl", tooltip: true, minWidth: 120, align: "center"},
        {title: "入参", key: "actionParam", tooltip: true, minWidth: 120, align: "center"},
        {title: "耗时", key: "elapseTime", tooltip: true, minWidth: 30, align: "center"},
      ]
    },

    exportColumns() {
      return [
        {title: '应用系统id', key: 'appId'},
        {title: '应用系统环境', key: 'appProfile'},
        {title: '动作名称', key: 'actionName'},
        {title: '接口地址', key: 'actionUrl'},
        {title: '入参', key: 'actionParam'},
        {title: '操作结果', key: 'actionResult'},
        {title: '耗时', key: 'elapseTime'},
        {title: '用户类型', key: 'userType'},
        {title: '用户名', key: 'userName'},
        {title: "操作时间", key: "createTime"},
      ]
    },
    toolbarButtons() {
      return [
        this.exportButton({excelName: "用户操作日志列表"})
      ]
    },
    dataConfig() {
      return {
        queryApi: "system/sysLog/queryOperationLog",
        columns: this.columns,
        toolbarButtons: this.toolbarButtons,
        exportColumns: this.exportColumns
      }
    },

  }
}
</script>

<style scoped>

</style>