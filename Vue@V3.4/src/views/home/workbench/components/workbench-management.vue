<template>
  <div>
    <Tabs :value="defaultKey" name="workbrench" @on-click="onClick">
      <TabPane v-for="item in workbenchAction" :key="item.rightKey" :label="item.label" :name="item.name" :tab="item.workbrench">
      </TabPane>
      <!-- <TabPane v-if="hasTask" label="待办任务" name="待办任务" tab="workbrench">
        <div class="tab-content">
          <workbench-list @save-success="fetchWorkbench" v-for="(item, key) of workbenchGroupMap" :key="key" :taskList="item" :title="findGroupKey(key)" />
        </div>
      </TabPane>
      <TabPane v-if="hasLeadChart " label="领导看板" name="领导看板" tab="workbrench">
        <workbench-lead-chart v-if="defaultKey === '领导看板'" />
      </TabPane>
      <TabPane v-if="hasChart" label="总览" name="总览" tab="workbrench">
        <workbench-chart v-if="defaultKey === '总览'" />
      </TabPane>
      <TabPane v-if="hasSearch " label="综合查询" name="综合查询" tab="workbrench">
        <WorkbenchSearch v-if="defaultKey === '综合查询'" />
      </TabPane>
      <TabPane v-if="hasFloorArea " label="租赁状态图" name="租赁状态图" tab="workbrench">
        <EstatePlan v-if="defaultKey === '租赁状态图'" />
      </TabPane> -->
      <template #extra>
        <Form v-if="defaultKey === '领导看板' && companys.length">
          <hy-select :clearable="false" label="" :label-width="0" style="min-width: 150px; float: right;" v-model="currentCompony" :list="companys" @on-change="onChange" />
        </Form>
      </template>
    </Tabs>
    <div v-for="item in workbenchAction" :key="`${item.rightKey}_${item.name}`">
      <component ref="com" v-if="defaultKey === item.name" :is="item.component" />
    </div>
  </div>
</template>

<script>
import WorkbenchList from './workbench-list-content.vue'
import WorkbenchChart from './workbench-chart.vue'
import EstatePlan from '@/view/estate/estate-management/components/estate-plan.vue'
import WorkbenchLeadChart from './workbench-lead-chart.vue'
import WorkbenchSearch from './workbench-search.vue'
import utils from '@/libs/utils'
import HySelect from '@/components/common/form-item-controls/hy-select.vue'
import config from '@/config'
const _ID = config.blocId
export default {
  name: 'workbench-management',
  components: { WorkbenchList, WorkbenchChart, WorkbenchLeadChart, EstatePlan, WorkbenchSearch, HySelect },
  data() {
    return {
      defaultKey: '待办任务',
      tasks: [],
      workbenchGroup: [], // consts.home.workbenchGroup
      workbenchGroupMap: {},
      currentCompony: _ID
    }
  },
  computed: {
    rightList() {
      return this.$store.state.current.userInfo.rightList
    },
    companys() {
      const list = [...this.$store.state.current.userInfo.companyList]
      return list.map(m => {
        if (m.orgName === '中新集团') {
          return { key: m.id, value: '集团本部' }
        }
        return { key: m.id, value: m.orgName }
      })
    },
    workbenchAction() {
      const workbench = this.rightList.find(f => f.rightKey === 'workbench')
      if (workbench) {
        const actions = this.rightList.filter(f => f.parentId === workbench.id)
        if (actions.length) {
          const components = {
            workbench_floorArea: EstatePlan,
            workbench_task: WorkbenchList,
            workbench_search: WorkbenchSearch,
            workbench_chart: WorkbenchChart,
            workbench_lead_chart: WorkbenchLeadChart
          }
          const actionsTabs = actions.map(m => ({
            tab: 'workbrench',
            label: m.rightName,
            name: m.rightName,
            rightKey: m.rightKey,
            component: components[m.rightKey]
          }))
          if (actionsTabs.length) {
            this.defaultKey = actionsTabs[0].name
            this.setChartData()
          }
          return actionsTabs
        }
      }
      return []
    },
    hasFloorArea() {
      return this.$store.state.current.permissions.includes('workbench_floorArea')
    },
    hasTask() {
      return this.$store.state.current.permissions.includes('workbench_task')
    },
    hasSearch() {
      return this.$store.state.current.permissions.includes('workbench_search')
    },
    hasChart() {
      return this.$store.state.current.permissions.includes('workbench_chart')
    },
    hasLeadChart() {
      return this.$store.state.current.permissions.includes('workbench_lead_chart')
    }
  },

  async mounted() {
    // 获取待办事项
    this.fetchWorkbench()
  },

  methods: {
    async fetchWorkbench() {
      // 获取待办事项列表
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
    },
    setChartData() {
      const companyList = this.$store.state.current.userInfo.companyList
      if (companyList && companyList.length) {
        this.currentCompony = companyList[0].id
        this.$store.commit('home/index/setCompanyId', companyList[0].id)
        this.$nextTick(() => {
          if (companyList[0].id === _ID) {
            this.$refs['com'][0].setBloc(true)
          } else {
            this.$refs['com'][0].setBloc(false)
          }
        })
      }
    },
    onClick(name) {
      this.defaultKey = name
      if (this.defaultKey === '领导看板') {
        this.setChartData()
      }
    },
    findGroupKey(key) {
      return this.workbenchGroup.find(f => f.key === key).value
    },
    onChange(val) {
      if (this.defaultKey === '领导看板') {
        this.$store.commit('home/index/setCompanyId', val)
        if (val === _ID) {
          this.$refs['com'][0].setBloc(true)
        } else {
          this.$refs['com'][0].setBloc(false)
        }
      }
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
}
</style>