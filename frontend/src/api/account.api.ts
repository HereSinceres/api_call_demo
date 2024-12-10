import { inject } from 'react-ioc'

import { ProjectNameApiService } from './http/project-name-http-client-service'
import { paths } from './openapi.dto'

export class AccountApi {
  private httpClient = inject(this, ProjectNameApiService)
  async getUsers(params: paths['/users']['get']['parameters']) {
    const res = await this.httpClient.get<
      paths['/users']['get']['responses']['200']
    >(`/customers/info?rid`)
    return res.data.data
  }
}

type TGetUserResult = Awaited<
  Promise<PromiseLike<ReturnType<AccountApi['getUsers']>>>
>['data']['discounts']
