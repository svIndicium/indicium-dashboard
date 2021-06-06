import {
    MailAddressService,
    MemberService,
    MembershipService,
    PaymentService,
    StudyTypeService
} from "@/services";
import {
    FETCH_MEMBERS,
    FETCH_PROFILE,
    FETCH_PROFILE_PAYMENT_TRANSACTION,
    LOGOUT,
    REFRESH_TOKEN, RESET_STATE
} from "@/store/actions";
import {
    INIT_KEYCLOAK,
    STORE_PROFILE,
    STORE_PROFILE_MAIL_ADDRESS,
    STORE_PROFILE_MEMBERSHIPS,
    STORE_PROFILE_PAYMENTS,
    STORE_PROFILE_STUDY_TYPE,
    STORE_STUDY_TYPES,
    UPDATE_TOKEN,
    USER_LOGOUT
} from "@/store/mutations";
import keycloak from '@/auth/keycloak';

const getDefaultState = () => {
    return {
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
        paymentIsLoading: true,
        membershipIsLoading: true,
    }
}

const state = getDefaultState();

const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated
    },
    name(state) {
        return state.name
    },
    hasPermission: (state) => (resource, role) => {
        if (!state.resourceAccess[resource]) return false;
        return state.resourceAccess[resource].roles.includes(role);
    }
}

const actions = {
    async [LOGOUT]({commit, dispatch}) {
        commit(USER_LOGOUT);
        await keycloak.logout();
        dispatch(RESET_STATE)
    },
    [REFRESH_TOKEN]({commit}, keycloak) {
        commit(UPDATE_TOKEN, keycloak);
    },
    async [FETCH_PROFILE]({commit}) {
        const memberResponse = await MemberService.getMemberById(state.userId);
        commit(STORE_PROFILE, memberResponse);
        const studyTypeResponse = await StudyTypeService.getStudyTypeById(memberResponse.memberDetails.studyTypeId);
        commit(STORE_PROFILE_STUDY_TYPE, studyTypeResponse);
        const mailAddressResponse = await MailAddressService.getMailAddressesByMemberId(state.userId);
        commit(STORE_PROFILE_MAIL_ADDRESS, mailAddressResponse);
        const paymentResponse = await PaymentService.getPaymentsForMemberId(state.userId);
        commit(STORE_PROFILE_PAYMENTS, paymentResponse);
        const membershipResponse = await MembershipService.getMembershipsByMemberId(state.userId);
        commit(STORE_PROFILE_MEMBERSHIPS, membershipResponse);
    },
    [RESET_STATE](state) {
        Object.assign(state, getDefaultState())
    },
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
        state.member = {...state.member, mailAddresses: mailAddresses};
        state.mailAddressIsLoading = false;
    },
    [STORE_PROFILE_PAYMENTS](state, payments) {
        payments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        state.member = {...state.member, payments};
        state.paymentIsLoading = false;
    },
    [STORE_PROFILE_MEMBERSHIPS](state, memberships) {
        memberships.sort((a, b) => {
            return new Date(b.start) - new Date(a.start);
        });
        state.member = {...state.member, memberships};
        state.membershipIsLoading = false;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
