import apiInstance from "@/assets/js/api";

class MailAddressService {

    api = apiInstance;

    async getMailAddressesByMemberId(memberId) {
        return await this.api.get(`/members/${memberId}/mailaddresses`);
    }
}
export default new MailAddressService();
