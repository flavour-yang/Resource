const model = {
  codeKey: '',
  codeName: '',
  orderIndex: '',
  status: 'Y',
  description: ''
}
import commonConsts from '@/libs/consts/modules/common'

export default {
  name: 'form-base',
  props: {
    selectTree: { default: {}, type: Object }
  },
  data() {
    return {
      model: this.$utils.deepCopy(model)
    }
  },
  methods: {
    async cancel() {
      if (JSON.stringify(this.formLeft) != '{}') {
        const requestUrl = this.selectTree.parent ? 'system/code/query' : 'system/code/queryCodeGroup'

        this.$store
          .dispatch(requestUrl, { id: this.model.id })
          .then(res => {
            if (res.records.length) {
              this.model = { ...this.model, ...res.records[0] }
            }
          })
      }
    },
    save(name) {
      if (JSON.stringify(this.formLeft) == '{}') {
        this.$Message.warning('请先选择需要修改的代码块')
        return
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            const payload = {
              id: this.model.id,
              codeKey: this.model.codeKey,
              codeName: this.model.codeName,
              orderIndex: this.model.orderIndex,
              status: this.model.status,
              description: this.model.description,
              groupKey: this.model.groupKey,
              groupName: this.model.groupName
            }
            const requestUrl = this.selectTree.parent ? 'system/code/save' : 'system/code/saveGroup'

            this.$store
              .dispatch(requestUrl, payload)
              .then(res => {
                this.$Message.success('保存成功')
                this.$emit('save-success-submit', {
                  ...this.model,
                  title: this.selectTree.parent ? this.model.codeName : this.model.groupName
                })
              })
              .catch(err => {
                this.$Message.error('保存失败')
              })
          } else {
            this.$Message.error('保存失败')
          }
        })
      }
    },
    getSql() {
      this.$refs['code-sql'].open('sql', this.selectTree)
    }
    
  },
  watch: {
    selectTree(value) {
      this.model = { ...value.data } || {}
    }
  },
  computed: {
    statusList() {
      return commonConsts.statusList()
    }
  }
}
