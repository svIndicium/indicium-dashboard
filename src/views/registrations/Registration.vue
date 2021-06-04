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
                    <v-card-title>
                        Aanmeldingen
                        <v-spacer></v-spacer>
                        <v-switch label="Alleen afwachtend" v-model="onlyShowFinished"></v-switch>
                    </v-card-title>
                    <v-data-table :headers="table.headers" :items="getRegistrations">
                        <template v-slot:[`item.createdAt`]="{ item }">
                            {{ $utils.getPrettyDateTime(item.memberDetails.createdAt) }}
                        </template>
                        <template v-slot:[`item.memberDetails.dateOfBirth`]="{ item }">
                            {{ $utils.getPrettyDate(item.memberDetails.dateOfBirth) }}
                        </template>
                        <template v-slot:[`item.memberDetails.createdAt`]="{ item }">
                            {{ $utils.getPrettyDateTime(item.memberDetails.createdAt) }}
                        </template>
                        <template v-slot:[`item.lastName`]="{ item }">
                            {{ $utils.getFullLastName(item.memberDetails.name) }}
                        </template>
                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip :color="getStatusColor(item)">
                                {{ getStatusText(item) }}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn @click="() => viewRegistration(item.id)" icon>
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {FETCH_REGISTRATIONS} from "@/store/actions";
import Breadcrumbs from "@/components/Breadcrumbs";

export default {
    name: 'Registration',
    components: {
        Breadcrumbs
    },
    data: () => ({
        onlyShowFinished: true,
        table: {
            headers: [
                {
                    text: 'Voornaam',
                    value: 'memberDetails.name.firstName'
                },
                {
                    text: 'Achternaam',
                    value: 'lastName'
                },
                {
                    text: 'Geboortedatum',
                    value: 'memberDetails.dateOfBirth'
                },
                {
                    text: 'Aangemeld op',
                    value: 'memberDetails.createdAt'
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
    methods: {
        async requestData() {
            await this.$store.dispatch(FETCH_REGISTRATIONS);
        },
        viewRegistration(registrationId) {
            this.$router.push({ name: "RegistrationViewInfo", params: { registrationId } });
        },
        getStatusColor(registration) {
            return {
                PENDING: 'orange',
                APPROVED: 'success',
                DENIED: 'error'
            }[registration.reviewStatus] || 'error';
        },
        getStatusText(registration) {
            return {
                PENDING: 'In afwachting',
                APPROVED: 'Voltooid',
                DENIED: 'Geweigerd'
            }[registration.reviewStatus] || 'error';
        },
    },
    computed: {
        getRegistrations() {
            if (this.onlyShowFinished) {
                return this.$store.getters.getPendingRegistrations;
            } else {
                return this.$store.getters.getRegistrations;
            }
        },
        registrations() {
            return this.$store.state.registrations.registrations;
        },
    },
    async mounted() {
        await this.requestData();
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/table";
</style>
