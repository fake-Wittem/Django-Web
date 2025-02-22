import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: '主页',
        component: () => import( '../layout/Index.vue'),
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: '首页',
                component: () => import( '../views/index/Index.vue'),
            },

            {
                path: '/sys/user',
                name: '用户管理',
                component: () => import( '../views/system/user/Index.vue'),
            },
            {
                path: '/sys/role',
                name: '角色管理',
                component: () => import( '../views/system/role/Index.vue'),
            },
            {
                path: '/sys/menu',
                name: '菜单管理',
                component: () => import( '../views/system/menu/Index.vue'),
            },
            {
                path: '/bsns/department',
                name: '部门管理',
                component: () => import( '../views/business/Department.vue'),
            },
            {
                path: '/bsns/jobs',
                name: '岗位管理',
                component: () => import( '../views/business/Jobs.vue'),
            },
            {
                path: '/userCenter',
                name: '个人中心',
                component: () => import( '../views/userCenter/Index.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( '../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
