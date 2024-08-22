<template>
  <form-modal :loading.sync="loading"
              :model="performParam"
              v-bind="config"
              okText="执行"
              ok-api="system/job/perform">
    <Row>
      <hy-span label="JOB名称"
               :value="model.jobName"
               span="24" />
      <hy-input v-model="performParam.jobParam"
                label="JOB入参"
                type="textarea"
                prop="jobParam"
                span="24" />
    </Row>
  </form-modal>
</template>

<script>
import JobModalBase from "../mixins/job-modal-base";

export default {
  name: "job-perform-modal",
  mixins: [JobModalBase],
  data() {
    return {
      performParam: {
        scheduleId: "",
        jobParam: "",
      },
      hideOk: false,
    }
  },
  methods: {
    initModelHandle(row) {
      if (row.id) {
        this.model = Object.assign({}, row);
        this.performParam.scheduleId = this.model.id;
      }
    },
  },
}
</script>
