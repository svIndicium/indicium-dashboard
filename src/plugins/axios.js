import Vue from 'vue';
import axios from 'axios';

const instance = axios.create();

Vue.prototype.$http = instance;


const baseURL = process.env.VUE_APP_BRANCH === 'dev'
    ? 'https://lit.dev.indicium.hu/api/v1'
    : process.env.NODE_ENV === 'production' && process.env.VUE_APP_BRANCH === 'master'
        ? 'https://lit.indicium.hu/api/v1'
        : 'https://lit.dev.indicium.hu/api/v1';

const apiInstance = axios.create({ baseURL: baseURL });

apiInstance.defaults.headers.common.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;

Vue.prototype.$api = apiInstance;
