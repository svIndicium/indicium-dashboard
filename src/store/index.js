import Vue from "vue";
import Vuex from "vuex";
import members from "@/store/modules/members";
import user from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        members,
        user
    }
})
