import { BaseApiService } from './http-client.service'

export class ProjectNameApiService extends BaseApiService {
  constructor() {
    super(process.env.REACT_APP_API_PREFIX as string)
  }
}
