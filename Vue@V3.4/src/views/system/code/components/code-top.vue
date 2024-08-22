<template>
  <Card style="margin-bottom:5px">
    <div class="btnGroup">
      <hy-button-list :list="toolbarButtons" />
    </div>
    <code-operate-modal @save-success="saveSuccess" ref="operate-modal"></code-operate-modal>
  </Card>
</template>
<script>
import CodeOperateModal from './code-operate-modal.vue'
import { Base } from '@/mixins'
export default {
  name: 'dictionary_management',
  mixins: [Base],
  props: { selectTree: { type: Object } },
  components: { CodeOperateModal },
  computed: {
    isGroudBlock() {
      return !this.selectTree.id
    },
    isDelete() {
      return !this.selectTree.id
    },
    toolbarButtons() {
      return [
        {
          text: '新增代码组',
          permission: 'dictionary_management_add',
          type: 'primary',
          action: () => this.addCodeGroup()
        },
        {
          text: '新增代码块',
          permission: 'dictionary_management_add',
          type: 'primary',
          disabled: this.isGroudBlock,
          action: () => this.addCodeBlock()
        },
        {
          text: '删除',
          permission: 'dictionary_management_delete',
          type: 'error',
          disabled: this.isDelete,
          action: () => this.deleteCode()
        },
        { text: '刷新缓存', permission: 'dictionary_management_add', type: 'primary', action: () => this.refresh() }
      ]
    }
  },
  methods: {
    //新增代码组
    addCodeGroup() {
      this.$refs['operate-modal'].open('新增', { parent: true })
    },
    addCodeBlock() {
      const { codeList } = this.$store.state.system.code
      const findIt = codeList.find(f => f.id === this.selectTree.id)
      let parentId = null
      // 没找到parentId 且选中时 则是选中了代码组
      if (findIt && this.selectTree.id) {
        // 找到但没有parentId 则是第一层本身为parentId
        parentId = this.selectTree.id
      }
      const params = {
        parent: false,
        groupKey: this.selectTree.data.groupKey,
        groupName: this.selectTree.data.groupName,
        parentId
      }

      this.$refs['operate-modal'].open('新增', params)
    },
    async deleteCode() {
      if (this.selectTree.id) {
        const selectTree = this.selectTree
        this.$utils.modal.deleteConfirm(async () => {
          const requestUrl = selectTree.parent ? 'system/code/delete' : 'system/code/deleteGroup'
          await this.$store.dispatch(requestUrl, { id: selectTree.id })
          let params = {}
          if (selectTree.parent) {
            params = {
              groupKey: selectTree.data.groupKey,
              groupName: selectTree.data.groupName
            }
          }
          this.$emit('save-success', params)
        })
      }
    },
    async refresh() {
      await this.$store.dispatch('system/code/refreshCode')
      this.$Message.success('操作成功！')
      this.$emit('on-refresh-code')
    },
    saveSuccess(value) {
      this.$emit('save-success', value)
    }
  },
  mounted() {}
}
</script>