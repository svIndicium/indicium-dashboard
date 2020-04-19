<template>
    <div class="layout">
        <Sidebar />

        <div :class="['view', collapsed ? 'collapsed': '']">
            <div class="panel">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from "../components/Sidebar";

    export default {
        name: "Layout",
        components: {
            Sidebar
        },
        data: () => ({
            collapsed: JSON.parse(sessionStorage.getItem('sidebar-collapsed')) || false
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
        margin-left: var(--sidebar-width);
        background: var(--inner-sidebar-background);
        transition: 0.5s;

        .panel {
            width: 100%;
            height: 100%;
        }

        &.collapsed {
            margin-left: 100px;
            transition: 0.5s;
        }
    }
</style>
