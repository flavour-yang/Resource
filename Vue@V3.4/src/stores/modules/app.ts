import $http from '@/libs/http'
import storageHelper from '@/libs/helpers/storage-helper'
import { defineStore } from 'pinia'
import menuRouterHelper from '@/libs/helpers/menu-router-helper'
import router from '@/router'
import { isValidKey } from '@/env.d'
import code from '@/libs/utils/code'
export interface UserInfo {
  [key: string]: string | number | boolean | any[] | string[]
}
export interface UserState {
  userInfo: UserInfo
  menuList: any[]
  app: object
  navTab: any[]
}

export const useAppStore = defineStore('app', {
  state: (): UserState => ({
    userInfo: {},
    menuList: [],
    app: {
      fontSize: 14,
      theme: 'dark',
      layout: 'top' // side | top| mix
    },
    navTab: []
  }),
  actions: {
    async login(payload: any) {
      let result = await $http.post('admin-api/public/login', payload)
      storageHelper.localSave('token', result)
      console.log('token:' + result)
    },
    async getUserInfo(payload?: { origin: string } | undefined) {
      let result = await $http.get('admin-api/sys/user/info', { includingCompanies: true })
      if (result && result.rightList.length) {
        this.userInfo = result || {}
        let menuList = menuRouterHelper.getMenuList((result && result.rightList) || [])
        // 更新用户角色菜单, websocket来源新增的菜单, 需要重新添加路由
        if (payload && payload.origin === 'websocket') {
          menuList.forEach((el: any) => router.addRoute(el))
        }
        this.menuList = menuList
        return true
      } else {
        return false
      }
    },
    async getCodeInfoList(payload: string | string[], hasData?: boolean) {
      let result = await code.getCodeList(payload)
      return result.map((el: any) => ({
        label: el.codeName,
        value: el.codeKey,
        ...(hasData ? { data: el } : {})
      }))
    },
    setState(state: UserState) {
      for (const key in state) {
        if (isValidKey(key, state)) {
          this[key] = state[key]
        }
      }
    }
  }
})
