<template>
  <div>
    <search-page :model="queryParam" v-bind="dataConfig" :ref="refName" @reset="reset">
      <template>
        <hy-input v-model="queryParam.templateCode" label="模板代码" prop="renterName"/>
        <hy-input v-model="queryParam.templateName" label="模板名称" prop="renterName"/>
        <hy-input v-model="queryParam.templateNumber" label="微信模板编号" prop="renterName"/>
      </template>
      <template #toolbar-buttons>
        <hy-button-list :list="toolbarButtons"/>
      </template>
    </search-page>

    <message-template-operate-modal ref="operate-modal" @save-success="query"/>

    <message-template-detail ref="message-template-detail" />

  </div>
</template>

<script>
import {PageListBase} from "@/mixins";
import MessageTemplateOperateModal from './message-template-operate-modal'
import MessageTemplateDetail from './message-template-detail'


const queryParam = {
  templateCode: '',
  templateName: '',
  templateNumber: '',
}
export default {
  name: "message_template_management",
  components: {MessageTemplateOperateModal, MessageTemplateDetail},
  mixins: [PageListBase],
  props: [],
  watch: {},
  data() {
    return {
      queryParam: this.$utils.deepCopy(queryParam),
    }
  },
  methods: {
    reset() {
      this.queryParam = this.$utils.deepCopy(queryParam);
    },
    openDetail(row) {
      this.$refs["message-template-detail"].open("查看", row)
    }
  },
  computed: {
    columns() {
      return [
        {title: "模板代码", key: "templateCode", tooltip: true, minWidth: 100, align: "center"},
        {title: "模板名称", key: "templateName", tooltip: true, minWidth: 100, align: "center"},
        {title: "微信模板编号", key: "templateNumber", minWidth: 180, align: "center"},
        {title: "模板内容", key: "templateContent", minWidth: 200, align: "center"},
        this.$utils.render.actionColumn([
          this.detailAction({permission: this.getPermissionKey("detail"), action: (row, el) => this.openDetail(row)}),
          this.editAction({permission: this.getPermissionKey('edit')}),
          this.deleteAction({permission: this.getPermissionKey('delete')}, "system/message-template/delete"),
        ], {fixed: "right"}),
      ]
    },
    exportColumns() {
      return [
        {title: '模板代码', key: 'templateCode'},
        {title: '模板名称', key: 'templateName'},
        {title: '微信模板编号', key: 'templateNumber'},
        {title: '模板内容', key: 'templateContent'},
      ]
    },
    toolbarButtons() {
      return [
        this.addButton(),
        this.exportButton({excelName: "模板管理"})
      ]
    },
    dataConfig() {
      return {
        queryApi: "system/message-template/query",
        columns: this.columns,
        toolbarButtons: this.toolbarButtons,
        exportColumns: this.exportColumns
      }
    },
  },
  async created() {
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>