<template>
  <div class="menu-demo">
    <!-- <a-button :style="{ padding: '0 12px', height: '30px', lineHeight: '30px', marginBottom: '4px' }" type="primary"
      @click="toggleCollapse">
      <icon-menu-unfold v-if="collapsed" />
      <icon-menu-fold v-else />
    </a-button> -->
    <a-menu mode="horizontal" :style="{ borderRadius: '4px' }" theme="dark" :collapsed="collapsed">
      <a-sub-menu v-for="menu in menuList" :key="menu.name">
        <!-- <template #icon><icon-apps></icon-apps></template> -->
        <template #title>{{ menu.meta.title }}</template>
        <a-menu-item v-for="chid in menu.children" :key="chid.name" @click="toPage(chid)">{{ chid.meta.title
          }}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import { ref } from 'vue';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@arco-design/web-vue/es/icon';
import { useAppStore } from '@/stores/modules/app'
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
  },
  setup() {
    const appStroe = useAppStore()
    const menuList = appStroe.menuList
    const route = useRoute()
    const router = useRouter()
    console.log(menuList)

    const collapsed = ref(false);
    const toPage = ({ path }) => {
      router.push(path)
    }
    return {
      collapsed,
      toggleCollapse: () => { collapsed.value = !collapsed.value; },
      menuList,
      toPage
    }
  }
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  background-color: var(--color-neutral-2);
}
</style>