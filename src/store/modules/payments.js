import {PaymentService} from "@/services";
import {STORE_PAYMENTS} from "@/store/mutations";
import {FETCH_PAYMENTS} from "@/store/actions";

const state = {
    payments: [],
    paymentsLength: 0,
    isLoading: true,
}

const getters = {
    payments(state) {
        return state.payments;
    },
    paymentsLength(state) {
        return state.paymentsLength;
    }
}

const actions = {
    async [FETCH_PAYMENTS]({commit}) {
        const paymentsResponse = await PaymentService.getPayments();
        commit(STORE_PAYMENTS, paymentsResponse.data);
    }
}

const mutations = {
    [STORE_PAYMENTS](state, payments) {
        state.payments = payments;
        state.paymentsLength = payments.length;
        state.isLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
