<template>
    <v-breadcrumbs :items="breadcrumbList"></v-breadcrumbs>
</template>

<script>
export default {
    name: "Breadcrumbs",
    data: () => ({
        breadcrumbList: []
    }),
    mounted() {
        this.updateList();
    },
    watch: {
        $route() {
            this.updateList();
        }
    },
    methods: {
        routeTo(pRouteTo) {
            if (this.breadcrumbList[pRouteTo].routeName) {
                this.$router.push({name: this.breadcrumbList[pRouteTo].routeName});
            }
        },
        updateList() {
            this.breadcrumbList = this.$route.meta.breadcrumb;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
