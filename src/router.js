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
import ViewMailaddresses from './views/profile/ViewMailaddresses';
import ListRegistrations from './views/user/registration/ListRegistrations';
import Settings from './views/settings/Settings';
import SettingsDashboard from './views/settings/SettingsDashboard';
import SettingsPage from './views/settings/SettingsPage';

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
                        component: ListRegistrations,
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
                                    name: 'Aanmeldingen',
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
                component: Profile,
                beforeEnter: authGuard,
                children: [
                    {
                        path: '',
                        name: 'profielDashboard',
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
                    },
                    {
                        path: 'mailaddressen',
                        name: 'gebruikersmailadresoverzicht',
                        component: ViewMailaddresses,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Profiel',
                                    routeName: 'profielDashboard'
                                },
                                {
                                    name: 'Mailadressen',
                                },
                            ],
                        },
                    }
                ]
            },
            {
                path: '/instellingen',
                component: Settings,
                beforeEnter: authGuard,
                children: [
                    {
                        path: '',
                        name: 'instellingenDashboard',
                        component: SettingsDashboard,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Instellingen',
                                },
                            ],
                        },
                    },
                    {
                        path: ':app',
                        name: 'appInstellingen',
                        component: SettingsPage,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Instellingen',
                                    routeName: 'instellingenDashboard'
                                },
                            ],
                        },
                    },
                ]
            }
        ],
    }
);
