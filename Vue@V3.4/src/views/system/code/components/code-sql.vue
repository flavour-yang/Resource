<template>
  <form-modal :loading.sync="loading" :model="model" v-bind="config" ref="code-sql">
    <Row>
      <hy-input ref="hyInput" v-model="model.sql" :readonly="true" type="textarea" label="sql" prop="sql" span="24" :maxlength="100000" />
    </Row>
  </form-modal>
</template>

<script>
import { FormModalBase } from '@/mixins'

const model = {
  sql: ''
}
export default {
  name: 'code-sql',
  mixins: [FormModalBase],
  data() {
    return {
      model: this.$utils.deepCopy(model)
    }
  },
  computed: {},
  methods: {
    async initModelHandle(value) {
      const url = value.parent ? 'system/code/sql' : 'system/code/groupSql'
      const res = await this.$store.dispatch(url, value.id)

      if (res) {
        this.model.sql = res
        this.$nextTick(() => {
          this.$refs.hyInput.$refs.input.focus({
            cursor: 'all'
          })
        })
      }
    },
    resetModel() {
      this.model = this.$utils.deepCopy(model)
    }
  },
  async created() {
    Object.assign(this.config, {
      title: '查看',
      width: 1000,
      hideOk: true
    })
  }
}
</script>
