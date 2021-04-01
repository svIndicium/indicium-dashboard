<template>
    <div>
        <h2>Betalingsoverzicht</h2>
        <div v-if="paymentsState.isLoading">
            <Loading />
        </div>
        <div v-else class="table-container">
            <div class="header">Datum</div>
            <div class="header">Bedrag</div>
            <div class="header">Beschrijving</div>
            <div class="header">Betaalstatus</div>
            <div class="header">Acties</div>
            <template v-for="(payment, idx) in paymentsState.payments">
                <div v-bind:key="'date' + idx">{{$utils.getPrettyDateTime(payment.createdAt)}}</div>
                <div v-bind:key="'amount' + idx">{{$utils.getPrettyCurrency(payment.amount)}}</div>
                <div v-bind:key="'description' + idx">{{payment.description}}</div>
                <div v-bind:key="'status' + idx">{{payment.status}}</div>
                <div v-bind:key="'actions' + idx"><Button size="m" class="button" @click="() => goToPayment(payment.id)">Go!</Button></div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: "ListPayment",
    methods: {
        async goToPayment(paymentId) {
            await this.$router.push({name: 'paymentView', params: {paymentId}});
        }
    },
    computed: {
        paymentsState() {
            return this.$store.state.payments;
        },
    },
}
</script>

<style lang="scss" scoped>

@import "src/assets/scss/table";
@import "src/assets/scss/error";
.table-container {
    @extend .table-container;
    max-width: 100%;
    grid-template-columns: 1fr 0.5fr 1fr 1fr 1fr;
}
</style>
