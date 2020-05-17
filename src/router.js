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
import ViewUser from './views/user/ViewUser';
import ViewRegistration from './views/user/registration/ViewRegistration';
import Events from './views/events/Events';
import AgendaConnection from './views/events/AgendaConnection';
import CreateEvent from './views/events/CreateEvent';
import EventDashboard from './views/events/EventDashboard';
import ViewEvent from './views/events/ViewEvent';

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
                        path: '',
                        name: 'userDashboard',
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
                        path: 'aanmeldingen/:registrationId',
                        name: 'aanmelding-bekijken',
                        component: ViewRegistration,
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
                                    routeName: 'aanmeldingenoverzicht'
                                },
                                {
                                    name: 'Aanmelding'
                                }
                            ],
                        }
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
                    },
                    {
                        path: ':userId',
                        name: 'lid-bekijken',
                        component: ViewUser,
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
                                    name: 'Lid'
                                }
                            ],
                        }
                    },
                ]
            },
            {
                path: '/activiteiten',
                component: Events,
                meta: {
                    breadcrumb: [
                        {
                            name: 'Dashboard',
                            routeName: 'dashboard'
                        },
                        {
                            name: 'Activiteiten'
                        }
                    ]
                },
                children: [
                    {
                        path: '',
                        name: 'EventDashboard',
                        component: EventDashboard,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard'
                                },
                                {
                                    name: 'Activiteiten'
                                }
                            ]
                        }
                    },
                    {
                        path: 'agendakoppeling',
                        name: 'AgendaConnection',
                        component: AgendaConnection,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard'
                                },
                                {
                                    name: 'Activiteiten',
                                    routeName: 'EventDashboard'
                                },
                                {
                                    name: 'Koppelen met agenda'
                                }
                            ]
                        }
                    },
                    {
                        path: 'nieuw',
                        name: 'CreateEvent',
                        component: CreateEvent,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard'
                                },
                                {
                                    name: 'Activiteiten',
                                    routeName: 'EventDashboard'
                                },
                                {
                                    name: 'Nieuwe activiteit'
                                }
                            ]
                        }
                    },
                    {
                        path: ':eventId-:eventName',
                        name: 'ViewEvent',
                        component: ViewEvent,
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
