import { FormModalBase } from "@/mixins";
import consts from "@/libs/consts";

const model = {
  jobName: "",
  beanClass: "",
  cronExpression: "",
  jobConfig: "",
  remark: "",
  jobStatus: consts.common.yesNo.yes.key,
}

export default {
  name: "job-modal-base",
  mixins: [FormModalBase],
  data() {
    return {
      model: this.$utils.deepCopy(model),
      statusTypeList: [],
      hideOk: true
    }
  },
  methods: {
    async initModelHandle(row) {
      this.statusTypeList = await this.getCodeInfoList(this.$consts.system.groupKey.statusType);
      if (row.id) {
        this.model = Object.assign({}, row);
      }
    },
    resetModel() {
      this.model = this.$utils.deepCopy(model)
    }
  },

  computed: {
  },

  async created() {
    Object.assign(this.config, {
      title: `定时任务`,
      width: 500,
      hideOk: this.hideOk,
    });
  }
}