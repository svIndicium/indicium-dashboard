<template>
    <v-row>
        <v-col
            cols="12"
            md="8">
            <v-card>
                <v-card-title>Betalingen</v-card-title>
                <v-data-table
                    :headers="table.headers"
                    :items="member.payments"
                    :expanded.sync="expanded"
                    ref="paymenttable"
                    show-expand
                    single-expand
                >
                    <template v-slot:[`item.createdAt`]="{ item }">
                        {{ $utils.getPrettyDateTime(item.createdAt) }}
                    </template>
                    <template v-slot:[`item.amount`]="{ item }">
                        {{ $utils.getPrettyCurrency(item.amount) }}
                    </template>
                    <template v-slot:[`item.openAmount`]="{ item }">
                        {{ $utils.getPrettyCurrency(item.openAmount) }}
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip :color="getStatusColor(item.status)">
                            {{ getStatusText(item.status) }}
                        </v-chip>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <h3>Info</h3>
                                        <v-text-field :value="$utils.getPrettyCurrency(item.amount)" label="Totaalbedrag" disabled></v-text-field>
                                        <v-text-field :value="$utils.getPrettyCurrency(item.openAmount)" label="Nog te voldoen" disabled></v-text-field>
                                        <template v-if="item.openAmount !== 0">
                                            <v-btn color="primary" @click="() => createIDealTransactionForPayment(item)">iDeal</v-btn>
                                            <RequestTransferTransactionModal :payment="item"></RequestTransferTransactionModal>
                                        </template>

                                    </v-col>
                                    <v-col>
                                        <h3>Transacties</h3>
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <thead>
                                                <tr>
                                                    <th class="text-left">
                                                        Datum
                                                    </th>
                                                    <th class="text-left">
                                                        Bedrag
                                                    </th>
                                                    <th class="text-left">
                                                        Methode
                                                    </th>
                                                    <th class="text-left">
                                                        Status
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="(transaction, idx) in transactions[item.id]" :key="idx">
                                                    <td>{{ $utils.getPrettyDateTime(transaction.createdAt) }}</td>
                                                    <td>{{ $utils.getPrettyCurrency(transaction.amount) }}</td>
                                                    <td>{{transaction.paymentProvider}}</td>
                                                    <td>
                                                        <v-chip :color="getStatusColor(transaction.status)">
                                                            {{ getStatusText(transaction.status) }}
                                                        </v-chip>
                                                        </td>
                                                </tr>
                                                <tr v-if="transactions[item.id] === undefined">
                                                    <td>
                                                        Geen transacties gevonden
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {PaymentService} from "@/services";
import RequestTransferTransactionModal from "@/views/profile/RequestTransferTransactionModal";

export default {
    name: "ViewPayments",
    components: {RequestTransferTransactionModal},
    data: () => ({
        expanded: {},
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
                    text: 'Nog te voldoen',
                    value: 'openAmount'
                },
            ]
        },
        transactions: {}
    }),
    methods: {
        async createIDealTransactionForPayment(payment) {
            const transaction = await PaymentService.createIDealTransactionForPaymentId(payment.id, payment.amount, payment.description, 'https://www.google.com');
            window.location.href = transaction.checkoutUrl;
        },
        async getTransactionsForPayment(paymentId) {
            this.transactions[paymentId] = await PaymentService.getTransactionsForPaymentId(paymentId);
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
                OPEN: 'orange',
                PENDING: 'orange',
                PAID: 'green',
                EXPIRED: 'red'
            }[status];
        },
    },
    mounted() {
        this.$refs.paymenttable.$on('item-expanded', async event => {
            if (event.value) {
                await this.getTransactionsForPayment(event.item.id);
            }
        })
    },
    computed: {
        member() {
            return this.$store.state.user.member;
        },
        payments() {
            return this.$store.state.user.payments;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
