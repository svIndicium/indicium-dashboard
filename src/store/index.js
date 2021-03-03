import Vue from "vue";
import Vuex from "vuex";
import MemberService from "@/services";

Vue.use(Vuex);

const state = {
    members: []
}

//to handle state
const getters = {}

//to handle actions
const actions = {
    async getAllMembers({commit}) {
        commit('getAllMembers', await MemberService.getMembers());
    }
}

//to handle mutations
const mutations = {
    getAllMembers(state, members) {
        state.members = members;
    }
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
