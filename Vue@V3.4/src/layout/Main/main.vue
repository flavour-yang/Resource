<template>
  <a-layout>
    <a-layout>
      <a-layout-sider :theme="app.theme" class="logo-layout">
        <img class="logo" :src="logo" />
        <span v-show="!collapsed">{{ $config.appTitleAbbr }}</span>
        <!-- <a-divider direction="vertical" /> -->
      </a-layout-sider>
      <a-menu mode="horizontal" :style="{}" :theme="app.theme" :collapsed="collapsed"
        :default-selected-keys="selectedKeys">
        <a-sub-menu v-for="menu in menuList" :key="menu.name">
          <template #title>{{ menu.meta.title }}</template>
          <a-menu-item v-for="child in menu.children" :key="child.name" @click="toPage(child)">
            {{ child.meta.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
      <a-layout-sider :theme="app.theme" class="right-sider">
        <a-space>
          <!-- @select="handleSelect" -->
          <a-dropdown>
            <a-avatar :size="32" style="cursor: pointer;">{{ '头像' }}</a-avatar>
            <template #content>
              <a-doption>修改密码</a-doption>
              <a-doption>退出登录</a-doption>
            </template>
          </a-dropdown>
          <span>{{ `${userInfo.name || ''}，你好！` }}</span>
        </a-space>
      </a-layout-sider>
    </a-layout>
    <!-- :value="$route"  @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" -->
    <a-layout-content>
      <!-- <Breadcrumb /> -->
      <tags-nav />
      <router-view />
    </a-layout-content>
  </a-layout>

  <!-- <Layout style="height: 100%"
          class="main">
    <Sider hide-trigger
           collapsible
           :width="210"
           :collapsed-width="64"
           v-model="collapsed"
           class="left-sider"
           :style="{overflow: 'hidden'}">
      <side-menu accordion
                 ref="sideMenu"
                 :active-name="activeName"
                 :collapsed="collapsed"
                 @on-select="turnToPage"
                 :menu-list="menuList"
                 >
        <div class="logo-con">
          <img :src="logo" />
          <span v-show="!collapsed">{{$config.appTitleAbbr}}</span>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed"
                    @on-coll-change="handleCollapsedChange">
          <Poptip v-if="getLeadChart && shortcutMenu.length" trigger="hover">
            <template #content>
              <div style="max-width: 600px;">
                <Row>
                  <Col style="padding: 6px;" v-for="item in shortcutMenu" :key="item.id" span="6">
                    <div class="header-action" :class="{'header-action-active': item.route === activeRoute}" @click="toPage(item.route)">
                      <img :src="menuImg(item.img)" height="24"> <span> {{ item.title }} </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </template>
<a style="margin-right: 16px">快捷菜单</a>
</Poptip>
<Poptip trigger="hover">
  <template #content>
              <div style="display: flex; flex-direction: column;align-items: center">
                <vue-qr :text="$config.h5Url" :size="150"></vue-qr>
                <span style="position: relative;top: -10px">h5网页(微信扫码)</span>
              </div>
              <hy-divider />
              <div style="display: flex; flex-direction: column;align-items: center">
                <vue-qr :text="appInfo.apkFileUrl" :size="150"></vue-qr>
                <span style="position: relative;top: -10px">Android app(扫码下载)</span>
              </div>
            </template>
  <a style="margin-right: 16px">移动端</a>
</Poptip>
<Tooltip content="刷新" placement="bottom">
  <Icon class="reload-icon" size="16" type="md-refresh" @click.native="reload" />
</Tooltip>
<theme-change />
<user @change="changepwd" />
</header-bar>
</Header>
<Content class="main-content-con">
  <Layout class="main-layout-con">
    <div class="tag-nav-wrapper">
      <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" />
    </div>
    <Content class="content-wrapper" id="mainDataBaseView">
      <keep-alive :include="cacheList" :max="5">
        <router-view />
      </keep-alive>
      <ABackTop :height="100" :bottom="80" :right="18" container=".content-wrapper"></ABackTop>
      <change-pwd ref="change-pwd" />
    </Content>
  </Layout>
</Content>
</Layout>
</Layout> -->

</template>

<script>
import { getCurrentInstance, onMounted, ref, watch } from 'vue';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@arco-design/web-vue/es/icon';
import { useAppStore } from '@/stores/modules/app'
import { useRoute, useRouter } from 'vue-router';
import Breadcrumb from './components/Breadcrumb/index.vue'
import TagsNav from "./components/tags-nav";

export default {
  components: {
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
    Breadcrumb,
    TagsNav
  },
  setup() {
    const appStroe = useAppStore()
    const menuList = appStroe.menuList
    const route = useRoute()
    const router = useRouter()
    const $config = getCurrentInstance()?.appContext.config.globalProperties.$config
    console.log(menuList)
    const collapsed = ref(false);
    const selectedKeys = ref([route.name])
    const logo = new URL(`../../assets/${$config.appCode}/images/logo.png`, import.meta.url).href

    watch(route, ($route) => {
      selectedKeys.value = [$route.name]
    })
    const toPage = (_route) => {
      const { path, name } = _route
      router.push(path)
      const find = appStroe.navTab.find(f => f.name === _route.name)
      const navTab = appStroe.navTab
      if (!find) {
        navTab.push(_route)
        appStroe.setState({ navTab })
      }
    }
    console.log(appStroe)
    return {
      app: appStroe.app,
      userInfo: appStroe.userInfo,
      $config,
      logo,
      collapsed,
      selectedKeys,
      toggleCollapse: () => { collapsed.value = !collapsed.value; },
      menuList,
      toPage
    }
  }
};
// import SideMenu from "./components/side-menu";
// import HeaderBar from "./components/header-bar";
// import TagsNav from "./components/tags-nav";
// import User from "./components/user";
// import ABackTop from "./components/a-back-top";
// import ChangePwd from "./components/change-pwd"
// import CustomBreadCrumb from "./components/header-bar/custom-bread-crumb";
// import ThemeChange from "./components/theme-change";
// import { mapActions, mapGetters, mapMutations } from "vuex";
// import menuRouterHelper from '@/libs/helpers/menu-router-helper.js'
// import VueQr from 'vue-qr'
// import "./main.less";
// import permission from "@/libs/utils/types/permission";

// export default {
//   name: "Main",
//   components: {
//     SideMenu,
//     HeaderBar,
//     TagsNav,
//     User,
//     ABackTop,
//     CustomBreadCrumb,
//     ChangePwd,
//     ThemeChange,
//     VueQr
//   },
//   data() {
//     return {
//       collapsed: false,
//       windowHeight: window.innerHeight,
//       appInfo: { apkFileUrl: '' },
//       activeRoute: ''
//     };
//   },
//   computed: {
//     ...mapGetters(["errorCount"]),
//     ...mapGetters(["messageCount"]),
//     ...mapGetters({
//       userInfo: "current/userInfo"
//     }),
//     shortcutMenu() {
//       const menu = []
//       const archive_estate = [
//         { title: '出租率', img: 'kh_ico2', route: '/report/archive-estate?name=estateRenteManagement' },
//         { title: '运营情况', img: 'kh_ico4', route: '/report/archive-estate?name=estateOperationsStatistics' },
//         { title: '租赁明细', img: 'kh_ico7', route: '/report/archive-estate?name=leaseEstateDetailManagement' },
//         { title: '投资额税收', img: 'kh_ico10', route: '/report/archive-estate?name=taxStatisticsOnTenantInvestment' },
//         { title: '空置情况', img: 'kh_ico1', route: '/report/archive-estate?name=estateVacantTable' }
//       ]
//       const asset_management = [{ title: '载体基础信息', img: 'kh_ico5', route: '/carrier/asset' }]
//       const archive_renter = [{ title: '在租户', img: 'kh_ico8', route: '/report/archive-renter?name=renterRenting' }]
//       const archive_apartment = [{ title: '出租单元', img: 'kh_ico11', route: '/report/archive-apartment?name=unit' }]
//       const note_warning = [{ title: '重要事项提醒', img: 'kh_ico3', route: '/warning/note-warning' }]
//       const document = [{ title: '信息包', img: 'kh_ico6', route: '/document/doc-file' }]
//       const fee = [
//         {
//           title: '经营费用汇总',
//           img: 'kh_ico9',
//           route: '/report/fee-collection-payment-statistics?name=FeeCollectionPaymentStatisticsByYear'
//         },
//         {
//           title: '经营费用明细',
//           img: 'kh_ico12',
//           route: '/report/fee-collection-payment-statistics?name=FeeCollectionPaymentStatisticsByMonth'
//         }
//       ]
//       if (permission.hasPermission('archive_estate')) {
//         menu.push(...archive_estate)
//       }
//       if (permission.hasPermission('asset_management')) {
//         menu.push(...asset_management)
//       }
//       if (permission.hasPermission('archive_renter')) {
//         menu.push(...archive_renter)
//       }
//       if (permission.hasPermission('archive_apartment')) {
//         menu.push(...archive_apartment)
//       }
//       if (permission.hasPermission('note_warning')) {
//         menu.push(...note_warning)
//       }
//       if (permission.hasPermission('document')) {
//         menu.push(...document)
//       }
//       if (permission.hasPermission('fee-collection-payment-statistics')) {
//         menu.push(...fee)
//       }
//       return menu // this.userInfo.rightList.filter(f=> f.isShortcut === 'Y')
//     },
//     logo() {
//       return require(`@/assets/${this.$config.appCode}/images/logo.png`);
//     },
//     tagNavList() {
//       return this.$store.state.app.tagNavList;
//     },
//     tagRouter() {
//       return this.$store.state.app.tagRouter;
//     },
//     cacheList() {
//       const list = [...this.$store.state.app.routerCacheList];
//       return list;
//     },
//     menuList() {
//       let data = this.$store.getters["current/menuList"];
//       return data;
//     },
//     hasReadErrorPage() {
//       return this.$store.state.app.hasReadErrorPage;
//     },
//     collapsedCls: function () {
//       return [this.collapsed ? "close-tit" : "collapsed-tit"];
//     },
//     breadCrumbList() {
//       return this.$store.state.app.breadCrumbList;
//     },
//     activeName() {
//       if (this.$route.meta.hideInMenu) {
//         let parentRoute = this.$route.matched[this.$route.matched.length - 2];
//         return parentRoute.meta.defaultChild;
//       }
//       return this.$route.name;
//     },
//     getLeadChart() {
//       return permission.hasPermission('workbench_lead_chart')
//     }
//   },
//   methods: {
//     ...mapMutations([
//       "setBreadCrumb",
//       "setTagNavList",
//       "addTag",
//       "setHomeRoute",
//       "closeTag",
//       "removeRouterCacheList"
//     ]),
//     ...mapActions(["handleLogin", "getUnreadMessageCount"]),
//     async reload() {
//       await this.$store.dispatch('system/code/refreshCode')
//       await this.$store.dispatch('system/user/refreshCache')
//       window.location.reload()
//     },
//     turnToPage(route) {
//       let { name, params, query } = {};

//       if (typeof route === "string") {
//         name = route;
//         // this.$store.commit('removeRouterCacheItem', name);
//       } else {
//         name = route.name;
//         params = route.params;
//         query = route.query;
//       }
//       //判断tagList中是否已存在
//       this.$nextTick(() => {
//         if (name.indexOf("isTurnByHref_") > -1) {
//           window.open(name.split("_")[1]);
//           return;
//         }
//         this.$router.push({
//           name,
//           params,
//           query
//         });
//       })
//     },
//     handleCollapsedChange(state) {
//       this.collapsed = state;
//     },
//     handleCloseTag(res, type, route) {
//       if (type !== "others") {
//         if (type === "all") {
//           this.turnToPage(this.$config.homeName);
//         } else {
//           let currentTabRoute = menuRouterHelper.getMenuRoute(this.$route);
//           if (menuRouterHelper.routeEqual(currentTabRoute, route)) {
//             this.closeTag(route);
//           }
//         }
//       }
//       this.setTagNavList(res);
//     },
//     handleClick(item) {
//       if (item.history) {
//         this.turnToPage(item.history[item.history.length - 1]);
//       } else {
//         this.turnToPage(item);
//       }
//     },
//     changepwd() {
//       this.$refs["change-pwd"].open();
//     },
//     async getAppVersion() {
//       this.appInfo = await this.$store.dispatch('appVersion')
//     },
//     menuImg(url) {
//       return require(`@/assets/images/workbrench-chart/${url}.png`);
//     },
//     toPage(item) {
//       this.activeRoute = item
//       this.$router.push({ path: item })
//     }
//   },
//   watch: {
//     // 获取正文的高度（）
//     windowHeight: {
//       handler(val, oldVal) {
//         this.windowHeight = val;
//         this.$store.commit("setMainScreenHeight", this.windowHeight - 160 - 24); // 高度保存至vux
//       },
//       deep: true
//     },
//     $route(newRoute) {
//       this.$websocket.open();

//       this.addTag({
//         route: newRoute,
//         type: "push"
//       });
//       this.setBreadCrumb(newRoute);
//       this.$refs.sideMenu.updateOpenName(newRoute.name);
//     }
//   },
//   mounted() {
//     this.$websocket.open();
//     // 监视屏幕变化
//     const that = this;
//     window.onresize = () => {
//       return (() => {
//         window.screenHeight = document.body.clientHeight;
//         that.windowHeight = window.screenHeight;
//       })();
//     };

//     /**
//      * @description 初始化设置面包屑导航和标签导航
//      */
//     this.setTagNavList();
//     this.setHomeRoute();
//     this.addTag({
//       route: this.$route
//     });
//     this.setBreadCrumb(this.$route);
//     this.getAppVersion()
//   },
//   destroy() {
//     this.$websocket.close();
//   }
// };
</script>
<style scoped lang="less">
.logo-layout /deep/ .arco-layout-sider-children {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    width: 120px;
    text-align: center;
    font-size: @font-size-title-2;
    color: #fff;
    font-weight: @font-weight-700;
  }
}

.right-sider /deep/ .arco-layout-sider-children {
  display: flex;
  align-items: center;
  color: #fff;
}

.logo {
  width: 28px
}
</style>
