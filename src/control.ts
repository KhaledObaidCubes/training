import { THashMap } from 'cubes'
import { TResult, modalMap as builtInModalMap } from 'cubes-ui'
import { repositoryMap, serviceMap, services } from './service'
import { AppCoreBase } from 'cubes-app'
import Application from './app/App.vue'
import { clientMaps } from './proxy'
import { i18nFiles } from './i18n'
import { defineAsyncComponent, markRaw } from 'vue'
import routes from './app/sitemap'
import { defaultUserFormDelegateProps } from './app/service/modal-manager/def/userForm'

const modalMap = {
  newUser: { ui: markRaw(defineAsyncComponent(() => import('./app/service/modal-manager/ui/user-email-modal.vue'))) as any, props: defaultUserFormDelegateProps() },
  ...builtInModalMap
}

export type TProxyResult<T> = Promise<TResult<T>>
export const AppContexts: THashMap = {
  appContext: `appContext`
} as any // TODO: remove any
type TModals = typeof modalMap
export type TModalMap = { [key in keyof TModals]: (typeof modalMap)[key]['props'] }

export enum IoCLevelsEnum {
  DEFAULT_0, // cubes level services..
  PROD_1, // first overrides
  DEV_2 // you can add up as much as you wish in the container
}

class App extends AppCoreBase {
  constructor(e: HTMLElement, c: any) {
    //@ts-ignore
    super(e, c, Application, IoCLevelsEnum.DEV_2, __lib__)
    //@ts-ignore
    this.version = __version__
  }
  setupActiveControl() {
    return this
  }
  getCustomIcons() {
    //return [require('./app/icons/index-arrow@icon').default.definition, require('./app/icons/kpi-status@icon').default.definition]
  }
  getAppContext(): any {
    return AppContexts
  }
  getServiceMap() {
    return { ...serviceMap, ...repositoryMap }
  }
  getServices() {
    return [services]
  }
  geti18n() {
    return [i18nFiles]
  }
  getSiteMapRoutes() {
    return routes
  }
  getModalConfig() {
    return modalMap
  }
  getNetworkClients() {
    return clientMaps
  }
}

export { App }
