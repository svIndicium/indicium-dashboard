import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ListMember from './views/member/Member';
import Profile from './views/profile/Profile';
import Settings from './views/settings/Settings';
import SettingsDashboard from './views/settings/SettingsDashboard';
import SettingsPage from './views/settings/SettingsPage';
import ViewMember from './views/member/ViewMember';
import Events from './views/events/Events';
import AgendaConnection from './views/events/AgendaConnection';
import EventDashboard from './views/events/EventDashboard';
import ViewEvent from './views/events/ViewEvent';
import {isAuthenticated} from "@/auth/authGuard";
import Payment from "@/views/payment/Payment";
import ListPayment from "@/views/payment/ListPayment";
import ViewPayment from "@/views/payment/ViewPayment";
import ViewMemberInfo from "@/views/member/ViewMemberInfo";
import ViewMemberMailAddresses from "@/views/member/ViewMemberMailAddresses";
import ViewMemberMembership from "@/views/member/ViewMemberMembership";
import ViewMemberPayments from "@/views/member/ViewMemberPayments";
import ViewProfilePayments from "@/views/profile/ViewProfilePayments";
import ViewProfileInfo from "@/views/profile/ViewProfileInfo";
import ViewProfileMailaddresses from "@/views/profile/ViewProfileMailaddresses";
import ViewProfileMemberships from "@/views/profile/ViewProfileMemberships";
import StudyType from "@/views/studyTypes/StudyType";
import Registration from "@/views/registrations/Registration";
import ViewRegistration from "@/views/registrations/ViewRegistration";
import ViewRegistrationInfo from "@/views/registrations/ViewRegistrationInfo";
import ListTransferPayments from "@/views/payment/ListTransferPayments";

Vue.use(Router);

export default new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: [
            {
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    title: 'Home',
                    breadcrumb: [
                        { name: 'Dashboard' },
                    ],
                },
            },

            {
                path: '/profiel',
                name: 'ProfileView',
                component: Profile,
                beforeEnter: isAuthenticated,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Profiel',
                        },
                    ],
                },
                children: [
                    {
                        path: 'info',
                        name: 'ProfileViewInfo',
                        component: ViewProfileInfo,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Profiel',
                                },
                            ],
                        },
                    },
                    {
                        path: 'mailaddressen',
                        name: 'ProfileViewMailAddresses',
                        component: ViewProfileMailaddresses,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Profiel',
                                },
                            ],
                        },
                    },
                    {
                        path: 'betalingen',
                        name: 'ProfileViewPayments',
                        component: ViewProfilePayments,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Profiel',
                                },
                            ],
                        },
                    },
                    {
                        path: 'lidmaatschappen',
                        name: 'ProfileViewMemberships',
                        component: ViewProfileMemberships,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Profiel',
                                },
                            ],
                        },
                    },
                ]
            },

            {
                path: '/leden',
                name: 'MemberDashboard',
                component: ListMember,
                beforeEnter: isAuthenticated,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Leden'
                        },
                    ],
                },
            },
            {
                path: '/leden/:memberId',
                name: 'MemberView',
                component: ViewMember,
                beforeEnter: isAuthenticated,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Leden',
                            to: {
                                name: 'MemberDashboard'
                            },
                        },
                        {
                            text: 'Lid',
                        }
                    ],
                },
                children: [
                    {
                        path: 'info',
                        name: 'MemberViewInfo',
                        component: ViewMemberInfo,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Leden',
                                    to: {
                                        name: 'MemberDashboard'
                                    },
                                },
                                {
                                    text: 'Lid',
                                }
                            ],
                        },
                    },
                    {
                        path: 'mail',
                        name: 'MemberViewMailAddresses',
                        component: ViewMemberMailAddresses,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Leden',
                                    to: {
                                        name: 'MemberDashboard'
                                    },
                                },
                                {
                                    text: 'Lid',
                                }
                            ],
                        },
                    },
                    {
                        path: 'lidmaatschap',
                        name: 'MemberViewMembership',
                        component: ViewMemberMembership,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Leden',
                                    to: {
                                        name: 'MemberDashboard'
                                    },
                                },
                                {
                                    text: 'Lid',
                                }
                            ],
                        },
                    },
                    {
                        path: 'betalingen',
                        name: 'MemberViewPayments',
                        component: ViewMemberPayments,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Leden',
                                    to: {
                                        name: 'MemberDashboard'
                                    },
                                },
                                {
                                    text: 'Lid',
                                }
                            ],
                        },
                    },
                ]
            },

            {
                path: '/aanmeldingen',
                name: 'RegistrationDashboard',
                component: Registration,
                beforeEnter: isAuthenticated,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Aanmeldingen'
                        },
                    ],
                },
            },
            {
                path: '/aanmeldingen/:registrationId',
                name: 'RegistrationView',
                component: ViewRegistration,
                beforeEnter: isAuthenticated,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Aanmeldingen',
                            to: {
                                name: 'RegistrationDashboard'
                            },
                        },
                        {
                            text: 'Aanmelding'
                        },
                    ],
                },
                children: [
                    {
                        path: 'info',
                        name: 'RegistrationViewInfo',
                        component: ViewRegistrationInfo,
                        beforeEnter: isAuthenticated,
                        meta: {
                            breadcrumb: [
                                {
                                    text: 'Dashboard',
                                    to: {
                                        name: 'Home'
                                    },
                                },
                                {
                                    text: 'Aanmeldingen',
                                    to: {
                                        name: 'RegistrationDashboard'
                                    },
                                },
                                {
                                    text: 'Aanmelding'
                                },
                            ],
                        },
                    },
                ]
            },

            {
                path: '/studierichtingen',
                name: 'StudyTypeDashboard',
                component: StudyType,
                beforeEnter: isAuthenticated,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Studierichtingen'
                        },
                    ],
                }
            },

            {
                path: '/activiteiten',
                name: 'EventDashboard',
                component: Events,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Activiteiten',
                        },
                    ],
                },
            },
            {
                path: '/activiteiten/:eventId-:eventName',
                name: 'EventView',
                component: ViewEvent,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Activiteiten',
                            to: {
                                name: 'EventDashboard'
                            },
                        },
                        {
                            text: 'Activiteit',
                        },
                    ]
                }
            },

            {
                path: '/activiteiten/agendakoppeling',
                name: 'AgendaConnection',
                component: AgendaConnection,
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Agenda koppeling'
                        },
                    ],
                }
            },

            {
                path: '/betalingen',
                component: Payment,
                name: 'PaymentDashboard',
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Betalingen'
                        },
                    ],
                },
            },
            {
                path: '/overboekingen',
                component: ListTransferPayments,
                name: 'PaymentListOpenTransfer',
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Betalingen'
                        },
                    ],
                },
            },

            {
                path: '/betalingen/:paymentId',
                component: ViewPayment,
                name: 'PaymentView',
                meta: {
                    breadcrumb: [
                        {
                            text: 'Dashboard',
                            to: {
                                name: 'Home'
                            },
                        },
                        {
                            text: 'Betalingen',
                            to: {
                                name: 'PaymentDashboard'
                            },
                        },
                        {
                            text: 'Betaling'
                        },
                    ],
                },
            },

            {
                path: '/instellingen',
                component: Settings,
                beforeEnter: isAuthenticated,
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
                        beforeEnter: isAuthenticated,
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
