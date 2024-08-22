import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { Message } from '@arco-design/web-vue'
import $config from '@/config'
import storageHelper from '@/libs/helpers/storage-helper'
import router from '@/router'

class HttpRequest {
  [x: string]: any
  constructor() {
    this.queue = {}
  }
  getInsideConfig(options: AxiosRequestConfig<any>) {
    const config = {
      baseURL: this.baseUrl
      // withCredentials: true,
    } as { baseURL: string; headers?: { [key: string]: any } }
    let token = storageHelper.localRead('token')
    if (token) {
      if (options.url && options.url.includes('admin-api/public/login')) {
        config.headers = { APP_TYPE: $config.appType }
      } else {
        config.headers = { token, APP_TYPE: $config.appType }
      }
    }
    return config
  }

  destroy(url: string) {
    delete this.queue[url]
  }
  interceptors(instance: AxiosInstance, url: string = '') {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        this.queue[url] = true
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        this.destroy(url)
        let dataCode = res.data.code
        if (['201', '500', '501', '502', '506', '530', '700'].includes(dataCode)) {
          Message.error(res.data.msg)
          return Promise.reject(res.data.msg)
        } else if (['701', '702', '703'].includes(dataCode)) {
          // store.commit('current/clearUserInfo')
          storageHelper.localRemove('token')
          router.replace('/login')
          // location.reload()
        }
        if (dataCode && dataCode != '200') {
          let errorMessage = res.data.msg
          let duration = 10 // 提示时间
          if (dataCode == '502') {
            errorMessage = `参数错误：`

            let validateError = res.data.data.map((el: { errorMessage: any }) => {
              duration += 3
              return el.errorMessage
            })
            errorMessage = `参数错误：${validateError.join('；')}`
          }
          Message.error({ content: errorMessage, duration, closable: true })
          return Promise.reject(errorMessage)
        }
        const fileTypes = [
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/zip'
        ]
        if (fileTypes.includes(res.data.type)) {
          let filenameStr = res.request.getResponseHeader('Content-Disposition').split(';')[1]
          let filename = decodeURIComponent(
            filenameStr.trim().split("utf-8''")[1] || filenameStr.trim().split('=')[1]
          )
          if (res.data) {
            res.data.filename = filename
          }
        }
        return res.data
      },
      async (error) => {
        // this.destroy(url)
        console.log(error)
        if (error) {
          let errorInfo = error.response || { message: '页面请求异常！' }
          if (errorInfo.status == 401 || errorInfo.status == 402) {
            storageHelper.localRemove('token')
            // store.commit('current/clearUserInfo')
            location.reload()
          }

          let errorData = errorInfo.data

          if (errorInfo.config && errorInfo.config.responseType == 'blob') {
            let result = await fileReaderFunc(errorInfo.data)
            if (result) {
              errorData = result
            }
          }
          // 添加全局错误信息
          if (errorData) {
            if (errorData.msg) {
              Message.error({ content: errorData.msg, duration: 10, closable: true })
            } else {
              Message.error('系统请求异常！')
            }
          }
        }

        return error
      }
    )
  }
  request(options: AxiosRequestConfig<any>) {
    this.baseUrl = $config.baseUrl
    const instance = axios.create()
    if (options.headers) {
      let cfg = this.getInsideConfig(options).headers
      if (!options.headers.token || options.headers.token.length == 0) {
        cfg && delete cfg.token
        delete options.headers.token
      }
      options.headers = Object.assign(options.headers, cfg)
      options.baseURL = this.baseUrl
    } else {
      if (Object.keys(options).includes('headers')) {
        delete options.headers
      }
      options = Object.assign(this.getInsideConfig(options), options)
    }

    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const fileReaderFunc = (data: Blob) => {
  return new Promise(function (resolve, reject) {
    const fileReader: FileReader = new FileReader()
    fileReader.onload = () => {
      try {
        if (fileReader && fileReader.result) {
          // @ts-ignore
          let jsonData = JSON.parse(fileReader.result) // 说明是普通对象数据，后台转换失败
          resolve(jsonData)
        }
      } catch (err) {
        // 解析成对象失败，说明是正常的文件流
        resolve(null)
      }
    }
    fileReader.readAsText(data)
  })
}

const httpRequest = new HttpRequest()
export default httpRequest
