import { IoCLevelsEnum } from '../../../control'
import { Inject, Service } from 'cubes'
import { serviceMap } from '../../../service'
import type { TProxyResult } from '../../../control'
import { ICustomTableService } from '../meta/i-custom-table.service'
import { IDataModel } from '@/app/domain/meta/i-data-model'
import { ICustomTableRepository } from '@/app/repository/meta/i-custom-table.repo'
import { TRequestPayload } from 'cubes-ui/dist/types/lib/module/domain/meta/network'

@Service(IoCLevelsEnum.DEV_2, serviceMap.CustomTableService.key)
class CustomTableService implements ICustomTableService {
  public readonly id: string = serviceMap.CustomTableService.key
  @Inject() CustomTableRepository!: ICustomTableRepository

  getAsync(query: TRequestPayload<{}>['query']): TProxyResult<IDataModel> {
    return this.CustomTableRepository.getAsync(query)
  }
}

export default CustomTableService
