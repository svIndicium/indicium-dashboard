import Vue from 'vue';
import apiInstance from "@/assets/js/api";

export default {
    install(Vue) {
        Vue.prototype.$api = apiInstance;
    }
};
