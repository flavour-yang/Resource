<template>
  <div class="header-bar">
    <div class="header-bar-left">
      <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
      <custom-bread-crumb show-icon style="margin-left: 8px;" :list="breadCrumbList"></custom-bread-crumb>
    </div>
    
    <div class="header-bar-right">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from "./sider-trigger";
import customBreadCrumb from "./custom-bread-crumb";
import "./header-bar.less";
export default {
  name: "HeaderBar",
  components: {
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList;
    }
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit("on-coll-change", state);
    }
  }
};
</script>
