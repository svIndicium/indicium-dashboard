import {MemberService, StudyTypeService} from "@/services";
import {FETCH_MEMBERS, FETCH_PROFILE, LOGOUT, REFRESH_TOKEN} from "@/store/actions";
import {
    INIT_KEYCLOAK,
    STORE_PROFILE, STORE_PROFILE_MAIL_ADDRESS, STORE_PROFILE_STUDY_TYPE,
    STORE_STUDY_TYPES,
    UPDATE_TOKEN,
    USER_LOGOUT
} from "@/store/mutations";
import Vue from 'vue';

const state = {
    isAuthenticated: false,
    name: '',
    roles: [],
    userId: '',
    idToken: '',
    accessToken: '',
    idTokenParsed: {},
    resourceAccess: {},
    member: {},
    memberIsLoading: true,
    studyTypeIsLoading: true,
    mailAddressIsLoading: true,
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
        await Vue.$keycloak.logout();
    },
    [REFRESH_TOKEN]({commit}, keycloak) {
        commit(UPDATE_TOKEN, keycloak);
    },
    async [FETCH_PROFILE]({commit}) {
        const memberResponse = await MemberService.getMemberById(state.userId);
        commit(STORE_PROFILE, memberResponse.data);
        const studyTypeResponse = await StudyTypeService.getStudyTypeById(memberResponse.data.memberDetails.studyTypeId);
        commit(STORE_PROFILE_STUDY_TYPE, studyTypeResponse.data);
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
    },
    [STORE_PROFILE](state, member) {
        state.member = member;
        state.memberIsLoading = false;
    },
    [STORE_PROFILE_STUDY_TYPE](state, studyType) {
        state.member = {...state.member, studyType};
        state.studyTypeIsLoading = false;
    },
    [STORE_PROFILE_MAIL_ADDRESS](state, mailAddresses) {
        state.member = {...state.member, mailAddresses};
        state.mailAddressIsLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
