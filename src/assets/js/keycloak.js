import Keycloak from "keycloak-js";

let initOptions = {
    url: 'https://auth.indicium.hu/auth', realm: 'devindicium', clientId: 'dashboard'
}

const keycloak = Keycloak(initOptions);


export default keycloak;
