<template>

    <v-row justify="center">
        <v-dialog
            v-model="open"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-bank-transfer-in</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Bevestig ontvangen overboeking</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                Het gaat om €{{transaction.amount}} voor "{{payment.description}}". Dit moet betaald worden door {{this.$utils.getFullName(member.memberDetails.name)}}.
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Bedrag"
                                    required
                                    prefix="€"
                                    v-model="updatedTransaction.amount"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Beschrijving"
                                    required
                                    v-model="updatedTransaction.description"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="updatedTransaction.transferredAt"
                                            label="Overgemaakt op"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="updatedTransaction.transferredAt"
                                        @input="menu2 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error darken-1"
                        text
                        @click="resetForm"
                    >
                        Annuleer
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="addTransaction"
                    >
                        Voeg toe
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {PaymentService} from "@/services";

export default {
    name: "FinishTransferTransactionModal",
    props: [
        "transaction",
        "payment",
        "member"
    ],
    data: () => ({
        open: false,
        updatedTransaction: {
            amount: 0.0,
            description: '',
            transferredAt:  new Date().toISOString().substr(0, 10),
        }
    }),
    methods: {
        resetForm() {
            this.open = false;
            this.autoFillForm();
        },
        async addTransaction() {
            const goodAmount = this.updatedTransaction.amount;
            await PaymentService.confirmTransferTransaction(this.payment.id, this.transaction.id, {
                paid: parseFloat(goodAmount.toString().replace(',', '.')),
                description: this.updatedTransaction.description,
                transferredAt: this.updatedTransaction.transferredAt
            });
            this.$eventBus.$emit('updateTransactions');
            this.resetForm();
        },
        autoFillForm() {
            this.updatedTransaction = JSON.parse(JSON.stringify(this.transaction));
            this.updatedTransaction.description = JSON.parse(JSON.stringify(this.payment.description));
        }
    },
    watch: {
        open() {
            this.autoFillForm();
        }
    }
}
</script>

<style scoped>

</style>

