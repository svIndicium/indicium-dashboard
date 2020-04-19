<template>
    <div class="layout">
        <Sidebar />

        <div :class="['view', collapsed ? 'collapsed': '']">
            <BreadCrumbs />
            <h1>{{ this.$route.meta.title }}</h1>
            <div class="panel">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from "../components/Sidebar";
    import BreadCrumbs from '../components/Breadcrumbs';

    export default {
        name: "Layout",
        components: {
            Sidebar,
            BreadCrumbs
        },
        data: () => ({
            collapsed: false
        }),
        mounted() {
            this.$eventBus.$on('nav-toggle', payload => {
                this.$set(this, 'collapsed', payload)
            })
        },

    };
</script>

<style lang="scss">
    .view {
        height: 100vh;
        padding: 24px;
        margin-left: var(--sidebar-width);
        background: var(--inner-sidebar-background);
        transition: 0.5s;

        .panel {
            width: 100%;
            height: 100%;
            padding: 24px;
        }

        &.collapsed {
            margin-left: 100px;
            transition: 0.5s;
        }
    }
</style>
