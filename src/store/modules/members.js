import MemberService from "@/services";
import {STORE_MEMBERS} from "@/store/mutations";
import {FETCH_MEMBERS} from "@/store/actions";

const state = {
    members: [],
    membersLength: 0,
    isLoading: true,
}

const getters = {
    members(state) {
        return state.members;
    },
    membersLength(state) {
        return state.membersLength;
    }
}

const actions = {
    async [FETCH_MEMBERS]({commit}) {
        const membersResponse = await MemberService.getMembers();
        commit(STORE_MEMBERS, membersResponse.data);
    }
}

const mutations = {
    [STORE_MEMBERS](state, members) {
        state.members = members;
        state.membersLength = members.length;
        state.isLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
