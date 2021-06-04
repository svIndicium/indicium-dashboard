import apiInstance from "@/assets/js/api";

class MailAddressService {

    api = apiInstance;

    async getMailAddressesByMemberId(memberId) {
        const response = await this.api.get(`/members/${memberId}/mailaddresses`);
        return response.data;
    }
}
export default new MailAddressService();
