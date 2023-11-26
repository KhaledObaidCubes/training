import { IRepository, TProxyResult, TQuery } from 'cubes-ui'
import { TUserFormModelProxy } from '../proxy/user-model.proxy'

interface IUserFormRepository extends IRepository<TUserFormModelProxy> {
  listUsers(query: TQuery): TProxyResult<any>
}

export type { IUserFormRepository }
