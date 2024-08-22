<template>
  <form-modal :loading.sync="loading" :title="title" :model="model" v-bind="config" @save-success="saveSuccess" ref="code-operate-modal">
    <Row>
      <hy-input v-if="isGroup" v-model="model.groupKey" label="代码组键值" prop="groupKey" required span="24"></hy-input>
      <hy-input v-else v-model="model.codeKey" label="代码键值" required prop="codeKey" span="24" />
      <hy-input v-if="isGroup" v-model="model.groupName" label="代码组名称" prop="groupName" required span="24"></hy-input>
      <hy-input v-else v-model="model.codeName" label="代码名称" required prop="codeName" span="24" />
      <hy-input v-model="model.orderIndex" label="排序号" span="24"></hy-input>
      <hy-radio v-model="model.status" label="是否启用" span="24" :list="statusList"></hy-radio>
      <hy-input v-if="isGroup" v-model="model.description" label="描述" type="textarea" span="24"></hy-input>
      <hy-input v-else v-model="model.description" label="扩展属性" type="textarea" :maxlength="10000" span="24"></hy-input>
    </Row>
  </form-modal>
</template>

<script>
import { FormModalBase } from '@/mixins'

const model = {
  codeKey: '',
  codeName: '',
  groupKey: '',
  groupName: '',
  orderIndex: '',
  status: 'Y',
  description: ''
}
export default {
  name: 'code-operate-form-modal',
  mixins: [FormModalBase],
  data() {
    return {
      model: this.$utils.deepCopy(model),
      showFeature: false,
      statusList: [],
      isGroup: true
    }
  },
  computed: {
    title() {
      return '新增代码组'
    }
  },
  methods: {
    async initModelHandle(row) {
      this.model = { ...this.model, ...(!row.parent ? row : {}) }
      this.isGroup = row.parent
      Object.assign(this.config, {
        width: 500,
        okApi: row.parent ? 'system/code/saveGroup' : 'system/code/save'
      })
    },
    resetModel() {
      this.model = this.$utils.deepCopy(model)
    },

    getLabel(label) {
      return `${this.title}${label}`
    },
    saveSuccess(value, res) {
      console.log({res})
      this.$emit('save-success', value)
      this.$refs['code-operate-modal'].$children[0].close()
    }
  },
  async mounted() {
    this.statusList = await this.getCodeInfoList(this.$consts.system.groupKey.statusType)
  }
}
</script>
