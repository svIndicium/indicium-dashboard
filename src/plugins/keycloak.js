import Vue from 'vue';
import keycloak from "@/assets/js/keycloak";

export default {
    install(Vue) {
        Vue.prototype.$keycloak = keycloak;

    }
};
