<template>
  <div class="custom-bread-crumb">
    <Breadcrumb separator="<b>/</b>">
      <!-- <span style="color:#515a6e;">当前位置：</span> -->
      <BreadcrumbItem v-for="(item, index) in list" :to="getTo(item, index)" :key="`bread-crumb-${item.name}`" replace>
        <!-- <common-icon style="margin-right: 4px;" :type="item.icon || ''" /> -->
        {{ showTitle(item) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
import  menuRouterHelper  from '@/libs/helpers/menu-router-helper.js'
import CommonIcon from "_c/common-icon";
export default {
  name: "customBreadCrumb",
  components: {
    CommonIcon
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showTitle(item) {
      return menuRouterHelper.showTitle(item, this);
    },
    isCustomIcon(iconName) {
      return iconName.indexOf("_") === 0;
    },
    getCustomIconName(iconName) {
      return iconName.slice(1);
    },
    getTo(item, index){
      // if(index == 1 && this.list.length > 2){
      //   if(item.meta && item.meta.defaultChild){
      //     return item.meta.defaultChild.replace('.',"_");
      //   }else{
      //     return item.name;
      //   }
      // }
      return "";

    }
  }
};
</script>
