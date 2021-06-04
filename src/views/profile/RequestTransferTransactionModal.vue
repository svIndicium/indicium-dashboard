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
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    Overboeking
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Betalen via overboeking</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                Om te kunnen betalen via overboeking moet je €{{payment.openAmount}} met de omschrijving "{{payment.description}} {{this.$utils.getFullName(member.memberDetails.name)}}" overmaken naar NL29 RABO 0319 4249 95 t.a.v. Studievereniging Indicium.
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error darken-1"
                        text
                        @click="close"
                    >
                        Annuleer
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="addTransaction"
                    >
                        Voltooien
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import {PaymentService} from "@/services";

export default {
    name: "RequestTransferTransactionModal",
    props: [
        "payment"
    ],
    methods: {
        close() {
            this.open = false;
        },
        async addTransaction() {
            await PaymentService.addTransactionForPayment(this.payment.id, 'transfer', this.payment.openAmount)
            this.close();
        }
    },
    computed: {
        member() {
            return this.$store.state.member;
        }
    },
}
</script>

<style scoped>

</style>
