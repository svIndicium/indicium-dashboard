<template>
    <div>
        <InnerSidebar title="Instellingen" :content="sidebar"></InnerSidebar>
        <div class="profile">
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
        name: 'Settings',
        components: {
            InnerSidebar,
            Breadcrumbs
        },
        data: () => ({
            sidebar: [
                {
                    title: 'Instellingen',
                    routeName: 'instellingendashboard',
                    children: [
                        {
                            title: 'Ledenadministratie',
                            routeName: 'appInstellingen',
                            params: {
                                app: 'ledenadministratie'
                            }
                        },
                    ]
                },
            ]
        })
    };
</script>

<style lang="scss" scoped>
    .profile {
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
