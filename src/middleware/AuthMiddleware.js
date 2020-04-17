export default class AuthMiddleware {

    onRequest(config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }
}
