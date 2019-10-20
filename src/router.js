import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { authGuard } from './auth/authGuard';
import CreateUser from './views/user/CreateUser.vue';
import ListUser from './views/user/ListUser.vue';
import ViewUser from './views/user/ViewUser.vue';
import ListStudyType from './views/studytype/ListStudyType';
import CreateStudyType from './views/studytype/CreateStudyType';

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
      component: ListUser,
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
      component: CreateUser,
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
      component: ViewUser,
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
    {
      path: '/studytypes',
      name: 'listStudyType',
      component: ListStudyType,
      beforeEnter: authGuard,
      meta: {
        breadcrumb: [
          {
            name: 'Dashboard',
            link: '/',
          },
          {
            name: 'Studierichingen',
          },
        ],
      },
    },
    {
      path: '/studytypes/create',
      name: 'createStudyType',
      component: CreateStudyType,
      beforeEnter: authGuard,
      meta: {
        breadcrumb: [
          {
            name: 'Dashboard',
            link: '/',
          },
          {
            name: 'Studierichtingen',
            link: '/studytypes',
          },
          {
            name: 'Voeg studierichting toe',
          },
        ],
      },
    },
  ],
});
