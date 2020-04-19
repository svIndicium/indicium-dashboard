<template>
    <div>
        <InnerSidebar title="leden" :content="sidebar"></InnerSidebar>
        <div class="user">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import InnerSidebar from '../../components/InnerSidebar';
    export default {
        name: 'User',
        components: { InnerSidebar },
        data: () => ({
            sidebar: [
                {
                    title: 'leden',
                    routeName: 'Ledenoverzicht'
                },
                {
                    title: 'commissie leden',
                    routeName: 'listStudyType'
                },
                {
                    title: 'alumni',
                    routeName: 'listStudyType'
                },
                {
                    title: 'aanmeldingen',
                    routeName: 'listStudyType'
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
    }
</style>
