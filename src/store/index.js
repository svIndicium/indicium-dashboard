import Vue from "vue";
import Vuex from "vuex";
import members from "@/store/modules/members";
import studyTypes from "@/store/modules/studyTypes";
import user from "@/store/modules/user";
import registrations from "@/store/modules/registrations";
import events from "@/store/modules/events";
import payments from "@/store/modules/payments";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        members,
        events,
        studyTypes,
        registrations,
        user,
        payments,
    }
})
