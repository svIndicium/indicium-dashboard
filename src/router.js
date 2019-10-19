import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { authGuard } from './auth/authGuard';
import Create from './views/user/CreateUser.vue';
import List from './views/user/ListUser.vue';
import View from './views/user/ViewUser.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        breadcrumb: [
          { name: 'Dashboard' },
        ],
      },
    },
    {
      path: '/users',
      name: 'listUser',
      component: List,
      beforeEnter: authGuard,
      meta: {
        breadcrumb: [
          {
            name: 'Dashboard',
            link: '/',
          },
          {
            name: 'Leden',
          },
        ],
      },
    },
    {
      path: '/users/create',
      name: 'createUser',
      component: Create,
      beforeEnter: authGuard,
      meta: {
        breadcrumb: [
          {
            name: 'Dashboard',
            link: '/',
          },
          {
            name: 'Leden',
            link: '/users',
          },
          {
            name: 'Voeg lid toe',
          },
        ],
      },
    },
    {
      path: '/users/:userId',
      name: 'viewUser',
      component: View,
      props: true,
      beforeEnter: authGuard,
      meta: {
        breadcrumb: [
          {
            name: 'Dashboard',
            link: '/',
          },
          {
            name: 'Leden',
            link: '/users',
          },
          {
            name: 'Bekijk lid',
          },
        ],
      },
    },
  ],
});
