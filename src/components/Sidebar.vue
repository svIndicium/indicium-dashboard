<template>
    <v-navigation-drawer
        app
        clipped
        v-model="open"
    >
        <template v-slot:prepend v-if="isAuthenticated">
            <v-list-item two-line :to="{name: 'ProfileViewInfo'}">
                <v-list-item-avatar>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ userState }}</v-list-item-title>
                    <v-list-item-subtitle>Profiel</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider v-if="isAuthenticated"></v-divider>

        <v-list dense>
            <template
                v-for="item in allowedItems">
                <v-list-group
                    :key="item.title"
                    no-action
                    v-if="item.children"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="(subitem, i) in item.children"
                        :key="i"
                        link
                        :to="subitem.to"
                    >
                        <v-list-item-title v-text="subitem.title"></v-list-item-title>

                        <v-list-item-icon>
                            <v-icon v-text="subitem.icon"></v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-list-group>
                <v-list-item
                    :key="item.title"
                    @click="item.action"
                    :to="item.to"
                    v-else
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {LOGOUT} from "@/store/actions";

export default {
    components: {
    },
    data() {
        return {
            open: null,

        }
    },
    mounted() {
        this.$eventBus.$on('toggle-nav', this.toggleCollapse);
    },
    methods: {
        hasPermission(resource, role) {
            return this.$keycloak.hasResourceRole(role, resource);
        },
        toggleCollapse() {
            this.$set(this, 'open', !this.open);
            sessionStorage.setItem('sidebar-collapsed', this.open);
        },
        logout() {
            this.$store.dispatch(LOGOUT);
        },
        login() {
            this.$keycloak.login();
        },
    },
    computed: {
        allowedItems() {
            const items = [
                {
                    title: "Log in",
                    icon: "mdi-login",
                    action: this.login,
                    condition: () => !this.isAuthenticated
                },
                {
                    title: "Home",
                    icon: "mdi-home",
                    to: {
                        name: 'Home'
                    },
                    condition: () => this.isAuthenticated
                },
                {
                    title: "Leden",
                    condition: () => this.isAuthenticated,
                    children: [
                        {
                            title: "Ledenoverzicht",
                            icon: "mdi-account-group",
                            to: {
                                name: "MemberDashboard"
                            },
                            condition: () => this.isAuthenticated,
                        },
                        {
                            title: "Aanmeldingen",
                            icon: "mdi-account-multiple-plus",
                            to: {
                                name: "RegistrationDashboard"
                            },
                            condition: () => this.isAuthenticated,
                        },
                        {
                            title: "Studierichtingen",
                            icon: "mdi-sign-direction",
                            to: {
                                name: "StudyTypeDashboard"
                            },
                            condition: () => this.isAuthenticated,
                        },
                    ],
                },
                {
                    title: "Activiteiten",
                    condition: () => this.isAuthenticated,
                    children: [
                        {
                            title: "Overzicht",
                            icon: "mdi-calendar",
                            to: {
                                name: "EventDashboard"
                            },
                            condition: () => this.isAuthenticated,
                        },
                        {
                            title: "Agenda koppeling",
                            icon: "mdi-connection",
                            to: {
                                name: "AgendaConnection"
                            },
                            condition: () => this.isAuthenticated,
                        },
                    ],
                },
                {
                    title: "Betalingen",
                    condition: () => this.isAuthenticated,
                    children: [
                        {
                            title: "Overzicht",
                            icon: "mdi-currency-eur",
                            to: {
                                name: "PaymentDashboard"
                            },
                            condition: () => this.isAuthenticated,
                        },
                        {
                            title: "Overboekingen",
                            icon: "mdi-bank-transfer",
                            to: {
                                name: "PaymentListOpenTransfer"
                            },
                            condition: () => this.isAuthenticated,
                        },
                    ],
                },
                {
                    title: "Uitloggen",
                    icon: "mdi-logout",
                    action: this.logout,
                    condition: () => this.isAuthenticated
                },
            ]
            return items
                .filter((item) => item.condition && item.condition() !== false)
        },
        userState() {
            return this.$store.getters.name;
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    background-color: var(--indi-blue);
    padding: 48px 0 24px 24px;
    display: flex;
    flex-direction: column;
    transition: width 0.5s;

    position: fixed;
    left: 0;
    top: 0;

    &.collapsed {
        transition: width 0.5s;
        width: 100px;

        .logo > svg {
            overflow-x: hidden;
            height: 34.234px;
        }
    }

    .menu-items {
        flex: 1;
        margin-top: 24px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }

    .bottom-bar {
        @extend .menu-items;
        flex-direction: column-reverse;
    }

    .logo {
        margin-left: 8px;
        width: 200px;
    }
}
</style>
