import MemberService from "@/services";
import {FETCH_MEMBERS, LOGOUT, REFRESH_TOKEN} from "@/store/actions";
import {INIT_KEYCLOAK, UPDATE_TOKEN, USER_LOGOUT} from "@/store/mutations";
import Vue from 'vue';

const state = {
    isAuthenticated: false,
    name: '',
    roles: [],
    idToken: '',
    accessToken: '',
    idTokenParsed: {}
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
    async [REFRESH_TOKEN]({commit}) {
        commit(UPDATE_TOKEN, Vue.$keycloak);
    }
}

const mutations = {
    [INIT_KEYCLOAK](state, keycloak) {
        state.isAuthenticated = keycloak.authenticated;
        state.idToken = keycloak.idToken;
        state.idTokenParsed = keycloak.idTokenParsed;
        state.accessToken = keycloak.token;
        state.name = keycloak.idTokenParsed.name;
        localStorage.setItem('token', keycloak.token);
    },
    [UPDATE_TOKEN](state, keycloak) {
        state.idToken = keycloak.idToken;
        state.idTokenParsed = keycloak.idTokenParsed;
        state.accessToken = keycloak.token;
        state.name = keycloak.idTokenParsed.name;
        localStorage.setItem('token', keycloak.token);
    },
    [USER_LOGOUT](state) {
        state.isAuthenticated = false;
        state.idToken = '';
        state.idTokenParsed = '';
        state.accessToken = '';
        state.name = '';
        localStorage.removeItem('token');
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
