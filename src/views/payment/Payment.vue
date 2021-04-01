<template>
    <div>
        <InnerSidebar title="Betalingen" :content="sidebar"></InnerSidebar>
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
import {FETCH_PAYMENTS} from "@/store/actions";
export default {
    name: 'Payment',
    components: { Breadcrumbs, InnerSidebar },
    data: () => ({
    }),
    methods: {
        hasPermission(resource, role) {
            if (!this.resourceAccess[resource]) return false;
            return this.resourceAccess[resource].roles.includes(role) ;
        },
        async requestData() {
            await this.$store.dispatch(FETCH_PAYMENTS);
        }
    },
    async mounted() {
        await this.requestData();
    },
    computed: {
        resourceAccess() {
            return this.$store.state.user.resourceAccess;
        },
        sidebar() {
            const sidebar = [];
            if (this.hasPermission('payment-api', 'admin:payment')) {
                sidebar.push({
                    title: 'Overzicht',
                    routeName: 'paymentDashboard'
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
