import axios from "axios";
import {Service} from "axios-middleware";
import DataMiddleware from "@/middleware/DataMiddleware";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import keycloak from "@/assets/js/keycloak";

const baseURL = {
    live: 'https://api.indicium.hu/api/v1',
    dev: 'https://dev.api.indicium.hu/api/v1',
    local: 'http://localhost:8080/api/v1'
}[process.env.VUE_APP_MODE || 'local']

const apiInstance = axios.create({ baseURL });

const service = new Service(apiInstance);

service.register([
    new DataMiddleware(),
    new AuthMiddleware(keycloak, apiInstance),
]);

export default apiInstance;
