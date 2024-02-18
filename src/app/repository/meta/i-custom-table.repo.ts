import { IDataModel } from '@/app/domain/meta/i-data-model'
import type { TProxyResult } from '../../../control'
import { TRequestPayload } from 'cubes-ui/dist/types/lib/module/domain/meta/network'

interface ICustomTableRepository {
  getAsync(query: TRequestPayload<{}>['query']): TProxyResult<IDataModel>
}

export type { ICustomTableRepository }
