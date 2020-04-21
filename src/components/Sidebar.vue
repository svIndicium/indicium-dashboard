<template>
    <div :class="['sidebar', collapsed ? 'collapsed' : '']">
        <div class="logo">
            <Logo fill-color="white" :subname="false" :name="!collapsed"/>
        </div>

        <div class="menu-items" v-if="!$auth.loading">
            <template v-if="$auth.isAuthenticated">
                <SidebarItem :title="$auth.user.name" route-name="gebruikersprofiel" :img-url="$auth.user.picture" :collapsed="collapsed"></SidebarItem>
                <SidebarItem title="Leden" route-name="userDashboard" icon="user" v-if="hasPermission('admin:user')" :collapsed="collapsed"></SidebarItem>
<!--                <SidebarItem title="Activiteiten" route-name="/activiteiten" icon="calendar" :collapsed="collapsed"></SidebarItem>-->
            </template>
            <template v-else>
                <SidebarItem title="Login" :callback="login" icon="login" :collapsed="collapsed"></SidebarItem>
            </template>
        </div>

        <div class="bottom-bar">
            <SidebarItem title="Uitloggen" icon="logout" :callback="logout" :collapsed="collapsed" v-if="$auth.isAuthenticated"></SidebarItem>
            <SidebarItem title="Instellingen" icon="settings" route-name="instellingenDashboard" :collapsed="collapsed" v-if="$auth.isAuthenticated"></SidebarItem>
            <SidebarItem :title="collapsed ? 'Uitvouwen' : 'Invouwen'" :icon="collapsed ? 'chevron-right' : 'chevron-left'" :callback="toggleCollapse" :collapsed="collapsed"></SidebarItem>
        </div>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem';
import Logo from './Logo';

export default {
    components: {
        Logo,
        SidebarItem
    },
    data() {
       return {
           user: {},
           token: {},
           collapsed: JSON.parse(sessionStorage.getItem('sidebar-collapsed')) || false
       }
    },
    mounted() {
    },
    methods: {
        hasPermission(permission) {
            return this.$auth.hasPermission(permission);
        },
        toggleCollapse() {
            this.$set(this, 'collapsed', !this.collapsed);
            sessionStorage.setItem('sidebar-collapsed', this.collapsed);
            this.$eventBus.$emit('nav-toggle', this.collapsed);
        },
        logout() {
            this.$auth.logout();
        },
        login() {
            this.$auth.loginWithRedirect();
        },
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
