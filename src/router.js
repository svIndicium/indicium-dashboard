import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { authGuard } from './auth/authGuard';
import ListStudyType from './views/studytype/ListStudyType';
import CreateStudyType from './views/studytype/CreateStudyType';
import User from './views/user/User';
import ListUser from './views/user/ListUser';

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
            name: 'userDashboard',
            component: User,
            beforeEnter: authGuard,
            children: [
                {
                    path: 'overzicht',
                    name: 'ledenoverzicht',
                    component: ListUser,
                    meta: {
                        breadcrumb: [
                            {
                                name: 'Dashboard',
                                routeName: 'dashboard',
                            },
                            {
                                name: 'Leden',
                                routeName: 'userDashboard',
                            },
                            {
                                name: 'Overzicht'
                            }
                        ],
                    },
                },
                {
                    path: 'aanmeldingen',
                    name: 'ledenoverzicht',
                    component: ListUser,
                    meta: {
                        breadcrumb: [
                            {
                                name: 'Dashboard',
                                routeName: 'dashboard',
                            },
                            {
                                name: 'Leden',
                                routeName: 'userDashboard',
                            },
                            {
                                name: 'Overzicht'
                            }
                        ],
                    },
                },
            ],
            meta: {
                breadcrumb: [
                    {
                        name: 'Dashboard',
                        routeName: 'dashboard',
                    },
                    {
                        name: 'Leden',
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
