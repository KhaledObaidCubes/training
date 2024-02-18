import { Inject, Service, TUID } from 'cubes'
import { IoCLevelsEnum } from '../../../control'
import { repositoryMap, serviceMap } from '../../../service'
import { INetworkManager, TProxyResult } from 'cubes-ui'
import { IDataModel } from '@/app/domain/meta/i-data-model'
import { ICustomTableRepository } from '../meta/i-custom-table.repo'
import { CustomTableClient } from '../proxy/custom-table.proxy'
import { TRequestPayload } from 'cubes-ui/dist/types/lib/module/domain/meta/network'

@Service(IoCLevelsEnum.DEV_2, repositoryMap.CustomTableRepository.key)
class CustomTableRepository implements ICustomTableRepository {
  @Inject(serviceMap.NetworkManager.key) networkManager!: INetworkManager<CustomTableClient>
  public readonly id: TUID = `${repositoryMap.CustomTableRepository.key}@Repository`
  getAsync(query: TRequestPayload<{}>['query']): TProxyResult<IDataModel> {
    return this.networkManager.clients.customTable.api.samaher({ query })
  }
}

export { CustomTableRepository }
