import { Base } from 'cubes'
import { type IUserFormModel } from '../meta/i-user-form-model'
class UserFormModel extends Base<IUserFormModel, 'email'> implements IUserFormModel {
  userName!: string
  email!: string
  deserialize({ userName = '', email = '', ...rest }: Partial<IUserFormModel> = {}): void {
    super.deserialize(rest)
    this.userName = userName
    this.email = email
  }
}

export { UserFormModel }
