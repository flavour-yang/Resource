import config from '@/config'
class StorageHelper {
  localSave(key: string, value: string) {
    localStorage.setItem(`${config.appType}_${config.appCode}_${config.envCode}_${key}`, value)
  }

  localRead(key: string) {
    return (
      localStorage.getItem(`${config.appType}_${config.appCode}_${config.envCode}_${key}`) || ''
    )
  }

  localRemove(key: string): unknown {
    return localStorage.removeItem(`${config.appType}_${config.appCode}_${config.envCode}_${key}`)
  }
}

const storageHelper = new StorageHelper()
export default storageHelper
