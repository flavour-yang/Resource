import axios from '@/libs/http/axios'

class HttpRequestCommon {
  /**
   * POST
   *
   * @param {*} api
   * @param {*} data
   * @return {*}
   * @memberof HttpRequestCommon
   */
  async post(api: string, data?: any) {
    let res = await axios.request({
      url: api,
      method: 'post',
      data
    })
    if (res.data) return res.data
    return res
  }

  /**
   * GET
   *
   * @param {*} api
   * @param {*} params
   * @return {*}
   * @memberof HttpRequestCommon
   */
  async get(api: string, params?: any, headers?: any) {
    let res = await axios.request({
      url: api,
      method: 'get',
      params,
      headers
    })
    if (res.data) return res.data
    return res
  }

  /**
   * DELETE
   *
   * @param {*} api
   * @param {*} params
   * @return {*}
   * @memberof HttpRequestCommon
   */
  async delete(api: string, params: any) {
    let res = await axios.request({
      url: api,
      method: 'delete',
      params
    })
    if (res.data) return res.data
    return res
  }
}

const $http = new HttpRequestCommon()
export default $http
