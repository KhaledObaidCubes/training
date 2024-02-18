import { profilePage } from 'cubes-app'
import { sessionRoutes } from 'cubes-ui'

const Index = () => import('./presentation/pages/index/index.vue')
const user = () => import('./presentation/pages/user/index.vue')
const calc = () => import('./presentation/pages/calc/index.vue')
const customBtn = () => import('./presentation/pages/cutom-button/index.vue')
const mokeAPI = () => import('./presentation/pages/custom-table/custom-table.vue')
const myModal = () => import('./presentation/pages/my-modal/index.vue')

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

// const modalRoute = {
//   path: '/my-modal',
//   name: 'My Modal',
//   component: myModal,
//   meta: {
//     title: { en: 'modal', ar: 'modal' },
//     transition: 'slide'
//   }
// }

const customBTNRoute = {
  path: '/custom-btn',
  name: 'custom btn',
  component: customBtn,
  meta: {
    title: { en: 'custom button', ar: 'زر تلقائي' },
    transition: 'slide'
  }
}
const mokeDataRoute = {
  path: '/moke-data',
  name: 'mock data',
  component: mokeAPI,
  meta: {
    title: { en: 'data', ar: 'بيانات' },
    transition: 'slide'
  }
}

const routes = [
  indexRoute,
  userRoute,
  calcRoute,
  // modalRoute,
  customBTNRoute,
  mokeDataRoute,
  ...sessionRoutes,
  //todo: add your routes here..
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]
if (window['configure']().secure) routes.splice(routes.length - 2, 0, profilePage as any)
export default routes
