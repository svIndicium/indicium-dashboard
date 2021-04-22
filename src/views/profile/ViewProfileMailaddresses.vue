<template>
    <v-row>
        <v-col
            cols="12"
            md="3">
            <v-card>
                <v-card-title>Mailadres</v-card-title>
                <v-card-text>
                    <v-text-field v-model="mailAddresses[0].address" label="Primaire emailadres" disabled></v-text-field>
                    <v-checkbox v-model="mailAddresses[0].receivesNewsletter" label="Ontvangt nieuwsbrief" disabled></v-checkbox>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import StatusLabel from '../../components/StatusLabel';
    import Loading from '../../components/Loading';

    export default {
        name: 'ViewMailAddresses',
        computed: {
            mailAddresses() {
                return this.$store.state.user.member.mailAddresses;
            },
            mailAddressIsLoading() {
                return this.$store.state.user.mailAddressIsLoading;
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/table";
    @import "src/assets/scss/error";
    .table-container {
        @extend .table-container;
        grid-template-columns: 2fr 1fr 2fr;
    }
</style>
