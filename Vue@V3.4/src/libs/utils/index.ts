import { useAppStore } from '@/stores/modules/app'

const appStore = useAppStore()
interface Page {
  pageIndex: number
  pageSize: number
}

export const retrieve = async (
  api: (param: any) => Promise<any>,
  data = { pageIndex: 1, pageSize: 5000 }
) => {
  const { pageIndex, pageSize, ...otherParams } = data
  let result = { current: pageIndex, size: pageSize, pages: 1, total: 0, records: [] }

  const fetchData = async (page: Page, data: any) => {
    const res = await api({ ...data, ...page }) // store.dispatch(api, { ...data, ...page })
    if (res && res.records && res.records.length > 0) {
      result.size = res.total
      result.total = res.total
      res.records.forEach((item: any) => result.records.push(item))
      if (res.current * res.size <= res.total) {
        page.pageIndex++
        await fetchData(page, data)
      }
    }
  }

  await fetchData({ pageIndex, pageSize }, otherParams)
  return result
}

export const hasPermission = (key: string) => {
  if (!key || key === '') return true
  //判断是否存在权限
  if (
    key === 'hidden' ||
    !appStore.userInfo.rightList.map((el: any) => el.rightKey).includes(key)
  ) {
    return false
  }
  return true
}
