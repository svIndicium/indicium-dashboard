import Vue from 'vue';
import api from './plugins/axios';
import utils from './plugins/utils';
import './plugins/busje';
import App from './App.vue';
import router from './router';

import { domain, clientId, audience } from '../auth_config';
import { domain as devDomain, clientId as devClientId, audience as devAudience } from '../auth_config_dev';

import { Auth0Plugin } from './auth';

Vue.config.productionTip = false;
const devEnv = !(process.env.VUE_APP_LIVE === 'true' || (process.env.VUE_APP_BRANCH === 'master' && process.env.NODE_ENV === 'production'));


const requiredScopes = {
    ledenadministratie: [
        "create:user",
        "admin:user",
        "read:user",
        "create:studyType",
        "read:mailchimp_settings",
        "write:mailchimp_settings",
        "read:sendgrid_settings",
        "write:sendgrid_settings",
        "read:auth0_settings",
        "write:auth0_settings",
        "read:settings"
    ],
    eventmanager: [
        "write:event",
        "read:event",
        "delete:event"
    ]
}
Vue.use(Auth0Plugin, {
    domain: devEnv ? devDomain : domain,
    clientId: devEnv ? devClientId : clientId,
    audience: devEnv ? devAudience : audience,
    scopes: requiredScopes,
    onRedirectCallback: (appState) => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname,
        );
    },
});

Vue.use(api);
Vue.use(utils);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
