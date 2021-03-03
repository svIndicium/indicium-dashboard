import Vue from 'vue';
import api from './plugins/axios';
import utils from './plugins/utils';
import services from './plugins/services';
import store from './store';
import './plugins/busje';
import App from './App.vue';
import router from './router';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';

Vue.config.productionTip = false;
const devEnv = process.env.VUE_APP_MODE !== 'live';

Vue.use(VueKeyCloak, {
    config: {
        realm: 'devindicium',
        url: 'https://auth.indicium.hu/auth',
        clientId: 'dashboard'
    },
    init: {
        onLoad: ''
    },
    onReady: kc => {
        localStorage.setItem('token', kc.token);
    }
});
Vue.use(api);
Vue.use(services);
Vue.use(utils);

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
