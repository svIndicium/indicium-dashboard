<template>
    <v-card>
        <v-card-text>
            <v-switch
                @click="toggleDarkMode"
                :value="isDarkModeEnabled"
                :label="`Wil je van het dashboard genieten in darkmode?`"
            ></v-switch>
        </v-card-text>
    </v-card>
</template>

<script>
import {TOGGLE_DARK_MODE} from "@/store/actions";

export default {
    name: "ThemeSettings",
    methods: {
        async toggleDarkMode() {
             await this.$store.dispatch(TOGGLE_DARK_MODE, this.$vuetify);
        }
    },
    computed: {
        isDarkModeEnabled() {
            return this.$store.getters.isDarkModeEnabled;
        }
    }
}
</script>

<style scoped>

</style>
