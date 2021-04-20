/**
 * Модуль роутера приложения
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import initListners from './initListners';
import listners from './listners';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/ztdata/Home',
    },
    {
        path: '/ztdata/Home',
        name: 'Home',
        meta: { title: '首页' },
        component: () =>
            import ('@/views/Home/index'),
    }, {
        path: '*',
        component: () =>
            import ('@/views/errorpage/404'),
        hidden: true
    },
    {
        path: '/pdf/download',
        component: () =>
            import ('@/pages/HomePage/RightContent/RightBottomComponents/pdf/download'),
        hidden: true
    },
    //
];

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default initListners(router, listners);