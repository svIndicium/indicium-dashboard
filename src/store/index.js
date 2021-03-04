import Vue from "vue";
import Vuex from "vuex";
import members from "@/store/modules/members";
import studyTypes from "@/store/modules/studyTypes";
import user from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        members,
        studyTypes,
        user
    }
})
