import Vue from 'vue';
import axios from 'axios';
import { Service } from 'axios-middleware';
import DataMiddleware from '../middleware/DataMiddleware';
import AuthMiddleware from '../middleware/AuthMiddleware';

export function getInstance() {
    const baseURL = {
        live: 'https://api.indicium.hu/api/v1',
        dev: 'https://dev.api.indicium.hu/api/v1',
        local: 'http://localhost:8080/api/v1'
    }[process.env.VUE_APP_MODE || 'local']

    const apiInstance = axios.create({ baseURL });

    return apiInstance
}

export const apiInstance = getInstance()

export default {
    install(Vue) {
        // TODO voor joost. Service in api function voor los gebruik.
        const service = new Service(apiInstance);
        service.register([
            new DataMiddleware(),
            new AuthMiddleware(Vue.prototype.$keycloak, apiInstance),
        ]);

        const apiInstance = getInstance()
        Vue.prototype.$api = apiInstance;
    }
}
