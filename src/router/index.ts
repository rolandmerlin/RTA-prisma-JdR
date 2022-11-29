import { createRouter, createWebHistory } from 'vue-router'

import Page_Index from '../pages/index.vue'
import Page_Login from '../pages/login.vue'
import Page_Logout from '../pages/logout.vue'
import Page_Register from '../pages/register.vue'

const routes = [
    {
        path:'/',
        component:Page_Index
    },
    {
        path:'/login',
        component:Page_Login
    },
    {
        path:'/register',
        component:Page_Register
    },
    {
        path:'/logout',
        component:Page_Logout
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router