import apiInstance from "@/assets/js/api";

class PaymentService {

    api = apiInstance;

    async getPayments() {
        return await this.api.get("/payments");
    }

    async getPaymentsForMemberId(memberId) {
        return await this.api.get(`/members/${memberId}/payments`);
    }

    async getTransactionsForPaymentId(paymentId) {
        return await this.api.get(`/payments/${paymentId}/transactions`);
    }

    async createIDealTransactionForPaymentId(paymentId, amount, description, redirectUrl) {
        const res = await this.$api.post(`/payments/${paymentId}/transactions`, {method: 'ideal', amount, description, redirectUrl: 'https://google.com'});
        return res.data;
    }
}

export default new PaymentService();
