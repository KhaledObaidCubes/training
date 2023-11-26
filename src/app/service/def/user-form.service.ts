import type { IUserFormModel } from '@/app/domain/meta/i-user-form-model'
import type { IUserFormService } from '../meta/i-user-form-service'
import { serviceMap } from '@/service'
import { Inject, Service, regularExpressions } from 'cubes'
import { DataController, ValidationStateEnum } from 'cubes-ui'
import { IoCLevelsEnum, TProxyResult } from '@/control'
import { IUserFormRepository } from '@/app/repository/meta/i-user-form-repository'
import { UserFormModel } from '@/app/domain/def/user-form.model'

@Service(IoCLevelsEnum.DEV_2, serviceMap.UserFormService.key)
class UserFormService implements IUserFormService {
  public readonly id: string = serviceMap.UserFormService.key
  @Inject() UserFormRepository!: IUserFormRepository
  public dc = new DataController(UserFormModel, { userName: 'set from service', email: 'set@from.service' })

  getUser(): TProxyResult<IUserFormModel> {
    console.log('hello from service!')
    // return mockPromise_200(500, { data: 'hello from service!' }) as any
    return this.UserFormRepository.listUsers({ limit: 5, offset: 0 })
  }
  createUser(): TProxyResult<IUserFormModel> {
    throw new Error('Method not implemented.')
  }
  entriesValidation(): any {
    let isValid = true

    let userNameValid = this.dc.model.userName.length > 0
    isValid = userNameValid && isValid
    let userSatus = userNameValid ? ValidationStateEnum.valid : ValidationStateEnum.invalid
    let emailValid = regularExpressions.email.test(this.dc.model.email)

    isValid = emailValid && isValid
    let emailStatus = emailValid ? ValidationStateEnum.valid : ValidationStateEnum.invalid
    if (isValid) {
      this.dc.commit()
      emailStatus = ValidationStateEnum.unset
      userSatus = ValidationStateEnum.unset
    }
    return { dataController: this.dc, userSatus: userSatus, emailStatus: emailStatus, isValid: isValid }
  }
  rollBackDataController(): void {
    this.dc.rollback()
  }
  dispose(): void {
    throw new Error('Method not implemented.')
  }
}

export default UserFormService
