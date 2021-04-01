import apiInstance from "@/assets/js/api";

class MemberService {

    api = apiInstance;

    async getMembers() {
        return await this.api.get("/members");
    }

    async getMemberById(memberId) {
        const memberResponse = await this.api.get(`/members/${memberId}`);
        return memberResponse.data;
    }
}
export default new MemberService();
