/// <reference types="vite/client" />

// declare module '*.vue' {
//   // 引入vue模块中ts的方法
//   import type { DefineComponent } from 'vue'
//   // 定义vue组件以及类型注解
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }
export {}

export interface ParticlesJS {
  load: (arg: string, arg1: string, arg2: any) => void
}
declare global {
  interface Window {
    particlesJS: ParticlesJS
    webkitRequestAnimationFrame: any
    mozRequestAnimationFrame: any
    msRequestAnimationFrame: any
  }
  interface HTMLElement {
    attachEvent: any
    detachEvent: any
  }
}
