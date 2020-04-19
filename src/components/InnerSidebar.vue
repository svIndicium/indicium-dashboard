<template>
    <div class="sidebar">
        <h3 class="title">{{title}}</h3>
        <div class="menu-items">
            <InnerSidebarItem v-for="(item, idx) in content" :key="idx" :title="item.title" :route-name="item.routeName"/>
        </div>
    </div>
</template>

<script>
    import InnerSidebarItem from './InnerSidebarItem';
    export default {
        name: 'InnerSidebar',
        components: { InnerSidebarItem },
        props: {
            title: {
                type: String,
                required: false
            },
            content: {
                type: Array,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .sidebar {
        width: var(--sidebar-width);
        padding: 48px 0 24px 24px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        transition: 0.5s;

        position: fixed;

        .title {
            text-transform: capitalize;
        }

        .menu-items {
            flex: 1;
            margin-top: 24px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
        }
    }
</style>
