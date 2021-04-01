<template>
    <div>
        <div v-if="loading">
            <Loading />
        </div>
        <div v-else>
            <h2>{{ payment.description }}</h2>
            <StatusLabel status="success">{{payment.status}}</StatusLabel>
            <div class="section">
                <div class="section-entry">
                    <p class="key">Totaalbedrag</p>
                    <p class="value">{{$utils.getPrettyCurrency(payment.amount)}}</p>
                </div>
                <div class="section-entry">
                    <p class="key">Aangemaakt op</p>
                    <p class="value">{{$utils.getPrettyDateTime(payment.createdAt)}}</p>
                </div>
                <div class="section-entry" v-if="member">
                    <p class="key">Behoort tot</p>
                    <p class="value">{{$utils.getFullName(member.memberDetails.name)}}</p>
                </div>
            </div>
            <TransactionCard v-for="(transaction, idx) in transactions" :key="idx" :transaction="transaction"></TransactionCard>
        </div>
    </div>
</template>

<script>
import {MemberService, PaymentService} from "@/services";
import StatusLabel from "@/components/StatusLabel";
import TransactionCard from "@/components/TransactionCard";

export default {
    name: "ViewPayment",
    components: {
        TransactionCard,
        StatusLabel,
    },
    data: () => ({
        loading: true,
        payment: null,
        member: null,
        transactions: null,
    }),
    async mounted() {
        this.getPayment();
        await this.getTransactions();
        await this.getMember();
    },
    methods: {
        getPayment() {
            const paymentId = this.$route.params.paymentId;
            this.payment = this.$store.getters.getPaymentById(paymentId);
            this.loading = false;
        },
        async getTransactions() {
            const paymentId = this.$route.params.paymentId;
            this.transactions = await PaymentService.getTransactionsForPaymentId(paymentId);
        },
        async getMember() {
            this.member = await MemberService.getMemberById(this.payment.memberId);
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
    grid-template-columns: 1fr 0.5fr 1fr 1fr 1fr;
}

.section {
    max-width: 600px;

    .section-header {
        margin-top: 24px;
        font-weight: 300;
        font-size: 16px;
        text-transform: uppercase;
    }

    .section-entry {
        padding-top: 8px;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        .key {
        }

        .value {
            font-weight: 300;
        }

        .error {
            color: red;
        }
    }

    .action-buttons {
        display: flex;
        justify-content: flex-end;
    }

}
</style>
