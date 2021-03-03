import Keycloak from "keycloak-js";

let initOptions = {
    url: 'https://auth.indicium.hu/auth', realm: 'botss', clientId: 'botss-management'
}

const keycloak = Keycloak(initOptions);

function getKey(key) {
    const value = localStorage.getItem(key);
    if (value === undefined || value === null || value === "undefined") {
        return undefined;
    }
    return value;
}

const initialOptions = {
    onLoad: initOptions.onLoad,
    token: getKey("accessToken"),
    idToken: getKey("idToken"),
    refreshToken: getKey("refreshToken")
};

keycloak.init(initialOptions).then((auth) => {
    if (auth) {
        localStorage.setItem("accessToken", keycloak.token);
        localStorage.setItem("idToken", keycloak.idToken);
        localStorage.setItem("refreshToken", keycloak.refreshToken);
    }
}).catch(() => {
    console.error("Authenticated Failed");
});

export default keycloak;
