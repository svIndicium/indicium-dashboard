import axios from "axios";
import {Service} from "axios-middleware";
import DataMiddleware from "@/middleware/DataMiddleware";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import keycloak from "@/auth/keycloak";

const baseURL = {
    production: 'https://api.indicium.hu/api/v1',
    testing: 'http://localhost/api/v1',
    development: 'https://dev.api.indicium.hu/api/v1'
}[process.env.NODE_ENV || 'development']

const apiInstance = axios.create({ baseURL });

const service = new Service(apiInstance);

service.register([
    new DataMiddleware(),
    new AuthMiddleware(keycloak, apiInstance),
]);

export default apiInstance;
