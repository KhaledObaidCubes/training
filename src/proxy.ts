import { clientMaps as cubesAppClientMaps } from 'cubes-app'
import { clientMaps as cubesUiClientMaps } from 'cubes-ui'
import { userFormModel } from '@/app/repository/proxy/user-model.proxy'
import { customTable } from './app/repository/proxy/custom-table.proxy'

//todo: import your app proxy imports here..
// import { myProxy } from './app/repository/proxy/myProxy.proxy'
//
const clientMaps = {
  ...cubesUiClientMaps,
  ...cubesAppClientMaps,
  customTable,
  userFormModel

  //todo:export your proxies here..
  //myProxy,
}
export { clientMaps }
export type TClients = typeof clientMaps
