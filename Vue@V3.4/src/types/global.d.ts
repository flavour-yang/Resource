declare global {
  // 组件ref
  interface TeRef {
    query?: () => void | null
    filters?: (data: any) => void | null
  }
}

// 正常工作。
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $config: any
  }
}
