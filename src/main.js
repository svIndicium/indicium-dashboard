import Vue from 'vue';
import './plugins/axios';
import './plugins/busje';
import App from './App.vue';
import router from './router';

import { domain, clientId, audience } from '../auth_config';
import { domain as devDomain, clientId as devClientId, audience as devAudience } from '../auth_config_dev';

import { Auth0Plugin } from './auth';

Vue.config.productionTip = false;

console.log(process.env.TRAVIS_BRANCH);

if (process.env.VUE_APP_BRANCH === 'master' && process.env.NODE_ENV === 'production') {
  Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname,
      );
    },
  });
} else {
  Vue.use(Auth0Plugin, {
    domain: devDomain,
    clientId: devClientId,
    audience: devAudience,
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname,
      );
    },
  });
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
