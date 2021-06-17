<template>
    <v-card>
        <v-card-title>
            Betalingsinstellingen
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col
                    :cols="12"
                    :md="4">
                    <v-text-field
                        label="Mollie API webhook"
                        :value="mollieWebhookUrl.value"
                        :hint="getHint(mollieWebhookUrl)"
                        persistent-hint
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    :cols="12"
                    :md="4">
                    <v-text-field
                        label="Mollie API key"
                        :value="mollieApiKey.value"
                        :hint="getHint(mollieApiKey)"
                        persistent-hint
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    :cols="12"
                    :md="4">
                    <v-btn
                        color="primary"
                    >Opslaan</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import {FETCH_SETTING} from "@/store/actions";

export default {
    name: "PaymentSettings",
    async mounted() {
        await this.$store.dispatch(FETCH_SETTING, {service: 'payments', setting: 'MOLLIE_API_KEY'})
        await this.$store.dispatch(FETCH_SETTING, {service: 'payments', setting: 'MOLLIE_WEBHOOK_URL'})
    },
    methods: {
        getHint(setting) {
            return `Laatst geupdated door ${setting.updatedBy} op ${this.$utils.getPrettyDateTime(setting.updatedAt)}`;
        },
    },
    computed: {
        mollieApiKey() {
            return this.$store.state.settings.settings.payments.MOLLIE_API_KEY;
        },
        mollieWebhookUrl() {
            return this.$store.state.settings.settings.payments.MOLLIE_WEBHOOK_URL;
        },
    }
}
</script>

<style scoped>

</style>
