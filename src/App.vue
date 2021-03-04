<template>
    <Layout />
</template>

<script>
import Layout from './layout/Layout.vue';
import {INIT_KEYCLOAK} from "@/store/mutations";
import {REFRESH_TOKEN} from "@/store/actions";

export default {
    name: 'App',
    components: { Layout },
    mounted() {
        function getKey(key) {
            const value = localStorage.getItem(key);
            if (value === undefined || value === null || value === "undefined") {
                return undefined;
            }
            return value;
        }

        const initialOptions = {
            token: getKey("token"),
            idToken: getKey("idToken"),
            refreshToken: getKey("refreshToken")
        };

        this.$keycloak.init(initialOptions).then((auth) => {
            if (auth) {
                localStorage.setItem("token", this.$keycloak.token);
                localStorage.setItem("idToken", this.$keycloak.idToken);
                localStorage.setItem("refreshToken", this.$keycloak.refreshToken);
            }
            this.$store.commit(INIT_KEYCLOAK, this.$keycloak);
        }).catch(() => {
            console.error("Authenticated Failed");
        });

        this.$keycloak.updateToken(5).then((refreshed) => {
            this.$store.dispatch(REFRESH_TOKEN);
        })
    }
};
</script>

<style lang="scss">
@import "assets/scss/main";
</style>
