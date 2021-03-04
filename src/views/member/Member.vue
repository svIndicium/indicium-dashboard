<template>
    <div>
        <InnerSidebar title="Leden" :content="sidebar"></InnerSidebar>
        <div class="user">
            <div class="view-container">
                <Breadcrumbs />
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import InnerSidebar from '../../components/InnerSidebar';
import Breadcrumbs from '../../components/Breadcrumbs';
export default {
    name: 'Member',
    components: { Breadcrumbs, InnerSidebar },
    data: () => ({
    }),
    methods: {
        hasPermission(resource, role) {
            return this.resourceAccess[resource].roles.includes(role) ;
        },
    },
    computed: {
        resourceAccess() {
            return this.$store.state.user.resourceAccess;
        },
        sidebar() {
            const sidebar = [];
            if (this.hasPermission('ledenadministratie-api', 'manage-members')) {
                sidebar.push({
                    title: 'Leden',
                    routeName: 'memberDashboard'
                })
            }
            if (this.hasPermission('ledenadministratie-api', 'review-registrations')) {
                sidebar.push({
                    title: 'Aanmeldingen',
                    routeName: 'registrationOverview'
                })
            }
            if (this.hasPermission('ledenadministratie-api', 'manage-studytypes')) {
                sidebar.push({
                    title: 'Studierichtingen',
                    routeName: 'studyTypeOverview'
                })
            }
            return sidebar;
        }
    }
};
</script>

<style lang="scss" scoped>

.user {
    margin-left: var(--sidebar-width);
    background: var(--indi-blue-light);
    height: 100vh;
    padding: 24px;
}

.view-container {
    background-color: var(--panel-background);
    height: 100%;
    width: 100%;
    border-radius: 8px;
    padding: 24px;
    overflow-y: auto;
}
</style>
