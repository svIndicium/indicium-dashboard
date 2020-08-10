<template>
    <div class="breadcrumb">
        <ul>
            <li
                v-for="(breadcrumb, idx) in breadcrumbList"
                :key="idx"
                @click="routeTo(idx)"
                :class="{'linked': !!breadcrumb.routeName}"
            >{{breadcrumb.name}}</li>
        </ul>
    </div>
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
.breadcrumb {
    margin-bottom: 12px;

    ul {
        display: flex;

        li:not(:first-child):before {
            content: "/";
            margin-left: 3px;
        }

        li.linked {
            cursor: pointer;
        }

        li:not(.linked) {
            font-weight: 500;
        }
    }
}
</style>
