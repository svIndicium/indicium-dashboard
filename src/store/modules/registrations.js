import {RegistrationService} from "@/services";
import {STORE_REGISTRATIONS} from "@/store/mutations";
import {FETCH_REGISTRATIONS, RESET_STATE} from "@/store/actions";

const getDefaultState = () => {
    return {
        registrations: [],
        registrationsLength: 0,
        isLoading: true,
    }
}

const state = getDefaultState();

const getters = {
    getRegistrations(state) {
        return state.registrations;
    },
    getPendingRegistrations(state) {
        return state.registrations.filter((registration) => registration.reviewStatus === 'PENDING');
    },
    registrationsLength(state) {
        return state.registrationsLength;
    }
}

const actions = {
    async [FETCH_REGISTRATIONS]({commit}) {
        const registrationsResponse = await RegistrationService.getRegistrations();
        commit(STORE_REGISTRATIONS, registrationsResponse.data);
    },
    [RESET_STATE](state) {
        Object.assign(state, getDefaultState())
    },
}

const mutations = {
    [STORE_REGISTRATIONS](state, registrations) {
        state.registrations = registrations;
        state.registrationsLength = registrations.length;
        state.isLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
