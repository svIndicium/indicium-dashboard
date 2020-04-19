<template>
    <div>
        <InnerSidebar title="leden" :content="sidebar"></InnerSidebar>
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
        name: 'User',
        components: { Breadcrumbs, InnerSidebar },
        data: () => ({
            sidebar: [
                {
                    title: 'leden',
                    routeName: 'ledenoverzicht'
                },
                {
                    title: 'aanmeldingen',
                    routeName: 'listStudyType',
                    children: [
                        {
                            title: 'nog te behandelen',
                            routeName: 'ledenoverzicht'
                        },
                    ]
                },
            ]
        })
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
    }
</style>
