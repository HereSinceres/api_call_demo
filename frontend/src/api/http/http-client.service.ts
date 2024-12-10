/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @create date 2022-08-25 17:13
 * @modify date 2022-08-25 17:13
 * @desc 基础api服务，所有的api 都应该继承 当前服务
 */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import { defaultInterceptors } from './default-interceptors'

export type ApiServiceResponse<T = any> = AxiosResponse<T>
export type ApiServiceRequestConfig = AxiosRequestConfig
export type ApiServiceError<T = any> = AxiosError<T>

export function isApiServiceError(e: any): e is ApiServiceError {
  return e.isAxiosError
}

export interface BaseApiServiceInterceptorsPare<V> {
  onFulfilled?: (value: V) => V | Promise<V>
  onRejection?: (error: any) => any
}

export interface BaseApiServiceInterceptors {
  request?: BaseApiServiceInterceptorsPare<ApiServiceRequestConfig>
  response?: BaseApiServiceInterceptorsPare<ApiServiceResponse>
}

export class BaseApiService {
  private axios: AxiosInstance

  constructor(
    serviceBaseUrl: string,
    interceptors?: BaseApiServiceInterceptors
  ) {
    this.axios = axios.create({
      baseURL: serviceBaseUrl,
    })
    if (!interceptors) {
      interceptors = defaultInterceptors
    }

    if (interceptors) {
      if (interceptors.request) {
        this.axios.interceptors.request.use(
          interceptors.request.onFulfilled,
          interceptors.request.onRejection
        )
      }

      if (interceptors.response) {
        this.axios.interceptors.response.use(
          interceptors.response.onFulfilled,
          interceptors.response.onRejection
        )
      }
    }
  }

  get<T, R = ApiServiceResponse<T>>(
    url: string,
    config?: ApiServiceRequestConfig
  ): Promise<R> {
    return this.axios.get<T, R>(url, config)
  }

  delete<T, R = ApiServiceResponse<T>>(
    url: string,
    config?: ApiServiceRequestConfig
  ): Promise<R> {
    return this.axios.delete<T, R>(url, config)
  }

  head<T, R = ApiServiceResponse<T>>(
    url: string,
    config?: ApiServiceRequestConfig
  ): Promise<R> {
    return this.axios.head<T, R>(url, config)
  }

  options<T, R = ApiServiceResponse<T>>(
    url: string,
    config?: ApiServiceRequestConfig
  ): Promise<R> {
    return this.axios.options<T, R>(url, config)
  }

  post<T, R = ApiServiceResponse<T>>(
    url: string,
    data?: unknown,
    config?: ApiServiceRequestConfig
  ): Promise<R> {
    return this.axios.post<T, R>(url, data, {
      ...config,
      headers: {
        ...config?.headers,
      },
    })
  }

  put<T, R = ApiServiceResponse<T>>(
    url: string,
    data?: unknown,
    config?: ApiServiceRequestConfig
  ): Promise<R> {
    return this.axios.put<T, R>(url, data, config)
  }

  patch<T, R = ApiServiceResponse<T>>(
    url: string,
    data?: unknown,
    config?: ApiServiceRequestConfig
  ): Promise<R> {
    return this.axios.patch<T, R>(url, data, config)
  }
}
