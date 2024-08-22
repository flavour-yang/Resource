interface Tree {
  dataType: string
  data: any
  parent: Tree
  id: string
  title: string
  children: Tree[]
  loading?: boolean
  expand?: boolean
  checked?: boolean
}
interface Options {
  idKey: string
  titleKey: string
  dataType: string
  loading: boolean
  parentKey: string
  expandFirstLevel: boolean
  expandFirstNode: boolean
  checkedFirstNode: boolean
}
const treeHelper = {
  toTreeItem: (parent: Tree, dataItem: any, options: Options) => {
    options = Object.assign({}, options)
    let idKey = options.idKey || 'id'
    let titleKey = options.titleKey || 'title'
    let treeItem: Tree = {
      dataType: options.dataType,
      data: dataItem,
      parent: parent,
      id: dataItem[idKey],
      title: dataItem[titleKey],
      children: []
    }
    if (options.loading !== null && options.loading !== undefined) {
      treeItem.loading = options.loading
    }
    return treeItem
  },
  toTreeItems: (parent: Tree, list: Tree[], options: Options) => {
    let treeItems: Tree[] = []
    list.forEach((dataItem) => {
      treeItems.push(treeHelper.toTreeItem(parent, dataItem, options))
    })
    return treeItems
  },
  /**
   * 将列表转化为树状结构
   * @param {*} targetArr
   * @param {*} options
   */
  toTreeList: (parent: Tree, list: Tree[], options: Options) => {
    options = Object.assign({}, options)
    let idKey = options.idKey || 'id'
    let parentKey = options.parentKey || 'parentId'
    let expandFirstLevel = options.expandFirstLevel || false
    let expandFirstNode = options.expandFirstNode || false
    let checkedFirstNode = options.checkedFirstNode || false

    const loadFunc = (parent: Tree, dataList: { [x: string]: any }[]) => {
      let treeItems: Tree[] = []
      dataList.forEach((dataItem: { [x: string]: any }) => {
        let treeItem = treeHelper.toTreeItem(parent, dataItem, options)
        let childItemList =
          list.filter((listItem: any) => listItem[parentKey] === dataItem[idKey]) || []
        loadFunc(treeItem, childItemList)
        treeItems.push(treeItem)
      })
      if (parent != null) {
        parent.children = treeItems
      }
      return treeItems
    }

    let result = loadFunc(
      parent,
      list.filter((el: any) => !el[parentKey])
    )
    if (result.length && expandFirstNode) {
      result[0].expand = true
    }
    if (result.length && expandFirstLevel) {
      result.forEach((el) => (el.expand = true))
    }
    if (result.length && checkedFirstNode) {
      result[0].checked = true
    }
    return result
  },
  copyTree: (treeData: any, predicate: (el: any) => void) => {
    const copyTreeItems = (parent: any, treeItems: any[]) => {
      let copiedTreeItems: any[] = []

      let filteredList = treeItems || []
      if (predicate != null) {
        filteredList = filteredList.filter(predicate)
      }

      filteredList.forEach((treeItem) => {
        let copiedTreeItem = {
          ...treeItem,
          parent: parent
        }

        copiedTreeItem.children = copyTreeItems(copiedTreeItem, treeItem.children || [])

        copiedTreeItems.push(copiedTreeItem)
      })

      return copiedTreeItems
    }

    return copyTreeItems(null, treeData)
  },
  searchTree: (treeData: Tree[], keyword: string) => {
    if ((keyword || '').length == 0) {
      return treeData
    }

    const flagMatchedTreeItems = (treeItems: any[]) => {
      treeItems.forEach((treeItem) => {
        if (treeItem.parent && treeItem.parent.matched) {
          treeItem.matched = true
        } else {
          treeItem.matched = false
          if (treeItem.title.indexOf(keyword) > -1) {
            treeItem.matched = true
            let parent = treeItem.parent
            while (parent != null) {
              parent.matched = true
              parent = parent.parent
            }
          }
        }
        flagMatchedTreeItems(treeItem.children || [])
      })
    }

    //flag matched tree items
    flagMatchedTreeItems(treeData || [])
    //filter and copy matched tree items
    return treeHelper.copyTree(treeData, (el: any) => el.matched == true)
  }
}

export default treeHelper
