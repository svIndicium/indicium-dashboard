import Vue from 'vue';
import api from './plugins/axios';
import keycloak from "@/plugins/keycloak";
import utils from './plugins/utils';
import store from './store';
import './plugins/busje';
import App from './App.vue';
import router from './router';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

Vue.config.productionTip = false;
const devEnv = process.env.VUE_APP_MODE !== 'live';

Vue.use(api);
Vue.use(keycloak);
Vue.use(utils);

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
