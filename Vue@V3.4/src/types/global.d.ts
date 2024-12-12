export type RenderFunction = () => VNodeChild

declare global {
  // 组件ref
  interface TeRef {
    query?: () => void | null
    filters?: (data: any) => void | null
  }
  interface RadioOption {
    label?: RenderFunction
    value: string | number
    disabled?: boolean
  }
  // interface Test {
  //   uuid: string
  // }
}

// 正常工作。
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $config: any
  }
}
