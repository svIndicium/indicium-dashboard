<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <Breadcrumbs />
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{this.user.name}}</v-card-title>
                    <v-tabs>
                        <v-tab
                            :to="{name: 'ProfileViewInfo'}"
                        >
                            <v-icon>mdi-information</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'ProfileViewMailAddresses'}"
                        >
                            <v-icon>mdi-at</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'ProfileViewMemberships'}"
                        >
                            <v-icon>mdi-wallet-membership</v-icon>
                        </v-tab>
                        <v-tab
                            :to="{name: 'ProfileViewPayments'}"
                        >
                            <v-icon>mdi-currency-eur</v-icon>
                        </v-tab>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
        <router-view></router-view>
    </v-container>
</template>

<script>
    import Breadcrumbs from '../../components/Breadcrumbs';
    import {FETCH_PROFILE} from "@/store/actions";
    export default {
        name: 'Profile',
        components: {
            Breadcrumbs
        },
        async mounted() {
            await this.$store.dispatch(FETCH_PROFILE);
        },
        computed: {
            user() {
                return this.$store.state.user.idTokenParsed;
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
