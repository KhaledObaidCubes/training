import { profilePage } from 'cubes-app'
import { sessionRoutes } from 'cubes-ui'

const Index = () => import('./presentation/pages/index/index.vue')
const user = () => import('./presentation/pages/user/index.vue')
const calc = () => import('./presentation/pages/calc/index.vue')

const indexRoute = {
  path: '/',
  name: 'index',
  component: Index,
  meta: {
    title: { en: 'index', ar: 'index' },
    transition: 'slide'
  }
}
const userRoute = {
  path: '/user',
  name: 'user',
  component: user,
  meta: {
    title: { en: 'user', ar: 'user' },
    transition: 'slide'
  }
}

const calcRoute = {
  path: '/calc',
  name: 'calc',
  component: calc,
  meta: {
    title: { en: 'calc', ar: 'calc' },
    transition: 'slide'
  }
}

const routes = [
  indexRoute,
  userRoute,
  calcRoute,
  ...sessionRoutes,
  //todo: add your routes here..
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
if (window['configure']().secure) routes.splice(routes.length - 2, 0, profilePage as any)
export default routes
