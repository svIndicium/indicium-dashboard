import Vue from 'vue';
import axios from 'axios';
import { Service } from 'axios-middleware';
import DataMiddleware from '../middleware/DataMiddleware';

const instance = axios.create();

Vue.prototype.$http = instance;


const baseURL = process.env.VUE_APP_BRANCH === 'dev'
    ? 'https://lit.dev.indicium.hu/api/v1'
    : process.env.NODE_ENV === 'production' && process.env.VUE_APP_BRANCH === 'master'
        ? 'https://lit.indicium.hu/api/v1'
        : 'https://lit.dev.indicium.hu/api/v1';

const apiInstance = axios.create({ baseURL: baseURL });

const service = new Service(apiInstance);

service.register([
    new DataMiddleware()
]);

apiInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

Vue.prototype.$api = apiInstance;
