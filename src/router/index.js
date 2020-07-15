import Vue from 'vue';
import VueRouter from 'vue-router';

import pages from '@/constants/pages';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: pages,
});

export default router;
