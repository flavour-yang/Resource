<template>
  <div>
    <search-page :model="queryParam"
                 v-bind="dataConfig"
                 :ref="refName"
                 @reset="reset">
      <template>
        <hy-input v-model="queryParam.jobName"
                  label="任务名称"
                  prop="jobName" />
        <hy-input v-model="queryParam.beanClass"
                  label="Bean类名"
                  prop="beanClass" />
        <hy-input v-model="queryParam.cronExpression"
                  label="定时表达式"
                  prop="cronExpression" />
        <hy-select v-model="queryParam.jobStatus"
                   label="任务状态"
                   prop="jobStatus"
                   :list="statusTypeList" />
      </template>
      <template #toolbar-buttons>
        <hy-button-list :list="toolbarButtons" />
      </template>
    </search-page>

    <job-edit-modal ref="operate-modal"
                    @save-success="query" />
    <job-perform-modal ref="perform-modal" />
    <job-log-modal ref="log-modal" />

  </div>
</template>

<script>
import { PageListBase } from "@/mixins";
import JobEditModal from "./job-edit-modal.vue";
import JobPerformModal from "./job-perform-modal.vue";
import JobLogModal from "./job-log-modal.vue";

const queryParam = {
  jobName: "",
  beanClass: "",
  cronExpression: "",
  jobStatus: "",
}

export default {
  name: "job_management",
  mixins: [PageListBase],
  components: { JobEditModal, JobPerformModal, JobLogModal },
  data() {
    return {
      queryParam: this.$utils.deepCopy(queryParam),
      statusTypeList: [],
    }
  },
  methods: {
    reset() {
      this.queryParam = this.$utils.deepCopy(queryParam);
    },
    startAll() {
      this.$websocket.open();
      this.$store.dispatch("system/job/resumeAll");
    },
    stopAll() {
      this.$websocket.open();
      this.$store.dispatch("system/job/pauseAll");
    },
    start(row) {
      this.$websocket.open();
      this.$store.dispatch("system/job/resume", row.id);
    },
    stop(row) {
      this.$websocket.open();
      this.$store.dispatch("system/job/pause", row.id);
    },
    checkStartStatus(row) {
      return row.jobStatus == this.$consts.common.yesNo.no.key;

    },
    checkStopStatus(row) {
      return row.jobStatus == this.$consts.common.yesNo.yes.key;
    }
  },
  async created() {
    this.$websocket.open();
    this.statusTypeList = await this.getCodeInfoList(this.$consts.system.groupKey.statusType);
  },
  computed: {
    columns() {
      return [
        { title: "任务名称", key: "jobName",  minWidth: 220, align: "center" },
        { title: "任务类", key: "beanClass", tooltip: true, minWidth: 180, align: "center" },
        { title: "定时表达式", key: "cronExpression", minWidth: 100, align: "center" },
        {
          title: "任务状态", key: "jobStatusName", width: 100,minWidth: 100, align: "center", render: (h, params) => {
            return h("Tag", { props: { color: params.row.jobStatus == this.$consts.common.yesNo.yes.key ? "green" : "red" } }, params.row.jobStatusName)
          }
        },
        { title: "更新者", key: "updatePeopleName",width: 120, minWidth: 120, align: "center" },
        { title: "更新时间", key: "updateTime",width: 180, minWidth: 180, align: "center" },

        this.$utils.render.actionColumn([
          { text: "执行", permission: this.getPermissionKey('perform'), action: (row, el) => this.turnTo({ name: "perform", title: el.text }, row) },
          { text: "启动", permission: this.getPermissionKey('start'), check: row => this.checkStartStatus(row), action: row => this.start(row) },
          { text: "暂停", permission: this.getPermissionKey('stop'), check: row => this.checkStopStatus(row), action: row => this.stop(row) },
          this.editAction({ permission: this.getPermissionKey('edit') }),
          this.deleteAction({ permission: this.getPermissionKey('delete') }, "system/job/delete"),
          { text: "查看日志", permission: this.getPermissionKey('viewlog'), action: (row, el) => this.turnTo({ name: "log", title: el.text }, row) },
        ], { }),
      ]
    },
    toolbarButtons() {
      return [
        this.addButton(),
        { text: "启动所有任务", permission: this.getPermissionKey('start'), type: "primary", action: this.startAll },
        { text: "暂停所有任务", permission: this.getPermissionKey('stop'), type: "primary", action: this.stopAll },
        this.exportButton({ excelName: "定时任务" })
      ]
    },

    dataConfig() {
      return {
        queryApi: "system/job/query",
        columns: this.columns,
        toolbarButtons: this.toolbarButtons,
      }
    },
  },
}
</script>