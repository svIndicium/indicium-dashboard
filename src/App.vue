<template>
    <v-app>
        <Sidebar />
        <v-app-bar color="primary" app clipped-left>

            <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

            <v-toolbar-title>
                Indicium
            </v-toolbar-title>
        </v-app-bar>
        <v-main
            class="grey lighten-4"
        >
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
    name: 'App',
    components: { Sidebar },
    mounted() {
    },
    methods: {
        toggleDrawer() {
            this.$eventBus.$emit('toggle-nav');
        }
    }
};
</script>

<style lang="scss">
</style>
