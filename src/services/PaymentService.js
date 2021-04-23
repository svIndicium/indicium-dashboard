import apiInstance from "@/assets/js/api";

class PaymentService {

    api = apiInstance;

    async getPayments() {
        return await this.api.get("/payments");
    }

    async getPaymentsForMemberId(memberId) {
        const response = await this.api.get(`/members/${memberId}/payments`);
        return response.data;
    }

    async getPaymentByPaymentId(paymentId) {
        const response = await this.api.get(`/payments/${paymentId}`);
        return response.data;
    }

    async getTransactionsForPaymentId(paymentId) {
        const response = await this.api.get(`/payments/${paymentId}/transactions`);
        return response.data;
    }

    async createIDealTransactionForPaymentId(paymentId, amount, description, redirectUrl) {
        const res = await this.api.post(`/payments/${paymentId}/transactions`, {method: 'ideal', amount, description, redirectUrl});
        return res.data;
    }

    async addCashTransactionForPaymentId(paymentId, amount) {
        const res = await this.api.post(`/payments/${paymentId}/transactions`, {method: 'cash', amount});
        return res.data;
    }
}

export default new PaymentService();
