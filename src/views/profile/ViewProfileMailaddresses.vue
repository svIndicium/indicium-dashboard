<template>
    <v-row>
        <v-col
            cols="12"
            md="3">
            <v-card>
                <v-card-title>Mailadres</v-card-title>
                <v-card-text>
                    <v-text-field :value="mailAddresses[0].address" label="Primaire emailadres" disabled></v-text-field>
                    <v-checkbox :value="mailAddresses[0].receivesNewsletter" label="Ontvangt nieuwsbrief" disabled></v-checkbox>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

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
</style>
