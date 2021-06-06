<template>
    <div>
        <h2>Betalingsoverzicht</h2>
        <div v-if="paymentsState.isLoading">
            <Loading />
        </div>
        <v-data-table :headers="table.headers" :items="paymentsState.payments">
            <template v-slot:item.createdAt="{ item }">
                {{ $utils.getPrettyDateTime(item.createdAt) }}
            </template>
            <template v-slot:item.amount="{ item }">
                {{ $utils.getPrettyCurrency(item.amount) }}
            </template>
            <template v-slot:item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)">
                    {{ getStatusText(item.status) }}
                </v-chip>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: "ListPayment",
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
            ]
        }
    }),
    methods: {
        async goToPayment(paymentId) {
            await this.$router.push({name: 'paymentView', params: {paymentId}});
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
    computed: {
        paymentsState() {
            return this.$store.state.payments;
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
