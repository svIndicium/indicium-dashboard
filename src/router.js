import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { authGuard } from './auth/authGuard';
import CreateUser from './views/user/CreateUser.vue';
import ListUser from './views/user/ListUser.vue';
import ViewUser from './views/user/ViewUser.vue';
import ListStudyType from './views/studytype/ListStudyType';
import CreateStudyType from './views/studytype/CreateStudyType';
import ListRegistrations from './views/registration/ListRegistrations';
import ListUnfinalizedRegistrations from './views/registration/ListUnfinalizedRegistrations';
import ViewRegistration from './views/registration/ViewRegistration';

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
            path: '/leden/aanmeldingen',
            name: 'ListRegistrations',
            component: ListRegistrations,
            beforeEnter: authGuard,
            meta: {
                title: 'Aanmeldingen',
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
                        name: 'Aanmeldingen',
                    },
                ],
            },
        },
        {
            path: '/leden/aanmeldingen/onvoltooid',
            name: 'ListUnfinalizedRegistrations',
            component: ListUnfinalizedRegistrations,
            beforeEnter: authGuard,
            meta: {
                title: 'Nog te behandelen aanmeldingen',
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
                        name: 'Aanmeldingen',
                        link: '/leden/aanmeldingen',
                    },
                    {
                        name: 'Onvoltooid',
                    },
                ],
            },
        },
        {
            path: '/leden/aanmeldingen/:registrationId',
            name: 'viewRegistration',
            component: ViewRegistration,
            props: true,
            beforeEnter: authGuard,
            meta: {
                title: 'Aanmelding',
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
                        name: 'Aanmeldingen',
                        link: '/leden/aanmeldingen',
                    },
                    {
                        name: 'Detail',
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
