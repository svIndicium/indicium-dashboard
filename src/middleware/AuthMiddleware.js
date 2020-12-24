export default class AuthMiddleware {

    constructor(auth, http) {
        this.auth = auth;
        this.http = http;
    }

    onRequest(config) {
        if (!config.hasRetriedRequest)
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    }

    onResponseError(err) {
        if (err.response.status === 401 && err.config && !err.config.hasRetriedRequest) {
            let token = this.auth.token;
            localStorage.setItem('token', token);
            return this.http({
                ...err.config,
                hasRetriedRequest: true,
                headers: {
                    ...err.config.headers,
                    Authorization: `Bearer ${token}`
                }
            })
        }
        throw err;
    }
}
