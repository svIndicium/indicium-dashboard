import apiInstance from "@/assets/js/api";

class MemberService {

    api = apiInstance;

    async getMembers() {
        return await this.api.get("/members");
    }

    async getMemberById(memberId) {
        return await this.api.get(`/members/${memberId}`);
    }
}
export default new MemberService();
