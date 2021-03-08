import store from '../store';

const isAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
    } else {
        store.watch(() => store.getters.isAuthenticated, () => {
            if (store.getters.isAuthenticated) {
                next();
            }
        });
    }
}

export {isAuthenticated};
