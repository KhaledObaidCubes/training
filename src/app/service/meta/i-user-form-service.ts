import type { ICubesInjectable } from 'cubes'
import type { IUserFormModel } from '@/app/domain/meta/i-user-form-model'
import type { TProxyResult } from '@/control'
import { DataController } from 'cubes-ui'
import { UserFormModel } from '@app/domain/def/user-form.model'

interface IUserFormService extends ICubesInjectable {
  getUser(): TProxyResult<IUserFormModel>
  createUser(): TProxyResult<IUserFormModel>
  entriesValidation(uName: string, uEmail: string): any
  rollBackDataController(): void
  dc: DataController<UserFormModel>
}

export type { IUserFormService }
