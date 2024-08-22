<template>
  <div>
    <WorkbenchBloc ref="workbenchBloc" v-if="isBloc" />
    <WorkbenchLead ref="workbenchLead" v-else :key="companyId"/>
  </div>
</template>

<script>
import WorkbenchBloc from './workbench-bloc.vue'
import WorkbenchLead from './workbench-lead.vue'
export default {
  components: { WorkbenchLead, WorkbenchBloc },
  data() {
    return {
      isBloc: false
    }
  },
  computed: {
    companyId() {
      return this.$store.state.home.index.companyId
    }
  },
  async mounted() {},
  destroyed() {},
  methods: {
    setBloc(val) {
      this.isBloc = val
      // this.$refs.workbenchBloc
      // this.$refs.workbenchLead
    }
  }
}
</script>

<style lang='less' scoped>
</style>