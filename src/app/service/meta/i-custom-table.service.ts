import { TRequestPayload } from 'cubes-ui/dist/types/lib/module/domain/meta/network'
import type { TProxyResult } from '../../../control'
import { IDataModel } from '@/app/domain/meta/i-data-model'

interface ICustomTableService {
  getAsync(query: TRequestPayload<{}>['query']): TProxyResult<IDataModel>
}

export type { ICustomTableService }
