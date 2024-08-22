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
    return res.data
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
    return res.data
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
    return res.data
  }
}

const $http = new HttpRequestCommon()
export default $http
