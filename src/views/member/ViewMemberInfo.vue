<template>
    <v-row>
        <v-col
            cols="12"
            md="4">
            <v-card>
                <v-card-title>Contactinformatie</v-card-title>
                <v-card-text>
                    <v-text-field :value="this.$utils.getPrettyPhoneNumber(member.memberDetails.phoneNumber)" label="Telefoonnummer" disabled></v-text-field>
                    <v-text-field :value="mailAddresses[0].address" label="Primaire emailadres" disabled></v-text-field>
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
                    <v-text-field :value="this.$utils.getPrettyDateTime(member.memberDetails.createdAt)" label="Aangemeld op" disabled></v-text-field>
                    <v-text-field :value="this.$utils.getPrettyDateTime(member.reviewDetails.reviewedAt)" label="Lid sinds" disabled></v-text-field>
                    <v-text-field :value="member.reviewDetails.reviewedBy" label="Ingestemd door" disabled></v-text-field>
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
                            <v-text-field :value="this.$utils.getPrettyDate(member.memberDetails.dateOfBirth)" label="Geboren op" disabled></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4">
                            <v-text-field :value="this.$utils.getAge(new Date(member.memberDetails.dateOfBirth))" label="Leeftijd" disabled></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "ViewMemberInfo",
    props: [
        'member',
        'studyType',
        'mailAddresses'
    ],
    computed: {
        mailtoLink() {
            if (this.mailAddresses.length !== 0) {
                return this.$utils.getMailLink(this.mailAddresses[0].address);
            }
            return "";
        },
        whatsAppLink() {
            return this.$utils.getWhatsappLink(this.member.memberDetails.phoneNumber);
        },
        receivesNewsletter() {
            if (this.mailAddresses.length === 0) return false;
            for (let mailAddress in this.mailAddresses) {
                if (this.mailAddresses.hasOwnProperty(mailAddress)) {
                    if (mailAddress.receivesNewsletter) {
                        return true;
                    }
                }
            }
            return false;
        },
    }
}
</script>

<style scoped>

</style>
