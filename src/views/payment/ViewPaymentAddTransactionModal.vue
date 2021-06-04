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
                    v-if="openAmount !== 0"
                >
                    <v-icon>mdi-cash-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Voeg transactie toe</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-radio-group v-model="method">
                                    <v-radio
                                        label="Cash"
                                        value="cash"
                                    ></v-radio>
                                    <v-radio
                                        label="Overboeking"
                                        value="transfer"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    label="Bedrag"
                                    required
                                    prefix="€"
                                    v-model="transaction.amount"
                                ></v-text-field>
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
    name: "ViewPaymentAddTransactionModal",
    props: [
        "openAmount",
        "paymentId"
    ],
    data: () => ({
        open: false,
        method: 'cash',
        transaction: {
            amount: 0.00
        }
    }),
    methods: {
        resetForm() {
            this.open = false;
            this.transaction = {
                amount: 0.00
            };
        },
        async addTransaction() {
            const goodAmount = this.transaction.amount;
            await PaymentService.addTransactionForPayment(this.paymentId, this.method, parseFloat(goodAmount.replace(',', '.')))
            this.resetForm();
        }
    }
}
</script>

<style scoped>

</style>
