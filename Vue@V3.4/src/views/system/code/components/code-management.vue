<template>

  <div class="content">
    <CodeTop @save-success="saveSuccess" :selectTree="selectTree" @on-refresh-code="onRefreshCode" />
    <hy-split v-model="splitValue">
      <template slot="left-pane">
        <code-content ref="code-content" @on-check-tree="onCheckTree"></code-content>
      </template>
      <template slot="right-pane">
        <code-right @save-success-submit="saveSuccessSubmit" :selectTree="selectTree"></code-right>
      </template>
    </hy-split>
  </div>
</template>

<script>
import CodeContent from './code-content.vue'

import CodeRight from './code-right.vue'
import CodeTop from './code-top.vue'
import HySplit from '@/components/common/other-controls/hy-split.vue'

export default {
  components: { HySplit, CodeContent, CodeRight, CodeTop },
  name: 'dictionary_management',
  data() {
    return {
      selectTree: {},
      splitValue: 0.25
    }
  },

  mounted() {},

  methods: {
    onCheckTree(node) {
      this.selectTree = node
    },
    // 新增操作
    saveSuccess(value) {
      this.$refs['code-content'].loadTreeData(value)
      this.selectTree = {}
    },
    // 右侧操作区保存
    saveSuccessSubmit(value) {
      this.$refs['code-content'].userSubmitTreeData(value)
    },
    onRefreshCode() {
      this.$refs['code-content'].loadTreeData()
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  height: 79vh;
}
// .split-pane {
//   padding: 5px;
//   height: 79vh;
//   overflow-y: auto;
// }
</style>