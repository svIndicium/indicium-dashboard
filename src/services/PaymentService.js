import apiInstance from "@/assets/js/api";

class PaymentService {

    api = apiInstance;

    async getPayments() {
        return await this.api.get("/payments");
    }

    async getPaymentsForMemberId(memberId) {
        return await this.api.get(`/members/${memberId}/payments`);
    }
}

export default new PaymentService();
