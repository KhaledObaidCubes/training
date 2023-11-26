import { UserFormModel } from '@/app/domain/def/user-form.model'
import { clientFactory, TEndPoint } from 'cubes-ui'

const { baseURL, api } = window['configure']().network['shared']
const config = { baseURL: `${baseURL}${api}` }

const userFormModel = () =>
  clientFactory(
    true,
    UserFormModel,
    config,
    {
      retrieveUser: { verb: 'get', template: 'ListUsers' } as TEndPoint
    },
    undefined,
    { dataResolver: (json: any) => [...json, { userName: 'khaled', email: 'sdasd@fgf.net' }] },
    false
  )

export { userFormModel }
const clientMap = { userFormModel }
type TUserFormModelProxy = typeof clientMap

export type { TUserFormModelProxy }
