import {PaymentService} from "@/services";
import {STORE_OPEN_TRANSFER_PAYMENTS, STORE_PAYMENTS} from "@/store/mutations";
import {FETCH_OPEN_TRANSFER_PAYMENTS, FETCH_PAYMENTS, RESET_STATE} from "@/store/actions";


const getDefaultState = () => {
    return {
        payments: [],
        paymentsLength: 0,
        isLoading: true,
        openTransferPayments: [],
    }
}

const state = getDefaultState();

const getters = {
    payments(state) {
        return state.payments;
    },
    paymentsLength(state) {
        return state.paymentsLength;
    },
    getPaymentById: (state) => (paymentId) => {
        return state.payments.find(payment => payment.id === paymentId);
    }
}

const actions = {
    async [FETCH_PAYMENTS]({commit}) {
        const paymentsResponse = await PaymentService.getPayments();
        commit(STORE_PAYMENTS, paymentsResponse.data);
    },
    async [FETCH_OPEN_TRANSFER_PAYMENTS]({commit}) {
        const paymentsResponse = await PaymentService.getPaymentsWithOpenTransferTransactions();
        commit(STORE_OPEN_TRANSFER_PAYMENTS, paymentsResponse.data);
    },
    [RESET_STATE](state) {
        Object.assign(state, getDefaultState())
    },
}

const mutations = {
    [STORE_PAYMENTS](state, payments) {
        payments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        state.payments = payments;
        state.paymentsLength = payments.length;
        state.isLoading = false;
    },
    [STORE_OPEN_TRANSFER_PAYMENTS](state, payments) {
        payments.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        state.openTransferPayments = payments;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
