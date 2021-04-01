<template>
    <div :class="['sidebar', collapsed ? 'collapsed' : '']">
        <div class="logo">
            <Logo fill-color="white" :subname="false" :name="!collapsed"/>
        </div>

        <div class="menu-items">
            <template v-if="userState.isAuthenticated">
                <SidebarItem :title="userState.name" icon="user" route-name="profile" :collapsed="collapsed"></SidebarItem>
                <SidebarItem title="Leden" route-name="memberDashboard" icon="users" v-if="hasPermission('ledenadministratie-api', 'manage-members')" :collapsed="collapsed"></SidebarItem>
                <SidebarItem title="Betalingen" route-name="paymentDashboard" icon="currency-euro" v-if="hasPermission('payment-api', 'admin:payment')" :collapsed="collapsed"></SidebarItem>
                <SidebarItem title="Activiteiten" route-name="eventDashboard" icon="calendar" :collapsed="collapsed"></SidebarItem>
            </template>
            <template v-else>
                <SidebarItem title="Login" :callback="login" icon="login" :collapsed="collapsed"></SidebarItem>
            </template>
        </div>

        <div class="bottom-bar">
            <SidebarItem title="Uitloggen" icon="logout" :callback="logout" :collapsed="collapsed" v-if="userState.isAuthenticated"></SidebarItem>
            <SidebarItem title="Instellingen" icon="settings" route-name="instellingenDashboard" :collapsed="collapsed" v-if="userState.isAuthenticated"></SidebarItem>
            <SidebarItem :title="collapsed ? 'Uitvouwen' : 'Invouwen'" :icon="collapsed ? 'chevron-right' : 'chevron-left'" :callback="toggleCollapse" :collapsed="collapsed"></SidebarItem>
        </div>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem';
import Logo from './Logo';
import {LOGOUT} from "@/store/actions";

export default {
    components: {
        Logo,
        SidebarItem
    },
    data() {
       return {
           collapsed: JSON.parse(sessionStorage.getItem('sidebar-collapsed')) || false
       }
    },
    mounted() {
    },
    methods: {
        hasPermission(resource, role) {
            return this.$keycloak.hasResourceRole(role, resource);
        },
        toggleCollapse() {
            this.$set(this, 'collapsed', !this.collapsed);
            sessionStorage.setItem('sidebar-collapsed', this.collapsed);
            this.$eventBus.$emit('nav-toggle', this.collapsed);
        },
        logout() {
            this.$store.dispatch(LOGOUT);
        },
        login() {
            this.$keycloak.login();
        },
    },
    computed: {
        userState() {
            return this.$store.state.user;
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
