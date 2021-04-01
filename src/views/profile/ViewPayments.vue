<template>
    <div>
        <div class="table-container">
            <div class="header">Datum</div>
            <div class="header">Bedrag</div>
            <div class="header">Beschrijving</div>
            <div class="header">Betaalstatus</div>
            <div class="header">Nog verschuldigt</div>
            <div class="header">Acties</div>
            <template v-for="(payment, idx) in member.payments">
                <div v-bind:key="'date' + idx">{{$utils.getPrettyDateTime(payment.createdAt)}}</div>
                <div v-bind:key="'amount' + idx">{{$utils.getPrettyCurrency(payment.amount)}}</div>
                <div v-bind:key="'description' + idx">{{payment.description}}</div>
                <div v-bind:key="'status' + idx">{{payment.status}}</div>
                <div v-bind:key="'rest' + idx">{{$utils.getPrettyCurrency(payment.remainingAmount)}}</div>
                <div v-bind:key="'actions' + idx"><Button size="m" class="button" @click.native="() => createIDealTransactionForPayment(payment.id, payment.remainingAmount, payment.description)">IDEAL</Button></div>
            </template>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button";
import {PaymentService} from "@/services";

export default {
    name: "ViewPayments",
    components: {
        Button,
    },
    methods: {
        async createIDealTransactionForPayment(paymentId, amount, description) {
            const transaction = PaymentService.createIDealTransactionForPaymentId(paymentId, amount, description, 'https://www.google.com');
            window.location.href = transaction.checkoutUrl;
        }
    },
    computed: {
        member() {
            return this.$store.state.user.member;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/table";
@import "src/assets/scss/error";
.table-container {
    @extend .table-container;
    max-width: 100%;
    grid-template-columns: 1fr 0.5fr 1fr 1fr 1fr 1fr;
}
</style>
