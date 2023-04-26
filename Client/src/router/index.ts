import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '~/store'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        meta: { title: '首页', keepAlive: true, index: '1' },
        component: () =>
            import(/* webpackChunkName: "index" */ '~/views/IndexView.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录', index: '5' },
        component: () =>
            import(/* webpackChunkName: "login" */ '~/views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: { title: '注册', index: '7' },
        component: () =>
            import(/* webpackChunkName: "register" */ '~/views/RegisterView.vue')
    },
    {
        path: '/challenges',
        name: 'challenges',
        meta: { requireAuth: true, title: '题目', index: '2' },
        component: () =>
            import(/* webpackChunkName: "challenges" */ '~/views/ChallengesView.vue')
    },
    {
        path: '/challenge/:id',
        name: 'challenge',
        meta: { requireAuth: true, title: '题目', index: '2' },
        component: () =>
            import(/* webpackChunkName: "challenge" */ '~/views/ChallengeView.vue')
    },
    {
        path: '/rank',
        name: 'rank',
        meta: { requireAuth: true, title: '天梯', index: '3' },
        component: () =>
            import(/* webpackChunkName: "rank" */ '~/views/RankView.vue')
    },
    {
        path: '/teams',
        name: 'teams',
        meta: { requireAuth: true, title: '团队', index: '4-1' },
        component: () =>
            import(/* webpackChunkName: "teams" */ '~/views/TeamsView.vue')
    },
    {
        path: '/myteam',
        name: 'myteam',
        meta: { title: '我的团队', requireAuth: true, index: '4-2' },
        beforeEnter: (to, from, next) => {
            if (store.getters['UserInfo/haveTeam']) {
                next({ path: '/team/' + store.state.UserInfo.team.id })
            } else next({ path: '/teams' })
        },
        component: () => null
    },
    {
        path: '/team/:id',
        name: 'team',
        meta: { requireAuth: true, title: '团队', index: '4-1' },
        component: () =>
            import(/* webpackChunkName: "team" */ '~/views/TeamView.vue')
    },
    {
        path: '/user/:id',
        name: 'user',
        meta: { requireAuth: true, title: '用户', index: '0' },
        component: () =>
            import(/* webpackChunkName: "user" */ '~/views/UserView.vue')
    },
    {
        path: '/myprofile',
        name: 'myprofile',
        meta: { title: '我的资料', requireAuth: true, index: '6-1' },
        beforeEnter: (to, from, next) => {
            next({ path: '/user/' + store.state.UserInfo.id })
        },
        component: () => null
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        //鉴权
        if (store.getters['UserInfo/isLogin']) next()
        else {
            next({ name: 'login' })
        }
    } else next()
})

// 全局后置路由守卫
router.afterEach(to => {
    if (typeof to.meta?.title === 'string') {
        document.title = to.meta?.title || 'CTFz'
    }
})

export default router
