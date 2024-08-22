export default {
  /**
   * @description 管理端菜单rootId
   */
  rootId: import.meta.env.VITE_APP_ROOT_ID || 'c0623ac0-138d-4654-b31e-f2a0e5218be6',

  /**
   * @description Api地址
   */
  baseUrl: import.meta.env.VITE_APP_API_URL,

  /**
   * @description 路由模式
   */
  routerModel: 'history',

  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'workbench',

  /**
   * base path
   */
  basePath: import.meta.env.VITE_APP_BASE_PATH,

  /**
   * @description app title
   */
  appTitle: import.meta.env.VITE_APP_TITLE,
  /**
   * @description app abbreviation title
   */
  appTitleAbbr: import.meta.env.VITE_APP_TITLE_ABBR,

  /**
   * @description app code
   */
  appCode: import.meta.env.VITE_APP_CODE,

  /**
   * @description env code
   */
  envCode: import.meta.env.VITE_APP_ENV_CODE,
  /**
   * @description app type
   */
  appType: import.meta.env.VITE_APP_TYPE,
  /**
   * @description company name
   */
  companyName: import.meta.env.VITE_APP_COMPANY_NAME,

  /**
   * @description company address
   */
  companyAddress: import.meta.env.VITE_APP_COMPANY_ADDRESS,

  fileUrl: {
    template: {
      priceImport: import.meta.env.VITE_APP_FILEURL_TEMPLATE_PRICEIMPORT
    }
  }
}
