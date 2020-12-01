import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { authGuard } from './auth/authGuard';
import ListStudyType from './views/member/ListStudyType';
import CreateStudyType from './views/member/CreateStudyType';
import ListMember from './views/member/ListMember';
import Profile from './views/profile/Profile';
import ViewProfile from './views/profile/ViewProfile';
import ViewMailaddresses from './views/profile/ViewMailaddresses';
import ListRegistrations from './views/member/registration/ListRegistrations';
import Settings from './views/settings/Settings';
import SettingsDashboard from './views/settings/SettingsDashboard';
import SettingsPage from './views/settings/SettingsPage';
import ViewMember from './views/member/ViewMember';
import ViewRegistration from './views/member/registration/ViewRegistration';
import Events from './views/events/Events';
import AgendaConnection from './views/events/AgendaConnection';
import CreateEvent from './views/events/CreateEvent';
import EventDashboard from './views/events/EventDashboard';
import ViewEvent from './views/events/ViewEvent';
import CreateUser from "@/views/member/CreateUser";
import Member from "@/views/member/Member";

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
                component: Member,
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
                        name: 'memberDashboard',
                        component: ListMember,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Leden',
                                    routeName: 'memberDashboard',
                                },
                                {
                                    name: 'Overzicht'
                                }
                            ],
                        },
                    },
                    {
                        path: 'nieuw',
                        name: 'memberImport',
                        component: CreateUser,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Leden',
                                    routeName: 'memberDashboard',
                                },
                                {
                                    name: 'Nieuw'
                                }
                            ],
                        },
                    },
                    {
                        path: 'aanmeldingen',
                        name: 'registrationOverview',
                        component: ListRegistrations,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Leden',
                                    routeName: 'memberDashboard',
                                },
                                {
                                    name: 'Aanmeldingen',
                                }
                            ],
                        },
                    },
                    {
                        path: 'aanmeldingen/:registrationId',
                        name: 'registrationView',
                        component: ViewRegistration,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Leden',
                                    routeName: 'memberDashboard',
                                },
                                {
                                    name: 'Aanmeldingen',
                                    routeName: 'registrationOverview'
                                },
                                {
                                    name: 'Aanmelding'
                                }
                            ],
                        }
                    },
                    {
                        path: 'studierichtingen',
                        name: 'studyTypeOverview',
                        component: ListStudyType,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Leden',
                                    routeName: 'memberDashboard',
                                },
                                {
                                    name: 'Studierichtingen',
                                }
                            ],
                        }
                    },
                    {
                        path: 'studierichtingen/nieuw',
                        name: 'studyTypeCreate',
                        component: CreateStudyType,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Leden',
                                    routeName: 'memberDashboard',
                                },
                                {
                                    name: 'Studierichtingen',
                                    routeName: 'studyTypeOverview',
                                },
                                {
                                    name: 'Nieuw'
                                }
                            ],
                        }
                    },
                    {
                        path: ':memberId',
                        name: 'memberView',
                        component: ViewMember,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Leden',
                                    routeName: 'memberDashboard',
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
                        name: 'eventDashboard',
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
                        name: 'agendaConnection',
                        component: AgendaConnection,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard'
                                },
                                {
                                    name: 'Activiteiten',
                                    routeName: 'eventDashboard'
                                },
                                {
                                    name: 'Koppelen met agenda'
                                }
                            ]
                        }
                    },
                    {
                        path: 'nieuw',
                        name: 'eventCreate',
                        component: CreateEvent,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard'
                                },
                                {
                                    name: 'Activiteiten',
                                    routeName: 'eventDashboard'
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
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard'
                                },
                                {
                                    name: 'Activiteiten',
                                    routeName: 'eventDashboard'
                                },
                                {
                                    name: 'Activiteit'
                                }
                            ]
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
                        name: 'profile',
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
                        path: 'mailadressen',
                        name: 'profileMailAddresses',
                        component: ViewMailaddresses,
                        meta: {
                            breadcrumb: [
                                {
                                    name: 'Dashboard',
                                    routeName: 'dashboard',
                                },
                                {
                                    name: 'Profiel',
                                    routeName: 'profile'
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
