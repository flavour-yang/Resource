<template>
  <form-modal :loading.sync="loading" :model="model" v-bind="config" ok-api="api/Role/ImportSelectedRight" ref="permission-operate-modal">
    <transfer-tree style="margin:0 auto" :data="data" :target-keys="model.childrenRightIds" filterable @on-change="transferChange" :titles="['未分配权限','已分配权限']" />
  </form-modal>
</template>

<script>
const model = {
  roleId: '',
  rightIds: [],
  parentRightIds: [],
  childrenRightIds: []
}
import { FormModalBase } from '@/mixins'
export default {
  name: 'permission-operate-modal',
  mixins: [FormModalBase],
  data() {
    return {
      model: this.$utils.deepCopy(model),
      data: []
    }
  },
  methods: {
    initModelHandle(row) {
      this.loadingFunc(async () => {
        roleSelectedRight
        let result = await this.$store.dispatch('system/role/getRightChildren')
        let selected = await this.$store.dispatch('system/role/roleSelectedRight', { id: row.id })
        this.model.childrenRightIds = selected
          .filter(el => !el.children)
          .map(el => {
            return el.id
          })
        this.model.parentRightIds = selected
          .filter(el => el.children)
          .map(el => {
            return el.id
          })
        this.model.rightIds = [...this.model.childrenRightIds, ...this.model.parentRightIds]
        this.data = result
        this.model.roleId = row.roleID
      })
    },
    resetModel() {
      this.model = this.$utils.deepCopy(model)
      this.data = []
    },

    transferChange(newTargetData) {
      this.model.childrenRightIds = newTargetData.map(el => {
        return el.key
      })
      this.model.parentRightIds = Array.from(
        new Set(
          newTargetData.map(el => {
            return el.parentKey
          })
        )
      )
      this.model.rightIds = [...this.model.childrenRightIds, ...this.model.parentRightIds]
    }
  },

  created() {
    Object.assign(this.config, {
      title: `权限分配`,
      width: 980
    })
  }
}
</script>
