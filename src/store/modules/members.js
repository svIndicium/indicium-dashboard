import {MemberService} from "@/services";
import {STORE_MEMBERS} from "@/store/mutations";
import {FETCH_MEMBERS, RESET_STATE} from "@/store/actions";

const getDefaultState = () => {
    return {
        members: [],
        membersLength: 0,
        isLoading: true,
    }
}

const state = getDefaultState();

const getters = {
    members(state) {
        return state.members;
    },
    membersLength(state) {
        return state.membersLength;
    },
    getMemberById: (state) => (memberId) => {
        return state.members.find(member => member.id === memberId);
    }
}

const actions = {
    async [FETCH_MEMBERS]({commit}) {
        const membersResponse = await MemberService.getMembers();
        commit(STORE_MEMBERS, membersResponse.data);
    },
    [RESET_STATE](state) {
        Object.assign(state, getDefaultState())
    },
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
