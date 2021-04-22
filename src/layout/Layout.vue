<template>
    <div>
    </div>
</template>

<script>

export default {
    name: "Layout",
    components: {},
    methods: {
        toggleDrawer() {
            this.$eventBus.$emit('toggle-nav');
        }
    }

};
</script>

<style lang="scss">
</style>
