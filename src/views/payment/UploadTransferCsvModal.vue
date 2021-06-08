<template>
    <v-row justify="center">
        <v-dialog
            v-model="open"
            max-width="1100px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-cloud-upload</v-icon>
                </v-btn>
            </template>
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step
                        :complete="e1 > 1"
                        step="1"
                    >
                        Upload CSV
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="e1 > 2"
                        step="2"
                    >
                        Match betalingen
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                        Bevestiging
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        Om betaalde overboekingen te importeren kan je hier een CSV uploaden die je bij de Rabobank kan exporteren.
                        <v-file-input
                            @change="filesChanged"
                        ></v-file-input>

                        <v-btn
                            @click="open = false"
                            text>
                            Annuleer
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-data-table
                            v-model="selected"
                            :items="transactions"
                            :headers="table.headers"
                            item-key="description"
                            show-select
                            ref="transactionTable"
                        >

                            <template v-slot:[`item.date`]="{ item }">
                                {{ $utils.getPrettyDate(item.date) }}
                            </template>
                            <template v-slot:[`item.amount`]="{ item }">
                                {{ $utils.getPrettyCurrency(item.amount) }}
                            </template>
                            <template v-slot:[`item.user`]="{ item }">
                                <v-autocomplete
                                    v-model="item.user"
                                    item-text="memberDetails.name.firstName"
                                    item-value="id"
                                    :filter="customFilter"
                                    :items="members"
                                    @change="(selectedUser) => getTransactionsForMember(selectedUser).then()"
                                >

                                    <template v-slot:[`selection`]="{ item }">
                                        {{$utils.getFullName(item.memberDetails.name)}}
                                    </template>

                                    <template v-slot:[`item`]="{ item }">
                                        {{$utils.getFullName(item.memberDetails.name)}}
                                    </template>
                                </v-autocomplete>
                            </template>
                            <template v-slot:[`item.transaction`]="{ item }">
                                <v-autocomplete
                                    v-model="item.transaction"
                                    :filter="transactionFilter"
                                    item-text="description"
                                    item-value="id"
                                    :items="openTransactions[item.user]"
                                    v-if="!!item.user && !!openTransactions[item.user]"
                                >
                                </v-autocomplete>
                            </template>
                            <template v-slot:[`item.state`]="{ item }">
                                <v-icon v-if="!item.user && !item.transaction" color="red">
                                    mdi-alert
                                </v-icon>
                            </template>

                        </v-data-table>
                        <v-btn
                            color="primary"
                            @click="e1 = 3"
                        >
                            Volgende
                        </v-btn>

                        <v-btn
                            @click="open = false"
                            text>
                            Annuleer
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <template v-if="state === 'preparation'">
                            Je staat op het punt om {{selected.length || 0}} betalingen te importeren, heb je ze gecontroleerd en wil je doorgaan?
                        </template>
                        <template v-else-if="state === 'inProgress'">
                            Betaling {{progressCount}} van {{selected.length}} importeren.
                        </template>
                        <template v-else>
                            Alle {{selected.length}} betalingen zijn geimporteerd! Mogelijke fouten worden hieronder weergegeven.

                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-left">
                                            Lid naam
                                        </th>
                                        <th class="text-left">
                                            Betaling
                                        </th>
                                        <th class="text-left">
                                            Reden
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="error in errors"
                                        :key="error.id"
                                    >
                                        <td v-if="error.transaction.user">{{ $utils.getFullName(getMember(error.transaction.user).memberDetails.name) }}</td>
                                        <td v-else>-</td>
                                        <td>{{ error.transaction.description }}</td>
                                        <td>{{ error.e }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>

                        <v-btn
                            v-if="state !== 'finished'"
                            :disabled="state === 'inProgress'"
                            color="primary"
                            @click="startImporting"
                        >
                            Importeer
                        </v-btn>

                        <v-btn
                            v-else
                            color="primary"
                            @click="open = false"
                        >
                            Klaar
                        </v-btn>

                        <v-btn
                            v-if="state !== 'finished'"
                            @click="open = false"
                            text>
                            Annuleer
                        </v-btn>

                        <v-btn
                            v-if="state !== 'finished'"
                            @click="e1 = 2"
                            text>
                            Ga terug
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-dialog>
    </v-row>
</template>

<script>

import {handleCsv} from '@/assets/js/csv';
import {FETCH_MEMBERS} from "@/store/actions";
import {MemberService, PaymentService} from "@/services";

export default {
    name: "UploadTransferCsvModal",
    data: () => ({
        open: false,
        e1: 1,
        transactions: [],
        selected: [],
        table: {
            headers: [
                {
                    text: 'Datum',
                    value: 'date'
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
                    text: 'Naam rekeninghouder',
                    value: 'accountName'
                },
                {
                    text: 'Lid',
                    value: 'user'
                },
                {
                    text: 'Betaling',
                    value: 'transaction'
                },
                {
                    text: 'Status',
                    value: 'state'
                },
            ]
        },
        openTransactions: {},
        progressCount: 0,
        state: 'preparation',
        errors: []
    }),
    mounted() {
        this.$store.dispatch(FETCH_MEMBERS);
    },
    methods: {
        filesChanged(newFiles) {
            const reader = new FileReader();
            reader.onload = e => {
                this.transactions = handleCsv(e.target.result);
                this.e1 = 2;
            }
            reader.readAsText(newFiles)
        },
        customFilter (item, queryText, itemText) {
            const textOne = this.$utils.getFullName(item.memberDetails.name).toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
        },
        transactionFilter (item, queryText, itemText) {
            const textOne = item.description.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1
        },
        async getTransactionsForMember(memberId) {
            this.openTransactions[memberId] = await MemberService.getOpenTransferPaymentsForMemberId(memberId);
        },
        getPayment(memberId, transactionId) {
            for (let payment of this.openTransactions[memberId]) {
                if (payment.id === transactionId) {
                    return payment.paymentId;
                }
            }
        },
        async startImporting() {
            for (let transaction of this.selected) {
                this.progressCount++;
                try {
                    if (!transaction.user) {
                        throw new Error("Geen lid geselecteerd");
                    }
                    if (!transaction.transaction) {
                        throw new Error("Geen betaling geselecteerd");
                    }
                    await PaymentService.confirmTransferTransaction(this.getPayment(transaction.user, transaction.transaction), transaction.transaction, {
                        paid: parseFloat(transaction.amount),
                        description: transaction.description,
                        transferredAt: transaction.date
                    })
                } catch (e) {
                    this.errors.push({e, transaction})
                }
            }
            this.state = "finished";
        },
        getMember(memberId) {
            return this.$store.getters.getMemberById(memberId);
        }
    },
    computed: {
        members() {
            return this.$store.state.members.members;
        }
    }
}
</script>

<style scoped>

</style>
