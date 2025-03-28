import { createRouter, createWebHistory } from "vue-router";


let routes= [
    {
        path: '/',
        name: 'home',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
        component: () => import('../views/home/index.vue')
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('../views/mine/index.vue'),
    },
    {
        path: '/mine/userinfo',
        name: 'userinfo',
        component: () => import('../views/mine/userInfo/index.vue')
    },
    {
        path: '/mine/fundingDetails',
        name: 'fundingDetails',
        component: () => import('../views/mine/fundingDetails/index.vue')
    },
    {
        path: '/mine/withdrawalRecord',
        name: 'withdrawRecord',
        component: () => import('../views/mine/withdrawalRecord/index.vue')
    },
    {
        path: '/mine/transactionHistory',
        name: 'transactionHistory',
        component: () => import('../views/mine/transactionHistory/index.vue')
    },
    {
        path: '/mine/accountRecords',
        name: 'accountRecords',
        component: () => import('../views/mine/accountRecords/index.vue')
    },
    {
        path: '/mine/personalReport',
        name: 'personalReport',
        component: () => import('../views/mine/personalReport/index.vue')
    },
    {
        path: '/mine/bindCard',
        name: 'bindCard',
        component: () => import('../views/mine/bindCard/index.vue')
    },
    {
        path: '/mine/passwordManagement',
        name: 'passwordManagement',
        component: () => import('../views/mine/passwordManagement/index.vue')
    },
    {
        path: '/withdrawal',
        name: 'withdrawal',
        component: () => import('../views/withdrawal/index.vue')
    },
    {
        path: '/recharge',
        name: 'recharge',
        component: () => import('../views/recharge/index.vue')

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/index.vue')
    },
    {
        path: '/ai/:id',
        name: 'Ai',
        component: () => import('../views/Ai/index.vue')
    },
    {
        path: '/message',
        name: 'message',
        component: () => import('../views/message/index.vue')
    }
    //{
    //配置404页面
    //path: '/:catchAll(.*)',
    //name: '404',
    //component: () => import(''),
    //}
]
// 路由
const router = createRouter({
    history: createWebHistory('/'),
    routes
})
// 导出
export default router
