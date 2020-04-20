import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { authGuard } from './auth/authGuard';
import ListStudyType from './views/user/ListStudyType';
import CreateStudyType from './views/user/CreateStudyType';
import User from './views/user/User';
import ListUser from './views/user/ListUser';
import Profile from './views/profile/Profile';
import ViewProfile from './views/profile/ViewProfile';

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
                        name: 'aanmeldingenoverzicht',
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
                        path: 'studierichtingen',
                        name: 'studierichtingenoverzicht',
                        component: ListStudyType,
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
                                    name: 'Studierichtingen',
                                }
                            ],
                        }
                    },
                    {
                        path: 'studierichtingen/nieuw',
                        name: 'nieuwestudierichting',
                        component: CreateStudyType,
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
                                    name: 'Studierichtingen',
                                    routeName: 'studierichtingenoverzicht',
                                },
                                {
                                    name: 'Nieuw'
                                }
                            ],
                        }
                    }
                ]
            },
            {
                path: '/profiel',
                name: 'profielDashboard',
                component: Profile,
                beforeEnter: authGuard,
                children: [
                    {
                        path: '/',
                        name: 'gebruikersprofiel',
                        component: ViewProfile,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Profiel',
                                },
                            ],
                        },
                    }
                ]
            }
        ],
    }
);
