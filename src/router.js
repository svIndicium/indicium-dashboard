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
                title: 'Home',
                breadcrumb: [
                    { name: 'Dashboard' },
                ],
            },
        },
        {
            path: '/leden',
            name: 'listUser',
            component: ListUser,
            beforeEnter: authGuard,
            meta: {
                title: 'Leden',
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
            path: '/leden/create',
            name: 'createUser',
            component: CreateUser,
            beforeEnter: authGuard,
            meta: {
                title: 'Lid toevoegen',
                breadcrumb: [
                    {
                        name: 'Dashboard',
                        link: '/',
                    },
                    {
                        name: 'Leden',
                        link: '/leden',
                    },
                    {
                        name: 'Voeg lid toe',
                    },
                ],
            },
        },
        {
            path: '/leden/:userId',
            name: 'viewUser',
            component: ViewUser,
            props: true,
            beforeEnter: authGuard,
            meta: {
                title: 'Lid',
                breadcrumb: [
                    {
                        name: 'Dashboard',
                        link: '/',
                    },
                    {
                        name: 'Leden',
                        link: '/leden',
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
                title: 'Richtingen',
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
                title: 'Creeer Studierichting',
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
