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
                    <v-card-title>
                        Betalingen
                        <v-spacer>
                        </v-spacer>
                        <UploadTransferCsvModal></UploadTransferCsvModal>
                    </v-card-title>
                    <v-data-table :headers="table.headers" :items="payments">
                        <template v-slot:[`item.createdAt`]="{ item }">
                            {{ $utils.getPrettyDateTime(item.createdAt) }}
                        </template>
                        <template v-slot:[`item.amount`]="{ item }">
                            {{ $utils.getPrettyCurrency(item.amount) }}
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip :color="getStatusColor(item.status)">
                                {{ getStatusText(item.status) }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn @click="() => viewPayment(item.id)" icon>
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs";
import {FETCH_OPEN_TRANSFER_PAYMENTS} from "@/store/actions";
import UploadTransferCsvModal from "@/views/payment/UploadTransferCsvModal";

export default {
    name: "ViewTransferPayments",
    components: {UploadTransferCsvModal, Breadcrumbs },
    data: () => ({
        table: {
            headers: [
                {
                    text: 'Datum',
                    value: 'createdAt'
                },
                {
                    text: 'Bedrag',
                    value: 'amount'
                },
                {
                    text: 'Beschrijving',
                    value: 'description'
                },
                {
                    text: 'Status',
                    value: 'status'
                },
                {
                    text: 'Acties',
                    value: 'actions'
                },
            ]
        }
    }),
    methods: {
        hasPermission(resource, role) {
            return this.$store.getters.hasPermission(resource, role);
        },
        async requestData() {
            await this.$store.dispatch(FETCH_OPEN_TRANSFER_PAYMENTS);
        },
        async viewPayment(paymentId) {
            await this.$router.push({name: 'PaymentView', params: {paymentId}});
        },
        getStatusText(status) {
            return {
                OPEN: 'Nog niet betaald',
                PENDING: 'In afwachting',
                PAID: 'Betaald',
                EXPIRED: 'Verlopen'
            }[status];
        },
        getStatusColor(status) {
            return {
                OPEN: 'green',
                PENDING: 'orange',
                PAID: 'green',
                EXPIRED: 'red'
            }[status];
        },
    },
    async mounted() {
        await this.requestData();
    },
    computed: {
        payments() {
            return this.$store.state.payments.openTransferPayments;
        },
    }
}
</script>

<style scoped>

</style>
