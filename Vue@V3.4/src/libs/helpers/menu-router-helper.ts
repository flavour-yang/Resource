import type { RouteComponent, RouteRecord } from 'vue-router'
import arrayHelper from './array-helper.js'
import storageHelper from './storage-helper'
import config from '@/config'
const viewsModules = import.meta.glob('@/views/**/*.vue')
const loadComponent = async (path: string) => {
  const module = await (viewsModules[path]() as Promise<{ default: any }>)
  return module.default
}
import { defineAsyncComponent, type Component } from 'vue'
// import store from '@/store';
/** @type {*} */
/** @type {*} */
/** @type {*} */
/** @type {*} */
/** @type {*} */

interface Meta {
  icon?: string
  hideInMenu?: boolean
  title?: string | ((arg0: RouteItem) => string)
  __titleIsFunction__?: boolean
  isHistoryBack?: boolean
  access?: string[]
}
interface Menu {
  icon: string
  meta: Meta
  name?: string
  children?: Menu[]
}
interface KeyValue {
  [key: string | number]: any
}
interface TagRoute {
  menuRoute?: TagRoute
  name?: string
  currentRoute?: TagRoute
  history?: TagRoute[]
}
interface RouteItem {
  name: string
  matched?: any[]
  meta?: Meta
  parent?: RouteItem
  fullPath: string
  hash: string
  params: KeyValue
  path: string
  query: KeyValue
  history: any[]
  menuRoute?: any
}
interface RightMenu extends Menu {
  component?: any
  rightKey?: string
  rightName?: string
  parentId?: string
  rightType?: number
  children?: RightMenu[]
  path?: string
  id?: string
}
const menuRouterHelper: any = {
  /**
   * 判断是否存在叶子节点
   *
   * @param {*} item
   */
  hasChild: (item: any) => {
    return item.children && item.children.length !== 0
  },

  /**
   *通过权限判断菜单是否显示
   *
   * @param {*} item
   * @param {*} access
   * @memberof MenuRouterHelper
   */
  showThisMenuEle: (item: any, access: any) => {
    if (item.meta && item.meta.access && item.meta.access.length) {
      if (arrayHelper.hasOneOf(item.meta.access, access)) return true
      else return false
    } else return true
  },

  /**
   *通过路由列表得到菜单列表
   *
   * @param {*} list
   * @param {*} access
   * @memberof MenuRouterHelper
   */
  getMenuByRouter: (list: any, access: any) => {
    let res: RouteComponent[] = []
    arrayHelper.forEach(list, (item: any) => {
      if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
        let obj = {
          icon: (item.meta && item.meta.icon) || '',
          name: item.name,
          meta: item.meta,
          children: [],
          href: ''
        }
        if (menuRouterHelper.hasChild(item) && menuRouterHelper.showThisMenuEle(item, access)) {
          obj.children = menuRouterHelper.getMenuByRouter(item.children, access)
        }
        if (!(item.children && item.children.length && !obj.children.length)) {
          if (menuRouterHelper.showThisMenuEle(item, access)) res.push(obj)
        }
      }
    })
    return res
  },

  /**
   *获取Tab页上的父级菜单路由
   *
   * @param {*} route
   * @memberof MenuRouterHelper
   */
  getMenuRoute: (route: RouteItem) => {
    if (route.matched) {
      const getParentRoute = (parent: RouteItem, child: RouteItem): RouteItem => {
        if (parent.meta && !parent.meta.hideInMenu) {
          return parent
        } else {
          if (parent.parent) {
            return getParentRoute(parent.parent, child)
          } else {
            return child
          }
        }
      }

      let currentRoute = route.matched[route.matched.length - 1]
      return getParentRoute(currentRoute, route)
    } else {
      return route
    }
  },

  loadOpenNodes(menuList: Menu[], activeName: string) {
    let result: Menu[] = []
    const loadAllNode = (list: Menu[]) => {
      list = list || []
      list.forEach((el: Menu) => {
        if (el.name == activeName) {
          result.push({
            icon: (el.meta && el.meta.icon) || '',
            name: el.name,
            meta: el.meta
          })
        }
        if (el.children && el.children.length > 0) {
          loadAllNode(el.children)
          if (
            result.some(
              (elItem) => el.children && el.children.some((cItem) => elItem.name == cItem.name)
            )
          ) {
            result.push({
              icon: (el.meta && el.meta.icon) || '',
              name: el.name,
              meta: el.meta
            })
          }
        }
      })
    }
    loadAllNode(menuList)
    return result
  },

  getOpenNames(route: RouteItem, menuList: Menu[], activeName: string) {
    let routeMetched = route.matched
    let headerNode = routeMetched && routeMetched[0]
    let item = menuList.find((el: Menu) => el.name == headerNode.name)
    let result = menuRouterHelper.loadOpenNodes([item], activeName)
    return result.map((item: Menu) => item.name).filter((item: string) => item !== activeName)
  },

  /**
   *当前路由metched
   *
   * @param {*} route
   * @param {*} homeRoute
   * @memberof MenuRouterHelper
   */
  getBreadCrumbList: (route: any, menuList: Menu[], homeRoute: any) => {
    let homeItem = { ...homeRoute, icon: homeRoute && homeRoute.meta ? homeRoute.meta.icon : '' }
    let routeMetched = route.matched
    // if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem];

    // let result = [];
    let headerNode = routeMetched[0]
    let leafNode = routeMetched[routeMetched.length - 1]
    let item = menuList.find((el) => el.name == headerNode.name)

    let result = menuRouterHelper.loadOpenNodes([item], leafNode.name)

    // let res = routeMetched.filter(item => {
    //   return item.meta === undefined || !item.meta.hideInBread
    // }).map(item => {
    //   let meta = { ...item.meta }
    //   if (meta.title && typeof meta.title === 'function') {
    //     meta.__titleIsFunction__ = true
    //     meta.title = meta.title(route)
    //   }
    //   let obj = {
    //     icon: (item.meta && item.meta.icon) || '',
    //     name: item.name,
    //     meta: meta
    //   }
    //   return obj
    // })
    // res = res.filter(item => {
    //     return !item.meta.hideInMenu
    // })
    // return [{ ...homeItem, to: homeRoute.path }, ...res]
    return [...result.reverse()]
  },

  getRouteTitleHandled: (route: RouteItem) => {
    let router = { ...route }
    let meta = { ...route.meta }
    let title = ''
    if (meta.title) {
      if (typeof meta.title === 'function') {
        meta.__titleIsFunction__ = true
        title = meta.title(router)
      } else title = meta.title
    }
    meta.title = title
    router.meta = meta || ''
    return router
  },

  showTitle: (item: RouteItem, vm: any) => {
    let { title } = item.meta || {}
    if (!title) return
    return (item.meta && item.meta.title) || item.name
  },

  /**
   *本地存储和获取标签导航列表
   *
   * @param {*} list
   */
  setTagNavListInLocalstorage: (list: any) => {
    storageHelper.localSave('tagList', JSON.stringify(list))
  },

  /**
   *其中的每个元素只包含路由原信息中的name, path, meta三项
   *
   * @return {*}
   */
  getTagNavListFromLocalstorage: (): any => {
    const list = storageHelper.localRead('tagList')
    if (typeof list === 'string') {
      return list ? JSON.parse(list) : []
    }
    return list ? list : []
  },

  //本地存储缓存路由
  setRouterCacheList: (list: string[] | number[]) => {
    storageHelper.localSave('routerCacheList', list.join(','))
  },

  getRouterCacheList: () => {
    const content = storageHelper.localRead('routerCacheList')
    if (typeof content === 'string') {
      return content ? content.split(',') : []
    }
    return content ? content : []
  },

  getHomeRoute: (routers: Menu[]) => {
    let i = -1
    let len = routers.length
    let homeRoute = {}
    while (++i < len) {
      let item = routers[i]
      // if (item instanceof TabRoute) {
      // item = item.menuRoute;
      // }
      if (item.children && item.children.length) {
        let res = menuRouterHelper.getHomeRoute(item.children)
        if (res.name) return res
      } else {
        if (item.name === config.homeName) homeRoute = item
      }
    }
    return homeRoute
  },

  /**
   *如果该newRoute已经存在则不再添加
   *
   * @param {*} list 现有标签导航列表
   * @param {*} tabRoute 新添加的路由原信息对象
   * @return {*}
   */
  getNewTagList: (list: any, tabRoute: any): any => {
    let newRoute = menuRouterHelper.copyRoute(tabRoute)
    let newList = [...list]
    let index = newList.findIndex((item) => item.name === newRoute.name)
    if (index >= 0) {
      return newList
    } else newList.push(newRoute)
    return newList
  },

  /**
   *判断是否有权限
   *
   * @param {*} route
   * @return {*}
   */
  hasAccess: (route: any): any => {
    // if (route.meta && route.meta.access) {
    //   let permissions = store.getters["current/permissions"] || [];
    //   return route.meta.access.every(el => { return permissions.includes(el) });
    // }
    // else return true
  },

  /**
   *用户是否可跳转到该页
   *
   * @param {*} name 即将跳转的路由name
   * @param {*} routes 路由列表
   * @memberof MenuRouterHelper
   */
  canTurnTo: (name: any, routes: any) => {
    const routePermissionJudge = (list: Menu[]): boolean => {
      return list.some((item: Menu) => {
        if (item.children && item.children.length) {
          return routePermissionJudge(item.children)
        } else if (item.name === name) {
          return menuRouterHelper.hasAccess(item)
        }
      })
    }

    return routePermissionJudge(routes)
  },

  /**
   *用户是否可跳转到该页
   *
   * @param {*} route 即将跳转的路由
   * @return {*}
   */
  canDirectlyTurnTo: (route: any): any => {
    return menuRouterHelper.hasAccess(route)
  },

  /**
   *从URL中解析参数
   *
   * @param {*} url
   * @return {*}
   * @memberof MenuRouterHelper
   */
  getParams: (url: any): any => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj: KeyValue = {}
    keyValueArr.forEach((item: KeyValue) => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
  },

  /**
   *基于当前路由创建一个新的TabRoute对象
   *
   * @param {*} route
   * @return {*}
   * @memberof MenuRouterHelper
   */
  createNewTabRoute: (route: any): any => {
    let tagRoute: TagRoute = {}
    let menuRoute = menuRouterHelper.getMenuRoute(route)
    let copyRoute = menuRouterHelper.copyRoute(menuRoute)
    tagRoute.menuRoute = copyRoute
    tagRoute.name =
      menuRoute.meta && menuRoute.meta.defaultChild ? menuRoute.meta.defaultChild : menuRoute.name
    tagRoute.currentRoute = copyRoute
    if (!tagRoute.history) {
      tagRoute.history = []
    }
    tagRoute.history.push(menuRouterHelper.copyRoute(route))
    return tagRoute
  },

  /**
   *
   *
   * @param {*} list 标签列表
   * @param {*} route 当前关闭的标签的name
   * @memberof MenuRouterHelper
   */
  getNextRoute: (list: any, route: any) => {
    let res = {}
    if (list.length <= 2) {
      res = menuRouterHelper.getHomeRoute(list)
    } else {
      const index = list.findIndex((item: TagRoute) =>
        menuRouterHelper.routeEqual(item.menuRoute, route)
      )
      if (index === list.length - 1) res = list[list.length - 2]
      else res = list[index + 1]
    }
    return res
  },

  /**
   *复制路由
   *
   * @param {*} route
   * @memberof MenuRouterHelper
   */
  copyRoute: (route: any) => {
    let { matched } = route
    const { fullPath, hash, meta, name, params, path, query } = route

    if (matched && matched.length > 0) {
      let copyMatched: RouteItem[] = []
      arrayHelper.forEach(matched, (item: RouteItem) => {
        let { fullPath, hash, meta, name, params, path, query } = item
        const history: any[] = []
        copyMatched.push({ fullPath, hash, meta, name, params, path, query, history })
      })
      matched = copyMatched
    }
    return { fullPath, hash, matched, meta, name, params, path, query }
  },

  routeEqual: (route1: RouteItem, route2: RouteItem) => {
    const params1 = route1.params || {}
    const params2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return (
      route1.name === route2.name &&
      arrayHelper.objEqual(params1, params2) &&
      arrayHelper.objEqual(query1, query2)
    )
  },

  routeHasExist: (tagNavList: any[], routeItem: RouteItem) => {
    let len = tagNavList.length
    let res = false
    let _this = this || menuRouterHelper
    _this.doCustomTimes(len, (index: number) => {
      if (menuRouterHelper.routeEqual(tagNavList[index], routeItem)) res = true
    })
    return res
  },

  /**
   *获取naveTabList中的TabRoute
   *
   * @param {*} tagNaveList
   * @param {*} route
   * @memberof MenuRouterHelper
   */
  getNavTabRoute: (tagNaveList: any, route: any) => {
    let menuRoute = menuRouterHelper.getMenuRoute(route)
    let tabRouteList = tagNaveList.filter((item: RouteItem) => item.name === menuRoute.name)
    if (tabRouteList && tabRouteList.length > 0) {
      return tabRouteList[0]
    }

    return null
  },

  getHistory: (currentTabRoute: RouteItem, currentRoute: RouteItem) => {
    //如果是从历史堆栈中返回，则不再计入历史堆栈中。
    if (currentTabRoute.history) {
      if (!currentRoute.meta || !currentRoute.meta.isHistoryBack) {
        let newCurrentRoute = menuRouterHelper.copyRoute(currentRoute)
        const lastHistoryIndex = currentTabRoute.history.length - 1
        if (lastHistoryIndex >= 0) {
          let lastRoute = currentTabRoute.history[lastHistoryIndex]
          //如果堆栈中最后一个路由与当前路由不一致，则入栈。
          if (!menuRouterHelper.routeEqual(lastRoute, newCurrentRoute)) {
            currentTabRoute.history.push(newCurrentRoute)
            return [...currentTabRoute.history]
          }
        } else {
          return [newCurrentRoute]
        }
      }
      return [...currentTabRoute.history]
    }
  },

  historyPush: (tagNaveList: RouteItem[], currentRoute: RouteItem) => {
    //如果是从历史堆栈中返回，则不再计入历史堆栈中。
    if (!currentRoute.meta || !currentRoute.meta.isHistoryBack) {
      let _this = this || menuRouterHelper
      let currentTagRoute = _this.getMenuRoute(currentRoute)
      const index = tagNaveList.findIndex((item: RouteItem) =>
        menuRouterHelper.routeEqual(item.menuRoute, currentRoute)
      )
      //找到对应菜单Tab页的路由记录，若无此菜单，则不做历史入栈（因为在此之前系统会添加到tagNaveList中去。
      if (index >= 0) {
        const lastHistoryIndex = tagNaveList[index].history.length - 1
        if (lastHistoryIndex >= 0) {
          let lastRoute = tagNaveList[index].history[lastHistoryIndex]
          //如果堆栈中最后一个路由与当前路由不一致，则入栈。
          if (!menuRouterHelper.routeEqual(lastRoute, currentRoute)) {
            tagNaveList[index].history.push(currentRoute)
          }
        } else {
          tagNaveList[index].history.push(currentRoute)
        }
      }
    }
  },

  historyBack: (tagNaveList: RouteItem[], currentRoute: RouteItem) => {
    let currentTagRoute = menuRouterHelper.getMenuRoute(currentRoute)
    const index = tagNaveList.findIndex((item) =>
      menuRouterHelper.routeEqual(item.menuRoute, currentTagRoute)
    )
    //找到对应菜单Tab页的路由记录，若无此菜单，则不做任何处理（因为在此之前系统会添加到tagNaveList中去。
    if (index >= 0) {
      let lastHistoryIndex = tagNaveList[index].history.length - 1

      if (lastHistoryIndex >= 0) {
        let backRoute = tagNaveList[index].history[lastHistoryIndex]
        // let backRoute = tagNaveList[index].history.pop();
        //如果堆栈中最后一个路由与当前路由一致，则弹出，并返回倒数第二个路由。
        if (menuRouterHelper.routeEqual(backRoute, currentRoute)) {
          tagNaveList[index].history.pop()
          lastHistoryIndex = tagNaveList[index].history.length - 1
          if (lastHistoryIndex >= 0) {
            backRoute = tagNaveList[index].history[tagNaveList[index].history.length - 1]
          } else {
            //if get root already, then return false.
            return false
          }
        }
        // backRoute.meta = Object.assign(backRoute.meta||{},{isHistoryBack:true});
        return backRoute
      } else {
        //若历史堆栈中已无历史路由，则不做任何操作。
        console.log('No backward route in history stack')
        return false
      }
    }
    return false
  },

  getMenuList: (allRightList: RightMenu[]) => {
    const loadTreeData = (dataList: RightMenu[]) => {
      let itemResult: RightMenu[] = []
      dataList.forEach(async (el) => {
        if (el.rightType == 4) {
          return
        }
        let item: RightMenu = {
          path: `/${el.component || el.rightKey}`,
          icon: el.icon,
          name: el.rightKey,
          meta: { title: el.rightName, icon: el.icon, access: [el.rightKey || ''] }
        }
        let children = allRightList.filter((elItem) => elItem.parentId === el.id)
        if (el.rightType == 2 && children && children.length > 0) {
          item.children = loadTreeData(children)
          // @ts-ignore
          item.component = () => import('@/layout/Main')
          itemResult.push(item)
        } else if (el.rightType == 3 && el.component) {
          try {
            console.log(item)
            for (const key in viewsModules) {
              const url = `/src/views/${el.component.replace('@/views/', '').replace('.vue', '')}/index.vue`
              // viewsModules
              item.component = loadComponent(url)
              // if (key.includes('testImport')) {
              //   // @ts-ignore
              //   item.component = defineAsyncComponent(
              //     viewsModules['/src/views/testImport/index.vue']
              //   )
              // }
            }
            // item.component = require(
            //   '@/view/' + el.component.replace('@/view/', '').replace('.vue', '') + '/index.vue'
            // ).default
          } catch (e) {
            console.error(e)
          }
          itemResult.push(item)
        }
      })
      return itemResult
    }

    let result = allRightList.filter((el) => el.parentId == config.rootId)
    return loadTreeData(result)
  }
}

export default menuRouterHelper
