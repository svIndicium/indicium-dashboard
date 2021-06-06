import Keycloak from "keycloak-js";

const realm = {
    production: 'indicium',
    testing: 'devindicium',
    development: 'devindicium',
}[process.env.NODE_ENV || 'testing']

let initOptions = {
    url: 'https://auth.indicium.hu/auth', realm, clientId: 'dashboard'
}

const keycloak = Keycloak(initOptions);


export default keycloak;
