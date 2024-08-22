<template>
  <form-modal :loading.sync="loading"
              :model="model"
              v-bind="config"
              ok-api="system/job/save">
    <Row>
      <hy-input v-model="model.jobName"
                label="任务名称"
                required
                prop="jobName"
                span="24"
                :maxlength="255" />
      <hy-input v-model="model.beanClass"
                label="Bean类名"
                required
                prop="beanClass"
                span="24"
                :maxlength="255" />
      <hy-input v-model="model.cronExpression"
                label="定时表达式"
                required
                prop="cronExpression"
                span="24"
                :maxlength="50" />
      <hy-input v-model="model.jobConfig"
                label="配置参数"
                type="textarea"
                prop="configJson"
                :maxlength="999999"
                :maxRows="18"
                span="24" />
      <hy-input v-model="model.remark"
                label="备注"
                type="textarea"
                prop="remark"
                span="24" />
      <hy-radio v-model="model.jobStatus"
                label="任务状态"
                required
                prop="jobStatus"
                span="24"
                :list="statusTypeList" />
    </Row>
  </form-modal>
</template>

<script>
import JobModalBase from "../mixins/job-modal-base";
export default {
  name: "job-edit-modal",
  mixins: [JobModalBase],
  data() {
    return {
      hideOk: false,
    }
  },
}
</script>
