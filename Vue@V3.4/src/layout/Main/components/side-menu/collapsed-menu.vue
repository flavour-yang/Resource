<template>
  <Dropdown ref="dropdown" @on-click="handleClick" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement" >
    <a class="drop-menu-a" type="text" @mouseover="handleMousemove($event, children)" :style="{textAlign: !hideTitle ? 'left' : ''}" >
      <common-icon v-if="parentItem.icon" :size="rootIconSize" :color="textColor" :type="parentItem.icon" />
      <span class="menu-title" v-if="!hideTitle">{{ showTitle(parentItem) }}</span>
      <Icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16" />
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <collapsed-menu v-if="showChildren(child)" :icon-size="iconSize" :parent-item="child" :key="`drop-${child.name}`"></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="getNameOrHref(child)">
          <common-icon v-if="child.icon" :size="iconSize" :type="child.icon" />
          <span class="menu-title">{{ showTitle(child) }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import mixin from "./mixin";
import itemMixin from "./item-mixin";
import domHelper from "@/libs/helpers/dom-helper";

export default {
  name: "CollapsedMenu",
  mixins: [mixin, itemMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    rootIconSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      placement: "right-end"
    };
  },
  methods: {
    handleClick(name) {
      this.$emit("on-click", name);
    },
    handleMousemove(event, children) {
      const { pageY } = event;
      const height = children.length * 38;
      const isOverflow = pageY + height < window.innerHeight;
      this.placement = isOverflow ? "right-start" : "right-end";
    }
  },
  mounted() {
    let dropdown = domHelper.findNodeUpperByClasses(this.$refs.dropdown.$el, [
      "ivu-select-dropdown",
      "ivu-dropdown-transfer"
    ]);
    if (dropdown) dropdown.style.overflow = "visible";
  }
};
</script>
