import Vue from 'vue';
import api from './plugins/axios';
import keycloakPlugin from "@/plugins/keycloak";
import utils from './plugins/utils';
import store from './store';
import './plugins/busje';
import App from './App.vue';
import router from './router';
import {REFRESH_TOKEN} from "@/store/actions";
import {INIT_KEYCLOAK} from "@/store/mutations";
import keycloak from "@/auth/keycloak";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;
const devEnv = process.env.VUE_APP_MODE !== 'live';

Vue.use(api);
Vue.use(keycloakPlugin);
Vue.use(utils);

function getKey(key) {
    const value = localStorage.getItem(key);
    if (value === undefined || value === null || value === "undefined") {
        return undefined;
    }
    return value;
}

const initialOptions = {
    token: getKey("token"),
    idToken: getKey("idToken"),
    refreshToken: getKey("refreshToken")
};

keycloak.init(initialOptions).then((auth) => {
    if (auth) {
        keycloak.updateToken(5).then((refreshed) => {
            store.dispatch(REFRESH_TOKEN, keycloak).then();
        })
    }
    store.commit(INIT_KEYCLOAK, keycloak);
}).catch(() => {
});

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app');
