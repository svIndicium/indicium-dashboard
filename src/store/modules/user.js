import MemberService from "@/services";
import {FETCH_MEMBERS, LOGOUT, REFRESH_TOKEN} from "@/store/actions";
import {INIT_KEYCLOAK, UPDATE_TOKEN, USER_LOGOUT} from "@/store/mutations";
import Vue from 'vue';

const state = {
    isAuthenticated: false,
    name: '',
    roles: [],
    userId: '',
    idToken: '',
    accessToken: '',
    idTokenParsed: {},
    resourceAccess: {}
}

const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated
    },
    name(state) {
        return state.name
    },
}

const actions = {
    async [LOGOUT]({commit}) {
        commit(USER_LOGOUT);
        Vue.$keycloak.logout();
    },
    async [REFRESH_TOKEN]({commit}, keycloak) {
        commit(UPDATE_TOKEN, keycloak);
    }
}

const mutations = {
    [INIT_KEYCLOAK](state, keycloak) {
        state.isAuthenticated = keycloak.authenticated;
        state.idToken = keycloak.idToken;
        state.idTokenParsed = keycloak.idTokenParsed;
        state.userId = keycloak.idTokenParsed.sub;
        state.accessToken = keycloak.token;
        state.name = keycloak.idTokenParsed.name;
        state.resourceAccess = keycloak.resourceAccess;
        localStorage.setItem('token', keycloak.token);
        localStorage.setItem("idToken", keycloak.idToken);
        localStorage.setItem("refreshToken", keycloak.refreshToken);
    },
    [UPDATE_TOKEN](state, keycloak) {
        state.idToken = keycloak.idToken;
        state.idTokenParsed = keycloak.idTokenParsed;
        state.userId = keycloak.idTokenParsed.sub;
        state.accessToken = keycloak.token;
        state.name = keycloak.idTokenParsed.name;
        state.resourceAccess = keycloak.resourceAccess;
        localStorage.setItem('token', keycloak.token);
        localStorage.setItem("idToken", keycloak.idToken);
        localStorage.setItem("refreshToken", keycloak.refreshToken);
    },
    [USER_LOGOUT](state) {
        state.isAuthenticated = false;
        state.idToken = '';
        state.idTokenParsed = '';
        state.userId = '';
        state.accessToken = '';
        state.name = '';
        localStorage.removeItem('token');
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
