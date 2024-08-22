<template>
  <div>
    <form-modal :loading.sync="loading" :model="model" v-bind="config">
      <Row>
        <hy-span v-model="model.templateCode" label="模板代码" bottom span="24"/>
        <hy-span v-model="model.templateName" label="模板名称" bottom span="24"/>
        <hy-span v-model="model.templateNumber" label="微信模板编号" bottom span="24"/>
        <hy-span v-model="model.templateContent" label="模板内容" bottom span="24"/>
      </Row>
    </form-modal>
  </div>
</template>

<script>
import {FormModalBase} from "@/mixins";

const model = {
  templateCode: '',
  templateName: '',
  templateNumber: '',
  templateContent: '',
}
export default {
  name: "message-template-detail",
  components: {},
  props: [],
  mixins: [FormModalBase],
  watch: {},
  data() {
    return {
      model: this.$utils.deepCopy(model),
      hideOk: true,
      disabled: true
    }
  },
  methods: {
    async initModelHandle(row) {
      if (row) {
        this.model = Object.assign({}, row);
      }
    },
  },
  async created() {
    Object.assign(this.config, {
      title: `消息模板`,
      width: 600,
      hideOk: this.hideOk,
    });
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>