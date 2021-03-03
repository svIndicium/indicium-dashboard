import Vue from 'vue'
import MemberService from '../services';

const services = {
    install: function (Vue) {
        Vue.prototype.$services = {
            members: new MemberService(Vue.prototype.$api)
        }
    }
};

export default services;
