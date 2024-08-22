<template>
  <form-modal :loading.sync="loading" :model="model" v-bind="config">
    <Row>
      <hy-input v-model="model.templateCode" label="模板代码" prop="renterName" span="24"/>
      <hy-input v-model="model.templateName" label="模板名称" prop="renterName" span="24"/>
      <hy-input v-model="model.templateNumber" label="微信模板编号" prop="renterName" span="24"/>
      <hy-input v-model="model.templateContent" type="textarea" :rows="5" label="模板内容" prop="templateContent" span="24"/>
    </Row>
  </form-modal>
</template>

<script>
import MessageTemplateModalBase from '../mixins/message-template-modal-base'

export default {
  name: "message_template_operate_modal",
  components: {},
  mixins: [MessageTemplateModalBase],
  props: [],
  watch: {},
  data() {
    return {
      hideOk: false,
    }
  },
  methods: {},
  created() {
  },
  mounted() {
  },
}
</script>

<style scoped>

</style>