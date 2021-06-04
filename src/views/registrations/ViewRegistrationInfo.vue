<template>

    <v-row>
        <v-col
            cols="12"
            md="4">
            <v-card>
                <v-card-title>Contactinformatie</v-card-title>
                <v-card-text>
                    <v-text-field :value="this.$utils.getPrettyPhoneNumber(registration.memberDetails.phoneNumber)" label="Telefoonnummer" disabled></v-text-field>
                    <v-text-field :value="registration.mailAddress" label="Primaire emailadres" disabled></v-text-field>
                    <v-checkbox v-model="receivesNewsletter" label="Ontvangt nieuwsbrief" disabled></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-btn icon :href="whatsAppLink" target="_blank">
                        <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                    <v-btn icon :href="mailtoLink" target="_blank">
                        <v-icon>mdi-email</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col
            cols="12"
            md="4">
            <v-card>
                <v-card-title>Lidmaatschapsinformatie</v-card-title>
                <v-card-text>
                    <v-text-field :value="this.$utils.getPrettyDateTime(registration.memberDetails.createdAt)" label="Aangemeld op" disabled></v-text-field>
                    <template v-if="registration.reviewStatus === 'APPROVED'">
                        <v-text-field :value="this.$utils.getPrettyDateTime(registration.reviewDetails.reviewedAt)" label="Lid sinds" disabled></v-text-field>
                        <v-text-field :value="registration.reviewDetails.reviewedBy" label="Ingestemd door" disabled></v-text-field>
                    </template>
                    <template v-if="registration.reviewStatus === 'DENIED'">
                        <v-text-field :value="this.$utils.getPrettyDateTime(registration.reviewDetails.reviewedAt)" label="Weggestemd op" disabled></v-text-field>
                        <v-text-field :value="registration.reviewDetails.reviewedBy" label="Weggestemd door" disabled></v-text-field>
                        <v-text-field :value="registration.reviewDetails.comment" label="Reden van wegstemming" disabled></v-text-field>
                    </template>
                    <template v-else-if="registration.reviewStatus === 'PENDING'">
                        <v-btn
                            color="primary"
                            plain
                            @click="approveRegistration"
                        >Stem in</v-btn>
                        <v-dialog
                            v-model="open"
                            persistent
                            max-width="600px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    plain
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    Stem weg
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Wegstemmen {{$utils.getFullName(this.registration.memberDetails.name)}}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field
                                                    label="Reden"
                                                    required
                                                    v-model="comment"
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
                                        @click="disapproveRegistration"
                                    >
                                        Stem weg
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col
            cols="12"
            md="4">
            <v-card>
                <v-card-title>Persoonlijke informatie</v-card-title>
                <v-card-text>
                    <v-text-field :value="studyType.name" label="Studierichting" disabled></v-text-field>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="8">
                            <v-text-field :value="this.$utils.getPrettyDate(registration.memberDetails.dateOfBirth)" label="Geboren op" disabled></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4">
                            <v-text-field :value="this.$utils.getAge(new Date(registration.memberDetails.dateOfBirth))" label="Leeftijd" disabled></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "ViewRegistrationInfo",
    props: [
        'registrationId',
        'registration',
        'studyType'
    ],
    data: () => ({
        open: false,
        comment: ''
    }),
    methods: {
        resetForm() {
            this.open = false;
            this.comment = '';
        },
        async approveRegistration() {
            await this.reviewRegistration({reviewStatus: 'APPROVED'});
        },
        async disapproveRegistration() {
            await this.reviewRegistration({reviewStatus: 'DENIED', comment: this.comment});
        },
        async reviewRegistration(reviewObject) {
            await this.$api.post(`/registrations/${this.registrationId}/review`, reviewObject);
            this.$emit('reviewedRegistration');
            this.resetForm();
        }
    },
    computed: {
        mailtoLink() {
            return this.$utils.getMailLink(this.registration.mailAddress);
        },
        whatsAppLink() {
            return this.$utils.getWhatsappLink(this.registration.memberDetails.phoneNumber);
        },
        receivesNewsletter() {
            return this.registration.receivingNewsletter;
        },
    }
}
</script>

<style scoped>

</style>
