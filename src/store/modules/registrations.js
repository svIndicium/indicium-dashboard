import {RegistrationService} from "@/services";
import {STORE_REGISTRATIONS} from "@/store/mutations";
import {FETCH_REGISTRATIONS} from "@/store/actions";

const state = {
    registrations: [],
    registrationsLength: 0,
    isLoading: true,
}

const getters = {
    registrations(state) {
        return state.registrations;
    },
    pendingRegistrations(state) {
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
    }
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
