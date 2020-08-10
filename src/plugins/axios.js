import Vue from 'vue';
import axios from 'axios';
import { Service } from 'axios-middleware';
import DataMiddleware from '../middleware/DataMiddleware';
import AuthMiddleware from '../middleware/AuthMiddleware';

const api = {}
api.install = function (Vue) {
    const baseURL = process.env.VUE_APP_MODE === 'live'
        ? 'https://api.indicium.hu/api/v1'
        : process.env.VUE_APP_MODE === 'dev'
            ? 'https://dev.api.indicium.hu/api/v1'
            : 'https://localhost:8080/api/v1';

    const apiInstance = axios.create({ baseURL: baseURL });

    const service = new Service(apiInstance);

    service.register([
        new DataMiddleware(),
        new AuthMiddleware(Vue.prototype.$auth, apiInstance),
    ]);
    Vue.prototype.$api = apiInstance;
};

export default api;
