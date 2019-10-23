import Vue from 'vue';
import axios from 'axios';

const instance = axios.create();

Vue.prototype.$http = instance;

const apiInstance = axios.create({
  baseURL: process.env.VUE_APP_BRANCH === 'dev' ? 'https://lit.dev.indicium.hu' : process.env.NODE_ENV === 'production' ? 'https://lit.indicium.hu' : 'http://localhost:8080',
});

apiInstance.defaults.headers.common.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;

Vue.prototype.$api = apiInstance;
