const arrayHelper = {
  /**
   *循环array element
   *
   * @param {*} arr
   * @param {*} fn
   * @memberof ArrayHelper
   */
  forEach: (arr: any, fn: any) => {
    if (!arr.length || !fn) return
    let i = -1
    let len = arr.length
    while (++i < len) {
      let item = arr[i]
      fn(item, i, arr)
    }
  },

  /**
   *得到两个数组的交集, 两个数组的元素为数值或字符串
   * @param {*} arr1
   * @param {*} arr2
   * @return {*}
   * @memberof ArrayHelper
   */
  getIntersection: (arr1: any, arr2: any): any => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
      const item = arr2[i]
      if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
  },

  /**
   *得到两个数组的并集, 两个数组的元素为数值或字符串
   * @param {*} arr1
   * @param {*} arr2
   * @return {*}
   * @memberof ArrayHelper
   */
  getUnion: (arr1: any, arr2: any): any => {
    return Array.from(new Set([...arr1, ...arr2]))
  },

  /**
   *
   *判断要查询的数组是否至少有一个元素包含在目标数组中
   * @param {*} targetArr
   * @param {*} arr
   * @return {*}
   * @memberof ArrayHelper
   */
  hasOneOf: (targetArr: any, arr: any): any => {
    arr = arr || []
    return targetArr.some((_: any) => arr.indexOf(_) > -1)
  },

  /**
   *
   * @param {*} value
   * @param {*} validList
   * @return {*}
   * @memberof ArrayHelper
   */
  oneOf: (value: any, validList: any): any => {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  },

  /**
   *判断两个对象是否相等，这两个对象的值只能是数字或字符串
   *
   * @param {*} obj1
   * @param {*} obj2
   * @return {*}
   */
  objEqual: (obj1: any, obj2: any): any => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
    /* eslint-disable-next-line */ else return !keysArr1.some((key) => obj1[key] != obj2[key])
  }
}

export default arrayHelper
