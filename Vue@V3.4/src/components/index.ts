// import { camelCase, upperFirst } from "lodash"

// export default {
//   install(app) {
//     const componentFiles = import.meta.globEager(
//       './components/*.vue'
//     );

//     Object.entries(componentFiles).forEach(([path, m]) => {
//       // 截取名称：'../components/customButton/index.vue'  =>  'CustomButton'
//       const componentName = upperFirst(
//         camelCase(path.split('/').pop().replace(/.\w+$/, ''))
//       );
//       // 这里给个默认前缀
//       app.component(
//         `Base${componentName}`, m.default
//       );
//     })
//   },

import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
// 默认一个文件夹文件自动注册全局组件
export default {
  install(app: App) {
    // import.meta.glob是vite的api
    // import.meta.globEager新的vite版本已弃用
    const components = import.meta.glob('./*/index.vue')
    console.log({ components })
    // 遍历组件模块实现自动注册
    for (const [key, value] of Object.entries(components)) {
      // 拼接组件注册的 name
      const componentName = 'hy-' + key.replace('./', '').split('/')[0].toLocaleLowerCase()
      console.log(componentName)
      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(value))
    }
  }
}
