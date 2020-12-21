<template>
    <div>
        <InnerSidebar title="Activiteiten" :content="sidebar"></InnerSidebar>
        <div class="events">
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
        name: 'Events',
        components: { Breadcrumbs, InnerSidebar },
        data: () => ({
            sidebar: [
                {
                    title: 'Overzicht',
                    routeName: 'eventDashboard'
                },
                {
                    title: 'Koppelen met agenda',
                    routeName: 'agendaConnection'
                },
            ]
        })
    };
</script>

<style lang="scss" scoped>

    .events {
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
