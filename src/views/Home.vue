<template>
    <v-container>
        <v-card>
            <v-card-title>
                Dashboard
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script>

    export default {
        components: {
        },
        methods: {
            login() {
                this.$keycloak.login();
            },
            logout() {
                this.$keycloak.logoutFn();
            },
        },
    };
</script>
