<template>
  <div class="tab-content">
    <Spin fix v-if="loading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
    </Spin>
    <workbench-list @save-success="fetchWorkbench" v-for="(item, key) of workbenchGroupMap" :key="key" :taskList="item" :title="findGroupKey(key)" />
  </div>
</template>

<script>
import WorkbenchList from './workbench-list.vue'

export default {
  name: 'workbench-management',
  components: { WorkbenchList },
  data() {
    return {
      tasks: [],
      workbenchGroup: [], // consts.home.workbenchGroup
      workbenchGroupMap: {},
      loading: false
    }
  },
  computed: {},

  async mounted() {
    // 获取待办事项
    this.fetchWorkbench()
  },

  methods: {
    async fetchWorkbench() {
      // 获取待办事项列表
      this.loading = true
      try {
        this.workbenchGroup = await this.getCodeInfoList(this.$consts.system.groupKey.workbenchCategory)
        const res = await this.$utils.retrieve('home/index/query', {
          includingRoles: true,
          includingCount: true
        })
        this.tasks = res.records
        this.workbenchGroupMap = this.workbenchGroup.reduce((p, n) => {
          p[n.key] = res.records.filter(f => f.categoryCode === n.key)
          return p
        }, {})
      } finally {
        this.loading = false
      }
    },
    onClick(name) {
      this.defaultKey = name
    },
    findGroupKey(key) {
      return this.workbenchGroup.find(f => f.key === key).value
    },
    filterGroups(code) {
      return this.tasks.filter(f => f.categoryCode === code)
    }
  }
}
</script>

<style lang="less" scoped>
.tab-content {
  padding: 0 24px;
  position: relative;
  min-height: 400px;
}
</style>
