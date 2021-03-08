import Vue from 'vue';
import keycloak from "@/auth/keycloak";

export default {
    install(Vue) {
        Vue.prototype.$keycloak = keycloak;
    }
};
