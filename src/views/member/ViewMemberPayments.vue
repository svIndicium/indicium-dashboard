<template>
    <v-row>
        <v-col
            cols="12"
            md="8">
            <v-card>
                <v-card-title>Betalingen</v-card-title>
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
</template>

<script>
export default {
    name: "ViewMemberPayments",
    props: [
        'payments'
    ],
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
        async viewPayment(paymentId) {
            await this.$router.push({name: 'PaymentView', params: {paymentId}});
        },
    }
}
</script>

<style scoped>

</style>
