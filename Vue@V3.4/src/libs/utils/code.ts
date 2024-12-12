import $http from '../http'

const codeMap = new Map()

async function loadCodes(keys: string[] | string) {
  if (typeof keys === 'string') {
    keys = [keys]
  }
  if (Array.isArray(keys) && keys.length > 0) {
    let newKeys: string[] | string = keys.filter((el) => !codeMap.has(el))
    if (newKeys && newKeys.length > 0) {
      let codeList = (await $http.post('admin-api/sys/code/group/keys', newKeys)) || []
      newKeys.forEach((groupKey) => {
        codeMap.set(
          groupKey,
          codeList.filter((item: any) => item.groupKey == groupKey)
        )
      })
    }
  }
}

const code = {
  clear() {
    codeMap.clear()
  },

  delete(groupKey: string) {
    codeMap.delete(groupKey)
  },

  async getCodeList(groupKey: string | string[]) {
    await loadCodes(groupKey)
    return codeMap.get(groupKey) || []
  },

  async getCodeInfo(groupKey: string, codeKey: string) {
    let codeList = await code.getCodeList(groupKey)
    if (Array.isArray(codeList) && codeList.length > 0) {
      codeList = codeList.filter((item) => item.codeKey == codeKey)
    }
    if (Array.isArray(codeList) && codeList.length > 0) {
      return codeList[0]
    }
    return null
  }
}

export default code
