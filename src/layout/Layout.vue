<template>
    <div class="layout">
        <Sidebar />

        <div class="view">
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
    }
};
</script>

<style lang="scss">
.view {
    margin-left: var(--sidebar-width);
    padding: 24px;

    .panel {
        background: var(--panel-background);
        width: 100%;
        height: 100%;
        padding: 24px;
    }
}
</style>
