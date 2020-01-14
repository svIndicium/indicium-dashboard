import Vue from 'vue'

const utils = {}
utils.install = function (Vue) {
    const utils = {
        routeMatch(currentRoute, tomatch) {
            console.log('route match util jonge');
        }
    };
    Vue.prototype.$utils = utils;
};


Vue.use(utils);
