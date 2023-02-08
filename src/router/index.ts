import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'views/IndexView.vue')
  },
  {
    path: '/challenges',
    name: 'challenges',
    component: () => import(/* webpackChunkName: "about" */ 'views/ChallengesView.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import(/* webpackChunkName: "about" */ 'views/RankView.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import(/* webpackChunkName: "about" */ 'views/TeamsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ 'views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ 'views/RegisterView.vue')
  }, 
  {
    path: '/challenge/:id',
    name: 'challenge',
    component: () => import(/* webpackChunkName: "about" */ 'views/ChallengeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
