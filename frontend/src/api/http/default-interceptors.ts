import { BaseApiServiceInterceptors } from './http-client.service'

export const defaultInterceptors: BaseApiServiceInterceptors = {
  request: {
    onFulfilled: async (config) => {
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: new Date().valueOf() / 1000,
        }
      }
      if (config.headers) {
        config.headers.Authorization = `Bearer ${123}`
      }
      return config
    },
  },
  response: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFulfilled: async (response) => {
      if (response?.data?.code !== 200) {
        const msg = `${response?.data?.code}:${response?.data?.message}`

        // alert(msg);
        return Promise.reject(response)
      }
      return response
    },
    onRejection(error: {
      response: { status: number; data: { code: string; message: string } }
    }) {
      // 未登录不用提示，在路由级别拦截，由业务控制
      if (
        error.response &&
        ([401].indexOf(error.response.status) > -1 ||
          error.response.data.message === 'missing or malformed jwt')
      ) {
        // const msg = `Not Login`;
        // alert(msg);
      } else {
        const response = error?.response
        const msg = `${response?.data?.code}:${response?.data?.message}`
        // alert(`${msg}`);
      }
      return Promise.reject(error?.response)
    },
  },
}
