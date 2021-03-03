class MemberService {
    /**
     * @param {AxiosInstance} axios
     */
    constructor(axios) {
        this.api = axios;
    }

    async getMembers() {
        return await this.api.get("/members");
    }

    async getMemberById(memberId) {
        return await this.api.get(`/members/${memberId}`);
    }
}
export default MemberService;
