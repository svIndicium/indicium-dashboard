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
                    <v-card-title>{{payment.description}}</v-card-title>
                    <v-card-text>
                        Status: {{getStatusText(payment.status)}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Betalingsinformatie</v-card-title>
                    <v-card-text>
                        <v-text-field :value="this.$utils.getFullName(this.member.memberDetails.name)" label="Lid" disabled></v-text-field>
                        <v-text-field :value="this.$utils.getPrettyDateTime(this.payment.createdAt)" label="Aangemaakt op" disabled></v-text-field>
                        <v-text-field :value="this.$utils.getPrettyCurrency(this.payment.amount)" label="Bedrag" disabled></v-text-field>
                        <v-text-field :value="this.$utils.getPrettyCurrency(this.payment.openAmount)" label="Nog te voldoen" disabled v-if="payment.openAmount !== 0"></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-card-title>Transacties <ViewPaymentAddTransactionModal :open-amount="payment.openAmount" :payment-id="payment.id"></ViewPaymentAddTransactionModal></v-card-title>
                    <v-data-table :headers="transactionTable.headers" :items="transactions">
                        <template v-slot:[`item.createdAt`]="{ item }">
                            {{ $utils.getPrettyDateTime(item.createdAt) }}
                        </template>
                        <template v-slot:[`item.amount`]="{ item }">
                            {{ $utils.getPrettyCurrency(item.amount) }}
                        </template>
                        <template v-slot:[`item.type`]="{ item }">
                            {{ getPaymentMethod(item.type) }}
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip :color="getStatusColor(item.status)">
                                {{ getStatusText(item.status) }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <FinishTransferTransactionModal :transaction="item" :member="member" :payment="payment" v-if="item.type === 'TRANSFER' && item.status === 'PENDING'"></FinishTransferTransactionModal>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {MemberService, PaymentService} from "@/services";
import Breadcrumbs from "@/components/Breadcrumbs";
import ViewPaymentAddTransactionModal from "@/views/payment/ViewPaymentAddTransactionModal";
import FinishTransferTransactionModal from "@/views/payment/FinishTransferTransactionModal";

export default {
    name: "ViewPayment",
    components: {
        FinishTransferTransactionModal,
        ViewPaymentAddTransactionModal,
        Breadcrumbs,
    },
    data: () => ({
        paymentId: null,
        payment: null,
        member: null,
        transactions: [],
        transactionTable: {
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
                    text: 'Methode',
                    value: 'type'
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
    async mounted() {
        this.paymentId = this.$route.params.paymentId;
        await this.getPayment();
        await this.getTransactions();
        await this.getMember();
        this.$eventBus.$on('updateTransactions', () => {
            this.getTransactions().then();
        });
    },
    methods: {
        async getPayment() {
            this.payment = await PaymentService.getPaymentByPaymentId(this.paymentId);
        },
        async getTransactions() {
            this.transactions = await PaymentService.getTransactionsForPaymentId(this.paymentId);
        },
        async getMember() {
            this.member = await MemberService.getMemberById(this.payment.memberId);
        },
        getStatusText(status) {
            return {
                OPEN: 'Nog niet betaald',
                PENDING: 'In afwachting',
                PAID: 'Betaald',
                EXPIRED: 'Verlopen',
                FAILED: 'Mislukt'
            }[status];
        },
        getStatusColor(status) {
            return {
                OPEN: 'green',
                PENDING: 'orange',
                PAID: 'green',
                EXPIRED: 'red',
                FAILED: 'red'
            }[status];
        },
        getPaymentMethod(method) {
            return {
                CASH: 'Cash',
                TRANSFER: 'Overboeking',
                IDEAL: 'Mollie'
            }[method];
        },
        async goToMember() {
            await this.$router.push({name: 'MemberView', params: {memberId: this.member.id}});
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
