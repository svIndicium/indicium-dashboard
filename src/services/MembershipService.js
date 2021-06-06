import apiInstance from "@/assets/js/api";

class MembershipService {

    api = apiInstance;

    async getMembershipsByMemberId(memberId) {
        const memberResponse = await this.api.get(`/members/${memberId}/memberships`);
        return memberResponse.data;
    }
}
export default new MembershipService();
