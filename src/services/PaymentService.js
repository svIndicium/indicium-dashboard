import apiInstance from "@/assets/js/api";

class PaymentService {

    api = apiInstance;

    async getPayments() {
        return await this.api.get("/payments");
    }

    async getPaymentsWithOpenTransferTransactions() {
        return await this.api.get("/payments/transfer");
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

    async addTransactionForPayment(paymentId, method, amount) {
        const res = await this.api.post(`/payments/${paymentId}/transactions`, {method, amount});
        return res.data;
    }

    async confirmTransferTransaction(paymentId, transactionId, transactionDetails) {
        const res = await this.api.put(`/payments/${paymentId}/transactions/${transactionId}/details`, {paid: transactionDetails.paid, transferredAt: transactionDetails.transferredAt, transactionStatus: "PAID", description: transactionDetails.description});
        return res.data;
    }
}

export default new PaymentService();
