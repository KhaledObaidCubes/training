import { INetworkManager, TProxyResult, TQuery } from 'cubes-ui'
import { Inject, Service, TUID } from 'cubes'
import { serviceMap, repositoryMap } from '../../../service'
import { IoCLevelsEnum } from '@/control'
import { IUserFormRepository } from '../meta/i-user-form-repository'
import { TUserFormModelProxy } from '../proxy/user-model.proxy'

@Service(IoCLevelsEnum.DEV_2, repositoryMap.UserFormRepository.key)
class UserFormRepository implements IUserFormRepository {
  public readonly id: TUID = repositoryMap.UserFormRepository.key
  @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<TUserFormModelProxy>
  listUsers(query: TQuery): TProxyResult<any> {
    console.log('hello from Repository!')
    return this.networkManager.clients.userFormModel.api.retrieveUser({ query, cachedPropertiesPaths: ['query.limit', 'query.offset'] })
  }

  dispose(): void {}
}

export { UserFormRepository }
