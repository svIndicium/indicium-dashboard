<template>
    <transition name="slide-fade" appear>
        <div class="sidebar">
            <h3 class="title">{{title}}</h3>
            <div class="menu-items">
                <template v-for="(item, idx) in content">
                    <InnerSidebarItem  :key="idx" :title="item.title" :route-name="item.routeName" />
                    <template v-for="(child, idx) in item.children">
                        <InnerSidebarItem  :key="idx" :title="child.title" :route-name="child.routeName" :child="true" />
                    </template>
                </template>
            </div>
        </div>
    </transition>
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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-enter {
        transform: translateX(-10px);
        opacity: 0;
    }
</style>
