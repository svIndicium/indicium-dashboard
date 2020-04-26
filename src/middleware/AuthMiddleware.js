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
            return this.auth.getTokenSilently()
                .then((token) => {
                    this.http({
                            ...err.config,
                            hasRetriedRequest: true,
                            headers: {
                                ...err.config.headers,
                                Authorization: `Bearer ${token}`
                            }
                        })
                    localStorage.setItem('token', token);
                    }
                )
                .catch((error) => {
                    throw error;
                });
        }
        throw err;
    }
}
