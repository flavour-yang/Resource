import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Schema from '@/views/schema/index.vue'
import SchemaTable from '@/views/table/index.vue'
import storageHelper from '@/libs/helpers/storage-helper'
import { useAppStore } from '@/stores/modules/app'
import { defineAsyncComponent } from 'vue'
const TestImport = import.meta.glob('@/views/testImport/index.vue')
console.log(TestImport)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/schema',
      name: 'schema',
      component: Schema
    },
    {
      path: '/table',
      name: 'table',
      component: SchemaTable
    }
  ]
})

router.addRoute({
  path: '/testImport',
  name: 'testImport',
  component: defineAsyncComponent(TestImport['/src/views/testImport/index.vue'] as any)
})
router.beforeEach((to, from, next) => {
  const token = storageHelper.localRead('token')

  if (!token) {
    // 未登录
    next()
  } else if (token) {
    useAppStore()
      .getUserInfo()
      .then(() => {
        useAppStore().menuList.forEach((f) => {
          router.addRoute(f)
          // 已登录
          setTimeout(() => {
            if (to.path === '/login') {
              next({ name: 'schema' })
            } else if (token && !to.name && to.path) {
              next({ path: to.path })
              // next()
            } else if (token && !to.name) {
              next({ name: 'testImport' })
            } else {
              next()
            }
          }, 20)
        })
      })
  }
})

export default router

// if(!token && to.name != LOGIN_PAGE_NAME){
//   // 未登录且要跳转的页面不是登录页
//   // 跳转到登录页
//   next({ name:LOGIN_PAGE_NAME })
// }else if(!token && to.name === LOGIN_PAGE_NAME){
//   // 未登陆且要跳转的页面是登录页
//   next();
// }else if(token && !to.name && to.path){
//   // 已登录刷新到原来页
//   initCurrentUser(to, (res) => {
//     if(res){
//       if(to.path === '/'){
//         next({name: config.homeName})
//       }else{
//         next({path: to.path})
//       }
//     }else{
//       unLogin(next)
//     }
//   });
// }else if(token && (!to.name || to.name === LOGIN_PAGE_NAME)){
//   // 已登录且要跳转的页面是登录页 跳转到homeName页
//   initCurrentUser(to, (res) => {
//     if(res){
//       next({name: config.homeName})
//     }else{
//       unLogin(next)
//     }
//   });
// }else{
//   // 正常页面跳转
//   initCurrentUser(to, () => { turnTo(to,next)});
//   versionTood.isNewVersion()
// }
