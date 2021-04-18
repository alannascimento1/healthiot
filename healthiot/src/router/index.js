import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/meus-pacientes',
    name: 'meus-pacientes',
    meta: {
      icon: 'clinic-medical', title: 'Home'
    },
    component: () => import(/* webpackChunkName: "paginaGraficos" */ '../pages/pacientes/ListaPacientes')
  },
  {
    path: '/paginaGraficos',
    name: 'paginaGraficos',
    meta: {
      icon: 'chart-area', title: 'Current State'
    },
    component: () => import(/* webpackChunkName: "paginaGraficos" */ '../pages/paginaGraficos/PaginaGraficos')
    // component: () => import(/* webpackChunkName: "LineChart2" */ '../components/graficos/LineChart2')

  },
  {
    path: '/historico',
    name: 'historico',
    meta: {
      icon: 'fa fa-history', title: 'History'
    },
    component: () => import(/* webpackChunkName: "paginaGraficos" */ '../pages/paginaHistorico/PaginaHistorico')
    // component: () => import(/* webpackChunkName: "LineChart2" */ '../components/graficos/LineChart2')

  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'login'
    },
    component: () => import(/* webpackChunkName: "login" */'../pages/login/Login')
  },
  {
    path: '/registro',
    name: 'registro',
    meta: {
      title: 'registro'
    },
    component: () => import(/* webpackChunkName: "Register" */'../pages/register/Register')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} -  Expenses`

  if (!window.uid && to.name !== 'login' && to.name !== 'registro') {
    next({ name: 'login' })
  } else {
    next()
  }

  if (window.uid && to.name === 'registro') {
    next({ name: 'meus-pacientes' })
  } else {
    next()
  }
})

export default router
